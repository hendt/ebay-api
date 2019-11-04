import Factory from './api/factory';
import {EnvError} from './errors';
import {Buy} from './api/restful/buy';
import {Commerce} from './api/restful/commerce';
import {Developer} from './api/restful/developer';
import {Sell} from './api/restful/sell';
import {AppConfig, Config, SiteId} from './types';
import OAuth2 from './api/оAuth2';
import AuthNAuth from './api/authNAuth';
import {LimitedRequest, createRequest} from './utils/request';
import {ClientAlerts, Finding, Shopping, Trading} from './api/traditional/types';

const defaultConfig = {
    sandbox: false,
    siteId: SiteId.EBAY_DE
};

export default class eBayApi {
    static SiteId = SiteId;
    static Factory = Factory;
    static OAuth2 = OAuth2;
    static AuthNAuth = AuthNAuth;

    readonly oAuth2: OAuth2;
    readonly authNAuth: AuthNAuth;

    readonly appConfig: AppConfig;

    private readonly factory: Factory;
    private readonly config: Config;
    private readonly req: LimitedRequest;

    // RESTful
    private _buy?: Buy;
    private _commerce?: Commerce;
    private _developer?: Developer;
    private _sell?: Sell;

    // Traditional
    private _trading?: Trading;
    private _finding?: Finding;
    private _shopping?: Shopping;
    private _clientAlerts?: ClientAlerts;

    /**
     * Loads settings from `process.env`
     *
     * @return {this}          a new Ebay instance
     * @param {request} req request
     * @throws {EnvError}
     */
    static fromEnv(req = createRequest()) {
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
                ruName: process.env.EBAY_RU_NAME,
                sandbox: (process.env.EBAY_SANDBOX === 'true')
            },
            req);
    }

    /**
     * @param {Object}  config the global config
     * @param {LimitedRequest} req the request
     */
    constructor(config: Config, req?: LimitedRequest) {
        this.config = {...defaultConfig, ...config};
        this.req = req || createRequest(this.config.interceptors);

        this.appConfig = {
            appId: this.config.appId,
            certId: this.config.certId,
            devId: this.config.devId,
            sandbox: this.config.sandbox,
            ruName: this.config.ruName
        };

        this.oAuth2 = new OAuth2(
            this.appConfig,
            this.config.scope,
            this.req
        );

        this.authNAuth = new AuthNAuth(
            this.appConfig,
            this.config.authToken,
            this.req
        );

        this.factory = new Factory(
            this.appConfig,
            {
                oAuth2: this.oAuth2,
                authNAuth: this.authNAuth
            },
            this.req);
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

    get clientAlerts(): ClientAlerts {
        return this._clientAlerts || (this._clientAlerts = this.factory.createClientAlertsApi());
    }
}

