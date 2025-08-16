const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://developer.ebay.com/api-docs/master/buy/browse/openapi/3/buy_browse_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/deal/openapi/3/buy_deal_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/feed/openapi/3/buy_feed_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/marketing/openapi/3/buy_marketing_v1_beta_oas3.json',
//  'https://developer.ebay.com/api-docs/master/buy/marketplace_insights/openapi/3/buy_marketplace_insights_v1_beta_oas3.json', N/A
  'https://developer.ebay.com/api-docs/master/buy/offer/openapi/3/buy_offer_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/buy/order/openapi/3/buy_order_v2_oas3.json',
//  'https://developer.ebay.com/api-docs/master/cancellation/openapi/3/cancellation_oas3.json', custom
//  'https://developer.ebay.com/api-docs/master/case/openapi/3/case_oas3.json', custom
  'https://developer.ebay.com/api-docs/master/commerce/catalog/openapi/3/commerce_catalog_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/charity/openapi/3/commerce_charity_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/identity/openapi/3/commerce_identity_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/media/openapi/3/commerce_media_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/notification/openapi/3/commerce_notification_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/taxonomy/openapi/3/commerce_taxonomy_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/commerce/translation/openapi/3/commerce_translation_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/developer/analytics/openapi/3/developer_analytics_v1_beta_oas3.json',
  'https://developer.ebay.com/api-docs/master/developer/key-management/openapi/3/developer_key_management_v1_oas3.json',
//  'https://developer.ebay.com/api-docs/master/inquiry/openapi/3/inquiry_oas3.json', custom
//  'https://developer.ebay.com/api-docs/master/return/openapi/3/return_oas3.json', custom
  'https://developer.ebay.com/api-docs/master/sell/account/openapi/3/sell_account_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/account/v2/openapi/3/sell_account_v2_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/analytics/openapi/3/sell_analytics_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/compliance/openapi/3/sell_compliance_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/feed/openapi/3/sell_feed_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/finances/openapi/3/sell_finances_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/fulfillment/openapi/3/sell_fulfillment_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/inventory/openapi/3/sell_inventory_v1_oas3.json',
//  'https://developer.ebay.com/api-docs/master/sell/listing/openapi/3/sell_listing_v1_beta_oas3.json', N/A
  'https://developer.ebay.com/api-docs/master/sell/logistics/openapi/3/sell_logistics_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/marketing/openapi/3/sell_marketing_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/metadata/openapi/3/sell_metadata_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/negotiation/openapi/3/sell_negotiation_v1_oas3.json',
  'https://developer.ebay.com/api-docs/master/sell/recommendation/openapi/3/sell_recommendation_v1_oas3.json'
];

const outputDir = './specs';

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Download a file
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const filename = url.split('/').pop();
    const filepath = path.join(outputDir, filename);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP ${response.statusCode}`));
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        fs.writeFileSync(filepath, data);
        resolve(filename);
      });
    }).on('error', reject);
  });
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