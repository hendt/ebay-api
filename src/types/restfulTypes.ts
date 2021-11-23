import {
  CancelReason,
  CaseSearchFieldGroup,
  CaseStatusFilter,
  CategoryType as CategoryTypeEnum,
  Condition,
  CurrencyCode,
  Decision,
  EscalateReason,
  FilePurpose,
  FormatType,
  InquirySearchFieldGroup,
  InquiryStatusFilter,
  Locale,
  Marketplace,
  MarketplaceId,
  PaymentMethodType,
  ReasonForRefund,
  RecipientAccountReferenceType,
  RefundFeeType,
  RegionType,
  RequestType,
  ReturnCountFilter,
  ReturnMethod,
  ReturnReason,
  ReturnShippingCostPayer,
  ReturnState,
  ReturnType,
  ShippingCarrier,
  ShippingCostType,
  ShippingOptionType,
  StoreType,
  TimeDurationUnit,
  UserRoleFilter
} from '../enums';

export type AttributeNameValue = {
  name: string,
  value: string
};

export type CompatibilityPayload = {
  compatibilityProperties: AttributeNameValue[]
};

export type CatalogSearchParams = {
  aspect_filter?: string,
  category_ids?: string,
  fieldgroups?: string,
  gtin?: string,
  limit?: number,
  offset?: number,
  q?: string,
};

export type BrowseSearchParams = {
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
};

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
};

export type AddCartItemInput = {
  itemId: string,
  quantity: number
};

export type RemoveCartItemInput = {
  cartItemId: string
};

export type UpdateCartItemInput = {
  cartItemId: string,
  quantity: number
};

export type SimpleAmount = {
  currency: string,
  value: string
}

export type Amount = {
  convertedFromCurrency?: CurrencyCode,
  convertedFromValue?: number,
  currency?: CurrencyCode,
  value: string
};

export type BuyFeedParams = {
  feed_scope: string,
  category_id: string,
  date: string
};

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
};

export type MerchandisedProductsParams = {
  aspect_filter?: false,
  category_id: string,
  limit?: number,
  metric_name: string
};

export type UserConsent = {
  adultOnlyItem: boolean
};

export type PlaceProxyBidRequest = {
  maxAmount: Amount,
  userConsent: UserConsent
};

export type CouponRequest = {
  redemptionCode: string
};

export type CreditCard = {
  accountHolderName: string,
  billingAddress: string
  brand: string
  cardNumber: string
  cvvNumber: string
  expireMonth: number,
  expireYear: number
};

export type Wallet = {
  paymentToken: string
};

export type LineItemInput = {
  itemId: string,
  quantity: number
};

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
};

export type CreateSignInCheckoutSessionRequest = {
  creditCard: CreditCard,
  lineItemInputs: LineItemInput,
  shippingAddress: ShippingAddress
};

export type UpdatePaymentInformation = {
  creditCard: CreditCard,
  wallet: Wallet
};

export type UpdateQuantity = {
  lineItemId: string,
  quantity: number
};

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
};

export type UpdateShippingOption = {
  lineItemId: string,
  shippingOptionId: string
};

export type CheckoutSessionRequest = {
  contactEmail: string,
  contactFirstName: string,
  contactLastName: string,
  creditCard: string,
  lineItemInputs: LineItemInput,
  shippingAddress: ShippingAddress
};

export type InitiatePaymentRequest = {
  paymentMethodBrandType: string,
  paymentMethodType: string
};

export type MarketingTerms = {
  marketingChannels: string[],
  marketingTermsAccepted: boolean,
  marketingTypes: string[]
};

export type GuestPlaceOrderRequest = {
  marketingTerms: MarketingTerms[]
};

export type Program = {
  programType: string
};

export type LegacyReference = {
  legacyItemId: string,
  legacyTransactionId: string
};

export type RefundItem = {
  refundAmount: Amount,
  lineItemId: string,
  legacyReference?: LegacyReference
};

