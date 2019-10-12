import EBay from '../../../src';

const ebay = EBay.fromEnv();

ebay.sell.fulfillment.getOrder('<order-id>').then(order => {
    console.log('order', JSON.stringify(order, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});
