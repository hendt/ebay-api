const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://developer.ebay.com/api-docs/master/buy/browse/openapi/3/buy_browse_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/deal/openapi/3/buy_deal_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/feed/openapi/3/buy_feed_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/marketing/openapi/3/buy_marketing_v1_beta_oas3.json',
//  'https://developer.ebay.com/api-docs/master/buy/marketplace_insights/openapi/3/buy_marketplace_insights_v1_beta_oas3.json', no longer published (302)
  'https://developer.ebay.com/api-docs/master/buy/offer/openapi/3/buy_offer_v1_beta_oas3.json',
//  'https://developer.ebay.com/api-docs/master/buy/order/openapi/3/buy_order_v1_beta_oas3.json', v1_beta no longer published, moved to v2 (302)
//  'https://developer.ebay.com/api-docs/master/cancellation/openapi/3/cancellation_oas3.json', post-order, custom spec
//  'https://developer.ebay.com/api-docs/master/case/openapi/3/case_oas3.json', post-order, custom spec
  'https://developer.ebay.com/api-docs/master/commerce/catalog/openapi/3/commerce_catalog_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/charity/openapi/3/commerce_charity_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/identity/openapi/3/commerce_identity_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/media/openapi/3/commerce_media_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/message/openapi/3/commerce_message_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/notification/openapi/3/commerce_notification_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/taxonomy/openapi/3/commerce_taxonomy_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/translation/openapi/3/commerce_translation_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/developer/analytics/openapi/3/developer_analytics_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/developer/key-management/openapi/3/developer_key_management_v1_oas3.json',
//  'https://developer.ebay.com/api-docs/master/inquiry/openapi/3/inquiry_oas3.json', post-order, custom spec
//  'https://developer.ebay.com/api-docs/master/return/openapi/3/return_oas3.json', post-order, custom spec
  'https://developer.ebay.com/api-docs/master/sell/account/openapi/3/sell_account_v1_oas3.json',
//  'https://developer.ebay.com/api-docs/master/sell/account/v2/openapi/3/sell_account_v2_oas3.json', static contract omits the SetUserPreferencesRequest schema (dangling $ref); fetch manually from developer.ebay.com/docs/fetch (rawSchema=true, browser session) instead
  'https://developer.ebay.com/api-docs/master/sell/analytics/openapi/3/sell_analytics_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/feed/openapi/3/sell_feed_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/finances/openapi/3/sell_finances_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/fulfillment/openapi/3/sell_fulfillment_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/inventory/openapi/3/sell_inventory_v1_oas3.json',
//  'https://developer.ebay.com/api-docs/master/sell/listing/openapi/3/sell_listing_v1_beta_oas3.json', no longer published (302)
  'https://developer.ebay.com/api-docs/master/sell/logistics/openapi/3/sell_logistics_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/marketing/openapi/3/sell_marketing_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/metadata/openapi/3/sell_metadata_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/negotiation/openapi/3/sell_negotiation_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/recommendation/openapi/3/sell_recommendation_v1_oas3.json'
];

const outputDir = './specs';

// eBay sits behind Akamai Bot Manager: the first request 403s but sets
// bot-mitigation cookies (bm_ss/bm_s/bm_so), and a retry carrying those
// cookies is allowed through. Node's https does not persist cookies, so we
// keep a small shared jar and send a browser User-Agent.
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const cookies = {};

function cookieHeader() {
  return Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ');
}

function storeCookies(setCookie) {
  for (const entry of setCookie || []) {
    const pair = entry.split(';')[0];
    const eq = pair.indexOf('=');
    if (eq !== -1) {
      cookies[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
    }
  }
}

function request(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': userAgent,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://developer.ebay.com/'
    };
    const cookie = cookieHeader();
    if (cookie) {
      headers.Cookie = cookie;
    }

    https.get(url, { headers }, (response) => {
      storeCookies(response.headers['set-cookie']);
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve({ statusCode: response.statusCode, body: data }));
    }).on('error', reject);
  });
}

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Download a file
async function downloadFile(url) {
  const filename = url.split('/').pop();
  const filepath = path.join(outputDir, filename);

  let response = await request(url);
  // Retry once with the freshly-issued bot-mitigation cookies.
  if (response.statusCode === 403) {
    response = await request(url);
  }
  if (response.statusCode !== 200) {
    throw new Error(`HTTP ${response.statusCode}`);
  }

  fs.writeFileSync(filepath, response.body);
  return filename;
}

// Download all files
async function downloadAll() {
  console.log(`Downloading ${urls.length} files to ${outputDir}/`);

  let success = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      const filename = await downloadFile(url);
      console.log(`✓ ${filename}`);
      success++;
    } catch (error) {
      console.log(`✗ ${url.split('/').pop()} - ${error.message}`);
      failed++;
    }

    // Small delay between downloads
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
}

downloadAll().then(() => {
  console.log('Done!');
  process.exit(0);
});
