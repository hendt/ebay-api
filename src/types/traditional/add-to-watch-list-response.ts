// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/AddToWatchList.html#Output
import type { StandardOutputFields } from "./common.js";

export interface AddToWatchListResponse extends StandardOutputFields {
	WatchListMaximum: number;
}
