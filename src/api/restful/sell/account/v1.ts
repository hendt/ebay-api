import {PaymentsProgramType} from '../../../../enums/index.js';
import {
  CustomPolicyCreateRequest,
  CustomPolicyRequest,
  FulfillmentPolicyRequest,
  FulfillmentSellAccountProgram,
  InventoryLocation,
  InventoryLocationFull,
  PaymentPolicyRequest,
  ReturnPolicyRequest,
  SalesTaxBase
} from '../../../../types/index.js';
import {operations} from '../../../../types/restful/specs/sell_account_v1_oas3.js';

import Restful, {OpenApi} from '../../index.js';

/**
 * The <b>Account API</b> gives sellers the ability to configure their eBay seller accounts,
 * including the seller's policies (the Fulfillment Policy, Payment Policy, and Return Policy),
 * opt in and out of eBay seller programs, configure sales tax tables, and get account information.
 */
export default class AccountV1 extends Restful implements OpenApi<operations> {

  static id = 'AccountV1';

  get basePath(): string {
    return '/sell/account/v1';
  }

  /**
   * This method retrieves the list of custom policies specified by the <b>policy_types</b> query parameter for the selected eBay marketplace.
   * @param policyTypes This query parameter specifies the type of custom policies to be returned.
   */
  public getCustomPolicies(policyTypes: string) {
    return this.get('/custom_policy/', {
      params: {
        policy_types: policyTypes
      }
    });
  }

  /**
   * This method creates a new custom policy in which a seller specifies their terms for complying with local governmental regulations.
   * @param body Request to create a new Custom Policy.
   */
  public createCustomPolicy(body: CustomPolicyCreateRequest) {
    return this.post('/custom_policy/', body);
  }

  /**
   * This method retrieves the custom policy specified by the <b>custom_policy_id</b> path parameter for the selected eBay marketplace.
   * @param customPolicyId This path parameter is the unique custom policy identifier for the policy to be returned.
   */
  public getCustomPolicy(customPolicyId: string) {
    customPolicyId = encodeURIComponent(customPolicyId);
    return this.get(`/custom_policy/${customPolicyId}`);
  }

  /**
   * This method updates an existing custom policy specified by the <b>custom_policy_id</b> path parameter for the selected marketplace.
   * @param customPolicyId This path parameter is the unique custom policy identifier for the policy to be returned.
   * @param body Request to update a current custom policy.
   */
  public updateCustomPolicy(customPolicyId: string, body: CustomPolicyRequest) {
    customPolicyId = encodeURIComponent(customPolicyId);
    return this.put(`/custom_policy/${customPolicyId}`, body);
  }

  /**
   * This method retrieves all the fulfillment policies configured for the marketplace you specify using the
   * marketplace_id query parameter.
   *
   * @param marketplaceId This query parameter specifies the eBay marketplace of the policies you want to retrieve.
   */
  public getFulfillmentPolicies(marketplaceId: string) {
    return this.get('/fulfillment_policy', {
      params: {
        marketplace_id: marketplaceId
      }
    });
  }

  /**
   * This method creates a new fulfillment policy where the policy encapsulates seller's terms for fulfilling item
   * purchases.
   *
   * @param body Request to create a seller account fulfillment policy.
   */
  public createFulfillmentPolicy(body: FulfillmentPolicyRequest) {
    return this.post('/fulfillment_policy/', body);
  }

  /**
   * This method updates an existing fulfillment policy.
   *
   * @param fulfillmentPolicyId This path parameter specifies the ID of the fulfillment policy you want to update.
   * @param body Request to create a seller account fulfillment policy.
   */
  public updateFulfillmentPolicy(fulfillmentPolicyId: string, body: FulfillmentPolicyRequest) {
    fulfillmentPolicyId = encodeURIComponent(fulfillmentPolicyId);
    return this.put(`/fulfillment_policy/${fulfillmentPolicyId}`, body);
  }

  /**
   * This method deletes a fulfillment policy.
   *
   * @param fulfillmentPolicyId This path parameter specifies the ID of the fulfillment policy to delete.
   */
  public deleteFulfillmentPolicy(fulfillmentPolicyId: string) {
    fulfillmentPolicyId = encodeURIComponent(fulfillmentPolicyId);
    return this.delete(`/fulfillment_policy/${fulfillmentPolicyId}`);
  }

  /**
   * This method retrieves the complete details of a fulfillment policy.
   * Supply the ID of the policy you want to retrieve using the fulfillmentPolicyId path parameter.
   *
   * @param fulfillmentPolicyId This path parameter specifies the ID of the fulfillment policy you want to retrieve.
   */
  public getFulfillmentPolicy(fulfillmentPolicyId: string) {
    return this.get(`/fulfillment_policy/${fulfillmentPolicyId}`);
  }

