// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetStore.html#Output
import type { StandardOutputFields } from './common.js';

export interface GetStoreResponse extends StandardOutputFields {
  Store: {
    CustomCategories: {
      CustomCategory: {
        CategoryID: bigint;
        ChildCategory: {
          CategoryID: bigint;
          ChildCategory: {
            CategoryID?: bigint;
            ChildCategory?: any;
            Name?: string;
            Order?: number;
          };
          Name: string;
          Order: number;
        };
        Name: string;
        Order: number;
      };
    };
    Description: string;
    LastOpenedTime?: string;
    Logo?: {
      URL?: string;
    };
    Name: string;
    URL?: string;
    URLPath?: string;
  };
}
