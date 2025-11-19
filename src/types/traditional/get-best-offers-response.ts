// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetBestOffers.html#Output
import type {
  AddressType,
  CurrencyCodeType,
  StandardOutputFields,
} from './common.js';

export interface GetBestOffersResponse extends StandardOutputFields {
  BestOfferArray: {
    BestOffer: {
      BestOfferCodeType:
        | 'BuyerBestOffer'
        | 'BuyerCounterOffer'
        | 'CustomCode'
        | 'SellerCounterOffer';
      BestOfferID: string;
      Buyer: {
        Email?: string;
        FeedbackScore: number;
        RegistrationDate: string;
        ShippingAddress?: AddressType;
        UserID?: string;
      };
      BuyerMessage?: string;
      ExpirationTime: string;
      Price?: number | { value: number; currencyID: CurrencyCodeType };
      Quantity: number;
      SellerMessage?: string;
      Status:
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
  };
  Item?: {
    BuyItNowPrice?: number | { value: number; currencyID: CurrencyCodeType };
    Currency?: CurrencyCodeType;
    ItemID?: string;
    ListingDetails: {
      EndTime?: string;
    };
  };
  ItemBestOffersArray?: {
    ItemBestOffers?: {
      BestOfferArray?: {
        BestOffer: {
          BestOfferCodeType:
            | 'BuyerBestOffer'
            | 'BuyerCounterOffer'
            | 'CustomCode'
            | 'SellerCounterOffer';
          BestOfferID: string;
          Buyer: {
            Email?: string;
            FeedbackScore: number;
            RegistrationDate: string;
            ShippingAddress?: AddressType;
            UserID?: string;
          };
          BuyerMessage?: string;
          ExpirationTime: string;
          Price?: number | { value: number; currencyID: CurrencyCodeType };
          Quantity: number;
          SellerMessage?: string;
          Status:
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
      };
      Item?: {
        BuyItNowPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        Currency?: CurrencyCodeType;
        ItemID?: string;
        ListingDetails: {
          EndTime?: string;
        };
      };
      Role?: 'Buyer' | 'CustomCode' | 'Seller';
    };
  };
  PageNumber?: number;
  PaginationResult?: {
    TotalNumberOfEntries?: number;
    TotalNumberOfPages?: number;
  };
}
