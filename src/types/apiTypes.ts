import {AxiosRequestConfig} from 'axios';
import type {X2jOptions} from 'fast-xml-parser';
import {Locale, MarketplaceId, SiteId} from '../enums/index.js';

export type Scope = string[];

export type Keyset = {
  appId: string, // (Client ID)
  certId: string, // (Client Secret)
  devId?: string,
};

export type RestConfig = {
  marketplaceId?: MarketplaceId | `${MarketplaceId}`,
  endUserCtx?: string,
  contentLanguage?: Locale | `${Locale}`
  acceptLanguage?: Locale | `${Locale}`
}

export type TraditionalConfig = {
  siteId?: SiteId | `${SiteId}`
  authToken?: string | null
}

export type Cipher = 'sha256' | 'sha512';

export type Signature = {
  cipher?: Cipher
  jwe: string, // The value of the x-ebay-signature-key header is the Public Key as JWE value that has been created by the Key Management API.
  privateKey: string
}

export type eBayConfig = Keyset & {
  sandbox: boolean,
  ruName?: string,
  scope?: Scope,
  signature?: Signature | null
} & TraditionalConfig & RestConfig;

export type ApiConfig = {
  autoRefreshToken?: boolean,
  axiosConfig?: AxiosRequestConfig,
  parseOptions?: X2jOptions
}

export type Headers = Record<string, string | number | undefined>;

export type ApiRequestConfig = {
  headers?: Headers,
  returnResponse?: boolean
}

export type AppConfig = eBayConfig & ApiConfig;


