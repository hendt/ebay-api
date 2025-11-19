// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetFeedback.html#Output
import type { CurrencyCodeType, StandardOutputFields } from "./common.js";

export interface GetFeedbackResponse extends StandardOutputFields {
	FeedbackDetailArray?: {
		FeedbackDetail?: {
			CommentReplaced?: boolean;
			CommentText?: string;
			CommentTime?: string;
			CommentType?:
				| "CustomCode"
				| "IndependentlyWithdrawn"
				| "Negative"
				| "Neutral"
				| "Positive"
				| "Withdrawn";
			CommentingUser?: string;
			CommentingUserScore?: number;
			Countable?: boolean;
			FeedbackID?: string;
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
			FeedbackResponse?: string;
			FeedbackRevised?: boolean;
			FollowUpReplaced?: boolean;
			Followup?: string;
			ItemID?: string;
			ItemPrice?: number | { value: number; currencyID: CurrencyCodeType };
			ItemTitle?: string;
			OrderLineItemID?: string;
			ResponseReplaced?: boolean;
			Role?: "Buyer" | "CustomCode" | "Seller";
			TransactionID?: string;
		};
	};
	FeedbackDetailItemTotal?: number;
	FeedbackScore: number;
	FeedbackSummary?: {
		BidRetractionFeedbackPeriodArray?: {
			FeedbackPeriod?: {
				Count?: number;
				PeriodInDays?: number;
			};
		};
		BuyerRoleMetrics?: {
			FeedbackLeftPercent?: number;
			NegativeFeedbackLeftCount?: number;
			NeutralFeedbackLeftCount?: number;
			PositiveFeedbackLeftCount?: number;
		};
		NegativeFeedbackPeriodArray?: {
			FeedbackPeriod?: {
				Count?: number;
				PeriodInDays?: number;
			};
		};
		NeutralCommentCountFromSuspendedUsers?: number;
		NeutralFeedbackPeriodArray?: {
			FeedbackPeriod?: {
				Count?: number;
				PeriodInDays?: number;
			};
		};
		PositiveFeedbackPeriodArray?: {
			FeedbackPeriod?: {
				Count?: number;
				PeriodInDays?: number;
			};
		};
		SellerRatingSummaryArray?: {
			AverageRatingSummary?: {
				AverageRatingDetails?: {
					Rating?: number;
					RatingCount?: number;
					RatingDetail?:
						| "Communication"
						| "CustomCode"
						| "ItemAsDescribed"
						| "ShippingAndHandlingCharges"
						| "ShippingTime";
				};
				FeedbackSummaryPeriod?: "CustomCode" | "FiftyTwoWeeks" | "ThirtyDays";
			};
		};
		SellerRoleMetrics?: {
			CrossBorderTransactionCount?: number;
			CrossBorderTransactionPercent?: number;
			FeedbackLeftPercent?: number;
			NegativeFeedbackLeftCount?: number;
			NeutralFeedbackLeftCount?: number;
			PositiveFeedbackLeftCount?: number;
			RepeatBuyerCount?: number;
			RepeatBuyerPercent?: number;
			TransactionPercent?: number;
			UniqueBuyerCount?: number;
		};
		TotalFeedbackPeriodArray?: {
			FeedbackPeriod?: {
				Count?: number;
				PeriodInDays?: number;
			};
		};
		UniqueNegativeFeedbackCount?: number;
		UniqueNeutralFeedbackCount?: number;
		UniquePositiveFeedbackCount?: number;
	};
	PageNumber: number;
	PaginationResult: {
		TotalNumberOfEntries: number;
		TotalNumberOfPages: number;
	};
}
