// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/EndFixedPriceItem.html#Output
import type { StandardOutputFields } from "./common.js";

export interface EndFixedPriceItemResponse extends StandardOutputFields {
	SKU?: string;
}
