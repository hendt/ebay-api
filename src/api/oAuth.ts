import debug from "debug"
import request from "../utils/request";

const log = debug("ebay:oauth");

type Token = {
    access_token: string,
    expires_in: number,
    token_type: string
}

export type OAuthRequest = {
    grant_type: string,
    scope: string | string[];
}

const defaultRequest: OAuthRequest = {
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope'
};

export default class OAuth {
    private url = 'https://api.ebay.com/identity/v1/oauth2/token';
    private _token?: Token;

    readonly appId: string;
    readonly certId: string;

    private oAuthRequest: OAuthRequest;

    constructor(
        appId: string,
        certId: string,
        oAuthRequest: OAuthRequest = defaultRequest
    ) {
        this.appId = appId;
        this.certId = certId;
        this.oAuthRequest = oAuthRequest;
    }

    get token () {
        return this._token;
    }

    async getAccessToken(oAuthRequest: OAuthRequest = this.oAuthRequest): Promise<string> {
        if (this.token) {
            log('Token exists: ', this.token);
            return this.token.access_token;
        }

        try {
            const token = await this.obtainToken(oAuthRequest);
            return token.access_token;
        } catch (e) {
            throw e;
        }
    }

    async refreshToken(oAuthRequest: OAuthRequest): Promise<string> {
        try {
            log('Refresh Token: ', oAuthRequest);
            const token = await this.obtainToken(oAuthRequest);
            return token.access_token;
        } catch (e) {
            throw e;
        }
    }

    setToken(token: Token) {
        this._token = token;
    }

    private obtainToken(oAuthRequest: OAuthRequest): Promise<Token> {
        if (!this.appId) throw new Error('Missing Client ID');
        if (!this.certId) throw new Error('Missing Client Secret or Cert Id');

        log('Obtain a new Token:', oAuthRequest);

        return request.postForm(this.url, {
            scope: oAuthRequest.scope,
            grant_type: oAuthRequest.grant_type
        }, {
            auth: {
                username: this.appId,
                password: this.certId
            }
        }).then((token: any) => {
            this.oAuthRequest = oAuthRequest;
            this.setToken(token);
            log('Stored a new Token:', token);
            return token;
        });
    }
}