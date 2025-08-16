import {
  SpecificationRequest,
  PropertyNamesRequest,
  PropertyValuesRequest,
  MultiCompatibilityPropertyValuesRequest,
  ProductRequest
} from '../../../../types/index.js';
import {operations} from '../../../../types/restful/specs/sell_metadata_v1_oas3.js';
import Restful, {OpenApi} from '../../index.js';

/**
 * The Metadata API has operations that retrieve configuration details pertaining to the different eBay marketplaces.
 */
export default class Metadata extends Restful implements OpenApi<operations> {

  static id = 'Metadata';

  get basePath(): string {
    return '/sell/metadata/v1';
  }

  /**
   * This method retrieves all the sales tax jurisdictions for the country that you specify in the countryCode path
   * parameter.
   *
   * @param countryCode This path parameter specifies the two-letter ISO 3166-1 Alpha-2 country code for the country
   *     whose jurisdictions you want to retrieve.
   */
  public getSalesTaxJurisdictions(countryCode: string) {
    countryCode = encodeURIComponent(countryCode);
    return this.get(`/country/${countryCode}/sales_tax_jurisdiction`);
  }

  /**
   * This method returns the eBay policies that define how to list automotive-parts-compatibility items in the
   * categories of a specific marketplace.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getAutomotivePartsCompatibilityPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_automotive_parts_compatibility_policies`, {
      params: {
        filter
      }
    });
  }

  /**
   * This method returns the Extended Producer Responsibility policies for one, multiple, or all eBay categories
   * in an eBay marketplace.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getExtendedProducerResponsibilityPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_extended_producer_responsibility_policies`, {
      params: {
        filter
      }
    });
  }

  /**
   * This method returns the eBay policies that define how to specify item conditions in the categories of a specific
   * marketplace.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getItemConditionPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_item_condition_policies`, {
      params: {
        filter
      }
    });
  }

  /**
   * This method returns the eBay policies that define the allowed listing structures for the categories of a
   * specific marketplace.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getListingStructurePolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_listing_structure_policies`, {
      params: {
        filter
      }
    });
  }

  /**
   * This method returns the eBay policies that define the supported negotiated price features (like &quot;best
   * offer&quot;) for the categories of a specific marketplace.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getNegotiatedPricePolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_negotiated_price_policies`, {
      params: {
        filter
      }
    });
  }

  /**
   * This method retrieves a list of leaf categories for a marketplace and identifies the categories that require
   * items to have an eBay product ID value in order to be listed in those categories.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getProductAdoptionPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_product_adoption_policies`, {
      params: {
        filter
      }
    });
  }

  /**
   * This method returns the eBay policies that define whether or not you must include a return policy for the
   * items you list in the categories of a specific marketplace, plus the guidelines for creating domestic and
   * international return policies in the different eBay categories.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which policy information is
   *     retrieved.
   * @param filter This query parameter limits the response by returning eBay policy information for only the leaf
   *     categories specified by this parameter.
   */
  public getReturnPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_return_policies`, {
      params: {
        filter
      }
    });
  }


  /**
   * This method returns hazardous materials label information for the specified eBay marketplace. The information
   * includes IDs, descriptions, and URLs (as applicable) for the available signal words, statements, and pictograms.
   * The returned statements are localized for the default langauge of the marketplace.
   * If a marketplace does not support hazardous materials label information, an error is returned.
   *
   * @param marketplaceId This path parameter specifies the eBay marketplace for which hazardous material labels are
   *     retrieved.
   */
  public getHazardousMaterialsLabels(marketplaceId: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_hazardous_materials_labels`);
  }

  /**
   * This method returns category policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getCategoryPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_category_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns classified ad policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getClassifiedAdPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_classified_ad_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns the currencies available for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   */
  public getCurrencies(marketplaceId: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_currencies`);
  }

  /**
   * This method returns listing type policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getListingTypePolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_listing_type_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns motors listing policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getMotorsListingPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_motors_listing_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns product safety labels for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   */
  public getProductSafetyLabels(marketplaceId: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_product_safety_labels`);
  }

  /**
   * This method returns regulatory policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getRegulatoryPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_regulatory_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns shipping policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getShippingPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_shipping_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns site visibility policies for the specified marketplace.
   * @param marketplaceId The eBay marketplace ID
   * @param filter Filter for specific categories
   */
  public getSiteVisibilityPolicies(marketplaceId: string, filter?: string) {
    marketplaceId = encodeURIComponent(marketplaceId);
    return this.get(`/marketplace/${marketplaceId}/get_site_visibility_policies`, {
      params: { filter }
    });
  }

  /**
   * This method returns compatibilities by specification.
   * @param body The specification request
   */
  public getCompatibilitiesBySpecification(body?: SpecificationRequest) {
    return this.post(`/compatibilities/get_compatibilities_by_specification`, body);
  }

  /**
   * This method returns compatibility property names.
   * @param body The property names request
   */
  public getCompatibilityPropertyNames(body?: PropertyNamesRequest) {
    return this.post(`/compatibilities/get_compatibility_property_names`, body);
  }

  /**
   * This method returns compatibility property values.
   * @param body The property values request
   */
  public getCompatibilityPropertyValues(body?: PropertyValuesRequest) {
    return this.post(`/compatibilities/get_compatibility_property_values`, body);
  }

  /**
   * This method returns multiple compatibility property values.
   * @param body The multi property values request
   */
  public getMultiCompatibilityPropertyValues(body?: MultiCompatibilityPropertyValuesRequest) {
    return this.post(`/compatibilities/get_multi_compatibility_property_values`, body);
  }

  /**
   * This method returns product compatibilities.
   * @param body The product compatibilities request
   */
  public getProductCompatibilities(body?: ProductRequest) {
    return this.post(`/compatibilities/get_product_compatibilities`, body);
  }
}
