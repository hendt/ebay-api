import EBay from '../index';

const ebay = EBay.fromEnv();

ebay.trading.GetMyMessages({
    MessageIDs: {
        MessageID: [117475106841]
    },
    DetailLevel: 'ReturnMessages'
}).then(message => {
        console.log('message', JSON.stringify(message, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});

/*
ebay.trading.GetMemberMessages({
    MemberMessageID: 117475106841,
    MailMessageType: 'AskSellerQuestion',
    MessageStatus: 'Unanswered'
}).then(message => {
    console.log('message', JSON.stringify(message, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
}); */