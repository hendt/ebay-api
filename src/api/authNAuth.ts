import debug from 'debug';
import {AuthToken, SiteId} from '../types';
import XMLRequest from './traditional/XMLRequest';

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

    readonly appId: string;
    readonly certId: string;
    readonly sandbox: boolean;

    readonly devId?: string;
    readonly siteId: number;
    readonly ruName?: string;
    private authToken?: AuthToken;

    constructor(appId: string, certId: string, sandbox: boolean, devId?: string, siteId = SiteId.EBAY_DE, ruName?: string, authToken?: string) {
        this.appId = appId;
        this.certId = certId;
        this.devId = devId;
        this.siteId = siteId;
        this.sandbox = sandbox;
        this.ruName = ruName;

        if (authToken) {
            this.authToken = {
                eBayAuthToken: authToken
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
        if (!this.devId) {
            throw new Error('DevId is required.');
        }

        ruName = ruName || this.ruName;
        if (!ruName) {
            throw new Error('RuName is required.');
        }

        const request = new XMLRequest('GetSessionID', {
            RuName: ruName
        }, this.getRequestConfig('GetSessionID'));

        const response = await request.run();

        log('GetSessionID response', response);

        return {
            sessionId: response.SessionID,
            url: AuthNAuth.generateAuthUrl(this.sandbox, ruName, response.SessionID)
        };
    }

    async fetchAuthToken(sessionId: string) {
        if (!this.devId) {
            throw new Error('DevId is required.');
        }
        const request = new XMLRequest('FetchToken', {
            SessionID: sessionId
        }, this.getRequestConfig('FetchToken'));

        return request.run();
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
            endpoint: AuthNAuth.API_ENDPOINT[this.sandbox ? 'sandbox' : 'production'],
            headers: {
                'X-EBAY-API-CALL-NAME': callname,
                'X-EBAY-API-CERT-NAME': this.certId,
                'X-EBAY-API-APP-NAME': this.appId,
                'X-EBAY-API-DEV-NAME': this.devId,
                'X-EBAY-API-SITEID': this.siteId,
                'X-EBAY-API-COMPATIBILITY-LEVEL': 967
            }
        };
    }
}