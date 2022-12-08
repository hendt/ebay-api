import {ClientAlerts, Finding, Shopping, Trading, Merchandising} from '../types/index.js';
import Api from './index.js';
import {
  Browse,
  Buy,
  Deal,
  Feed,
  Marketing as BuyMarketing,
  MarketplaceInsights,
  Offer,
  Order
} from './restful/buy/index.js';
import {Catalog, Charity, Commerce, Identity, Notification, Taxonomy, Translation} from './restful/commerce/index.js';
import {Analytics as DeveloperAnalytics, Developer, KeyManagement} from './restful/developer/index.js';
import RestfulApi, {IRestful} from './restful/index.js';
import {Cancellation, Case, Inquiry, PostOrder, Return,} from './restful/postOrder/index.js';
import {
  Account,
  Analytics as SellAnalytics,
  Compliance,
  Feed as SellFeed,
  Finances,
  Fulfillment,
  Inventory,
  Listing,
  Logistics,
  Marketing as SellMarketing,
  Metadata,
  Negotiation,
  Recommendation,
  Sell
} from './restful/sell/index.js';
import Traditional from './traditional/index.js';

/**
 * Factory class to create RESTFul API or Traditional API.
 */
export default class ApiFactory extends Api {
  private _traditional?: Traditional;
  private _restful: any = {};

  public createBuyApi(): Buy {
    return {
      browse: this.createRestfulApi(Browse),
      feed: this.createRestfulApi(Feed),
      marketing: this.createRestfulApi(BuyMarketing),
      offer: this.createRestfulApi(Offer),
      order: this.createRestfulApi(Order),
      deal: this.createRestfulApi(Deal),
      marketplaceInsights:  this.createRestfulApi(MarketplaceInsights),
    };
  }

  public createCommerceApi(): Commerce {
    return {
      catalog: this.createRestfulApi(Catalog),
      identity: this.createRestfulApi(Identity),
      taxonomy: this.createRestfulApi(Taxonomy),
      translation: this.createRestfulApi(Translation),
      charity: this.createRestfulApi(Charity),
      notification: this.createRestfulApi(Notification),
    };
  }

  public createDeveloperApi(): Developer {
    return {
      analytics: this.createRestfulApi(DeveloperAnalytics),
      keyManagement: this.createRestfulApi(KeyManagement),
    };
  }

  public createPostOrderApi(): PostOrder {
    return {
      cancellation: this.createRestfulApi(Cancellation),
      case: this.createRestfulApi(Case),
      inquiry: this.createRestfulApi(Inquiry),
      return: this.createRestfulApi(Return),
    };
  }

  public createSellApi(): Sell {
    return {
      account: this.createRestfulApi(Account),
      analytics: this.createRestfulApi(SellAnalytics),
      compliance: this.createRestfulApi(Compliance),
      fulfillment: this.createRestfulApi(Fulfillment),
      inventory: this.createRestfulApi(Inventory),
      marketing: this.createRestfulApi(SellMarketing),
      metadata: this.createRestfulApi(Metadata),
      recommendation: this.createRestfulApi(Recommendation),
      finances: this.createRestfulApi(Finances),
      feed: this.createRestfulApi(SellFeed),
      logistics: this.createRestfulApi(Logistics),
      negotiation: this.createRestfulApi(Negotiation),
      listing: this.createRestfulApi(Listing),
    };
  }

  get traditional() {
    if (this._traditional) {
      return this._traditional;
    }

    return (this._traditional = new Traditional(this.config, this.req, this.auth));
  }

  public createTradingApi(): Trading {
    return this.traditional.createTradingApi();
  }

  public createShoppingApi(): Shopping {
    return this.traditional.createShoppingApi();
  }

  public createFindingApi(): Finding {
    return this.traditional.createFindingApi();
  }

  public createClientAlertsApi(): ClientAlerts {
    return this.traditional.createClientAlertsApi();
  }

  public createMerchandisingApi(): Merchandising {
    return this.traditional.createMerchandisingApi();
  }

  // tslint:disable-next-line:variable-name
  private createRestfulApi<T extends RestfulApi>(RestfulApiClass: IRestful): T {
    const id = RestfulApiClass.id;
    return (
      this._restful[id] || (this._restful[id] = new RestfulApiClass(this.config, this.req, this.auth))
    );
  }
}
