// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetTokenStatus.html#Output
import type { StandardOutputFields } from "./common.js";

export interface GetTokenStatusResponse extends StandardOutputFields {
	TokenStatus: {
		EIASToken: string;
		ExpirationTime: string;
		RevocationTime: string;
		Status:
			| "Active"
			| "CustomCode"
			| "Expired"
			| "Invalid"
			| "RevokedByApp"
			| "RevokedByeBay"
			| "RevokedByUser";
	};
}
