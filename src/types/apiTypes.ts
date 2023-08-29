import {AxiosRequestConfig} from 'axios';
import {ContentLanguage, MarketplaceId, SiteId} from '../enums/index.js';

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
  axiosConfig?: AxiosRequestConfig
}

export type Headers = Record<string, string | number | undefined>;

export type ApiRequestConfig = {
  headers?: Headers,
  returnResponse?: boolean
}

export type AppConfig = eBayConfig & ApiConfig;


