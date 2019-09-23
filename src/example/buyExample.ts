import EBay from '../';
import Api from '../api/restful/api';

const ebay = EBay.fromEnv();

ebay.buy.browse.getShoppingCart().then(cart => {
    console.log(cart);
}).catch(e => {
    console.log(e);
});