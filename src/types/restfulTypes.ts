import {
  CancelReason,
  CaseSearchFieldGroup,
  CaseStatusFilter,
  CountryCode,
  CurrencyCode,
  Decision,
  EscalateReason,
  FilePurpose,
  InquirySearchFieldGroup,
  InquiryStatusFilter,
  RefundFeeType,
  RequestType,
  ReturnCountFilter,
  ReturnReason,
  ReturnState,
  ReturnType,
  ShippingCarrier,
  UserRoleFilter
} from '../enums/index.js';
import {components as buyBrowse, operations as buyBrowseOperations} from './restful/specs/buy_browse_v1_oas3.js';
import {operations as buyMarketingOperations} from './restful/specs/buy_marketing_v1_beta_oas3.js';
import {components as buyOffer} from './restful/specs/buy_offer_v1_beta_oas3.js';
import {components as buyOrder} from './restful/specs/buy_order_v2_oas3.js';
import {operations as commerceCatalogOperations} from './restful/specs/commerce_catalog_v1_beta_oas3.js';
import {components as commerceMedia} from './restful/specs/commerce_media_v1_beta_oas3.js';
import {components as commerceNotification} from './restful/specs/commerce_notification_v1_oas3.js';
import {components as commerceTranslation} from './restful/specs/commerce_translation_v1_beta_oas3.js';

import {components as sellAccountV1} from './restful/specs/sell_account_v1_oas3.js';
import {components as sellAccountV2} from './restful/specs/sell_account_v2_oas3.js';
import {components as sellFeed} from './restful/specs/sell_feed_v1_oas3.js';
import {components as sellFulfillment} from './restful/specs/sell_fulfillment_v1_oas3.js';
import {components as sellInventory} from './restful/specs/sell_inventory_v1_oas3.js';
import {components as sellListing} from './restful/specs/sell_listing_v1_beta_oas3.js';
import {components as sellLogistics} from './restful/specs/sell_logistics_v1_oas3.js';
import {components as sellMarketing} from './restful/specs/sell_marketing_v1_oas3.js';
import {components as sellMetadata} from './restful/specs/sell_metadata_v1_oas3.js';
import {components as sellNegotiation} from './restful/specs/sell_negotiation_v1_oas3.js';
import {components as sellRecommendation} from './restful/specs/sell_recommendation_v1_oas3.js';

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

export type LegacyItemParams = {
  legacy_item_id: string,
  fieldgroups?: string,
  legacy_variation_id?: string,
  legacy_variation_sku?: string
};

export type BuyFeedParams = {
  feed_scope: string,
  category_id: string,
  date: string
};

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

export type SellFeedParams = {
  dateRange?: string
  feedType?: string
  limit?: string
  lookBackDays?: string
  offset?: string
  scheduleId?: string
}

export type PaymentParams = {
  orderId?: string
  buyerUsername?: string
  openDateFrom?: string
  openDateTo?: string
  paymentDisputeStatus?: string
  limit?: string
  offset?: string
}

//
// Post Order --
//
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
  role?: UserRoleFilter | `${UserRoleFilter}`; // default SELLER
  sort?: CancelSortField;
  transaction_id?: string;
};

export type DateTime = {
  formattedValue?: string, // reserver for future use
  value: string
};

export type ConfirmRefundRequest = {
  refundDate?: DateTime,
  unpaidOrder?: boolean
};

export type LineItem = {
  itemId: number,
  quantity: number,
  transactionId: number
};

export type CreateCancelRequest = {
  buyerPaid?: boolean,
  buyerPaidDate?: DateTime
  cancelReason?: CancelReason | `${CancelReason}`,
  legacyOrderId: string,
  relistLineItem?: LineItem[]
};

export type RejectCancelRequest = {
  shipmentDate?: DateTime,
  trackingNumber?: string
};

export type AppealRequest = {
  comments: Text
};

export type BuyerCloseCaseRequest = {
  closeReason: boolean,
  comments?: Text
};

