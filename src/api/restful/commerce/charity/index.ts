import Restful from '../../';

/**
 * The Charity API allows third-party developers to search for and access details on supported charitable organizations.
 */
export default class Charity extends Restful {
  get basePath(): string {
    return '/commerce/charity/v1';
  }

  /**
   * This call is used to retrieve detailed information about supported charitable organizations.
   *
   * @param charityOrgId The unique ID of the charitable organization.
   * @param marketplaceId A header used to specify the eBay marketplace ID. Valid Values: EBAY_GB and EBAY_US
   */
  public getCharityOrg(charityOrgId: string, marketplaceId: 'EBAY_GB' | 'EBAY_US',) {
    charityOrgId = encodeURIComponent(charityOrgId)
    return this.get(`/charity_org/${charityOrgId}`, {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      }
    });
  }

  /**
   * This call is used to retrieve detailed information about supported charitable organizations.
   *
   * @param marketplaceId A header used to specify the eBay marketplace ID. Valid Values: EBAY_GB and EBAY_US
   * @param limit The number of items, from the result set, returned in a single page. Valid Values: 1-100 Default: 20
   * @param offset The number of items that will be skipped in the result set.
   * @param q A query string that matches the keywords in name, mission statement, or description.
   * @param registrationIds A comma-separated list of charitable organization registration IDs.
   */
  public getCharityOrgs(marketplaceId: 'EBAY_GB' | 'EBAY_US', {
    limit,
    offset,
    q,
    registrationIds
  }: { limit?: string, offset?: string, q?: string, registrationIds?: string }) {
    return this.get(`/charity_org`, {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      },
      params: {
        limit,
        offset,
        q,
        registration_ids: registrationIds
      }
    });
  }

  /**
   * This call allows users to retrieve the details for a specific charitable organization using its legacy charity ID, which has also been referred to as the charity number, external ID, and PayPal Giving Fund ID.
   *
   * @param marketplaceId A header used to specify the eBay marketplace ID. Valid Values: EBAY_GB and EBAY_US
   * @param legacyCharityOrgId The legacy ID of the charitable organization.
   */
  public getCharityOrgByLegacyId(legacyCharityOrgId: string, marketplaceId: 'EBAY_GB' | 'EBAY_US',) {
    return this.get(`/charity_org/get_charity_org_by_legacy_id`, {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      },
      params: {
        legacy_charity_org_id: legacyCharityOrgId
      }
    });
  }
}
