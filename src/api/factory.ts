import {
    Buy,
    Browse,
    Feed,
    BuyMarketing,
    Offer,
    Order,
    Commerce,
    Catalog,
    Identity,
    Taxonomy,
    Translation,
    Developer,
    DeveloperAnalytics,
    Sell,
    Account,
    SellAnalytics,
    Compliance,
    Fulfillment,
    Inventory,
    SellMarketing,
    Metadata,
    Recommendation,
    PostOrder,
    Cancellation,
    Case,
    Inquiry,
    Return
} from './restful';
import {LimitedRequest, createRequest} from '../utils/request';

import Api from './restful/api';
import Traditional from './traditional';
import {ClientAlerts, Finding, Shopping, Trading} from './traditional/types';
import Auth from '../auth';

/**
 * Factory class to create RESTFul API or Traditional API.
 */
export default class Factory {
    readonly auth: Auth;
    readonly req: LimitedRequest;

    private _traditional?: Traditional;

    constructor(
        auth: Auth,
        req: LimitedRequest = createRequest()
    ) {
        this.auth = auth;
        this.req = req;
    }

    createBuyApi(): Buy {
        return {
            browse: this.createRestfulApi(Browse),
            feed: this.createRestfulApi(Feed),
            marketing: this.createRestfulApi(BuyMarketing),
            offer: this.createRestfulApi(Offer),
            order: this.createRestfulApi(Order)
        };
    }

    createCommerceApi(): Commerce {
        return {
            catalog: this.createRestfulApi(Catalog),
            identity: this.createRestfulApi(Identity),
            taxonomy: this.createRestfulApi(Taxonomy),
            translation: this.createRestfulApi(Translation)
        };
    }

    createDeveloperApi(): Developer {
        return {
            analytics: this.createRestfulApi(DeveloperAnalytics)
        };
    }

    createPostOrderApi(): PostOrder {
        return {
            cancellation: this.createRestfulApi(Cancellation),
            case: this.createRestfulApi(Case),
            inquiry: this.createRestfulApi(Inquiry),
            return: this.createRestfulApi(Return)
        };
    }

    createSellApi(): Sell {
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

    createTradingApi(): Trading {
        return this.traditional.createTradingApi();
    }

    createShoppingApi(): Shopping {
        return this.traditional.createShoppingApi();
    }

    createFindingApi(): Finding {
        return this.traditional.createFindingApi();
    }

    createClientAlertsApi(): ClientAlerts {
        return this.traditional.createClientAlertsApi();
    }

    private createRestfulApi<T extends Api>(ApiClass: new (auth: Auth) => T): T {
        return new ApiClass(this.auth);
    }
}

