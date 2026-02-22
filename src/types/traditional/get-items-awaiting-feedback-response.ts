// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetItemsAwaitingFeedback.html#Output
import type {
  AddressType,
  StandardOutputFields
} from './common.js';

export interface GetItemsAwaitingFeedbackResponse extends StandardOutputFields {
  ItemsAwaitingFeedback: {
    PaginationResult: {
      TotalNumberOfEntries: number;
      TotalNumberOfPages: number;
    };
    TransactionArray: {
      Transaction?: {
        Buyer?: {
          UserID?: string;
        };
        FeedbackReceived?: {
          CommentType?:
            | 'CustomCode'
            | 'IndependentlyWithdrawn'
            | 'Negative'
            | 'Neutral'
            | 'Positive'
            | 'Withdrawn';
        };
        Item?: {
          ItemID?: string;
          ListingDetails?: {
            EndTime?: string;
          };
          Seller?: {
            AboutMePage?: boolean;
            BiddingSummary?: any;
            BusinessRole?: any;
            BuyerInfo?: any;
            BayGoodStanding?: boolean;
            BayWikiReadOnly?: boolean;
            EIASToken?: string;
            Email?: string;
            EnterpriseSeller?: boolean;
            FeedbackPrivate?: boolean;
            FeedbackRatingStar?: any;
            FeedbackScore?: number;
            IDVerified?: boolean;
            Membership?: any;
            NewUser?: boolean;
            PositiveFeedbackPercent?: number;
            QualifiesForSelling?: boolean;
            RegistrationAddress?: AddressType;
            RegistrationDate?: string;
            SellerInfo?: any;
            ShippingAddress?: AddressType;
            Site?: any;
            Status?: any;
            TUVLevel?: number;
            UniqueNegativeFeedbackCount?: number;
            UniqueNeutralFeedbackCount?: number;
            UniquePositiveFeedbackCount?: number;
            UserAnonymized?: boolean;
            UserFirstName?: string;
            UserID?: any;
            UserIDChanged?: boolean;
            UserIDLastChanged?: string;
            UserLastName?: string;
            UserSubscription?: any;
            VATID?: string;
            VATStatus?: any;
          };
          Title?: string;
        };
        OrderLineItemID?: string;
        TransactionID?: string;
      };
    };
  };
}
