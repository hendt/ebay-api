import Restful from '../../';
import {
  BulkCreateAdRequest,
  BulkCreateAdsByInventoryReferenceRequest,
  BulkDeleteAdRequest,
  BulkDeleteAdsByInventoryReferenceRequest,
  CloneCampaignRequest,
  CreateAdRequest,
  CreateAdsByInventoryReferenceRequest,
  CreateCampaignRequest,
  CreateReportTask,
  ItemPriceMarkdown,
  ItemPromotion,
  UpdateBidPercentageRequest,
  UpdateCampaignIdentificationRequest
} from '../../../../types';

/**
 * <p>The <i>Marketing API </i> offers two platforms that sellers can use to promote and advertise their products:
 * </p> <ul><li><b>Promoted Listings</b> is an eBay ad service that lets sellers set up <i>ad campaigns </i>
 * for the products they want to promote. eBay displays the ads in search results and in other
 * marketing modules as <b>SPONSORED</b> listings.
 */
export default class Marketing extends Restful {

  static id = 'Marketing';

  get basePath(): string {
    return '/sell/marketing/v1';
  }

  /**
   * This method creates an ad for each inventory reference ID specified in the request and associates the newly
   * created ads with the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created.
   * @param body This type defines the fields for the bulkCreateAdsByInventoryReference request.
   */
  public bulkCreateAdsByInventoryReference(campaignId: string, body: BulkCreateAdsByInventoryReferenceRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/bulk_create_ads_by_inventory_reference`, body);
  }

  /**
   * This method creates an ad for each listing ID specified in the request and associates the newly created ads with
   * the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body The container for the bulk request to create ads for eBay listing IDs. eBay listing IDs are
   *     generated when the listing is created on eBay.
   */
  public bulkCreateAdsByListingId(campaignId: string, body: BulkCreateAdRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/bulk_create_ads_by_listing_id`, body);
  }

  /**
   * This method deletes a set of ads, as specified by a list of inventory reference IDs, from the specified
   * campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body This type defines the fields for a bulkDeleteAdsByInventoryReference request.
   */
  public bulkDeleteAdsByInventoryReference(campaignId: string, body: BulkDeleteAdsByInventoryReferenceRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/bulk_delete_ads_by_inventory_reference`, body);
  }

  /**
   * This method deletes a set of ads, as specified by a list of listing IDs, from the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body This type defines the fields for the bulkDeleteAdsByListingId request.
   */
  public bulkDeleteAdsByListingId(campaignId: string, body: BulkDeleteAdRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/bulk_delete_ads_by_listing_id`, body);
  }

  /**
   * This method replaces an ad bid based on a list of inventory references IDs associated with the specified
   * campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created.
   * @param body This type defines the fields for the BulkCreateAdsByInventoryReference request.
   */
  public bulkUpdateAdsBidByInventoryReference(campaignId: string, body: BulkCreateAdsByInventoryReferenceRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/bulk_update_ads_bid_by_inventory_reference`, body);
  }

  /**
   * This method replaces an ad bid based on a supplied list of listing IDs that are associated with the specified
   * campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body Container for the bulk request to update ads.
   */
  public bulkUpdateAdsBidByListingId(campaignId: string, body: BulkCreateAdRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/bulk_update_ads_bid_by_listing_id`, body);
  }

  /**
   * This method retrieves all the ads for the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param limit Specifies the maximum number of ads to return on a page in the paginated response. Default: 10
   *     Maximum: 500
   * @param listingIds A comma separated list of eBay listing IDs. The response includes only active ads (ads
   *     associated with a RUNNING campaign).
   * @param offset Specifies the number of ads to skip in the result set before returning the first ad in the
   *     paginated response.
   */
  public getAds(campaignId: string, {limit, listingIds, offset}:
    { limit?: number, listingIds?: number, offset?: number } = {}) {
    campaignId = encodeURIComponent(campaignId);
    return this.get(`/ad_campaign/${campaignId}/ad`, {
      params: {
        limit,
        listing_ids: listingIds,
        offset
      }
    });
  }

  /**
   * This method creates an ad for the specified listing ID, sets the bid percentage for that specific item, and
   * associates the ad with the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body This type defines the fields for the createAd request.
   */
  public createAdByListingId(campaignId: string, body: CreateAdRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/ad`, body);
  }

  /**
   * This method creates an ad for the specified inventory reference ID, sets the bid percentage for that specific
   * item, and associates the ad with the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body This type defines the fields for the createAdsByInventoryReference request.
   */
  public createAdsByInventoryReference(campaignId: string, body: CreateAdsByInventoryReferenceRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/create_ads_by_inventory_reference`, body);
  }

  /**
   * This method retrieves the specified ad from the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param adId Identifier of an ad. This ID was generated when the ad was created.
   */
  public getAd(campaignId: string, adId: string) {
    campaignId = encodeURIComponent(campaignId);
    adId = encodeURIComponent(adId);
    return this.get(`/ad_campaign/${campaignId}/ad/${adId}`);
  }

  /**
   * This method retrieves the specified ad from the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created.
   * @param adId Identifier of an ad. This ID was generated when the ad was created.
   */
  public deleteAd(campaignId: string, adId: string) {
    campaignId = encodeURIComponent(campaignId);
    adId = encodeURIComponent(adId);
    return this.delete(`/ad_campaign/${campaignId}/ad/${adId}`);
  }

  /**
   * This method deletes ads using a list of seller inventory reference IDs that are associated with the specified
   * campaign ID.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   */
  public deleteAdsByInventoryReference(campaignId: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/delete_ads_by_inventory_reference`);
  }

  /**
   * This method retrieves ads from the specified campaign using the seller's inventory reference ID and inventory
   * reference type.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param inventoryReferenceId The inventory reference ID associated with the ad you want returned.
   * @param inventoryReferenceType The type of the inventory reference ID. Set this value to either INVENTORY_ITEM (a
   *     single listing) or INVENTORY_ITEM_GROUP (a multi-variation listing).
   */
  public getAdsByInventoryReference(campaignId: string, inventoryReferenceId: string,
                                    inventoryReferenceType: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.get(`/ad_campaign/${campaignId}/get_ads_by_inventory_reference`, {
      params: {
        inventory_reference_id: inventoryReferenceId,
        inventory_reference_type: inventoryReferenceType
      }
    });
  }

  /**
   * This method updates the bid for the specified ad in the specified campaign. In the request, supply the
   * campaign_id and ad_id as a URI parameters.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param adId A unique eBay-assigned ID for an ad that's generated when an ad is created.
   * @param body This type defines the fields for the updateBid request.
   */
  public updateBid(campaignId: string, adId: string, body: UpdateBidPercentageRequest) {
    campaignId = encodeURIComponent(campaignId);
    adId = encodeURIComponent(adId);
    return this.post(`/ad_campaign/${campaignId}/ad/${adId}/update_bid`, body);
  }

  /**
   * This method clones (makes a copy of) the specified campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body This type defines the fields for a clone campaign request.
   */
  public cloneCampaign(campaignId: string, body: CloneCampaignRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/clone`, body);
  }

  /**
   * This method retrieves the details for all the campaigns of a seller, including the campaign's the selection
   * rules.
   *
   * @param campaignName Specifies the campaign name. The results are filtered to include only the campaign by the
   *     specified name.
   * @param campaignStatus Specifies the campaign status. The results are filtered to include only campaigns that are
   *     in the specified states.
   * @param endDateRange Specifies the range of a campaign's end date. The results are filtered to include only
   *     campaigns with an end date that is within specified range.
   * @param limit Specifies the maximum number of campaigns to return on a page in the paginated response. Default:
   *     10 Maximum: 500
   * @param offset Specifies the number of campaigns to skip in the result set before returning the first report in
   *     the paginated response.
   * @param startDateRange Specifies the range of a campaign's start date in which to filter the results.
   */
  public getCampaigns({campaignName, campaignStatus, endDateRange, limit, offset, startDateRange}:
                        {
                          campaignName?: string, campaignStatus?: string, endDateRange?: string, limit?: number,
                          offset?: number, startDateRange?: string
                        } = {}) {
    return this.get(`/ad_campaign`, {
      params: {
        campaign_name: campaignName,
        campaign_status: campaignStatus,
        end_date_range: endDateRange,
        limit,
        offset,
        start_date_range: startDateRange
      }
    });
  }

  /**
   * This method retrieves the details of a single campaign, as specified with the campaign_id query parameter.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   */
  public getCampaign(campaignId: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.get(`/ad_campaign/${campaignId}`);
  }

  /**
   * This method creates a Promoted Listings ad campaign.
   *
   * @param body his type defines the fields for the create campaign request.
   */
  public createCampaign(body: CreateCampaignRequest) {
    return this.post(`/ad_campaign`, body);
  }

  /**
   * This method deletes the campaign specified by the campaign_id query parameter.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   */
  public deleteCampaign(campaignId: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.delete(`/ad_campaign/${campaignId}`);
  }

  /**
   * This method ends an active (RUNNINGM) or paused campaign. Specify the campaign you want to end by supplying its
   * campaign ID in a query parameter.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   */
  public endCampaign(campaignId: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/end`);
  }

  /**
   * This method retrieves the campaign containing the listing that is specified using either an eBay listing ID or
   * an inventory reference ID and inventory reference type.
   *
   * @param inventoryReferenceId The seller's inventory reference ID of the listing to be used to find the campaign
   *     in which it is associated.
   * @param inventoryReferenceType The type of the seller's inventory reference ID, which is a listing or group of
   *     items.
   * @param listingId Identifier of the eBay listing associated with the ad.
   */
  public findCampaignByAdReference({inventoryReferenceId, inventoryReferenceType, listingId}: {
    inventoryReferenceId?: string,
    inventoryReferenceType?: string,
    listingId?: string
  } = {}) {
    return this.get(`/ad_campaign/find_campaign_by_ad_reference`, {
      params: {
        inventory_reference_id: inventoryReferenceId,
        inventory_reference_type: inventoryReferenceType,
        listing_id: listingId
      }
    });
  }

  /**
   * This method retrieves the details of a single campaign, as specified with the campaign_name query parameter.
   *
   * @param campaignName Name of the campaign.
   */
  public getCampaignByName(campaignName: string) {
    return this.get(`/ad_campaign/get_campaign_by_name`, {
      params: {
        campaign_name: campaignName
      }
    });
  }

  /**
   * This method pauses an active (RUNNING) campaign. You can restarted by calling resumeCampaign, as long as the
   * campaign's end date is in the future..
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   */
  public pauseCampaign(campaignId: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/pause`);
  }

  /**
   * This method resumes a paused campaign, as long as it's end date is in the future.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   */
  public resumeCampaign(campaignId: string) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/resume`);
  }

  /**
   * This method replaces the name and the start and end dates of a campaign.
   *
   * @param campaignId A unique eBay-assigned ID for an ad campaign that's generated when a campaign is created. Get
   *     a seller's campaign IDs by calling getCampaigns.
   * @param body This type defines the fields to updated the campaign name and start and end dates.
   */
  public updateCampaignIdentification(campaignId: string, body: UpdateCampaignIdentificationRequest) {
    campaignId = encodeURIComponent(campaignId);
    return this.post(`/ad_campaign/${campaignId}/update_campaign_identification`, body);
  }

  /**
   * This call downloads the report as specified by the report_id path parameter.
   *
   * @param reportId The unique ID of the Promoted Listings report you want to get. This ID is generated by eBay when
   *     you run a report task with a call to createReportTask.
   */
  public getReport(reportId: string) {
    reportId = encodeURIComponent(reportId);
    return this.get(`/ad_report/${reportId}`);
  }

  /**
   * This call retrieves information that details the fields used in each of the Promoted Listings reports.
   */
  public getReportMetadata() {
    return this.get(`/ad_report_metadata`);
  }

  /**
   * This call retrieves metadata that details the fields used by the Promoted Listings report type that's specified
   * by the report_type path parameter.
   *
   * @param reportType The name of the report type whose metadata you want to get.
   */
  public getReportMetadataForReportType(reportType: string) {
    reportType = encodeURIComponent(reportType);
    return this.get(`/ad_report_metadata/${reportType}`);
  }

  /**
   * This method returns information on all the existing report tasks related to a seller.
   *
   * @param limit Specifies the maximum number of report tasks to return on a page in the paginated response.
   *     Default: 10 Maximum: 500
   * @param offset Specifies the number of report tasks to skip in the result set before returning the first report
   *     in the paginated response.
   * @param reportTaskStatuses This parameter filters the returned report tasks by their status. Supply a
   *     comma-separated list of the report statuses you want returned.
   */
  public getReportTasks({limit, offset, reportTaskStatuses}:
                          { limit?: number, offset?: number, reportTaskStatuses?: string } = {}) {
    return this.get(`/ad_report_task`, {
      params: {
        limit,
        offset,
        report_task_statuses: reportTaskStatuses
      }
    });
  }

  /**
   * This call returns the details of a specific Promoted Listings report task, as specified by the report_task_id
   * path parameter. T
   *
   * @param reportTaskId A unique eBay-assigned ID for the report task that's generated when the report task is
   *     created by a call to createReportTask.
   */
  public getReportTask(reportTaskId: string) {
    reportTaskId = encodeURIComponent(reportTaskId);
    return this.get(`/ad_report_task/${reportTaskId}`);
  }

  /**
   * This method creates a report task, which generates a Promoted Listings report based on the values specified in
   * the call.
   *
   * @param body The container for the fields that define the report task.
   */
  public createReportTask(body: CreateReportTask) {
    return this.post(`/ad_report_task`, body);
  }

  /**
   * This call deletes the report task specified by the report_task_id path parameter.
   *
   * @param reportTaskId A unique eBay-assigned ID for the report task that's generated when the report task is
   *     created by a call to createReportTask.
   */
  public deleteReportTask(reportTaskId: string) {
    reportTaskId = encodeURIComponent(reportTaskId);
    return this.delete(`/ad_report_task/${reportTaskId}`);
  }

  /**
   * This method creates an item price markdown promotion (know simply as a &quot;markdown promotion&quot;) where a
   * discount amount is applied directly to the items included the promotion.
   *
   * @param body This type defines the fields that describe an item price markdown promotion.
   */
  public createItemPriceMarkdownPromotion(body: ItemPriceMarkdown) {
    return this.post(`/item_price_markdown`, body);
  }

  /**
   * This method updates the specified item price markdown promotion with the new configuration that you supply in
   * the payload of the request.
   *
   * @param promotionId The ID of the promotion you want to update.
   * @param body This type defines the fields that describe an item price markdown promotion.
   */
  public updateItemPriceMarkdownPromotion(promotionId: string, body: ItemPriceMarkdown) {
    promotionId = encodeURIComponent(promotionId);
    return this.put(`/item_price_markdown/${promotionId}`, body);
  }

  /**
   * This method deletes the item price markdown promotion specified by the promotion_id path parameter.
   *
   * @param promotionId The ID of the promotion you want to delete.
   */
  public deleteItemPriceMarkdownPromotion(promotionId: string) {
    promotionId = encodeURIComponent(promotionId);
    return this.delete(`/item_price_markdown/${promotionId}`);
  }

  /**
   * This method returns the complete details of the item price markdown promotion that's indicated by the
   * promotion_id path parameter.
   *
   * @param promotionId The ID of the promotion you want to retrieve.
   */
  public getItemPriceMarkdownPromotion(promotionId: string) {
    promotionId = encodeURIComponent(promotionId);
    return this.get(`/item_price_markdown/${promotionId}`);
  }

  /**
   * This method creates an item promotion (known casually as a &quot;threshold promotion&quot;) where the buyer
   * receives a discount when they meet the buying criteria that's set for the promotion.
   *
   * @param body This type defines the fields that describe an item promotion.
   */
  public createItemPromotion(body: ItemPromotion) {
    return this.post(`/item_promotion`, body);
  }

  /**
   * This method updates the specified threshold promotion with the new configuration that you supply in the request.
   *
   * @param promotionId The ID of the promotion you want to retrieve. The promotion ID is a unique eBay-assigned
   *     value that's generated when the promotion is created.
   * @param body type defines the fields that describe an item promotion.
   */
  public updateItemPromotion(promotionId: string, body: ItemPromotion) {
    promotionId = encodeURIComponent(promotionId);
    return this.put(`/item_promotion/${promotionId}`, body);
  }

  /**
   * This method deletes the threshold promotion specified by the promotion_id path parameter.
   *
   * @param promotionId The ID of the promotion you want to retrieve. The promotion ID is a unique eBay-assigned
   *     value that's generated when the promotion is created.
   */
  public deleteItemPromotion(promotionId: string) {
    promotionId = encodeURIComponent(promotionId);
    return this.delete(`/item_promotion/${promotionId}`);
  }

  /**
   * This method returns the complete details of the threshold promotion specified by the promotion_id path
   * parameter.
   *
   * @param promotionId The ID of the promotion you want to retrieve. The promotion ID is a unique eBay-assigned
   *     value that's generated when the promotion is created.
   */
  public getItemPromotion(promotionId: string) {
    promotionId = encodeURIComponent(promotionId);
    return this.get(`/item_promotion/${promotionId}`);
  }

  /**
   * This method returns the set of listings associated with the promotion_id specified in the path parameter.
   *
   * @param promotionId The ID of the promotion whose associated listings you want to retrieve.
   * @param limit Specifies the maximum number of promotions returned on a page from the result set. Default: 200
   *     Maximum: 200
   * @param offset Specifies the number of promotions to skip in the result set before returning the first promotion
   *     in the paginated response.
   * @param q Reserved for future use.
   * @param sort Specifies the order in which to sort the associated listings in the response.
   * @param status This query parameter applies only to markdown promotions.
   */
  public getListingSet(promotionId: string,
                       {limit, offset, q, sort, status}: {
                         limit?: number, offset?: number, q?: string,
                         sort?: string, status?: string
                       } = {}) {
    promotionId = encodeURIComponent(promotionId);
    return this.get(`/promotion/${promotionId}/get_listing_set`, {
      params: {
        limit,
        offset,
        q,
        sort,
        status
      }
    });
  }

  /**
   * This method returns a list of a seller's undeleted promotions.
   *
   * @param marketplaceId The eBay marketplace ID of the site where the promotion is hosted.
   * @param limit Specifies the maximum number of promotions returned on a page from the result set. Default: 200
   *     Maximum: 200
   * @param offset Specifies the number of promotions to skip in the result set before returning the first promotion
   *     in the paginated response.
   * @param promotionStatus Specifies the promotion state by which you want to filter the results.
   * @param promotionType Filters the returned promotions based on the their campaign promotion type.
   * @param q A string consisting of one or more keywords.
   * @param sort Specifies the order for how to sort the response.
   */
  public getPromotions(marketplaceId: string,
                       {limit, offset, promotionStatus, promotionType, q, sort}:
                         {
                           limit?: number, offset?: number, promotionStatus?: string, promotionType?: string,
                           q?: string, sort?: string
                         } = {}) {
    return this.get(`/promotion`, {
      params: {
        marketplace_id: marketplaceId,
        limit,
        offset,
        promotion_status: promotionStatus,
        promotion_type: promotionType,
        q,
        sort
      }
    });
  }

  /**
   * This method pauses a currently-active (RUNNING) threshold promotion and changes the state of the promotion from
   * RUNNING to PAUSED.
   *
   * @param promotionId Identifier of the promotion you want to pause.
   */
  public pausePromotion(promotionId: string) {
    const id = encodeURIComponent(promotionId);
    return this.post(`/promotion/${id}/pause`);
  }

  /**
   * This method restarts a threshold promotion that was previously paused and changes the state of the promotion
   * from PAUSED to RUNNING.
   *
   * @param promotionId Identifier of the promotion you want to make active. The ID is a unique eBay-assigned value
   *     that's generated when the promotion is created.
   */
  public resumePromotion(promotionId: string) {
    const id = encodeURIComponent(promotionId);
    return this.post(`/promotion/${id}/resume`);
  }

  /**
   * This method generates a report that lists the seller's running, paused, and ended promotions for the specified
   * eBay marketplace.
   *
   * @param marketplaceId The eBay marketplace ID of the siteId for which you want the promotions report.
   * @param limit Specifies the maximum number of promotions returned on a page from the result set. Default: 200
   *     Maximum: 200
   * @param offset Specifies the number of promotions to skip in the result set before returning the first promotion
   *     in the paginated response.
   * @param promotionStatus Limits the results to the promotions that are in the state specified by this query
   *     parameter.
   * @param promotionType Filters the returned promotions in the report based on the their campaign promotion type.
   * @param q A string consisting of one or more keywords. eBay filters the response by returning only the promotions
   *     that contain the supplied keywords in the promotion title.
   */
  public getPromotionReports(marketplaceId: string, {limit, offset, promotionStatus, promotionType, q}:
    { limit?: number, offset?: number, promotionStatus?: string, promotionType?: string, q?: string } = {}) {
    return this.get(`/promotion_report`, {
      params: {
        marketplace_id: marketplaceId,
        limit,
        offset,
        promotion_status: promotionStatus,
        promotion_type: promotionType,
        q
      }
    });
  }

  /**
   * This method generates a report that summarizes the seller's promotions for the specified eBay marketplace.
   *
   * @param marketplaceId The eBay marketplace ID of the siteId you for which you want a promotion summary report.
   */
  public getPromotionSummaryReport(marketplaceId: string) {
    return this.get(`/promotion_summary_report`, {
      params: {
        marketplace_id: marketplaceId
      }
    });
  }
}
