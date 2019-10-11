import debug from "debug"
import request from "../utils/request";

const log = debug("ebay:oauth");

type Token = {
    access_token: string,
    expires_in: number, // default 2 hours
    token_type: string
}

export type OAuthRequest = {
    grant_type: 'client_credentials' | 'authorization_code',
    scope: string[];
}

const defaultRequest: OAuthRequest = {
    grant_type: 'client_credentials',
    scope: ['https://api.ebay.com/oauth/api_scope']
};

export default class OAuth {
    // If all the calls in our application require just an Application access token
    private client = {
        production: 'https://api.ebay.com/identity/v1/oauth2/token',
        sandbox: 'https://api.sandbox.ebay.com/identity/v1/oauth2/token',
    };

    private authorize = {
        production: 'https://auth.ebay.com/oauth2/authorize',
        sandbox: 'https://auth.sandbox.ebay.com/oauth2/authorize'
    };

    private _token?: Token;

    readonly appId: string;
    readonly certId: string;
    readonly sandbox: boolean;
    readonly authNAuth?: string;

    private oAuthRequest: OAuthRequest;

    constructor(
        appId: string,
        certId: string,
        sandbox: boolean,
        oAuthRequest: OAuthRequest = defaultRequest,
        authNAuth?: string
    ) {
        this.appId = appId;
        this.certId = certId;
        this.sandbox = sandbox;
        this.oAuthRequest = oAuthRequest;
        this.authNAuth = authNAuth;
    }

    get token() {
        return this._token;
    }

    async getClientToken(oAuthRequest: OAuthRequest = this.oAuthRequest): Promise<string> {
        if (this.token) {
            log('Client Token exists: ', this.token);
            return this.token.access_token;
        }

        try {
            const token = await this.obtainClientToken(oAuthRequest);
            return token.access_token;
        } catch (e) {
            throw e;
        }
    }

    async refreshToken(oAuthRequest: OAuthRequest): Promise<string> {
        try {
            log('Refresh Token: ', oAuthRequest);
            const token = await this.obtainClientToken(oAuthRequest);
            return token.access_token;
        } catch (e) {
            throw e;
        }
    }

    setClientToken(clientToken: Token) {
        this._token = clientToken;
    }

    setOAuthRequest(oAuthRequest: OAuthRequest) {
        this.oAuthRequest = oAuthRequest;
    }

    // Client Credential Grant
    private obtainClientToken(oAuthRequest: OAuthRequest): Promise<Token> {
        if (!this.appId) throw new Error('Missing Client ID');
        if (!this.certId) throw new Error('Missing Client Secret or Cert Id');

        log('Obtain a new Token:', oAuthRequest);

        const endpoint = this.sandbox ? 'sandbox' : 'production';
        return request.postForm(this.client[endpoint], {
            scope: oAuthRequest.scope.join(' '),
            grant_type: oAuthRequest.grant_type
        }, {
            auth: {
                username: this.appId,
                password: this.certId
            }
        }).then((token: any) => {
            this.oAuthRequest = oAuthRequest;
            this.setClientToken(token);
            log('Stored a new Client Token:', token);
            return token;
        }).catch((error: any) => {
            log('Can\'s store client token', error);
            throw error;
        })
    }

}