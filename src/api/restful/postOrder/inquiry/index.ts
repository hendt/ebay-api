import Restful from '../../index.js';
import {
  EscalateInquiryRequest,
  InquirySearchParams,
  InquiryVoluntaryRefundRequest,
  SendMessageRequest,
  ShipmentInfoRequest
} from '../../../../types/index.js';

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
    return this.get('/inquiry/search', {
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
