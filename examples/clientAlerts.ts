import EBay from '../src';
import {EventType} from "../src/api/traditional/clientAlerts";

const ebay = EBay.fromEnv();

ebay.clientAlerts.GetPublicAlerts({
    ChannelDescriptor: [
        {
            ChannelType: 'Item',
            ChannelID: 174028462015,
            EventType: [EventType.ItemEnded]
        },
        {
            ChannelType: 'Item',
            ChannelID: 180434053857,
            EventType: [EventType.ItemEnded]
        }
    ]
}).then(alerts => {
    console.log(JSON.stringify(alerts));
}).catch(e => {
    console.log(e);
});