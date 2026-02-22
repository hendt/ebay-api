import ClientAlertsCalls from '../api/traditional/clientAlerts/index.js';
import {Fields} from '../api/traditional/fields.js';
import FindingCalls from '../api/traditional/finding/index.js';
import MerchandisingCalls from '../api/traditional/merchandising/index.js';
import ShoppingCalls from '../api/traditional/shopping/index.js';
import TradingCalls from '../api/traditional/trading/index.js';
import {TraditionalApiConfig} from '../api/traditional/XMLRequest.js';
import * as TradingResponses from './traditional/index.js';

// Generic XMLApiCall type that accepts a response type
export type XMLApiCall<TResponse = any> = (fields?: Fields | null, apiConfig?: TraditionalApiConfig) => Promise<TResponse>;

// Type mapping for Trading API responses
export type TradingApiResponses = {
  AddFixedPriceItem: TradingResponses.AddFixedPriceItemResponse;
  AddItem: TradingResponses.AddItemResponse;
  AddItems: TradingResponses.AddItemsResponse;
  AddMemberMessageAAQToPartner: TradingResponses.AddMemberMessageAAQToPartnerResponse;
  AddMemberMessageRTQ: TradingResponses.AddMemberMessageRTQResponse;
  AddMemberMessagesAAQToBidder: TradingResponses.AddMemberMessagesAAQToBidderResponse;
  AddOrder: TradingResponses.AddOrderResponse;
  AddSecondChanceItem: TradingResponses.AddSecondChanceItemResponse;
  AddToItemDescription: TradingResponses.AddToItemDescriptionResponse;
  AddToWatchList: TradingResponses.AddToWatchListResponse;
  CompleteSale: TradingResponses.CompleteSaleResponse;
  DeleteMyMessages: TradingResponses.DeleteMyMessagesResponse;
  EndFixedPriceItem: TradingResponses.EndFixedPriceItemResponse;
  EndItems: TradingResponses.EndItemsResponse;
  FetchToken: TradingResponses.FetchTokenResponse;
  GetAccount: TradingResponses.GetAccountResponse;
  GetAdFormatLeads: TradingResponses.GetAdFormatLeadsResponse;
  GetAllBidders: TradingResponses.GetAllBiddersResponse;
  GetBestOffers: TradingResponses.GetBestOffersResponse;
  GetBidderList: TradingResponses.GetBidderListResponse;
  GetCategories: TradingResponses.GetCategoriesResponse;
  GetCategoryFeatures: TradingResponses.GetCategoryFeaturesResponse;
  GetDescriptionTemplates: TradingResponses.GetDescriptionTemplatesResponse;
  GetFeedback: TradingResponses.GetFeedbackResponse;
  GetItem: TradingResponses.GetItemResponse;
  GetItemsAwaitingFeedback: TradingResponses.GetItemsAwaitingFeedbackResponse;
  GetMemberMessages: TradingResponses.GetMemberMessagesResponse;
  GetMessagePreferences: TradingResponses.GetMessagePreferencesResponse;
  GetMyMessages: TradingResponses.GetMyMessagesResponse;
  GetSellerList: TradingResponses.GetSellerListResponse;
  GetSellerTransactions: TradingResponses.GetSellerTransactionsResponse;
  GetShippingDiscountProfiles: TradingResponses.GetShippingDiscountProfilesResponse;
  GetStore: TradingResponses.GetStoreResponse;
  GetTaxTable: TradingResponses.GetTaxTableResponse;
  GetTokenStatus: TradingResponses.GetTokenStatusResponse;
  GetUser: TradingResponses.GetUserResponse;
  GetUserContactDetails: TradingResponses.GetUserContactDetailsResponse;
  GetUserPreferences: TradingResponses.GetUserPreferencesResponse;
  GetVeROReasonCodeDetails: TradingResponses.GetVeROReasonCodeDetailsResponse;
  GetVeROReportStatus: TradingResponses.GetVeROReportStatusResponse;
  GeteBayDetails: TradingResponses.GeteBayDetailsResponse;
  PlaceOffer: TradingResponses.PlaceOfferResponse;
  RelistFixedPriceItem: TradingResponses.RelistFixedPriceItemResponse;
  RelistItem: TradingResponses.RelistItemResponse;
  RemoveFromWatchList: TradingResponses.RemoveFromWatchListResponse;
  RespondToBestOffer: TradingResponses.RespondToBestOfferResponse;
  RespondToFeedback: TradingResponses.RespondToFeedbackResponse;
  ReviseFixedPriceItem: TradingResponses.ReviseFixedPriceItemResponse;
  ReviseInventoryStatus: TradingResponses.ReviseInventoryStatusResponse;
  ReviseItem: TradingResponses.ReviseItemResponse;
  ReviseMyMessages: TradingResponses.ReviseMyMessagesResponse;
  ReviseMyMessagesFolders: TradingResponses.ReviseMyMessagesFoldersResponse;
  RevokeToken: TradingResponses.RevokeTokenResponse;
  SendInvoice: TradingResponses.SendInvoiceResponse;
  SetMessagePreferences: TradingResponses.SetMessagePreferencesResponse;
  SetNotificationPreferences: TradingResponses.SetNotificationPreferencesResponse;
  SetShippingDiscountProfiles: TradingResponses.SetShippingDiscountProfilesResponse;
  SetStoreCategories: TradingResponses.SetStoreCategoriesResponse;
  SetTaxTable: TradingResponses.SetTaxTableResponse;
  SetUserNotes: TradingResponses.SetUserNotesResponse;
  SetUserPreferences: TradingResponses.SetUserPreferencesResponse;
  UploadSiteHostedPictures: TradingResponses.UploadSiteHostedPicturesResponse;
  VeROReportItems: TradingResponses.VeROReportItemsResponse;
  VerifyAddFixedPriceItem: TradingResponses.VerifyAddFixedPriceItemResponse;
  VerifyAddItem: TradingResponses.VerifyAddItemResponse;
  VerifyAddSecondChanceItem: TradingResponses.VerifyAddSecondChanceItemResponse;
  VerifyRelistItem: TradingResponses.VerifyRelistItemResponse;
};

export type Trading = {
  [K in keyof typeof TradingCalls]: K extends keyof TradingApiResponses
    ? XMLApiCall<TradingApiResponses[K]>
    : XMLApiCall;
};

export type Shopping = {
  [key in keyof typeof ShoppingCalls]: XMLApiCall;
};

export type Finding = {
  [key in keyof typeof FindingCalls]: XMLApiCall;
};

export type ClientAlerts = {
  [key in keyof typeof ClientAlertsCalls]: (fields?: object, options?: TraditionalApiConfig) => Promise<any>;
};

export type Merchandising = {
  [key in keyof typeof MerchandisingCalls]: (fields?: object, options?: TraditionalApiConfig) => Promise<any>;
};

type Endpoint = {
  production: string,
  sandbox: string
};

export type TraditionalApi = {
  endpoint: Endpoint,
  xmlns: string,
  path: string,
  calls: typeof TradingCalls | typeof ShoppingCalls | typeof FindingCalls | typeof ClientAlertsCalls | typeof MerchandisingCalls,
  headers: (callName: string, accessToken?: string | null) => object
};
