import Browse from './browse/index.js';
import Feed from './feed/index.js';
import Marketing from './marketing/index.js';
import Offer from './offer/index.js';
import Order from './order/index.js';
import Deal from './deal/index.js';
import MarketplaceInsights from './marketplaceInsights/index.js'

export type Buy = {
  browse: Browse,
  deal: Deal
  feed: Feed,
  marketing: Marketing,
  marketplaceInsights: MarketplaceInsights
  offer: Offer,
  order: Order
};

export {
  Browse,
  Deal,
  Feed,
  Marketing,
  MarketplaceInsights,
  Offer,
  Order
};
