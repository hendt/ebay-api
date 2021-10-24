import {AxiosRequestConfig} from 'axios';
import {ContentLanguage, MarketplaceId} from '../enums/index.js';

export type Scope = string[];

export type Keyset = {
  appId: string, // (Client ID)
  certId: string, // (Client Secret)
  devId?: string,
};

export type RestConfig = {
  marketplaceId?: MarketplaceId,
  endUserCtx?: string,
  contentLanguage?: ContentLanguage
  acceptLanguage?: string
}

export type TraditionalConfig = {
  siteId?: number
  authToken?: string | null
}

export type eBayConfig = Keyset & {
  sandbox: boolean,
  ruName?: string,
  scope?: Scope,
} & TraditionalConfig & RestConfig;

export type ApiConfig = {
  autoRefreshToken?: boolean,
  axiosConfig?: AxiosRequestConfig
}

export type Headers = Record<string, string | number | undefined>;

export type ApiRequestConfig = {
  headers?: Headers,
  returnResponse?: boolean
}

export type AppConfig = eBayConfig & ApiConfig;


