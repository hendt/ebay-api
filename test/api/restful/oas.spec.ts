import {
    Browse,
    Feed,
    Marketing,
    Offer,
    Order
} from '../../../src/api/restful/buy';
import BrowseOas from './buy/browse/buy_browse_v1_beta_oas3.json';
import FeedOas from './buy/feed/buy_feed_v1_beta_oas3.json';
import MarketingOas from './buy/marketing/buy_marketing_v1_beta_oas3.json';
import OfferOas from './buy/offer/buy_offer_v1_beta_oas3.json';
import OrderOas from './buy/order/buy_order_v1_beta_oas3.json';

import {expect} from 'chai';
import 'mocha';
import OAuth from "../../../src/api/oAuth";

const tests = new Map<any, any>();
tests.set(Browse, BrowseOas);
tests.set(Feed, FeedOas);
tests.set(Marketing, MarketingOas);
tests.set(Offer, OfferOas);
tests.set(Order, OrderOas);


describe('API > restful > OAS', () => {
    const testOAuth = new OAuth({
        appId: '',
        certId: '',
        devId: 'string',
        sandbox: true
    });

    tests.forEach((Oas, Api) => {
        const api = new Api(testOAuth);

        it('"' + Api.name + '" should return correct path', () => {
            expect(api.basePath).to.equal(Oas.servers[0].variables.basePath.default);
        });

        Object.keys(Oas.paths).forEach((path: any) => {
            const call = Oas.paths[path].get || Oas.paths[path].post;

            it('"' + Api.name + '" should implement this method', () => {
                expect(api[call.operationId]).to.be.a('function', 'AssertionError: expected to have "' + call.operationId + '" implemented.');
            });
        });
    });

});