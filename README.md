# eBay Node API in TypeScript with Browser support

[![Build Status](https://travis-ci.com/hendt/ebay-api.svg?branch=master)](https://travis-ci.com/hendt/ebay-api)
[![codecov](https://codecov.io/gh/hendt/ebay-api/branch/master/graph/badge.svg?token=E67PSWIZFZ)](https://codecov.io/gh/hendt/ebay-api)

[![GitHub](https://img.shields.io/npm/l/ebay-api?style=flat-square)](https://github.com/hendt/ebay-api/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/ebay-api.svg?style=flat-square)](https://www.npmjs.com/package/ebay-api)
[![](https://data.jsdelivr.com/v1/package/npm/ebay-api/badge)](https://www.jsdelivr.com/package/npm/ebay-api)
[![npm](https://img.shields.io/npm/dt/ebay-api.svg?style=flat-square)](https://www.npmjs.com/package/ebay-api)

This eBay API implements both Traditional \(xml\) and the RESTful eBay API.
It supports `client credentials grant` and `authorization code grant` \(Auth'N'Auth, OAuth2 and IAF\). Digital Signature is supported too.

* [API Browser Examples](https://hendt.github.io/ebay-api/)
* [API Documentation](https://hendt.gitbook.io/ebay-api/)

## eBay Docs

* [eBay API Explorer](https://developer.ebay.com/my/api_test_tool)
* [eBay API Docs](https://developer.ebay.com/docs)
* [eBay API Status](https://entwickler.ebay.de/support/api-status/production)

## Changelog

* `v9.2.0-RC.0` is the latest release.
* See [here](https://github.com/hendt/ebay-api/blob/master/CHANGELOG.md) for the full changelog.

## Implementation status

### RESTful API

| API                | Implemented                                                                                                                                                                                                                                                                                                                                                                  |
|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Buy API**        | ✔ Browse API `v1.10.0`<br>✔  Deal API `v1.3.0`<br>✔ Feed API `v1.3.1`<br>✔ Marketing API `v1_beta.1.0`<br>✔ Offer API `v1_beta.0.0`<br>✔ Order API `v1_beta.20.0`<br>✔ Marketplace Insights API `v1_beta.2.2`                                                                                                                                                                |
| **Commerce API**   | ✔ Catalog API `v1_beta.3.1`<br>✔ Charity API `v1.2.0`<br>✔ Identity API `v1.0.0`<br>✔ Notification API `v1.2.0`<br>✔ Taxonomy API `v1.0.0`<br>✔ Translation API `v1_beta.1.4`<br>✔ Media API `v1_beta.1.0`                                                                                                                                                                   |
| **Developer API**  | ✔ Analytics API                                                                                                                                                                                                                                                                                                                                                              |
| **Post Order API** | ✔ Cancellation API<br>✔ Case Management API<br>✔ Inquiry API<br>✔ Return API                                                                                                                                                                                                                                                                                                 |
| **Sell API**       | ✔ Account API `v1.9.0`<br>✔ Analytics API `v1.3.0`<br>✔ Compliance API `v1.4.1`<br>✔ Feed API `v1.3.1`<br>✔ Finance API `v1.9.0`<br>✔ Fulfillment API `v1.19.10`<br>✔ Inventory API `v1.18.0`<br>✔ Listing API `v1_beta.2.1`<br>✔ Logistics API `v1_beta.0.0`<br>✔ Marketing API `v1.17.0`<br>✔ Metadata API `v1.7.1`<br>✔ Negotiation API `v1.1.0`<br>✔ Recommendation API `v1.1.0` |

### Traditional API

| API                   | Implemented |
|:----------------------|:------------|
| **Finding API**       | ✔           |
| **Shopping API**      | ✔           |
| **Merchandising API** | ✔           |
| **Trading API**       | ✔           |
| **Client Alerts API** | ✔           |
| **Feedback API**      | ✔           |

## Install

```bash
npm install ebay-api 
yarn add ebay-api
```

## 🚀 Usage & Quick start

Sign up for an API key here: [Developer Account](https://developer.ebay.com/signin?tab=register).
Checkout API [examples](https://github.com/hendt/ebay-api/tree/master/examples).

### NodeJS

```javascript
import eBayApi from 'ebay-api';
// or:
// const eBayApi = require('ebay-api')

const eBay = new eBayApi({
  appId: '-- also called Client ID --',
  certId: '-- also called Client Secret --',
  sandbox: false
});

const item = await eBay.buy.browse.getItem('v1|254188828753|0');
console.log(JSON.stringify(item, null, 2));
```

#### Detailed configuration example

```javascript
import eBayApi from 'ebay-api';

const eBay = new eBayApi({
  appId: '-- also called Client ID --',
  certId: '-- also called Client Secret --',
  sandbox: false,

  siteId: eBayApi.SiteId.EBAY_US, // required for traditional APIs, see https://developer.ebay.com/DevZone/merchandising/docs/Concepts/SiteIDToGlobalID.html

  marketplaceId: eBayApi.MarketplaceId.EBAY_US, // default. required for RESTful APIs
  acceptLanguage: eBayApi.Locale.en_US, // default
  contentLanguage: eBayApi.Locale.en_US, // default.

  // optional parameters, should be omitted if not used
  devId: '-- devId --', // required for traditional Trading API
  ruName: '-- eBay Redirect URL name --', // 'RuName' (eBay Redirect URL name) required for authorization code grant

  authToken: '--  Auth\'n\'Auth for traditional API (used by trading) --', // can be set to use traditional API without code grant
});
```

### Browser

Check out live example: [https://hendt.github.io/ebay-api/](https://hendt.github.io/ebay-api/).
Because of the eBay CORS problems a Proxy server is required to use the API in the Browser.

For testing purpose you can use `https://ebay.hendt.workers.dev/` url as proxy. You can also set up your own Proxy
server. We have added a example for cloudfront
workers: [https://github.com/hendt/ebay-api/blob/master/proxy/worker.js](https://github.com/hendt/ebay-api/blob/master/proxy/worker.js)

Or use [https://github.com/Rob--W/cors-anywhere](CORS Anywhere is a NodeJS proxy) (works very well with heroku.com).

#### ESM

```html

<script type="module">
    import eBayApi from 'https://cdn.jsdelivr.net/npm/ebay-api@latest/dist/ebay-api.min.mjs';
    // or 
    import eBayApiEsm from 'https://esm.sh/ebay-api';
</script>
```

#### UMD

```html

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ebay-api@latest/lib/ebay-api.min.js"></script>
<script>
    const eBay = new eBayApi({
        appId: 'appId',
        certId: 'certId',
        sandbox: false
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

## 🔧 eBayApi Config

The first (required) parameter in eBayApi instance takes an object with following properties:

| Name                              | Occurrence                                                                           | Description                                                                                                                                                                                                                                                                                                    |
|:----------------------------------|:-------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| appId                             | Required                                                                             | App ID \(Client ID\) from  [Application Keys](https://developer.ebay.com/my/keys).                                                                                                                                                                                                                             |
| certId                            | Required                                                                             | Cert ID \(Client Secret\) from  [Application Keys](https://developer.ebay.com/my/keys).                                                                                                                                                                                                                        |
| devId                             | Conditionally                                                                        | The Dev Id from [Application Keys](https://developer.ebay.com/my/keys).                                                                                                                                                                                                                                        |
| sandbox                           | Required<br><pre>Default: `false`</pre>                                              | If true, the [Sandbox Environment](https://developer.ebay.com/tools/sandbox) will be used.                                                                                                                                                                                                                     |
| ruName                            | Conditionally                                                                        | The redirect\_url value. [More info](https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html).                                                                                                                                                                                                      |
| autoRefreshToken                  | Required<pre>Default: `true`</pre>                                                   | Auto refresh the token if it's expired.                                                                                                                                                                                                                                                                        |
| siteId<br><i>Traditional</i>      | Required<br><pre>Default: `SiteId.EBAY_US`</pre>                                     | eBay site to which you want to send the request (Trading API, Shopping API).                                                                                                                                                                                                                                   |
| authToken<br><i>Traditional</i>   | Optional                                                                             | The Auth'N'Auth token. The traditional authentication and authorization technology used by the eBay APIs.                                                                                                                                                                                                      |
| marketplaceId<br><i>RESTful</i>   | Required<br><pre>Default: `MarketplaceId.EBAY_US`</pre>                              | [Docs](https://developer.ebay.com/api-docs/static/rest-request-components.html#marketpl) REST HTTP Header. X-EBAY-C-MARKETPLACE-ID identifies the user's business context and is specified using a marketplace ID value. Note that this header does not indicate a language preference or consumer location.   |
| scope<br><i>RESTful</i>           | Conditionally<bre><pre>Default:<br>`['https://api.ebay.com/oauth/api_scope']` </pre> | The scopes assigned to your application allow access to different API resources and functionality.                                                                                                                                                                                                             |
| endUserCtx<br><i>RESTful</i>      | Conditionally recommended<br><i>RESTful</i>                                          | [Docs](https://developer.ebay.com/api-docs/static/rest-request-components.html#headers) X-EBAY\_C\_ENDUSERCTX provides various types of information associated with the request.                                                                                                                               |
| contentLanguage<br><i>RESTful</i> | Conditionally required<br><pre>Default: `Locale.en_US`</pre>                | [Docs](https://developer.ebay.com/api-docs/static/rest-request-components.html#headers)Content-Language indicates the locale preferred by the client for the response.                                                                                                                                         |
| acceptLanguage<br><i>RESTful</i>  | Optional<pre>Default: `Locale.en_US`</pre>                                           | [Docs](https://developer.ebay.com/api-docs/static/rest-request-components.html#headers) Accept-Language indicates the natural language the client prefers for the response. This specifies the language the client wants to use when the field values provided in the request body are displayed to consumers. |

## Load config from environment

Use `eBayApi.fromEnv()` to load data from environment variables.

| Name          | Value                               |
|:--------------|:------------------------------------|
| appId         | process.env.EBAY_APP_ID             |
| certId        | process.env.EBAY_CERT_ID            |
| devId         | process.env.EBAY_DEV_ID             |
| authToken     | process.env.EBAY_AUTH_TOKEN         |
| siteId        | process.env.EBAY_SITE_ID            |
| marketplaceId | process.env.EBAY_MARKETPLACE_ID     |
| ruName        | process.env.EBAY_RU_NAME            |
| sandbox       | process.env.EBAY_SANDBOX === 'true' |

## 🐞 Debug

To see node debug logs use `DEBUG=ebay:*` environment variable.

## 🔑 Access token types

See the full Documentation [here](https://developer.ebay.com/api-docs/static/oauth-token-types.html).

*Client credentials grant flow* mints a new Application access token.
*Authorization code grant flow* mints a new User access token.

### User access token (authorization code grant flow)

👉 Recommended for all API Calls.

> You must employ a User token to call any interface that accesses or modifies data that is owned by the user (such as
> user information and account data).
> To get a User token, the users of your app must grant your application the permissions it needs to act upon their
> behalf. This process is called user consent. With the user consent flow, each User token contains the set of scopes
> for
> which the user has granted their
> permission [(eBay Token Types)](https://developer.ebay.com/api-docs/static/oauth-token-types.html).

### Application access token (client credentials grant flow)

👉 Recommended for API calls that will only request application data (`GET` method, and it's also restricted).

> Application tokens are general-use tokens that give access to interfaces that return application data. For example,
> many GET requests require only an Application token for authorization.
[(eBay Token Types)](https://developer.ebay.com/api-docs/static/oauth-token-types.html)

If no other token is set, this token will be obtained *automatically* in the process of calling an RESTful API.

### Auth'N'Auth
In the Single User Model, the application supports only a single user. In this model, you need only one Auth'n'Auth token.
👉 The "old" way. Only works with Traditional API.
Checkout the [Auth'N'Auth example](https://github.com/hendt/ebay-api/tree/master/examples/traditional/authNAuth.ts).

You can also generate the token on eBay developer page and use it directly (see Detailed configuration example).

## OAuth2: Exchanging the authorization code for a User access token

[eBay Docs](https://developer.ebay.com/api-docs/static/oauth-auth-code-grant-request.html)

```javascript
import eBayApi from 'ebay-api';

// 1. Create new eBayApi instance and set the scope.
const eBay = eBayApi.fromEnv();

eBay.OAuth2.setScope([
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);

// 2. Generate and open Url and Grant Access
const url = eBay.OAuth2.generateAuthUrl();
console.log('Open URL', url);
```

After you granted success, eBay will redirect you to your 'Auth accepted URL' and add a query parameter `code`

### Express example

This is how it would look like if you use `express`:

```javascript
import eBayApi from 'ebay-api';


// This is your RUName endpoint like https://your-ebay.app/success
app.get('/success', async function (req, res) {
  // 3. Get the parameter code that is placed as query parameter in redirected page
  const code = req.query.code; // this is provided from eBay
  const eBay = eBayApi.fromEnv(); // or use new eBayApi()

  try {
    const token = await eBay.OAuth2.getToken(code);
    eBay.OAuth2.setCredentials(token);
    // store this token e.g. to a session
    req.session.token = token

    // 5. Start using the API
    const orders = await eBay.sell.fulfillment.getOrders()
    res.send(orders);
  } catch (error) {
    console.error(error)
    res.sendStatus(400)
  }
});
```

If token is already in session:

```js
import eBayApi from 'ebay-api';

app.get('/orders/:id', async function (req, res) {
  const id = req.params.id;
  const eBay = eBayApi.fromEnv(); // or use new eBayApi(...)
  const token = req.session.token;
  if (!token) {
    return res.sendStatus(403);
  }

  eBay.OAuth2.setCredentials(token);

  // If token get's refreshed
  eBay.OAuth2.on('refreshAuthToken', (token) => {
    req.session.token = token;
  });

  try {
    // 5. Start using the API
    const order = await eBay.sell.fulfillment.getOrder(id);
    res.send(order);
  } catch (error) {
    console.error(error)
    res.sendStatus(400)
  }
});
```

## Digital Signature
Signatures are required when the call is made for EU- or UK-domiciled sellers, and only for the following APIs/methods:

* All methods in the Finances API -> (`eBay.finances.XXX.sign.YYY()`)
* issueRefund in the Fulfillment API -> (`eBay.sell.fulfillment.sign.issueRefund()`)
* GetAccount in the Trading API -> (`eBay.trading.GetAccount(null, { sign: true }))`)
* The following methods in the Post-Order API:
  - Issue Inquiry Refund -> (`eBay.postOrder.inquiry.sign.issueInquiryRefund()`)
  - Issue case refund -> (`eBay.postOrder.inquiry.sign.issueCaseRefund()`)
  - Issue return refund -> (`eBay.postOrder.inquiry.sign.issueReturnRefund()`)
  - Process Return Request -> (`eBay.postOrder.inquiry.sign.processReturnRequest()`)
  - Create Cancellation Request -> (`eBay.postOrder.inquiry.sign.createCancellation()`)
  - Approve Cancellation Request -> (`eBay.postOrder.inquiry.sign.approveCancellationRequest()`)

### How to use Digital Signature
```js
// 1. Create singning key and save it appropriatly
const signingKey = await eBay.developer.keyManagement.createSigningKey('ED25519');
// 2. Set the signature
eBay.setSignature(signingKey)
// or in constructor
eBay = new eBayApi({
   appId: '...',
   certId: '...',
   signature: {
      jwe: signingKey.jwe,
      privateKey: signingKey.privateKey
   }
});
// 3. Use the 'sign' keyword in Restful API
const summary = await eBay.sell.finances.sign.getSellerFundsSummary();
// 3. Or the 'sign' parameter in traditional API
const account = await eBay.trading.GetAccount(null, {sign: true});
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

For some APIs, eBay use a `apix`/`apiz` subdomain. To use these subdomains you can use `.apix`/`.apiz` before the api
call like this:

```javascript
  eBay.buy.browse.apix.getItem() // now it will use https://apix.ebay.com
eBay.buy.browse.apiz.getItem() // now it will use https://apiz.ebay.com
```

In any case eBay adds a new subdomain, it's also possible to configure whatever you want:

```javascript
  eBay.buy.browse.api({subdomain: 'apiy'}).getItem() // now it will use https://apiy.ebay.com
```

### Return raw RESTful API response

```javascript
  eBay.buy.browse.api({
  returnResponse: true, // return the response instead of data
}).getItem();
```   

### How to refresh the token

If `autoRefreshToken` is set to true (default value) the token will be automatically refreshed when eBay response
with `invalid access token` error.

Use Event Emitter to get the token when it gets successfully refreshed.

```javascript
eBay.OAuth2.on('refreshAuthToken', (token) => {
  console.log(token)
  // Store this token in DB
});

// for client token
eBay.OAuth2.on('refreshClientToken', (token) => {
  console.log(token)
  // Store this token in DB
});
```

To manual refresh the auth token use `eBay.OAuth2.refreshAuthToken()` and for the client
token use `eBay.OAuth2.refreshClientToken()`.
Keep in mind that you need the 'refresh_token' value set.

```javascript
const token = await eBay.OAuth2.refreshToken();
// will refresh Auth Token if set, otherwise the client token if set.
```

## Additional request headers

Sometimes you want to add additional headers to the request like a GLOBAL-ID `X-EBAY-SOA-GLOBAL-ID`.
You have multiple options to do this.

### RESTful API headers

```javascript
  const eBay = new eBayApi();

eBay.buy.browse.api({
  headers: {
    'X-EBAY-SOA-GLOBAL-ID': 'EBAY-DE'
  }
}).getItem('v1|382282567190|651094235351').then((item) => {
  console.log(item)
})
```

### Traditional API headers

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
import eBayApi from 'ebay-api';

const eBay = new eBayApi(/* {  your config here } */);

eBay.req.instance.interceptors.request.use((request) => {
  // Add Header
  request.headers['X-EBAY-SOA-GLOBAL-ID'] = 'EBAY-DE';
  return request;
})
```

### Handle JSON GZIP response e.g fetchItemAspects

You need a decompress library installed like `zlib`.

```bash 
npm install zlib # or yarn add zlib
```

```javascript
import eBayApi from 'ebay-api';
import zlib from 'zlib';

const toString = (data) => new Promise((resolve) => {
  zlib.gunzip(data, (err, output) => {
    if (err) throw err;
    resolve(output.toString());
  });
});

const eBay = new eBayApi(/* {  your config here } */);

try {
  const data = await eBay.commerce.taxonomy.fetchItemAspects(/* categoryTreeId */);
  const result = await toString(data);

  console.log(result)
} catch (error) {
  console.error(error);
}
```
## Handling errors
```js
import eBayApi from 'ebay-api';
import { EBayApiError } from 'ebay-api/lib/errors';

const eBay = new eBayApi(/* {  your config here } */);

try {
  const result = await eBay.trading.GetItem({
    ItemID: 'itemId',
  });
  console.log(result);
} catch (error) {
  if (error instanceof EBayApiError && error.errorCode === 17) {
    // Item not found
  } else {
    throw error;
  }
  
  // in error there is also the field "meta" with the response
  if (error instanceof EBayApiError && error.meta?.res?.status === 404) {
    // not found
    
    // The first error
    console.log(error?.firstError);
  }
  
  
}
```

The `errorCode` is extracted from the first error in the API response.

* [Shopping API Error Codes](https://developer.ebay.com/devzone/shopping/docs/callref/Errors/ErrorMessages.html)
* [Trading API  Error Codes](https://developer.ebay.com/devzone/xml/docs/reference/ebay/errors/errormessages.htm)
* [RESTful  Error Codes](https://developer.ebay.com/devzone/xml/docs/reference/ebay/errors/errormessages.htm)
* [PostOrder  Error Codes](https://developer.ebay.com/Devzone/post-order/ErrorMessages.html#ErrorsByNumber)



## Controlling Traditional XML request and response

The second parameter in the traditional API has the following options:

```typescript
export type Options = {
  raw?: boolean // return raw XML
  parseOptions?: X2jOptions // https://github.com/NaturalIntelligence/fast-xml-parser
  xmlBuilderOptions?: XmlBuilderOptions // https://github.com/NaturalIntelligence/fast-xml-parser
  useIaf?: boolean // use IAF in header instead of Bearer
  headers?: Headers // additional Headers (key, value)
  hook?: (xml) => BodyHeaders // hook into the request to modify the body and headers
};
```

[Fast XML](https://github.com/NaturalIntelligence/fast-xml-parser) is used to parse the XML. You can pass the parse
option to `parseOptions` parameter.

### Parse JSON Array
```js

eBay.trading.SetNotificationPreferences({
  UserDeliveryPreferenceArray: [{
    NotificationEnable: {
      EventType: 'ItemListed',
      EventEnable: 'Enable',
    }
  }, {
    NotificationEnable: {
      EventType: 'ItemSold',
      EventEnable: 'Enable',
    },
  }],
}, { xmlBuilderOptions: { oneListGroup: true }})
```

Will produce:
```xml
<UserDeliveryPreferenceArray>
  <NotificationEnable>
    <EventType>ItemListed</EventType>
    <EventEnable>Enable</EventEnable>
  </NotificationEnable>
  <NotificationEnable>
    <EventType>ItemSold</EventType>
    <EventEnable>Enable</EventEnable>
  </NotificationEnable>
</UserDeliveryPreferenceArray>
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

### Trading - ReviseFixedPriceItem (Update the price of an item)

```javascript
eBay.trading.ReviseFixedPriceItem({
  Item: {
    ItemID: 'itemId',
    StartPrice: 'startPrice'
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

### Finding - findItemsByProduct \(use XML attributes and value\)

```javascript
eBay.finding.findItemsByProduct({
  productId: {
    '@_type': 'ReferenceID',
    '#value': '53039031'
  }
})

// will produce:
// <productId type="ReferenceID">53039031</productId>
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

## FAQ

1. Do I need the [eBay OAuth Client](https://www.npmjs.com/package/ebay-oauth-nodejs-client) dependency?

No. This library has already all authentication implemented and support also auto refreshing token.

2. What does IAF mean?

IAF stands for IDENTITY ASSERTION FRAMEWORK.
The traditional API supports IAF. That means you can use the OAuth2 token with the traditional APIs.

3. Is it possible to Upload Pictures directly to EPS?

Yes. Checkout the [Browser](https://hendt.github.io/ebay-api/) example
and [Node Example here](https://github.com/hendt/ebay-api/blob/master/examples/traditional/trading.UploadSiteHostedPictures.ts).

4. itemAffiliateWebUrl is missing in eBay.buy.browse.search call
   You have to set `endUserCtx`.

## Contribution

Check [here](https://github.com/hendt/ebay-api/blob/master/CONTRIBUTING.md)

## Supported By

[hendt.de](https://hendt.de)  
[rootle.de](https://rootle.de)

## 📝 License

MIT.