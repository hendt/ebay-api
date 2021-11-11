import Api from '../../';
import {
  CheckoutSessionRequest,
  CouponRequest,
  CreateSignInCheckoutSessionRequest,
  GuestPlaceOrderRequest,
  InitiatePaymentRequest,
  ShippingAddressImpl,
  UpdatePaymentInformation,
  UpdateQuantity,
  UpdateShippingOption
} from '../../../../types';

/**
 * The Order API provides interfaces that lets shoppers pay for items (for both eBay guest and eBay member buyers).
 * Client Credentials: https://api.ebay.com/oauth/api_scope/buy.order
 */
export default class Order extends Api {

  static id = 'Order';

  get basePath(): string {
    return '/buy/order/v1';
  }

  /**
   * (Limited Release) You must be whitelisted to use this method.
   * This method adds a coupon to an eBay proxy guest checkout session and applies it to all the eligible items in
   * the order.
   *
   * @param {String} checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is
   *     returned by the initiateCheckoutSession method.
   * @param body The container for the fields used to apply a coupon to a checkout session.
   */
  public applyCoupon(checkoutSessionId: string, body: CouponRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/apply_coupon`, body);
  }

  /**
   * This method returns the details of the specified eBay member checkout session.
   *
   * @param {String} checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is
   *     returned by the initiateCheckoutSession method.
   */
  public getCheckoutSession(checkoutSessionId: string) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.get(`/checkout_session/${checkoutSessionId}`);
  }

  /**
   * This method creates a eBay member checkout session, which is the first step in performing a checkout.
   *
   * @param body The container for the fields used by the initiateCheckoutSession method.
   */
  public initiateCheckoutSession(body?: CreateSignInCheckoutSessionRequest) {
    return this.post(`/checkout_session/initiate`, body);
  }

  /**
   * This method creates the purchase order, pays for the items, and terminates the specified eBay member checkout
   * session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   */
  public placeOrder(checkoutSessionId: string) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/place_order`);
  }

  /**
   * (Limited Release) You must be whitelisted to use this method. This method removes a coupon from an eBay member
   * checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body CouponRequest
   */
  public removeCoupon(checkoutSessionId: string, body?: CouponRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/remove_coupon`, body);
  }

  /**
   * This method changes the payment method information of the specified eBay member checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdatePaymentInformation
   */
  public updatePaymentInfo(checkoutSessionId: string, body?: UpdatePaymentInformation) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/update_payment_info`, body);
  }

  /**
   * This method changes the quantity of the specified line item in an eBay member checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateQuantity
   */
  public updateQuantity(checkoutSessionId: string, body?: UpdateQuantity) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/update_quantity`, body);
  }

  /**
   * This method changes the quantity of the specified line item in an eBay member checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateQuantity
   */
  public checkoutSessionId(checkoutSessionId: string, body?: UpdateQuantity) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/update_quantity`, body);
  }

  /**
   * This method changes the shipping address for in an eBay member checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body ShippingAddressImpl
   */
  public updateShippingAddress(checkoutSessionId: string, body?: ShippingAddressImpl) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/update_shipping_address`, body);
  }

  /**
   * This method changes the shipping method for the specified line item in an eBay member checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateShippingOption
   */
  public updateShippingOption(checkoutSessionId: string, body?: UpdateShippingOption) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/checkout_session/${checkoutSessionId}/update_shipping_option`, body);
  }

  /**
   * (Limited Release) You must be whitelisted to use this method. This method adds a coupon to an eBay guest
   * checkout
   *  session and applies it to all the eligible items in the order.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body CouponRequest
   */
  public applyGuestCoupon(checkoutSessionId: string, body?: CouponRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/apply_coupon`, body);
  }

  /**
   * This method returns the details of the specified guest checkout session. The checkoutSessionId is passed in as a
   * URI parameter and is required.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   */
  public getGuestCheckoutSession(checkoutSessionId: string) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.get(`/guest_checkout_session/${checkoutSessionId}`);
  }

  /**
   * This method creates an eBay guest checkout session, which is the first step in performing a checkout.
   *
   * @param body CheckoutSessionRequest
   */
  public initiateGuestCheckoutSession(body?: CheckoutSessionRequest) {
    return this.post(`/guest_checkout_session/initiate`, body);
  }

  /**
   * This method is used only in the PayPal Smart Button eBay guest payment flow.
   *
   *  @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   *  @param body InitiatePaymentRequest
   */
  public initiateGuestPayment(checkoutSessionId: string, body?: InitiatePaymentRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/initiate_payment`, body);
  }

  /**
   * This method creates the purchase order, pays for the items, and terminates the specified guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body GuestPlaceOrderRequest
   */
  public placeGuestOrder(checkoutSessionId: string, body?: GuestPlaceOrderRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/place_order`, body);
  }

  /**
   * (Limited Release) You must be whitelisted to use this method. This method removes a coupon from an eBay guest
   * checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body CouponRequest
   */
  public removeGuestCoupon(checkoutSessionId: string, body?: CouponRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/remove_coupon`, body);
  }

  /**
   * This method changes the payment method information of the specified guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdatePaymentInformation
   */
  public updateGuestPaymentInfo(checkoutSessionId: string, body?: UpdatePaymentInformation) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/update_payment_info`, body);
  }

  /**
   * This method changes the quantity of the specified line item in an eBay guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateQuantity
   */
  public updateGuestQuantity(checkoutSessionId: string, body?: UpdateQuantity) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/update_quantity`, body);
  }

  /**
   * This method changes the shipping address for the order in an eBay guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body ShippingAddressImpl
   */
  public updateGuestShippingAddress(checkoutSessionId: string, body?: ShippingAddressImpl) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/update_shipping_address`, body);
  }

  /**
   * This method changes the shipping method for the specified line item in an eBay guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateShippingOption
   */
  public updateGuestShippingOption(checkoutSessionId: string, body?: UpdateShippingOption) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/guest_checkout_session/${checkoutSessionId}/update_shipping_option`, body);
  }

  /**
   * (Limited Release) You must be whitelisted to use this method. This method adds a coupon to an eBay proxy guest
   * checkout session and applies it to all the eligible items in the order.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body CouponRequest
   */
  public applyProxyGuestCoupon(checkoutSessionId: string, body?: CouponRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/apply_coupon`, body);
  }

  /**
   * This method returns the details of the specified eBay proxy guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   */
  public getProxyGuestCheckoutSession(checkoutSessionId: string) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.get(`/proxy_guest_checkout_session/${checkoutSessionId}`);
  }

  /**
   * This method creates an eBay proxy guest checkout session, which is a payment flow that requires integration
   * with a VSP (vault service provider), such as Braintree. The VSP handles only the methods within this flow that
   * contain payment information.
   *
   * @param body CheckoutSessionRequest
   */
  public initiateProxyGuestCheckoutSession(body?: CheckoutSessionRequest) {
    return this.post(`/proxy_guest_checkout_session/initiate`, body);
  }

  /**
   * This method creates the proxy guest purchase order, pays for the items, and terminates the specified guest
   * checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body GuestPlaceOrderRequest
   */
  public placeProxyGuestOrder(checkoutSessionId: string, body?: GuestPlaceOrderRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/place_order`, body);
  }

  /**
   * (Limited Release) You must be whitelisted to use this method. This method removes a coupon from an eBay proxy
   * guest checkout session. The checkoutSessionId is passed in as a URI parameter and is required.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body CouponRequest
   */
  public removeProxyGuestCoupon(checkoutSessionId: string, body?: CouponRequest) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/remove_coupon`, body);
  }

  /**
   * This method adds or changes the payment information of the specified proxy guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param authorization The oAuth2 token. Note: The eBay partner must include this header in the request.
   * @param date The UTC timestamp of the request, which is generated and added to the request by the VSP.
   * @param requestNonce A UUID (a 128-bit universal unique ID), which is generated and added to the request by the
   *     VSP.
   * @param signature The HMAC signature, which is generated and added to the request by the VSP.
   * @param body UpdatePaymentInformation
   */
  public updateProxyGuestPaymentInfo(
    checkoutSessionId: string,
    authorization: string,
    date: string,
    requestNonce: string,
    signature: string,
    body?: UpdatePaymentInformation
  ) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/update_payment_info`, body, {
      headers: {
        'Authorization': authorization,
        'X-EBAY-C-DATE': date,
        'X-EBAY-C-REQUEST-NONCE': requestNonce,
        'X-EBAY-C-SIGNATURE': signature
      }
    });
  }

  /**
   * This method changes the quantity of the specified line item in an eBay proxy guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateQuantity
   */
  public updateProxyGuestQuantity(checkoutSessionId: string, body?: UpdateQuantity) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/update_quantity`, body);
  }

  /**
   * This method changes the shipping address for the order in an eBay proxy guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body ShippingAddressImpl
   */
  public updateProxyGuestShippingAddress(checkoutSessionId: string, body?: ShippingAddressImpl) {
    checkoutSessionId = encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/update_shipping_address`, body);
  }

  /**
   * This method changes the shipping method for the specified line item in an eBay proxy guest checkout session.
   *
   * @param checkoutSessionId The eBay-assigned session ID, for a specific eBay marketplace, that is returned by the
   *     initiateCheckoutSession method.
   * @param body UpdateShippingOption
   */
  public updateProxyGuestShippingOption(checkoutSessionId: string, body?: UpdateShippingOption) {
    checkoutSessionId= encodeURIComponent(checkoutSessionId);
    return this.post(`/proxy_guest_checkout_session/${checkoutSessionId}/update_shipping_option`, body);
  }

  /**
   * This method retrieves the details about a specific guest purchase order.
   *
   * @param purchaseOrderId The unique identifier of a purchase order made by a guest buyer, for which details are to
   *     be retrieved.
   */
  public getGuestPurchaseOrder(purchaseOrderId: string) {
    purchaseOrderId = encodeURIComponent(purchaseOrderId);
    return this.get(`/guest_purchase_order/${purchaseOrderId}`);
  }

  /**
   * This method retrieves the details about a specific eBay member purchase order.
   *
   * @param purchaseOrderId The unique identifier of a purchase order made by an eBay member, for which details are
   *     to be retrieved.
   */
  public getPurchaseOrder(purchaseOrderId: string) {
    purchaseOrderId = encodeURIComponent(purchaseOrderId);
    return this.get(`/purchase_order/${purchaseOrderId}`);
  }
}
