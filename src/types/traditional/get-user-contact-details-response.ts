// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetUserContactDetails.html#Output
import type { CountryCodeType, StandardOutputFields } from './common.js';

export interface GetUserContactDetailsResponse extends StandardOutputFields {
  ContactAddress: {
    CityName?: string;
    CompanyName: string;
    Country: CountryCodeType;
    Name: string;
    Phone: string;
    StateOrProvince?: string;
  };
  RegistrationDate: string;
  UserID: string;
}
