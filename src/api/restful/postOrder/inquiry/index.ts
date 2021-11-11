import Restful from '../../';
import {
  BuyerCloseInquiryRequest,
  CheckInquiryEligibilityRequest,
  CreateInquiryRequest,
  EscalateInquiryRequest,
  InquirySearchParams,
  InquiryVoluntaryRefundRequest,
  SellerProvideRefundInfoRequest,
  SendMessageRequest,
  ShipmentInfoRequest
} from '../../../../types';

/**
 * Post-Order Inquiry API
 */
export default class Inquiry extends Restful {

  static id = 'Inquiry';

  get basePath(): string {
    return '/post-order/v2';
  }

  get useIaf() {
    return true;
  }

  /**
   * Check if a buyer is eligible to open an inquiry on an order.
   *
   * @param payload the CheckInquiryEligibilityRequest
   */
  public checkInquiryEligibility(payload: CheckInquiryEligibilityRequest) {
    return this.post(`/inquiry/check_eligibility`, payload);
  }

  /**
   * Close an inquiry for the buyer
   *
   * @param inquiryId The unique ID of the inquiry to be closed.
   * @param payload the BuyerCloseInquiryRequest
   */
  public closeInquiry(inquiryId: string, payload?: BuyerCloseInquiryRequest) {
    inquiryId = encodeURIComponent(inquiryId);
    if (typeof payload?.closeReason === 'string') {
      payload.closeReason = payload.closeReason.trim();
    }
    return this.post(`/inquiry/${inquiryId}/close`, payload);
  }

  /**
   * Buyer confirms the refund from an inquiry was received
   *
   * @param inquiryId The unique identifier of a case.
   */
  public confirmInquiryRefund(inquiryId: string) {
    inquiryId = encodeURIComponent(inquiryId);
    return this.post(`/inquiry/${inquiryId}/confirm_refund`);
  }

  /**
   * Create an inquiry for the buyer.
   *
   * @param payload the CreateInquiryRequest
   */
  public createInquiry(payload: CreateInquiryRequest) {
    if (typeof payload.desiredOutcome === 'string') {
      payload.desiredOutcome = payload.desiredOutcome.trim();
    }
    return this.post(`/inquiry`, payload);
  }

  /**
   * Escalate an inquiry to an INR case.
   *
   * @param inquiryId the unique identifier of the inquiry to be escalated.
   * @param payload the EscalateInquiryRequest
   */
  public escalateInquiry(inquiryId: string, payload: EscalateInquiryRequest) {
    inquiryId = encodeURIComponent(inquiryId);
    payload.escalateInquiryReason = payload.escalateInquiryReason.trim();
    return this.post(`/inquiry/${inquiryId}/escalate`, payload);
  }

  /**
   * Retrieve the history and details related to a specific inquiry.
   *
   * @param inquiryId the unique ID of the inquiry for which details and history are to be retrieved.
   */
  public getInquiry(inquiryId: string) {
    inquiryId = encodeURIComponent(inquiryId);
    return this.get(`/inquiry/${inquiryId}`);
  }

  /**
   * Issue a refund for an inquiry.
   *
   * @param inquiryId the unique ID of the inquiry for which a refund is to be issued.
   * @param payload   the InquiryVoluntaryRefundRequest
   */
  public issueInquiryRefund(inquiryId: string, payload?: InquiryVoluntaryRefundRequest) {
    inquiryId = encodeURIComponent(inquiryId);
    return this.post(`/inquiry/${inquiryId}/issue_refund`, payload);
  }

  /**
   * Provide refund information about an inquiry to the buyer.
   *
   * @param inquiryId The unique ID of the inquiry for which to provide refund information.
   * @param payload   the InquiryVoluntaryRefundRequest
   */
  public provideInquiryRefundInfo(inquiryId: string, payload: SellerProvideRefundInfoRequest) {
    inquiryId = encodeURIComponent(inquiryId);
    return this.post(`/inquiry/${inquiryId}/provide_refund_info`, payload);
  }

  /**
   * Provide shipment information for an inquiry.
   *
   * @param inquiryId The unique ID of the inquiry for which to provide shipment information.
   * @param payload the  ShipmentInfoRequest
   */
  public provideInquiryShipmentInfo(inquiryId: string, payload?: ShipmentInfoRequest) {
    inquiryId = encodeURIComponent(inquiryId);
    return this.post(`/inquiry/${inquiryId}/provide_shipment_info`, payload);
  }

  /**
   * This call is used to search for inquiries using multiple filter types.
   *
   * @param params the  InquirySearchParams
   */
  public search(params?: InquirySearchParams) {
    return this.get(`/inquiry/search`, {
      params
    });
  }

  /**
   * Contact the buyer or seller about an inquiry.
   *
   * @param inquiryId The unique ID of the inquiry being discussed.
   * @param payload the SendMessageRequest
   */
  public sendInquiryMessage(inquiryId: string, payload: SendMessageRequest) {
    inquiryId = encodeURIComponent(inquiryId);
    return this.post(`/inquiry/${inquiryId}/send_message`, payload);
  }
}
