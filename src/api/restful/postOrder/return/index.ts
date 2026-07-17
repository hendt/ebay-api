import {GetReturnFieldGroupEnum} from '../../../../enums/index.js';
import {
  CreateReturnRequest,
  DecideReturnRequest,
  EscalateRequest,
  MarkAsReceivedRequest,
  PostOrderIssueRefundRequest,
  ProvideLabelRequest,
  SearchReturnParams,
  SendMessageRequest,
  UploadFileRequest
} from '../../../../types/index.js';
import Restful from '../../index.js';

/**
 * Post-Order Return API
 */
export default class Return extends Restful {

  static id = 'Return';

  get basePath(): string {
    return '/post-order/v2';
  }

  get useIaf() {
    return true;
  }

  /**
   * Create or update a shipping label provided by the seller.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the ProvideLabelRequest
   */
  public addShippingLabelInfo(returnId: string, payload: ProvideLabelRequest) {
    const id = encodeURIComponent(returnId);
    return this.post(`/return/${id}/add_shipping_label`, payload);
  }

  /**
   * Request a return for an item.
   *
   * @param payload the CreateReturnRequest
   * @param fieldGroups can be used in the call URI to control the detail level that is returned in response.
   */
  public createReturnRequest(payload: CreateReturnRequest, fieldGroups?: GetReturnFieldGroupEnum | `${GetReturnFieldGroupEnum}`) {
    return this.post('/return', payload, {
      params: {
        fieldgroups: fieldGroups
      }
    });
  }

  /**
   * Escalate an existing return to eBay customer support.
   *
   * @param returnId The unique eBay-assigned ID of the return request.
   * @param payload the EscalateRequest
   */
  public escalateReturn(returnId: string, payload?: EscalateRequest) {
    const id = encodeURIComponent(returnId);
    return this.post(`/return/${id}/escalate`, payload);
  }

  /**
   * Retrieve the details of a specific return.
   *
   * @param returnId The unique eBay-assigned ID of the return request.
   * @param fieldGroups can be used in the call URI to control the detail level that is returned in response.
   */
  public getReturn(returnId: string, fieldGroups?: GetReturnFieldGroupEnum | `${GetReturnFieldGroupEnum}`) {
    returnId = encodeURIComponent(returnId);
    return this.get(`/return/${returnId}`, {
      params: {
        fieldgroups: fieldGroups
      }
    });
  }

  /**
   * Retrieve the files associated with a return.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   */
  public getReturnFiles(returnId: string) {
    const id = encodeURIComponent(returnId);
    return this.get(`/return/${id}/files`);
  }

  /**
   * Retrieve seller's return preferences.
   */
  public getReturnPreferences() {
    return this.get('/return/preference');
  }

  /**
   * Retrieve shipment tracking activity for a return.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param carrierUsed The shipping carrier used to to ship the package.
   * @param trackingNumber The tracking number of the package.
   */
  public getShipmentTrackingInfo(returnId: string, carrierUsed: string, trackingNumber: string) {
    returnId = encodeURIComponent(returnId);
    return this.get(`/return/${returnId}/tracking`, {
      params: {
        carrier_used: carrierUsed,
        tracking_number: trackingNumber
      }
    });
  }

  /**
   * Issue a refund.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload The IssueRefundRequest.
   */
  public issueReturnRefund(returnId: string, payload: PostOrderIssueRefundRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/issue_refund`, payload);
  }

  /**
   * Mark a returned item as received.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the MarkAsReceivedRequest
   */
  public markReturnReceived(returnId: string, payload?: MarkAsReceivedRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/mark_as_received`, payload);
  }

  /**
   * Perform an action on a return, such as APPROVE.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the DecideReturnRequest
   */
  public processReturnRequest(returnId: string, payload: DecideReturnRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/decide`, payload);
  }

  /**
   * Retrieve details on items being returned.
   *
   * @param params the SearchReturnParams
   */
  public search(params: SearchReturnParams) {
    return this.get('/return/search', {
      params
    });
  }

  /**
   * Send a message to the buyer or seller regarding a return.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the SendMessageRequest
   */
  public sendReturnMessage(returnId: string, payload?: SendMessageRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/send_message`, payload);
  }

  /**
   * Set seller's return preferences.
   *
   * @param rmaRequired This field is included and set to true if the seller wishes to require that the buyer provide
   *     a Return Merchandise Authorization (RMA) when returning an item.
   */
  public setReturnPreferences(rmaRequired: boolean) {
    return this.post('/return/preference', {
      rmaRequired
    });
  }

  /**
   * Upload the files relating to a return.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the UploadFileRequest
   */
  public uploadReturnFile(returnId: string, payload: UploadFileRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/file/upload`, payload);
  }
}