export type CaseSearchParams = {
  case_creation_date_range_from: string;
  case_creation_date_range_to: string;
  case_status_filter: CaseStatusFilter | `${CaseStatusFilter}`;
  fieldgroups: CaseSearchFieldGroup | `${CaseSearchFieldGroup}`;
  item_id: string;
  limit: number;
  offset: number;
  order_id: string;
  return_id: string;
  sort: string;
  transaction_id: string;
};

export type Address = {
  addressLine1?: string,
  addressLine2?: string,
  addressType?: string,
  city?: string,
  country?: CountryCode | `${CountryCode}`,
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

export type Text = {
  content: string,
  language?: string,
  translatedFromContent?: string,
  translatedFromLanguage?: string
};

export type Token = string;  // A string with normalized whitespace (e.g., dropped leading and trailing spaces).

export type BuyerCloseInquiryRequest = {
  closeReason?: Token,
  comments?: Text
};

export type CheckInquiryEligibilityRequest = {
  itemId: string,
  transactionId: string
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
  fieldgroups?: InquirySearchFieldGroup | `${InquirySearchFieldGroup}`;
  inquiry_creation_date_range_from?: string;
  inquiry_creation_date_range_to?: string;
  inquiry_status?: InquiryStatusFilter | `${InquiryStatusFilter}`;
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

export type CheckEligibilityRequest = {
  checkTypes: Token[];
  itemId: string;
  reason: Token;
  returnQuantity?: number;
  transactionId: string;
};

export type CloseReturnRequest = {
  buyerCloseReason?: Token,
  comments?: Text
};

export type ReturnRequestType = {
  carrier?: ShippingCarrier | `${ShippingCarrier}`;
  comments?: Text;
  itemId: string;
  reason?: ReturnReason | `${ReturnReason}`;
  requestType: RequestType | `${RequestType}`;
  returnQuantity?: number;
  transactionId: string;
  type?: ReturnType | `${ReturnType}`
};

export type CreateReturnRequest = {
  draftId?: string,
  returnRequest: ReturnRequestType
};

export type Amount = {
  convertedFromCurrency?: CurrencyCode | `${CurrencyCode}`,
  convertedFromValue?: number,
  currency?: CurrencyCode | `${CurrencyCode}`,
  value: string
};

export type DecideReturnRequest = {
  comments?: Text;
  decision: Decision | `${Decision}`;
  keepOriginalItem?: boolean;
  partialRefundAmount?: Amount;
  RMANumber?: string;
  rMAProvided?: boolean;
};

export type EscalateRequest = {
  comments: Text;
  reason: EscalateReason | `${EscalateReason}`
};

export type GetEstimateRequest = {
  itemId: string,
  reason?: ReturnReason | `${ReturnReason}`,
  returnQuantity?: number;
  transactionId: string;
};

export type MarkAsReceivedRequest = {
  comments?: Text
};

export type MarkAsShippedRequest = {
  carrierEnum?: ShippingCarrier | `${ShippingCarrier}`;
  carrierName?: string;
  carrierUsed?: string;
  comments?: Text;
  shippedDate?: DateTime;
  trackingNumber: string;
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

export type Comments = {
  content: string,
  language?: string,
  translatedFromContent?: string,
  translatedFromLanguage?: string
}

export type PostOrderItemizedRefundDetailType = {
  refundAmount: Amount,
  refundFeeType: RefundFeeType | `${RefundFeeType}`,
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

export type ProvideLabelRequest = {
  carrierEnum?: ShippingCarrier | `${ShippingCarrier}`,
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
  sort?: ReturnCountFilter | `${ReturnCountFilter}`;
  states?: ReturnState | `${ReturnState}`;
  transaction_id?: string
};

export type SetReturnCreationSessionRequest = {
  returnRequest: ReturnRequestType
};

export type UpdateTrackingRequest = {
  newCarrierEnum?: ShippingCarrier | `${ShippingCarrier}`;
  newCarrierName?: string;
  newTrackingNumber?: string;
  usedCarrierEnum?: ShippingCarrier | `${ShippingCarrier}`;
  usedCarrierName?: string;
  usedTrackingNumber?: string;
};

export type UploadFileRequest = {
  data: any,
  fileName?: string;
  filePurpose: FilePurpose | `${FilePurpose}`
};

export type VoidLabelRequest = {
  comments?: Text;
  labelId: string
};

// OpenApi
export type CreateSubscriptionRequest = commerceNotification['schemas']['CreateSubscriptionRequest']
export type UpdateSubscriptionRequest = commerceNotification['schemas']['UpdateSubscriptionRequest']
export type DestinationRequest = commerceNotification['schemas']['DestinationRequest']
export type CommerceNotificationConfig = commerceNotification['schemas']['Config']

export type TranslateRequest = commerceTranslation['schemas']['TranslateRequest']

export type CommerceCatalogSearchParams = commerceCatalogOperations['search']['parameters']['query']

export type CreateVideoRequest = commerceMedia['schemas']['CreateVideoRequest'];
export type InputStream = commerceMedia['schemas']['InputStream'];

export type AttributeNameValue = buyBrowse['schemas']['AttributeNameValue']
export type CompatibilityPayload = buyBrowse['schemas']['CompatibilityPayload']
export type PlaceProxyBidRequest = buyOffer['schemas']['PlaceProxyBidRequest']
export type SearchByImageRequest = buyBrowse['schemas']['SearchByImageRequest']

export type BuyBrowseSearchParams = buyBrowseOperations['search']['parameters']['query'];
export type BuyBrowseSearchByImageParams = buyBrowseOperations['searchByImage']['parameters']['query'];
export type BuyBrowseGetItemsParams = buyBrowseOperations['getItems']['parameters']['query'];
export type BuyBrowseItemByLegacyIdParams = buyBrowseOperations['getItemByLegacyId']['parameters']['query'];

export type BuyMarketingGetMerchandisedProductsParams = buyMarketingOperations['getMerchandisedProducts']['parameters']['query'];

export type CreateGuestCheckoutSessionRequest = buyOrder['schemas']['CreateGuestCheckoutSessionRequestV2']
export type CheckoutSessionRequestWithoutPayment = buyOrder['schemas']['CreateGuestCheckoutSessionRequestV2'] // Mapped to v2 equivalent
export type CouponRequest = buyOrder['schemas']['CouponRequest']
export type CreateSignInCheckoutSessionRequest = buyOrder['schemas']['CreateGuestCheckoutSessionRequestV2'] // Mapped to v2 equivalent  
export type GuestPlaceOrderRequest = buyOrder['schemas']['CreateGuestCheckoutSessionRequestV2'] // Mapped to v2 equivalent
export type InitiatePaymentRequest = buyOrder['schemas']['CreateGuestCheckoutSessionRequestV2'] // Mapped to v2 equivalent
export type ShippingAddressImpl = buyOrder['schemas']['ShippingAddressImpl']
export type UpdatePaymentInformation = buyOrder['schemas']['CreateGuestCheckoutSessionRequestV2'] // Mapped to v2 equivalent
export type UpdateQuantity = buyOrder['schemas']['UpdateQuantity']
export type UpdateShippingOption = buyOrder['schemas']['UpdateShippingOption']


export type CustomPolicyCreateRequest = sellAccountV1['schemas']['CustomPolicyCreateRequest'];
export type CustomPolicyRequest = sellAccountV1['schemas']['CustomPolicyRequest'];
export type FulfillmentPolicyRequest = sellAccountV1['schemas']['FulfillmentPolicyRequest'];
export type FulfillmentSellAccountProgram = sellAccountV1['schemas']['Program'];
export type PaymentPolicyRequest = sellAccountV1['schemas']['PaymentPolicyRequest'];
export type ReturnPolicyRequest = sellAccountV1['schemas']['ReturnPolicyRequest'];
export type SalesTaxBase = sellAccountV1['schemas']['SalesTaxBase'];

export type RateTableUpdate = sellAccountV2['schemas']['RateTableUpdate'];
export type UpdatePayoutPercentageRequest = sellAccountV2['schemas']['UpdatePayoutPercentageRequest'];

export type LineItemReference = sellFulfillment['schemas']['LineItemReference'];
export type UpdateEvidencePaymentDisputeRequest = sellFulfillment['schemas']['UpdateEvidencePaymentDisputeRequest'];
export type RefundItem = sellFulfillment['schemas']['RefundItem'];
export type SimpleAmount = sellFulfillment['schemas']['SimpleAmount'];
export type AddEvidencePaymentDisputeRequest = sellFulfillment['schemas']['AddEvidencePaymentDisputeRequest'];
export type ContestPaymentDisputeRequest = sellFulfillment['schemas']['ContestPaymentDisputeRequest'];
export type IssueRefundRequest = sellFulfillment['schemas']['IssueRefundRequest'];
export type ShippingFulfillmentDetails = sellFulfillment['schemas']['ShippingFulfillmentDetails'];

export type BulkEbayOfferDetailsWithKeys = sellInventory['schemas']['BulkEbayOfferDetailsWithKeys']
export type BulkInventoryItem = sellInventory['schemas']['BulkInventoryItem']
export type BulkMigrateListing = sellInventory['schemas']['BulkMigrateListing']
export type BulkOffer = sellInventory['schemas']['BulkOffer']
export type BulkPriceQuantity = sellInventory['schemas']['BulkPriceQuantity']
export type Compatibility = sellInventory['schemas']['Compatibility']
export type EbayOfferDetailsWithId = sellInventory['schemas']['EbayOfferDetailsWithId']
export type EbayOfferDetailsWithKeys = sellInventory['schemas']['EbayOfferDetailsWithKeys']
export type InventoryItemGroup = sellInventory['schemas']['InventoryItemGroup']
export type InventoryLocation = sellInventory['schemas']['InventoryLocation']
export type InventoryLocationFull = sellInventory['schemas']['InventoryLocationFull']
export type OfferKeysWithId = sellInventory['schemas']['OfferKeysWithId']
export type PublishByInventoryItemGroupRequest = sellInventory['schemas']['PublishByInventoryItemGroupRequest']
export type WithdrawByInventoryItemGroupRequest = sellInventory['schemas']['WithdrawByInventoryItemGroupRequest']
export type InventoryItem = sellInventory['schemas']['InventoryItem']
export type LocationMapping = sellInventory['schemas']['LocationMapping']

export type BulkCreateAdRequest = sellMarketing['schemas']['BulkCreateAdRequest']
export type BulkCreateAdsByInventoryReferenceRequest = sellMarketing['schemas']['BulkCreateAdsByInventoryReferenceRequest']
export type BulkCreateKeywordRequest = sellMarketing['schemas']['BulkCreateKeywordRequest']
export type BulkCreateNegativeKeywordRequest = sellMarketing['schemas']['BulkCreateNegativeKeywordRequest']
export type BulkDeleteAdRequest = sellMarketing['schemas']['BulkDeleteAdRequest']
export type BulkDeleteAdsByInventoryReferenceRequest = sellMarketing['schemas']['BulkDeleteAdsByInventoryReferenceRequest']
export type BulkUpdateAdStatusByListingIdRequest = sellMarketing['schemas']['BulkUpdateAdStatusByListingIdRequest']
export type BulkUpdateAdStatusRequest = sellMarketing['schemas']['BulkUpdateAdStatusRequest']
export type BulkUpdateKeywordRequest = sellMarketing['schemas']['BulkUpdateKeywordRequest']
export type BulkUpdateNegativeKeywordRequest = sellMarketing['schemas']['BulkUpdateNegativeKeywordRequest']
export type CloneCampaignRequest = sellMarketing['schemas']['CloneCampaignRequest']
export type CreateAdGroupRequest = sellMarketing['schemas']['CreateAdGroupRequest']
export type CreateAdRequest = sellMarketing['schemas']['CreateAdRequest']
export type CreateAdsByInventoryReferenceRequest = sellMarketing['schemas']['CreateAdsByInventoryReferenceRequest']
export type CreateCampaignRequest = sellMarketing['schemas']['CreateCampaignRequest']
export type CreateKeywordRequest = sellMarketing['schemas']['CreateKeywordRequest']
export type CreateNegativeKeywordRequest = sellMarketing['schemas']['CreateNegativeKeywordRequest']
export type CreateReportTask = sellMarketing['schemas']['CreateReportTask']
export type ItemPriceMarkdown = sellMarketing['schemas']['ItemPriceMarkdown']
export type ItemPromotion = sellMarketing['schemas']['ItemPromotion']
export type TargetedBidRequest = sellMarketing['schemas']['TargetedBidRequest']
export type TargetedKeywordRequest = sellMarketing['schemas']['TargetedKeywordRequest']
export type UpdateAdGroupRequest = sellMarketing['schemas']['UpdateAdGroupRequest']
export type UpdateAdrateStrategyRequest = sellMarketing['schemas']['UpdateAdrateStrategyRequest']
export type UpdateBidPercentageRequest = sellMarketing['schemas']['UpdateBidPercentageRequest']
export type UpdateCampaignBudgetRequest = sellMarketing['schemas']['UpdateCampaignBudgetRequest']
export type UpdateCampaignIdentificationRequest = sellMarketing['schemas']['UpdateCampaignIdentificationRequest']
export type UpdateKeywordRequest = sellMarketing['schemas']['UpdateKeywordRequest']
export type UpdateNegativeKeywordRequest = sellMarketing['schemas']['UpdateNegativeKeywordRequest']
export type CreateEmailCampaignRequest = sellMarketing['schemas']['CreateEmailCampaignRequest']
export type UpdateCampaignRequest = sellMarketing['schemas']['UpdateCampaignRequest']
export type QuickSetupRequest = sellMarketing['schemas']['QuickSetupRequest']

export type FindListingRecommendationRequest = sellRecommendation['schemas']['FindListingRecommendationRequest']

// Commerce Media API types
export type CreateImageFromUrlRequest = commerceMedia['schemas']['CreateImageFromUrlRequest']
export type CreateDocumentRequest = commerceMedia['schemas']['CreateDocumentRequest']
export type CreateDocumentFromUrlRequest = commerceMedia['schemas']['CreateDocumentFromUrlRequest']

// Commerce Notification API types
export type CreateSubscriptionFilterRequest = commerceNotification['schemas']['CreateSubscriptionFilterRequest']

// Sell Feed API types
export type CreateOrderTaskRequest = sellFeed['schemas']['CreateOrderTaskRequest']
export type CreateInventoryTaskRequest = sellFeed['schemas']['CreateInventoryTaskRequest']
export type CreateUserScheduleRequest = sellFeed['schemas']['CreateUserScheduleRequest']
export type UpdateUserScheduleRequest = sellFeed['schemas']['UpdateUserScheduleRequest']
export type CreateTaskRequest = sellFeed['schemas']['CreateTaskRequest']
export type CreateServiceMetricsTaskRequest = sellFeed['schemas']['CreateServiceMetricsTaskRequest']

// Sell Listing API types
export type ItemDraft = sellListing['schemas']['ItemDraft']

// Sell Logistics API types
export type ShippingQuoteRequest = sellLogistics['schemas']['ShippingQuoteRequest']
export type CreateShipmentFromQuoteRequest = sellLogistics['schemas']['CreateShipmentFromQuoteRequest']

// Sell Marketing API types
export type SuggestMaxCpcRequest = sellMarketing['schemas']['SuggestMaxCpcRequest']
export type UpdateBiddingStrategyRequest = sellMarketing['schemas']['UpdateBiddingStrategyRequest']

// Sell Metadata API types
export type SpecificationRequest = sellMetadata['schemas']['SpecificationRequest']
export type PropertyNamesRequest = sellMetadata['schemas']['PropertyNamesRequest']
export type PropertyValuesRequest = sellMetadata['schemas']['PropertyValuesRequest']
export type MultiCompatibilityPropertyValuesRequest = sellMetadata['schemas']['MultiCompatibilityPropertyValuesRequest']
export type ProductRequest = sellMetadata['schemas']['ProductRequest']

// Sell Negotiation API types
export type CreateOffersRequest = sellNegotiation['schemas']['CreateOffersRequest']


