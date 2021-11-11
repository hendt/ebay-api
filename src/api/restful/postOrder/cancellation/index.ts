import Restful from '../../';
import {
  CancellationSearchParams,
  ConfirmRefundRequest,
  CreateCancelRequest,
  RejectCancelRequest
} from '../../../../types';

/**
 * Post-Order Cancellation API
 */
export default class Cancellation extends Restful {

  static id = 'Cancellation';

  get basePath(): string {
    return '/post-order/v2';
  }

  get useIaf() {
    return true;
  }

  /**
   * Seller approves a cancellation request
   *
   * @param cancelId The unique eBay-assigned identifier of the cancellation request to be approved.
   */
  public approveCancellationRequest(cancelId: string) {
    cancelId = encodeURIComponent(cancelId);
    return this.post(`/cancellation/${cancelId}/approve`);
  }

  /**
   * Check the eligibility of an order cancellation
   *
   * @param legacyOrderId The unique ID of the order being canceled or the order being considered for cancellation.
   */
  public checkCancellationEligibility(legacyOrderId: string) {
    return this.post(`/cancellation/check_eligibility`, {
      legacyOrderId
    });
  }

  /**
   * Buyer confirms the refund from a cancellation was received
   *
   * @param cancelId The unique eBay-assigned identifier of the cancellation/refund being confirmed.
   * @param payload the ConfirmRefundReceivedPayload
   */
  public confirmRefundReceived(cancelId: string, payload?: ConfirmRefundRequest) {
    cancelId = encodeURIComponent(cancelId);
    return this.post(`/cancellation/${cancelId}/confirm`, payload);
  }

  /**
   * Request or perform an order cancellation.
   *
   * @param payload the CreateCancelRequest
   */
  public createCancellation(payload: CreateCancelRequest) {
    return this.post(`/cancellation`, payload);
  }

  /**
   * Retrieve the details of an order cancellation.
   *
   * @param cancelId Supply in this path parameter the unique eBay-assigned ID of the cancellation request to
   *     retrieve.
   * @param fieldGroups    The value set in this query parameter controls the level of detail that is returned in the
   *     response.
   */
  public getCancellation(cancelId: string, fieldGroups?: string) {
    cancelId = encodeURIComponent(cancelId);
    return this.get(`/cancellation/${cancelId}`, {
      params: {
        fieldgroups: fieldGroups
      }
    });
  }

  /**
   * Seller rejects a cancellation request.
   *
   * @param cancelId The unique eBay-assigned identifier of the cancellation request to be rejected.
   * @param payload the RejectCancelRequest
   */
  public rejectCancellationRequest(cancelId: string, payload?: RejectCancelRequest) {
    cancelId = encodeURIComponent(cancelId);
    return this.post(`/cancellation/${cancelId}/reject`, payload);
  }

  /**
   * Search for cancellations.
   *
   * @param params the SearchParams
   */
  public search(params: CancellationSearchParams) {
    return this.get(`/cancellation/search`, {
      params: {
        params
      }
    });
  }
}
