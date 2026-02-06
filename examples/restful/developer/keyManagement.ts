import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const signingKey = await eBay.developer.keyManagement.createSigningKey('ED25519');
    console.log(JSON.stringify(signingKey, null, 2));
  } catch (error) {
    console.error(error);
  }
})();
