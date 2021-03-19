// tslint:disable:no-console
import eBayApi from '../../../src';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const summary = await eBay.postOrder.return.getReturn('5132021997');
    console.log(summary);
  } catch (e) {
    console.error(e);
  }
})();