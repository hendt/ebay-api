import Api from './api';
import ApiFactory from './api/apiFactory';
import {Buy} from './api/restful/buy';
import {Commerce} from './api/restful/commerce';
import {Developer} from './api/restful/developer';
import {PostOrder} from './api/restful/postOrder';
import {Sell} from './api/restful/sell';
import AuthNAuth from './auth/authNAuth';
import OAuth2 from './auth/oAuth2';
import {ContentLanguage, Locale, MarketplaceId, SiteId} from './enums';
import {ApiEnvError} from './errors';
import {IEBayApiRequest} from './request';
import {AppConfig, ClientAlerts, Finding, Keyset, Shopping, Trading} from './types';

const defaultConfig: Omit<AppConfig, keyof Keyset> = {
  sandbox: false,
  autoRefreshToken: true,
  siteId: SiteId.EBAY_US,
  marketplaceId: MarketplaceId.EBAY_US,
  acceptLanguage: Locale.en_US,
  contentLanguage: ContentLanguage.en_US
};

// tslint:disable-next-line:class-name
class eBayApi extends Api {
  public static SiteId = SiteId;
  public static MarketplaceId = MarketplaceId;
  public static ContentLanguage = ContentLanguage;
  public static Locale = Locale;

  /**
   * Loads config from `process.env`
   *
   * @return {eBayApi} a new eBayApi instance
   * @param {request} req request
   * @throws {ApiEnvError}
   */
  public static fromEnv(req?: IEBayApiRequest) {
    if (!process.env.EBAY_APP_ID) {
      throw new ApiEnvError('EBAY_APP_ID');
    }
    if (!process.env.EBAY_CERT_ID) {
      throw new ApiEnvError('EBAY_CERT_ID');
    }
    if (!process.env.EBAY_DEV_ID) {
      throw new ApiEnvError('EBAY_DEV_ID');
    }

    return new eBayApi({
        appId: process.env.EBAY_APP_ID,
        certId: process.env.EBAY_CERT_ID,
        devId: process.env.EBAY_DEV_ID,
        authToken: process.env.EBAY_AUTH_TOKEN,
        siteId: process.env.EBAY_SITE_ID ? parseInt(process.env.EBAY_SITE_ID, 10) : SiteId.EBAY_US,
        marketplaceId: process.env.EBAY_MARKETPLACE_ID && process.env.EBAY_MARKETPLACE_ID in MarketplaceId ?
          MarketplaceId[process.env.EBAY_MARKETPLACE_ID as keyof typeof MarketplaceId] as MarketplaceId :
          MarketplaceId.EBAY_US,
        ruName: process.env.EBAY_RU_NAME,
        sandbox: (process.env.EBAY_SANDBOX === 'true')
      },
      req);
  }

  // Shortcuts to auth
  public readonly authNAuth: AuthNAuth;
  public readonly oAuth2: OAuth2;
  // tslint:disable-next-line:variable-name
  public readonly OAuth2: OAuth2;

  private readonly factory: ApiFactory;

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
   * @param {IEBayApiRequest} req the request
   */
  constructor(config: AppConfig, req?: IEBayApiRequest) {
    super({...defaultConfig, ...config}, req)

    this.factory = new ApiFactory(this.config, this.req, this.auth);

    // Shortcuts
    this.authNAuth = this.auth.authNAuth;
    this.OAuth2 = this.auth.OAuth2;
    this.oAuth2 = this.OAuth2;
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
