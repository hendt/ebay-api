// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/VerifyAddSecondChanceItem.html#Output
import type { StandardOutputFields } from "./common.js";

export interface VerifyAddSecondChanceItemResponse
	extends StandardOutputFields {
	StartTime: string;
}
