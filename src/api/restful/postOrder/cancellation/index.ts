import Api from '../../';
import {CancellationSearchParams, ConfirmRefundRequest, CreateCancelRequest, RejectCancelRequest} from '../../../../types/restfulTypes';

/**
 * Post-Order Cancellation API
 */
export default class Cancellation extends Api {
    get basePath(): string {
        return '/post-order/v2/cancellation';
    }

    public useIaf() {
        return true;
    }

    /**
     * Seller approves a cancellation request
     *
     * @param cancelId The unique eBay-assigned identifier of the cancellation request to be approved.
     */
    public approveCancellationRequest(cancelId: string) {
        const id = encodeURIComponent(cancelId);
        return this.post(`/${id}/approve`);
    }

    /**
     * Check the eligibility of an order cancellation
     *
     * @param legacyOrderId The unique ID of the order being canceled or the order being considered for cancellation.
     */
    public checkCancellationEligibility(legacyOrderId: string) {
        return this.post(`/check_eligibility`, {
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
        const id = encodeURIComponent(cancelId);
        return this.post(`/${id}/confirm`, payload);
    }

    /**
     * Request or perform an order cancellation.
     *
     * @param payload the CreateCancelRequest
     */
    public createCancellation(payload: CreateCancelRequest) {
        return this.post(`/cancellation/`, payload);
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
        const id = encodeURIComponent(cancelId);
        return this.get(`/${id}`, {
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
        const id = encodeURIComponent(cancelId);
        return this.post(`/${id}/reject`, payload);
    }

    /**
     * Search for cancellations.
     *
     * @param params the SearchParams
     */
    public search(params: CancellationSearchParams) {
        return this.get(`/search`, {
            params: {
                params
            }
        });
    }
}
