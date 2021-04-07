import Restful from '../../';

/**
 * Enables a seller adding an ad or item on a Partner's site to automatically create an eBay listing draft using the item details from the Partner's site.
 */
export default class Listing extends Restful {
  get basePath(): string {
    return '/sell/listing/v1_beta';
  }

  /**
   * This call gives Partners the ability to create an eBay draft of a item for their seller using information from their site.
   *
   * @param contentLanguage Use this header to specify the natural language of the seller.
   * @param marketplaceId se this header to specify an eBay marketplace ID.
   * @param data The ItemDraft
   */
  public createItemDraft(contentLanguage: string, marketplaceId: string, data?: any) {
    return this.post(`/item_draft/`, data, {
      headers: {
        'Content-Language': contentLanguage,
        'X-EBAY-C-MARKETPLACE-ID': marketplaceId,
      }
    })
  }

}
