import OAuth from "./oAuth";
import {Buy} from "./restful/buy";
import Browse from "./restful/buy/browse";
import Feed from "./restful/buy/feed";
import BuyMarketing from "./restful/buy/marketing";
import SellMarketing from "./restful/sell/marketing";
import Offer from "./restful/buy/offer";
import Order from "./restful/buy/order";
import {Commerce} from "./restful/commerce";
import Identity from "./restful/commerce/identity";
import Taxonomy from "./restful/commerce/taxonomy";
import Translation from "./restful/commerce/translation";
import {Developer} from "./restful/developer";
import Compliance from "./restful/sell/compliance";
import Fulfillment from "./restful/sell/fulfillment";
import Inventory from "./restful/sell/inventory";
import Recommendation from "./restful/sell/recommendation";
import {Sell} from "./restful/sell";
import Catalog from "./restful/commerce/catalog";
import DeveloperAnalytics from "./restful/developer/analytics";
import Account from "./restful/sell/account";
import SellAnalytics from "./restful/sell/analytics";
import Traditional, {Finding, Shopping, Trading} from "./traditional";
import {Settings} from "../types";

export default class Factory {

    globals: Settings;
    authToken: OAuth;
    traditional: Traditional;

    constructor(globals: Settings) {
        this.globals = globals;
        this.authToken = new OAuth(this.globals);
        this.traditional = new Traditional(this.globals);
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
            recommendation: new Recommendation(this.authToken)
        }
    }
}

