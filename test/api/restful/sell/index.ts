import {
  Account,
  Analytics,
  Compliance,
  Feed,
  Finances,
  Fulfillment,
  Inventory,
  Listing,
  Logistics,
  Marketing,
  Metadata,
  Negotiation,
  Recommendation
} from '../../../../src/api/restful/sell/index.js';
import {readJSONSync} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Account, readJSONSync( './account/sell_account_v1_oas3.json', import.meta.url));
tests.set(Analytics, readJSONSync( './analytics/sell_analytics_v1_oas3.json', import.meta.url));
tests.set(Compliance, readJSONSync( './compliance/sell_compliance_v1_oas3.json', import.meta.url));
tests.set(Fulfillment, readJSONSync( './fulfillment/sell_fulfillment_v1_oas3.json', import.meta.url));
tests.set(Inventory, readJSONSync( './inventory/sell_inventory_v1_oas3.json', import.meta.url));
tests.set(Marketing, readJSONSync( './marketing/sell_marketing_v1_oas3.json', import.meta.url));
tests.set(Metadata, readJSONSync( './metadata/sell_metadata_v1_oas3.json', import.meta.url));
tests.set(Recommendation, readJSONSync( './recommendation/sell_recommendation_v1_oas3.json', import.meta.url));
tests.set(Finances, readJSONSync( './finances/sell_finances_v1_oas3.json', import.meta.url));
tests.set(Feed, readJSONSync( './feed/sell_feed_v1_oas3.json', import.meta.url));
tests.set(Logistics, readJSONSync( './logistics/sell_logistics_v1_oas3.json', import.meta.url));
tests.set(Negotiation, readJSONSync( './negotiation/sell_negotiation_v1_oas3.json', import.meta.url));
tests.set(Listing, readJSONSync( './listing/sell_listing_v1_beta_oas3.json', import.meta.url));

export default tests;
