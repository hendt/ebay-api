// tslint:disable:no-console
// @ts-ignore
import eBayApi from '../../src';

const eBay = eBayApi.fromEnv();

(async () => {
  const result = await eBay.shopping.GetUserProfile({
    UserID: 'userId',
    IncludeSelector: 'Details'
  });

  console.log(result);
})()