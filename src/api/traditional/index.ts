import XMLRequest, {Config} from './XMLRequest';
import ClientAlertsCalls from './clientAlerts';
import TradingCalls from './trading';
import ShoppingCalls from './shopping';
import FindingCalls from './finding';
import request from '../../utils/request';
import {Settings} from '../../types';
import {Fields} from './fields';
import {Options} from './XMLRequest';
import OAuth2 from '../оAuth2';
import {Auth} from '../factory';

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

export type AllCalls = typeof TradingCalls | typeof ShoppingCalls | typeof FindingCalls | typeof ClientAlertsCalls;

export default class Traditional {
    readonly endpoints = {
        ClientAlerts: {
            production: 'https://clientalerts.ebay.com/ws/ecasvc/ClientAlerts',
            sandbox: 'https://clientalerts.sandbox.ebay.com/ws/ecasvc/ClientAlerts'
        },
        FindingService: {
            production: 'https://svcs.ebay.com/services/search/FindingService/v1'
        },
        Shopping: {
            production: 'http://open.api.ebay.com/shopping'
        },
        Trading: {
            production: 'https://api.ebay.com/ws/api.dll',
            sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
        }
    };

    readonly settings: Settings;
    readonly auth: Auth;

    constructor(settings: Settings, auth: Auth) {
        this.settings = settings;
        this.auth = auth;
    }

    private createTraditionalXMLApi<T>(calls: AllCalls, config: Config): T {
        const service: any = {};
        for (let callname in calls) {
            service[callname] = async (fields: Fields, options?: Options) => {
                const request = new XMLRequest(callname, fields, this.auth, config);
                return request.run(options);
            };
        }

        return service;
    }

    createClientAlertsApi(version = 643): ClientAlerts {
        const endpoint = this.endpoints.ClientAlerts[this.settings.sandbox ? 'sandbox' : 'production'];
        const service: any = {};
        const params = {
            appid: this.settings.appId,
            siteid: this.settings.siteId,
            version
        };

        for (let callname in ClientAlertsCalls) {
            service[callname] = async (fields: Fields, options?: Options) => {
                return request.getCFP(endpoint, {
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

    createTradingApi(compatibilityLevel = 967): Trading {
        const headers = (callname: string) => ({
            'X-EBAY-API-CALL-NAME': callname,
            'X-EBAY-API-CERT-NAME': this.settings.certId,
            'X-EBAY-API-APP-NAME': this.settings.appId,
            'X-EBAY-API-DEV-NAME': this.settings.devId,
            'X-EBAY-API-SITEID': this.settings.siteId,
            'X-EBAY-API-COMPATIBILITY-LEVEL': compatibilityLevel
        });

        const config = {
            headers,
            endpoint: this.endpoints.Trading[this.settings.sandbox ? 'sandbox' : 'production'],
            xmlns: 'urn:ebay:apis:eBLBaseComponents'
        };

        return this.createTraditionalXMLApi<Trading>(TradingCalls, config);
    }

    createShoppingApi(apiVersion = 863): Shopping {
        const headers = (callname: string) => ({
            'X-EBAY-API-CALL-NAME': callname,
            'X-EBAY-API-APP-ID': this.settings.appId,
            'X-EBAY-API-SITE-ID': this.settings.siteId,
            'X-EBAY-API-VERSION': apiVersion,
            'X-EBAY-API-REQUEST-ENCODING': 'xml'
        });

        const config = {
            endpoint: this.endpoints.Shopping.production,
            headers,
            xmlns: 'urn:ebay:apis:eBLBaseComponents'
        };

        return this.createTraditionalXMLApi<Shopping>(ShoppingCalls, config);
    }

    createFindingApi(): Finding {
        const headers = (callname: string) => ({
            'X-EBAY-SOA-SECURITY-APPNAME': this.settings.appId,
            'X-EBAY-SOA-OPERATION-NAME': callname
        });

        const config = {
            headers,
            endpoint: this.endpoints.FindingService.production,
            xmlns: 'http://www.ebay.com/marketplace/search/v1/services'
        };

        return this.createTraditionalXMLApi<Finding>(FindingCalls, config);
    }
}