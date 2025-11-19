// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetAdFormatLeads.html#Output
import type { StandardOutputFields } from "./common.js";

export interface GetAdFormatLeadsResponse extends StandardOutputFields {
	AdFormatLead: {
		AdditionalInformation?: string;
		Address?: {
			CityName?: string;
			FirstName?: string;
			LastName?: string;
			Phone?: string;
			Phone2?: string;
			PostalCode?: string;
			StateOrProvince?: string;
			Street1?: string;
		};
		Answer1?: boolean;
		Answer2?: boolean;
		BestTimeToCall?: string;
		Email?: string;
		ExternalEmail?: string;
		FinancingAnswer?: boolean;
		ItemID?: string;
		ItemTitle?: string;
		MemberMessage?: {
			MemberMessageExchange?: {
				CreationDate?: string;
				Question?: {
					Body?: string;
				};
				Response?: string;
			};
		};
		PurchaseTimeFrame?: string;
		Status?: "CustomCode" | "New" | "Responded";
		SubmittedTime?: string;
		TradeInMake?: string;
		TradeInModel?: string;
		TradeInYear?: string;
		UserID?: string;
	};
	AdFormatLeadCount: number;
}
