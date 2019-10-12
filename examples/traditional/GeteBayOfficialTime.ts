import EBay from '../../src';

const ebay = EBay.fromEnv();

(async () => {
    const time = await ebay.trading.GeteBayOfficialTime();
    console.log(time);
})();