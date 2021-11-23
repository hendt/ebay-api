import Restful from '../../';
import {Metric} from '../../../../enums';

/**
 * The Analytics API provides information about a seller's business performance.
 */
export default class Analytics extends Restful {

  static id = 'Analytics';

  get basePath(): string {
    return '/sell/analytics/v1';
  }

  /**
   * This call retrieves all the profiles for the associated seller.
   */
  public findSellerStandardsProfiles() {
    return this.get(`/seller_standards_profile`);
  }

  /**
   * This call retrieves seller's profiles based on a program or cycle.
   *
   * @param program Specifies the program of the requested profile.
   * @param cycle Specifies the cycle of the requested profile.
   */
  public getSellerStandardsProfile(program: string, cycle: string) {
    program = encodeURIComponent(program);
    cycle = encodeURIComponent(cycle);
    return this.get(`/seller_standards_profile/${program}/${cycle}`);
  }

  /**
   * This call returns a report that details the user-traffic a seller's listings receives.
   *
   * @param dimension Specifies the basis of the report data.
   * @param filter Limits the report data returned.
   * @param metric Specifies a comma separated list of the metrics you want included in the report.
   * @param sort Specifies a single metric to be sorted and whether you want to sort in ascending or descending order.
   */
  public getTrafficReport({dimension, filter, metric, sort}:
                            { dimension?: string, filter?: string, metric?: Metric, sort?: string } = {}) {
    return this.get(`/traffic_report`, {
      params: {
        dimension,
        filter,
        metric,
        sort
      }
    });
  }

  /**
   * Use this method to retrieve a seller's performance and rating for the customer service metric.
   *
   * @param customerServiceMetricType Use this path parameter to specify the type of customer service metrics and benchmark data you want returned for the seller.
   * @param evaluationType Use this query parameter to specify the Marketplace ID to evaluate for the customer service metrics and benchmark data.
   */
  public getCustomerServiceMetric(customerServiceMetricType: string, evaluationType: string) {
    return this.get(`/customer_service_metric/${customerServiceMetricType}/${evaluationType}`);
  }
}
