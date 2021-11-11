import Restful from '../../';
import {BuyFeedParams} from '../../../../types';

/**
 * The Feed API provides the ability to download TSV_GZIP feed files containing eBay items and an hourly snapshot file
 * of the items that have changed within an hour for a specific category, date and marketplace.
 */
export default class Feed extends Restful {

  static id = 'Feed';

  get basePath() {
    return '/buy/feed/v1_beta';
  }

  /**
   * This method lets you download a TSV_GZIP (tab separated value gzip) Item feed file.
   *
   * @param {BuyFeedParams} params
   * @param range his header specifies the range in bytes of the chunks of the gzip file being returned.
   *          Format: bytes=startpos-endpos For example, the following retrieves the first 10 MBs of the feed file.
   */
  public getItemFeed(params: BuyFeedParams, range: string) {
    return this.get(`/item`, {
      params,
      headers: {
        'Range': range
      }
    });
  }

  /**
   * This method lets you download a TSV_GZIP (tab separated value gzip) Item Group feed file.
   * @param {BuyFeedParams} params
   * @param range his header specifies the range in bytes of the chunks of the gzip file being returned.
   *          Format: bytes=startpos-endpos For example, the following retrieves the first 10 MBs of the feed file.
   */
  public getItemGroupFeed(params: BuyFeedParams, range: string) {
    return this.get(`/item_group`, {
      params,
      headers: {
        'Range': range
      }
    });
  }

  /**
   * The Hourly Snapshot feed file is generated each hour every day for all categories.
   *
   * @param {BuyFeedParams} params
   * @param {String} snapshotDate
   * @param range his header specifies the range in bytes of the chunks of the gzip file being returned.
   *          Format: bytes=startpos-endpos For example, the following retrieves the first 10 MBs of the feed file.
   */
  public getItemSnapshotFeed(params: BuyFeedParams, snapshotDate: string, range: string) {
    return this.get(`/item_snapshot`, {
      params: {
        ...params,
        snapshot_date: snapshotDate
      },
      headers: {
        'Range': range
      }
    });
  }

  /**
   * The Hourly Snapshot feed file is generated each hour every day for all categories.
   *
   * @param {BuyFeedParams} params
   * @param {String} snapshotDate
   * @param range his header specifies the range in bytes of the chunks of the gzip file being returned.
   *          Format: bytes=startpos-endpos For example, the following retrieves the first 10 MBs of the feed file.
   */
  public getProductFeed(params: BuyFeedParams, snapshotDate: string, range: string) {
    return this.get(`/product`, {
      params: {
        ...params,
        snapshot_date: snapshotDate
      },
      headers: {
        'Range': range
      }
    });
  }
}
