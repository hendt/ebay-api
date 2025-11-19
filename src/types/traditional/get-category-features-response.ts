// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetCategoryFeatures.html#Output
import type { CurrencyCodeType, StandardOutputFields } from "./common.js";

export interface GetCategoryFeaturesResponse extends StandardOutputFields {
	Category: {
		AdFormatEnabled?:
			| "ClassifiedAdEnabled"
			| "ClassifiedAdOnly"
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "LocalMarketBestOfferOnly"
			| "Only";
		AdditionalCompatibilityEnabled?: boolean;
		BestOfferAutoAcceptEnabled?: boolean;
		BestOfferAutoDeclineEnabled?: boolean;
		BestOfferCounterEnabled?: boolean;
		BestOfferEnabled?: boolean;
		BrandMPNIdentifierEnabled?: boolean;
		BuyerGuaranteeEnabled?: boolean;
		CategoryID?: string;
		ClassifiedAdAutoAcceptEnabled?: boolean;
		ClassifiedAdAutoDeclineEnabled?: boolean;
		ClassifiedAdBestOfferEnabled?:
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "Required";
		ClassifiedAdCompanyNameEnabled?: boolean;
		ClassifiedAdContactByAddressEnabled?: boolean;
		ClassifiedAdContactByEmailEnabled?: boolean;
		ClassifiedAdContactByPhoneEnabled?: boolean;
		ClassifiedAdCounterOfferEnabled?: boolean;
		ClassifiedAdPayPerLeadEnabled?: boolean;
		ClassifiedAdPaymentMethodEnabled?:
			| "CustomCode"
			| "EnabledWithCheckout"
			| "EnabledWithoutCheckout"
			| "NotSupported";
		ClassifiedAdPhoneCount?: number;
		ClassifiedAdShippingMethodEnabled?: boolean;
		ClassifiedAdStreetCount?: number;
		CompatibleVehicleType?: string;
		ConditionEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		ConditionValues?: {
			Condition?: {
				DisplayName?: string;
				ID?: number;
			};
			ConditionHelpURL?: string;
		};
		CrossBorderTradeAustraliaEnabled?: boolean;
		CrossBorderTradeGBEnabled?: boolean;
		CrossBorderTradeNorthAmericaEnabled?: boolean;
		DepositSupported?: boolean;
		DigitalGoodDeliveryEnabled?: boolean;
		DomesticRefundMethodValues?: {
			DomesticRefundMethod?: "MoneyBack" | "MoneyBackorReplacement";
		};
		DomesticReturnsAcceptedValues?: {
			DomesticReturnsAccepted?: "ReturnsAccepted" | "ReturnsNotAccepted";
		};
		DomesticReturnsDurationValues?: {
			DomesticReturnsDuration?: "Days_14" | "Days_30" | "Days_60";
		};
		DomesticReturnsShipmentPayeeValues?: {
			DomesticReturnsShipmentPayee?: "Buyer" | "Seller";
		};
		EANEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		EpidSupported?: boolean;
		FreeGalleryPlusEnabled?: boolean;
		FreePicturePackEnabled?: boolean;
		GalleryFeaturedDurations?: {
			Duration?: string;
		};
		GlobalShippingEnabled?: boolean;
		Group1MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		Group2MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		Group3MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		HandlingTimeEnabled?: boolean;
		HomePageFeaturedEnabled?: boolean;
		INEscrowWorkflowTimeline?: string;
		ISBNEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		InternationalRefundMethodValues?: {
			InternationalRefundMethod?: "MoneyBack" | "MoneyBackorReplacement";
		};
		InternationalReturnsAcceptedValues?: {
			InternationalReturnsAccepted?: "ReturnsAccepted" | "ReturnsNotAccepted";
		};
		InternationalReturnsDurationValues?: {
			InternationalReturnsDuration?: "Days_14" | "Days_30" | "Days_60";
		};
		InternationalReturnsShipmentPayeeValues?: {
			InternationalReturnsShipmentPayee?: "Buyer" | "Seller";
		};
		ItemCompatibilityEnabled?:
			| "ByApplication"
			| "BySpecification"
			| "CustomCode"
			| "Disabled";
		ItemSpecificsEnabled?: "CustomCode" | "Disabled" | "Enabled";
		KTypeSupported?: boolean;
		ListingDuration?:
			| number
			| {
					value: number;
					type:
						| "AdType"
						| "Auction"
						| "Chinese"
						| "CustomCode"
						| "FixedPriceItem"
						| "LeadGeneration"
						| "PersonalOffer"
						| "Unknown";
			  };
		LocalMarketAdFormatEnabled?:
			| "ClassifiedAdEnabled"
			| "ClassifiedAdOnly"
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "LocalMarketBestOfferOnly"
			| "Only";
		LocalMarketAutoAcceptEnabled?: boolean;
		LocalMarketAutoDeclineEnabled?: boolean;
		LocalMarketBestOfferEnabled?:
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "Required";
		LocalMarketCompanyNameEnabled?: boolean;
		LocalMarketContactByAddressEnabled?: boolean;
		LocalMarketContactByEmailEnabled?: boolean;
		LocalMarketContactByPhoneEnabled?: boolean;
		LocalMarketCounterOfferEnabled?: boolean;
		LocalMarketNonSubscription?: boolean;
		LocalMarketPaymentMethodCheckOutEnabled?:
			| "CustomCode"
			| "EnabledWithCheckout"
			| "EnabledWithoutCheckout"
			| "NotSupported";
		LocalMarketPhoneCount?: number;
		LocalMarketPremiumSubscription?: boolean;
		LocalMarketRegularSubscription?: boolean;
		LocalMarketSellerContactDetailsEnabled?: boolean;
		LocalMarketShippingMethodEnabled?: boolean;
		LocalMarketSpecialitySubscription?: boolean;
		LocalMarketStreetCount?: number;
		MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		MaxGranularFitmentCount?: number;
		MaxItemCompatibility?: number;
		MinItemCompatibility?: number;
		MinimumReservePrice?: number;
		NonSubscription?: "CustomCode" | "LocalOnly" | "LocalOptional" | "National";
		PaisaPayFullEscrowEnabled?: boolean;
		PaymentMethod?:
			| "CashOnPickup"
			| "COD"
			| "CustomCode"
			| "MOCC"
			| "PersonalCheck";
		PaymentProfileCategoryGroup?: "ALL" | "Inherit" | "MOTORS_VEHICLE" | "None";
		PickupDropOffEnabled?: boolean;
		PremiumSubscription?:
			| "CustomCode"
			| "LocalOnly"
			| "LocalOptional"
			| "National";
		ProPackEnabled?: boolean;
		ProductCreationEnabled?: string;
		RegularSubscription?:
			| "CustomCode"
			| "LocalOnly"
			| "LocalOptional"
			| "National";
		ReturnPolicyDescriptionEnabled?: boolean;
		ReturnPolicyEnabled?: boolean;
		ReturnPolicyProfileCategoryGroup?:
			| "ALL"
			| "Inherit"
			| "MOTORS_VEHICLE"
			| "None";
		RevisePriceAllowed?: boolean;
		ReviseQuantityAllowed?: boolean;
		SafePaymentRequired?: boolean;
		SellerContactDetailsEnabled?: boolean;
		SellerProvidedTitleSupported?: boolean;
		ShippingProfileCategoryGroup?:
			| "ALL"
			| "Inherit"
			| "MOTORS_VEHICLE"
			| "None";
		ShippingTermsRequired?: boolean;
		SpecialFeatures?: {
			Condition?: {
				DisplayName?: string;
				ID?: number;
			};
			ConditionHelpURL?: string;
		};
		SpecialitySubscription?:
			| "CustomCode"
			| "LocalOnly"
			| "LocalOptional"
			| "National";
		StoreOwnerExtendedListingDurations?: {
			Duration?: string;
		};
		StoreOwnerExtendedListingDurationsEnabled?: boolean;
		TransactionConfirmationRequestEnabled?: boolean;
		UPCEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		UserConsentRequired?: boolean;
		VINSupported?: boolean;
		VRMSupported?: boolean;
		ValueCategory?: boolean;
		VariationsEnabled?: boolean;
		eBayMotorsProAdFormatEnabled?:
			| "ClassifiedAdEnabled"
			| "ClassifiedAdOnly"
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "LocalMarketBestOfferOnly"
			| "Only";
		eBayMotorsProAutoAcceptEnabled?: boolean;
		eBayMotorsProAutoDeclineEnabled?: boolean;
		eBayMotorsProBestOfferEnabled?:
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "Required";
		eBayMotorsProCompanyNameEnabled?: boolean;
		eBayMotorsProContactByAddressEnabled?: boolean;
		eBayMotorsProContactByEmailEnabled?: boolean;
		eBayMotorsProContactByPhoneEnabled?: boolean;
		eBayMotorsProCounterOfferEnabled?: boolean;
		eBayMotorsProPaymentMethodCheckOutEnabled?:
			| "CustomCode"
			| "EnabledWithCheckout"
			| "EnabledWithoutCheckout"
			| "NotSupported";
		eBayMotorsProPhoneCount?: number;
		eBayMotorsProSellerContactDetailsEnabled?: boolean;
		eBayMotorsProShippingMethodEnabled?: boolean;
		eBayMotorsProStreetCount?: number;
	};
	CategoryVersion: string;
	FeatureDefinitions: {
		AdFormatEnabled?: any;
		AdditionalCompatibilityEnabled?: any;
		BestOfferAutoAcceptEnabled?: any;
		BestOfferAutoDeclineEnabled?: any;
		BestOfferCounterEnabled?: any;
		BestOfferEnabled?: any;
		BrandMPNIdentifierEnabled?: any;
		BuyerGuaranteeEnabled?: any;
		ClassifiedAdAutoAcceptEnabled?: any;
		ClassifiedAdAutoDeclineEnabled?: any;
		ClassifiedAdBestOfferEnabled?: any;
		ClassifiedAdCompanyNameEnabled?: any;
		ClassifiedAdContactByAddressEnabled?: any;
		ClassifiedAdContactByEmailEnabled?: any;
		ClassifiedAdContactByPhoneEnabled?: any;
		ClassifiedAdCounterOfferEnabled?: any;
		ClassifiedAdPayPerLeadEnabled?: any;
		ClassifiedAdPaymentMethodEnabled?: any;
		ClassifiedAdPhoneCount?: any;
		ClassifiedAdShippingMethodEnabled?: any;
		ClassifiedAdStreetCount?: any;
		CompatibleVehicleType?: any;
		ConditionEnabled?: any;
		ConditionValues?: any;
		CrossBorderTradeAustraliaEnabled?: any;
		CrossBorderTradeGBEnabled?: any;
		CrossBorderTradeNorthAmericaEnabled?: any;
		DepositSupported?: any;
		DigitalGoodDeliveryEnabled?: any;
		DomesticRefundMethodValues?: {
			DomesticRefundMethod?: "MoneyBack" | "MoneyBackorReplacement";
		};
		DomesticReturnsAcceptedValues?: any;
		DomesticReturnsDurationValues?: any;
		DomesticReturnsShipmentPayeeValues?: any;
		EANEnabled?: any;
		EpidSupported?: any;
		FreeGalleryPlusEnabled?: any;
		FreePicturePackEnabled?: any;
		GalleryFeaturedDurations?: any;
		GlobalShippingEnabled?: any;
		Group1MaxFlatShippingCost?: any;
		Group2MaxFlatShippingCost?: any;
		Group3MaxFlatShippingCost?: any;
		HandlingTimeEnabled?: any;
		HomePageFeaturedEnabled?: any;
		INEscrowWorkflowTimeline?: any;
		ISBNEnabled?: any;
		InternationalRefundMethodValues?: {
			InternationalRefundMethod?: "MoneyBack" | "MoneyBackorReplacement";
		};
		InternationalReturnsAcceptedValues?: any;
		InternationalReturnsDurationValues?: any;
		InternationalReturnsShipmentPayeeValues?: any;
		ItemCompatibilityEnabled?: any;
		ItemSpecificsEnabled?: any;
		KTypeSupported?: any;
		ListingDurations?: {
			ListingDuration?: {
				Duration?: string;
			};
		};
		LocalListingDistancesNonSubscription?: any;
		LocalListingDistancesRegular?: any;
		LocalListingDistancesSpecialty?: any;
		LocalMarketAdFormatEnabled?: any;
		LocalMarketAutoAcceptEnabled?: any;
		LocalMarketAutoDeclineEnabled?: any;
		LocalMarketBestOfferEnabled?: any;
		LocalMarketCompanyNameEnabled?: any;
		LocalMarketContactByAddressEnabled?: any;
		LocalMarketContactByEmailEnabled?: any;
		LocalMarketContactByPhoneEnabled?: any;
		LocalMarketCounterOfferEnabled?: any;
		LocalMarketNonSubscription?: any;
		LocalMarketPaymentMethodCheckOutEnabled?: any;
		LocalMarketPhoneCount?: any;
		LocalMarketPremiumSubscription?: any;
		LocalMarketRegularSubscription?: any;
		LocalMarketSellerContactDetailsEnabled?: any;
		LocalMarketShippingMethodEnabled?: any;
		LocalMarketSpecialitySubscription?: any;
		LocalMarketStreetCount?: any;
		MaxFlatShippingCost?: any;
		MaxFlatShippingCostCBTExempt?: any;
		MaxGranularFitmentCount?: any;
		MaxItemCompatibility?: any;
		MinItemCompatibility?: any;
		MinimumReservePrice?: any;
		NonSubscription?: any;
		PaisaPayFullEscrowEnabled?: any;
		PaymentMethod?: any;
		PaymentProfileCategoryGroup?: any;
		PickupDropOffEnabled?: any;
		PremiumSubscription?: any;
		ProPackEnabled?: any;
		ProPackPlusEnabled?: any;
		ProductCreationEnabled?: any;
		ProductRequiredEnabled?: any;
		RegularSubscription?: any;
		ReturnPolicyDescriptionEnabled?: any;
		ReturnPolicyEnabled?: any;
		ReturnPolicyProfileCategoryGroup?: any;
		RevisePriceAllowed?: any;
		ReviseQuantityAllowed?: any;
		SafePaymentRequired?: any;
		SellerContactDetailsEnabled?: any;
		SellerProvidedTitleSupported?: any;
		ShippingProfileCategoryGroup?: any;
		ShippingTermsRequired?: any;
		SkypeMeNonTransactionalEnabled?: any;
		SkypeMeTransactionalEnabled?: any;
		SpecialitySubscription?: any;
		StoreOwnerExtendedListingDurations?: any;
		StoreOwnerExtendedListingDurationsEnabled?: any;
		TransactionConfirmationRequestEnabled?: any;
		UPCEnabled?: any;
		VINSupported?: any;
		VRMSupported?: any;
		ValueCategory?: any;
		ValuePackEnabled?: any;
		VariationsEnabled?: any;
		eBayMotorsProAdFormatEnabled?: any;
		eBayMotorsProAutoAcceptEnabled?: any;
		eBayMotorsProAutoDeclineEnabled?: any;
		eBayMotorsProBestOfferEnabled?: any;
		eBayMotorsProCompanyNameEnabled?: any;
		eBayMotorsProContactByAddressEnabled?: any;
		eBayMotorsProContactByEmailEnabled?: any;
		eBayMotorsProContactByPhoneEnabled?: any;
		eBayMotorsProCounterOfferEnabled?: any;
		eBayMotorsProPaymentMethodCheckOutEnabled?: any;
		eBayMotorsProPhoneCount?: any;
		eBayMotorsProSellerContactDetailsEnabled?: any;
		eBayMotorsProShippingMethodEnabled?: any;
		eBayMotorsProStreetCount?: any;
	};
	SiteDefaults: {
		AdFormatEnabled?:
			| "ClassifiedAdEnabled"
			| "ClassifiedAdOnly"
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "LocalMarketBestOfferOnly"
			| "Only";
		AdditionalCompatibilityEnabled?: boolean;
		BasicUpgradePackEnabled?: boolean;
		BestOfferAutoAcceptEnabled?: boolean;
		BestOfferAutoDeclineEnabled?: boolean;
		BestOfferCounterEnabled?: boolean;
		BestOfferEnabled?: boolean;
		BrandMPNIdentifierEnabled?: boolean;
		BuyerGuaranteeEnabled?: boolean;
		ClassifiedAdAutoAcceptEnabled?: boolean;
		ClassifiedAdAutoDeclineEnabled?: boolean;
		ClassifiedAdBestOfferEnabled?:
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "Required";
		ClassifiedAdCompanyNameEnabled?: boolean;
		ClassifiedAdContactByAddressEnabled?: boolean;
		ClassifiedAdContactByEmailEnabled?: boolean;
		ClassifiedAdContactByPhoneEnabled?: boolean;
		ClassifiedAdCounterOfferEnabled?: boolean;
		ClassifiedAdPayPerLeadEnabled?: boolean;
		ClassifiedAdPaymentMethodEnabled?:
			| "CustomCode"
			| "EnabledWithCheckout"
			| "EnabledWithoutCheckout"
			| "NotSupported";
		ClassifiedAdPhoneCount?: number;
		ClassifiedAdShippingMethodEnabled?: boolean;
		ClassifiedAdStreetCount?: number;
		CompatibleVehicleType?: string;
		ConditionEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		ConditionValues?: {
			Condition?: {
				DisplayName?: string;
				ID?: number;
			};
			ConditionHelpURL?: string;
		};
		CrossBorderTradeAustraliaEnabled?: boolean;
		CrossBorderTradeGBEnabled?: boolean;
		CrossBorderTradeNorthAmericaEnabled?: boolean;
		DepositSupported?: boolean;
		DigitalGoodDeliveryEnabled?: boolean;
		DomesticRefundMethodValues?: {
			DomesticRefundMethod?: "MoneyBack" | "MoneyBackorReplacement";
		};
		DomesticReturnsAcceptedValues?: {
			DomesticReturnsAccepted?: "ReturnsAccepted" | "ReturnsNotAccepted";
		};
		DomesticReturnsDurationValues?: {
			DomesticReturnsDuration?: "Days_14" | "Days_30" | "Days_60";
		};
		DomesticReturnsShipmentPayeeValues?: {
			DomesticReturnsShipmentPayee?: "Buyer" | "Seller";
		};
		EANEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		EpidSupported?: boolean;
		FreeGalleryPlusEnabled?: boolean;
		FreePicturePackEnabled?: boolean;
		GalleryFeaturedDurations?: {
			Duration?: string;
		};
		GlobalShippingEnabled?: boolean;
		Group1MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		Group2MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		Group3MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		HandlingTimeEnabled?: boolean;
		HomePageFeaturedEnabled?: boolean;
		ISBNEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		InternationalRefundMethodValues?: {
			InternationalRefundMethod?: "MoneyBack" | "MoneyBackorReplacement";
		};
		InternationalReturnsAcceptedValues?: {
			InternationalReturnsAccepted?: "ReturnsAccepted" | "ReturnsNotAccepted";
		};
		InternationalReturnsDurationValues?: {
			InternationalReturnsDuration?: "Days_14" | "Days_30" | "Days_60";
		};
		InternationalReturnsShipmentPayeeValues?: {
			InternationalReturnsShipmentPayee?: "Buyer" | "Seller";
		};
		ItemCompatibilityEnabled?:
			| "ByApplication"
			| "BySpecification"
			| "CustomCode"
			| "Disabled";
		ItemSpecificsEnabled?: "CustomCode" | "Disabled" | "Enabled";
		KTypeSupported?: boolean;
		ListingDuration?:
			| number
			| {
					value: number;
					type:
						| "AdType"
						| "Auction"
						| "Chinese"
						| "CustomCode"
						| "FixedPriceItem"
						| "LeadGeneration"
						| "PersonalOffer"
						| "Unknown";
			  };
		LocalListingDistancesNonSubscription?: string;
		LocalListingDistancesRegular?: string;
		LocalListingDistancesSpecialty?: string;
		LocalMarketAdFormatEnabled?:
			| "ClassifiedAdEnabled"
			| "ClassifiedAdOnly"
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "LocalMarketBestOfferOnly"
			| "Only";
		LocalMarketAutoAcceptEnabled?: boolean;
		LocalMarketAutoDeclineEnabled?: boolean;
		LocalMarketBestOfferEnabled?:
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "Required";
		LocalMarketCompanyNameEnabled?: boolean;
		LocalMarketContactByAddressEnabled?: boolean;
		LocalMarketContactByEmailEnabled?: boolean;
		LocalMarketContactByPhoneEnabled?: boolean;
		LocalMarketCounterOfferEnabled?: boolean;
		LocalMarketNonSubscription?: boolean;
		LocalMarketPaymentMethodCheckOutEnabled?:
			| "CustomCode"
			| "EnabledWithCheckout"
			| "EnabledWithoutCheckout"
			| "NotSupported";
		LocalMarketPhoneCount?: number;
		LocalMarketPremiumSubscription?: boolean;
		LocalMarketRegularSubscription?: boolean;
		LocalMarketSellerContactDetailsEnabled?: boolean;
		LocalMarketShippingMethodEnabled?: boolean;
		LocalMarketSpecialitySubscription?: boolean;
		LocalMarketStreetCount?: number;
		MaxFlatShippingCost?:
			| number
			| { value: number; currencyID: CurrencyCodeType };
		MaxFlatShippingCostCBTExempt?: boolean;
		MaxGranularFitmentCount?: number;
		MaxItemCompatibility?: number;
		MinItemCompatibility?: number;
		MinimumReservePrice?: number;
		NonSubscription?: "CustomCode" | "LocalOnly" | "LocalOptional" | "National";
		PayPalRequired?: boolean;
		PayPalRequiredForStoreOwner?: boolean;
		PaymentMethod?:
			| "CashOnPickup"
			| "COD"
			| "CustomCode"
			| "MOCC"
			| "PersonalCheck";
		PaymentProfileCategoryGroup?: "ALL" | "Inherit" | "MOTORS_VEHICLE" | "None";
		PickupDropOffEnabled?: boolean;
		PremiumSubscription?:
			| "CustomCode"
			| "LocalOnly"
			| "LocalOptional"
			| "National";
		ProPackEnabled?: boolean;
		ProPackPlusEnabled?: boolean;
		ProductCreationEnabled?: string;
		ProductRequiredEnabled?: "CustomCode" | "Disabled" | "Enabled";
		RegularSubscription?:
			| "CustomCode"
			| "LocalOnly"
			| "LocalOptional"
			| "National";
		ReturnPolicyDescriptionEnabled?: boolean;
		ReturnPolicyEnabled?: boolean;
		ReturnPolicyProfileCategoryGroup?:
			| "ALL"
			| "Inherit"
			| "MOTORS_VEHICLE"
			| "None";
		RevisePriceAllowed?: boolean;
		ReviseQuantityAllowed?: boolean;
		SafePaymentRequired?: boolean;
		SellerContactDetailsEnabled?: boolean;
		SellerProvidedTitleSupported?: boolean;
		ShippingProfileCategoryGroup?:
			| "ALL"
			| "Inherit"
			| "MOTORS_VEHICLE"
			| "None";
		ShippingTermsRequired?: boolean;
		SkypeMeNonTransactionalEnabled?: boolean;
		SkypeMeTransactionalEnabled?: boolean;
		SpecialFeatures?: {
			Condition?: {
				DisplayName?: string;
				ID?: number;
			};
			ConditionHelpURL?: string;
		};
		SpecialitySubscription?:
			| "CustomCode"
			| "LocalOnly"
			| "LocalOptional"
			| "National";
		StoreOwnerExtendedListingDurations?: {
			Duration?: string;
		};
		StoreOwnerExtendedListingDurationsEnabled?: boolean;
		TransactionConfirmationRequestEnabled?: boolean;
		UPCEnabled?: "CustomCode" | "Disabled" | "Enabled" | "Required";
		UserConsentRequired?: boolean;
		VINSupported?: boolean;
		VRMSupported?: boolean;
		ValueCategory?: boolean;
		ValuePackEnabled?: boolean;
		VariationsEnabled?: boolean;
		eBayMotorsProAdFormatEnabled?:
			| "ClassifiedAdEnabled"
			| "ClassifiedAdOnly"
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "LocalMarketBestOfferOnly"
			| "Only";
		eBayMotorsProAutoAcceptEnabled?: boolean;
		eBayMotorsProAutoDeclineEnabled?: boolean;
		eBayMotorsProBestOfferEnabled?:
			| "CustomCode"
			| "Disabled"
			| "Enabled"
			| "Required";
		eBayMotorsProCompanyNameEnabled?: boolean;
		eBayMotorsProContactByAddressEnabled?: boolean;
		eBayMotorsProContactByEmailEnabled?: boolean;
		eBayMotorsProContactByPhoneEnabled?: boolean;
		eBayMotorsProCounterOfferEnabled?: boolean;
		eBayMotorsProPaymentMethodCheckOutEnabled?:
			| "CustomCode"
			| "EnabledWithCheckout"
			| "EnabledWithoutCheckout"
			| "NotSupported";
		eBayMotorsProPhoneCount?: number;
		eBayMotorsProSellerContactDetailsEnabled?: boolean;
		eBayMotorsProShippingMethodEnabled?: boolean;
		eBayMotorsProStreetCount?: number;
	};
	UpdateTime: string;
}
