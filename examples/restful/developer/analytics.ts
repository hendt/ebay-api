// tslint:disable:no-console
import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const rateLimits = await eBay.developer.analytics.getRateLimits();
    console.log(JSON.stringify(rateLimits, null, 2));
  } catch (error) {
    console.error(error);
  }
})();
