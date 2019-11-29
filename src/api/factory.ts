import Auth from '../auth';
import {createRequest, ILimitedRequest} from '../utils/request';
import {
    Account,
    Browse,
    Buy,
    BuyMarketing,
    Cancellation,
    Case,
    Catalog,
    Commerce,
    Compliance,
    Developer,
    DeveloperAnalytics,
    Feed,
    Fulfillment,
    Identity,
    Inquiry,
    Inventory,
    Metadata,
    Offer,
    Order,
    PostOrder,
    Recommendation,
    Return,
    Sell,
    SellAnalytics,
    SellMarketing,
    Taxonomy,
    Translation
} from './restful';

import Api from './restful/api';
import Traditional from './traditional';
import {ClientAlerts, Finding, Shopping, Trading} from './traditional/types';

/**
 * Factory class to create RESTFul API or Traditional API.
 */
export default class Factory {
    public readonly auth: Auth;
    public readonly req: ILimitedRequest;

    private _traditional?: Traditional;

    constructor(
        auth: Auth,
        req: ILimitedRequest = createRequest()
    ) {
        this.auth = auth;
        this.req = req;
    }

    public createBuyApi(): Buy {
        return {
            browse: this.createRestfulApi(Browse),
            feed: this.createRestfulApi(Feed),
            marketing: this.createRestfulApi(BuyMarketing),
            offer: this.createRestfulApi(Offer),
            order: this.createRestfulApi(Order)
        };
    }

    public createCommerceApi(): Commerce {
        return {
            catalog: this.createRestfulApi(Catalog),
            identity: this.createRestfulApi(Identity),
            taxonomy: this.createRestfulApi(Taxonomy),
            translation: this.createRestfulApi(Translation)
        };
    }

    public createDeveloperApi(): Developer {
        return {
            analytics: this.createRestfulApi(DeveloperAnalytics)
        };
    }

    public createPostOrderApi(): PostOrder {
        return {
            cancellation: this.createRestfulApi(Cancellation),
            case: this.createRestfulApi(Case),
            inquiry: this.createRestfulApi(Inquiry),
            return: this.createRestfulApi(Return)
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
            recommendation: this.createRestfulApi(Recommendation)
        };
    }

    get traditional() {
        if (this._traditional) {
            return this._traditional;
        }

        return (this._traditional = new Traditional(
            this.auth,
            this.req
        ));
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

    // tslint:disable-next-line:variable-name
    private createRestfulApi<T extends Api>(ApiClass: new (auth: Auth) => T): T {
        return new ApiClass(this.auth);
    }
}
