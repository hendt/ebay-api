import Restful from '../../';
import {AlsoBoughtByProductParams, AlsoViewedByProductParams, MerchandisedProductsParams} from '../../../../types';

/**
 * The Marketing API retrieves eBay products based on a metric, such as Best Selling, as well as products that were
 * also bought and also viewed.
 */
export default class Marketing extends Restful {

  static id = 'Marketing';

  get basePath(): string {
    return '/buy/marketing/v1_beta';
  }

  //
  // Marketing
  // Client Credentials: https://api.ebay.com/oauth/api_scope/buy.marketing
  //

  /**
   * This call returns products that were also bought when shoppers bought the product specified in the request.
   * @param params
   */
  public getAlsoBoughtByProduct(params: AlsoBoughtByProductParams) {
    return this.get(`/merchandised_product/get_also_bought_products`, {
      params
    });
  }

  /**
   * This call returns products that were also viewed when shoppers viewed the product specified in the request.
   *
   * @param params
   */
  public getAlsoViewedByProduct(params: AlsoViewedByProductParams) {
    return this.get(`/merchandised_product/get_also_viewed_products`, {
      params
    });
  }

  /**
   * This call returns an array of products based on the category and metric specified.
   *
   * @param params
   */
  public getMerchandisedProducts(params: MerchandisedProductsParams) {
    return this.get(`/merchandised_product`, {
      params
    });
  }
}
