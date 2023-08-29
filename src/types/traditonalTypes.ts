import ClientAlertsCalls from '../api/traditional/clientAlerts/index.js';
import {Fields} from '../api/traditional/fields.js';
import FindingCalls from '../api/traditional/finding/index.js';
import MerchandisingCalls from '../api/traditional/merchandising/index.js';
import ShoppingCalls from '../api/traditional/shopping/index.js';
import TradingCalls from '../api/traditional/trading/index.js';
import {TraditionalApiConfig} from '../api/traditional/XMLRequest.js';

export type XMLApiCall = (fields?: Fields | null, apiConfig?: TraditionalApiConfig) => Promise<any>;

export type Trading = {
  [key in keyof typeof TradingCalls]: XMLApiCall;
};

export type Shopping = {
  [key in keyof typeof ShoppingCalls]: XMLApiCall;
};

export type Finding = {
  [key in keyof typeof FindingCalls]: XMLApiCall;
};

export type ClientAlerts = {
  [key in keyof typeof ClientAlertsCalls]: (fields?: object, options?: TraditionalApiConfig) => Promise<any>;
};

export type Merchandising = {
  [key in keyof typeof MerchandisingCalls]: (fields?: object, options?: TraditionalApiConfig) => Promise<any>;
};

type Endpoint = {
  production: string,
  sandbox: string
};

export type TraditionalApi = {
  endpoint: Endpoint,
  xmlns: string,
  path: string,
  calls: typeof TradingCalls | typeof ShoppingCalls | typeof FindingCalls | typeof ClientAlertsCalls | typeof MerchandisingCalls,
  headers: (callName: string, accessToken?: string | null) => object
};
