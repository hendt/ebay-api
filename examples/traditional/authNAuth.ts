// tslint:disable:no-console
// @ts-ignore
import readline from 'readline';
import eBayApi from '../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();
// DOCS: https://developer.ebay.com/devzone/xml/docs/howto/tokens/gettingtokens.html

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

eBay.authNAuth.getSessionIdAndAuthUrl().then(({url, sessionId}) => {
  console.log('Authorize this app by visiting this url: ', url);

  rl.question('Press Enter after grant access', async () => {
    await eBay.authNAuth.obtainToken(sessionId);

    try {
      const time = await eBay.trading.GeteBayOfficialTime();
      console.log(time);
    } catch (error) {
      console.error(error)
    } finally {
      rl.close();
    }

  });
});
