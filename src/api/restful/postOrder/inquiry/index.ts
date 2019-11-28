import Api from '../../api';
import {
    BuyerCloseInquiryRequest,
    CheckInquiryEligibilityRequest,
    CreateInquiryRequest,
    EscalateInquiryRequest,
    InquirySearchParams,
    InquiryVoluntaryRefundRequest,
    SellerProvideRefundInfoRequest, SendMessageRequest,
    ShipmentInfoRequest
} from '../../types';

/**
 * Post-Order Inquiry API
 */
export default class Inquiry extends Api {
    get basePath(): string {
        return '/post-order/v2/inquiry';
    }

    useIaf() {
        return true;
    }

    /**
     * Check if a buyer is eligible to open an inquiry on an order.
     *
     * @param payload the CheckInquiryEligibilityRequest
     */
    checkInquiryEligibility(payload: CheckInquiryEligibilityRequest) {
        return this.post(`/check_eligibility`, payload);
    }

    /**
     * Close an inquiry for the buyer
     *
     * @param inquiryId The unique ID of the inquiry to be closed.
     * @param payload the BuyerCloseInquiryRequest
     */
    closeInquiry(inquiryId: string, payload?: BuyerCloseInquiryRequest) {
        const id = encodeURIComponent(inquiryId);
        if (payload && payload.closeReason) {
            payload.closeReason = payload.closeReason.trim();
        }
        return this.post(`/${id}/close`, payload);
    }

    /**
     * Buyer confirms the refund from an inquiry was received
     *
     * @param inquiryId The unique identifier of a case.
     */
    confirmInquiryRefund(inquiryId: string) {
        const id = encodeURIComponent(inquiryId);
        return this.post(`/${id}/confirm_refund`);
    }

    /**
     * Create an inquiry for the buyer.
     *
     * @param payload the CreateInquiryRequest
     */
    createInquiry(payload: CreateInquiryRequest) {
        if (payload.desiredOutcome) {
            payload.desiredOutcome = payload.desiredOutcome.trim();
        }
        return this.post(``, payload);
    }

    /**
     * Escalate an inquiry to an INR case.
     *
     * @param inquiryId the unique identifier of the inquiry to be escalated.
     * @param payload the EscalateInquiryRequest
     */
    escalateInquiry(inquiryId: string, payload: EscalateInquiryRequest) {
        const id = encodeURIComponent(inquiryId);
        payload.escalateInquiryReason = payload.escalateInquiryReason.trim();
        return this.post(`/${id}/escalate`, payload);
    }

    /**
     * Retrieve the history and details related to a specific inquiry.
     *
     * @param inquiryId the unique ID of the inquiry for which details and history are to be retrieved.
     */
    getInquiry(inquiryId: string) {
        const id = encodeURIComponent(inquiryId);
        return this.get(`/${id}`);
    }

    /**
     * Issue a refund for an inquiry.
     *
     * @param inquiryId the unique ID of the inquiry for which a refund is to be issued.
     * @param payload   the InquiryVoluntaryRefundRequest
     */
    issueInquiryRefund(inquiryId: string, payload?: InquiryVoluntaryRefundRequest) {
        const id = encodeURIComponent(inquiryId);
        return this.post(`/${id}/issue_refund`, payload);
    }

    /**
     * Provide refund information about an inquiry to the buyer.
     *
     * @param inquiryId The unique ID of the inquiry for which to provide refund information.
     * @param payload   the InquiryVoluntaryRefundRequest
     */
    provideInquiryRefundInfo(inquiryId: string, payload: SellerProvideRefundInfoRequest) {
        const id = encodeURIComponent(inquiryId);
        return this.post(`/${id}/provide_refund_info`, payload);
    }

    /**
     * Provide shipment information for an inquiry.
     *
     * @param inquiryId The unique ID of the inquiry for which to provide shipment information.
     * @param payload the  ShipmentInfoRequest
     */
    provideInquiryShipmentInfo(inquiryId: string, payload?: ShipmentInfoRequest) {
        const id = encodeURIComponent(inquiryId);
        return this.post(`/${id}/provide_shipment_info`, payload);
    }

    /**
     * This call is used to search for inquiries using multiple filter types.
     *
     * @param params the  InquirySearchParams
     */
    search(params?: InquirySearchParams) {
        return this.get(`/search`, {
            params
        });
    }

    /**
     * Contact the buyer or seller about an inquiry.
     *
     * @param inquiryId The unique ID of the inquiry being discussed.
     * @param payload the SendMessageRequest
     */
    sendInquiryMessage(inquiryId: string, payload: SendMessageRequest) {
        const id = encodeURIComponent(inquiryId);
        return this.post(`/${id}/send_message`, payload);
    }
}