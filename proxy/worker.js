/*
CORS Anywhere as a Cloudflare Worker
*/

const blacklist = [];  // regexp for blacklisted urls
const whitelist = [".*"]; // regexp for whitelisted origins
const whitelistFetch = ["hendt.de", "ebay.com/"]; // regexp for whitelisted fetch url
const logUrl = ''; // e.g. from https://requestbin.com

const responseBody = `
  HENDT eBay API Proxy<br>
  Usage: https://ebay.hendt.workers.dev/https://hendt.de <br> or
   https://ebay.hendt.workers.dev/?url=https%3A%2F%2Fhendt.de
  <a href='https://github.com/hendt/ebay-api'>eBay API</a><br>\n
`;

function isListed(uri, listing) {
  let ret = false;
  if (typeof uri == "string") {
    listing.forEach((m) => {
      if (uri.match(m) != null) ret = true;
    });
  } else {            //   decide what to do when Origin is null
    ret = true;    // true accepts null origins false rejects them.
  }
  return ret;
}

function fixHeaders(headers, {isOptions, origin, requestMethod, accessControl}) {
  headers.set("Access-Control-Allow-Origin", origin);

  if (isOptions) {
    headers.set("Access-Control-Allow-Methods", requestMethod);
    if (accessControl) {
      headers.set("Access-Control-Allow-Headers", accessControl);
    }

    headers.delete("X-Content-Type-Options");
  }
  return headers;
}

const log = (data) => {
  if (!logUrl) {
    console.log(JSON.stringify(data, null, 2));
    return Promise.resolve();
  }
  return fetch(logUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const handleRequest = async (event) => {
  try {
    const isOptions = (event.request.method === "OPTIONS");
    const origin = event.request.headers.get("Origin");
    const originUrl = new URL(event.request.url);
    let fetchUrl = originUrl.pathname.substr(1);

    if (fetchUrl) {
      fetchUrl = fetchUrl
        .replace('https:/', 'https://')
        .replace('http:/', 'http://');
      fetchUrl = decodeURIComponent(fetchUrl) + originUrl.search;
    } else {
      const urlParams = new URLSearchParams(originUrl.search);
      fetchUrl = urlParams.get('url');
    }

    if (!fetchUrl) {
      return new Response(responseBody,
        {
          status: 403,
          statusText: 'Forbidden',
          headers: {
            "Content-Type": "text/html"
          }
        });
    }

    if (!isListed(fetchUrl, whitelistFetch) || isListed(fetchUrl, blacklist) || !isListed(origin, whitelist)) {
      return new Response(responseBody,
        {
          status: 403,
          statusText: 'Forbidden',
          headers: {
            "Content-Type": "text/html"
          }
        });
    }

    const accessControl = event.request.headers.get("access-control-request-headers");
    const requestMethod = event.request.headers.get("access-control-request-method");

    const recHeaders = {};
    for (let pair of event.request.headers.entries()) {
      const key = pair[0];
      if ((key.match("^origin") == null) &&
        (key.match("eferer") == null) &&
        (key.match("^cf-") == null) &&
        (key.match("^x-forw") == null) &&
        (key.match("^x-cors-headers") == null)
      ) {
        recHeaders[key] = pair[1];
      }
    }

    try {
      const xHeaders = JSON.parse(event.request.headers.get("x-cors-headers"));
      Object.entries(xHeaders).forEach((c) => recHeaders[c[0]] = c[1]);
    } catch (e) {
    }

    try {
      event.waitUntil(log({
        type: 'newReq',
        fetchUrl,
        headers: recHeaders
      }));

      const newReq = new Request(event.request, {
        "headers": recHeaders
      });

      const response = await fetch(encodeURI(fetchUrl), newReq);
      let responseHeaders = new Headers(response.headers);

      const corsHeaders = [];
      const receivedHeaders = {};

      for (let pair of response.headers.entries()) {
        corsHeaders.push(pair[0]);
        receivedHeaders[pair[0]] = pair[1];
      }

      corsHeaders.push("cors-received-headers");
      responseHeaders = fixHeaders(responseHeaders, {isOptions, origin, requestMethod, accessControl});
      responseHeaders.set("Access-Control-Expose-Headers", corsHeaders.join(","));
      responseHeaders.set("cors-received-headers", JSON.stringify(receivedHeaders));

      if (isOptions) {
        event.waitUntil(log({
          type: 'options',
          fetchUrl,
          headers: [...responseHeaders]
        }));
        return new Response(null, {
          headers: responseHeaders,
          status: 200,
          statusText: "OK"
        });
      }

      const init = {
        headers: responseHeaders,
        status: response.status,
        statusText: response.statusText
      };

      event.waitUntil(log({
        type: 'response',
        fetchUrl,
        headers: [...responseHeaders]
      }));

      const body = await response.arrayBuffer();
      return new Response(body, init);
    } catch (e) {
      event.waitUntil(log({
        type: 'error',
        fetchUrl,
        message: e.message,
        error: e.stack || e
      }));

      return new Response(null,
        {
          status: 400,
          statusText: 'Bad request',
          headers: {
            "Content-Type": "text/html"
          }
        });
    }
  } catch (err) {
    // Return the error stack as the response
    return new Response(err.stack || err.message, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        "Content-Type": "text/html"
      }
    });
  }
};

addEventListener("fetch", async event => {
  event.passThroughOnException();
  event.respondWith(handleRequest(event));
});
