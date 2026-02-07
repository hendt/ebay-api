// @ts-ignore
import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.finding.findItemsAdvanced({
  itemFilter: [{
    name: 'Seller',
    value: 'hendt_de'
  }]
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.log(e);
})