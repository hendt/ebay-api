// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/ReviseInventoryStatus.html#Output
import type { CurrencyCodeType, StandardOutputFields } from './common.js';

export interface ReviseInventoryStatusResponse extends StandardOutputFields {
  Fees: {
    Fee: {
      Fee: number | { value: number; currencyID: CurrencyCodeType };
      Name: string;
      PromotionalDiscount:
        | number
        | { value: number; currencyID: CurrencyCodeType };
    };
    ItemID: string;
  };
  InventoryStatus: {
    ItemID: string;
    SKU: string;
  };
}
