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
import {AppConfig} from '../types';
import OAuth2 from './оAuth2';
import AuthNAuth from './authNAuth';
import {AuthNOAuth2, ClientAlerts, Finding, Shopping, Trading} from './traditional/types';

/**
 * Factory class to create RESTFul API or Traditional API.
 */
export default class Factory {
    readonly appConfig: AppConfig;

    readonly oAuth2?: OAuth2;
    readonly authNAuth?: AuthNAuth;

    readonly req: LimitedRequest;

    private _traditional?: Traditional;

    constructor(
        appConfig: AppConfig,
        {oAuth2, authNAuth}: { oAuth2?: OAuth2, authNAuth?: AuthNAuth },
        req: LimitedRequest = createRequest()
    ) {
        this.appConfig = appConfig;
        this.oAuth2 = oAuth2;
        this.authNAuth = authNAuth;
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

        const authNOAuth2 = this.createAuthNOAuth2();

        return (this._traditional = new Traditional(
            this.appConfig,
            authNOAuth2,
            this.req
        ));
    }

    private createAuthNOAuth2(): AuthNOAuth2 {
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

    private createRestfulApi<T extends Api>(ApiClass: new (oAuth2: OAuth2) => T): T {
        if (!this.oAuth2) {
            throw new Error('oAuth2 needs to be configured for RESTful API.');
        }

        return new ApiClass(this.oAuth2);
    }
}

