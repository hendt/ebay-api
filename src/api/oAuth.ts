import debug from "debug"
import request from "../utils/request";

const log = debug("ebay:oauth");

type Token = {
    access_token: string,
    expires_in: number, // default 2 hours
    token_type: string
}

// User Access Token
type UserAccessToken = Token & {
    refresh_token: string,
    refresh_token_expires_in: number
};

export type Scope = string[];

const defaultScopes: Scope = ['https://api.ebay.com/oauth/api_scope'];

export default class OAuth {
    // If all the calls in our application require just an Application access token
    private client: any = {
        production: 'https://api.ebay.com/identity/v1/oauth2/token',
        sandbox: 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'
    };

    private authorize: any = {
        production: 'https://auth.ebay.com/oauth2/authorize',
        sandbox: 'https://auth.sandbox.ebay.com/oauth2/authorize'
    };

    private _clientToken?: Token;
    private _userAccessToken?: UserAccessToken;

    readonly appId: string;
    readonly certId: string;
    readonly sandbox: boolean;
    readonly authNAuth?: string;

    private scope: Scope;
    private endpoint: string;

    constructor(
        appId: string,
        certId: string,
        sandbox: boolean,
        scopes: Scope = defaultScopes,
        authNAuth?: string
    ) {
        this.appId = appId;
        this.certId = certId;
        this.sandbox = sandbox;
        this.endpoint = sandbox ? 'sandbox' : 'production';
        this.scope = scopes;
        this.authNAuth = authNAuth;
    }

    get clientToken() {
        return this._clientToken;
    }

    async getAccessToken(scopes: Scope = this.scope) {
        if (this._userAccessToken) {
            return this._userAccessToken.access_token;
        }
        // Fallback to Client Token
        return this.getClientToken(scopes);
    }

    get accessToken() {
        if (this._userAccessToken) {
            return this._userAccessToken.access_token
        }

        return null;
    }

    async getClientToken(scopes: Scope = this.scope): Promise<string> {
        if (this.clientToken) {
            log('Client Token exists: ', this.clientToken);
            return this.clientToken.access_token;
        }

        try {
            const token = await this.obtainClientToken(scopes);
            return token.access_token;
        } catch (e) {
            throw e;
        }
    }

    setClientToken(clientToken: Token) {
        this._clientToken = clientToken;
    }

    setScope(scope: Scope) {
        this.scope = scope;
    }

    // Client Credential Grant
    private obtainClientToken(scope: Scope): Promise<Token> {
        if (!this.appId) throw new Error('Missing App ID (Client Id)');
        if (!this.certId) throw new Error('Missing Cert Id (Client Secret)');

        log('Obtain a new Client Token with scope:', scope);

        return request.postForm(this.client[this.endpoint], {
            scope: scope.join(' '),
            grant_type: 'client_credentials'
        }, {
            auth: {
                username: this.appId,
                password: this.certId
            }
        }).then((token: any) => {
            this.setScope(scope);
            this.setClientToken(token);
            log('Stored a new Client Token:', token);
            return token;
        }).catch((error: any) => {
            log('Can\'s store client token', error);
            throw error;
        })
    }

    /**
     * @param redirectUri RuName
     * @param scope the scopes
     * @param state state parameter returned in the redirect URL
     */
    generateAuthUrl(redirectUri: string, scope: string[], state = '') {
        return [
            this.authorize[this.endpoint],
            '?client_id=', encodeURIComponent(this.appId),
            '&redirect_uri=', encodeURIComponent(redirectUri),
            '&response_type=code',
            '&state=', encodeURIComponent(state),
            '&scope=', encodeURIComponent(scope.join(' '))
        ].join('');
    }

    /**
     * Get User Access Token
     *
     * @param code the code
     * @param redirectUri the redirectUri
     */
    async getToken(code: string, redirectUri: string) {
        return request.postForm(this.client[this.endpoint], {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri
        }, {
            auth: {
                username: this.appId,
                password: this.certId
            }
        }).then(token => {
            log('Successfully obtained a new User Access Token:', token);
            return token;
        }).catch(error => {
            throw error;
        })
    }

    setCredentials(userAccessToken: UserAccessToken) {
        this._userAccessToken = userAccessToken;
    }
}