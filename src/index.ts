import Factory from "./api/factory";
import {EnvError} from "./errors";
import {Buy} from "./api/restful/buy";
import {Commerce} from "./api/restful/commerce";
import {Developer} from "./api/restful/developer";
import {Sell} from "./api/restful/sell";
import {Finding, Shopping, Trading} from "./api/traditional";
import {Settings, SiteId} from "./types";
import OAuth, {OAuthRequest} from "./api/oAuth";

const defaultSettings = {
    sandbox: false,
    siteId: SiteId.EBAY_DE
};

export default class EBay {

    readonly oAuth: OAuth;
    private readonly factory: Factory;
    private readonly settings: Settings;

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
     * @throws {EnvError}
     */
    static fromEnv() {
        if (!process.env.EBAY_APP_ID) {
            throw new EnvError("EBAY_APP_ID");
        }
        if (!process.env.EBAY_CERT_ID) {
            throw new EnvError("EBAY_CERT_ID");
        }
        if (!process.env.EBAY_DEV_ID) {
            throw new EnvError("EBAY_DEV_ID");
        }
        return new EBay({
            appId: process.env.EBAY_APP_ID,
            certId: process.env.EBAY_CERT_ID,
            devId: process.env.EBAY_DEV_ID,
            authNAuth: process.env.EBAY_AUTH_N_AUTH,
            siteId: process.env.EBAY_SITE_ID ? parseInt(process.env.EBAY_SITE_ID, 10) : SiteId.EBAY_DE,
            sandbox: !!process.env.EBAY_SANDBOX || false
        })
    }

    /**
     * @param {Object}  settings the global settings
     * @param {OAuthRequest} oAuthRequest the oAuth request
     */
    constructor(settings: Settings, oAuthRequest?: OAuthRequest) {
        this.settings = {...defaultSettings, ...settings};
        this.oAuth = new OAuth(this.settings.appId, this.settings.certId, oAuthRequest);
        this.factory = new Factory(this.settings, this.oAuth);
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
    SiteId,
    Settings
}
