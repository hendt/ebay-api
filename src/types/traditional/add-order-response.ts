// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/AddOrder.html#Output
import type { StandardOutputFields } from "./common.js";

export interface AddOrderResponse extends StandardOutputFields {
	OrderID: string;
}
