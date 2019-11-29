import Api from '../../';

enum Metric {
    CLICK_THROUGH_RATE,
    LISTING_IMPRESSION_STORE,
    LISTING_IMPRESSION_TOTAL,
    LISTING_VIEWS_SOURCE_DIRECT,
    LISTING_VIEWS_SOURCE_OFF_EBAY,
    LISTING_VIEWS_SOURCE_OTHER_EBAY,
    LISTING_VIEWS_SOURCE_SEARCH_RESULTS_PAGE,
    LISTING_VIEWS_SOURCE_STORE,
    LISTING_VIEWS_TOTAL,
    SALES_CONVERSION_RATE,
    TRANSACTION
}

/**
 * The Analytics API provides information about a seller's business performance.
 */
export default class Analytics extends Api {
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
        const p = encodeURIComponent(program);
        const c = encodeURIComponent(cycle);
        return this.get(`/seller_standards_profile/${p}/${c}`);
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
}
