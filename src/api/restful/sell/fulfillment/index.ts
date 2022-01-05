import Restful from '../../';
import {multipartHeader} from '../../../../request';
import {
  AddEvidencePaymentDisputeRequest,
  ContestPaymentDisputeRequest,
  IssueRefundRequest, PaymentParams,
  ShippingFulfillmentDetails, UpdateEvidencePaymentDisputeRequest,
} from '../../../../types';

/**
 * Use the Fulfillment API to complete the process of packaging, addressing, handling, and shipping each order on
 * behalf of the seller, in accordance with the payment method and timing specified at checkout.
 *
 * https://api.ebay.com/oauth/api_scope/sell.fulfillment
 * https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly
 *
 */
export default class Fulfillment extends Restful {

  static id = 'Fulfillment';

  get basePath(): string {
    return '/sell/fulfillment/v1';
  }

  /**
   * Use this call to retrieve the contents of an order based on its unique identifier, orderId.
   *
   * @param orderId The unique identifier of the order.
   * @param fieldGroups The response type associated with the order. The only presently supported value is <code>TAX_BREAKDOWN</code>.
   */
  public getOrder(orderId: string, {fieldGroups}: { fieldGroups?: string[] } = {}) {
    return this.get(`/order/${orderId}`, {
      params: {
        fieldGroups
      }
    });
  }

  /**
   * Use this call to search for and retrieve one or more orders based on their creation date, last modification
   * date,
   * or fulfillment status using the filter parameter.
   *
   * @param filter One or more comma-separated criteria for narrowing down the collection of orders returned by this
   *     call.
   * @param limit The number of orders to return per page of the result set.
   * @param offset Specifies the number of orders to skip in the result set before returning the first order in the
   *     paginated response.
   * @param orderIds A comma-separated list of the unique identifiers of the orders to retrieve (maximum 50).
   */
  public getOrders({
                     filter,
                     limit,
                     offset,
                     orderIds,
                     fieldGroups,
                   }: {
    filter?: string,
    limit?: number,
    offset?: number,
    orderIds?: string | string[],
    fieldGroups?: string[]
  } = {}) {
    return this.get(`/order`, {
      params: {
        filter,
        limit,
        offset,
        orderIds: Array.isArray(orderIds) ? orderIds.join() : orderIds,
        fieldGroups
      },
    });
  }

  /**
   * This method allows a seller (opted in to eBay Managed Payments) to issue a full or partial refund to a buyer for
   * an order. auth: https://api.ebay.com/oauth/api_scope/sell.finances
   *
   * @param orderId The unique identifier of the order. Order IDs are returned in the getOrders method (and GetOrders
   *     call of Trading API).
   * @param body IssueRefundRequest
   */
  public issueRefund(orderId: string, body?: IssueRefundRequest) {
    orderId = encodeURIComponent(orderId);
    return this.post(`/order/${orderId}/issue_refund`, body);
  }

  /**
   * Use this call to retrieve the contents of all fulfillments currently defined for a specified order based on the
   * order's unique identifier, orderId.
   *
   * @param orderId The unique identifier of the order.
   */
  public getShippingFulfillments(orderId: string) {
    orderId = encodeURIComponent(orderId);
    return this.get(`/order/${orderId}/shipping_fulfillment`);
  }

  /**
   * Create a Shipping Fulfillment
   *
   * @param orderId The unique identifier of the order.
   * @param body fulfillment payload
   */
  public createShippingFulfillment(
    orderId: string,
    body: ShippingFulfillmentDetails
  ) {
    orderId = encodeURIComponent(orderId);
    return this.post(`/order/${orderId}/shipping_fulfillment`, body);
  }

  /**
   * Use this call to retrieve the contents of a fulfillment based on its unique identifier, fulfillmentId (combined
   * with the associated order's orderId).
   *
   * @param orderId The unique identifier of the order.
   * @param fulfillmentId The unique identifier of the fulfillment.
   */
  public getShippingFulfillment(orderId: string, fulfillmentId: string) {
    orderId = encodeURIComponent(orderId);
    fulfillmentId = encodeURIComponent(fulfillmentId);
    return this.get(`/order/${orderId}/shipping_fulfillment/${fulfillmentId}`);
  }

