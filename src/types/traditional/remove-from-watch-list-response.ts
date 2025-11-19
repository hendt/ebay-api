// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/RemoveFromWatchList.html#Output
import type { StandardOutputFields } from './common.js';

export interface RemoveFromWatchListResponse extends StandardOutputFields {
  WatchListMaximum: number;
}
