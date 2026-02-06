import {operations} from '../../../../types/restful/specs/sell_listing_v1_beta_oas3.js';
import Restful, {OpenApi} from '../../index.js';

/**
 * Enables a seller adding an ad or item on a Partner's site to automatically create an eBay listing draft using the item details from the Partner's site.
 */
export default class Listing extends Restful implements OpenApi<operations> {

  static id = 'Listing';

  get basePath(): string {
    return '/sell/listing/v1_beta';
  }

  /**
   * This call gives Partners the ability to create an eBay draft of a item for their seller using information from their site.
   *
   * @param data The ItemDraft
   */
  public createItemDraft(data?: any) {
    return this.post('/item_draft/', data);
  }

}
