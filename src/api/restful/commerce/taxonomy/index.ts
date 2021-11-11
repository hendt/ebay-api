import Restful from '../../';

/**
 * Use the Taxonomy API to discover the most appropriate eBay categories under which sellers can offer inventory items
 * for sale, and the most likely categories under which buyers can browse or search for items to purchase.
 */
export default class Taxonomy extends Restful {

  static id = 'Taxonomy';

  get basePath(): string {
    return '/commerce/taxonomy/v1';
  }

  /**
   * A given eBay marketplace might use multiple category trees, but one of those trees is considered to be the
   * default for that marketplace.
   *
   * @param marketplaceId The ID of the eBay marketplace for which the category tree ID is being requested.
   */
  public getDefaultCategoryTreeId(marketplaceId: string) {
    return this.get(`/get_default_category_tree_id`, {
      params: {
        marketplace_id: marketplaceId
      }
    });
  }

  /**
   * This call retrieves the complete category tree that is identified by the category_tree_id parameter.
   *
   * @param categoryTreeId
   */
  public getCategoryTree(categoryTreeId: string) {
    const cId = encodeURIComponent(categoryTreeId);
    return this.get(`/category_tree/${cId}`);
  }

  /**
   * This call retrieves the details of all nodes of the category tree hierarchy (the subtree) below a specified
   * category of a category tree.
   *
   * @param categoryTreeId The unique identifier of the eBay category tree from which a category subtree is being
   *     requested.
   * @param categoryId The unique identifier of the category at the top of the subtree being requested.
   */
  public getCategorySubtree(categoryTreeId: string, categoryId: string) {
    categoryTreeId = encodeURIComponent(categoryTreeId);
    return this.get(`/category_tree/${categoryTreeId}/get_category_subtree`, {
      params: {
        category_id: categoryId
      }
    });
  }

  /**
   * This call returns an array of category tree leaf nodes in the specified category tree that are considered by eBay
   *  to most closely correspond to the query string q.
   *
   * @param categoryTreeId The unique identifier of the eBay category tree for which suggested nodes are being
   *     requested.
   * @param q A quoted string that describes or characterizes the item being offered for sale.
   */
  public getCategorySuggestions(categoryTreeId: string, q: string) {
    return this.get(`/category_tree/${categoryTreeId}/get_category_suggestions`, {
      params: {
        q
      }
    });
  }

  /**
   * This call returns a list of aspects that are appropriate or necessary for accurately describing items in the
   * specified leaf category.
   *
   * @param categoryTreeId The unique identifier of the eBay category tree from which the specified category's
   *     aspects are being requested.
   * @param categoryId The unique identifier of the leaf category for which aspects are being requested.
   */
  public getItemAspectsForCategory(categoryTreeId: string, categoryId: string) {
    categoryTreeId = encodeURIComponent(categoryTreeId);
    return this.get(`/category_tree/${categoryTreeId}/get_item_aspects_for_category`, {
      params: {
        category_id: categoryId
      }
    });
  }

  /**
   * This call retrieves the compatible vehicle aspects that are used to define a motor vehicle that is compatible
   * with a motor vehicle part or accessory.
   *
   * @param categoryTreeId This is the unique identifier of category tree. The following is the list of
   * category_tree_id values and the eBay marketplaces that they represent.
   *
   * @param categoryId The unique identifier of an eBay category.
   */
  public getCompatibilityProperties(categoryTreeId: string, categoryId: string) {
    categoryTreeId = encodeURIComponent(categoryTreeId);
    return this.get(`/category_tree/${categoryTreeId}/get_compatibility_properties`, {
      params: {
        category_id: categoryId
      }
    });
  }

  /**
   * This call retrieves applicable compatible vehicle property values based on the specified eBay marketplace,
   * specified eBay category, and filters used in the request.
   *
   * @param categoryTreeId This is the unique identifier of the category tree.
   * @param categoryId The unique identifier of an eBay category.
   * @param compatibilityProperty One compatible vehicle property applicable to the specified eBay marketplace and
   *     eBay category is specified in this required filter.
   */
  public getCompatibilityPropertyValues(
    categoryTreeId: string,
    categoryId: string,
    compatibilityProperty: string
  ) {
    categoryTreeId = encodeURIComponent(categoryTreeId);
    return this.get(`/category_tree/${categoryTreeId}/get_compatibility_property_values`, {
      params: {
        category_id: categoryId,
        compatibility_property: compatibilityProperty
      }
    });
  }

  /**
   * This call returns a complete list of aspects for all of the leaf categories that belong to an eBay marketplace.
   *
   * @param categoryTreeId
   *
   * @return A JSON GZIP compressed file buffer
   */
  public fetchItemAspects(categoryTreeId: string): Promise<Buffer> {
    categoryTreeId = encodeURIComponent(categoryTreeId);
    return this.get(`/category_tree/${categoryTreeId}/fetch_item_aspects`, {
      responseType: 'arraybuffer'
    });
  }
}
