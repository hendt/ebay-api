export type AttributeNameValue = {
    name: string,
    value: string
}

export type CompatibilityPayload = {
    compatibilityProperties: AttributeNameValue[]
}

export type SearchCatalogParams = {
    aspect_filter?: string,
    category_ids?: string,
    fieldgroups?: string,
    gtin?: string,
    limit?: number,
    offset?: number,
    q?: string,
}

export type SearchParams = {
    aspect_filter?: string,
    category_ids?: string,
    charity_ids?: string,
    compatibility_filter?: string,
    epid?: string,
    fieldgroups?: string,
    filter?: string,
    gtin?: string,
    limit?: number,
    offset?: number,
    q?: string,
    sort?: string
}

export type SearchByImageParams = {
    aspect_filter?: string,
    category_ids?: string,
    epid?: string,
    filter?: string,
    limit?: number,
    offset?: number,
    sort?: string
};

export type LegacyItemParams = {
    legacy_item_id: string,
    fieldgroups?: string,
    legacy_variation_id?: string,
    legacy_variation_sku?: string
}

export type AddCartItemInput = {
    itemId: string,
    quantity: number
};

export type RemoveCartItemInput = {
    cartItemId: string
}

export type UpdateCartItemInput = {
    cartItemId: string,
    quantity: number
}

export type Amount = {
    value: string,
    currency: string
}

export type FeedParams = {
    feed_scope: string,
    category_id: string,
    date: string
}

export type AlsoBoughtByProductParams = {
    name?: string,
    epid?: string,
    gtin?: string,
    mpn?: string
};

export type AlsoViewedByProductParams = {
    brand?: string,
    epid?: string,
    gtin?: string,
    mpn?: string
}

export type MerchandisedProductsParams = {
    aspect_filter?: false,
    category_id: string,
    limit?: number,
    metric_name: string
}

export type UserConsent = {
    adultOnlyItem: boolean
}

export type PlaceProxyBidRequest = {
    maxAmount: Amount,
    userConsent: UserConsent
}


export type CouponRequest = {
    redemptionCode: string
}

export type CreditCard = {
    accountHolderName: string,
    billingAddress: string
    brand: string
    cardNumber: string
    cvvNumber: string
    expireMonth: number,
    expireYear: number
}

export type Wallet = {
    paymentToken: string
}

export type LineItemInput = {
    itemId: string,
    quantity: number
}

export type ShippingAddress = {
    addressLine1: string,
    addressLine2: string,
    city: string,
    country: string,
    county: string,
    phoneNumber: string,
    postalCode: string,
    recipient: string,
    stateOrProvince: string
}

export type CreateSignInCheckoutSessionRequest = {
    creditCard: CreditCard,
    lineItemInputs: LineItemInput,
    shippingAddress: ShippingAddress
}

export type UpdatePaymentInformation = {
    creditCard: CreditCard,
    wallet: Wallet
}

export type UpdateQuantity = {
    lineItemId: string,
    quantity: number
}

export type ShippingAddressImpl = {
    addressLine1: string,
    addressLine2: string,
    city: string,
    country: string,
    county: string,
    phoneNumber: string,
    postalCode: string,
    recipient: string,
    stateOrProvince: string
}

export type UpdateShippingOption = {
    lineItemId: string,
    shippingOptionId: string
}

export type CheckoutSessionRequest = {
    contactEmail: string,
    contactFirstName: string,
    contactLastName: string,
    creditCard: string,
    lineItemInputs: LineItemInput,
    shippingAddress: ShippingAddress
}

export type InitiatePaymentRequest = {
    paymentMethodBrandType: string,
    paymentMethodType: string
}

export type MarketingTerms = {
    marketingChannels: string[],
    marketingTermsAccepted: boolean,
    marketingTypes: string[]
}

export type GuestPlaceOrderRequest = {
    marketingTerms: MarketingTerms[]
}

export type Program = {
    programType: string
}

