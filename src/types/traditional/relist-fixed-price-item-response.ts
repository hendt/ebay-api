// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/RelistFixedPriceItem.html#Output
import type { CurrencyCodeType, StandardOutputFields } from "./common.js";

export interface RelistFixedPriceItemResponse extends StandardOutputFields {
	CategoryID?: string;
	DiscountReason?: "CustomCode" | "Promotion" | "SpecialOffer";
	EndTime: string;
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
	SKU?: string;
	StartTime: string;
}
