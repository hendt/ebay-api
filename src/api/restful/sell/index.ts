import AccountV1 from './account/v1.js';
import AccountV2 from './account/v2.js';
import Analytics from './analytics/index.js';
import Compliance from './compliance/index.js';
import Finances from './finances/index.js';
import Fulfillment from './fulfillment/index.js';
import Inventory from './inventory/index.js';
import Marketing from './marketing/index.js';
import Metadata from './metadata/index.js';
import Recommendation from './recommendation/index.js';
import Feed from './feed/index.js';
import Logistics from './logistics/index.js';
import Negotiation from './negotiation/index.js';
import Listing from './listing/index.js';

export type Sell = {
  account: AccountV1,
  accountV2: AccountV2,
  analytics: Analytics,
  compliance: Compliance,
  fulfillment: Fulfillment,
  inventory: Inventory,
  marketing: Marketing,
  metadata: Metadata,
  recommendation: Recommendation,
  finances: Finances
  feed: Feed,
  logistics: Logistics,
  negotiation: Negotiation,
  listing: Listing
};

export {
  AccountV1,
  AccountV2,
  Compliance,
  Analytics,
  Fulfillment,
  Inventory,
  Marketing,
  Metadata,
  Recommendation,
  Finances,
  Feed,
  Logistics,
  Negotiation,
  Listing
};
