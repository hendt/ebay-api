// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetItem.html#Output
import type {
  CountryCodeType,
  CurrencyCodeType,
  DaysCodeType,
  StandardOutputFields
} from './common.js';

export interface GetItemResponse extends StandardOutputFields {
  Item: {
    ApplicationData?: string;
    ApplyBuyerProtection?: {
      BuyerProtectionSource?: 'CustomCode' | 'eBay';
      BuyerProtectionStatus?:
        | 'CustomCode'
        | 'ItemEligible'
        | 'ItemIneligible'
        | 'ItemMarkedEligible'
        | 'ItemMarkedIneligible'
        | 'NoCoverage';
    };
    AutoPay: boolean;
    AvailableForPickupDropOff?: boolean;
    BestOfferDetails?: {
      BestOfferCount?: number;
      BestOfferEnabled?: boolean;
    };
    BusinessSellerDetails?: {
      AdditionalContactInformation?: string;
      Address?: {
        FirstName?: string;
        LastName?: string;
      };
      Email?: string;
      Fax?: string;
      LegalInvoice?: boolean;
      TermsAndConditions?: string;
      TradeRegistrationNumber?: string;
      VATDetails?: {
        BusinessSeller?: boolean;
        RestrictedToBusiness?: boolean;
        VATID?: string;
        VATPercent?: number;
        VATSite?: string;
      };
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
    ConditionDefinition?: string;
    ConditionDescriptors?: {
      ConditionDescriptor?: {
        AdditionalInfo?: string;
        Name?: string;
        Value?: string;
      };
    };
    ConditionDisplayName?: string;
    ConditionID?: number;
    Country: CountryCodeType;
    CrossBorderTrade: string;
    Currency: CurrencyCodeType;
    Description: string;
    DigitalGoodInfo?: {
      DigitalDelivery?: boolean;
    };
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
    DispatchTimeMax?: number;
    EligibleForPickupDropOff?: boolean;
    ExtendedProducerResponsibility?: {
      EcoParticipationFee?:
        | number
        | { value: number; currencyID: CurrencyCodeType };
    };
    ExtendedSellerContactDetails?: {
      ClassifiedAdContactByEmailEnabled?: boolean;
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
    IgnoreQuantity?: boolean;
    IntegratedMerchantCreditCardEnabled?: boolean;
    InventoryTrackingMethod?: 'CustomCode' | 'ItemID' | 'SKU';
    IsIntermediatedShippingEligible?: boolean;
    IsItemEMSEligible: boolean;
    IsSecureDescription?: boolean;
    ItemCompatibilityCount?: number;
    ItemCompatibilityList?: {
      Compatibility?: {
        CompatibilityNotes?: string;
        NameValueList?: {
          Name?: string;
          Source?: 'CustomCode' | 'ItemSpecific' | 'Product';
          Value?: string;
        };
      };
    };
    ItemID: string;
    ItemPolicyViolation?: {
      PolicyID?: bigint;
      PolicyText?: string;
    };
    ItemSpecifics?: {
      NameValueList?: {
        Name?: string;
        Source?: 'CustomCode' | 'ItemSpecific' | 'Product';
        Value?: string;
      };
    };
    ListingDetails: {
      Adult: boolean;
      BestOfferAutoAcceptPrice?:
        | number
        | { value: number; currencyID: CurrencyCodeType };
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
      EndingReason?:
        | 'CustomCode'
        | 'Incorrect'
        | 'LostOrBroken'
        | 'NotAvailable'
        | 'OtherListingError'
        | 'ProductDeleted'
        | 'SellToHighBidder'
        | 'Sold';
      HasPublicMessages: boolean;
      HasReservePrice: boolean;
      HasUnansweredQuestions: boolean;
      MinimumBestOfferPrice?:
        | number
        | { value: number; currencyID: CurrencyCodeType };
      RelistedItemID?: string;
      SecondChanceOriginalItemID?: string;
      StartTime: string;
      ViewItemURL: string;
      ViewItemURLForNaturalSearch?: string;
    };
    ListingDuration?: string;
    ListingEnhancement?: 'BoldTitle' | 'CustomCode';
    ListingSubtype2?:
      | 'ClassifiedAd'
      | 'CustomCode'
      | 'LocalMarketBestOfferOnly';
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
    MechanicalCheckAccepted?: boolean;
    PayPalEmailAddress?: string;
    PaymentAllowedSite:
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
    PaymentDetails?: {
      DaysToFullPayment?: number;
      DepositAmount?: number | { value: number; currencyID: CurrencyCodeType };
      DepositType?: 'CustomCode' | 'None' | 'OtherMethod';
      HoursToDeposit?: number;
    };
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
      ExtendedPictureDetails?: {
        PictureURLs?: {
          ExternalPictureURL?: string;
          eBayPictureURL?: string;
        };
      };
      ExternalPictureURL?: string;
      GalleryErrorInfo?: string;
      GalleryStatus?:
        | 'CustomCode'
        | 'ImageNonExistent'
        | 'ImageProcessingError'
        | 'ImageReadTimeOut'
        | 'InvalidFile'
        | 'InvalidFileFormat'
        | 'InvalidProtocol'
        | 'InvalidUrl'
        | 'Pending'
        | 'ServerDown'
        | 'Success';
      GalleryType?: 'CustomCode' | 'Gallery' | 'None' | 'Plus';
      PictureSource?: 'CustomCode' | 'EPS' | 'Vendor';
      PictureURL?: string;
    };
    PostalCode: string;
    PrimaryCategory: {
      CategoryID: string;
      CategoryName: string;
    };
    PrivateListing: boolean;
    ProductListingDetails?: {
      BrandMPN?: {
        Brand?: string;
        MPN?: string;
      };
      Copyright?: string;
      EAN?: string;
      ISBN?: string;
      IncludeStockPhotoURL?: boolean;
      IncludeeBayProductDetails?: boolean;
      ProductReferenceID?: string;
      StockPhotoURL?: string;
      UPC?: string;
      UseStockPhotoURLAsGallery?: boolean;
    };
    ProxyItem?: boolean;
    Quantity: number;
    QuantityAvailableHint?: 'CustomCode' | 'Limited' | 'MoreThan';
    QuantityThreshold?: number;
    ReasonHideFromSearch?: 'DuplicateListing' | 'OutOfStock';
    Regulatory?: {
      Documents?: {
        Document?: {
          DocumentID?: string;
        };
      };
      EnergyEfficiencyLabel?: {
        ImageDescription?: string;
        ImageURL?: string;
        ProductInformationsheet?: string;
      };
      Hazmat?: {
        Component?: string;
        Pictograms?: {
          Pictogram?: string;
        };
        SignalWord?: string;
        Statements?: any;
      };
      Manufacturer?: {
        CityName?: string;
        CompanyName?: string;
        ContactURL?: string;
        Country?: CountryCodeType;
        Email?: string;
        Phone?: string;
        PostalCode?: string;
        StateOrProvince?: string;
        Street1?: string;
        Street2?: string;
      };
      ProductSafety?: {
        Component?: string;
        Pictograms?: {
          Pictogram?: string;
        };
        Statements?: any;
      };
      RepairScore?: number;
      ResponsiblePersons?: {
        ResponsiblePerson?: {
          CityName?: string;
          CompanyName: string;
          ContactURL?: string;
          Country?: CountryCodeType;
          Email?: string;
          Phone?: string;
          PostalCode?: string;
          StateOrProvince?: string;
          Street1?: string;
          Street2?: string;
          Types?: {
            Type?: 'CustomCode' | 'EUResponsiblePerson';
          };
        };
      };
    };
    RelistParentID?: bigint;
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
      FeedbackScore?: number;
      IDVerified: boolean;
      NewUser: boolean;
      PositiveFeedbackPercent?: number;
      RegistrationAddress?: {
        CityName?: string;
        Country?: CountryCodeType;
        CountryName?: string;
        FirstName?: string;
        LastName?: string;
        Name?: string;
        Phone?: string;
        PostalCode?: string;
        Street?: string;
        Street1?: string;
        Street2?: string;
      };
      RegistrationDate: string;
      SellerInfo: {
        AllowPaymentEdit: boolean;
        BillingCurrency?: CurrencyCodeType;
        CIPBankAccountStored: boolean;
        CheckoutEnabled: boolean;
        GoodStanding: boolean;
        QualifiesForB2BVAT: boolean;
        SafePaymentExempt: boolean;
        SellerBusinessType?:
          | 'Commercial'
          | 'CustomCode'
          | 'Private'
          | 'Undefined';
        SellerLevel:
          | 'Bronze'
          | 'CustomCode'
          | 'Gold'
          | 'None'
          | 'Platinum'
          | 'Silver'
          | 'Titanium';
        StoreOwner: boolean;
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
      UserID: string;
      UserIDChanged: boolean;
      UserIDLastChanged: string;
      VATStatus: 'CustomCode' | 'NoVATTax' | 'VATExempt' | 'VATTax';
      eBayGoodStanding: boolean;
    };
    SellerContactDetails?: {
      CompanyName?: string;
      County?: string;
      FirstName?: string;
      LastName?: string;
      PhoneAreaOrCityCode?: string;
      PhoneCountryCode?: CountryCodeType;
      PhoneCountryPrefix?: string;
      PhoneLocalNumber?: string;
      Street1?: string;
      Street2?: string;
    };
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
    SellerVacationNote?: string;
    SellingStatus: {
      AdminEnded?: boolean;
      BidCount: number;
      BidIncrement: number | { value: number; currencyID: CurrencyCodeType };
      ConvertedCurrentPrice?:
        | number
        | { value: number; currencyID: CurrencyCodeType };
      CurrentPrice: number | { value: number; currencyID: CurrencyCodeType };
      HighBidder?: {
        AboutMePage?: boolean;
        BuyerInfo?: {
          ShippingAddress?: {
            Country?: CountryCodeType;
            FirstName?: string;
            LastName?: string;
            PostalCode?: string;
          };
        };
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
        PositiveFeedbackPercent?: number;
        RegistrationAddress?: {
          CityName?: string;
          Country?: CountryCodeType;
          CountryName?: string;
          FirstName?: string;
          LastName?: string;
          Name?: string;
          Phone?: string;
          PostalCode?: string;
          Street?: string;
          Street1?: string;
          Street2?: string;
        };
        RegistrationDate: string;
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
      ListingOnHold?: boolean;
      ListingStatus: 'Active' | 'Completed' | 'Custom' | 'CustomCode' | 'Ended';
      MinimumToBid: number | { value: number; currencyID: CurrencyCodeType };
      PromotionalSaleDetails?: {
        EndTime?: string;
        OriginalPrice?:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        StartTime?: string;
      };
      QuantitySold: number;
      QuantitySoldByPickupInStore: number;
      ReserveMet: boolean;
      SecondChanceEligible: boolean;
      SoldAsBin?: boolean;
    };
    ShipToLocations: string;
    ShippingDetails?: {
      CalculatedShippingDiscount?: {
        DiscountName?:
          | 'CombinedItemWeight'
          | 'CustomCode'
          | 'EachAdditionalAmount'
          | 'EachAdditionalAmountOff'
          | 'EachAdditionalPercentOff'
          | 'IndividualItemWeight'
          | 'MaximumShippingCostPerOrder'
          | 'ShippingCostXForAmountY'
          | 'ShippingCostXForItemCountN'
          | 'WeightOff';
        DiscountProfile?: {
          DiscountProfileID?: string;
          DiscountProfileName?: string;
          MappedDiscountProfileID?: string;
          WeightOff?:
            | number
            | {
                value: number;
                unit: string;
                measurementSystem: 'English' | 'Metric';
              };
        };
      };
      CalculatedShippingRate?: {
        InternationalPackagingHandlingCosts:
          | number
          | { value: number; currencyID: CurrencyCodeType };
        PackagingHandlingCosts:
          | number
          | { value: number; currencyID: CurrencyCodeType };
      };
      ExcludeShipToLocation?: string;
      FlatShippingDiscount?: {
        DiscountName?:
          | 'CombinedItemWeight'
          | 'CustomCode'
          | 'EachAdditionalAmount'
          | 'EachAdditionalAmountOff'
          | 'EachAdditionalPercentOff'
          | 'IndividualItemWeight'
          | 'MaximumShippingCostPerOrder'
          | 'ShippingCostXForAmountY'
          | 'ShippingCostXForItemCountN'
          | 'WeightOff';
        DiscountProfile?: {
          DiscountProfileID?: string;
          DiscountProfileName?: string;
          EachAdditionalAmount?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          EachAdditionalAmountOff?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          EachAdditionalPercentOff?: number;
        };
      };
      GetItFast: boolean;
      GlobalShipping?: boolean;
      InternationalCalculatedShippingDiscount?: {
        DiscountName?:
          | 'CombinedItemWeight'
          | 'CustomCode'
          | 'EachAdditionalAmount'
          | 'EachAdditionalAmountOff'
          | 'EachAdditionalPercentOff'
          | 'IndividualItemWeight'
          | 'MaximumShippingCostPerOrder'
          | 'ShippingCostXForAmountY'
          | 'ShippingCostXForItemCountN'
          | 'WeightOff';
        DiscountProfile?: {
          DiscountProfileID?: string;
          DiscountProfileName?: string;
          MappedDiscountProfileID?: string;
          WeightOff?:
            | number
            | {
                value: number;
                unit: string;
                measurementSystem: 'English' | 'Metric';
              };
        };
      };
      InternationalFlatShippingDiscount?: {
        DiscountName?:
          | 'CombinedItemWeight'
          | 'CustomCode'
          | 'EachAdditionalAmount'
          | 'EachAdditionalAmountOff'
          | 'EachAdditionalPercentOff'
          | 'IndividualItemWeight'
          | 'MaximumShippingCostPerOrder'
          | 'ShippingCostXForAmountY'
          | 'ShippingCostXForItemCountN'
          | 'WeightOff';
        DiscountProfile?: {
          DiscountProfileID?: string;
          DiscountProfileName?: string;
          EachAdditionalAmount?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          EachAdditionalAmountOff?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          EachAdditionalPercentOff?: number;
        };
      };
      InternationalPromotionalShippingDiscount?: boolean;
      InternationalShippingDiscountProfileID?: string;
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
      PromotionalShippingDiscount?: boolean;
      PromotionalShippingDiscountDetails?: {
        DiscountName?:
          | 'CombinedItemWeight'
          | 'CustomCode'
          | 'EachAdditionalAmount'
          | 'EachAdditionalAmountOff'
          | 'EachAdditionalPercentOff'
          | 'IndividualItemWeight'
          | 'MaximumShippingCostPerOrder'
          | 'ShippingCostXForAmountY'
          | 'ShippingCostXForItemCountN'
          | 'WeightOff';
        ItemCount?: number;
        OrderAmount?: number | { value: number; currencyID: CurrencyCodeType };
        ShippingCost?: number | { value: number; currencyID: CurrencyCodeType };
      };
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
      ShippingDiscountProfileID?: string;
      ShippingServiceOptions: {
        ExpeditedService?: boolean;
        FreeShipping?: boolean;
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
      ThirdPartyCheckout: boolean;
    };
    ShippingPackageDetails?: {
      PackageDepth?:
        | number
        | {
            value: number;
            unit: string;
            measurementSystem: 'English' | 'Metric';
          };
      PackageLength?:
        | number
        | {
            value: number;
            unit: string;
            measurementSystem: 'English' | 'Metric';
          };
      PackageWidth?:
        | number
        | {
            value: number;
            unit: string;
            measurementSystem: 'English' | 'Metric';
          };
      ShippingIrregular?: boolean;
      ShippingPackage?:
        | 'BulkyGoods'
        | 'Caravan'
        | 'Cars'
        | 'CustomCode'
        | 'Europallet'
        | 'ExpandableToughBags'
        | 'ExtraLargePack'
        | 'Furniture'
        | 'IndustryVehicles'
        | 'LargeCanadaPostBox'
        | 'LargeCanadaPostBubbleMailer'
        | 'LargeEnvelope'
        | 'Letter'
        | 'MailingBoxes'
        | 'MediumCanadaPostBox'
        | 'MediumCanadaPostBubbleMailer'
        | 'Motorbikes'
        | 'None'
        | 'OneWayPallet'
        | 'PackageThickEnvelope'
        | 'PaddedBags'
        | 'ParcelOrPaddedEnvelope'
        | 'Roll'
        | 'SmallCanadaPostBox'
        | 'SmallCanadaPostBubbleMailer'
        | 'ToughBags'
        | 'UPSLetter'
        | 'USPSFlatRateEnvelope'
        | 'USPSLargePack'
        | 'VeryLargePack'
        | 'Winepak';
      WeightMajor?:
        | number
        | {
            value: number;
            unit: string;
            measurementSystem: 'English' | 'Metric';
          };
      WeightMinor?:
        | number
        | {
            value: number;
            unit: string;
            measurementSystem: 'English' | 'Metric';
          };
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
    TaxCategory?: string;
    TimeLeft: string;
    Title: string;
    TopRatedListing?: boolean;
    UUID?: string;
    UnitInfo?: {
      UnitQuantity?: number;
      UnitType?: string;
    };
    VATDetails?: {
      VATPercent?: number;
    };
    VIN?: string;
    VINLink?: string;
    VRM?: string;
    VRMLink?: string;
    Variations?: {
      Pictures?: {
        VariationSpecificName?: string;
        VariationSpecificPictureSet?: {
          ExtendedPictureDetails?: {
            PictureURLs?: {
              ExternalPictureURL?: string;
              eBayPictureURL?: string;
            };
          };
          ExternalPictureURL?: string;
          PictureURL?: string;
          VariationSpecificValue?: string;
        };
      };
      Variation?: {
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
        Quantity?: number;
        SKU?: string;
        SellingStatus?: {
          AdminEnded?: boolean;
          BidCount: number;
          BidIncrement:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          ConvertedCurrentPrice?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          CurrentPrice:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          HighBidder?: {
            AboutMePage?: boolean;
            BuyerInfo?: {
              ShippingAddress?: {
                Country?: CountryCodeType;
                FirstName?: string;
                LastName?: string;
                PostalCode?: string;
              };
            };
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
            PositiveFeedbackPercent?: number;
            RegistrationAddress?: {
              CityName?: string;
              Country?: CountryCodeType;
              CountryName?: string;
              FirstName?: string;
              LastName?: string;
              Name?: string;
              Phone?: string;
              PostalCode?: string;
              Street?: string;
              Street1?: string;
              Street2?: string;
            };
            RegistrationDate: string;
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
          ListingOnHold?: boolean;
          ListingStatus:
            | 'Active'
            | 'Completed'
            | 'Custom'
            | 'CustomCode'
            | 'Ended';
          MinimumToBid:
            | number
            | { value: number; currencyID: CurrencyCodeType };
          PromotionalSaleDetails?: {
            EndTime?: string;
            OriginalPrice?:
              | number
              | { value: number; currencyID: CurrencyCodeType };
            StartTime?: string;
          };
          QuantitySold: number;
          QuantitySoldByPickupInStore: number;
          ReserveMet: boolean;
          SecondChanceEligible: boolean;
          SoldAsBin?: boolean;
        };
        StartPrice?: number | { value: number; currencyID: CurrencyCodeType };
        VariationExtendedProducerResponsibility?: {
          EcoParticipationFee?:
            | number
            | { value: number; currencyID: CurrencyCodeType };
        };
        VariationProductListingDetails?: {
          EAN?: string;
          ISBN?: string;
          ProductReferenceID?: string;
          UPC?: string;
        };
        VariationSpecifics?: {
          NameValueList?: {
            Name?: string;
            Source?: 'CustomCode' | 'ItemSpecific' | 'Product';
            Value?: string;
          };
        };
      };
      VariationSpecificsSet?: {
        NameValueList?: {
          Name?: string;
          Source?: 'CustomCode' | 'ItemSpecific' | 'Product';
          Value?: string;
        };
      };
    };
    VideoDetails?: {
      VideoID?: string;
    };
    WatchCount?: bigint;
    eBayPlus?: boolean;
    eBayPlusEligible?: boolean;
    eMailDeliveryAvailable?: boolean;
  };
}
