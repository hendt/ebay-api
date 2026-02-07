import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const summary = await eBay.postOrder.return.getReturn('5132021997');
    console.log(summary);
  } catch (error) {
    console.error(error);
  }
})();