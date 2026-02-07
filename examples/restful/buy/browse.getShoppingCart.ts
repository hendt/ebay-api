import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.buy.browse.getShoppingCart().then(cart => {
  console.log(cart);
}).catch(e => {
  console.log(e);
});
