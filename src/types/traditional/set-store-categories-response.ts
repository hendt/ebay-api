// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/SetStoreCategories.html#Output
import type { StandardOutputFields } from './common.js';

export interface SetStoreCategoriesResponse extends StandardOutputFields {
  Status: 'Complete' | 'CustomCode' | 'Failed' | 'InProgress' | 'Pending';
  TaskID: bigint;
}
