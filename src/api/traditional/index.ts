import qs from 'qs';
import XMLRequest, {Options} from './XMLRequest';
import ClientAlertsCalls from './clientAlerts';
import TradingCalls from './trading';
import ShoppingCalls from './shopping';
import FindingCalls from './finding';
import {Auth, SiteId} from '../../types';
import {Fields} from './fields';
import {EBayIAFTokenExpired} from '../../errors';
import OAuth2 from '../оAuth2';
import AuthNAuth from '../authNAuth';
import {createRequest, LimitedRequest} from '../../utils/request';

type XMLApiCall = (fields?: Fields, options?: Options) => Promise<any>;

export type Trading = {
    [key in typeof TradingCalls[number]]: XMLApiCall;
}

export type Shopping = {
    [key in typeof ShoppingCalls[number]]: XMLApiCall;
}

export type Finding = {
    [key in typeof FindingCalls[number]]: XMLApiCall;
}

export type ClientAlerts = {
    [key in typeof ClientAlertsCalls[number]]: (fields?: object, options?: Options) => Promise<any>;
}

/**
 * Traditional eBay API.
 */
export default class Traditional {
    readonly appId: string;
    readonly certId: string;
    readonly devId?: string;
    readonly siteId: number;

    private readonly oAuth2: OAuth2;
    private readonly authNAuth: AuthNAuth;
    private readonly req: LimitedRequest;

    constructor(auth: Auth, appId: string, certId: string, devId?: string, siteId = SiteId.EBAY_DE, req: LimitedRequest = createRequest()) {
        this.appId = appId;
        this.certId = certId;
        this.devId = devId;
        this.siteId = siteId;

        this.oAuth2 = auth.oAuth2;
        this.authNAuth = auth.authNAuth;
        this.req = req;
    }

    public createTradingApi(): Trading {
        if (!this.devId) {
            throw new Error('DevId is required for trading API.');
        }
        return this.createTraditionalXMLApi<Trading>({
            endpoint: {
                production: 'https://api.ebay.com/ws/api.dll',
                sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
            },
            calls: TradingCalls,
            xmlns: 'urn:ebay:apis:eBLBaseComponents',
            headers: (callname: string) => ({
                'X-EBAY-API-CALL-NAME': callname,
                'X-EBAY-API-CERT-NAME': this.certId,
                'X-EBAY-API-APP-NAME': this.appId,
                'X-EBAY-API-DEV-NAME': this.devId,
                'X-EBAY-API-SITEID': this.siteId,
                'X-EBAY-API-COMPATIBILITY-LEVEL': 967
            }),
            iaf: (accessToken: string) => ({'X-EBAY-API-IAF-TOKEN': accessToken})
        });
    }

    public createShoppingApi(): Shopping {
        return this.createTraditionalXMLApi<Shopping>({
            endpoint: {
                production: 'http://open.api.ebay.com/shopping',
                sandbox: 'http://open.api.sandbox.ebay.com/shopping'
            },
            xmlns: 'urn:ebay:apis:eBLBaseComponents',
            calls: ShoppingCalls,
            headers: (callname: string) => ({
                'X-EBAY-API-CALL-NAME': callname,
                'X-EBAY-API-APP-ID': this.appId,
                'X-EBAY-API-SITE-ID': this.siteId,
                'X-EBAY-API-VERSION': 863,
                'X-EBAY-API-REQUEST-ENCODING': 'xml'
            })
        });
    }

    public createFindingApi(): Finding {
        return this.createTraditionalXMLApi<Finding>({
            endpoint: {
                production: 'https://svcs.ebay.com/services/search/FindingService/v1',
                sandbox: 'https://svcs.sandbox.ebay.com/services/search/FindingService/v1'
            },
            xmlns: 'http://www.ebay.com/marketplace/search/v1/services',
            calls: FindingCalls,
            headers: (callname: string) => ({
                'X-EBAY-SOA-SECURITY-APPNAME': this.appId,
                'X-EBAY-SOA-OPERATION-NAME': callname
            })
        });
    }

    public createClientAlertsApi(): ClientAlerts {
        const api = {
            endpoint: {
                production: 'https://clientalerts.ebay.com/ws/ecasvc/ClientAlerts',
                sandbox: 'https://clientalerts.sandbox.ebay.com/ws/ecasvc/ClientAlerts'
            },
            calls: ClientAlertsCalls
        };

        const endpoint = api.endpoint[this.authNAuth.sandbox ? 'sandbox' : 'production'];
        const paramsSerializer = (params: object) => {
            return qs.stringify(params, {allowDots: true})
                .replace(/%5B/gi, '(')
                .replace(/%5D/gi, ')');
        };

        const params = {
            appid: this.appId,
            siteid: this.siteId,
            version: 643
        };

        const service: any = {};
        for (let callname in ClientAlertsCalls) {
            service[callname] = async (fields: Fields, options?: Options) => {
                return this.req.get(endpoint, {
                    paramsSerializer,
                    params: {
                        ...params,
                        ...fields,
                        callname
                    }
                });
            };
        }
        return service;
    }

    // TODO
    public createPostOrderApi() {
        const api = {
            headers: () => ({}),
            iaf: (accessToken: string) => ({'Authorization': 'IAF ' + accessToken})
        };
    }

    // TODO
    public createBusinessPolicyManagementApi() {
        const api = {
            headers: () => ({}),
            iaf: (accessToken: string) => ({'X-EBAY-SOA-SECURITY-IAFTOKEN': accessToken})
        };
    }

    createXMLRequest = (callname: string, api: any) => async (fields: Fields, options?: Options) => {
        // Use IAF Token?
        let iafHeaders = {};
        if (api.iaf && !this.authNAuth.eBayAuthToken && this.oAuth2.accessToken) {
            iafHeaders = api.iaf(this.oAuth2.accessToken);
        }

        const config = {
            xmlns: api.xmlns,
            endpoint: api.endpoint[this.authNAuth.sandbox ? 'sandbox' : 'production'],
            headers: {
                ...api.headers(callname),
                ...iafHeaders
            },
            eBayAuthToken: this.authNAuth.eBayAuthToken
        };

        const request = new XMLRequest(callname, fields, config, this.req);

        return request.run(options).catch((ex) => {
            if (ex.name === 'EBayIAFTokenExpired') {
                return this.oAuth2.refreshAuthToken().then(() => {
                    return request.run(options);
                }).catch((ex) => {
                    throw ex;
                });
            }

            throw ex;
        });
    };

    private createTraditionalXMLApi<T>(api: any): T {
        const service: any = {};
        for (let callname in api.calls) {
            service[callname] = this.createXMLRequest(callname, api);
        }

        return service;
    }
}