export type IssueRefundRequest = {
  reasonForRefund: ReasonForRefund,
  comment?: string,
  refundItems?: RefundItem[],
  orderLevelRefundAmount?: SimpleAmount
};

export type PaymentParams = {
  orderId?: string
  buyerUsername?: string
  openDateFrom?: string
  openDateTo?: string
  paymentDisputeStatus?: string
  limit?: string
  offset?: string
}

export type Phone = {
  countryCode: string
  number: number
}

export type ReturnAddress = {
  addressLine1: string
  addressLine2: string
  city: string
  country: string
  county: string
  fullName: string
  postalCode: string
  primaryPhone: Phone
  stateOrProvince: string
}

export type ContestPaymentDisputeRequest = {
  returnAddress: ReturnAddress,
  revision: number
}

export type FileEvidence = {
  fileId: string
}

export type OrderLineItems = {
  itemId: string
  lineItemId: string
}

export type  AddEvidencePaymentDisputeRequest = {
  evidenceType: string
  files: FileEvidence[]
  lineItems: OrderLineItems[]
}

export type UpdateEvidencePaymentDisputeRequest = AddEvidencePaymentDisputeRequest & {
  evidenceId: string
}

export type Comments = {
  content: string,
  language?: string,
  translatedFromContent?: string,
  translatedFromLanguage?: string
}

export type PostOrderItemizedRefundDetailType = {
  refundAmount: Amount,
  refundFeeType: RefundFeeType,
  restockingFeePercentage?: string,
}

export type RefundDetail = {
  itemizedRefundDetail: PostOrderItemizedRefundDetailType[]
  totalAmount: Amount
}

export type PostOrderIssueRefundRequest = {
  comments?: Comments,
  refundDetail: RefundDetail,
  relistItem?: boolean
};

export type Interval = {
  close: string,
  open: string
};

export type OperatingHours = {
  dayOfWeekEnum: string,
  intervals: Interval[]
};

export type SpecialHours = {
  date: string,
  intervals: Interval[]
};

export type InventoryLocation = {
  locationAdditionalInformation?: string,
  locationInstructions?: string
  locationWebUrl?: string,
  name?: string,
  operatingHours?: OperatingHours,
  phone?: string,
  specialHours?: SpecialHours
};

export type GeoCoordinates = {
  latitude: number
  longitude: number
}

export type LocationDetails = {
  address: Address
  geoCoordinates?: GeoCoordinates
}

export type InventoryLocationFull = InventoryLocation & {
  location: LocationDetails
  locationTypes?: StoreType[]
  merchantLocationStatus?: string
}

export type AvailabilityDistribution = {
  fulfillmentTime?: TimeDuration
  merchantLocationKey: string
  quantity: number
}

export type ShipToLocationAvailability = {
  availabilityDistributions?: AvailabilityDistribution[]
  quantity: number
};

export type OfferPriceQuantity = {
  offerId: string,
  availableQuantity: number,
  price: Amount
};

export type PriceQuantity = {
  sku: string,
  shipToLocationAvailability: ShipToLocationAvailability,
  offers: OfferPriceQuantity[]
};

export type BulkPriceQuantity = {
  requests: PriceQuantity[]
};

export type PickupAtLocationAvailability = {
  availabilityType: string,
  fulfillmentTime: TimeDuration,
  merchantLocationKey: string,
  quantity: number
};

export type Availability = {
  pickupAtLocationAvailability?: PickupAtLocationAvailability,
  shipToLocationAvailability: ShipToLocationAvailability
};

export type Dimension = {
  height: number,
  length: number,
  unit: string,
  width: number
};

export type Weight = {
  unit: string,
  value: number
};

export type PackageWeightAndSize = {
  dimensions?: Dimension,
  packageType?: string,
  weight: Weight
};

export type Product = {
  aspects?: any, // TODO
  brand?: string,
  description?: string,
  imageUrls: string[],
  mpn?: string,
  subtitle?: string,
  title: string,
  isbn?: string[],
  upc?: string[],
  ean?: string[],
  epid?: string
};

