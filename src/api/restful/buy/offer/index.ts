import Api from '../../';
import {PlaceProxyBidRequest} from '../../../../types/restfulTypes';

/**
 * The Api Offer API enables Partners to place proxy bids for a buyer and retrieve the auctions where the buyer is
 * bidding. Client Credentials: https://api.ebay.com/oauth/api_scope/buy.offer.auction
 */
export default class Offer extends Api {

    get basePath(): string {
        return '/buy/offer/v1_beta';
    }

    /**
     * This method retrieves the bidding details that are specific to the buyer of the specified auction.
     *
     * @param itemId
     * @param marketplaceId
     */
    public getBidding(itemId: string, marketplaceId: string) {
        const id = encodeURIComponent(itemId);
        return this.get(`/bidding/${id}`, {
            headers: {
                'X-EBAY-C-MARKETPLACE-ID': marketplaceId
            }
        });
    }

    /**
     * This method uses a user access token to place a proxy bid for the buyer on a specific auction item.
     *
     * @param itemId
     * @param marketplaceId
     * @param {PlaceProxyBidRequest} body
     */
    public placeProxyBid(itemId: string, marketplaceId: string, body?: PlaceProxyBidRequest) {
        const id = encodeURIComponent(itemId);
        return this.post(`/bidding/${id}/place_proxy_bid`,
            body, {
                headers: {
                    'X-EBAY-C-MARKETPLACE-ID': marketplaceId
                }
            });
    }
}
