// tslint:disable:no-console
import eBayApi from '../../src';

const eBay = eBayApi.fromEnv();

eBay.shopping.GetSingleItem({
  ItemID: '255734197431',
  IncludeSelector: 'Details'
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});

