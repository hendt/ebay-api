import Api from '../../';
import {
    FulfillmentPolicyRequest,
    PaymentPolicyRequest,
    Program,
    ReturnPolicyRequest, SalesTaxBase
} from '../../../../types/restfulTypes';

/**
 * The <b>Account API</b> gives sellers the ability to configure their eBay seller accounts,
 * including the seller's policies (the Fulfillment Policy, Payment Policy, and Return Policy),
 * opt in and out of eBay seller programs, configure sales tax tables, and get account information.
 */
export default class Account extends Api {
    get basePath(): string {
        return '/sell/account/v1';
    }

    /**
     * This method retrieves all the fulfillment policies configured for the marketplace you specify using the
     * marketplace_id query parameter.
     *
     * @param marketplaceId This query parameter specifies the eBay marketplace of the policies you want to retrieve.
     */
    public getFulfillmentPolicies(marketplaceId: string) {
        return this.get(`/fulfillment_policy/`, {
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
        return this.post(`/fulfillment_policy/`, body);
    }

    /**
     * This method updates an existing fulfillment policy.
     *
     * @param fulfillmentPolicyId This path parameter specifies the ID of the fulfillment policy you want to update.
     * @param body Request to create a seller account fulfillment policy.
     */
    public updateFulfillmentPolicy(fulfillmentPolicyId: string, body: FulfillmentPolicyRequest) {
        const id = encodeURIComponent(fulfillmentPolicyId);
        return this.put(`/fulfillment_policy/${id}`, body);
    }

    /**
     * This method deletes a fulfillment policy.
     *
     * @param fulfillmentPolicyId This path parameter specifies the ID of the fulfillment policy to delete.
     */
    public deleteFulfillmentPolicy(fulfillmentPolicyId: string) {
        const id = encodeURIComponent(fulfillmentPolicyId);
        return this.delete(`/fulfillment_policy/${id}`);
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
        return this.get(`/fulfillment_policy/get_by_policy_name`, {
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
        return this.get(`/payment_policy/`, {
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
        const id = encodeURIComponent(paymentPolicyId);
        return this.get(`/payment_policy/${id}`);
    }

    /**
     * This method creates a new payment policy where the policy encapsulates seller's terms for purchase payments.
     *
     * @param body Payment policy request
     */
    public createPaymentPolicy(body: PaymentPolicyRequest) {
        return this.post(`/payment_policy/`, body);
    }

    /**
     * This method updates an existing payment policy.
     *
     * @param paymentPolicyId This path parameter specifies the ID of the payment policy you want to update.
     * @param body Payment policy request
     */
    public updatePaymentPolicy(paymentPolicyId: string, body: PaymentPolicyRequest) {
        const id = encodeURIComponent(paymentPolicyId);
        return this.put(`/payment_policy/${id}`, body);
    }

    /**
     * This method updates an existing payment policy.
     *
     * @param paymentPolicyId This path parameter specifies the ID of the payment policy you want to delete.
     */
    public deletePaymentPolicy(paymentPolicyId: string) {
        const id = encodeURIComponent(paymentPolicyId);
        return this.delete(`/payment_policy/${id}`);
    }

    /**
     * This method retrieves the complete details of a single payment policy.
     *
     * @param marketplaceId This query parameter specifies the eBay marketplace of the policy you want to retrieve.
     * @param name This query parameter specifies the user-defined name of the payment policy you want to retrieve.
     */
    public getPaymentPolicyByName(marketplaceId: string, name: string) {
        return this.get(`/payment_policy/get_by_policy_name`, {
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
    public getPaymentsProgram(marketplaceId: string, paymentsProgramType: string) {
        const mId = encodeURIComponent(marketplaceId);
        const pId = encodeURIComponent(paymentsProgramType);
        return this.get(`/payments_program/${mId}/${pId}`);
    }

    /**
     * This method retrieves the seller's current set of privileges.
     */
    public getPrivileges() {
        return this.get(`/privilege/`);
    }

    /**
     * This method gets a list of the seller programs that the seller has opted-in to.
     */
    public getOptedInPrograms() {
        return this.get(`/program/get_opted_in_programs`);
    }

    /**
     * This method opts the seller in to an eBay seller program.
     *
     * @param body Program being opted-in to.
     */
    public optInToProgram(body?: Program) {
        return this.post(`/program/opt_in`, body);
    }

    /**
     * This method opts the seller out of a seller program to which you have previously opted-in to.
     *
     * @param body Program being opted-out of.
     */
    public optOutOfProgram(body?: Program) {
        return this.post(`/program/opt_out`, body);
    }

    /**
     * This method retrieves a seller's shipping rate tables for the country specified in the country_code query
     * parameter.
     *
     * @param countryCode This query parameter specifies the two-letter ISO 3166-1 Alpha-2 code of country for which
     *     you want shipping-rate table information.
     */
    public getRateTables(countryCode?: string) {
        return this.get(`/rate_table/`, {
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
        return this.get(`/return_policy/`, {
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
        const id = encodeURIComponent(returnPolicyId);
        return this.get(`/return_policy/${id}`);
    }

    /**
     * This method creates a new return policy where the policy encapsulates seller's terms for returning items.
     *
     * @param body Return policy request
     */
    public createReturnPolicy(body: ReturnPolicyRequest) {
        return this.post(`/return_policy/`, body);
    }

    /**
     * This method creates a new return policy where the policy encapsulates seller's terms for returning items.
     *
     *  @param returnPolicyId This path parameter specifies the ID of the return policy you want to update.
     * @param body Return policy request
     */
    public updateReturnPolicy(returnPolicyId: string, body: ReturnPolicyRequest) {
        const id = encodeURIComponent(returnPolicyId);
        return this.put(`/return_policy/${id}`, body);
    }

    /**
     * This method deletes a return policy.
     *
     * @param returnPolicyId This path parameter specifies the ID of the return policy you want to delete.
     */
    public deleteReturnPolicy(returnPolicyId: string) {
        const id = encodeURIComponent(returnPolicyId);
        return this.delete(`/return_policy/${id}`);
    }

    /**
     * This method retrieves the complete details of a single return policy.
     *
     * @param marketplaceId This query parameter specifies the ID of the eBay marketplace of the policy you want to
     *     retrieve.
     * @param name This query parameter specifies the user-defined name of the return policy you want to retrieve.
     */
    public getReturnPolicyByName(marketplaceId: string, name: string) {
        return this.get(`/return_policy/get_by_policy_name`, {
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
        const cc = encodeURIComponent(countryCode);
        const jId = encodeURIComponent(jurisdictionId);
        return this.get(`/sales_tax/${cc}/${jId}`);
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
        const cc = encodeURIComponent(countryCode);
        const jId = encodeURIComponent(jurisdictionId);
        return this.put(`/sales_tax/${cc}/${jId}`, body);
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
        const cc = encodeURIComponent(countryCode);
        const jId = encodeURIComponent(jurisdictionId);
        return this.delete(`/sales_tax/${cc}/${jId}`);
    }

    /**
     * Use this call to retrieve a sales tax table that the seller established for a specific country.
     *
     * @param countryCode This path parameter specifies the two-letter ISO 3166-1 Alpha-2 code for the country whose
     *     tax table you want to retrieve.
     */
    public getSalesTaxes(countryCode: string) {
        return this.get(`/sales_tax/`, {
            params: {
                country_code: countryCode
            }
        });
    }
}
