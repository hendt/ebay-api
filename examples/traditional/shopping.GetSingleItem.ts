import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.shopping.GetSingleItem({
  ItemID: '255734197431',
  IncludeSelector: 'Details'
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});

