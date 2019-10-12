# A Typescript library for working with the eBay API
This API implements both Traditional (xml) and the RESTful eBay API. 

* [eBay API Explorer](https://developer.ebay.com/my/api_test_tool)
* [eBay API Docs](https://developer.ebay.com/docs)

| RESTful API       | Implemented                         |
|-------------------|-------------------------------------|
| Sell APIs         | yes                                 |
| Buy APIs          | Marketplace Insights API is missing |
| Commerce APIs     | yes                                 |
| Developer APIs    | yes                                 |

| Traditional API   | Implemented                         |
|-------------------|-------------------------------------|
| Finding API       | yes                                 |
| Shopping API      | yes                                 |
| Merchandising API | yes                                 |
| Trading API       | yes                                 |
| Client Alerts API | yes                                 |
| Post Order API    | no                                  |
| Feedback API      | no                                  |

## Installation

```bash
npm install @hendt/ebay-api
```

## Tests
```bash
npm run test
```

## ️ Usage:

```javascript
import EBay, {SiteId} from '@hendt/ebay-api';

const ebay = new EBay({
  appId: '-- or Client ID --',
  certId: '-- or Client Secret',
  devId: 'devId',
  sandbox: false,
  siteId: SiteId.EBAY_DE,

  // Traditional
  authToken: '--  Auth\'n Auth for traditional API (used by trading) --',
});
```

## Exchanging the authorization code for a User access token
[Docs](https://developer.ebay.com/api-docs/static/oauth-auth-code-grant-request.html)


```javascript
const ebay = EBay.fromEnv();

// 1. Generate URL
const runName = ''; // RuName (eBay Redirect URL name)
const url = ebay.oAuth2.getSessionIdAndAuthUrl(runName, [
    'https://api.ebay.com/oauth/api_scope/sell.inventory',
    'https://api.ebay.com/oauth/api_scope/sell.account',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);

// 2. Open Url and Grant Access

// 3. Get the code that is placed as query parameter in redirected page
const code = 'code'; // from www.your-website?code=XXXX

// 4. Get the token
const token = await ebay.oAuth2.getToken(code, runName);
ebay.oAuth2.setCredentials(token);

// You can now call the APIs e.g.
ebay.sell.fulfillment.getOrder('<order-id>').then(order => {
        console.log('order', JSON.stringify(order, null, 2));
    }).catch(e => {
        console.log('error', {error: e.message});
    });

```

## RESTful API

### Scope
```javascript
const ebay = new EBay({
  // ...
  scope: ['https://api.ebay.com/oauth/api_scope']
});
```

### Buy
```javascript

ebay.buy.browse.getItem('v1|382282567190|651094235351').catch(e => {
    console.log(e)
}).then(a => {
    console.log(a);
});

```

## Traditional

### Finding
```javascript
ebay.finding.findItemsIneBayStores({
    storeName: 'HENDT'
}, {raw: true}).then(result => {
    // Return raw XML
    console.log(result);
});

ebay.finding.getVersion().then((version) => console.log(version));

ebay.finding.findItemsByKeywords({
    itemFilter: {
        name: 'Seller',
        value: 'hendt_de'
    }
}).then(result => {
    console.log(result);
});
```

### Trading
```javascript
ebay.trading.GetMyeBaySelling({
    SoldList: {
        Include: true,
        Pagination: {
            EntriesPerPage: 20,
            PageNumber: 1
        }
    }
}).then(data => {
    console.log(data.results)
});

```

## Contribution:
Check [here](https://github.com/hendt/ebay-api/blob/master/CONTRIBUTING.md)

## Supported By:
[hendt.de](https://hendt.de)

Thanks to:
[ebay-promised](https://github.com/ondreian/ebay-promised)
Similar projects:
[ebay-client](https://github.com/CoinPoet/ebay-client)
[ebay-node-api](https://github.com/pajaydev/ebay-node-api)


## 📝 License:
MIT.