import {Fields} from './fields';
import {Options} from './XMLRequest';
import TradingCalls from './trading/index';
import ShoppingCalls from './shopping/index';
import FindingCalls from './finding/index';
import ClientAlertsCalls from './clientAlerts/index';

export type XMLApiCall = (fields?: Fields, options?: Options) => Promise<any>;

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