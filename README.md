# A Typescript library for working with the eBay API (WIP)
This API implements both traditional (xml) and RESTful eBay API. 

## Installation

```shell
npm install @hendt/ebay-api
```

## ️ Usage:

```javascript
import EBay, {SiteID} from '@hendt/ebay-api';

const ebay = new EBay({
  appId: '-- or Client ID --',
  certId: '-- or Client Secret',
  devId: 'devId',

  // Traditional
  authNAuth: '--  Auth\'n Auth for traditional API (used by trading) --',

  sandbox: false,
  site: SiteID.EBAY_DE
});
```

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
}, {raw: true}).then(result => {
    // Return raw XML
    console.log(result);
});
```

### Browse
```javascript
ebay.buy.browse.getItem('v1|382282567190|651094235351').catch(e => {
    console.log(e)
}).then(a => {
    console.log(a);
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
Check [here](https://github.com/pajaydev/ebay-node-api/blob/master/CONTRIBUTING.md)

## Supported By:
Check [hendt.de](https://hendt.de)

## 📝 License:
MIT.