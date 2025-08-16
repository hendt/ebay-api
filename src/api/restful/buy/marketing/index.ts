import {
  BuyMarketingGetMerchandisedProductsParams
} from '../../../../types/index.js';
import {operations} from '../../../../types/restful/specs/buy_marketing_v1_beta_oas3.js';
import Restful, {OpenApi} from '../../index.js';

/**
 * The Marketing API retrieves eBay products based on a metric, such as Best Selling, as well as products that were
 * also bought and also viewed.
 */
export default class Marketing extends Restful implements OpenApi<operations> {

  static id = 'Marketing';

  get basePath(): string {
    return '/buy/marketing/v1_beta';
  }

  //
  // Marketing
  // Client Credentials: https://api.ebay.com/oauth/api_scope/buy.marketing
  //

  /**
   * This call returns an array of products based on the category and metric specified.
   *
   * @param params
   */
  public getMerchandisedProducts(params: BuyMarketingGetMerchandisedProductsParams) {
    return this.get(`/merchandised_product`, {
      params
    });
  }
}
