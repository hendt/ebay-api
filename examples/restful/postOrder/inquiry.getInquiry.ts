// tslint:disable:no-console
import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const summary = await eBay.postOrder.inquiry.getInquiry('5222222222');
    console.log(JSON.stringify(summary, null, 2));
  } catch (error) {
    console.error(error);
  }
})();
