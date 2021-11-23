import Restful from '../../';
import {
  BulkEbayOfferDetailsWithKeys,
  BulkInventoryItem,
  BulkMigrateListing,
  BulkOffer,
  BulkPriceQuantity,
  Compatibility,
  EbayOfferDetailsWithId,
  EbayOfferDetailsWithKeys,
  InventoryItemGroup,
  InventoryLocation,
  InventoryLocationFull,
  OfferKeysWithId,
  PublishByInventoryItemGroupRequest,
  SellInventoryItem,
  WithdrawByInventoryItemGroupRequest,
} from '../../../../types';

/**
 * The Inventory API is used to create and manage inventory, and then to publish and manage this inventory on an eBay
 * marketplace.
 */
export default class Inventory extends Restful {

  static id = 'Inventory';

  get basePath(): string {
    return '/sell/inventory/v1';
  }

  /**
   * This call retrieves all defined details of the inventory location that is specified by the
   * <b>merchantLocationKey</b> path parameter.
   *
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public getInventoryLocation(merchantLocationKey: string) {
    const key = encodeURIComponent(merchantLocationKey);
    return this.get(`/location/${key}`);
  }

  /**
   * <p>This call disables the inventory location that is specified in the <code>merchantLocationKey</code> path
   * parameter.
   *
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public disableInventoryLocation(merchantLocationKey: string) {
    const key = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${key}/disable`);
  }

  /**
   * <p>This call enables a disabled inventory location that is specified in the <code>merchantLocationKey</code>
   * path parameter.
   *
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public enableInventoryLocation(merchantLocationKey: string) {
    const key = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${key}/enable`);
  }

  /**
   * This call retrieves all defined details for every inventory location associated with the seller's account.
   *
   * @param limit The value passed in this query parameter sets the maximum number of records to return per page of
   *     data.
   * @param offset The value passed in this query parameter sets the page number to retrieve.
   */
  public getInventoryLocations({
                                 limit,
                                 offset,
                               }: { limit?: number; offset?: number } = {}) {
    return this.get(`/location`, {
      params: {
        limit,
        offset,
      },
    });
  }

