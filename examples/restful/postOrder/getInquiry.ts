// tslint:disable:no-console
import eBayApi from '../../../src';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const summary = await eBay.postOrder.inquiry.getInquiry('5222222222');
    console.log(JSON.stringify(summary, null, 2));
  } catch (e) {
    console.error(e);
  }
})();
