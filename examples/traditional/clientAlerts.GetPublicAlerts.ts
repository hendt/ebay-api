// tslint:disable:no-console
import eBayApi from '../../src/eBayApi.js';

import {EventType} from '../../src/api/traditional/clientAlerts';

const eBay = eBayApi.fromEnv();

eBay.clientAlerts.GetPublicAlerts({
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
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.log(e);
});
