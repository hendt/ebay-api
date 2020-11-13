# eBay TypeScript/JavaScript API for Browser and Node

This API implements both Traditional \(xml\) and the RESTful eBay API. It supports client credentials grant and authorization code grant \(traditional, OAuth2 and IAF\).

* [Browser API Examples](https://hendt.github.io/ebay-api/)
* [eBay API Explorer](https://developer.ebay.com/my/api_test_tool)
* [eBay API Docs](https://developer.ebay.com/docs)

## Changelog

* `v1.4.1` is the latest release.
* See [here](https://github.com/hendt/ebay-api/blob/master/CHANGELOG.md) for the full changelog.

## Implementation status

### RESTful API

| API | Implemented |
| :--- | :--- |
| **Sell APIs** | ✔ |
| **Buy APIs** | Marketplace Insights API is missing |
| **Commerce APIs** | ✔ |
| **Developer APIs** | ✔ |
| **Post Order API** | ✔ |

### Traditional API

| API | Implemented |
| :--- | :--- |
| **Finding API** | ✔ |
| **Shopping API** | ✔ |
| **Merchandising API** | ✔ |
| **Trading API** | ✔ |
| **Client Alerts API** | ✔ |
| **Feedback API** | ✔ |

## Installation

```bash
npm install @hendt/ebay-api // yarn add @hendt/ebay-api
```

## Usage

### Browser

Check out getItem example: [https://hendt.github.io/ebay-api/](https://hendt.github.io/ebay-api/).

A Proxy server is required to use the API in the Browser.

For testing purpose you can use: `https://ebay.hendt.workers.dev/`. You can also setup your own Proxy server. We have added a example for cloudfront workers: [https://github.com/hendt/ebay-api/blob/master/proxy/worker.js](https://github.com/hendt/ebay-api/blob/master/proxy/worker.js)

```markup
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@hendt/ebay-api@latest/lib/ebay-api.min.js"></script>
<script>
  const eBay = new eBayApi({
    appId: 'appId',
    certId: 'certId',
    devId: 'devId',

    sandbox: true,
    siteId: 77,

    interceptors: {
      request: (request) => {
        // Add Proxy
        request.url = 'https://ebay.hendt.workers.dev/' + request.url;
        return request;
      }
    }
  });

  eBay.buy.browse.getItem('v1|254188828753|0').then(item => {
      document.getElementById('response').value = JSON.stringify(item, null, 2)
  }).catch(e => {
      document.getElementById('response').value = e.message
  });
</script>
```

### Node

```javascript
import eBayApi from '@hendt/ebay-api';
// or:
// const eBayApi = require('@hendt/ebay-api')

const eBay = new eBayApi({
  appId: '-- or Client ID --',
  certId: '-- or Client Secret --',
  sandbox: false,

  // optional parameters, should be omitted if not used
  siteId: eBayApi.SiteId.EBAY_US, // required for traditional APIs, see https://developer.ebay.com/DevZone/merchandising/docs/Concepts/SiteIDToGlobalID.html
  devId: 'devId', // required for traditional trading API
  ruName: '-- eBay Redirect URL name --', // required for authorization code grant
  authToken: '--  Auth\'n\'Auth for traditional API (used by trading) --', // can be set to use traditional API without code grant
});
```

## 🔧 eBayApi Config

The first parameter in eBayApi:

| Name | Description |
| :--- | :--- |
| appId\* | App ID \(Client ID\) from  [Application Keys](https://developer.ebay.com/my/keys). |
| certId\* | Required. Cert ID \(Client Secret\) from  [Application Keys](https://developer.ebay.com/my/keys). |
| devId | Conditionally required. The Dev Id from [Application Keys](https://developer.ebay.com/my/keys). |
| sandbox | Optional. Default to 'false'. If true, the [Sandbox Environment](https://developer.ebay.com/tools/sandbox) will be used. |
| scope | Conditionally required. Default to '[https://api.ebay.com/oauth/api\_scope](https://api.ebay.com/oauth/api_scope)'. |
| ruName | Conditionally required. The redirect\_url value. [More info](https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html). |
| authToken | Optional. The Auth'N'Auth token. The traditional authentication and authorization technology used by the eBay APIs. |
| marketplaceId | Conditionally required. REST HTTP Header. X-EBAY-C-MARKETPLACE-ID identifies the user's business context and is specified using a marketplace ID value. |
| endUserCtx | Optional – Conditionally recommended. REST HTTP Header. X-EBAY\_C\_ENDUSERCTX provides various types of information associated with the request. |
| contentLanguage | Conditionally required. REST HTTP Header. Content-Language indicates the locale preferred by the client for the response. |
| acceptLanguage | Optional. REST HTTP Header. Accept-Language indicates the natural language the client prefers for the response. This specifies the language the client wants to use when the field values provided in the request body are displayed to consumers. |
| interceptors | Optional. Intercept request with [Axios interceptors](https://github.com/axios/axios#interceptors). See example in 'Browser' usage above. |
| maxRequests | Max request per day. Default to '5000'. |

**\***: Required

## OAuth2: Exchanging the authorization code for a User access token

[eBay Docs](https://developer.ebay.com/api-docs/static/oauth-auth-code-grant-request.html)

```javascript
// 1. Create new eBayApi instance and set the scope.
const eBay = eBayApi.fromEnv();
// Attention: appId, certId, ruName is required.

eBay.auth.oAuth2.setScope([
    'https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);

const url = eBay.auth.oAuth2.generateAuthUrl();
// 2. Open Url and Grant Access
console.log('Open URL', url);

// 3. Get the code that is placed as query parameter in redirected page
const code = 'code'; // from www.your-website?code=XXXX

// 4. Get the token
(async () => {
  // Use async/await
  const token = await eBay.auth.oAuth2.getToken(code);
  eBay.auth.oAuth2.setCredentials(token);

  // Or Promise
  eBay.sell.fulfillment.getOrder('12-12345-12345').then(order => {
    console.log('order', JSON.stringify(order, null, 2));
  }).catch(e => {
    console.log('error', {error: e.message});
  });
})();
```

## RESTful API

### How to set the Scope

```javascript
const eBay = new eBayApi({
  // ...
  scope: ['https://api.ebay.com/oauth/api_scope']
});

// Or:
eBay.auth.oAuth2.setScope([
    'https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);
```

### How to refresh the token

The token will be automatically refreshed if, when you make a call, eBay returns an error message that indicates that the token has expired.

You can use the Event Emitter to get the token when it is refreshed \(use `'eBay.auth.oAuth2.refreshAuthToken()'` for the auth token or `'eBay.auth.oAuth2.refreshClientToken()'` for the client token\):

```javascript
eBay.auth.oAuth2.on('refreshAuthToken', (token) => {
    console.log(token)
});
```

Alternatively, you can refresh it yourself:

```javascript
let token = await eBay.auth.oAuth2.refreshToken();
```

## Additional Headers

Sometimes you want to add additional headers to the request like GLOBAL-ID \(X-EBAY-SOA-GLOBAL-ID\). You can use the interceptor to manipulate the request:

```javascript
  const eBay = new eBayApi({
    // ...
    interceptors: {
      request: (request) => {
        // Add Header
        request.headers['X-EBAY-SOA-GLOBAL-ID'] = 'EBAY-DE';
        return request;
      }
    }
  });
```

## Examples

### Trading - AddFixedPriceItem \(CDATA\)

You can submit your description using CDATA if you want to use HTML or XML. 

```javascript
eBay.trading.AddFixedPriceItem({
  Item: {
    Title: 'title',
    Description: {
      __cdata: '<div>test</div>'
    }
  }
})
```

### Buy - getItem

```javascript
eBay.buy.browse.getItem('v1|382282567190|651094235351').then(a => {
    console.log(a);
}).catch(e => {
    console.log(e)
});
```

### Post-Order - getReturn

```javascript
eBay.postOrder.return.getReturn('5132021997').then(a => {
    console.log(a);
}).catch(e => {
    console.log(e)
});
```

### Finding - findItemsIneBayStores

```javascript
eBay.finding.findItemsIneBayStores({
    storeName: 'HENDT'
}, {raw: true}).then(result => {
    // Return raw XML
    console.log(result);
});
```

### Finding - findItemsAdvanced \(findItemsByKeywords\)

```javascript
eBay.finding.findItemsAdvanced({
    itemFilter: [{
        name: 'Seller',
        value: 'hendt_de'
    }],
    keywords: 'katze'
}).then(result => {
    console.log(result);
});
```

### Trading - GetMyeBaySelling

```javascript
eBay.trading.GetMyeBaySelling({
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

## Contribution

Check [here](https://github.com/hendt/ebay-api/blob/master/CONTRIBUTING.md)

## Supported By

[hendt.de](https://hendt.de)

## Similar projects

[ebay-promised](https://github.com/ondreian/ebay-promised)  
[ebay-client](https://github.com/CoinPoet/ebay-client)  
[ebay-node-api](https://github.com/pajaydev/ebay-node-api)

## 📝 License

MIT.

