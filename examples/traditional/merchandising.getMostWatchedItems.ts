// tslint:disable:no-console
import eBayApi from '../../src';

const eBay = eBayApi.fromEnv();

eBay.merchandising.getMostWatchedItems().then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.log(e);
});
