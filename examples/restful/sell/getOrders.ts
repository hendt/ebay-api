// tslint:disable:no-console
import eBayApi from '../../../src';

const eBay = eBayApi.fromEnv();

eBay.OAuth2.setScope([
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly'
])

eBay.sell.fulfillment.getOrders({
  limit: 5
}).then(order => {
  console.log('order', JSON.stringify(order, null, 2));
}).catch(e => {
  console.error(JSON.stringify(e, null, 2));
});
