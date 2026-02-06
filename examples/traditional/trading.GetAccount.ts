import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();
eBay.trading.GetAccount(null, {
  sign: true
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});

