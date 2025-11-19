// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetUserPreferences.html#Output
import type {
  CountryCodeType,
  CurrencyCodeType,
  StandardOutputFields,
} from './common.js';

export interface GetUserPreferencesResponse extends StandardOutputFields {
  BidderNoticePreferences: {
    UnsuccessfulBidderNoticeIncludeMyItems?: boolean;
  };
  CombinedPaymentPreferences?: {
    CombinedPaymentOption?:
      | 'CustomCode'
      | 'DiscountSpecified'
      | 'NoCombinedPayment'
      | 'SpecifyDiscountLater';
  };
  DispatchCutoffTimePreference?: {
    CutoffTime?: string;
  };
  EmailShipmentTrackingNumberPreference?: boolean;
  EndOfAuctionEmailPreferences?: {
    EmailCustomized: boolean;
    LogoCustomized?: boolean;
    LogoType:
      | 'CustomCode'
      | 'Customized'
      | 'None'
      | 'Store'
      | 'WinningBidderNotice';
    LogoURL?: string;
    TemplateText?: string;
    TextCustomized?: boolean;
  };
  GlobalShippingProgramListingPreference?: boolean;
  OfferGlobalShippingProgramPreference?: boolean;
  OutOfStockControlPreference?: boolean;
  OverrideGSPServiceWithIntlServicePreference?: boolean;
  PickupDropoffSellerPreference?: boolean;
  PurchaseReminderEmailPreferences?: {
    PurchaseReminderEmailPreferences?: boolean;
  };
  RequiredShipPhoneNumberPreference?: boolean;
  SellerExcludeShipToLocationPreferences?: {
    ExcludeShipToLocation?: string;
  };
  SellerFavoriteItemPreferences?: {
    FavoriteItemID?: string;
    ListingType?:
      | 'AdType'
      | 'Auction'
      | 'Chinese'
      | 'CustomCode'
      | 'FixedPriceItem'
      | 'LeadGeneration'
      | 'PersonalOffer'
      | 'Unknown';
    MaxPrice?: number | { value: number; currencyID: CurrencyCodeType };
    MinPrice?: number | { value: number; currencyID: CurrencyCodeType };
    SearchKeywords?: string;
    SearchSortOrder?:
      | 'CustomCode'
      | 'EndingFirst'
      | 'HighestPriced'
      | 'HighestPricedPlusShipping'
      | 'LowestPriced'
      | 'LowestPricedPlusShipping'
      | 'NewlyListed';
    StoreCategoryID?: bigint;
  };
  SellerPaymentPreferences?: {
    AlwaysUseThisPaymentAddress?: boolean;
    DefaultPayPalEmailAddress?: string;
    DisplayPayNowButton?: string;
    FedExRateOption?:
      | 'CustomCode'
      | 'FedExCounter'
      | 'FedExDiscounted'
      | 'FedExStandardList';
    PayPalAlwaysOn?: boolean;
    PayPalPreferred?: boolean;
    SellerPaymentAddress?: {
      Country?: CountryCodeType;
    };
    UPSRateOption?: 'CustomCode' | 'UPSDailyRates' | 'UPSOnDemandRates';
    USPSRateOption?: 'CustomCode' | 'USPSDiscounted' | 'USPSRetail';
  };
  SellerProfilePreferences?: {
    SellerProfileOptedIn?: boolean;
    SupportedSellerProfiles?: {
      SupportedSellerProfile?: {
        CategoryGroup?: {
          IsDefault?: boolean;
          Name?: string;
        };
        ProfileID?: bigint;
        ProfileName?: string;
        ProfileType?: string;
        ShortSummary?: string;
      };
    };
  };
  SellerReturnPreferences?: {
    OptedIn?: boolean;
  };
  UnpaidItemAssistancePreferences?: {
    AutoRelist?: boolean;
    DelayBeforeOpeningDispute?: number;
    ExcludedUser?: string;
    OptInStatus?: boolean;
    RemoveAllExcludedUsers?: boolean;
  };
  eBayPLUSPreference?: {
    Country?: CountryCodeType;
    ListingPreference?: boolean;
    OptInStatus?: boolean;
  };
}
