import Restful from '../../';
import {SuppressViolationRequest} from '../../../../types';

/**
 * Service for providing the compliance violations of seller account/listings
 */
export default class Compliance extends Restful {

  static id = 'Compliance';

  get basePath(): string {
    return '/sell/compliance/v1';
  }

  /**
   * This call returns listing violation counts for a seller.
   *
   * @param complianceType A user passes in one or more compliance type values through this query parameter.
   */
  public getListingViolationsSummary(complianceType?: string) {
    return this.get(`/listing_violation_summary`, {
      params: {
        compliance_type: complianceType
      }
    });
  }

  /**
   * This call returns specific listing violations for five different compliance types.
   *
   * @param complianceType A user passes in one or more compliance type values through this query parameter.
   * @param offset The first policy violation to return based on its position in the collection of listing
   *     violations.
   * @param listingId
   * @param limit This query parameter is used if the user wants to set a limit on the number of listing violations
   *     that are returned in the current result set.
   */
  public getListingViolations({complianceType, offset, listingId, limit}:
                                { complianceType?: string, offset?: number, listingId?: string, limit?: number } = {}) {
    return this.get(`/listing_violation`, {
      params: {
        compliance_type: complianceType,
        offset,
        listing_id: listingId,
        limit
      }
    });
  }

  /**
   * This call suppresses a listing violation for a specific listing. Only listing violations in the AT_RISK state (returned in the violations.complianceState field of the getListingViolations call) can be suppressed.
   *
   * @param body  SuppressViolationRequest
   */
  public suppressViolation(body: SuppressViolationRequest) {
    return this.post(`/suppress_listing_violation`, body);
  }
}
