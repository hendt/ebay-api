import Restful from '../../';
import {FindListingRecommendationRequest} from '../../../../types';

/**
 * The <b>Recommendation API</b> returns information that sellers can use to optimize the configuration of their
 * listings on eBay.
 */
export default class Recommendation extends Restful {

  static id = 'Recommendation';

  get basePath(): string {
    return '/sell/recommendation/v1';
  }

  /**
   * The find method returns recommendations and information that sellers can use to optimize their listing
   * configurations.
   *
   * @param filter Provide a list of key-value pairs to specify the criteria you want to use to filter the response.
   * @param limit Use this query parameter to set the maximum number of ads to return on a page from the paginated
   *     response. Default: 10 Maximum: 500
   * @param offset Specifies the number of ads to skip in the result set before returning the first ad in the
   *     paginated response.
   * @param body FindListingRecommendationRequest
   */
  public findListingRecommendations({filter, limit, offset}: { filter?: string, limit?: number, offset?: number } = {},
    body?: FindListingRecommendationRequest
  ) {
    return this.post(`/find`, {
      data: body,
      params: {
        filter,
        limit,
        offset
      }
    });
  }
}