export type InventoryItemWithSkuLocale = SellInventoryItem & {
  sku: string,
  locale?: Locale
};

export type BulkInventoryItem = {
  requests: InventoryItemWithSkuLocale[]
};

export type PublishByInventoryItemGroupRequest = {
  inventoryItemGroupKey: string,
  marketplaceId: Marketplace
};

export type WithdrawByInventoryItemGroupRequest = {
  inventoryItemGroupKey: string,
  marketplaceId: Marketplace
};

export type OfferKeyWithId = {
  offerId: string
};

export type OfferKeysWithId = {
  offers: OfferKeyWithId[]
};

export type ShippingCostOverride = {
  surcharge?: Amount,
  additionalShippingCost?: Amount,
  priority: number,
  shippingCost?: Amount,
  shippingServiceType: string
};

export type BestOffer = {
  autoAcceptPrice?: Amount
  autoDeclinePrice?: Amount
  bestOfferEnabled?: boolean
}

export type ListingPolicies = {
  bestOfferTerms?: BestOffer
  paymentPolicyId: string,
  returnPolicyId: string,
  shippingCostOverrides?: ShippingCostOverride[],
  fulfillmentPolicyId: string,
  ebayPlusIfEligible?: boolean
};

export type PricingSummary = {
  minimumAdvertisedPrice?: Amount,
  pricingVisibility?: string,
  originallySoldForRetailPriceOn?: string,
  originalRetailPrice?: Amount,
  price: Amount
};

export type Tax = {
  applyTax: boolean,
  thirdPartyTaxCategory?: string,
  vatPercentage?: number
};

export type Charity = {
  charityId: string,
  donationPercentage: string
}

export type EbayOfferDetailsWithId = {
  availableQuantity?: number,
  categoryId?: string,
  charity?: Charity,
  includeCatalogProductDetails?: boolean
  listingDescription?: string,
  listingDuration?: string,
  listingPolicies: ListingPolicies,
  merchantLocationKey: string,
  pricingSummary: PricingSummary,
  quantityLimitPerBuyer?: number,
  secondaryCategoryId?: string,
  tax?: Tax,
  storeCategoryNames?: string[],
  lotSize?: number
};

export type EbayOfferDetailsWithKeys = EbayOfferDetailsWithId & {
  sku: string,
  marketplaceId: Marketplace,
  format: FormatType
}

export type BulkEbayOfferDetailsWithKeys = {
  requests: EbayOfferDetailsWithKeys[]
};

export type BulkOffer = {
  requests: OfferKeyWithId[]
};

export type MigrateListing = {
  listingId: string
};

export type BulkMigrateListing = {
  requests: MigrateListing[]
};

export type FindListingRecommendationRequest = {
  listingIds: string[]
};

export type TranslateRequest = {
  from: string,
  to: string,
  translationContext: string,
  text: string[]
};

export type CreateAdsByInventoryReferenceRequest = {
  bidPercentage: string,
  inventoryReferenceId: string,
  inventoryReferenceType: string
};

export type BulkCreateAdsByInventoryReferenceRequest = {
  requests: CreateAdsByInventoryReferenceRequest[]
};

export type CreateAdRequest = {
  bidPercentage: string,
  listingId: string
};

export type BulkCreateAdRequest = {
  requests: CreateAdRequest[]
};

export type DeleteAdsByInventoryReferenceRequest = {
  inventoryReferenceId: string,
  inventoryReferenceType: string
};

export type BulkDeleteAdsByInventoryReferenceRequest = {
  requests: DeleteAdsByInventoryReferenceRequest[]
};

export type DeleteAdRequest = {
  listingId: string
};

export type BulkDeleteAdRequest = {
  requests: DeleteAdRequest[]
};

export type UpdateBidPercentageRequest = {
  bidPercentage: string
};

