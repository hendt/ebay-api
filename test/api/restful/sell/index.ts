import {
  Account,
  Analytics,
  Compliance,
  Finances,
  Fulfillment,
  Inventory,
  Marketing,
  Metadata,
  Recommendation,
  Feed,
  Logistics,
  Negotiation,
  Listing
} from '../../../../src/api/restful/sell';

import AccountOas from './account/sell_account_v1_oas3.json';
import AnalyticsOas from './analytics/sell_analytics_v1_oas3.json';
import ComplianceOas from './compliance/sell_compliance_v1_oas3.json';
import FulfillmentOas from './fulfillment/sell_fulfillment_v1_oas3.json';
import InventoryOas from './inventory/sell_inventory_v1_oas3.json';
import MarketingOas from './marketing/sell_marketing_v1_oas3.json';
import MetadataOas from './metadata/sell_metadata_v1_oas3.json';
import RecommendationOas from './recommendation/sell_recommendation_v1_oas3.json';
import FinancesOas from './finances/sell_finances_v1_oas3.json';
import FeedOas from './feed/sell_feed_v1_oas3.json';
import LogisticsOas from './logistics/sell_logistics_v1_oas3.json';
import NegotiationOas from './negotiation/sell_negotiation_v1_oas3.json';
import ListingOas from './listing/sell_listing_v1_beta_oas3.json';

const tests = new Map<any, any>();
tests.set(Account, AccountOas);
tests.set(Analytics, AnalyticsOas);
tests.set(Compliance, ComplianceOas);
tests.set(Fulfillment, FulfillmentOas);
tests.set(Inventory, InventoryOas);
tests.set(Marketing, MarketingOas);
tests.set(Metadata, MetadataOas);
tests.set(Recommendation, RecommendationOas);
tests.set(Finances, FinancesOas);
tests.set(Feed, FeedOas);
tests.set(Logistics, LogisticsOas);
tests.set(Negotiation, NegotiationOas);
tests.set(Listing, ListingOas);

export default tests;
