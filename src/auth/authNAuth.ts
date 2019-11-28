import debug from 'debug';
import {eBayConfig, AuthToken} from '../types';
import XMLRequest from '../api/traditional/XMLRequest';
import {LimitedRequest, createRequest} from '../utils/request';

const log = debug('ebay:authNAuth');

export default class AuthNAuth {
    static SIGNIN_ENDPOINT = {
        sandbox: 'https://signin.sandbox.ebay.com/ws/eBayISAPI.dll',
        production: 'https://signin.ebay.com/ws/eBayISAPI.dll'
    };

    static API_ENDPOINT = {
        production: 'https://api.ebay.com/ws/api.dll',
        sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
    };

    readonly eBayConfig: eBayConfig;
    readonly req: LimitedRequest;

    private authToken?: AuthToken;

    constructor(
        eBayConfig: eBayConfig,
        req: LimitedRequest = createRequest()
    ) {
        this.eBayConfig = eBayConfig;
        this.req = req;

        if (this.eBayConfig.authToken) {
            this.authToken = {
                eBayAuthToken: this.eBayConfig.authToken
            };
        }
    }

    public static generateAuthUrl(sandbox: boolean, ruName: string, sessionId: string) {
        return [
            AuthNAuth.SIGNIN_ENDPOINT[sandbox ? 'sandbox' : 'production'],
            '?SignIn',
            '&RuName=', encodeURIComponent(ruName),
            '&SessID=', encodeURIComponent(sessionId)
        ].join('');
    }

    /**
     * Generates URL for consent page landing.
     *
     * @param ruName RuName
     */
    async getSessionIdAndAuthUrl(ruName?: string) {
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

    async fetchAuthToken(sessionId: string) {
        if (!this.eBayConfig.devId) {
            throw new Error('DevId is required.');
        }
        const request = new XMLRequest('FetchToken', {
                SessionID: sessionId
            }, this.getRequestConfig('FetchToken'),
            this.req);

        return request.fetch({useIaf: false});
    }

    setAuthToken(authToken: AuthToken | string) {
        if (typeof authToken === 'string') {
            this.authToken = {
                eBayAuthToken: authToken
            };
        } else {
            this.authToken = authToken;
        }
    }

    getAuthToken() {
        return this.authToken;
    }

    get eBayAuthToken() {
        if (this.authToken) {
            return this.authToken.eBayAuthToken;
        }

        return null;
    }

    getRequestConfig(callname: string) {
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