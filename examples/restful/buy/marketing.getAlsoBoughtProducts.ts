// tslint:disable:no-console
import eBayApi from '../../../src';

const eBay = eBayApi.fromEnv();

// Check OAuth Scope if this really works for you: https://developer.ebay.com/my/keys
eBay.OAuth2.setScope([
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/buy.marketing'
]);

eBay.buy.marketing.getAlsoBoughtByProduct({
  gtin: '8806088687681'
}).then(products => {
  console.log(JSON.stringify(products, null, 2));
}).catch(e => {
  console.log(e);
});
