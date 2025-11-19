// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/AddToItemDescription.html#Output
import type { StandardOutputFields } from './common.js';

export interface AddToItemDescriptionResponse extends StandardOutputFields {
  DuplicateInvocationDetails?: {
    DuplicateInvocationID?: string;
    InvocationTrackingID?: string;
    Status?: 'CustomCode' | 'Failure' | 'InProgress' | 'Success';
  };
  Message?: string;
}
