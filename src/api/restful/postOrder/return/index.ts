import Restful from '../../';
import {FilePurpose, GetReturnFieldGroupEnum} from '../../../../enums';
import {
  CheckEligibilityRequest,
  CloseReturnRequest,
  CreateReturnRequest,
  DecideReturnRequest,
  EscalateRequest,
  GetEstimateRequest,
  MarkAsReceivedRequest,
  MarkAsShippedRequest,
  MarkRefundSentRequest,
  PostOrderIssueRefundRequest,
  ProvideLabelRequest,
  ReturnRequestType,
  SearchReturnParams,
  SendMessageRequest,
  SetReturnCreationSessionRequest,
  UpdateTrackingRequest,
  UploadFileRequest,
  VoidLabelRequest
} from '../../../../types';

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
   * Cancel a return request.
   *
   * @param returnId    The unique eBay-assigned ID of the return request.
   * @param payload    The CloseReturnRequest.
   */
  public cancelReturnRequest(returnId: string, payload?: CloseReturnRequest) {
    const id = encodeURIComponent(returnId);
    if (payload && payload.buyerCloseReason) {
      payload.buyerCloseReason = payload.buyerCloseReason.trim();
    }
    return this.post(`/return/${id}/cancel`, payload);
  }

  /**
   * Check to see if an item is eligible for a return.
   *
   * @param payload the CheckEligibilityRequest
   */
  public checkReturnEligibility(payload: CheckEligibilityRequest) {
    return this.post(`/return/check_eligibility`, payload);
  }

  /**
   * Validate the eligibility of an existing shipping label.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   */
  public checkShippingLabelEligibility(returnId: string) {
    const id = encodeURIComponent(returnId);
    return this.get(`/return/${id}/check_label_print_eligibility`);
  }

  /**
   * Create a return draft.
   *
   * @param payload the SetReturnCreationSessionRequest
   */
  public createReturnDraft(payload: SetReturnCreationSessionRequest) {
    return this.post(`/return/draft`, payload);
  }

  /**
   * Request a return for an item.
   *
   * @param payload the CreateReturnRequest
   * @param fieldGroups can be used in the call URI to control the detail level that is returned in response.
   */
  public createReturnRequest(payload: CreateReturnRequest, fieldGroups?: GetReturnFieldGroupEnum) {
    return this.post(`/return`, payload, {
      params: {
        fieldgroups: fieldGroups
      }
    });
  }

  /**
   * Create an eBay shipping label for the buyer.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   */
  public createReturnShippingLabel(returnId: string) {
    const id = encodeURIComponent(returnId);
    return this.post(`/return/${id}/initiate_shipping_label`);
  }

  /**
   * Delete a file associated with a return draft.
   *
   * @param draftId    The unique eBay-assigned ID of the return draft.
   * @param fileId The unique eBay-assigned ID of the draft file.
   */
  public deleteReturnDraftFile(draftId: string, fileId: string) {
    draftId = encodeURIComponent(draftId);
    fileId = encodeURIComponent(fileId);

    return this.delete(`/return/draft/${draftId}/file/${fileId}`);
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
  public getReturn(returnId: string, fieldGroups?: GetReturnFieldGroupEnum) {
    returnId = encodeURIComponent(returnId);
    return this.get(`/return/${returnId}`, {
      params: {
        fieldgroups: fieldGroups
      }
    });
  }

  /**
   * Retrieve a return draft.
   *
   * @param returnId The unique eBay-assigned ID of the return request.
   */
  public getReturnDraft(returnId: string) {
    const id = encodeURIComponent(returnId);
    return this.get(`/return/draft/${id}`);
  }

  /**
   * Retrieve the files associated with a return draft.
   *
   * @param returnId    The unique eBay-assigned ID of the return draft.
   */
  public getReturnDraftFiles(returnId: string) {
    const id = encodeURIComponent(returnId);
    return this.get(`/return/draft/${id}/files`);
  }

  /**
   * Retrieve the cost estimate of a refund with its shipping cost.
   *
   * @param payload the GetEstimateRequest
   */
  public getReturnEstimate(payload: GetEstimateRequest) {
    return this.post(`/return/estimate`, payload);
  }

  /**
   * Retrieve the cost estimate of a refund with its shipping cost.
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
    return this.get(`/return/preference`);
  }

  /**
   * Retrieve the data for an existing shipping label.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   */
  public getReturnShippingLabel(returnId: string) {
    returnId = encodeURIComponent(returnId);
    return this.get(`/return/${returnId}/get_shipping_label`);
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
   * Mark a refund as received.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   */
  public markReturnRefundReceived(returnId: string) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/mark_refund_received`);
  }

  /**
   * Notify the buyer that a refund has been issued.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the MarkRefundSentRequest
   */
  public markReturnRefundSent(returnId: string, payload: MarkRefundSentRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/mark_refund_sent`, payload);
  }

  /**
   * Mark a return as shipped.
   *
   * @param returnId    The unique eBay-assigned ID of the return.
   * @param payload the MarkAsShippedRequest
   */
  public markReturnShipped(returnId: string, payload?: MarkAsShippedRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/mark_as_shipped`, payload);
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
    return this.get(`/return/search`, {
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
   * Send a shipping label to an email address.
   *
   * @param returnId    The unique eBay-assigned ID of the return.
   * @param toEmailAddress The recipient's email address is specified in this field.
   */
  public sendReturnShippingLabel(returnId: string, toEmailAddress?: string) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/send_shipping_label`, {}, {
      params: {
        to_email_address: toEmailAddress
      }
    });
  }

  /**
   * Send a shipping label to an email address.
   *
   * @param rmaRequired This field is included and set to true if the seller wishes to require that the buyer provide
   *     a Return Merchandise Authorization (RMA) when returning an item.
   */
  public setReturnPreferences(rmaRequired: boolean) {
    return this.post(`/return/preference`, {
      rmaRequired
    });
  }

  /**
   * Activate the files associated with a return.
   *
   * @param returnId    The unique eBay-assigned ID of the return.
   * @param filePurpose This value is used to indicate if the file(s) are being used to provide more information
   *     about the condition of the item, or intended to provide more information about shipment tracking or about
   *     the shipping label.
   */
  public submitReturnFile(returnId: string, filePurpose?: FilePurpose) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/file/submit`, {
      filePurpose
    });
  }

  /**
   * Update an existing return draft.
   *
   * @param draftId The unique eBay-assigned ID of the return draft.
   * @param returnRequest the ReturnRequestType
   */
  public updateReturnDraft(draftId: string, returnRequest: ReturnRequestType) {
    draftId = encodeURIComponent(draftId);
    return this.put(`/return/draft/${draftId}`, {
      returnRequest
    });
  }

  /**
   * Update shipment tracking information.
   *
   * @param returnId The unique eBay-assigned ID of the return request.
   * @param payload the UpdateTrackingRequest
   */
  public updateShipmentTrackingInfo(returnId: string, payload: UpdateTrackingRequest) {
    returnId = encodeURIComponent(returnId);
    return this.put(`/return/${returnId}/update_tracking`, payload);
  }

  /**
   * Upload the files relating to a return draft.
   *
   * @param draftId The unique eBay-assigned ID of the return draft.
   * @param payload the UploadFileRequest
   */
  public uploadReturnDraftFile(draftId: string, payload: UploadFileRequest) {
    draftId = encodeURIComponent(draftId);
    return this.post(`/return/draft/${draftId}/file/upload`, payload);
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

  /**
   * Void a shipping label.
   *
   * @param returnId The unique eBay-assigned ID of the return.
   * @param payload the VoidLabelRequest
   */
  public voidShippingLabel(returnId: string, payload: VoidLabelRequest) {
    returnId = encodeURIComponent(returnId);
    return this.post(`/return/${returnId}/void_shipping_label`, payload);
  }
}
