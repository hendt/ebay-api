// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetAllBidders.html#Output
import type {
	CountryCodeType,
	CurrencyCodeType,
	StandardOutputFields,
} from "./common.js";

export interface GetAllBiddersResponse extends StandardOutputFields {
	BidArray: {
		Offer?: {
			Action:
				| "Absentee"
				| "Accept"
				| "AutoCancel"
				| "AutoRetraction"
				| "Bid"
				| "BuyItNow"
				| "Cancelled"
				| "Counter"
				| "CustomCode"
				| "Decline"
				| "Offer"
				| "Purchase"
				| "Retraction"
				| "Unknown";
			ConvertedPrice: number | { value: number; currencyID: CurrencyCodeType };
			Currency: CurrencyCodeType;
			HighestBid: number | { value: number; currencyID: CurrencyCodeType };
			MaxBid: number | { value: number; currencyID: CurrencyCodeType };
			MyMaxBid?: number | { value: number; currencyID: CurrencyCodeType };
			Quantity: number;
			SecondChanceEnabled: boolean;
			SiteCurrency: CurrencyCodeType;
			TimeBid: string;
			User: {
				AboutMePage: boolean;
				BiddingSummary?: {
					BidActivityWithSeller?: number;
					BidRetractions?: number;
					BidsToUniqueCategories?: number;
					BidsToUniqueSellers?: number;
					ItemBidDetails?: {
						BidCount?: number;
						CategoryID?: string;
						ItemID?: string;
						LastBidTime?: string;
						SellerID?: string;
					};
					SummaryDays?: number;
					TotalBids?: number;
				};
				BuyerInfo: {
					ShippingAddress: {
						Country: CountryCodeType;
						PostalCode: string;
					};
				};
				Email?: string;
				FeedbackPrivate: boolean;
				FeedbackRatingStar:
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
				IDVerified: boolean;
				NewUser: boolean;
				PositiveFeedbackPercent?: number;
				RegistrationDate: string;
				Site:
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
				Status:
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
				UserAnonymized: boolean;
				UserID?: string;
				UserIDChanged: boolean;
				UserIDLastChanged: string;
				VATStatus: "CustomCode" | "NoVATTax" | "VATExempt" | "VATTax";
				eBayGoodStanding: boolean;
			};
		};
	};
	HighBidder: string;
	HighestBid: number | { value: number; currencyID: CurrencyCodeType };
	ListingStatus: "Active" | "Completed" | "Custom" | "CustomCode" | "Ended";
}