export type FundingStrategy = {
  bidPercentage: string,
  fundingModel: string
};

export type CloneCampaignRequest = {
  campaignName: string,
  endDate: string,
  fundingStrategy: FundingStrategy,
  startDate: string
};

export type UpdateCampaignIdentificationRequest = {
  campaignName: string,
  endDate: string,
  startDate: string
};

export type DiscountBenefit = {
  amountOffItem: Amount,
  amountOffOrder: Amount,
  percentageOffItem: string,
  percentageOffOrder: string
};

export type InventoryItem = {
  inventoryReferenceId: string
};

export type SelectionRule = {
  brands: string[],
  categoryIds: string[],
  categoryScope: string,
  listingConditionIds: string[],
  maxPrice: Amount,
  minPrice: Amount
};

export type RuleCriteria = {
  excludeInventoryItems: InventoryItem[],
  excludeListingIds: string[],
  markupInventoryItems: InventoryItem[],
  markupListingIds: string[],
  selectionRules: SelectionRule
};

export type InventoryCriterion = {
  inventoryCriterionType: string,
  inventoryItems: InventoryItem,
  listingIds: string[],
  ruleCriteria: RuleCriteria
};

export type SelectedInventoryDiscount = {
  discountBenefit: DiscountBenefit,
  discountId: string,
  inventoryCriterion: InventoryCriterion,
  ruleOrder: number
};

export type ItemPriceMarkdown = {
  applyFreeShipping: boolean,
  autoSelectFutureInventory: boolean,
  blockPriceIncreaseInItemRevision: boolean,
  description: string,
  endDate: string,
  marketplaceId: MarketplaceId,
  name: string,
  priority: string,
  promotionImageUrl: string,
  promotionStatus: string,
  selectedInventoryDiscounts: SelectedInventoryDiscount,
  startDate: string
};

export type DiscountSpecification = {
  properties: Amount,
  forEachQuantity: number,
  minAmount: Amount,
  minQuantity: number,
  numberOfDiscountedItems: number
};

export type DiscountRule = {
  discountBenefit: DiscountBenefit,
  discountSpecification: DiscountSpecification,
  ruleOrder: number
};

export type ItemPromotion = {
  applyDiscountToSingleItemOnly: boolean,
  description: string,
  discountRules: DiscountRule[],
  endDate: string,
  inventoryCriterion: InventoryCriterion,
  marketplaceId: MarketplaceId,
  name: string,
  priority: string,
  promotionImageUrl: string,
  promotionStatus: string,
  promotionType: string,
  startDate: string
};

export type DateTime = {
  formattedValue?: string, // reserver for future use
  value: string
};

export type LineItem = {
  itemId: number,
  quantity: number,
  transactionId: number
};

export type CreateCancelRequest = {
  buyerPaid?: boolean,
  buyerPaidDate?: DateTime
  cancelReason?: CancelReason,
  legacyOrderId: string,
  relistLineItem?: LineItem[]
};

export type ConfirmRefundRequest = {
  refundDate?: DateTime,
  unpaidOrder?: boolean
};

export type RejectCancelRequest = {
  shipmentDate?: DateTime,
  trackingNumber?: string
};

export type CancelSortField = {
  ascending: boolean,
  enumValue: 'CANCEL_ID' | 'CANCEL_REQUEST_DATE',
  field: '+' | '-'
};

export type CancellationSearchParams = {
  cancel_id?: string;
  creation_date_range_from?: string;
  creation_date_range_to?: string;
  item_id?: string;
  legacy_order_id?: string;
  limit?: string;
  offset?: string;
  role?: UserRoleFilter; // default SELLER
  sort?: CancelSortField;
  transaction_id?: string;
};

export type Text = {
  content: string,
  language?: string,
  translatedFromContent?: string,
  translatedFromLanguage?: string
};

export type AppealRequest = {
  comments: Text
};

export type BuyerCloseCaseRequest = {
  closeReason: boolean,
  comments?: Text
};

