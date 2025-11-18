// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/AddItems.html#Output
import type { CurrencyCodeType, StandardOutputFields } from "./common.js";

export interface AddItemsResponse extends StandardOutputFields {
	AddItemResponseContainer: {
		Category2ID?: string;
		CategoryID?: string;
		CorrelationID: string;
		DiscountReason?: "CustomCode" | "Promotion" | "SpecialOffer";
		EndTime: string;
		Errors?: {
			ErrorClassification?: "CustomCode" | "RequestError" | "SystemError";
			ErrorCode?: string;
			ErrorParameters?: {
				Value?: string;
			};
			LongMessage?: string;
			SeverityCode?: "CustomCode" | "Error" | "Warning";
			ShortMessage?: string;
			UserDisplayHint?: boolean;
		};
		Fees: {
			Fee: {
				Fee: number | { value: number; currencyID: CurrencyCodeType };
				Name: string;
				PromotionalDiscount:
					| number
					| { value: number; currencyID: CurrencyCodeType };
			};
		};
		ItemID: string;
		Message?: string;
		StartTime: string;
	};
}
