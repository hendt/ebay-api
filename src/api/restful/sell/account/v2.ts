import {
  CreateCalculatedShippingRulesRequest,
  CreateFlatShippingRulesRequest,
  CreatePromotionalShippingRuleRequest,
  RateTableUpdate,
  SetUserPreferencesRequest,
  UpdateCalculatedShippingRulesRequest,
  UpdateCombinedPaymentsRequest,
  UpdateFlatShippingRulesRequest,
  UpdatePayoutPercentageRequest,
  UpdatePromotionalShippingRuleRequest
} from '../../../../types/index.js';
import {operations} from '../../../../types/restful/specs/sell_account_v2_oas3.js';

import Restful, {OpenApi} from '../../index.js';

/**
 * This API allows sellers to retrieve and manage their custom shipping rate tables.
 */
export default class AccountV2 extends Restful implements OpenApi<operations> {
  static id = 'AccountV2';

  get basePath(): string {
    return '/sell/account/v2';
  }

  /**
   * This method retrieves an existing rate table identified by the <b>rate_table_id</b> path parameter.
   * @param rateTableId This path parameter is the unique identifier for the shipping rate table to retrieve.
   */
  public getRateTable(rateTableId: string) {
    rateTableId = encodeURIComponent(rateTableId);
    return this.get(`/rate_table/${rateTableId}`);
  }

  /**
   * Request to update the shipping costs for the identified shipping rate table.
   * @param rateTableId This path parameter is the unique identifier for the shipping rate table to update.
   * @param body This request payload contains the shipping costs to update for the rate table.
   */
  public updateShippingCost(rateTableId: string, body: RateTableUpdate) {
    rateTableId = encodeURIComponent(rateTableId);
    return this.post(`/rate_table/${rateTableId}/update_shipping_cost`, body);
  }

  /**
   * This method returns details on two payment instruments defined on a seller's account, including the ID, type, status, nickname, last four digits of the account number, and payout percentage for the instruments.
   */
  public getPayoutSettings() {
    return this.get('/payout_settings');
  }

  /**
   * This method allows sellers in mainland China to configure the split-payout percentage for two payout instruments available for seller payouts. For example, a seller can split payouts to have 70% of the payout go to a bank account and 30% go to a Payoneer account.
   * @param body
   */
  public updatePayoutPercentage(body: UpdatePayoutPercentageRequest) {
    return this.post('/payout_settings/update_percentage', body);
  }

  /**
   * This method retrieves the combined shipping rules configured on the seller's account.
   */
  public getCombinedShippingRules() {
    return this.get('/combined_shipping_rules');
  }

  /**
   * This method creates calculated combined shipping rules for the seller's account.
   * @param body This request payload contains the calculated shipping rules to create.
   */
  public createCalculatedShippingRules(body?: CreateCalculatedShippingRulesRequest) {
    return this.post('/combined_shipping_rules/create_calculated_shipping_rules', body);
  }

  /**
   * This method creates flat-rate combined shipping rules for the seller's account.
   * @param body This request payload contains the flat shipping rules to create.
   */
  public createFlatShippingRules(body?: CreateFlatShippingRulesRequest) {
    return this.post('/combined_shipping_rules/create_flat_shipping_rules', body);
  }

  /**
   * This method creates a promotional combined shipping rule for the seller's account.
   * @param body This request payload contains the promotional shipping rule to create.
   */
  public createPromotionalShippingRule(body?: CreatePromotionalShippingRuleRequest) {
    return this.post('/combined_shipping_rules/create_promotional_shipping_rule', body);
  }

  /**
   * This method updates the calculated combined shipping rules for the seller's account.
   * @param body This request payload contains the calculated shipping rules to update.
   */
  public updateCalculatedShippingRules(body?: UpdateCalculatedShippingRulesRequest) {
    return this.post('/combined_shipping_rules/update_calculated_shipping_rules', body);
  }

  /**
   * This method updates the combined payments settings for the seller's account.
   * @param body This request payload contains the combined payments settings to update.
   */
  public updateCombinedPayments(body?: UpdateCombinedPaymentsRequest) {
    return this.post('/combined_shipping_rules/update_combined_payments', body);
  }

  /**
   * This method updates the flat-rate combined shipping rules for the seller's account.
   * @param body This request payload contains the flat shipping rules to update.
   */
  public updateFlatShippingRules(body?: UpdateFlatShippingRulesRequest) {
    return this.post('/combined_shipping_rules/update_flat_shipping_rules', body);
  }

  /**
   * This method updates a promotional combined shipping rule for the seller's account.
   * @param body This request payload contains the promotional shipping rule to update.
   */
  public updatePromotionalShippingRule(body?: UpdatePromotionalShippingRuleRequest) {
    return this.post('/combined_shipping_rules/update_promotional_shipping_rule', body);
  }

  /**
   * This method retrieves the seller's preferences for the specified marketplace.
   * @param fieldgroups This query parameter specifies the preference groups to return.
   */
  public getUserPreferences(fieldgroups?: string) {
    return this.get('/user_preferences', {
      params: {
        fieldgroups
      }
    });
  }

  /**
   * This method configures the seller's preferences for the specified marketplace.
   * @param body This request payload contains the seller preferences to set.
   */
  public setUserPreferences(body?: SetUserPreferencesRequest) {
    return this.patch('/user_preferences', body);
  }
}
