import OAuth from "./oAuth";
import {
    Buy, Browse, Feed, BuyMarketing, Offer, Order,
    Commerce, Catalog, Identity, Taxonomy, Translation,
    Developer, DeveloperAnalytics,
    Sell, Account, SellAnalytics, Compliance, Fulfillment, Inventory, SellMarketing, Metadata, Recommendation,
} from "./restful";

import Traditional, {Finding, Shopping, Trading} from "./traditional";
import {Settings} from "../types";

export default class Factory {

    readonly globals: Settings;
    readonly authToken: OAuth;
    private _traditional?: Traditional;

    constructor(globals: Settings) {
        this.globals = globals;
        this.authToken = new OAuth(this.globals);
    }

    createBuyApi(): Buy {
        return {
            browse: new Browse(this.authToken),
            feed: new Feed(this.authToken),
            marketing: new BuyMarketing(this.authToken),
            offer: new Offer(this.authToken),
            order: new Order(this.authToken)
        }
    }

    createCommerceApi(): Commerce {
        return {
            catalog: new Catalog(this.authToken),
            identity: new Identity(this.authToken),
            taxonomy: new Taxonomy(this.authToken),
            translation: new Translation(this.authToken),
        }
    }

    createDeveloperApi(): Developer {
        return {
            analytics: new DeveloperAnalytics(this.authToken)
        }
    }

    createSellApi(): Sell {
        return {
            account: new Account(this.authToken),
            analytics: new SellAnalytics(this.authToken),
            compliance: new Compliance(this.authToken),
            fulfillment: new Fulfillment(this.authToken),
            inventory: new Inventory(this.authToken),
            marketing: new SellMarketing(this.authToken),
            metadata: new Metadata(this.authToken),
            recommendation: new Recommendation(this.authToken)
        }
    }

    // Traditional

    get traditional() {
        return this._traditional || (this._traditional = new Traditional(this.globals));
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
}