export type Address = {
  addressLine1?: string,
  addressLine2?: string,
  addressType?: string,
  city?: string,
  country?: string,
  county?: string,
  isTransliterated?: boolean,
  nationalRegion?: string,
  postalCode?: string,
  script?: string,
  stateOrProvince?: string,
  transliteratedFromScript?: string,
  worldRegion?: string
};

export type ReturnAddressRequest = {
  firstName?: string;
  lastName?: string;
  returnAddress?: Address
  RMA?: string
};

export type CaseSearchParams = {
  case_creation_date_range_from: string;
  case_creation_date_range_to: string;
  case_status_filter: CaseStatusFilter;
  fieldgroups: CaseSearchFieldGroup;
  item_id: string;
  limit: number;
  offset: number;
  order_id: string;
  return_id: string;
  sort: string;
  transaction_id: string;
};

export type CheckInquiryEligibilityRequest = {
  itemId: string,
  transactionId: string
};

export type Token = string;  // A string with normalized whitespace (e.g., dropped leading and trailing spaces).

export type BuyerCloseInquiryRequest = {
  closeReason?: Token,
  comments?: Text
};

export type CreateInquiryRequest = {
  claimQuantity?: number,
  comments?: Text;
  desiredOutcome?: Token,
  itemId: string,
  transactionId: string
};

export type EscalateInquiryRequest = {
  comments?: Text,
  escalateInquiryReason: Token
};

export type InquiryVoluntaryRefundRequest = {
  comments?: Text
};

export type SellerProvideRefundInfoRequest = {
  message: Text
};

export type ShipmentInfoRequest = {
  proofOfShipmentUploaded?: boolean;
  sellerComments?: Text;
  shippedWithTracking?: boolean;
  shippingCarrierName?: string;
  shippingDate?: DateTime;
  trackingNumber?: string;
};

export type InquirySearchParams = {
  fieldgroups?: InquirySearchFieldGroup;
  inquiry_creation_date_range_from?: string;
  inquiry_creation_date_range_to?: string;
  inquiry_status?: InquiryStatusFilter;
  item_id?: string;
  limit?: number;
  offset?: number;
  order_id?: string;
  sort?: string;
  transaction_id?: string;
};

export type SendMessageRequest = {
  message: Text
};
export type UpdateTrackingRequest = {
  newCarrierEnum?: ShippingCarrier;
  newCarrierName?: string;
  newTrackingNumber?: string;
  usedCarrierEnum?: ShippingCarrier;
  usedCarrierName?: string;
  usedTrackingNumber?: string;
};

export type ReturnRequestType = {
  carrier?: ShippingCarrier;
  comments?: Text;
  itemId: string;
  reason?: ReturnReason;
  requestType: RequestType;
  returnQuantity?: number;
  transactionId: string;
  type?: ReturnType
};

export type SetReturnCreationSessionRequest = {
  returnRequest: ReturnRequestType
};

export type CreateReturnRequest = {
  draftId?: string,
  returnRequest: ReturnRequestType
};

export type ProvideLabelRequest = {
  carrierEnum?: ShippingCarrier,
  carrierName?: string,
  comments?: Text,
  fileId?: string,
  forwardShippingLabelProvided?: boolean,
  labelAction: Token,
  labelSentDate?: DateTime,
  noLabelReason: Token,
  returnLabelCost?: Amount,
  trackingNumber?: string
};

export type CloseReturnRequest = {
  buyerCloseReason?: Token,
  comments?: Text
};

export type CheckEligibilityRequest = {
  checkTypes: Token[];
  itemId: string;
  reason: Token;
  returnQuantity?: number;
  transactionId: string;
};

export type EscalateRequest = {
  comments: Text;
  reason: EscalateReason
};

export type GetEstimateRequest = {
  itemId: string,
  reason?: ReturnReason,
  returnQuantity?: number;
  transactionId: string;
};

export type MarkAsReceivedRequest = {
  comments?: Text
};

