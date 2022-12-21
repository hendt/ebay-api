import {
  Browse,
  Deal,
  Feed,
  Marketing,
  MarketplaceInsights,
  Offer,
  Order
} from '../../../../src/api/restful/buy/index.js';
import {readJSONSync} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Browse, readJSONSync('./browse/buy_browse_v1_oas3.json', import.meta.url));
tests.set(Feed, readJSONSync('./feed/buy_feed_v1_beta_oas3.json', import.meta.url));
tests.set(Marketing, readJSONSync('./marketing/buy_marketing_v1_beta_oas3.json', import.meta.url));
tests.set(Offer, readJSONSync('./offer/buy_offer_v1_beta_oas3.json', import.meta.url));
tests.set(Order, readJSONSync('./order/buy_order_v1_beta_oas3.json', import.meta.url));
tests.set(Deal, readJSONSync('./deal/buy_deal_v1_oas3.json', import.meta.url));
tests.set(MarketplaceInsights, readJSONSync('./marketplaceInsights/buy_marketplace_insights_v1_beta_oas3.json', import.meta.url));

export default tests;