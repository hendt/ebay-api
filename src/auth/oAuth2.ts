import debug from 'debug';
import Base from '../api/base';
import {Scope} from '../types';

const log = debug('ebay:oauth2');

export type Token = {
  access_token: string,
  expires_in: number, // default 2 hours
  token_type: string
};

export type ClientToken = Token;

export type AuthToken = Token & {
  refresh_token: string,
  refresh_token_expires_in: number
};

/**
 * https://developer.ebay.com/api-docs/static/oauth-tokens.html
 *
 * Client credentials grant flow mints a new Application access token that you can use to access the resources owned by the application.
 * Authorization code grant flow mints a new User access token that you can use to access the resources owned by the user.
 */
export default class OAuth2 extends Base {
  // If all the calls in our application require just an Application access token we can use this endpoint
  public static readonly IDENTITY_ENDPOINT: Record<string, string> = {
    production: 'https://api.ebay.com/identity/v1/oauth2/token',
    sandbox: 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'
  };

  public static readonly AUTHORIZE_ENDPOINT: Record<string, string> = {
    production: 'https://auth.ebay.com/oauth2/authorize',
    sandbox: 'https://auth.sandbox.ebay.com/oauth2/authorize'
  };

  public static readonly defaultScopes: Scope = ['https://api.ebay.com/oauth/api_scope'];

  public static generateAuthUrl(
    sandbox: boolean,
    appId: string,
    ruName: string,
    scope: string[],
    state = ''
  ): string {
    return [
      sandbox ? OAuth2.AUTHORIZE_ENDPOINT.sandbox : OAuth2.AUTHORIZE_ENDPOINT.production,
      '?client_id=', encodeURIComponent(appId),
      '&redirect_uri=', encodeURIComponent(ruName),
      '&response_type=code',
      '&state=', encodeURIComponent(state),
      '&scope=', encodeURIComponent(scope.join(' '))
    ].join('');
  }

  private scope: Scope = this.config.scope || OAuth2.defaultScopes;
  private _clientToken?: ClientToken;
  private _authToken?: AuthToken;

  get identityEndpoint() {
    return this.config.sandbox ? OAuth2.IDENTITY_ENDPOINT.sandbox : OAuth2.IDENTITY_ENDPOINT.production
  }

  /**
   * Return the access token.
   * First return user access token, if not set Application Access Token.
   */
  public async getAccessToken(): Promise<string> {
    return this.getUserAccessToken() || this.getApplicationAccessToken();
  }

  public getUserAccessToken(): string | null {
    return this._authToken?.access_token ?? null
  }

  public async getApplicationAccessToken(): Promise<string> {
    if (this._clientToken) {
      log('Return existing application access token: ', this._clientToken);
      return this._clientToken.access_token;
    }

    try {
      const token = await this.obtainApplicationAccessToken();
      return token.access_token;
    } catch (error) {
      throw error;
    }
  }

  public setClientToken(clientToken?: Token) {
    this._clientToken = clientToken;
  }

  public setScope(scope: Scope) {
    this.scope = scope;
  }

  public getScope(): string[] {
    return [...this.scope];
  }

  /**
   * Client credentials grant flow.
   */
  public async mintApplicationAccessToken(): Promise<ClientToken> {
    if (!this.config.appId) {
      throw new Error('Missing App ID (Client Id)');
    }

    if (!this.config.certId) {
      throw new Error('Missing Cert Id (Client Secret)');
    }

    try {
      return await this.req.postForm(this.identityEndpoint, {
        scope: this.scope.join(' '),
        grant_type: 'client_credentials'
      }, {
        auth: {
          username: this.config.appId,
          password: this.config.certId
        }
      });
    } catch (error) {
      log('Failed to mint application token', error);
      throw error;
    }
  }