  /**
   * This method retrieves the complete details for a single fulfillment policy.
   *
   * @param marketplaceId This query parameter specifies the eBay marketplace of the policy you want to retrieve.
   * @param name This query parameter specifies the user-defined name of the fulfillment policy you want to retrieve.
   */
  public getFulfillmentPolicyByName(marketplaceId: string, name: string) {
    return this.get('/fulfillment_policy/get_by_policy_name', {
      params: {
        marketplace_id: marketplaceId,
        name
      }
    });
  }

  /**
   * This method retrieves all the payment policies configured for the marketplace you specify using the
   * marketplace_id query parameter.
   *
   * @param marketplaceId This query parameter specifies the eBay marketplace of the policy you want to retrieve.
   */
  public getPaymentPolicies(marketplaceId: string) {
    return this.get('/payment_policy', {
      params: {
        marketplace_id: marketplaceId
      }
    });
  }

  /**
   * This method retrieves the complete details of a payment policy. Supply the ID of the policy you want to retrieve
   * using the paymentPolicyId path parameter.
   *
   * @param paymentPolicyId This path parameter specifies the ID of the payment policy you want to retrieve.
   */
  public getPaymentPolicy(paymentPolicyId: string) {
    paymentPolicyId = encodeURIComponent(paymentPolicyId);
    return this.get(`/payment_policy/${paymentPolicyId}`);
  }

  /**
   * This method creates a new payment policy where the policy encapsulates seller's terms for purchase payments.
   *
   * @param body Payment policy request
   */
  public createPaymentPolicy(body: PaymentPolicyRequest) {
    return this.post('/payment_policy', body);
  }

  /**
   * This method updates an existing payment policy.
   *
   * @param paymentPolicyId This path parameter specifies the ID of the payment policy you want to update.
   * @param body Payment policy request
   */
  public updatePaymentPolicy(paymentPolicyId: string, body: PaymentPolicyRequest) {
    paymentPolicyId = encodeURIComponent(paymentPolicyId);
    return this.put(`/payment_policy/${paymentPolicyId}`, body);
  }

  /**
   * This method updates an existing payment policy.
   *
   * @param paymentPolicyId This path parameter specifies the ID of the payment policy you want to delete.
   */
  public deletePaymentPolicy(paymentPolicyId: string) {
    paymentPolicyId = encodeURIComponent(paymentPolicyId);
    return this.delete(`/payment_policy/${paymentPolicyId}`);
  }

  /**
   * This method retrieves the complete details of a single payment policy.
   *
   * @param marketplaceId This query parameter specifies the eBay marketplace of the policy you want to retrieve.
   * @param name This query parameter specifies the user-defined name of the payment policy you want to retrieve.
   */
  public getPaymentPolicyByName(marketplaceId: string, name: string) {
    return this.get('/payment_policy/get_by_policy_name', {
      params: {
        marketplace_id: marketplaceId,
        name
      }
    });
  }

  /**
   * This method returns whether or not the user is opted-in to the payment program.
   *
   * @param marketplaceId This query parameter specifies the eBay marketplace of the policy you want to retrieve.
   * @param paymentsProgramType This path parameter specifies the payments program whose status is returned by the
   *     call.
   */
  public getPaymentsProgram(marketplaceId: string, paymentsProgramType: PaymentsProgramType | `${PaymentsProgramType}`) {
    marketplaceId = encodeURIComponent(marketplaceId);
    const type = encodeURIComponent(paymentsProgramType);
    return this.get(`/payments_program/${marketplaceId}/${type}`);
  }

  /**
   * This method retrieves a seller's onboarding status of eBay managed payments for a specified marketplace.
   *
   * @param marketplaceId This query parameter specifies the eBay marketplace of the policy you want to retrieve.
   * @param paymentsProgramType This path parameter specifies the payments program whose status is returned by the
   *     call.
   */
  public getPaymentsProgramOnboarding(marketplaceId: string, paymentsProgramType: PaymentsProgramType | `${PaymentsProgramType}`) {
    marketplaceId = encodeURIComponent(marketplaceId);
    const type = encodeURIComponent(paymentsProgramType);
    return this.get(`/payments_program/${marketplaceId}/${type}/onboarding`);
  }

  /**
   * This method retrieves the seller's current set of privileges.
   */
  public getPrivileges() {
    return this.get('/privilege');
  }

  /**
   * This method gets a list of the seller programs that the seller has opted-in to.
   */
  public getOptedInPrograms() {
    return this.get('/program/get_opted_in_programs');
  }

  /**
   * This method opts the seller in to an eBay seller program.
   *
   * @param body Program being opted-in to.
   */
  public optInToProgram(body?: FulfillmentSellAccountProgram) {
    return this.post('/program/opt_in', body);
  }

