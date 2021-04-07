import Browse from './browse';
import Feed from './feed';
import Marketing from './marketing';
import Offer from './offer';
import Order from './order';
import Deal from './deal';
import MarketplaceInsights from './marketplaceInsights'

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
