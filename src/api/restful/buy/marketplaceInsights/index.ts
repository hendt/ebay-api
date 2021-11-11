import Restful from '../../';
import {MarketingInsightsSearchParams} from '../../../../types';

/**
 * (Limited Release) The Marketplace Insights API provides the ability to search for sold items on eBay by keyword,
 * GTIN, category, and product and returns the of sales history of those items.
 */
export default class MarketplaceInsights extends Restful {

  static id = 'MarketplaceInsights';

  get basePath(): string {
    return '/buy/marketplace_insights/v1_beta';
  }

  /**
   * (Limited Release) This method searches for sold eBay items by various URI query parameters and retrieves the sales
   * history of the items for the last 90 days. You can search by keyword, category, eBay product ID (ePID), or GTIN,
   * or a combination of these.
   *
   * @param itemId
   * @param aspectFilter This field lets you filter by item aspects.
   * @param categoryIds The category ID is required and is used to limit the results.
   * @param epid The ePID is the eBay product identifier of a product from the eBay product catalog.
   * @param fieldgroups This field lets you control what is to be returned in the response and accepts a comma separated list of values.
   * @param filter This field supports multiple field filters that can be used to limit/customize the result set.
   * @param gtin This field lets you search by the Global Trade Item Number of the item as defined by https://www.gtin.info.
   * @param limit The number of items, from the result set, returned in a single page.
   * @param offset Specifies the number of items to skip in the result set.
   * @param q A string consisting of one or more keywords that are used to search for items on eBay.
   * @param sort This field specifies the order and the field name to use to sort the items.
   */
  public search({
    aspectFilter,
    categoryIds,
    epid,
    fieldgroups,
    filter,
    gtin,
    limit,
    offset,
    q,
    sort,
  }: MarketingInsightsSearchParams) {
    return this.get(`/item_sales/search`, {
      params: {
        aspect_filter: aspectFilter,
        category_ids: categoryIds,
        epid,
        fieldgroups,
        filter,
        gtin,
        limit,
        offset,
        q,
        sort,
      }
    });
  }
}
