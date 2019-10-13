import EBay from '../../src';
import readline from 'readline';

const ebay = EBay.fromEnv();
ebay.oAuth2.setScope([
    'https://api.ebay.com/oauth/api_scope/sell.inventory',
    'https://api.ebay.com/oauth/api_scope/sell.account',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
]);

const url = ebay.oAuth2.generateAuthUrl();

console.log('Authorize this app by visiting this url:', url);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code: string) => {
    rl.close();
    code = decodeURIComponent(code);
    console.log('Enter code', code);
    const token = await ebay.oAuth2.getToken(code);
    console.log('Token: ', token);
    ebay.oAuth2.setCredentials(token);

    ebay.sell.fulfillment.getOrder('<order-id>').then(order => {
        console.log('order', JSON.stringify(order, null, 2));
    }).catch(e => {
        console.log('error', {error: e.message});
    });
});
