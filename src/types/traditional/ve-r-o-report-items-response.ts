// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/VeROReportItems.html#Output
import type { StandardOutputFields } from './common.js';

export interface VeROReportItemsResponse extends StandardOutputFields {
  VeROReportPacketStatus?:
    | 'CustomCode'
    | 'InProcess'
    | 'Processed'
    | 'Received';
}
