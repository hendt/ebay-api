// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetMemberMessages.html#Output
import type {
  CurrencyCodeType,
  StandardOutputFields,
} from './common.js';

export interface GetMemberMessagesResponse extends StandardOutputFields {
  MemberMessage?: {
    MemberMessageExchange?: {
      Item?: {
        ItemID?: string;
        ListingDetails?: {
          EndTime?: string;
          StartTime?: string;
        };
        SellingStatus?: {
          CurrentPrice?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
        };
        Title?: string;
      };
      LastModifiedDate?: string;
      MessageMedia?: {
        MediaName?: string;
        MediaURL?: string;
      };
      MessageStatus?: 'Answered' | 'CustomCode' | 'Unanswered';
      Question?: {
        Body?: string;
        DisplayToPublic?: boolean;
        MessageID?: string;
        MessageMedia?: {
          MediaName?: string;
          MediaURL?: string;
        };
        MessageType?: any;
        QuestionType?: any;
        RecipientID?: string;
        SenderEmail?: string;
        SenderID?: string;
        Subject?: string;
      };
      Response?: string;
    };
  };
  PaginationResult: {
    TotalNumberOfEntries: number;
    TotalNumberOfPages: number;
  };
}
