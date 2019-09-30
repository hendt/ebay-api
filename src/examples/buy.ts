import EBay from '../index';

const ebay = EBay.fromEnv();

ebay.buy.browse.getItem('v1|382282567190|651094235351').catch(e => {
    console.log(e)
}).then(a => {
    console.log(a);
});