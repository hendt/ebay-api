// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/AddSecondChanceItem.html#Output
import type { StandardOutputFields } from './common.js';

export interface AddSecondChanceItemResponse extends StandardOutputFields {
  ItemID: string;
  StartTime: string;
}
