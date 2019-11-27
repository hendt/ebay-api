import Api from '../../api';
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
    ProvideLabelRequest, ReturnRequestType, SearchReturnParams,
    SendMessageRequest,
    SetReturnCreationSessionRequest,
    UpdateTrackingRequest,
    UploadFileRequest,
    VoidLabelRequest
} from '../../types';
import {FilePurposeEnum, GetReturnFieldGroupEnum} from '../../enums';

/**
 * Post-Order Return API
 */
export default class Inquiry extends Api {
    get basePath(): string {
        return '/post-order/v2/return';
    }

    /**
     * Create or update a shipping label provided by the seller.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the ProvideLabelRequest
     */
    addShippingLabelInfo(returnId: string, payload: ProvideLabelRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/add_shipping_label`, payload);
    }

    /**
     * Cancel a return request.
     *
     * @param returnId    The unique eBay-assigned ID of the return request.
     * @param payload    The CloseReturnRequest.
     */
    cancelReturnRequest(returnId: string, payload?: CloseReturnRequest) {
        const id = encodeURIComponent(returnId);
        if (payload && payload.buyerCloseReason) {
            payload.buyerCloseReason = payload.buyerCloseReason.trim();
        }
        return this.post(`/${id}/cancel`, payload);
    }

    /**
     * Check to see if an item is eligible for a return.
     *
     * @param payload the CheckEligibilityRequest
     */
    checkReturnEligibility(payload: CheckEligibilityRequest) {
        return this.post(`/check_eligibility`, payload);
    }

    /**
     * Validate the eligibility of an existing shipping label.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     */
    checkShippingLabelEligibility(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.get(`/${id}/check_label_print_eligibility`);
    }

    /**
     * Create a return draft.
     *
     * @param payload the SetReturnCreationSessionRequest
     */
    createReturnDraft(payload: SetReturnCreationSessionRequest) {
        return this.post(`/draft`, payload);
    }

    /**
     * Request a return for an item.
     *
     * @param payload the CreateReturnRequest
     * @param fieldGroups can be used in the call URI to control the detail level that is returned in response.
     */
    createReturnRequest(payload: CreateReturnRequest, fieldGroups?: GetReturnFieldGroupEnum) {
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
    createReturnShippingLabel(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/initiate_shipping_label`);
    }

    /**
     * Delete a file associated with a return draft.
     *
     * @param draftId    The unique eBay-assigned ID of the return draft.
     * @param fileId The unique eBay-assigned ID of the draft file.
     */
    deleteReturnDraftFile(draftId: string, fileId: string) {
        const dId = encodeURIComponent(draftId);
        const fId = encodeURIComponent(fileId);

        return this.delete(`/draft/${dId}/file/${fId}`);
    }

    /**
     * Escalate an existing return to eBay customer support.
     *
     * @param returnId The unique eBay-assigned ID of the return request.
     * @param payload the EscalateRequest
     */
    escalateReturn(returnId: string, payload?: EscalateRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/escalate`, payload);
    }

    /**
     * Retrieve the details of a specific return.
     *
     * @param returnId The unique eBay-assigned ID of the return request.
     * @param fieldGroups can be used in the call URI to control the detail level that is returned in response.
     */
    getReturn(returnId: string, fieldGroups?: GetReturnFieldGroupEnum) {
        const id = encodeURIComponent(returnId);
        return this.get(`/${id}`, {
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
    getReturnDraft(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.get(`/draft/${id}`);
    }

    /**
     * Retrieve the files associated with a return draft.
     *
     * @param returnId    The unique eBay-assigned ID of the return draft.
     */
    getReturnDraftFiles(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.get(`/draft/${id}/files`);
    }

    /**
     * Retrieve the cost estimate of a refund with its shipping cost.
     *
     * @param payload the GetEstimateRequest
     */
    getReturnEstimate(payload: GetEstimateRequest) {
        return this.post(`/estimate`, payload);
    }

    /**
     * Retrieve the cost estimate of a refund with its shipping cost.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     */
    getReturnFiles(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.get(`/${id}/files`);
    }

    /**
     * Retrieve seller's return preferences.
     */
    getReturnPreferences() {
        return this.get(`/preference`);
    }

    /**
     * Retrieve the data for an existing shipping label.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     */
    getReturnShippingLabel(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.get(`/${id}/get_shipping_label`);
    }

    /**
     * Retrieve shipment tracking activity for a return.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param carrierUsed The shipping carrier used to to ship the package.
     * @param trackingNumber The tracking number of the package.
     */
    getShipmentTrackingInfo(returnId: string, carrierUsed: string, trackingNumber: string) {
        const id = encodeURIComponent(returnId);
        return this.get(`/${id}/tracking`, {
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
     */
    issueReturnRefund(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/issue_refund`);
    }

    /**
     * Mark a returned item as received.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the MarkAsReceivedRequest
     */
    markReturnReceived(returnId: string, payload?: MarkAsReceivedRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/mark_as_received`, payload);
    }

    /**
     * Mark a refund as received.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     */
    markReturnRefundReceived(returnId: string) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/mark_refund_received`);
    }

    /**
     * Notify the buyer that a refund has been issued.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the MarkRefundSentRequest
     */
    markReturnRefundSent(returnId: string, payload: MarkRefundSentRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/mark_refund_sent`, payload);
    }

    /**
     * Mark a return as shipped.
     *
     * @param returnId    The unique eBay-assigned ID of the return.
     * @param payload the MarkAsShippedRequest
     */
    markReturnShipped(returnId: string, payload?: MarkAsShippedRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/mark_as_shipped`, payload);
    }

    /**
     * Perform an action on a return, such as APPROVE.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the DecideReturnRequest
     */
    processReturnRequest(returnId: string, payload: DecideReturnRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/decide`, payload);
    }

    /**
     * Retrieve details on items being returned.
     *
     * @param params the SearchReturnParams
     */
    search(params: SearchReturnParams) {
        return this.post(`/search`, {
            params
        });
    }

    /**
     * Send a message to the buyer or seller regarding a return.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the SendMessageRequest
     */
    sendReturnMessage(returnId: string, payload?: SendMessageRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/send_message`, payload);
    }

    /**
     * Send a shipping label to an email address.
     *
     * @param returnId    The unique eBay-assigned ID of the return.
     * @param toEmailAddress The recipient's email address is specified in this field.
     */
    sendReturnShippingLabel(returnId: string, toEmailAddress?: string) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/send_shipping_label`, {}, {
            params: {
                to_email_address: toEmailAddress
            }
        });
    }

    /**
     * Send a shipping label to an email address.
     *
     * @param rmaRequired This field is included and set to true if the seller wishes to require that the buyer provide a Return Merchandise Authorization (RMA) when returning an item.
     */
    setReturnPreferences(rmaRequired: boolean) {
        return this.post(`/preference`, {
            rmaRequired
        });
    }

    /**
     * Activate the files associated with a return.
     *
     * @param returnId    The unique eBay-assigned ID of the return.
     * @param filePurpose This value is used to indicate if the file(s) are being used to provide more information about the condition of the item, or intended to provide more information about shipment tracking or about the shipping label.
     */
    submitReturnFile(returnId: string, filePurpose?: FilePurposeEnum) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/file/submit`, {
            filePurpose
        });
    }

    /**
     * Update an existing return draft.
     *
     * @param draftId The unique eBay-assigned ID of the return draft.
     * @param returnRequest the ReturnRequestType
     */
    updateReturnDraft(draftId: string, returnRequest: ReturnRequestType) {
        const id = encodeURIComponent(draftId);
        return this.put(`/draft/${id}`, {
            returnRequest
        });
    }

    /**
     * Update shipment tracking information.
     *
     * @param returnId The unique eBay-assigned ID of the return request.
     * @param payload the UpdateTrackingRequest
     */
    updateShipmentTrackingInfo(returnId: string, payload: UpdateTrackingRequest) {
        const id = encodeURIComponent(returnId);
        return this.put(`/${id}/update_tracking`, payload);
    }

    /**
     * Upload the files relating to a return draft.
     *
     * @param draftId The unique eBay-assigned ID of the return draft.
     * @param payload the UploadFileRequest
     */
    uploadReturnDraftFile(draftId: string, payload: UploadFileRequest) {
        const id = encodeURIComponent(draftId);
        return this.post(`/${id}/draft/file/upload`, payload);
    }

    /**
     * Upload the files relating to a return.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the UploadFileRequest
     */
    uploadReturnFile(returnId: string, payload: UploadFileRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/file/upload`, payload);
    }

    /**
     * Void a shipping label.
     *
     * @param returnId The unique eBay-assigned ID of the return.
     * @param payload the VoidLabelRequest
     */
    voidShippingLabel(returnId: string, payload: VoidLabelRequest) {
        const id = encodeURIComponent(returnId);
        return this.post(`/${id}/void_shipping_label`, payload);
    }
}