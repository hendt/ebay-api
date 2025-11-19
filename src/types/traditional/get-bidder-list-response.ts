// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetBidderList.html#Output
import type {
  CountryCodeType,
  CurrencyCodeType,
  StandardOutputFields,
} from './common.js';

export interface GetBidderListResponse extends StandardOutputFields {
  BidItemArray: {
    Item: {
      ApplicationData?: string;
      AutoPay: boolean;
      BestOfferDetails?: {
        BestOfferCount?: number;
        BestOfferEnabled?: boolean;
      };
      BuyItNowPrice: number | { value: number; currencyID: CurrencyCodeType };
      BuyerGuaranteePrice?:
        | number
        | { value: number; currencyID: CurrencyCodeType };
      BuyerProtection?:
        | 'CustomCode'
        | 'ItemEligible'
        | 'ItemIneligible'
        | 'ItemMarkedEligible'
        | 'ItemMarkedIneligible'
        | 'NoCoverage';
      BuyerRequirementDetails?: {
        MaximumItemRequirements?: {
          MaximumItemCount?: number;
          MinimumFeedbackScore?: number;
        };
        MaximumUnpaidItemStrikesInfo?: {
          Count?: number;
          Period?: 'CustomCode' | 'Days_180' | 'Days_30' | 'Days_360';
        };
        ShipToRegistrationCountry?: boolean;
        ZeroFeedbackScore?: boolean;
      };
      BuyerResponsibleForShipping?: boolean;
      Charity?: {
        CharityID?: string;
        CharityName?: string;
        DonationPercent?: number;
        LogoURL?: string;
        Mission?: string;
        Status?: 'CustomCode' | 'NoLongerValid' | 'Valid';
      };
      Country: CountryCodeType;
      Currency: CurrencyCodeType;
      DisableBuyerRequirements?: boolean;
      DispatchTimeMax?: number;
      FreeAddedCategory?: {
        CategoryID?: string;
        CategoryName?: string;
      };
      ItemID: string;
      ListingDetails: {
        Adult: boolean;
        BindingAuction: boolean;
        BuyItNowAvailable?: boolean;
        CheckoutEnabled: boolean;
        ConvertedBuyItNowPrice:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        ConvertedReservePrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        ConvertedStartPrice:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        EndTime: string;
        HasPublicMessages: boolean;
        HasReservePrice: boolean;
        HasUnansweredQuestions: boolean;
        RelistedItemID?: string;
        SecondChanceOriginalItemID?: string;
        StartTime: string;
        ViewItemURL: string;
        ViewItemURLForNaturalSearch?: string;
      };
      ListingDuration?: string;
      ListingEnhancement?: 'BoldTitle' | 'CustomCode';
      ListingType:
        | 'AdType'
        | 'Auction'
        | 'Chinese'
        | 'CustomCode'
        | 'FixedPriceItem'
        | 'LeadGeneration'
        | 'PersonalOffer'
        | 'Unknown';
      Location: string;
      LocationDefaulted?: boolean;
      LotSize?: number;
      PayPalEmailAddress?: string;
      PaymentDetails?: {
        DaysToFullPayment?: number;
        DepositAmount?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        DepositType?: 'CustomCode' | 'None' | 'OtherMethod';
        HoursToDeposit?: number;
      };
      PaymentMethods?:
        | 'CashOnPickup'
        | 'COD'
        | 'CustomCode'
        | 'MOCC'
        | 'PersonalCheck';
      PictureDetails?: {
        PictureURL?: string;
      };
      PostalCode?: string;
      PrimaryCategory: {
        CategoryID: string;
        CategoryName: string;
      };
      PrivateListing: boolean;
      ProductListingDetails?: {
        Copyright?: string;
        IncludeStockPhotoURL?: boolean;
        IncludeeBayProductDetails?: boolean;
        StockPhotoURL?: string;
        UseStockPhotoURLAsGallery?: boolean;
      };
      Quantity: number;
      ReservePrice?: number | { value: number; currencyID: CurrencyCodeType };
      ReturnPolicy?: {
        Description?: string;
        InternationalRefundOption?: string;
        InternationalReturnsAcceptedOption?: string;
        InternationalReturnsWithinOption?: string;
        InternationalShippingCostPaidByOption?: string;
        Refund?: string;
        RefundOption?: string;
        ReturnsAccepted?: string;
        ReturnsAcceptedOption?: string;
        ReturnsWithin?: string;
        ReturnsWithinOption?: string;
        ShippingCostPaidBy?: string;
        ShippingCostPaidByOption?: string;
      };
      ReviseStatus: {
        BuyItNowAdded?: boolean;
        BuyItNowLowered?: boolean;
        ItemRevised: boolean;
        ReserveLowered?: boolean;
        ReserveRemoved?: boolean;
      };
      SKU?: string;
      SecondaryCategory?: {
        CategoryID?: string;
        CategoryName?: string;
      };
      Seller: {
        AboutMePage: boolean;
        Email?: string;
        FeedbackPrivate: boolean;
        FeedbackRatingStar:
          | 'Blue'
          | 'CustomCode'
          | 'Green'
          | 'GreenShooting'
          | 'None'
          | 'Purple'
          | 'PurpleShooting'
          | 'Red'
          | 'RedShooting'
          | 'SilverShooting'
          | 'Turquoise'
          | 'TurquoiseShooting'
          | 'Yellow'
          | 'YellowShooting';
        FeedbackScore: number;
        IDVerified: boolean;
        NewUser: boolean;
        RegistrationDate: string;
        SellerInfo: {
          AllowPaymentEdit: boolean;
          CIPBankAccountStored: boolean;
          CheckoutEnabled: boolean;
          GoodStanding: boolean;
          QualifiesForB2BVAT: boolean;
          SafePaymentExempt: boolean;
          SellerLevel:
            | 'Bronze'
            | 'CustomCode'
            | 'Gold'
            | 'None'
            | 'Platinum'
            | 'Silver'
            | 'Titanium';
          StoreOwner: boolean;
          TopRatedSeller?: boolean;
        };
        Site:
          | 'Australia'
          | 'Austria'
          | 'Belgium_Dutch'
          | 'Belgium_French'
          | 'Canada'
          | 'CanadaFrench'
          | 'CustomCode'
          | 'Cyprus'
          | 'Czechia'
          | 'eBayMotors'
          | 'France'
          | 'Germany'
          | 'HongKong'
          | 'India'
          | 'Ireland'
          | 'Italy'
          | 'Malaysia'
          | 'Netherlands'
          | 'Philippines'
          | 'Poland'
          | 'Russia'
          | 'Singapore'
          | 'Spain'
          | 'Switzerland'
          | 'UK'
          | 'US';
        Status:
          | 'AccountOnHold'
          | 'Confirmed'
          | 'CreditCardVerify'
          | 'CustomCode'
          | 'Deleted'
          | 'Ghost'
          | 'Guest'
          | 'InMaintenance'
          | 'Merged'
          | 'RegistrationCodeMailOut'
          | 'Suspended'
          | 'TermPending'
          | 'Unconfirmed'
          | 'Unknown';
        UserID?: string;
        UserIDChanged: boolean;
        UserIDLastChanged: string;
        VATStatus: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
        eBayGoodStanding: boolean;
      };
      SellerVacationNote?: string;
      SellingStatus: {
        BidCount: number;
        BidIncrement: number | { value: number; currencyID: CurrencyCodeType };
        ConvertedCurrentPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        CurrentPrice: number | { value: number; currencyID: CurrencyCodeType };
        FinalValueFee?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        HighBidder?: {
          AboutMePage: boolean;
          Email?: string;
          FeedbackPrivate: boolean;
          FeedbackRatingStar:
            | 'Blue'
            | 'CustomCode'
            | 'Green'
            | 'GreenShooting'
            | 'None'
            | 'Purple'
            | 'PurpleShooting'
            | 'Red'
            | 'RedShooting'
            | 'SilverShooting'
            | 'Turquoise'
            | 'TurquoiseShooting'
            | 'Yellow'
            | 'YellowShooting';
          FeedbackScore: number;
          IDVerified: boolean;
          NewUser: boolean;
          RegistrationDate: string;
          Site:
            | 'Australia'
            | 'Austria'
            | 'Belgium_Dutch'
            | 'Belgium_French'
            | 'Canada'
            | 'CanadaFrench'
            | 'CustomCode'
            | 'Cyprus'
            | 'Czechia'
            | 'eBayMotors'
            | 'France'
            | 'Germany'
            | 'HongKong'
            | 'India'
            | 'Ireland'
            | 'Italy'
            | 'Malaysia'
            | 'Netherlands'
            | 'Philippines'
            | 'Poland'
            | 'Russia'
            | 'Singapore'
            | 'Spain'
            | 'Switzerland'
            | 'UK'
            | 'US';
          Status:
            | 'AccountOnHold'
            | 'Confirmed'
            | 'CreditCardVerify'
            | 'CustomCode'
            | 'Deleted'
            | 'Ghost'
            | 'Guest'
            | 'InMaintenance'
            | 'Merged'
            | 'RegistrationCodeMailOut'
            | 'Suspended'
            | 'TermPending'
            | 'Unconfirmed'
            | 'Unknown';
          UserID?: string;
          UserIDChanged: boolean;
          UserIDLastChanged: string;
          VATStatus: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
          eBayGoodStanding: boolean;
        };
        LeadCount?: number;
        ListingStatus:
          | 'Active'
          | 'Completed'
          | 'Custom'
          | 'CustomCode'
          | 'Ended';
        MinimumToBid: number | { value: number; currencyID: CurrencyCodeType };
        PromotionalSaleDetails?: {
          EndTime?: string;
          OriginalPrice?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          StartTime?: string;
        };
        QuantitySold: number;
        ReserveMet: boolean;
        SecondChanceEligible: boolean;
      };
      ShipToLocations: string;
      ShippingDetails?: {
        GetItFast?: boolean;
        InternationalShippingServiceOption?: {
          ShipToLocation?: string;
          ShippingService?: string;
          ShippingServiceAdditionalCost?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ShippingServiceCost?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ShippingServicePriority?: number;
        };
        SalesTax?: {
          SalesTaxPercent?: number;
          SalesTaxState?: string;
          ShippingIncludedInTax?: boolean;
        };
        SellerExcludeShipToLocationsPreference?: boolean;
        ShippingType?:
          | 'Calculated'
          | 'CalculatedDomesticFlatInternational'
          | 'CustomCode'
          | 'Flat'
          | 'FlatDomesticCalculatedInternational'
          | 'Free'
          | 'Freight'
          | 'FreightFlat'
          | 'NotSpecified';
        TaxTable?: {
          TaxJurisdiction?: {
            JurisdictionID?: string;
            SalesTaxPercent?: number;
            ShippingIncludedInTax?: boolean;
          };
        };
        ThirdPartyCheckout?: boolean;
      };
      Site:
        | 'Australia'
        | 'Austria'
        | 'Belgium_Dutch'
        | 'Belgium_French'
        | 'Canada'
        | 'CanadaFrench'
        | 'CustomCode'
        | 'Cyprus'
        | 'Czechia'
        | 'eBayMotors'
        | 'France'
        | 'Germany'
        | 'HongKong'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Malaysia'
        | 'Netherlands'
        | 'Philippines'
        | 'Poland'
        | 'Russia'
        | 'Singapore'
        | 'Spain'
        | 'Switzerland'
        | 'UK'
        | 'US';
      StartPrice: number | { value: number; currencyID: CurrencyCodeType };
      Storefront?: {
        StoreCategory2ID?: bigint;
        StoreCategoryID?: bigint;
        StoreURL?: string;
      };
      SubTitle?: string;
      TimeLeft: string;
      Title: string;
      UUID?: string;
      VATDetails?: {
        VATPercent?: number;
      };
    };
  };
  Bidder: {
    AboutMePage: boolean;
    Email?: string;
    FeedbackPrivate: boolean;
    FeedbackRatingStar:
      | 'Blue'
      | 'CustomCode'
      | 'Green'
      | 'GreenShooting'
      | 'None'
      | 'Purple'
      | 'PurpleShooting'
      | 'Red'
      | 'RedShooting'
      | 'SilverShooting'
      | 'Turquoise'
      | 'TurquoiseShooting'
      | 'Yellow'
      | 'YellowShooting';
    FeedbackScore: number;
    IDVerified: boolean;
    NewUser: boolean;
    RegistrationDate: string;
    Site:
      | 'Australia'
      | 'Austria'
      | 'Belgium_Dutch'
      | 'Belgium_French'
      | 'Canada'
      | 'CanadaFrench'
      | 'CustomCode'
      | 'Cyprus'
      | 'Czechia'
      | 'eBayMotors'
      | 'France'
      | 'Germany'
      | 'HongKong'
      | 'India'
      | 'Ireland'
      | 'Italy'
      | 'Malaysia'
      | 'Netherlands'
      | 'Philippines'
      | 'Poland'
      | 'Russia'
      | 'Singapore'
      | 'Spain'
      | 'Switzerland'
      | 'UK'
      | 'US';
    Status:
      | 'AccountOnHold'
      | 'Confirmed'
      | 'CreditCardVerify'
      | 'CustomCode'
      | 'Deleted'
      | 'Ghost'
      | 'Guest'
      | 'InMaintenance'
      | 'Merged'
      | 'RegistrationCodeMailOut'
      | 'Suspended'
      | 'TermPending'
      | 'Unconfirmed'
      | 'Unknown';
    UserID?: string;
    UserIDChanged: boolean;
    UserIDLastChanged: string;
    VATStatus: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
    eBayGoodStanding: boolean;
  };
}
