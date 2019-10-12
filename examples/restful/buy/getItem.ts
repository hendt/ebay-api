import EBay from '../../../src';

const ebay = EBay.fromEnv();

ebay.buy.browse.getItem('v1|382282567190|651094235351')
    .then(item => {
        console.log(JSON.stringify(item, null, 2));
    })
    .catch(e => {
        console.log(e);
    });