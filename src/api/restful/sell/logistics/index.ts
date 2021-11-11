import Restful from '../../';

/**
 * The <b>Logistics API</b> resources offer the following capabilities: <ul><li><b>shipping_quote</b> &ndash; Consolidates into a list a set of live shipping rates, or quotes, from which you can select a rate to ship a package.
 */
export default class Logistics extends Restful {

  static id = 'Logistics';

  get basePath(): string {
    return '/sell/logistics/v1_beta';
  }

  /**
   * The createShippingQuote method returns a shipping quote that contains a list of live &quot;rates.&quot;
   *
   * @param data The ShippingQuoteRequest
   */
  public createShippingQuote(data: any) {
    return this.post(`/shipping_quote`, data)
  }

  /**
   * This method retrieves the complete details of the shipping quote associated with the specified shippingQuoteId value.
   *
   * @param shippingQuoteId This path parameter specifies the unique eBay-assigned ID of the shipping quote you want to retrieve.
   */
  public getShippingQuote(shippingQuoteId: string) {
    shippingQuoteId = encodeURIComponent(shippingQuoteId)
    return this.get(`/shipping_quote/${shippingQuoteId}`)
  }

  /**
   * This method creates a &quot;shipment&quot; based on the shippingQuoteId and rateId values supplied in the request.
   *
   * @param data The CreateShipmentFromQuoteRequest
   */
  public createFromShippingQuote(data: any) {
    return this.post(`/shipment/create_from_shipping_quote`, data)
  }

  /**
   * This method retrieves the shipment details for the specified shipment ID.
   *
   * @param shipmentId This path parameter specifies the unique eBay-assigned ID of the shipment you want to retrieve.
   */
  public getShipment(shipmentId: any) {
    return this.get(`/shipment/${shipmentId}`)
  }

  /**
   * This method returns the shipping label file that was generated for the shipmentId value specified in the request.
   *
   * @param shipmentId This path parameter specifies the unique eBay-assigned ID of the shipment associated with the shipping label you want to download.
   */
  public downloadLabelFile(shipmentId: any) {
    return this.get(`/shipment/${shipmentId}/download_label_file`)
  }

  /**
   * This method cancels the shipment associated with the specified shipment ID and the associated shipping label is deleted.
   *
   * @param shipmentId This path parameter specifies the unique eBay-assigned ID of the shipment to be canceled.
   */
  public cancelShipment(shipmentId: any) {
    return this.post(`/shipment/${shipmentId}/cancel`)
  }
}
