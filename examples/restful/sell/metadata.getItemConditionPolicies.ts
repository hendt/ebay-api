// tslint:disable:no-console
import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.sell.metadata.getItemConditionPolicies('EBAY_US', 'categoryId:{95672}').then(result => {
  console.log('result', JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(JSON.stringify(e, null, 2));
});
