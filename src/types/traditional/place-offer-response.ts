// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/PlaceOffer.html#Output
import type {
  CurrencyCodeType,
  StandardOutputFields,
} from './common.js';

export interface PlaceOfferResponse extends StandardOutputFields {
  BestOffer: {
    BestOfferID?: string;
    Status?:
      | 'Accepted'
      | 'Active'
      | 'AdminEnded'
      | 'All'
      | 'Countered'
      | 'CustomCode'
      | 'Declined'
      | 'Expired'
      | 'Pending'
      | 'PendingBuyerConfirmation'
      | 'PendingBuyerPayment'
      | 'Retracted'
      | 'SellerAccept';
  };
  OrderLineItemID?: string;
  SellingStatus: {
    ConvertedCurrentPrice?:
      | number
      | { value: number; currencyID: CurrencyCodeType };
    CurrentPrice: number | { value: number; currencyID: CurrencyCodeType };
    HighBidder?: {
      UserID?: string;
    };
    MinimumToBid?: number | { value: number; currencyID: CurrencyCodeType };
    ReserveMet?: boolean;
    SuggestedBidValues?: {
      BidValue?: number | { value: number; currencyID: CurrencyCodeType };
    };
  };
  TransactionID?: string;
}
