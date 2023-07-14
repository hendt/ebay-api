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

export type ItemsParams = {
  itemIds: string
  itemGroupIds: string
}

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

export type CatalogSearchParams = {
  aspect_filter?: string,
  category_ids?: string,
  fieldgroups?: string,
  gtin?: string,
  limit?: number,
  offset?: number,
  q?: string,
};

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
  role?: UserRoleFilter; // default SELLER
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
  cancelReason?: CancelReason,
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

export type Address = {
  addressLine1?: string,
  addressLine2?: string,
  addressType?: string,
  city?: string,
  country?: CountryCode,
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
  carrier?: ShippingCarrier;
  comments?: Text;
  itemId: string;
  reason?: ReturnReason;
  requestType: RequestType;
  returnQuantity?: number;
  transactionId: string;
  type?: ReturnType
};

export type CreateReturnRequest = {
  draftId?: string,
  returnRequest: ReturnRequestType
};

export type Amount = {
  convertedFromCurrency?: CurrencyCode,
  convertedFromValue?: number,
  currency?: CurrencyCode,
  value: string
};

export type DecideReturnRequest = {
  comments?: Text;
  decision: Decision;
  keepOriginalItem?: boolean;
  partialRefundAmount?: Amount;
  RMANumber?: string;
  rMAProvided?: boolean;
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

export type MarkAsShippedRequest = {
  carrierEnum?: ShippingCarrier;
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

export type SetReturnCreationSessionRequest = {
  returnRequest: ReturnRequestType
};

export type UpdateTrackingRequest = {
  newCarrierEnum?: ShippingCarrier;
  newCarrierName?: string;
  newTrackingNumber?: string;
  usedCarrierEnum?: ShippingCarrier;
  usedCarrierName?: string;
  usedTrackingNumber?: string;
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
