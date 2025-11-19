// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetShippingDiscountProfiles.html#Output
import type { CurrencyCodeType, StandardOutputFields } from "./common.js";

export interface GetShippingDiscountProfilesResponse
	extends StandardOutputFields {
	CalculatedHandlingDiscount: {
		DiscountName?:
			| "CombinedHandlingFee"
			| "CustomCode"
			| "EachAdditionalAmount"
			| "EachAdditionalAmountOff"
			| "EachAdditionalPercentOff"
			| "IndividualHandlingFee";
		EachAdditionalAmount?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		EachAdditionalOffAmount?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		EachAdditionalPercentOff?: number;
		OrderHandlingAmount?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
	};
	CalculatedShippingDiscount: {
		DiscountName?:
			| "CombinedItemWeight"
			| "CustomCode"
			| "EachAdditionalAmount"
			| "EachAdditionalAmountOff"
			| "EachAdditionalPercentOff"
			| "IndividualItemWeight"
			| "MaximumShippingCostPerOrder"
			| "ShippingCostXForAmountY"
			| "ShippingCostXForItemCountN"
			| "WeightOff";
		DiscountProfile?: {
			DiscountProfileID: string;
			DiscountProfileName?: string;
			MappedDiscountProfileID?: string;
			WeightOff?:
				| number
				| {
						value: number;
						unit: string;
						measurementSystem: "English" | "Metric";
				  };
		};
	};
	CombinedDuration:
		| "CustomCode"
		| "Days_14"
		| "Days_3"
		| "Days_30"
		| "Days_5"
		| "Days_7"
		| "Ineligible";
	CurrencyID: CurrencyCodeType;
	FlatShippingDiscount: {
		DiscountName?:
			| "CombinedItemWeight"
			| "CustomCode"
			| "EachAdditionalAmount"
			| "EachAdditionalAmountOff"
			| "EachAdditionalPercentOff"
			| "IndividualItemWeight"
			| "MaximumShippingCostPerOrder"
			| "ShippingCostXForAmountY"
			| "ShippingCostXForItemCountN"
			| "WeightOff";
		DiscountProfile?: {
			DiscountProfileID: string;
			DiscountProfileName?: string;
			EachAdditionalAmount?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			EachAdditionalAmountOff?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			EachAdditionalPercentOff?: number;
		};
	};
	PromotionalShippingDiscount: boolean;
	PromotionalShippingDiscountDetails?: {
		DiscountName?:
			| "CombinedItemWeight"
			| "CustomCode"
			| "EachAdditionalAmount"
			| "EachAdditionalAmountOff"
			| "EachAdditionalPercentOff"
			| "IndividualItemWeight"
			| "MaximumShippingCostPerOrder"
			| "ShippingCostXForAmountY"
			| "ShippingCostXForItemCountN"
			| "WeightOff";
		ItemCount?: number;
		OrderAmount?: number | { value: number; currencyID: CurrencyCodeType };
		ShippingCost?: number | { value: number; currencyID: CurrencyCodeType };
	};
}
