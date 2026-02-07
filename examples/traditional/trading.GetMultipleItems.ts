import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.shopping.GetMultipleItems({
  ItemID: '256186199138'
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});

