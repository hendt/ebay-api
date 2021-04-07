import Browse from './browse';
import Feed from './feed';
import Marketing from './marketing';
import Offer from './offer';
import Order from './order';
import Deal from './deal';

export type Buy = {
  browse: Browse,
  feed: Feed,
  marketing: Marketing,
  offer: Offer,
  order: Order
  deal: Deal
};

export {
  Browse,
  Feed,
  Marketing,
  Offer,
  Order,
  Deal
};
