// tslint:disable:no-console
import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const time = await eBay.trading.GeteBayOfficialTime();
    console.log(time);
  } catch (e) {
    console.log(e);
  }
})();