  /**
   * <p>Use this call to create a new inventory location.
   *
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   * @param body Inventory Location details
   */
  public createInventoryLocation(
    merchantLocationKey: string,
    body: InventoryLocationFull
  ) {
    const key = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${key}`, body);
  }

  /**
   * <p>This call deletes the inventory location that is specified in the <code>merchantLocationKey</code> path
   * parameter.
   *
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public deleteInventoryLocation(merchantLocationKey: string) {
    const key = encodeURIComponent(merchantLocationKey);
    return this.delete(`/location/${key}`);
  }

  /**
   * <p>Use this call to update non-physical location details for an existing inventory location.
   *
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   * @param body The inventory location details to be updated (other than the address and geo co-ordinates).
   */
  public updateInventoryLocation(
    merchantLocationKey: string,
    body?: InventoryLocation
  ) {
    const key = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${key}/update_location_details`, body);
  }

  /**
   * This call retrieves the inventory item record for a given SKU.
   *
   * @param sku his is the seller-defined SKU value of the product whose inventory item record you wish to
   *     retrieve.<br/><br/><strong>Max length</strong>: 50.
   */
  public getInventoryItem(sku: string) {
    sku = encodeURIComponent(sku);
    return this.get(`/inventory_item/${sku}`);
  }

  /**
   * This call creates a new inventory item record or replaces an existing inventory item record.
   *
   * @param sku The seller-defined SKU value for the inventory item is required whether the seller is creating a new
   *     inventory item, or updating an existing inventory item.
   * @param body Details of the inventory item record.
   */
  public createOrReplaceInventoryItem(sku: string, body: SellInventoryItem) {
    sku = encodeURIComponent(sku);
    return this.put(`/inventory_item/${sku}`, body);
  }

  /**
   * This call is used to delete an inventory item record associated with a specified SKU.
   *
   * @param sku The seller-defined SKU value for the inventory item is required whether the seller is creating a new
   *     inventory item, or updating an existing inventory item.
   */
  public deleteInventoryItem(sku: string) {
    sku = encodeURIComponent(sku);
    return this.delete(`/inventory_item/${sku}`);
  }

  /**
   * This call retrieves all inventory item records defined for the seller's account.
   *
   * @param limit The value passed in this query parameter sets the maximum number of records to return per page of
   *     data.
   * @param offset The value passed in this query parameter sets the page number to retrieve.
   */
  public getInventoryItems({
                             limit,
                             offset,
                           }: { limit?: number; offset?: number } = {}) {
    return this.get(`/inventory_item`, {
      params: {
        limit,
        offset,
      },
    });
  }

  /**
   * This call is used by the seller to update the total ship-to-home quantity of one inventory item,
   *  and/or to update the price and/or quantity of one or more offers associated with one inventory item.
   *
   * @param body BulkPriceQuantity
   */
  public bulkUpdatePriceQuantity(body: BulkPriceQuantity) {
    return this.post(`/bulk_update_price_quantity`, body);
  }

  /**
   * This call can be used to create and/or update up to 25 new inventory item records.
   *
   * @param body BulkInventoryItem
   */
  public bulkCreateOrReplaceInventoryItem(body: BulkInventoryItem) {
    return this.post(`/bulk_create_or_replace_inventory_item`, body);
  }

  /**
   * This call retrieves up to 25 inventory item records. The SKU value of each inventory item record to retrieve is
   * specified in the request payload.
   *
   * @param body BulkInventoryItem
   */
  public bulkGetInventoryItem(body: BulkInventoryItem) {
    return this.post(`/bulk_get_inventory_item`, body);
  }

  /**
   * This call is used by the seller to retrieve the list of products that are compatible with the inventory item.
   *
   * @param sku A SKU (stock keeping unit) is an unique identifier defined by a seller for a product
   */
  public getProductCompatibility(sku: string) {
    sku = encodeURIComponent(sku);
    return this.get(`/inventory_item/${sku}/product_compatibility`);
  }

  /**
   * This call is used by the seller to create or replace a list of products that are compatible with the inventory
   * item.
   *
   * @param sku A SKU (stock keeping unit) is an unique identifier defined by a seller for a product
   * @param body Details of the compatibility
   */
  public createOrReplaceProductCompatibility(sku: string, body: Compatibility) {
    sku = encodeURIComponent(sku);
    return this.put(`/inventory_item/${sku}/product_compatibility`, body);
  }

  /**
   * This call is used by the seller to delete the list of products that are compatible with the inventory item that
   * is associated with the compatible product list.
   *
   * @param sku A SKU (stock keeping unit) is an unique identifier defined by a seller for a product
   */
  public deleteProductCompatibility(sku: string) {
    sku = encodeURIComponent(sku);
    return this.delete(`/inventory_item/${sku}/product_compatibility`);
  }

  /**
   * This call retrieves all existing offers for the specified SKU value.
   *
   * @param sku The seller-defined SKU value is passed in as a query parameter.
   * @param marketplace_id The unique identifier of the eBay marketplace.
   * @param format This enumeration value sets the listing format for the offer.
   * @param limit The value passed in this query parameter sets the maximum number of records to return per page of
   *     data.
   * @param offset The value passed in this query parameter sets the page number to retrieve.
   */
  public getOffers({
                     sku,
                     marketplaceId,
                     format,
                     limit,
                     offset,
                   }: {
    sku?: string;
    marketplaceId?: string;
    format?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    return this.get(`/offer`, {
      params: {
        sku,
        marketplace_id: marketplaceId,
        format,
        limit,
        offset,
      },
    });
  }

  /**
   * This call retrieves a specific published or unpublished offer.
   *
   * @param offerId The unique identifier of the offer that is to be retrieved.
   */
  public getOffer(offerId: string) {
    offerId = encodeURIComponent(offerId);
    return this.get(`/offer/${offerId}`);
  }

  /**
   * This call creates an offer for a specific inventory item on a specific eBay marketplace.
   *
   * @param body Details of the offer for the channel
   */
  public createOffer(body: EbayOfferDetailsWithKeys) {
    return this.post(`/offer`, body);
  }

  /**
   * This call updates an existing offer.
   *
   * @param offerId The unique identifier of the offer that is being updated.
   * @param body Details of the offer for the channel
   */
  public updateOffer(offerId: string, body: EbayOfferDetailsWithId) {
    offerId = encodeURIComponent(offerId);
    return this.put(`/offer/${offerId}`, body);
  }

  /**
   * If used against an unpublished offer, this call will permanently delete that offer.
   *
   * @param offerId The unique identifier of the offer to delete.
   */
  public deleteOffer(offerId: string) {
    return this.delete(`/offer/${offerId}`);
  }

  /**
   * This call is used to convert an unpublished offer into a published offer, or live eBay listing.
   *
   * @param offerId The unique identifier of the offer that is to be published.
   */
  public publishOffer(offerId: string) {
    const id = encodeURIComponent(offerId);
    return this.post(`/offer/${id}/publish/`);
  }

  /**
   * This call is used to convert all unpublished offers associated with an inventory item group into an active,
   * multiple-variation listing.
   *
   * @param body PublishByInventoryItemGroupRequest
   */
  public publishOfferByInventoryItemGroup(
    body: PublishByInventoryItemGroupRequest
  ) {
    return this.post(`/offer/publish_by_inventory_item_group/`, body);
  }

  /**
   * This call is used to end a multiple-variation eBay listing that is associated with the specified inventory item
   * group.
   *
   * @param body WithdrawByInventoryItemGroupRequest
   */
  public withdrawOfferByInventoryItemGroup(
    body: WithdrawByInventoryItemGroupRequest
  ) {
    return this.post(`/offer/withdraw_by_inventory_item_group`, body);
  }

  /**
   * This call is used to retrieve the expected listing fees for up to 250 unpublished offers.
   *
   * @param body OfferKeysWithId
   */
  public getListingFees(body: OfferKeysWithId) {
    return this.post(`/offer/get_listing_fees`, body);
  }

  /**
   * This call creates multiple offers (up to 25) for specific inventory items on a specific eBay marketplace.
   *
   * @param body BulkEbayOfferDetailsWithKeys
   */
  public bulkCreateOffer(body: BulkEbayOfferDetailsWithKeys) {
    return this.post(`/bulk_create_offer`, body);
  }

  /**
   * This call is used to convert unpublished offers (up to 25) into  published offers, or live eBay listings.
   *
   * @param body BulkOffer
   */
  public bulkPublishOffer(body: BulkOffer) {
    return this.post(`/bulk_publish_offer`, body);
  }

  /**
   * This call is used to end a single-variation listing that is associated with the specified offer.
   *
   * @param offerId he unique identifier of the offer that is to be withdrawn.
   */
  public withdrawOffer(offerId: string) {
    const id = encodeURIComponent(offerId);
    return this.post(`/offer/${id}/withdraw`);
  }

  /**
   * This call retrieves the inventory item group for a given <strong>inventoryItemGroupKey</strong> value.
   *
   * @param inventoryItemGroupKey The unique identifier of an inventory item group.
   */
  public getInventoryItemGroup(inventoryItemGroupKey: string) {
    inventoryItemGroupKey = encodeURIComponent(inventoryItemGroupKey);
    return this.get(`/inventory_item_group/${inventoryItemGroupKey}`);
  }

  /**
   * This call creates a new inventory item group or updates an existing inventory item group.
   *
   * @param inventoryItemGroupKey Unique identifier of the inventory item group.
   * @param body Details of the inventory Item Group
   */
  public createOrReplaceInventoryItemGroup(
    inventoryItemGroupKey: string,
    body: InventoryItemGroup
  ) {
    inventoryItemGroupKey = encodeURIComponent(inventoryItemGroupKey);
    return this.put(`/inventory_item_group/${inventoryItemGroupKey}`, body);
  }

  /**
   * This call deletes the inventory item group for a given <strong>inventoryItemGroupKey</strong> value.
   *
   * @param inventoryItemGroupKey Unique identifier of the inventory item group.
   */
  public deleteInventoryItemGroup(inventoryItemGroupKey: string) {
    return this.delete(`/inventory_item_group/${inventoryItemGroupKey}`);
  }

  /**
   * This call is used to convert existing eBay Listings to the corresponding Inventory API objects.
   *
   * @param body BulkMigrateListing
   */
  public bulkMigrateListing(body: BulkMigrateListing) {
    return this.post(`/bulk_migrate_listing`, body);
  }
}
