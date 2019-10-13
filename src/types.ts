import OAuth2 from './api/оAuth2';

export enum SiteId {
    EBAY_US = 0,
    EBAY_ENCA = 2,
    EBAY_GB = 3,
    EBAY_AU = 15,
    EBAY_AT = 16,
    EBAY_FRBE = 23,
    EBAY_FR = 71,
    EBAY_DE = 77,
    EBAY_MOTOR = 100,
    EBAY_IT = 101,
    EBAY_NLBE = 123,
    EBAY_NL = 146,
    EBAY_ES = 186,
    EBAY_CH = 193,
    EBAY_HK = 201,
    EBAY_IN = 203,
    EBAY_IE = 205,
    EBAY_MY = 207,
    EBAY_FRCA = 210,
    EBAY_PH = 211,
    EBAY_PL = 212,
    EBAY_SG = 216
}

type Keyset = {
    appId: string, // (Client ID)
    certId: string, // (Client Secret)
    devId: string,
}
/**
 * defaults for eBay API
 */
export type Settings = Keyset & {
    authToken?: string,
    sandbox: boolean,
    siteId?: number,
    ruName?: string,
    scope?: string[]
}

export type AuthToken = {
    eBayAuthToken: string,
    Timestamp?: string,
    HardExpirationTime?: string
}

export type Auth = {
    oAuth2: OAuth2,
    authToken?: AuthToken,
    sandbox: boolean,
    ruName?: string
}