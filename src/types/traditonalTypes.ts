import ClientAlertsCalls from '../api/traditional/clientAlerts';
import {Fields} from '../api/traditional/fields';
import FindingCalls from '../api/traditional/finding';
import ShoppingCalls from '../api/traditional/shopping';
import TradingCalls from '../api/traditional/trading';
import MerchandisingCalls from '../api/traditional/merchandising';
import {TraditionalApiConfig} from '../api/traditional/XMLRequest';

export type XMLApiCall = (fields?: Fields, apiConfig?: TraditionalApiConfig) => Promise<any>;

export type Trading = {
  [key in typeof TradingCalls[number]]: XMLApiCall;
};

export type Shopping = {
  [key in typeof ShoppingCalls[number]]: XMLApiCall;
};

export type Finding = {
  [key in typeof FindingCalls[number]]: XMLApiCall;
};

export type ClientAlerts = {
  [key in typeof ClientAlertsCalls[number]]: (fields?: object, options?: TraditionalApiConfig) => Promise<any>;
};

export type Merchandising = {
  [key in typeof MerchandisingCalls[number]]: (fields?: object, options?: TraditionalApiConfig) => Promise<any>;
};

type Endpoint = {
  production: string,
  sandbox: string
};

export type TraditionalApi = {
  endpoint: Endpoint,
  xmlns: string,
  calls: typeof TradingCalls | typeof ShoppingCalls | typeof FindingCalls | typeof ClientAlertsCalls | typeof MerchandisingCalls,
  headers: (callName: string, accessToken?: string | null) => object
};
