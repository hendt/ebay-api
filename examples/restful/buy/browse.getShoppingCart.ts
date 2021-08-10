// tslint:disable:no-console
import eBayApi from '../../../src';

const eBay = eBayApi.fromEnv();

eBay.buy.browse.getShoppingCart().then(cart => {
  console.log(cart);
}).catch(e => {
  console.log(e);
});