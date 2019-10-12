import OAuth2 from './оAuth2';
import {
    Buy, Browse, Feed, BuyMarketing, Offer, Order,
    Commerce, Catalog, Identity, Taxonomy, Translation,
    Developer, DeveloperAnalytics,
    Sell, Account, SellAnalytics, Compliance, Fulfillment, Inventory, SellMarketing, Metadata, Recommendation
} from './restful';

import Traditional, {ClientAlerts, Finding, Shopping, Trading} from './traditional';
import {Settings} from '../types';
import {AuthToken} from '../';

export type Auth = {
    sandbox: boolean,
    oAuth2: OAuth2,
    authToken?: AuthToken
}

export default class Factory {
    readonly settings: Settings;

    private _traditional?: Traditional;
    readonly auth: Auth;

    constructor(settings: Settings, oAuth2: OAuth2, authToken?: AuthToken) {
        this.settings = settings;
        this.auth = {
            sandbox: settings.sandbox,
            oAuth2,
            authToken
        };
    }

    createBuyApi(): Buy {
        return {
            browse: new Browse(this.auth),
            feed: new Feed(this.auth),
            marketing: new BuyMarketing(this.auth),
            offer: new Offer(this.auth),
            order: new Order(this.auth)
        };
    }

    createCommerceApi(): Commerce {
        return {
            catalog: new Catalog(this.auth),
            identity: new Identity(this.auth),
            taxonomy: new Taxonomy(this.auth),
            translation: new Translation(this.auth)
        };
    }

    createDeveloperApi(): Developer {
        return {
            analytics: new DeveloperAnalytics(this.auth)
        };
    }

    createSellApi(): Sell {
        return {
            account: new Account(this.auth),
            analytics: new SellAnalytics(this.auth),
            compliance: new Compliance(this.auth),
            fulfillment: new Fulfillment(this.auth),
            inventory: new Inventory(this.auth),
            marketing: new SellMarketing(this.auth),
            metadata: new Metadata(this.auth),
            recommendation: new Recommendation(this.auth)
        };
    }

    // Traditional

    get traditional() {
        return this._traditional || (this._traditional = new Traditional(this.settings, this.auth));
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

