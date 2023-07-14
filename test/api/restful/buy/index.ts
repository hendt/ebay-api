import {
  Browse,
  Deal,
  Feed,
  Marketing,
  MarketplaceInsights,
  Offer,
  Order
} from '../../../../src/api/restful/buy/index.js';
import {readSpecs} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Browse, readSpecs('buy_browse_v1_oas3.json', import.meta.url));
tests.set(Feed, readSpecs('buy_feed_v1_beta_oas3.json', import.meta.url));
tests.set(Marketing, readSpecs('buy_marketing_v1_beta_oas3.json', import.meta.url));
tests.set(Offer, readSpecs('buy_offer_v1_beta_oas3.json', import.meta.url));
tests.set(Order, readSpecs('buy_order_v1_beta_oas3.json', import.meta.url));
tests.set(Deal, readSpecs('buy_deal_v1_oas3.json', import.meta.url));
tests.set(MarketplaceInsights, readSpecs('buy_marketplace_insights_v1_beta_oas3.json', import.meta.url));

export default tests;