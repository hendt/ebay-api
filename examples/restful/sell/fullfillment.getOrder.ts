// tslint:disable:no-console
import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.sell.fulfillment.getOrder('11-06241-16499').then(order => {
  console.log('order', JSON.stringify(order, null, 2));
}).catch(e => {
  console.error(JSON.stringify(e, null, 2));
});
