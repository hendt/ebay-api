import Api from "../../api";
import {IssueRefundRequest} from "../../types";

/**
 * Use the Fulfillment API to complete the process of packaging, addressing, handling, and shipping each order on
 * behalf of the seller, in accordance with the payment method and timing specified at checkout.
 *
 * https://api.ebay.com/oauth/api_scope/sell.fulfillment
 * https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly
 *
 */
export default class Fulfillment extends Api {
    get basePath(): string {
        return '';
    }

    /**
     * Use this call to retrieve the contents of an order based on its unique identifier, orderId.
     *
     * @param orderId The unique identifier of the order.
     */
    getOrder(orderId: string) {
        return this.get(`${this.baseUrl}/order/${orderId}`);
    }

    /**
     * Use this call to search for and retrieve one or more orders based on their creation date, last modification date,
     * or fulfillment status using the filter parameter.
     *
     * @param filter One or more comma-separated criteria for narrowing down the collection of orders returned by this call.
     * @param limit The number of orders to return per page of the result set.
     * @param offset Specifies the number of orders to skip in the result set before returning the first order in the paginated response.
     * @param orderIds A comma-separated list of the unique identifiers of the orders to retrieve (maximum 50).
     */
    getOrders({
                  filter, limit, offset, orderIds
              }: { filter?: string, limit?: number, offset?: number, orderIds?: string[] } = {}) {
        return this.get(`${this.baseUrl}/order`, {
            params: {
                filter,
                limit,
                offset,
                orderIds
            }
        });
    }

    /**
     * This method allows a seller (opted in to eBay Managed Payments) to issue a full or partial refund to a buyer for an order.
     * auth: https://api.ebay.com/oauth/api_scope/sell.finances
     *
     * @param order_id The unique identifier of the order. Order IDs are returned in the getOrders method (and GetOrders call of Trading API).
     * @param body IssueRefundRequest
     */
    issueRefund(order_id: string, body?: IssueRefundRequest) {
        return this.post(`${this.baseUrl}/order/${order_id}/issue_refund`, body);
    }

    /**
     * Use this call to retrieve the contents of all fulfillments currently defined for a specified order based on the order's unique identifier, orderId.
     *
     * @param orderId The unique identifier of the order.
     */
    getShippingFulfillments(orderId: string) {
        const id = encodeURIComponent(orderId);
        return this.get(`${this.baseUrl}/order/${id}/shipping_fulfillment`);
    }

    /**
     * Use this call to retrieve the contents of a fulfillment based on its unique identifier, fulfillmentId (combined with the associated order's orderId).
     *
     * @param orderId The unique identifier of the order.
     * @param fulfillmentId The unique identifier of the fulfillment.
     */
    getShippingFulfillment(orderId: string, fulfillmentId: string) {
        const oId = encodeURIComponent(orderId);
        const fId = encodeURIComponent(fulfillmentId);
        return this.get(`${this.baseUrl}/order/${oId}/shipping_fulfillment/${fId}`);
    }
}