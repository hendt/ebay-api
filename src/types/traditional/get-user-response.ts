// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetUser.html#Output
import type {
	CountryCodeType,
	StandardOutputFields,
} from "./common.js";

export interface GetUserResponse extends StandardOutputFields {
	User: {
		AboutMePage?: boolean;
		BusinessRole: "FullMarketPlaceParticipant" | "Shopper";
		EIASToken?: string;
		Email?: string;
		EnterpriseSeller: boolean;
		FeedbackPrivate?: boolean;
		FeedbackRatingStar?:
			| "Blue"
			| "CustomCode"
			| "Green"
			| "GreenShooting"
			| "None"
			| "Purple"
			| "PurpleShooting"
			| "Red"
			| "RedShooting"
			| "SilverShooting"
			| "Turquoise"
			| "TurquoiseShooting"
			| "Yellow"
			| "YellowShooting";
		FeedbackScore?: number;
		IDVerified?: boolean;
		Membership?: {
			Program?: {
				ExpiryDate?: string;
				ProgramName?: string;
				Site?:
					| "Australia"
					| "Austria"
					| "Belgium_Dutch"
					| "Belgium_French"
					| "Canada"
					| "CanadaFrench"
					| "CustomCode"
					| "Cyprus"
					| "Czechia"
					| "eBayMotors"
					| "France"
					| "Germany"
					| "HongKong"
					| "India"
					| "Ireland"
					| "Italy"
					| "Malaysia"
					| "Netherlands"
					| "Philippines"
					| "Poland"
					| "Russia"
					| "Singapore"
					| "Spain"
					| "Switzerland"
					| "UK"
					| "US";
			};
		};
		NewUser?: boolean;
		PositiveFeedbackPercent?: number;
		QualifiesForSelling?: boolean;
		RegistrationAddress?: {
			CityName?: string;
			CompanyName?: string;
			Country?: CountryCodeType;
			CountryName?: string;
			Name?: string;
			Phone?: string;
			PostalCode?: string;
			StateOrProvince?: string;
			Street?: string;
			Street1?: string;
			Street2?: string;
		};
		RegistrationDate?: string;
		SellerInfo?: {
			AllowPaymentEdit?: boolean;
			CIPBankAccountStored?: boolean;
			CharityAffiliationDetails?: {
				CharityAffiliationDetail?: {
					AffiliationType?: "Community" | "CustomCode" | "Direct" | "Remove";
					CharityID?: string;
					LastUsedTime?: string;
				};
			};
			CharityRegistered: boolean;
			CheckoutEnabled?: boolean;
			DomesticRateTable?: boolean;
			FeatureEligibility?: {
				QualifiedForAuctionOneDayDuration?: boolean;
				QualifiedForFixedPriceOneDayDuration?: boolean;
				QualifiesForBuyItNow?: boolean;
				QualifiesForBuyItNowMultiple?: boolean;
				QualifiesForVariations: boolean;
			};
			GoodStanding?: boolean;
			InternationalRateTable?: boolean;
			PaymentMethod?:
				| "CreditCard"
				| "CustomCode"
				| "DirectDebit"
				| "DirectDebitPendingSignatureMandate"
				| "DirectDebitPendingVerification"
				| "eBayDirectPay"
				| "NothingOnFile"
				| "PayPal";
			QualifiesForB2BVAT?: boolean;
			RecoupmentPolicyConsent: {
				Site?:
					| "Australia"
					| "Austria"
					| "Belgium_Dutch"
					| "Belgium_French"
					| "Canada"
					| "CanadaFrench"
					| "CustomCode"
					| "Cyprus"
					| "Czechia"
					| "eBayMotors"
					| "France"
					| "Germany"
					| "HongKong"
					| "India"
					| "Ireland"
					| "Italy"
					| "Malaysia"
					| "Netherlands"
					| "Philippines"
					| "Poland"
					| "Russia"
					| "Singapore"
					| "Spain"
					| "Switzerland"
					| "UK"
					| "US";
			};
			RegisteredBusinessSeller?: boolean;
			SafePaymentExempt: boolean;
			SchedulingInfo?: {
				MaxScheduledItems?: number;
				MaxScheduledMinutes?: number;
				MinScheduledMinutes?: number;
			};
			SellerBusinessType?:
				| "Commercial"
				| "CustomCode"
				| "Private"
				| "Undefined";
			SellerLevel?:
				| "Bronze"
				| "CustomCode"
				| "Gold"
				| "None"
				| "Platinum"
				| "Silver"
				| "Titanium";
			SellerPaymentAddress?: {
				CityName?: string;
				Country?: CountryCodeType;
				CountryName?: string;
				InternationalName?: string;
				InternationalStateAndCity?: string;
				InternationalStreet?: string;
				Name?: string;
				Phone?: string;
				PostalCode?: string;
				StateOrProvince?: string;
				Street1?: string;
				Street2?: string;
			};
			StoreOwner?: boolean;
			StoreSite?:
				| "Australia"
				| "Austria"
				| "Belgium_Dutch"
				| "Belgium_French"
				| "Canada"
				| "CanadaFrench"
				| "CustomCode"
				| "Cyprus"
				| "Czechia"
				| "eBayMotors"
				| "France"
				| "Germany"
				| "HongKong"
				| "India"
				| "Ireland"
				| "Italy"
				| "Malaysia"
				| "Netherlands"
				| "Philippines"
				| "Poland"
				| "Russia"
				| "Singapore"
				| "Spain"
				| "Switzerland"
				| "UK"
				| "US";
			StoreURL?: string;
			TopRatedSeller?: boolean;
			TopRatedSellerDetails?: {
				TopRatedProgram?: "CustomCode" | "DE" | "Global" | "UK" | "US";
			};
			TransactionPercent?: number;
		};
		Site?:
			| "Australia"
			| "Austria"
			| "Belgium_Dutch"
			| "Belgium_French"
			| "Canada"
			| "CanadaFrench"
			| "CustomCode"
			| "Cyprus"
			| "Czechia"
			| "eBayMotors"
			| "France"
			| "Germany"
			| "HongKong"
			| "India"
			| "Ireland"
			| "Italy"
			| "Malaysia"
			| "Netherlands"
			| "Philippines"
			| "Poland"
			| "Russia"
			| "Singapore"
			| "Spain"
			| "Switzerland"
			| "UK"
			| "US";
		Status?:
			| "AccountOnHold"
			| "Confirmed"
			| "CreditCardVerify"
			| "CustomCode"
			| "Deleted"
			| "Ghost"
			| "Guest"
			| "InMaintenance"
			| "Merged"
			| "RegistrationCodeMailOut"
			| "Suspended"
			| "TermPending"
			| "Unconfirmed"
			| "Unknown";
		TUVLevel?: number;
		UniqueNegativeFeedbackCount?: number;
		UniqueNeutralFeedbackCount?: number;
		UniquePositiveFeedbackCount?: number;
		UserID?: string;
		UserIDChanged?: boolean;
		UserIDLastChanged?: string;
		UserSubscription?:
			| "CustomCode"
			| "EBayStoreAnchor"
			| "EBayStoreBasic"
			| "EBayStoreFeatured"
			| "FileExchange"
			| "LocalMarketPremium"
			| "LocalMarketRegular"
			| "LocalMarketSpecialty"
			| "SellerReportsPlus";
		VATID?: string;
		VATStatus?: "CustomCode" | "NoVATTax" | "VATExempt" | "VATTax";
		eBayGoodStanding?: boolean;
		eBayWikiReadOnly: boolean;
	};
}
