import qs from 'qs';
import XMLRequest, {Options} from './XMLRequest';
import ClientAlertsCalls from './clientAlerts';
import TradingCalls from './trading';
import ShoppingCalls from './shopping';
import FindingCalls from './finding';
import {AppConfig} from '../../types';
import {Fields} from './fields';
import {EBayIAFTokenExpired} from '../../errors';
import {createRequest, LimitedRequest} from '../../utils/request';
import {ClientAlerts, Finding, Shopping, Trading} from './types';

export type AuthNOAuth2 = {
    geteBayAuthToken?(): string | null;
    getOAuth2AccessToken?(): string | null;

    refreshOAuth2Token?(): Promise<void>;
}

/**
 * Traditional eBay API.
 */
export class Traditional {
    readonly appConfig: AppConfig;

    private readonly authNOAuth2: AuthNOAuth2;
    private readonly req: LimitedRequest;

    constructor(appConfig: AppConfig, authNOAuth2: AuthNOAuth2, req: LimitedRequest = createRequest()) {
        this.appConfig = appConfig;

        this.authNOAuth2 = authNOAuth2;
        this.req = req;
    }

    public createTradingApi(): Trading {
        if (!this.appConfig.devId) {
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
                'X-EBAY-API-CERT-NAME': this.appConfig.certId,
                'X-EBAY-API-APP-NAME': this.appConfig.appId,
                'X-EBAY-API-DEV-NAME': this.appConfig.devId,
                'X-EBAY-API-SITEID': this.appConfig.siteId,
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
                'X-EBAY-API-APP-ID': this.appConfig.appId,
                'X-EBAY-API-SITE-ID': this.appConfig.siteId,
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
                'X-EBAY-SOA-SECURITY-APPNAME': this.appConfig.appId,
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

        const endpoint = api.endpoint[this.appConfig.sandbox ? 'sandbox' : 'production'];
        const paramsSerializer = (params: object) => {
            return qs.stringify(params, {allowDots: true})
                .replace(/%5B/gi, '(')
                .replace(/%5D/gi, ')');
        };

        const params = {
            appid: this.appConfig.appId,
            siteid: this.appConfig.siteId,
            version: 643
        };

        const service: any = {};
        Object.keys(ClientAlertsCalls).forEach((callname: string) => {
            service[callname] = async (fields: Fields) => {
                return this.req.get(endpoint, {
                    paramsSerializer,
                    params: {
                        ...params,
                        ...fields,
                        callname
                    }
                });
            };
        });

        return service;
    }

    // TODO
    public createPostOrderApi() {
        const api = {
            headers: () => ({}),
            iaf: (accessToken: string) => ({'Authorization': 'IAF ' + accessToken})
        };

        return api;
    }

    // TODO
    public createBusinessPolicyManagementApi() {
        const api = {
            headers: () => ({}),
            iaf: (accessToken: string) => ({'X-EBAY-SOA-SECURITY-IAFTOKEN': accessToken})
        };

        return api;
    }

    get geteBayAuthToken(): string | null {
        return this.authNOAuth2.geteBayAuthToken ? this.authNOAuth2.geteBayAuthToken() : null;
    }

    get getOAuth2AccessToken(): string | null {
        return this.authNOAuth2.getOAuth2AccessToken ? this.authNOAuth2.getOAuth2AccessToken() : null;
    }

    public createXMLRequest = (callname: string, api: any) => async (fields: Fields, options?: Options) => {
        const eBayAuthToken = this.geteBayAuthToken;
        const accessToken = this.getOAuth2AccessToken;
        // Use IAF Token?
        let iafHeaders = {};
        if (api.iaf && !eBayAuthToken && accessToken) {
            iafHeaders = api.iaf(accessToken);
        }

        const config = {
            xmlns: api.xmlns,
            endpoint: api.endpoint[this.appConfig.sandbox ? 'sandbox' : 'production'],
            headers: {
                ...api.headers(callname),
                ...iafHeaders
            },
            ...(eBayAuthToken && {eBayAuthToken})
        };

        const request = new XMLRequest(callname, fields, config, this.req);

        return request.run(options).catch((ex) => {
            if (ex.name === EBayIAFTokenExpired.name && this.authNOAuth2.refreshOAuth2Token) {
                return this.authNOAuth2.refreshOAuth2Token().then(() => {
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
        Object.keys(api).map((callname: string) => {
            service[callname] = this.createXMLRequest(callname, api);
        });

        return service;
    }
}