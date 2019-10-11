import EBay from '../src';

const ebay = EBay.fromEnv();
ebay.oAuth.getClientToken({
    grant_type: 'authorization_code',
    scope: [
        'https://api.ebay.com/oauth/api_scope/sell.inventory',
        'https://api.ebay.com/oauth/api_scope/sell.account',
        'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
    ]
});

ebay.sell.fulfillment.getOrder('09-03934-66253').then(order => {
    console.log('order', JSON.stringify(order, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});