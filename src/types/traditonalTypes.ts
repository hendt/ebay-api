import ClientAlertsCalls from '../api/traditional/clientAlerts/index.js';
import {Fields} from '../api/traditional/fields.js';
import FindingCalls from '../api/traditional/finding/index.js';
import MerchandisingCalls from '../api/traditional/merchandising/index.js';
import ShoppingCalls from '../api/traditional/shopping/index.js';
import TradingCalls from '../api/traditional/trading/index.js';
import {TraditionalApiConfig} from '../api/traditional/XMLRequest.js';

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