export type ItemizedRefundDetailType = {
  refundAmount: Amount;
  refundFeeType: Token
};

export type  RefundDetailType = {
  itemizedRefundDetail: ItemizedRefundDetailType;
  totalAmount: Amount
};

export type MarkRefundSentRequest = {
  comments?: Text;
  partialRefundAmount?: Amount;
  refundDetail: RefundDetailType;
};

export type MarkAsShippedRequest = {
  carrierEnum?: ShippingCarrier;
  carrierName?: string;
  carrierUsed?: string;
  comments?: Text;
  shippedDate?: DateTime;
  trackingNumber: string;
};

export type UploadFileRequest = {
  data: any,
  fileName?: string;
  filePurpose: FilePurpose
};

export type VoidLabelRequest = {
  comments?: Text;
  labelId: string
};

export type SearchReturnParams = {
  creation_date_range_from?: string;
  creation_date_range_to?: string;
  item_id?: string;
  limit?: number;
  offset?: number;
  order_id?: string;
  return_id?: string;
  return_state?: Token;
  role?: Token;
  sort?: ReturnCountFilter;
  states?: ReturnState;
  transaction_id?: string
};

export type DecideReturnRequest = {
  comments?: Text;
  decision: Decision;
  keepOriginalItem?: boolean;
  partialRefundAmount?: Amount;
  RMANumber?: string;
  rMAProvided?: boolean;
};

export type CategoryType = {
  default?: boolean
  name: CategoryTypeEnum
}

export type TimeDuration = {
  unit: TimeDurationUnit
  value: number
}

export type Region = {
  regionName: string
  regionType?: RegionType
}

export type RegionSet = {
  regionExcluded?: Region[]
  regionIncluded?: Region[]
}

export type ShippingService = {
  additionalShippingCost?: Amount
  buyerResponsibleForPickup?: boolean
  buyerResponsibleForShipping?: boolean
  cashOnDeliveryFee?: Amount
  freeShipping?: boolean
  shippingCarrierCode?: string
  shippingCost?: Amount
  shippingServiceCode?: string
  shipToLocations?: RegionSet
  sortOrder?: number
  surcharge?: Amount
}

export type ShippingOption = {
  costType: ShippingCostType
  insuranceFee?: Amount
  insuranceOffered?: boolean
  optionType: ShippingOptionType
  packageHandlingCost?: Amount
  rateTableId?: string
  shippingServices: ShippingService[]
}

export type FulfillmentPolicyRequest = {
  categoryTypes: CategoryType[]
  description?: string
  freightShipping?: boolean
  globalShipping?: boolean
  handlingTime: TimeDuration
  localPickup?: boolean
  marketplaceId: MarketplaceId
  name: string
  pickupDropOff?: boolean
  shippingOptions?: ShippingOption[]
  shipToLocations?: RegionSet
}

export type RecipientAccountReference = {
  referenceId: string
  referenceType: RecipientAccountReferenceType
}

export type PaymentMethod = {
  brands?: string[]
  paymentMethodType?: PaymentMethodType
  recipientAccountReference?: RecipientAccountReference
}

export type Deposit = {
  amount?: Amount
  dueIn?: TimeDuration
  paymentMethods: PaymentMethod[]
}

export type PaymentPolicyRequest = {
  categoryTypes: CategoryType[]
  deposit?: Deposit
  description?: string
  fullPaymentDueIn?: TimeDuration
  immediatePay?: boolean
  marketplaceId: MarketplaceId
  name: string
  paymentInstructions?: string
  paymentMethods?: PaymentMethod[]
}

export type InternationalReturnOverrideType = {
  returnMethod?: ReturnMethod
  returnPeriod?: TimeDuration
  returnsAccepted?: boolean
  returnShippingCostPayer?: ReturnShippingCostPayer
}

