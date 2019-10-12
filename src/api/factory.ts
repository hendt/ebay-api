import OAuth2 from "./оAuth2";
import {
    Buy, Browse, Feed, BuyMarketing, Offer, Order,
    Commerce, Catalog, Identity, Taxonomy, Translation,
    Developer, DeveloperAnalytics,
    Sell, Account, SellAnalytics, Compliance, Fulfillment, Inventory, SellMarketing, Metadata, Recommendation,
} from "./restful";

import Traditional, {ClientAlerts, Finding, Shopping, Trading} from "./traditional";
import {Settings} from "../types";

export default class Factory {

    readonly settings: Settings;
    readonly oAuth: OAuth2;
    private _traditional?: Traditional;

    constructor(settings: Settings, oAuth: OAuth2) {
        this.settings = settings;
        this.oAuth = oAuth;
    }

    createBuyApi(): Buy {
        return {
            browse: new Browse(this.oAuth),
            feed: new Feed(this.oAuth),
            marketing: new BuyMarketing(this.oAuth),
            offer: new Offer(this.oAuth),
            order: new Order(this.oAuth)
        }
    }

    createCommerceApi(): Commerce {
        return {
            catalog: new Catalog(this.oAuth),
            identity: new Identity(this.oAuth),
            taxonomy: new Taxonomy(this.oAuth),
            translation: new Translation(this.oAuth),
        }
    }

    createDeveloperApi(): Developer {
        return {
            analytics: new DeveloperAnalytics(this.oAuth)
        }
    }

    createSellApi(): Sell {
        return {
            account: new Account(this.oAuth),
            analytics: new SellAnalytics(this.oAuth),
            compliance: new Compliance(this.oAuth),
            fulfillment: new Fulfillment(this.oAuth),
            inventory: new Inventory(this.oAuth),
            marketing: new SellMarketing(this.oAuth),
            metadata: new Metadata(this.oAuth),
            recommendation: new Recommendation(this.oAuth)
        }
    }

    // Traditional

    get traditional() {
        return this._traditional || (this._traditional = new Traditional(this.settings, this.oAuth));
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
}

