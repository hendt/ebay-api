import Factory from './api/factory';
import {Buy} from './api/restful/buy';
import {Commerce} from './api/restful/commerce';
import {Developer} from './api/restful/developer';
import {PostOrder} from './api/restful/postOrder';
import {Sell} from './api/restful/sell';
import {ClientAlerts, Finding, Shopping, Trading} from './types/traditonalTypes';
import Auth from './auth';
import AuthNAuth from './auth/authNAuth';
import OAuth2 from './auth/оAuth2';
import {MarketplaceId, SiteId} from './enums';
import {EnvError} from './errors';
import {AppConfig} from './types/apiTypes';
import {createRequest, ILimitedRequest} from './utils/request';

const defaultConfig = {
    sandbox: false,
    siteId: SiteId.EBAY_DE,
    marketplaceId: MarketplaceId.EBAY_DE
};

// tslint:disable-next-line:class-name
class eBayApi {

    public static SiteId = SiteId;
    public static MarketplaceId = MarketplaceId;

    /**
     * Loads settings from `process.env`
     *
     * @return {eBayApi} a new eBayApi instance
     * @param {request} req request
     * @throws {EnvError}
     */
    public static fromEnv(req = createRequest()) {
        if (!process.env.EBAY_APP_ID) {
            throw new EnvError('EBAY_APP_ID');
        }
        if (!process.env.EBAY_CERT_ID) {
            throw new EnvError('EBAY_CERT_ID');
        }
        if (!process.env.EBAY_DEV_ID) {
            throw new EnvError('EBAY_DEV_ID');
        }

        return new eBayApi({
                appId: process.env.EBAY_APP_ID,
                certId: process.env.EBAY_CERT_ID,
                devId: process.env.EBAY_DEV_ID,
                authToken: process.env.EBAY_AUTH_TOKEN,
                siteId: process.env.EBAY_SITE_ID ? parseInt(process.env.EBAY_SITE_ID, 10) : SiteId.EBAY_DE,
                marketplaceId: process.env.EBAY_MARKETPLACE_ID && process.env.EBAY_MARKETPLACE_ID in MarketplaceId ?
                    MarketplaceId[process.env.EBAY_MARKETPLACE_ID as keyof typeof MarketplaceId] as MarketplaceId :
                    MarketplaceId.EBAY_DE,
                ruName: process.env.EBAY_RU_NAME,
                sandbox: (process.env.EBAY_SANDBOX === 'true')
            },
            req);
    }

    public readonly auth: Auth;

    // Shortcuts to auth
    public readonly authNAuth: AuthNAuth;
    public readonly oAuth2: OAuth2;

    public readonly appConfig: AppConfig;
    public readonly req: ILimitedRequest;

    private readonly factory: Factory;

    // RESTful API
    private _buy?: Buy;
    private _commerce?: Commerce;
    private _developer?: Developer;
    private _postOrder?: PostOrder;
    private _sell?: Sell;

    // Traditional API
    private _trading?: Trading;
    private _finding?: Finding;
    private _shopping?: Shopping;
    private _clientAlerts?: ClientAlerts;

    /**
     * @param {AppConfig} config the app config
     * @param {ILimitedRequest} req the request
     */
    constructor(config: AppConfig, req?: ILimitedRequest) {
        this.appConfig = {...defaultConfig, ...config};
        this.req = req || createRequest(this.appConfig);

        this.auth = new Auth(
            this.appConfig,
            this.req
        );

        this.authNAuth = this.auth.authNAuth;
        this.oAuth2 = this.auth.oAuth2;

        this.factory = new Factory(
            this.auth,
            this.req
        );
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

    get postOrder(): PostOrder {
        return this._postOrder || (this._postOrder = this.factory.createPostOrderApi());
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

    get clientAlerts(): ClientAlerts {
        return this._clientAlerts || (this._clientAlerts = this.factory.createClientAlertsApi());
    }
}

export = eBayApi
