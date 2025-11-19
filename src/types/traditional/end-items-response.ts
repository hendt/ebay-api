// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/EndItems.html#Output
import type { StandardOutputFields } from './common.js';

export interface EndItemsResponse extends StandardOutputFields {
  EndItemResponseContainer: {
    CorrelationID?: string;
    EndTime: string;
    Errors?: {
      ErrorClassification?: 'CustomCode' | 'RequestError' | 'SystemError';
      ErrorCode?: string;
      ErrorParameters?: {
        Value?: string;
      };
      LongMessage?: string;
      SeverityCode?: 'CustomCode' | 'Error' | 'Warning';
      ShortMessage?: string;
    };
  };
}
