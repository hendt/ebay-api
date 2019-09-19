import Api from "../../api";
import {
    AddCartItemInput, CompatibilityPayload,
    LegacyItemParams,
    RemoveCartItemInput,
    SearchByImageParams,
    SearchParams,
    UpdateCartItemInput
} from "../../types";

/**
 * The Browse API has the following resources: item_summary: Lets shoppers search for specific items by keyword, GTIN,
 * category, charity, product, or item aspects and refine the results by using filters, such as aspects, compatibility,
 * and fields values.
 */
export default class Browse extends Api {

    get basePath() {
        return '/buy/browse/v1';
    }

    //
    // Item
    // Client Credentials: https://api.ebay.com/oauth/api_scope
    //

    /**
     * This method searches for eBay items by various query parameters and retrieves summaries of the items.
     *
     * @param {SearchParams} params
     */
    search(params: SearchParams) {
        return this.get(`/item_summary/search`, {
            params
        });
    };

    /**
     * This is an Experimental method. This method searches for eBay items based on a image and retrieves summaries of the items.
     *
     * @param {SearchParams} params
     * @param {Object} body The container for the image information fields.
     */
    searchByImage(params: SearchByImageParams, body = {}) {
        return this.post(`/item_summary/search_by_image`, body, {
            params
        });
    };

    /**
     * This method retrieves the details of a specific item, such as description, price, category, all item aspects,
     * condition, return policies, seller feedback and score, shipping options, shipping costs, estimated delivery,
     * and other information the buyer needs to make a purchasing decision.
     *
     * @param {String} itemId The eBay RESTful identifier of an item.
     * @param {String} fieldgroups
     */
    getItem(itemId: string, fieldgroups?: string) {
        const id = encodeURIComponent(itemId);
        return this.get(`/item/${id}`, {
            params: {
                fieldgroups
            },
        });
    };

    /**
     * This method is a bridge between the eBay legacy APIs, such as Shopping, and Finding and the eBay Api APIs.
     *
     * @param {LegacyItemParams} params
     */
    getItemByLegacyId(params: LegacyItemParams) {
        return this.get(`/item/get_item_by_legacy_id`, {
            params,
        });
    }

    /**
     * This method retrieves the details of the individual items in an item group.
     *
     * @param itemGroupId
     */
    getItemsByItemGroup(itemGroupId: string) {
        return this.get(`/item/get_items_by_item_group`, {
            params: {
                item_group_id: itemGroupId
            }
        });
    };

    /**
     * This method checks if a product is compatible with the specified item.
     * @param {String} itemId The eBay RESTful identifier of an item (such as a part you want to check).
     * @param {String} marketplaceId The ID of the eBay marketplace you want to use. Note: This value is case sensitive.
     * @param {Object} body CompatibilityPayload
     */
    checkCompatibility(itemId: string, marketplaceId: string, body?: CompatibilityPayload) {
        const id = encodeURIComponent(itemId);
        return this.post(`/item/${id}/check_compatibility`, body, {
            headers: {
                'X-EBAY-C-MARKETPLACE-ID': marketplaceId
            }
        });
    }


    //
    // Shopping Cart
    // Authorization Code: https://api.ebay.com/oauth/api_scope/buy.shopping.cart
    //

    /**
     * This is an Experimental method. This method creates an eBay cart for the eBay member, if one does not exist, and adds items to that cart.
     *
     * @param {Object} item AddCartItemInput
     */
    addItem(item: AddCartItemInput) {
        return this.post(`/shopping_cart/add_item`, item);
    }

    /**
     * This is an experimental method. This method retrieves all the items in the eBay member's cart;
     * items added to the cart while on ebay.com as well as items added to the cart using the Browse API.
     */
    getShoppingCart() {
        return this.get(`/shopping_cart/`);
    }

    /**
     * This is an experimental method. This method removes a specific item from the eBay member's cart.
     *
     *  @param {Object} item RemoveCartItemInput
     */
    removeItem(item: RemoveCartItemInput) {
        return this.post(`/shopping_cart/remove_item`, item);
    }

    /**
     * This is an experimental method. This method updates the quantity value of a specific item in the eBay member's cart.
     *
     * @param {UpdateCartItemInput} item UpdateCartItemInput
     */
    updateQuantity(item: UpdateCartItemInput) {
        return this.post(`/shopping_cart/update_quantity`, item);
    }
}