  /**
   * This method opts the seller out of a seller program to which you have previously opted-in to.
   *
   * @param body Program being opted-out of.
   */
  public optOutOfProgram(body?: FulfillmentSellAccountProgram) {
    return this.post('/program/opt_out', body);
  }

  /**
   * This method retrieves a seller's shipping rate tables for the country specified in the country_code query
   * parameter.
   *
   * @param countryCode This query parameter specifies the two-letter ISO 3166-1 Alpha-2 code of country for which
   *     you want shipping-rate table information.
   */
  public getRateTables(countryCode?: string) {
    return this.get('/rate_table', {
      params: {
        country_code: countryCode
      }
    });
  }

  /**
   * This method retrieves all the return policies configured for the marketplace you specify using the
   * marketplace_id query parameter.
   *
   * @param marketplaceId This query parameter specifies the ID of the eBay marketplace of the policy you want to
   *     retrieve.
   */
  public getReturnPolicies(marketplaceId: string) {
    return this.get('/return_policy', {
      params: {
        marketplace_id: marketplaceId
      }
    });
  }

  /**
   * This method retrieves the complete details of the return policy specified by the returnPolicyId path parameter.
   *
   * @param returnPolicyId This path parameter specifies the of the return policy you want to retrieve.
   */
  public getReturnPolicy(returnPolicyId: string) {
    returnPolicyId = encodeURIComponent(returnPolicyId);
    return this.get(`/return_policy/${returnPolicyId}`);
  }

  /**
   * This method creates a new return policy where the policy encapsulates seller's terms for returning items.
   *
   * @param body Return policy request
   */
  public createReturnPolicy(body: ReturnPolicyRequest) {
    return this.post('/return_policy', body);
  }

  /**
   * This method creates a new return policy where the policy encapsulates seller's terms for returning items.
   *
   *  @param returnPolicyId This path parameter specifies the ID of the return policy you want to update.
   * @param body Return policy request
   */
  public updateReturnPolicy(returnPolicyId: string, body: ReturnPolicyRequest) {
    returnPolicyId = encodeURIComponent(returnPolicyId);
    return this.put(`/return_policy/${returnPolicyId}`, body);
  }

  /**
   * This method deletes a return policy.
   *
   * @param returnPolicyId This path parameter specifies the ID of the return policy you want to delete.
   */
  public deleteReturnPolicy(returnPolicyId: string) {
    returnPolicyId = encodeURIComponent(returnPolicyId);
    return this.delete(`/return_policy/${returnPolicyId}`);
  }

  /**
   * This method retrieves the complete details of a single return policy.
   *
   * @param marketplaceId This query parameter specifies the ID of the eBay marketplace of the policy you want to
   *     retrieve.
   * @param name This query parameter specifies the user-defined name of the return policy you want to retrieve.
   */
  public getReturnPolicyByName(marketplaceId: string, name: string) {
    return this.get('/return_policy/get_by_policy_name', {
      params: {
        marketplace_id: marketplaceId,
        name
      }
    });
  }

  /**
   * This call gets the current tax table entry for a specific tax jurisdiction.
   *
   * @param countryCode This path parameter specifies the two-letter ISO 3166-1 Alpha-2 code for the country whose
   *     tax table you want to retrieve.
   * @param jurisdictionId This path parameter specifies the ID of the sales tax jurisdiction for the tax table entry
   *     you want to retrieve.
   */
  public getSalesTax(countryCode: string, jurisdictionId: string) {
    countryCode = encodeURIComponent(countryCode);
    jurisdictionId = encodeURIComponent(jurisdictionId);
    return this.get(`/sales_tax/${countryCode}/${jurisdictionId}`);
  }


  /**
   * This method creates or updates a sales tax table entry for a jurisdiction.
   *
   * @param countryCode This path parameter specifies the two-letter ISO 3166-1 Alpha-2 code for the country for
   *     which you want to create tax table entry.
   * @param jurisdictionId This path parameter specifies the ID of the sales-tax jurisdiction for the table entry you
   *     want to create.
   * @param body A container that describes the how the sales tax is calculated.
   */
  public createOrReplaceSalesTax(countryCode: string, jurisdictionId: string, body: SalesTaxBase) {
    countryCode = encodeURIComponent(countryCode);
    jurisdictionId = encodeURIComponent(jurisdictionId);
    return this.put(`/sales_tax/${countryCode}/${jurisdictionId}`, body);
  }

