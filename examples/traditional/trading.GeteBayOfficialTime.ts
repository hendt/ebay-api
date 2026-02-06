import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const time = await eBay.trading.GeteBayOfficialTime();
    console.log(time);
  } catch (error) {
    console.log(error);
  }
})();