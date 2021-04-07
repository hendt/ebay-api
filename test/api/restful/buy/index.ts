import {Browse, Feed, Marketing, Offer, Order, Deal} from '../../../../src/api/restful/buy';
import BrowseOas from './browse/buy_browse_v1_beta_oas3.json';
import FeedOas from './feed/buy_feed_v1_beta_oas3.json';
import MarketingOas from './marketing/buy_marketing_v1_beta_oas3.json';
import OfferOas from './offer/buy_offer_v1_beta_oas3.json';
import OrderOas from './order/buy_order_v1_beta_oas3.json';
import DealOas from './deal/buy_deal_v1_oas3.json';

const tests = new Map<any, any>();
tests.set(Browse, BrowseOas);
tests.set(Feed, FeedOas);
tests.set(Marketing, MarketingOas);
tests.set(Offer, OfferOas);
tests.set(Order, OrderOas);
tests.set(Deal, DealOas);

export default tests;