// tslint:disable:no-console
import EBay from '../../../src';

const ebay = EBay.fromEnv();

(async () => {
    try {
        const summary = await ebay.postOrder.inquiry.getInquiry('5222222222');
        console.log(JSON.stringify(summary, null, 2));
    } catch (e) {
        console.error(e);
    }
})();