  /**
   * Client credentials grant flow.
   */
  public async obtainApplicationAccessToken(): Promise<ClientToken> {
    log('Obtain a new application access token with scope: ', this.scope.join(','));

    try {
      const token = await this.mintApplicationAccessToken();

      log('Obtained a new application access token:', token);

      this.setClientToken(token);
      this.emit('refreshClientToken', token);

      return token;
    } catch (error) {
      log('Failed to obtain application token', error);
      throw error;
    }
  }

  /**
   * Generates URL for consent page landing.
   *
   * @param ruName RuName
   * @param scope the scopes
   * @param state state parameter returned in the redirect URL
   */
  public generateAuthUrl(ruName?: string, scope: string[] = this.scope, state = ''): string {
    ruName = ruName || this.config.ruName;

    if (!ruName) {
      throw new Error('RuName is required.');
    }

    return OAuth2.generateAuthUrl(this.config.sandbox, this.config.appId, ruName, scope, state);
  }

  /**
   * Authorization code grant flow.
   *
   * Mint the user access token for the given code.
   *
   * @param code the code
   * @param ruName the redirectUri
   */
  public async mintUserAccessToken(code: string, ruName = this.config.ruName) {
    try {
      const token = await this.req.postForm(this.identityEndpoint, {
        grant_type: 'authorization_code',
        code,
        redirect_uri: ruName
      }, {
        auth: {
          username: this.config.appId,
          password: this.config.certId
        }
      });

      log('User Access Token', token);
      return token;
    } catch (error) {
      log('Failed to get the token', error);
      throw error;
    }
  }

  /**
   * Authorization code grant flow.
   *
   * Mint the access token for the given code.
   *
   * @param code the code
   * @param ruName the redirectUri
   */
  public async getToken(code: string, ruName = this.config.ruName) {
    return await this.mintUserAccessToken(code, ruName);
  }

  /**
   * Authorization code grant flow.
   */
  public async refreshUserAccessToken(): Promise<AuthToken> {
    if (!this._authToken || !this._authToken.refresh_token) {
      log('Tried to refresh user access token before it was set.');
      throw new Error('Failed to refresh the user access token. Token or refresh_token is not set.');
    }

    try {
      const token = await this.req.postForm(this.identityEndpoint, {
        grant_type: 'refresh_token',
        refresh_token: this._authToken.refresh_token,
        scope: this.scope.join(' ')
      }, {
        auth: {
          username: this.config.appId,
          password: this.config.certId
        }
      });

      log('Successfully refreshed token', token);

      const refreshedToken = {
        ...this._authToken,
        ...token
      };

      this.setCredentials(refreshedToken);
      this.emit('refreshAuthToken', refreshedToken);

      return refreshedToken;
    } catch (error) {
      log('Failed to refresh the token', error);
      throw error;
    }
  }

  /**
   * Gets and sets the user access token for the given code.
   *
   * Authorization code grant flow.
   *
   * @param code the code
   */
  public async obtainToken(code: string): Promise<AuthToken> {
    const token = await this.getToken(code);
    log('Obtain user access token', token);
    this.setCredentials(token)

    return token
  }

  public getCredentials(): AuthToken | ClientToken | null {
    if (this._authToken) {
      return {
        ...this._authToken
      };
    } else if (this._clientToken) {
      return {
        ...this._clientToken
      }
    }

    return null;
  }

  public setCredentials(authToken: AuthToken | string) {
    if (typeof authToken === 'string') {
      this._authToken = {
        refresh_token: '',
        expires_in: 7200,
        refresh_token_expires_in: 47304000,
        token_type: 'User Access Token',
        access_token: authToken
      };
    } else {
      this._authToken = authToken;
    }
  }

  /**
   * Refresh the user access token if set or application access token
   */
  public async refreshToken(): Promise<Token> {
    if (this._authToken) {
      return await this.refreshUserAccessToken();
    } else if (this._clientToken) {
      return await this.obtainApplicationAccessToken();
    }

    throw new Error('To refresh a Token a application access token or user access token must be already set.');
  }
}