export type LegacyReference = {
    legacyItemId: string,
    legacyTransactionId: string
}

export type RefundItem = {
    refundAmount: Amount,
    lineItemId: string,
    legacyReference: LegacyReference
}

export type IssueRefundRequest = {
    reasonForRefund: string,
    comment: string,
    refundItems: RefundItem[],
    orderLevelRefundAmount: Amount
}

export type Interval = {
    close: string,
    open: string
}

export type OperatingHours = {
    dayOfWeekEnum: string,
    intervals: Interval[]
}

export type SpecialHours = {
    date: string,
    intervals: Interval[]
}

export type InventoryLocation = {
    locationAdditionalInformation: string,
    locationInstructions: string
    locationWebUrl: string,
    name: string,
    operatingHours: OperatingHours,
    phone: string,
    specialHours: SpecialHours
}

export type ShipToLocationAvailability = {
    quantity: number
}

export type OfferPriceQuantity = {
    offerId: string,
    availableQuantity: number,
    price: Amount
}

export type PriceQuantity = {
    sku: string,
    shipToLocationAvailability: ShipToLocationAvailability,
    offers: OfferPriceQuantity[]
}

export type BulkPriceQuantity = {
    requests: PriceQuantity[]
}

export type PickupAtLocationAvailability = {
    availabilityType: string,
    fulfillmentTime: string,
    merchantLocationKey: string,
    quantity: number
}

export type Availability = {
    pickupAtLocationAvailability: PickupAtLocationAvailability,
    shipToLocationAvailability: ShipToLocationAvailability
}

export type Dimension = {
    height: number,
    length: number,
    unit: string,
    width: number
}

export type Weight = {
    unit: string,
    value: number
}

export type PackageWeightAndSize = {
    dimensions: Dimension,
    packageType: string,
    weight: Weight
}

type Product = {
    aspects: any, // TODO
    brand: string,
    description: string,
    imageUrls: string[],
    mpn: string,
    subtitle: string,
    title: string,
    isbn: string[],
    upc: string[],
    ean: string[],
    epid: string
}

export type InventoryItemWithSkuLocale = {
    availability: Availability,
    condition: string,
    conditionDescription: string,
    packageWeightAndSize: PackageWeightAndSize,
    product: Product,
    sku: string,
    locale: string
}

export type BulkInventoryItem = {
    requests: InventoryItemWithSkuLocale[]
}

export type PublishByInventoryItemGroupRequest = {
    inventoryItemGroupKey: string,
    marketplaceId: string
}

export type WithdrawByInventoryItemGroupRequest = {
    inventoryItemGroupKey: string,
    marketplaceId: string
}

export type OfferKeyWithId = {
    offerId: string
}

export type OfferKeysWithId = {
    offers: OfferKeyWithId[]
}

export type ShippingCostOverride = {
    surcharge: Amount,
    additionalShippingCost: Amount,
    priority: number,
    shippingCost: Amount,
    shippingServiceType: string
}

export type ListingPolicies = {
    paymentPolicyId: string,
    returnPolicyId: string,
    shippingCostOverrides: ShippingCostOverride,
    fulfillmentPolicyId: string,
    ebayPlusIfEligible: boolean
}

export type PricingSummary = {
    minimumAdvertisedPrice: Amount,
    pricingVisibility: string,
    originallySoldForRetailPriceOn: string,
    originalRetailPrice: Amount,
    price: Amount
}

export type Tax = {
    applyTax: boolean,
    thirdPartyTaxCategory: string,
    vatPercentage: number
}

export type EbayOfferDetailsWithKeys = {
    availableQuantity: number,
    categoryId: string,
    listingDescription: string,
    listingPolicies: ListingPolicies,
    merchantLocationKey: string,
    pricingSummary: PricingSummary,
    quantityLimitPerBuyer: number,
    tax: Tax,
    storeCategoryNames: string[],
    lotSize:number,
    sku: string,
    marketplaceId: string,
    format: string
}

