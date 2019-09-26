# A Typescript library for working with the eBay API
This API implements both Traditional (xml) and the RESTful eBay API. 

* [eBay API Explorer](https://developer.ebay.com/my/api_test_tool)
* [eBay API Docs](https://developer.ebay.com/docs)

## Installation

```shell
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

  // Traditional
  authNAuth: '--  Auth\'n Auth for traditional API (used by trading) --',

  sandbox: false,
  siteId: SiteId.EBAY_DE
});
```

## RESTful API

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