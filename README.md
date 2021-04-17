# eBay Node API in TypeScript with Browser support
[![Build Status](https://travis-ci.com/hendt/ebay-api.svg?branch=master)](https://travis-ci.com/hendt/ebay-api)
[![codecov](https://codecov.io/gh/hendt/ebay-api/branch/master/graph/badge.svg?token=E67PSWIZFZ)](https://codecov.io/gh/hendt/ebay-api)

This eBay API implements both Traditional \(xml\) and the RESTful eBay API.
It supports `client credentials grant` and `authorization code grant` \(Auth'N'Auth, OAuth2 and IAF\).

* [API Browser Examples](https://hendt.github.io/ebay-api/)
* [API Documentation](https://hendt.gitbook.io/ebay-api/)

## eBay Docs
* [eBay API Explorer](https://developer.ebay.com/my/api_test_tool)
* [eBay API Docs](https://developer.ebay.com/docs)

## Changelog

* `v3.3.3` is the latest release.
* See [here](https://github.com/hendt/ebay-api/blob/master/CHANGELOG.md) for the full changelog.

## Implementation status

### RESTful API

| API | Implemented |
| :--- | :--- |
| **Buy API** | ✔ Browse API<br>✔  Deal API<br>✔ Feed API<br>✔ Marketing API<br>✔ Offer API<br>✔ Order API<br>✔ Marketplace Insights API |
| **Commerce API** | ✔ Catalog API<br>✔ Charity API<br>✔ Identity API<br>✔ Notification API<br>✔ Taxonomy API<br>✔ Translation API |
| **Developer API** | ✔ Analytics API|
| **Post Order API** | ✔ Cancellation API<br>✔ Case Management API<br>✔ Inquiry API<br>✔ Return API |
| **Sell API** | ✔ Account API <br>✔ Analytics API<br>✔ Compliance API<br>✔ Feed API<br>✔ Finance API<br>✔ Fulfillment API<br>✔ Inventory API<br>✔ Listing API<br>✔ Logistics API<br>✔ Marketing API<br>✔ Metadata API<br>✔ Negotiation API<br>✔ Recommendation API |

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
npm install @hendt/ebay-api # yarn add @hendt/ebay-api
```

## Usage

### Browser
Check out `getItem()` example: [https://hendt.github.io/ebay-api/](https://hendt.github.io/ebay-api/).

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
  });

  // eBay.req.instance is AxiosInstance per default
  eBay.req.instance.interceptors.request.use((request) => {
      // Add Proxy
      request.url = 'https://ebay.hendt.workers.dev/' + request.url;
      return request;
  });

  eBay.buy.browse.getItem('v1|254188828753|0').then(item => {
      console.log(JSON.stringify(item, null, 2));
  }).catch(e => {
      console.error(e);
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
  marketplaceId: eBayApi.MarketplaceId.EBAY_US,    
  devId: 'devId', // required for traditional trading API
  ruName: '-- eBay Redirect URL name --', // required for authorization code grant
  authToken: '--  Auth\'n\'Auth for traditional API (used by trading) --', // can be set to use traditional API without code grant
});
```

## 🔧 eBayApi Config

The first (required) parameter in eBayApi takes an object with following properties:

| Name | Occurrence  | Description |
| :--- | :--- | :--- |
| appId | Required | App ID \(Client ID\) from  [Application Keys](https://developer.ebay.com/my/keys). |
| certId | Required | Cert ID \(Client Secret\) from  [Application Keys](https://developer.ebay.com/my/keys). |
| devId | Conditional | The Dev Id from [Application Keys](https://developer.ebay.com/my/keys). |
| sandbox | Optional<br><pre>Default: `false`</pre> | If true, the [Sandbox Environment](https://developer.ebay.com/tools/sandbox) will be used. |
| siteId | Required<br><pre>Default: `SiteId.EBAY_DE`</pre><br><i>Traditional</i> | eBay site to which you want to send the request (Trading API, Shopping API). |
| scope | Conditional<bre><pre>Default: `['https://api.ebay.com/oauth/api_scope']` </pre> | The scopes assigned to your application allow access to different API resources and functionality. |
| ruName | Conditional | The redirect\_url value. [More info](https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html). |
| authToken | Optional | The Auth'N'Auth token. The traditional authentication and authorization technology used by the eBay APIs. |
| autoRefreshToken | Optional<pre>Default: `true`</pre> | Auto refresh the token if it's expired. |
| [marketplaceId](https://developer.ebay.com/api-docs/static/rest-request-components.html#marketpl) | Conditional<br><pre>Default: `MarketplaceId.EBAY_DE`</pre><br><i>RESTful</i> | REST HTTP Header. X-EBAY-C-MARKETPLACE-ID identifies the user's business context and is specified using a marketplace ID value. Note that this header does not indicate a language preference or consumer location. |
| [endUserCtx](https://developer.ebay.com/api-docs/static/rest-request-components.html#headers) | Optional<br><i>RESTful</i> | Conditionally recommended. REST HTTP Header. X-EBAY\_C\_ENDUSERCTX provides various types of information associated with the request. |
| [contentLanguage](https://developer.ebay.com/api-docs/static/rest-request-components.html#headers) | Conditional<br><i>RESTful</i> | REST HTTP Header. Content-Language indicates the locale preferred by the client for the response. |
| [acceptLanguage](https://developer.ebay.com/api-docs/static/rest-request-components.html#headers) | Optional<br><i>RESTful</i> | REST HTTP Header. Accept-Language indicates the natural language the client prefers for the response. This specifies the language the client wants to use when the field values provided in the request body are displayed to consumers. |

## Load from env
Use `eBayApi.fromEnv()` to load data from environment variables.

| Name | Value |
| :--- | :--- |
| appId | process.env.EBAY_APP_ID |
| certId: process.env.EBAY_CERT_ID |
| devId: process.env.EBAY_DEV_ID |
| authToken | process.env.EBAY_AUTH_TOKEN |
| siteId |  process.env.EBAY_SITE_ID |
| marketplaceId | process.env.EBAY_MARKETPLACE_ID |
| ruName | process.env.EBAY_RU_NAME |
| sandbox | (process.env.EBAY_SANDBOX === 'true') |

## Debug
To see debug logs use `DEBUG=ebay:*` environment variable.

## OAuth2: Exchanging the authorization code for a User access token

[eBay Docs](https://developer.ebay.com/api-docs/static/oauth-auth-code-grant-request.html)

```javascript
// 1. Create new eBayApi instance and set the scope.
const eBay = eBayApi.fromEnv();
// Attention: appId, certId, ruName is required.

eBay.OAuth2.setScope([
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);

const url = eBay.OAuth2.generateAuthUrl();
// 2. Open Url and Grant Access
console.log('Open URL', url);

// 3. Get the code that is placed as query parameter in redirected page
const code = 'code'; // from www.your-website?code=XXXX

// 4. Get the token
(async () => {
  // Use async/await
  const token = await eBay.OAuth2.getToken(code);
  eBay.OAuth2.setCredentials(token);

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
eBay.OAuth2.setScope([
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);
```

### Use apix.ebay.com or apiz.ebay.com (beta) endpoints
For some APIs, eBay use a `apix`/`apiz` subdomain. To use these subdomains you can use `.apix`/`.apiz` before the api call like this:
```javascript
  eBay.buy.browse.apix.getItem() // now it will use https://apix.ebay.com
  eBay.buy.browse.apiz.getItem() // now it will use https://apiz.ebay.com
```

In any case eBay adds a new subdomain, it's also possible to configure whatever you want:
```javascript
  eBay.buy.browse.api({subdomain: 'apiy'}).getItem() // now it will use https://apiy.ebay.com
```

### How to refresh the token
If `autoRefreshToken` is set to true (default value) the token will be automatically refreshed when eBay response with `invalid access token` error.


Use Event Emitter to get the token when it gets succesfully refreshed.
```javascript
eBay.OAuth2.on('refreshAuthToken', (token) => {
  console.log(token)
});

eBay.OAuth2.on('refreshClientToken', (token) => {
  console.log(token)
});
```
To manuel refresh the auth token use `eBay.OAuth2.refreshAuthToken()` and for the client token `eBay.OAuth2.refreshClientToken()`.
Keep in mind that you need the 'refresh_token' value set.

```javascript
let token = await eBay.OAuth2.refreshToken();
// will refresh Auth Token if set, otherwise the client token if set.
```

## Additional Headers
Sometimes you want to add additional headers to the request like a GLOBAL-ID `X-EBAY-SOA-GLOBAL-ID`. 
You have multiple options to do this.

### Restful API Headers
```javascript
  const eBay = new eBayApi();

  eBay.buy.browse.api({headers: {
      'X-EBAY-SOA-GLOBAL-ID': 'EBAY-DE'
  }}).getItem('v1|382282567190|651094235351').then((item) => {
    console.log(item)
  })
```

### Traditional API Headers
You can pass headers directly in the method call in the second parameter:
```javascript
eBay.trading.AddFixedPriceItem({
  Item: {
    Title: 'title',
    Description: {
      __cdata: '<div>test</div>'
    }
  }
}, {
  headers: {
    'X-EBAY-SOA-GLOBAL-ID': 'EBAY-DE'
  }
})
```

### Low level: use the Axios interceptor to manipulate the request
```javascript
  const eBay = new eBayApi();

  eBay.req.instance.interceptors.request.use((request) => {
    // Add Header
    request.headers['X-EBAY-SOA-GLOBAL-ID'] = 'EBAY-DE';
    return request;
  })
```

### Handle JSON GZIP response e.g fetchItemAspects
You need a decompress library installed like `zlib`.

`npm install zlib`

```javascript
const zlib = require('zlib');

(async (ebayApiInstance, categoryTreeId) => {
  try {
    const data = await ebayApiInstance.commerce.taxonomy.fetchItemAspects(categoryTreeId);

    return new Promise((resolve) => {
      zlib.gunzip(data, (err, output) => {
        if (err) throw err;

        resolve(output.toString());
      });
    });
  } catch (err) {
    console.log(err.response);
    return Promise.reject(err);
  };)();
```

## Controlling Traditional XML request and response
The second parameter in the traditional API has the following options:

```typescript
export type Options = {
  raw?: boolean, // return raw XML
  parseOptions?: object, // https://github.com/NaturalIntelligence/fast-xml-parser
  useIaf?: boolean // use IAF in header instead of Bearer
  headers?: Headers // additional Headers (key, value)
};
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
[rootle.de](https://rootle.de)

## Similar projects

[ebay-promised](https://github.com/ondreian/ebay-promised)  
[ebay-client](https://github.com/CoinPoet/ebay-client)  
[ebay-node-api](https://github.com/pajaydev/ebay-node-api)

## 📝 License

MIT.

