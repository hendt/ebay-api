// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/FetchToken.html#Output
import type { StandardOutputFields } from "./common.js";

export interface FetchTokenResponse extends StandardOutputFields {
	HardExpirationTime: string;
	RESTToken?: string;
}
