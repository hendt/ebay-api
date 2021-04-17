import debug from 'debug';
import Base from '../api/base';
import {IEBayApiRequest} from '../request';
import {AppConfig, Scope} from '../types';

const log = debug('ebay:oauth2');

export type Token = {
  access_token: string,
  expires_in: number, // default 2 hours
  token_type: string
};

export type UserAccessToken = Token & {
  refresh_token: string,
  refresh_token_expires_in: number
};

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

  private scope: Scope;
  private _clientToken?: Token;
  private _userAccessToken?: UserAccessToken;

  constructor(config: AppConfig, req?: IEBayApiRequest) {
    super(config, req);
    this.scope = this.config.scope || OAuth2.defaultScopes;
  }

  get identityEndpoint() {
    return this.config.sandbox ? OAuth2.IDENTITY_ENDPOINT.sandbox : OAuth2.IDENTITY_ENDPOINT.production
  }

  /**
   * Return the access token.
   */
  public async getAccessToken() {
    // Fallback to Client Token
    return this.accessToken || this.getClientAccessToken();
  }

  get accessToken() {
    if (this._userAccessToken) {
      return this._userAccessToken.access_token;
    }

    return null;
  }

  public async getClientAccessToken(): Promise<string> {
    if (this._clientToken) {
      log('Return existing client token: ', this._clientToken);
      return this._clientToken.access_token;
    }

    try {
      const token = await this.refreshClientToken();
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

  // Client Credential Grant
  public async refreshClientToken(): Promise<Token> {
    if (!this.config.appId) {
      throw new Error('Missing App ID (Client Id)');
    }
    if (!this.config.certId) {
      throw new Error('Missing Cert Id (Client Secret)');
    }

    log('Obtain a new Client Token with scope: ', this.scope.join(','));

    try {
      const token = await this.req.postForm(this.identityEndpoint, {
        scope: this.scope.join(' '),
        grant_type: 'client_credentials'
      }, {
        auth: {
          username: this.config.appId,
          password: this.config.certId
        }
      });

      log('Stored a new Client Token:', token);

      this.setClientToken(token);
      this.emit('refreshClientToken', token);

      return token;
    } catch (error) {
      log('Failed to store client token', error);
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
   * Gets the access token for the given code.
   *
   * @param code the code
   * @param ruName the redirectUri
   */
  public async getToken(code: string, ruName = this.config.ruName) {
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

      log('Successfully obtained a new User Access Token', token);
      return token;
    } catch (ex) {
      log('Failed to get the token', ex);
      throw ex;
    }
  }

  /**
   * Gets and sets the access token for the given code.
   *
   * @param code the code
   */
  public async obtainToken(code: string) {
    const token = await this.getToken(code);
    log('Set Token', token);
    this.setCredentials(token)
  }

  public getCredentials(): UserAccessToken | null {
    if (this._userAccessToken) {
      return {
        ...this._userAccessToken
      };
    }
    return null;
  }

  public setCredentials(userAccessToken: UserAccessToken | string) {
    if (typeof userAccessToken === 'string') {
      this._userAccessToken = {
        refresh_token: '',
        expires_in: 7200,
        refresh_token_expires_in: 47304000,
        token_type: 'User Access Token',
        access_token: userAccessToken
      };
    } else {
      this._userAccessToken = userAccessToken;
    }
  }

  public async refreshAuthToken(): Promise<Token> {
    if (!this._userAccessToken) {
      log('Tried to refresh auth token before it was set.');
      throw new Error('Failed to refresh the token. Token is not set.');
    }

    try {
      const token = await this.req.postForm(this.identityEndpoint, {
        grant_type: 'refresh_token',
        refresh_token: this._userAccessToken.refresh_token,
        scope: this.scope.join(' ')
      }, {
        auth: {
          username: this.config.appId,
          password: this.config.certId
        }
      });
      log('Successfully refreshed token', token);

      const refreshedToken = {
        ...this._userAccessToken,
        ...token
      };

      this.setCredentials(refreshedToken);

      this.emit('refreshAuthToken', refreshedToken);

      return refreshedToken;
    } catch (ex) {
      log('Failed to refresh the token', ex);
      throw ex;
    }
  }

  public async refreshToken(): Promise<Token> {
    if (this._userAccessToken) {
      return await this.refreshAuthToken();
    } else if (this._clientToken) {
      return await this.refreshClientToken();
    }

    throw new Error('To refresh a Token a client token or user access token must be already set.');
  }
}