  /**
   * This method retrieves detailed information on a specific payment dispute.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   */
  public getPaymentDispute(paymentDisputeId: string) {
    return this.get(`/payment_dispute/${paymentDisputeId}`);
  }

  /**
   * This call retrieves a specific evidence file for a payment dispute.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   */
  public fetchEvidenceContent(paymentDisputeId: string) {
    return this.get(`/payment_dispute/${paymentDisputeId}/fetch_evidence_content`);
  }

  /**
   * This method retrieve a log of activity for a payment dispute.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   */
  public getActivities(paymentDisputeId: string) {
    return this.get(`/payment_dispute/${paymentDisputeId}/activity`);
  }


  /**
   * This method is used retrieve one or more payment disputes filed against the seller.
   *
   * @param orderId This filter is used if the seller wishes to retrieve one or more payment disputes filed against a specific order.
   * @param buyerUsername This filter is used if the seller wishes to retrieve one or more payment disputes opened by a specific seller.
   * @param openDateFrom The <b>open_date_from</b> and/or <b>open_date_to</b> date filters are used if the seller wishes to retrieve payment disputes opened within a specific date range.
   * @param paymentDisputeStatus The <b>open_date_from</b> and/or <b>open_date_to</b> date filters are used if the seller wishes to retrieve payment disputes opened within a specific date range.
   * @param paymentDisputeStatus his filter is used if the seller wishes to only retrieve payment disputes in a specific state.
   * @param limit The value passed in this query parameter sets the maximum number of payment disputes to return per page of data.
   * @param offset This field is used to specify the number of records to skip in the result set before returning the first payment dispute in the paginated response.
   */
  public getPaymentDisputeSummaries({
                                      orderId: order_id,
                                      buyerUsername: buyer_username,
                                      openDateFrom: open_date_from,
                                      openDateTo: open_date_to,
                                      paymentDisputeStatus: payment_dispute_status,
                                      limit,
                                      offset
                                    }: PaymentParams) {
    return this.get(`/payment_dispute_summary`, {
      params: {
        order_id,
        buyer_username,
        open_date_from,
        open_date_to,
        payment_dispute_status,
        limit,
        offset
      }
    });
  }

  /**
   * This method is used if the seller wishes to contest a payment dispute initiated by the buyer.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   * @param body This is the unique identifier of the payment dispute.
   */
  public contestPaymentDispute(paymentDisputeId: string, body: ContestPaymentDisputeRequest) {
    return this.post(`/payment_dispute/${paymentDisputeId}/contest`, body);
  }

  /**
   * This method is used if the seller wishes to accept a payment dispute.
   *
   *  @param paymentDisputeId This is the unique identifier of the payment dispute.
   */
  public acceptPaymentDispute(paymentDisputeId: string) {
    return this.post(`/payment_dispute/${paymentDisputeId}/accept`);
  }

  /**
   * This method is used to upload an evidence file for a contested payment dispute.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   * @param data uploads an encrypted, binary image file (using multipart/form-data HTTP request header)
   */
  public uploadEvidenceFile(paymentDisputeId: string, data: any) {
    return this.post(`/payment_dispute/${paymentDisputeId}/upload_evidence_file`, data, {
      headers: {
        ...multipartHeader
      }
    });
  }

  /**
   * This method is used by the seller to add one or more evidence files to address a payment dispute initiated by the buyer.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   * @param body AddEvidencePaymentDisputeRequest
   */
  public addEvidence(paymentDisputeId: string, body: AddEvidencePaymentDisputeRequest) {
    return this.post(`/payment_dispute/${paymentDisputeId}/add_evidence`, body);
  }

  /**
   * This method is used by the seller to update an existing evidence set for a payment dispute with one or more evidence files.
   *
   * @param paymentDisputeId This is the unique identifier of the payment dispute.
   * @param body AddEvidencePaymentDisputeRequest
   */
  public updateEvidence(paymentDisputeId: string, body: UpdateEvidencePaymentDisputeRequest) {
    return this.post(`/payment_dispute/${paymentDisputeId}/update_evidence`, body);
  }
}
