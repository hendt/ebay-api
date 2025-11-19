// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetMessagePreferences.html#Output
import type { StandardOutputFields } from "./common.js";

export interface GetMessagePreferencesResponse extends StandardOutputFields {
	ASQPreferences: {
		Subject?: string;
	};
}
