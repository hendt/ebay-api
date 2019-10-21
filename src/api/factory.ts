import {
    Buy, Browse, Feed, BuyMarketing, Offer, Order,
    Commerce, Catalog, Identity, Taxonomy, Translation,
    Developer, DeveloperAnalytics,
    Sell, Account, SellAnalytics, Compliance, Fulfillment, Inventory, SellMarketing, Metadata, Recommendation
} from './restful';
import {LimitedRequest, createRequest} from '../utils/request';

import {AuthNOAuth2, Traditional} from './traditional';
import {AppConfig} from '../types';
import Api from './restful/api';
import OAuth2 from './оAuth2';
import {ClientAlerts, Finding, Shopping, Trading} from './traditional/types';
import AuthNAuth from './authNAuth';

export default class Factory {
    readonly appConfig: AppConfig;

    readonly oAuth2?: OAuth2;
    readonly authNAuth?: AuthNAuth;

    readonly req: LimitedRequest;

    private _traditional?: Traditional;

    constructor(appConfig: AppConfig, {oAuth2, authNAuth}: { oAuth2?: OAuth2, authNAuth?: AuthNAuth }, req: LimitedRequest = createRequest()) {
        this.appConfig = appConfig;

        this.oAuth2 = oAuth2;
        this.authNAuth = authNAuth;

        this.req = req;
    }

    createBuyApi(): Buy {
        return {
            browse: this.createApi(Browse),
            feed: this.createApi(Feed),
            marketing: this.createApi(BuyMarketing),
            offer: this.createApi(Offer),
            order: this.createApi(Order)
        };
    }

    createCommerceApi(): Commerce {
        return {
            catalog: this.createApi(Catalog),
            identity: this.createApi(Identity),
            taxonomy: this.createApi(Taxonomy),
            translation: this.createApi(Translation)
        };
    }

    createDeveloperApi(): Developer {
        return {
            analytics: this.createApi(DeveloperAnalytics)
        };
    }

    createSellApi(): Sell {
        return {
            account: this.createApi(Account),
            analytics: this.createApi(SellAnalytics),
            compliance: this.createApi(Compliance),
            fulfillment: this.createApi(Fulfillment),
            inventory: this.createApi(Inventory),
            marketing: this.createApi(SellMarketing),
            metadata: this.createApi(Metadata),
            recommendation: this.createApi(Recommendation)
        };
    }

    // Traditional
    get traditional() {
        if (this._traditional) {
            return this._traditional;
        }

        const authNOAuth2 = this.createAuthNOAuth2();

        return (this._traditional = new Traditional(
            this.appConfig,
            authNOAuth2,
            this.req
        ));
    }

    createAuthNOAuth2(): AuthNOAuth2 {
        return {
            geteBayAuthToken: () => {
                if (!this.authNAuth) {
                    return null;
                }
                return this.authNAuth.eBayAuthToken;
            },
            getOAuth2AccessToken: () => {
                if (!this.oAuth2) {
                    return null;
                }
                return this.oAuth2.accessToken;
            },
            refreshOAuth2Token: this.oAuth2 ?
                this.oAuth2.refreshAuthToken.bind(this.oAuth2) :
                () => Promise.reject('OAuth2 is required.')
        };
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

    private createApi<T extends Api>(ApiClass: new (oAuth2: OAuth2) => T): T {
        if (!this.oAuth2) {
            throw new Error('OAuth2 needs to be configured for RESTful API.');
        }

        return new ApiClass(this.oAuth2);
    }
}

