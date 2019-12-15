import ClientAlertsCalls from './clientAlerts/index';
import {Fields} from './fields';
import FindingCalls from './finding/index';
import ShoppingCalls from './shopping/index';
import TradingCalls from './trading/index';
import {Options} from './XMLRequest';

export type XMLApiCall = (fields?: Fields, options?: Options) => Promise<any>;

export type Trading = {
    [key in TradingCalls]: XMLApiCall;
};

export type Shopping = {
    [key in ShoppingCalls]: XMLApiCall;
};

export type Finding = {
    [key in FindingCalls]: XMLApiCall;
};

export type ClientAlerts = {
    [key in ClientAlertsCalls]: (fields?: object, options?: Options) => Promise<any>;
};

type Endpoint = {
    production: string,
    sandbox: string
};

export type TraditionalApi = {
    endpoint: Endpoint,
    xmlns: string,
    calls: typeof TradingCalls | typeof ShoppingCalls | typeof FindingCalls | typeof ClientAlertsCalls,
    headers: (callname: string, accessToken?: string) => object
};
