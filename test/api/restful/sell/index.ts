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
import {readSpecs} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Account, readSpecs( 'sell_account_v1_oas3.json', import.meta.url));
tests.set(Analytics, readSpecs( 'sell_analytics_v1_oas3.json', import.meta.url));
tests.set(Compliance, readSpecs( 'sell_compliance_v1_oas3.json', import.meta.url));
tests.set(Fulfillment, readSpecs( 'sell_fulfillment_v1_oas3.json', import.meta.url));
tests.set(Inventory, readSpecs( 'sell_inventory_v1_oas3.json', import.meta.url));
tests.set(Marketing, readSpecs( 'sell_marketing_v1_oas3.json', import.meta.url));
tests.set(Metadata, readSpecs( 'sell_metadata_v1_oas3.json', import.meta.url));
tests.set(Recommendation, readSpecs( 'sell_recommendation_v1_oas3.json', import.meta.url));
tests.set(Finances, readSpecs( 'sell_finances_v1_oas3.json', import.meta.url));
tests.set(Feed, readSpecs( 'sell_feed_v1_oas3.json', import.meta.url));
tests.set(Logistics, readSpecs( 'sell_logistics_v1_oas3.json', import.meta.url));
tests.set(Negotiation, readSpecs( 'sell_negotiation_v1_oas3.json', import.meta.url));
tests.set(Listing, readSpecs( 'sell_listing_v1_beta_oas3.json', import.meta.url));

export default tests;
