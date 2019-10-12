import EBay from '../../src';
import readline from 'readline';

const ebay = EBay.fromEnv();
// DOCS: https://developer.ebay.com/devzone/xml/docs/howto/tokens/gettingtokens.html

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ruName = process.env.EBAY_RUN_NAME || ''; //; 'ruName (eBay Redirect URL name)';

ebay.getSessionIdAndAuthUrl(ruName).then(({url, sessionId}) => {
    console.log('Authorize this app by visiting this url: ', url);

    rl.question('Press Enter after grant access', async () => {
        const token = await ebay.fetchAuthToken(sessionId);
        ebay.setAuthToken(token);

        const time = ebay.trading.GeteBayOfficialTime();
        console.log(time);

        rl.close();
    });
});
