// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/VerifyAddItem.html#Output
import type { CurrencyCodeType, StandardOutputFields } from "./common.js";

export interface VerifyAddItemResponse extends StandardOutputFields {
	CategoryID?: string;
	DiscountReason?: "CustomCode" | "Promotion" | "SpecialOffer";
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
	ProductSuggestions?: {
		ProductSuggestion?: {
			EPID?: string;
			Recommended?: boolean;
			StockPhoto?: string;
			Title?: string;
		};
	};
}
