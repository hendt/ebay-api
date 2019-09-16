import XMLRequest from "./XMLRequest";
import TradingCalls from "./tradingCalls";
import ShoppingCalls from "./shoppingCalls";
import FindingCalls from "./findingCalls";
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

export type AllCalls = typeof TradingCalls | typeof ShoppingCalls | typeof FindingCalls;

export default class Traditional {
    readonly endpoints = {
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

    readonly globals: Settings;

    constructor(globals: Settings) {
        this.globals = globals;
    }

    createTraditionalApi<T>(calls: AllCalls, endpoint: string, headers: (call: string) => Promise<any>, xmlns: string): T {
        const service: any = {};
        for (let call in calls) {
            service[call] = async (fields: object = {}, config?: any) => {
                const eBayHeaders = await headers(call);
                const request = new XMLRequest(call, fields, this.globals, endpoint, eBayHeaders, xmlns);
                return request.run(config)
            };
        }

        return service;
    }

    createTradingApi(): Trading {
        const endpoint = this.endpoints.Trading[this.globals.sandbox ? 'sandbox' : 'production'];
        const headers = async (call: string) => {
            return {
                "X-EBAY-API-CALL-NAME": call,
                "X-EBAY-API-CERT-NAME": this.globals.certId,
                "X-EBAY-API-APP-NAME": this.globals.appId,
                "X-EBAY-API-DEV-NAME": this.globals.devId,
                "X-EBAY-API-SITEID": this.globals.site || 0,
                "X-EBAY-API-COMPATIBILITY-LEVEL": 967
            }
        };
        const xmlns = 'urn:ebay:apis:eBLBaseComponents';
        return this.createTraditionalApi<Trading>(TradingCalls, endpoint, headers, xmlns);
    }

    createShoppingApi(): Shopping {
        const headers = async (call: string) => ({
            "X-EBAY-API-APP-ID": this.globals.appId,
            "X-EBAY-API-SITE-ID": this.globals.site || 0,
            "X-EBAY-API-CALL-NAME": call,
            "X-EBAY-API-VERSION": 863,
            "X-EBAY-API-REQUEST-ENCODING": "xml"
        });
        const xmlns = 'urn:ebay:apis:eBLBaseComponents';
        return this.createTraditionalApi<Shopping>(ShoppingCalls, this.endpoints.Shopping.production, headers, xmlns);
    }

    createFindingApi(): Finding {
        const headers = async (call: string) => ({
            "X-EBAY-SOA-SECURITY-APPNAME": this.globals.appId,
            "X-EBAY-SOA-OPERATION-NAME": call
        });
        const xmlns = 'http://www.ebay.com/marketplace/search/v1/services';
        return this.createTraditionalApi<Finding>(FindingCalls, this.endpoints.FindingService.production, headers, xmlns);
    }
}