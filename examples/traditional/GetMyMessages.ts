// tslint:disable:no-console
import EBay from '../../src';

const ebay = EBay.fromEnv();

ebay.trading.GetMyMessages({
    MessageIDs: {
        MessageID: [117475106841]
    },
    DetailLevel: 'ReturnMessages'
}).then(message => {
        console.log('message', JSON.stringify(message, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});