  /**
   * This call deletes a tax table entry for a jurisdiction.
   *
   * @param countryCode This path parameter specifies the two-letter ISO 3166-1 Alpha-2 code for the country for
   *     which you want to create tax table entry.
   * @param jurisdictionId This path parameter specifies the ID of the sales-tax jurisdiction for the table entry you
   *     want to delete.
   */
  public deleteSalesTax(countryCode: string, jurisdictionId: string) {
    countryCode = encodeURIComponent(countryCode);
    jurisdictionId = encodeURIComponent(jurisdictionId);
    return this.delete(`/sales_tax/${countryCode}/${jurisdictionId}`);
  }

  /**
   * Use this call to retrieve a sales tax table that the seller established for a specific country.
   *
   * @param countryCode This path parameter specifies the two-letter ISO 3166-1 Alpha-2 code for the country whose
   *     tax table you want to retrieve.
   */
  public getSalesTaxes(countryCode: string) {
    return this.get('/sales_tax', {
      params: {
        country_code: countryCode
      }
    });
  }

  /**
   * This method retrieves a list of subscriptions associated with the seller account.
   * @param limit This field is for future use.
   * @param continuationToken This field is for future use.
   */
  public getSubscription({limit, continuationToken}: { limit?: string, continuationToken?: string } = {}) {
    return this.get('/subscription', {
      params: {
        limit,
        continuation_token: continuationToken
      }
    });
  }

  /**
   * his method is used by sellers onboarded for eBay managed payments, or sellers who are currently going through, or who are eligible for onboarding for eBay managed payments.
   */
  public getKYC() {
    return this.get('/kyc');
  }

  /**
   * This method allows developers to check the seller eligibility status for eBay advertising programs.
   * @param programTypes A comma-separated list of eBay advertising programs.
   */
  public getAdvertisingEligibility(programTypes?: string) {
    return this.get('/advertising_eligibility', {
      params: {
        program_types: programTypes
      }
    });
  }

  /**
   * This call retrieves all defined details of the inventory location that is specified by the <b>merchantLocationKey</b> path parameter.
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public getInventoryLocation(merchantLocationKey: string) {
    merchantLocationKey = encodeURIComponent(merchantLocationKey);
    return this.get(`/location/${merchantLocationKey}`);
  }


  /**
   * <p>Use this call to create a new inventory location.
   * @param merchantLocationKey A unique, merchant-defined key (ID) for an inventory location.
   * @param body Inventory Location details
   */
  public createInventoryLocation(merchantLocationKey: string, body: InventoryLocationFull) {
    merchantLocationKey = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${merchantLocationKey}`, body);
  }

  /**
   * <p>This call deletes the inventory location that is specified in the <code>merchantLocationKey</code> path parameter.
   * @param merchantLocationKey
   */
  public deleteInventoryLocation(merchantLocationKey: string) {
    merchantLocationKey = encodeURIComponent(merchantLocationKey);
    return this.delete(`/location/${merchantLocationKey}`);
  }

  /**
   * <p>This call disables the inventory location that is specified in the <code>merchantLocationKey</code> path parameter.
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public disableInventoryLocation(merchantLocationKey: string) {
    merchantLocationKey = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${merchantLocationKey}/disable`);
  }

  /**
   * <p>This call enables a disabled inventory location that is specified in the <code>merchantLocationKey</code> path parameter.
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   */
  public enableInventoryLocation(merchantLocationKey: string) {
    merchantLocationKey = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${merchantLocationKey}/enable`);
  }

  /**
   * This call retrieves all defined details for every inventory location associated with the seller's account.
   * @param limit The value passed in this query parameter sets the maximum number of records to return per page of data.
   * @param offset Specifies the number of locations to skip in the result set before returning the first location in the paginated response.
   */
  public getInventoryLocations({limit, offset}: { limit?: number, offset?: number } = {}) {
    return this.get('/location', {
      params: {
        limit,
        offset
      }
    });
  }

  /**
   * <p>Use this call to update non-physical location details for an existing inventory location.
   * @param merchantLocationKey A unique merchant-defined key (ID) for an inventory location.
   * @param body The inventory location details to be updated (other than the address and geo co-ordinates).
   */
  public updateInventoryLocation(merchantLocationKey: string, body: InventoryLocation) {
    merchantLocationKey = encodeURIComponent(merchantLocationKey);
    return this.post(`/location/${merchantLocationKey}/update_location_details`, body);
  }

  /**
   * This method retrieves all the sales tax jurisdictions for the country that you specify in the <b>countryCode</b> path parameter.
   * @param countryCode This path parameter specifies the two-letter <a href="https://www.iso.org/iso-3166-country-codes.html " title="https://www.iso.org " target="_blank">ISO 3166</a> country code for the country whose jurisdictions you want to retrieve. eBay provides sales tax jurisdiction information for Canada and the United States.
   */
  public getSalesTaxJurisdictions(countryCode: string) {
    countryCode = encodeURIComponent(countryCode);
    return this.get(`/country/${countryCode}/sales_tax_jurisdiction`);
  }

}
