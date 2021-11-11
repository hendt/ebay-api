import Restful from '../../';
import {CatalogSearchParams} from '../../../../types';

/**
 * Use the Catalog API to search the eBay catalog for products on which to base a seller's item listing;
 */
export default class Catalog extends Restful {

  static id = 'Catalog';

  get basePath(): string {
    return '/commerce/catalog/v1_beta';
  }

  /**
   * Note: The three catalog change request methods in the Catalog API are deprecated, and are scheduled to be
   * decommissioned in Q1 of 2020.
   *
   * @param changeRequestId The unique identifier of the change request being requested.
   */
  public getChangeRequest(changeRequestId: string) {
    return this.get(`/change_request/${changeRequestId}`);
  }

  /**
   * Note: The three catalog change request methods in the Catalog API are deprecated, and are scheduled to be
   * decommissioned in Q1 of 2020.
   *
   * @param filter One or more comma-separated criteria for narrowing down the collection of change requests returned
   *     by this call.
   * @param limit The number of change requests to return. This is the result set, a subset of the full collection of
   *     change requests that match the filter criteria of this call.
   * @param offset The first change request to return based on its position in the returned collection of change
   *     requests.
   */
  public getChangeRequests({filter, limit, offset}: { filter?: string, limit?: number, offset?: number } = {}) {
    return this.get(`/change_request`, {
      params: {
        filter,
        limit,
        offset
      }
    });
  }

  /**
   * This call retrieves details of the catalog product identified by the eBay product identifier (ePID) specified in
   * the request.
   *
   * @param epid The ePID of the product being requested.
   */
  public getProduct(epid: string) {
    const e = encodeURIComponent(epid);
    return this.get(`/product/${e}`);
  }

  /**
   * This call searches for and retrieves summaries of one or more products in the eBay catalog that match the search
   * criteria provided by a seller.
   *
   * @param params SearchCatalogParams
   */
  public search(params?: CatalogSearchParams) {
    return this.get(`/product_summary/search`, {
      params: {
        ...(params && params)
      }
    });
  }

  /**
   * This call retrieves an array of all supported aspects, aspect constraints, and aspect values for the specified
   * catalog product and its associated or suggested categories, as well as the values currently associated with that
   * product.
   *
   * @param epid The unique eBay product identifier of the catalog product that you want to update.
   * @param acceptLanguage This request header sets the natural language that will be provided in the field values of
   *     the response payload.
   * @param otherApplicableCategoryIds Use only if you are also including the primary_category_id parameter in the
   *     request.
   * @param primaryCategoryId Use only if the seller believes this product is associated with the wrong primary
   *     category.
   * @param marketplaceId Use this header to specify the eBay marketplace identifier.
   */
  public getProductMetadata(epid: string,
                            {otherApplicableCategoryIds, primaryCategoryId}: {
                              otherApplicableCategoryIds?: string,
                              primaryCategoryId?: string,
                            } = {}) {
    return this.get(`/get_product_metadata`, {
      params: {
        epid,
        other_applicable_category_ids: otherApplicableCategoryIds,
        primary_category_id: primaryCategoryId
      }
    });
  }

  /**
   * This call retrieves an array of all supported aspects, aspect constraints, and aspect values for the specified
   * eBay categories.
   *
   * @param primaryCategoryId The unique identifier of the primary eBay category for which you will retrieve product
   *     aspects.
   * @param otherApplicableCategoryIds A string of comma-separated category IDs.
   */
  public getProductMetadataForCategories(primaryCategoryId: string, otherApplicableCategoryIds?: string) {
    return this.get(`/get_product_metadata_for_categories`, {
      params: {
        primary_category_id: primaryCategoryId,
        other_applicable_category_ids: otherApplicableCategoryIds
      }
    });
  }
}
