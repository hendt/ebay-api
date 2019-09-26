import XMLRequest from "./XMLRequest";
import ClientAlertsCalls from "./clientAlerts";
import TradingCalls from "./trading";
import ShoppingCalls from "./shopping";
import FindingCalls from "./finding";
import request from '../../utils/request';
import {Settings} from "../../types";

type ApiCall = (fields?: object, config?: object) => Promise<any>;

export type Trading = {
    [key in typeof TradingCalls[number]]: ApiCall;
}

export type Shopping = {
    [key in typeof ShoppingCalls[number]]: ApiCall;
}

export type Finding = {
    [key in typeof FindingCalls[number]]: ApiCall;
}

export type ClientAlerts = {
    [key in typeof ClientAlertsCalls[number]]: ApiCall;
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

    constructor(globals: Settings) {
        this.settings = globals;
    }

    private createTraditionalXMLApi<T>(calls: AllCalls, endpoint: string, headers: (call: string) => Promise<any>, xmlns: string): T {
        const service: any = {};
        for (let call in calls) {
            service[call] = async (fields: object = {}, config?: any) => {
                const eBayHeaders = await headers(call);
                const request = new XMLRequest(call, fields, this.settings, endpoint, eBayHeaders, xmlns);
                return request.run(config)
            };
        }

        return service;
    }

    createClientAlertsApi(): ClientAlerts {
        const endpoint = this.endpoints.ClientAlerts[this.settings.sandbox ? 'sandbox' : 'production'];
        const service: any = {};
        const params = {
            appid: this.settings.appId,
            siteid: this.settings.siteId,
            version: 643
        };

        for (let call in ClientAlertsCalls) {
            service[call] = async (fields: object = {}, config?: any) => {
                return request.getCFP(endpoint, {
                    params: {
                        ...params,
                        ...fields,
                        callname: call
                    }
                });
            }
        }
        return service;
    }

    createTradingApi(): Trading {
        const endpoint = this.endpoints.Trading[this.settings.sandbox ? 'sandbox' : 'production'];
        const headers = async (call: string) => {
            return {
                "X-EBAY-API-CALL-NAME": call,
                "X-EBAY-API-CERT-NAME": this.settings.certId,
                "X-EBAY-API-APP-NAME": this.settings.appId,
                "X-EBAY-API-DEV-NAME": this.settings.devId,
                "X-EBAY-API-SITEID": this.settings.siteId,
                "X-EBAY-API-COMPATIBILITY-LEVEL": 967
            }
        };
        const xmlns = 'urn:ebay:apis:eBLBaseComponents';
        return this.createTraditionalXMLApi<Trading>(TradingCalls, endpoint, headers, xmlns);
    }

    createShoppingApi(): Shopping {
        const headers = async (call: string) => ({
            "X-EBAY-API-APP-ID": this.settings.appId,
            "X-EBAY-API-SITE-ID": this.settings.siteId,
            "X-EBAY-API-CALL-NAME": call,
            "X-EBAY-API-VERSION": 863,
            "X-EBAY-API-REQUEST-ENCODING": "xml"
        });
        const xmlns = 'urn:ebay:apis:eBLBaseComponents';
        return this.createTraditionalXMLApi<Shopping>(ShoppingCalls, this.endpoints.Shopping.production, headers, xmlns);
    }

    createFindingApi(): Finding {
        const headers = async (call: string) => ({
            "X-EBAY-SOA-SECURITY-APPNAME": this.settings.appId,
            "X-EBAY-SOA-OPERATION-NAME": call
        });
        const xmlns = 'http://www.ebay.com/marketplace/search/v1/services';
        return this.createTraditionalXMLApi<Finding>(FindingCalls, this.endpoints.FindingService.production, headers, xmlns);
    }
}