import EBay from '../../src';

const ebay = EBay.fromEnv();

ebay.trading.GetMyeBaySelling({
    SoldList: {
        Include: true,
        OrderStatusFilter: 'AwaitingPayment',
        Pagination: {
            EntriesPerPage: 20,
            PageNumber: 1
        }
    }
}).then(sellings => {
    console.log('sellings', JSON.stringify(sellings, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});