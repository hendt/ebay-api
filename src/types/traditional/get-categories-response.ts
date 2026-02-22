// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetCategories.html#Output
import type { StandardOutputFields } from './common.js';

export interface GetCategoriesResponse extends StandardOutputFields {
  CategoryArray: {
    Category?: {
      AutoPayEnabled?: boolean;
      B2BVATEnabled?: boolean;
      BestOfferEnabled?: boolean;
      CategoryID: string;
      CategoryLevel: number;
      CategoryName: string;
      CategoryParentID: string;
      Expired: boolean;
      LSD: boolean;
      LeafCategory: boolean;
      ORPA: boolean;
      ORRA?: boolean;
      Virtual: boolean;
    };
  };
  CategoryCount: number;
  CategoryVersion: string;
  MinimumReservePrice: number;
  ReduceReserveAllowed: boolean;
  ReservePriceAllowed: boolean;
  UpdateTime: string;
}
