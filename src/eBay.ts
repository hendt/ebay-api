import Factory from "./api/factory";
import {Env_Error} from "./errors";
import {Buy} from "./api/restful/buy";
import {Commerce} from "./api/restful/commerce";
import {Developer} from "./api/restful/developer";
import {Sell} from "./api/restful/sell";
import {Finding, Shopping, Trading} from "./api/traditional";

/**
 * defaults for eBay API
 */
type GlobalSettings = {
    sandbox?: boolean,
    site?: number,
    raw?: boolean,
    perPage?: number,
    follow?: boolean,
    grant_type?: string,
    scope?: string
}

type AuthSettings = {
    appId: string, // (Client ID)
    certId: string, // (Client Secret)
    devId: string,
    authNAuth?: string,
    sandbox: boolean
};

export type Settings = GlobalSettings & AuthSettings;

const defaultSettings: GlobalSettings = {
    sandbox: false,
    site: 0,
    raw: false,      // return raw XML -> JSON response from Ebay
    perPage: 100,
    grant_type: 'client_credentials',
    //you may need to define the oauth scope
    scope: 'https://api.ebay.com/oauth/api_scope'
};

export default class EBay {

    private factory: Factory;
    readonly globals: Settings;

    // RESTful
    buy: Buy;
    commerce: Commerce;
    developer: Developer;
    sell: Sell;

    // Traditional
    trading: Trading;
    finding: Finding;
    shopping: Shopping;

    /**
     * Loads credentials from `process.env`
     *
     * @return {this}          a new Ebay instance
     * @throws {Env_Error}
     */
    static fromEnv() {
        if (!process.env.EBAY_TOKEN) {
            throw new Env_Error("EBAY_TOKEN");
        }
        if (!process.env.EBAY_CERT_ID) {
            throw new Env_Error("EBAY_CERT_ID");
        }
        if (!process.env.EBAY_APP_ID) {
            throw new Env_Error("EBAY_APP_ID");
        }
        if (!process.env.EBAY_DEV_ID) {
            throw new Env_Error("EBAY_DEV_ID");
        }
        return new EBay({
            appId: process.env.EBAY_APP_ID,
            authNAuth: process.env.AUTH_N_AUTH,
            certId: process.env.EBAY_CERT_ID,
            devId: process.env.EBAY_DEV_ID,
            sandbox: !!process.env.EBAY_SANDBOX || false
        })
    }

    /**
     * @param      {Object}  settings the global settings
     * @return     {EBay}
     */
    constructor(settings: Settings) {
        /**
         * global settings for all following Ebay requests
         */
        this.globals = {...defaultSettings, ...settings};
        this.factory = new Factory(this.globals);

        this.buy = this.factory.createBuyApi();
        this.commerce = this.factory.createCommerceApi();
        this.developer = this.factory.createDeveloperApi();
        this.sell = this.factory.createSellApi();

        // Traditional
        this.trading = this.factory.createTradingApi();
        this.finding = this.factory.createFindingApi();
        this.shopping = this.factory.createShoppingApi();

        /**
         * insure an error is thrown if internals are changed
         * allows for better assertions about the statefulness
         */
        Object.freeze(this.globals);

        return this;
    }

}
