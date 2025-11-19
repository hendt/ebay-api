// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/AddMemberMessagesAAQToBidder.html#Output
import type { StandardOutputFields } from './common.js';

export interface AddMemberMessagesAAQToBidderResponse
  extends StandardOutputFields {
  AddMemberMessagesAAQToBidderResponseContainer: {
    Ack: 'CustomCode' | 'Failure' | 'PartialFailure' | 'Success' | 'Warning';
    CorrelationID: string;
  };
}
