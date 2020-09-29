import debug from 'debug';
import XMLRequest from '../api/traditional/XMLRequest';
import {AuthToken, eBayConfig} from '../types/apiTypes';
import {createRequest, ILimitedRequest} from '../utils/request';

const log = debug('ebay:authNAuth');

export default class AuthNAuth {
    public static readonly SIGNIN_ENDPOINT = {
        sandbox: 'https://signin.sandbox.ebay.com/ws/eBayISAPI.dll',
        production: 'https://signin.ebay.com/ws/eBayISAPI.dll'
    };

    public static readonly API_ENDPOINT = {
        production: 'https://api.ebay.com/ws/api.dll',
        sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
    };

    public static generateAuthUrl(sandbox: boolean, ruName: string, sessionId: string, prompt = false) {
        return [
            AuthNAuth.SIGNIN_ENDPOINT[sandbox ? 'sandbox' : 'production'],
            '?SignIn',
            '&RuName=', encodeURIComponent(ruName),
            '&SessID=', encodeURIComponent(sessionId),
            prompt ? '&prompt=login' : ''
        ].join('');
    }

    public readonly eBayConfig: eBayConfig;
    public readonly req: ILimitedRequest;

    private authToken?: AuthToken;

    constructor(
        config: eBayConfig,
        req: ILimitedRequest = createRequest()
    ) {
        this.eBayConfig = config;
        this.req = req;

        if (this.eBayConfig.authToken) {
            this.authToken = {
                eBayAuthToken: this.eBayConfig.authToken
            };
        }
    }

    /**
     * Generates URL for consent page landing.
     *
     * @param ruName RuName
     */
    public async getSessionIdAndAuthUrl(ruName?: string) {
        if (!this.eBayConfig.devId) {
            throw new Error('DevId is required.');
        }

        ruName = ruName || this.eBayConfig.ruName;
        if (!ruName) {
            throw new Error('RuName is required.');
        }

        const config = this.getRequestConfig('GetSessionID');

        const request = new XMLRequest('GetSessionID', {
                RuName: ruName
            }, config,
            this.req);

        const response = await request.fetch({useIaf: false});

        log('GetSessionID response', response);

        return {
            sessionId: response.SessionID,
            url: AuthNAuth.generateAuthUrl(this.eBayConfig.sandbox, ruName, response.SessionID)
        };
    }

    public async fetchAuthToken(sessionId: string) {
        if (!this.eBayConfig.devId) {
            throw new Error('DevId is required.');
        }
        const request = new XMLRequest('FetchToken', {
                SessionID: sessionId
            }, this.getRequestConfig('FetchToken'),
            this.req);

        return request.fetch({useIaf: false});
    }

    public setAuthToken(authToken: AuthToken | string) {
        if (typeof authToken === 'string') {
            this.authToken = {
                eBayAuthToken: authToken
            };
        } else {
            this.authToken = authToken;
        }
    }

    public getAuthToken() {
        return this.authToken;
    }

    get eBayAuthToken() {
        if (this.authToken) {
            return this.authToken.eBayAuthToken;
        }

        return null;
    }

    public getRequestConfig(callname: string) {
        if (!this.eBayConfig.siteId) {
            throw new Error('siteId is required for Auth\'n\'Auth.');
        }
        return {
            xmlns: 'urn:ebay:apis:eBLBaseComponents',
            endpoint: AuthNAuth.API_ENDPOINT[this.eBayConfig.sandbox ? 'sandbox' : 'production'],
            headers: {
                'X-EBAY-API-CALL-NAME': callname,
                'X-EBAY-API-CERT-NAME': this.eBayConfig.certId,
                'X-EBAY-API-APP-NAME': this.eBayConfig.appId,
                'X-EBAY-API-DEV-NAME': this.eBayConfig.devId,
                'X-EBAY-API-SITEID': this.eBayConfig.siteId,
                'X-EBAY-API-COMPATIBILITY-LEVEL': 967
            }
        };
    }
}
