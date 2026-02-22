// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetTaxTable.html#Output
import type { StandardOutputFields } from './common.js';

export interface GetTaxTableResponse extends StandardOutputFields {
  TaxTable: {
    TaxJurisdiction?: {
      JurisdictionID?: string;
      SalesTaxPercent?: number;
      ShippingIncludedInTax?: boolean;
    };
  };
}
