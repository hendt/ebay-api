// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetSellerList.html#Output
import type {
  AddressType,
  CountryCodeType,
  CurrencyCodeType,
  DaysCodeType,
  StandardOutputFields
} from './common.js';

export interface GetSellerListResponse extends StandardOutputFields {
  ItemArray: {
    Item?: {
      ApplicationData?: string;
      AutoPay?: boolean;
      BuyItNowPrice?: number | { value: number; currencyID: CurrencyCodeType };
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
      Charity?: {
        CharityID?: string;
        CharityListing?: boolean;
        CharityName?: string;
        DonationPercent?: number;
        LogoURL?: string;
        Mission?: string;
        Status?: 'CustomCode' | 'NoLongerValid' | 'Valid';
      };
      ConditionDescription?: string;
      Country?: CountryCodeType;
      CrossBorderTrade?: string;
      Currency?: CurrencyCodeType;
      Description?: string;
      DisableBuyerRequirements?: boolean;
      DiscountPriceInfo?: {
        MadeForOutletComparisonPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        MinimumAdvertisedPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        MinimumAdvertisedPriceExposure?:
          | 'CustomCode'
          | 'DuringCheckout'
          | 'None'
          | 'PreCheckout';
        OriginalRetailPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        PricingTreatment?: 'CustomCode' | 'MAP' | 'MFO' | 'None' | 'STP';
        SoldOffeBay?: boolean;
        SoldOneBay?: boolean;
      };
      ExtendedSellerContactDetails?: {
        ContactHoursDetails?: {
          Hours1AnyTime?: boolean;
          Hours1Days?: DaysCodeType;
          Hours1From?: string;
          Hours1To?: string;
          Hours2AnyTime?: boolean;
          Hours2Days?: DaysCodeType;
          Hours2From?: string;
          Hours2To?: string;
          TimeZoneID?: string;
        };
      };
      FreeAddedCategory?: {
        CategoryID?: string;
        CategoryName?: string;
      };
      HideFromSearch?: boolean;
      HitCount?: bigint;
      IntegratedMerchantCreditCardEnabled?: boolean;
      InventoryTrackingMethod?: 'CustomCode' | 'ItemID' | 'SKU';
      IsSecureDescription?: boolean;
      ItemID?: string;
      ItemPolicyViolation?: {
        PolicyID?: bigint;
        PolicyText?: string;
      };
      ListingDetails?: {
        Adult?: boolean;
        BestOfferAutoAcceptPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        BindingAuction?: boolean;
        CheckoutEnabled?: boolean;
        ConvertedBuyItNowPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        ConvertedReservePrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        ConvertedStartPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        EndTime?: string;
        HasPublicMessages?: boolean;
        HasReservePrice?: boolean;
        HasUnansweredQuestions?: boolean;
        MinimumBestOfferPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        RelistedItemID?: string;
        StartTime?: string;
        ViewItemURL?: string;
        ViewItemURLForNaturalSearch?: string;
      };
      ListingDuration?: string;
      ListingEnhancement?: 'BoldTitle' | 'CustomCode';
      ListingSubtype2?:
        | 'ClassifiedAd'
        | 'CustomCode'
        | 'LocalMarketBestOfferOnly';
      ListingType?:
        | 'AdType'
        | 'Auction'
        | 'Chinese'
        | 'CustomCode'
        | 'FixedPriceItem'
        | 'LeadGeneration'
        | 'PersonalOffer'
        | 'Unknown';
      Location?: string;
      PaymentMethods?:
        | 'CashOnPickup'
        | 'COD'
        | 'CustomCode'
        | 'MOCC'
        | 'PersonalCheck';
      PickupInStoreDetails?: {
        EligibleForPickupDropOff?: boolean;
        EligibleForPickupInStore?: boolean;
      };
      PictureDetails?: {
        GalleryType?: 'CustomCode' | 'Gallery' | 'None' | 'Plus';
      };
      PrimaryCategory?: {
        CategoryID?: string;
        CategoryName?: string;
      };
      PrivateListing?: boolean;
      ProxyItem?: boolean;
      Quantity?: number;
      QuantityAvailableHint?: 'CustomCode' | 'Limited' | 'MoreThan';
      QuantityThreshold?: number;
      ReasonHideFromSearch?: 'DuplicateListing' | 'OutOfStock';
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
      ReviseStatus?: {
        ItemRevised?: boolean;
      };
      SKU?: string;
      SecondaryCategory?: {
        CategoryID?: string;
        CategoryName?: string;
      };
      SellerContactDetails?: AddressType;
      SellerProfiles?: {
        SellerPaymentProfile?: {
          PaymentProfileID?: bigint;
          PaymentProfileName?: string;
        };
        SellerReturnProfile?: {
          ReturnProfileID?: bigint;
          ReturnProfileName?: string;
        };
        SellerShippingProfile?: {
          ShippingProfileID?: bigint;
          ShippingProfileName?: string;
        };
      };
      SellingStatus?: {
        AdminEnded?: boolean;
        BidCount?: number;
        BidIncrement?: number | { value: number; currencyID: CurrencyCodeType };
        ConvertedCurrentPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        CurrentPrice?: number | { value: number; currencyID: CurrencyCodeType };
        HighBidder?: {
          AboutMePage?: boolean;
          BuyerInfo?: {
            ShippingAddress?: {
              Country?: CountryCodeType;
              PostalCode?: string;
            };
          };
          EIASToken?: string;
          Email?: string;
          FeedbackPrivate?: boolean;
          FeedbackRatingStar?:
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
          FeedbackScore?: number;
          IDVerified?: boolean;
          NewUser?: boolean;
          RegistrationDate?: string;
          Site?:
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
          Status?:
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
          UserAnonymized: boolean;
          UserID?: string;
          UserIDChanged?: boolean;
          UserIDLastChanged?: string;
          VATStatus?: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
          eBayGoodStanding?: boolean;
        };
        LeadCount?: number;
        ListingStatus?:
          | 'Active'
          | 'Completed'
          | 'Custom'
          | 'CustomCode'
          | 'Ended';
        MinimumToBid?: number | { value: number; currencyID: CurrencyCodeType };
        PromotionalSaleDetails?: {
          EndTime?: string;
          OriginalPrice?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          StartTime?: string;
        };
        QuantitySold?: number;
        ReserveMet?: boolean;
        SecondChanceEligible?: boolean;
      };
      ShipToLocations?: string;
      ShippingDetails?: {
        CalculatedShippingRate?: {
          InternationalPackagingHandlingCosts?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          PackagingHandlingCosts?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
        };
        ExcludeShipToLocation?: string;
        GlobalShipping?: boolean;
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
        PaymentEdited?: boolean;
        RateTableDetails?: {
          DomesticRateTable?: string;
          DomesticRateTableId?: string;
          InternationalRateTable?: string;
          InternationalRateTableId?: string;
        };
        SalesTax?: {
          SalesTaxPercent?: number;
          SalesTaxState?: string;
          ShippingIncludedInTax?: boolean;
        };
        SellerExcludeShipToLocationsPreference?: boolean;
        ShippingServiceOptions?: {
          ExpeditedService?: boolean;
          ShippingService?: string;
          ShippingServiceAdditionalCost?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ShippingServiceCost?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ShippingServicePriority?: number;
          ShippingTimeMax?: number;
          ShippingTimeMin?: number;
        };
        TaxTable?: {
          TaxJurisdiction?: {
            JurisdictionID?: string;
            SalesTaxPercent?: number;
            ShippingIncludedInTax?: boolean;
          };
        };
        ThirdPartyCheckout?: boolean;
      };
      ShippingServiceCostOverrideList?: {
        ShippingServiceCostOverride?: {
          ShippingServiceAdditionalCost?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ShippingServiceCost?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ShippingServicePriority?: number;
          ShippingServiceType?: 'Domestic' | 'International';
        };
      };
      Site?:
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
      StartPrice?: number | { value: number; currencyID: CurrencyCodeType };
      Storefront?: {
        StoreCategory2ID?: bigint;
        StoreCategoryID?: bigint;
        StoreURL?: string;
      };
      TimeLeft?: string;
      Title?: string;
      TotalQuestionCount?: bigint;
      Variations?: {
        Variation?: {
          Quantity?: number;
          SKU?: string;
          SellingStatus?: {
            AdminEnded?: boolean;
            BidCount?: number;
            BidIncrement?:
              | number
              | { value: number; currencyID: CurrencyCodeType };
            ConvertedCurrentPrice?:
              | number
              | { value: number; currencyID: CurrencyCodeType };
            CurrentPrice?:
              | number
              | { value: number; currencyID: CurrencyCodeType };
            HighBidder?: {
              AboutMePage?: boolean;
              BuyerInfo?: {
                ShippingAddress?: {
                  Country?: CountryCodeType;
                  PostalCode?: string;
                };
              };
              EIASToken?: string;
              Email?: string;
              FeedbackPrivate?: boolean;
              FeedbackRatingStar?:
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
              FeedbackScore?: number;
              IDVerified?: boolean;
              NewUser?: boolean;
              RegistrationDate?: string;
              Site?:
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
              Status?:
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
              UserAnonymized: boolean;
              UserID?: string;
              UserIDChanged?: boolean;
              UserIDLastChanged?: string;
              VATStatus?: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
              eBayGoodStanding?: boolean;
            };
            LeadCount?: number;
            ListingStatus?:
              | 'Active'
              | 'Completed'
              | 'Custom'
              | 'CustomCode'
              | 'Ended';
            MinimumToBid?:
              | number
              | { value: number; currencyID: CurrencyCodeType };
            PromotionalSaleDetails?: {
              EndTime?: string;
              OriginalPrice?:
                | number
                | { value: number; currencyID: CurrencyCodeType };
              StartTime?: string;
            };
            QuantitySold?: number;
            ReserveMet?: boolean;
            SecondChanceEligible?: boolean;
          };
          StartPrice?: number | { value: number; currencyID: CurrencyCodeType };
          VariationProductListingDetails?: {
            EAN?: string;
            ISBN?: string;
            UPC?: string;
          };
          VariationSpecifics?: {
            NameValueList?: {
              Name?: string;
              Value?: string;
            };
          };
        };
      };
      WatchCount?: bigint;
      eBayPlus?: boolean;
      eBayPlusEligible?: boolean;
    };
  };
  ItemsPerPage: number;
  PageNumber: number;
  PaginationResult: {
    TotalNumberOfEntries: number;
    TotalNumberOfPages: number;
  };
  ReturnedItemCountActual: number;
  Seller?: {
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
      StoreOwner?: boolean;
      StoreURL?: string;
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
    UserAnonymized: boolean;
    UserID: string;
    UserIDChanged: boolean;
    UserIDLastChanged: string;
    VATStatus: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
    eBayGoodStanding: boolean;
  };
}
