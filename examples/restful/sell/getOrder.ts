// tslint:disable:no-console
import eBayApi from '../../../src';

const eBay = eBayApi.fromEnv();

eBay.sell.fulfillment.getOrder('<order-id>').then(order => {
    console.log('order', JSON.stringify(order, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});