export type ReturnPolicyRequest = {
  categoryTypes?: CategoryType[]
  description?: string
  extendedHolidayReturnsOffered?: boolean
  internationalOverride?: InternationalReturnOverrideType
  marketplaceId: MarketplaceId
  name: string
  refundMethod?: ReturnMethod
  restockingFeePercentage?: string
  returnInstructions?: string
  returnMethod?: ReturnMethod
  returnPeriod?: TimeDuration
  returnsAccepted: boolean
  returnShippingCostPayer?: ReturnShippingCostPayer
}

export type SalesTaxBase = {
  salesTaxPercentage: string
  shippingAndHandlingTaxed: boolean
}

export type LineItemReference = {
  lineItemId: string
  quantity?: number
}

export type ShippingFulfillmentDetails = {
  lineItems: LineItemReference[]
  shippedDate?: string
  shippingCarrierCode: string
  trackingNumber: string
}

export type SellInventoryItem = {
  availability: Availability
  condition: Condition
  conditionDescription?: string
  packageWeightAndSize?: PackageWeightAndSize
  product: Product
}

export type ProductFamilyProperties = {
  make: string
  model: string
  year: string
  trim?: string
  engine?: string
}

export type ProductIdentifier = {
  epid?: string
  gtin?: string
  ktype?: string
}

export type NameValueList = {
  name: string
  value: string
}

export type CompatibleProduct = {
  compatibilityProperties?: NameValueList[]
  productFamilyProperties?: ProductFamilyProperties
  productIdentifier?: ProductIdentifier
  notes?: string
}

export type Compatibility = {
  compatibleProducts: CompatibleProduct[]
}

export type Specification = {
  name: string
  values: string[]
}

export type VariesBy = {
  aspectsImageVariesBy: string[]
  specifications: Specification[]
}

export type InventoryItemGroup = {
  aspects: any
  description: string
  inventoryItemGroupKey: string
  imageUrls: string[]
  subtitle?: string
  title: string
  variantSKUs: string[]
  variesBy: VariesBy
}

export type CampaignCriterion = {
  autoSelectFutureInventory: boolean
  criterionType: string
  selectionRules: SelectionRule[]
}

export type CreateCampaignRequest = {
  campaignCriterion: CampaignCriterion
  campaignName: string
  endDate: string
  fundingStrategy: FundingStrategy
  marketplaceId: MarketplaceId
  startDate: string
}

export type InventoryReference = {
  inventoryReferenceId?: string
  inventoryReferenceType?: string
}

export type CreateReportTask = {
  campaignIds: string[]
  dateFrom: string
  dateTo: string
  dimensions: Dimension[]
  inventoryReferences?: InventoryReference
  listingIds: string[]
  marketplaceId: MarketplaceId
  metricKeys: string[]
  reportFormat: string
  reportType: string
}

export type SellFeedParams = {
  dateRange?: string
  feedType?: string
  limit?: string
  lookBackDays?: string
  offset?: string
  scheduleId?: string
}

export type MarketingInsightsSearchParams = {
  aspectFilter?: string
  categoryIds?: string
  epid?: string
  fieldgroups?: string
  filter?: string
  gtin?: string
  limit?: string
  offset?: string
  q?: string
  sort?: string
}

export type NotificationParams = {
  limit?: string
  continuationToken?: string
}

export type SubscriptionPayloadDetail = {
  format: string
  schemaVersion: string
  deliveryProtocol: string
}

export type CreateSubscriptionRequest = {
  topicId: string
  status: string
  payload: SubscriptionPayloadDetail
  destinationId: string
}

export type UpdateSubscriptionRequest = Omit<CreateSubscriptionRequest, 'topicId'>

export type DeliveryConfig = {
  endpoint: string
  verificationToken: string
}

export type DestinationRequest = {
  name: string
  status: string
  deliveryConfig: DeliveryConfig
}

export type NotificationConfig = {
  alertEmail: string
}

export type ItemsParams = {
  itemIds: string
  itemGroupIds: string
}

export type SuppressViolationRequest = {
  complianceType: string
  listingId: string
}