export type BulkEbayOfferDetailsWithKeys = {
    requests: EbayOfferDetailsWithKeys[]
}

export type BulkOffer = {
    requests: OfferKeyWithId[]
}

export type MigrateListing = {
    listingId: string
}

export type BulkMigrateListing = {
    requests: MigrateListing[]
}

export type FindListingRecommendationRequest = {
    listingIds: string[]
}

export type TranslateRequest = {
    from: string,
    to: string,
    translationContext: string,
    text: string[]
}

export type CreateAdsByInventoryReferenceRequest = {
    bidPercentage: string,
    inventoryReferenceId: string,
    inventoryReferenceType: string
}

export type BulkCreateAdsByInventoryReferenceRequest = {
    requests: CreateAdsByInventoryReferenceRequest[]
}

export type CreateAdRequest = {
    bidPercentage: string,
    listingId: string
}

export type BulkCreateAdRequest = {
    requests: CreateAdRequest[]
}

export type DeleteAdsByInventoryReferenceRequest = {
    inventoryReferenceId: string,
    inventoryReferenceType: string
}

export type BulkDeleteAdsByInventoryReferenceRequest = {
    requests: DeleteAdsByInventoryReferenceRequest[]
}

export type DeleteAdRequest = {
    listingId: string
}

export type BulkDeleteAdRequest = {
    requests: DeleteAdRequest[]
}

export type UpdateBidPercentageRequest = {
    bidPercentage: string
}

export type FundingStrategy = {
    bidPercentage: string,
    fundingModel: string
}

export type CloneCampaignRequest = {
    campaignName: string,
    endDate: string,
    fundingStrategy: FundingStrategy,
    startDate: string
}

export type UpdateCampaignIdentificationRequest = {
    campaignName: string,
    endDate: string,
    startDate: string
}

export type DiscountBenefit = {
    amountOffItem: Amount,
    amountOffOrder: Amount,
    percentageOffItem: string,
    percentageOffOrder: string
}

export type InventoryItem = {
    inventoryReferenceId: string
}

export type SelectionRule = {
    brands: string[],
    categoryIds: string[],
    categoryScope: string,
    listingConditionIds: string[],
    maxPrice: Amount,
    minPrice: Amount
}

export type RuleCriteria = {
    excludeInventoryItems: InventoryItem[],
    excludeListingIds: string[],
    markupInventoryItems: InventoryItem[],
    markupListingIds: string[],
    selectionRules: SelectionRule
}

export type InventoryCriterion = {
    inventoryCriterionType: string,
    inventoryItems: InventoryItem,
    listingIds: string[],
    ruleCriteria: RuleCriteria
}

export type SelectedInventoryDiscount = {
    discountBenefit: DiscountBenefit,
    discountId: string,
    inventoryCriterion: InventoryCriterion,
    ruleOrder: number
}

export type ItemPriceMarkdown = {
    applyFreeShipping: boolean,
    autoSelectFutureInventory: boolean,
    blockPriceIncreaseInItemRevision: boolean,
    description: string,
    endDate: string,
    marketplaceId: string,
    name: string,
    priority: string,
    promotionImageUrl: string,
    promotionStatus: string,
    selectedInventoryDiscounts: SelectedInventoryDiscount,
    startDate: string
}

export type DiscountSpecification = {
    properties: Amount,
    forEachQuantity: number,
    minAmount: Amount,
    minQuantity: number,
    numberOfDiscountedItems: number
}

export type DiscountRule = {
    discountBenefit: DiscountBenefit,
    discountSpecification: DiscountSpecification,
    ruleOrder: number
}

export type ItemPromotion = {
    applyDiscountToSingleItemOnly: boolean,
    description: string,
    discountRules: DiscountRule[],
    endDate: string,
    inventoryCriterion: InventoryCriterion,
    marketplaceId: string,
    name: string,
    priority: string,
    promotionImageUrl: string,
    promotionStatus: string,
    promotionType: string,
    startDate: string
}