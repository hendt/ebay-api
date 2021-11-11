import Restful from '../../';

/**
 * The <b>Negotiations API</b> gives sellers the ability to proactively send discount offers to buyers who have shown an "interest" in their listings.
 */
export default class Negotiation extends Restful {

  static id = 'Negotiation';

  get basePath(): string {
    return '/sell/negotiation/v1';
  }

  /**
   * This method evaluates a seller's current listings and returns the set of IDs that are eligible for a seller-initiated discount offer to a buyer.
   *
   * @param limit This query parameter specifies the maximum number of items to return from the result set on a page in the paginated response.
   * @param offset This query parameter specifies the number of results to skip in the result set before returning the first result in the paginated response.
   */
  public findEligibleItems({limit, offset}: { limit?: string, offset?: string } = {}) {
    return this.get(`/find_eligible_items`, {
      params: {
        limit,
        offset
      }
    })
  }

  /**
   * This method sends eligible buyers offers to purchase items in a listing at a discount.
   *
   * @param data The CreateOffersRequest
   */
  public sendOfferToInterestedBuyers(data: any) {
    return this.post(`/send_offer_to_interested_buyers`, data)
  }
}
