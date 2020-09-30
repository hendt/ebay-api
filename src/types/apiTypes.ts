import {MarketplaceId} from '../enums';

export type Scope = string[];

export type Interceptors = {
    request?: (value: any) => any;
    response?: (value: any) => any;
};

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
    contentLanguage?: string
    acceptLanguage?: string
};

export type RequestConfig = {
    interceptors?: Interceptors,
    maxRequests?: number
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
