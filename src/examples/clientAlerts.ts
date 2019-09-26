import EBay from '../index';

const ebay = EBay.fromEnv();

ebay.clientAlerts.GetPublicAlerts({
    ChannelDescriptor: [
        {
            ChannelType: 'Item',
            ChannelID: 174028462015,
            EventType: ['ItemSold']
        },
        {
            ChannelType: 'Item',
            ChannelID: 180434053857,
            EventType: ['ItemEnded']
        }
    ]
}).then(alerts => {
    console.log(JSON.stringify(alerts));
}).catch(e => {
    console.log(e);
});