import {stringify} from 'qs';
import XMLRequest, {defaultOptions, Options} from './XMLRequest';
import ClientAlertsCalls from './clientAlerts';
import TradingCalls from './trading';
import ShoppingCalls from './shopping';
import FindingCalls from './finding';
import {Fields} from './fields';
import {EBayIAFTokenExpired} from '../../errors';
import {createRequest, LimitedRequest} from '../../utils/request';
import {ClientAlerts, Finding, Shopping, Trading, TraditionalApi} from './types';
import Auth from '../../auth';

/**
 * Traditional eBay API.
 */
export default class Traditional {
    readonly auth: Auth;
    readonly req: LimitedRequest;

    constructor(auth: Auth, req: LimitedRequest = createRequest()) {
        this.auth = auth;
        this.req = req;
    }

    public createTradingApi(): Trading {
        if (!this.auth.eBayConfig.devId) {
            throw new Error('devId is required for trading API.');
        }
        return this.createTraditionalXMLApi<Trading>({
            endpoint: {
                production: 'https://api.ebay.com/ws/api.dll',
                sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
            },
            calls: TradingCalls,
            xmlns: 'urn:ebay:apis:eBLBaseComponents',
            headers: (callname: string, accessToken?: string) => ({
                'X-EBAY-API-CALL-NAME': callname,
                'X-EBAY-API-CERT-NAME': this.auth.eBayConfig.certId,
                'X-EBAY-API-APP-NAME': this.auth.eBayConfig.appId,
                'X-EBAY-API-DEV-NAME': this.auth.eBayConfig.devId,
                'X-EBAY-API-SITEID': this.auth.eBayConfig.siteId,
                'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
                ...(accessToken && {'X-EBAY-API-IAF-TOKEN': accessToken})
            })
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
                'X-EBAY-API-APP-ID': this.auth.eBayConfig.appId,
                'X-EBAY-API-SITE-ID': this.auth.eBayConfig.siteId,
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
                'X-EBAY-SOA-SECURITY-APPNAME': this.auth.eBayConfig.appId,
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

        const endpoint = api.endpoint[this.auth.eBayConfig.sandbox ? 'sandbox' : 'production'];
        const paramsSerializer = (params: object) => {
            return stringify(params, {allowDots: true})
                .replace(/%5B/gi, '(')
                .replace(/%5D/gi, ')');
        };

        const params = {
            appid: this.auth.eBayConfig.appId,
            siteid: this.auth.eBayConfig.siteId,
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
    public createBusinessPolicyManagementApi() {
        const api = {
            headers: (_: string, accessToken?: string) => ({
                ...(accessToken && {'X-EBAY-SOA-SECURITY-IAFTOKEN': accessToken})
            })
        };

        return api;
    }

    private createXMLRequest = (callname: string, api: TraditionalApi) => async (fields: Fields, opts: Options) => {
        const options = {...defaultOptions, ...opts};

        const config = this.getConfig(options, api, callname);
        const request = new XMLRequest(callname, fields, config, this.req);

        try {
            return await request.fetch(options);
        } catch (e) {
            // Try to refresh the token.
            if (e.name === EBayIAFTokenExpired.name) {
                return this.auth.oAuth2.refreshAuthToken().then(() => {
                    const config = this.getConfig(options, api, callname);
                    const request = new XMLRequest(callname, fields, config, this.req);

                    return request.fetch(options);
                }).catch((ex) => {
                    throw ex;
                });
            }

            throw e;
        }
    };

    private getConfig(options: Options, api: TraditionalApi, callname: string) {
        const eBayAuthToken = this.auth.authNAuth.eBayAuthToken;
        const accessToken = this.auth.oAuth2.accessToken;
        const useIafToken = (!eBayAuthToken || accessToken && options.useIaf);

        return {
            xmlns: api.xmlns,
            endpoint: api.endpoint[this.auth.eBayConfig.sandbox ? 'sandbox' : 'production'],
            headers: {
                ...api.headers(callname, accessToken && useIafToken ? accessToken : undefined)
            },
            ...(eBayAuthToken && !useIafToken && {eBayAuthToken})
        };
    }

    private createTraditionalXMLApi<T>(api: TraditionalApi): T {
        const service: any = {};
        Object.keys(api.calls).map((callname: string) => {
            service[callname] = this.createXMLRequest(callname, api);
        });

        return service as T;
    }
}