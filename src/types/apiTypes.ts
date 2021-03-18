import {AxiosRequestConfig} from 'axios';
import {ContentLanguage, MarketplaceId} from '../enums';

export type Scope = string[];

export type Keyset = {
  appId: string, // (Client ID)
  certId: string, // (Client Secret)
  devId?: string,
};

export type eBayConfig = Keyset & {
  sandbox: boolean,
  siteId?: number,
  ruName?: string,

  scope?: Scope,
  authToken?: string,

  // Rest Config
  marketplaceId?: MarketplaceId,
  endUserCtx?: string,
  contentLanguage?: ContentLanguage
  acceptLanguage?: string
};

export type RequestConfig = {
  axiosConfig?: AxiosRequestConfig
};

/**
 * Not eBay Config.
 */
export type AppConfig = eBayConfig & RequestConfig;

export type AuthToken = {
  eBayAuthToken: string,
  Timestamp?: string,
  HardExpirationTime?: string
};
