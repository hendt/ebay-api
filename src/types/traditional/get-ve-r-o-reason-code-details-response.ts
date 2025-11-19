// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetVeROReasonCodeDetails.html#Output
import type { StandardOutputFields } from './common.js';

export interface GetVeROReasonCodeDetailsResponse extends StandardOutputFields {
  VeROReasonCodeDetails: {
    VeROSiteDetail: {
      ReasonCodeDetail: {
        BriefText: string;
        DetailedText: string;
      };
      Site:
        | 'Australia'
        | 'Austria'
        | 'Belgium_Dutch'
        | 'Belgium_French'
        | 'Canada'
        | 'CanadaFrench'
        | 'CustomCode'
        | 'Cyprus'
        | 'Czechia'
        | 'eBayMotors'
        | 'France'
        | 'Germany'
        | 'HongKong'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Malaysia'
        | 'Netherlands'
        | 'Philippines'
        | 'Poland'
        | 'Russia'
        | 'Singapore'
        | 'Spain'
        | 'Switzerland'
        | 'UK'
        | 'US';
    };
  };
}
