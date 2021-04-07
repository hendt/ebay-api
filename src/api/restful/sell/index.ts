import Account from './account';
import Analytics from './analytics';
import Compliance from './compliance';
import Finances from './finances';
import Fulfillment from './fulfillment';
import Inventory from './inventory';
import Marketing from './marketing';
import Metadata from './metadata';
import Recommendation from './recommendation';
import Feed from './feed';
import Logistics from './logistics';
import Negotiation from './negotiation';
import Listing from './listing';

export type Sell = {
  account: Account
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
  Account,
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
