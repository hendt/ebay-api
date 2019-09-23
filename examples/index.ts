import EBay from '../src';

const ebay = EBay.fromEnv();

ebay.trading.GetMyeBaySelling({
    ActiveList: {
        Sort: 'TimeLeft'
    },
    Pagination: {
        EntriesPerPage: 3,
        PageNumber: 1
    }
}).then(sellings => {
    console.log('sellings', sellings);
}).catch(e => {
    console.log('error', {error: e.message});
});