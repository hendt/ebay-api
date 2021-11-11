import Restful from '../../';

/**
 * This method retrieves the call limit and utilization data for an application.
 */
export default class Analytics extends Restful {

  static id = 'Analytics';

  get basePath(): string {
    return '/developer/analytics/v1_beta';
  }

  /**
   * This method retrieves the call limit and utilization data for an application.
   *
   * @param apiContext This optional query parameter filters the result to include only the specified API context.
   * @param apiName This optional query parameter filters the result to include only the APIs specified.
   */
  public getRateLimits(apiContext: string, apiName: string) {
    return this.get(`/rate_limit/`, {
      params: {
        api_context: apiContext,
        api_name: apiName
      }
    });
  }

  /**
   * This method retrieves the call limit and utilization data for an application user.
   *
   * @param apiContext This optional query parameter filters the result to include only the specified API context.
   * @param apiName This optional query parameter filters the result to include only the APIs specified.
   */
  public getUserRateLimits(apiContext: string, apiName: string) {
    return this.get(`/user_rate_limit/`, {
      params: {
        api_context: apiContext,
        api_name: apiName
      }
    });
  }
}
