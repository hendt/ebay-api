import EBay from '../../src';

const ebay = EBay.fromEnv();

// Check OAuth Scopes if this really works for you: https://developer.ebay.com/my/keys
ebay.oAuth.setOAuthRequest({
    grant_type: 'client_credentials',
    scope: [
        'https://api.ebay.com/oauth/api_scope',
        'https://api.ebay.com/oauth/api_scope/buy.marketing'
    ]
});

ebay.buy.marketing.getAlsoBoughtByProduct({
    gtin: '8806088687681'
}).then(products => {
    console.log(JSON.stringify(products, null, 2));
}).catch(e => {
    console.log(e);
});