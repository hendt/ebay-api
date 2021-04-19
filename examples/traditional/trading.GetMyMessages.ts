// tslint:disable:no-console
import eBayApi from '../../src';

const eBay = eBayApi.fromEnv();

eBay.trading.GetMyMessages({
  Folder: 0,
  DetailLevel: 'ReturnHeaders'
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});
