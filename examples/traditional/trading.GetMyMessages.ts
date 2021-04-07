// tslint:disable:no-console
import eBayApi from '../../src';

const eBay = eBayApi.fromEnv();

eBay.trading.GetMyMessages({
  MessageIDs: {
    MessageID: [117475106841]
  },
  DetailLevel: 'ReturnMessages'
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});
