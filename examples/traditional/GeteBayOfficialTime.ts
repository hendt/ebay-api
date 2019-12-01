// tslint:disable:no-console
import EBay from '../../src';

const ebay = EBay.fromEnv();

(async () => {
    try {
        const time = await ebay.trading.GeteBayOfficialTime();
        console.log(time);
    } catch (e) {
        console.log(e);
    }
})();