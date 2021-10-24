// tslint:disable:no-console
// @ts-ignore
import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  const result = await eBay.shopping.GetUserProfile({
    UserID: 'userId',
    IncludeSelector: 'Details'
  });

  console.log(result);
})()