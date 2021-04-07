import Restful from '../../';

/**
 * This API allows third-party developers to search for and retrieve details about eBay deals and events, as well as the items associated with those deals and events.
 */
export default class Deal extends Restful {

  get basePath(): string {
    return '/buy/deal/v1';
  }

  /**
   * This method retrieves a paginated set of deal items.
   *
   * @param marketplaceId A header used to specify the eBay marketplace ID.
   * @param categoryIds The unique identifier of the eBay category for the search.
   * @param commissionable A filter for commissionable deals. Restriction: This filter is currently only supported for the US marketplace.
   * @param deliveryCountry A filter for items that can be shipped to the specified country.
   * @param limit The maximum number of items, from the current result set, returned on a single page.
   * @param offset The number of items that will be skipped in the result set.
   */
  public getDealItems(marketplaceId: string, {
    categoryIds,
    commissionable,
    deliveryCountry,
    limit,
    offset
  }: { categoryIds?: string, commissionable?: string, deliveryCountry?: string, limit?: string, offset?: string }) {
    return this.get(`/deal_item`, {
      params: {
        category_ids: categoryIds,
        commissionable,
        delivery_country: deliveryCountry,
        limit,
        offset
      },
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      }
    });
  }

  /**
   * This method retrieves the details for an eBay event.
   *
   * @param eventId The unique identifier for the eBay event.
   * @param marketplaceId A header used to specify the eBay marketplace ID.
   */
  public getEvent(eventId: string, marketplaceId: string) {
    eventId = encodeURIComponent(eventId)
    return this.get(`/event/${eventId}`, {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      }
    });
  }

  /**
   * This method returns paginated results containing all eBay events for the specified marketplace.
   *
   * @param marketplaceId A header used to specify the eBay marketplace ID.
   * @param limit The maximum number of items, from the current result set, returned on a single page. Default: 20 Maximum Value: 100
   * @param offset The number of items that will be skipped in the result set.
   */
  public getEvents(marketplaceId: string, {limit, offset}: { limit?: string, offset?: string, }) {
    return this.get(`/event`, {
      params: {
        limit,
        offset
      },
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      }
    });
  }

  /**
   * This method returns paginated results containing all eBay events for the specified marketplace.
   *
   * @param eventIds The unique identifiers for the eBay events. Maximum Value: 1
   * @param categoryIds The unique identifier of the eBay category for the search. Maximum Value: 1
   * @param deliveryCountry A filter for items that can be shipped to the specified country.
   * @param marketplaceId A header used to specify the eBay marketplace ID.
   * @param limit The maximum number of items, from the current result set, returned on a single page. Default: 20 Maximum Value: 100
   * @param offset The number of items that will be skipped in the result set.
   */
  public getEventItems(eventIds: string, marketplaceId: string, {
    categoryIds,
    deliveryCountry,
    limit,
    offset
  }: { categoryIds?: string, deliveryCountry?: string, limit?: string, offset?: string, } = {}) {
    return this.get(`/event_item`, {
      params: {
        event_ids: eventIds,
        limit,
        offset,
        category_ids: categoryIds,
        delivery_country: deliveryCountry
      },
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId
      }
    });
  }
}
