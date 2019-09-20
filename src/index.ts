import Factory from "./api/factory";
import {Env_Error} from "./errors";
import {Buy} from "./api/restful/buy";
import {Commerce} from "./api/restful/commerce";
import {Developer} from "./api/restful/developer";
import {Sell} from "./api/restful/sell";
import {Finding, Shopping, Trading} from "./api/traditional";
import {GlobalSettings, Settings, SiteID} from "./types";

const defaultSettings: GlobalSettings = {
    sandbox: false,
    site: SiteID.EBAY_DE,
    raw: false,      // return raw XML -> JSON response from Ebay
    perPage: 100,
    grant_type: 'client_credentials',
    //you may need to define the oauth scope
    scope: 'https://api.ebay.com/oauth/api_scope'
};

export default class EBay {

    private readonly factory: Factory;
    private readonly globals: Settings;

    // RESTful
    private _buy?: Buy;
    private _commerce?: Commerce;
    private _developer?: Developer;
    private _sell?: Sell;

    // Traditional
    private _trading?: Trading;
    private _finding?: Finding;
    private _shopping?: Shopping;

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
     */
    constructor(settings: Settings) {
        this.globals = {...defaultSettings, ...settings};
        this.factory = new Factory(this.globals);
    }

    get buy(): Buy {
        return this._buy || (this._buy = this.factory.createBuyApi());
    }

    get commerce(): Commerce {
        return this._commerce || (this._commerce = this.factory.createCommerceApi());
    }

    get developer(): Developer {
        return this._developer || (this._developer = this.factory.createDeveloperApi());
    }

    get sell(): Sell {
        return this._sell || (this._sell = this.factory.createSellApi());
    }

    // Traditional

    get trading(): Trading {
        return this._trading || (this._trading = this.factory.createTradingApi());
    }

    get finding(): Finding {
        return this._finding || (this._finding = this.factory.createFindingApi());
    }

    get shopping(): Shopping {
        return this._shopping || (this._shopping = this.factory.createShoppingApi());
    }
}

export {
    SiteID,
    GlobalSettings
}
