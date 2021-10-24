// tslint:disable:no-console
import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.sell.account.getPrivileges().then(order => {
  console.log('privileges', JSON.stringify(order, null, 2));
}).catch(e => {
  console.error(e);
});
