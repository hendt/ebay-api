import Api from '../../';

/**
 * The Finances API is used by sellers in eBay's managed payments program to retrieve seller payout information.
 *
 * https://api.ebay.com/oauth/api_scope/sell.finances
 *
 */
export default class Finance extends Api {
  get basePath(): string {
    return '/sell/finances/v1';
  }

  /**
   * Use this call to retrieve the details of a specific seller payout.
   *
   * @param payoutId The unique identifier of the payout.
   */
  public getPayout(payoutId: string) {
    payoutId = encodeURIComponent(payoutId);
    return this.getz(`/payout/${payoutId}`);
  }

  /**
   * Use this call to search for and retrieve one or more payout based on their payout date,
   * or payout status using the filter parameter.
   *
   * @param filter One or more comma-separated criteria for narrowing down the collection of payout returned by this
   *     call.
   * @param limit The number of payouts to return per page of the result set.
   * @param offset Specifies the number of payouts to skip in the result set before returning the first payout in the
   *     paginated response.
   */
  public getPayouts({
    filter,
    limit,
    offset,
  }: {
    filter?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    return this.getz(`/payout`, {
      params: {
        filter,
        limit,
        offset,
      },
    });
  }

  /**
   *  Search for and retrieve the details of multiple payouts.
   *  *
   * @param filter One or more comma-separated criteria for narrowing down the collection of payout returned by this
   *     call.
   */
  public getPayoutSummary({
    filter,
  }: {
    filter?: string;
  } = {}) {
    return this.getz(`/payout_summary`, { params: { filter } });
  }

  /**
   * Retrieve details of one or more monetary transactions.
   * @param filter One or more comma-separated criteria for narrowing down the collection of transaction returned by this
   *     call.
   * @param limit The number of transaction to return per page of the result set.
   * @param offset Specifies the number of payouts to skip in the result set before returning the first transaction in the
   *     paginated response.

   */
  public getTransactions({
    filter,
    limit,
    offset,
  }: {
    filter?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    return this.getz(`/transaction`, {
      params: {
        filter,
        limit,
        offset,
      },
    });
  }

  /**
   * Retrieve total counts and values of the seller's order sales, seller credits, buyer refunds, and payment holds.
   * @param filter One or more comma-separated criteria for narrowing down the collection of transaction returned by this
   *     call.
   * @param limit The number of transaction to return per page of the result set.
   * @param offset Specifies the number of payouts to skip in the result set before returning the first transaction in the
   *     paginated response.

   */
  public getTransactionSummary({
    filter,
  }: {
    filter?: string;
  } = {}) {
    return this.getz(`/transaction_summary`, {
      params: {
        filter,
      },
    });
  }

  /**
   * Retrieve detailed information on a TRANSFER transaction type.
   *
   * @param transferId The unique identifier of the transfer.
   */
  public getTransfer(transferId: string) {
    transferId = encodeURIComponent(transferId);
    return this.get(`/transfer/${transferId}`);
  }

  /**
   *  Retrieve all pending funds that have not yet been distibuted through a seller payout.
   */
  public getSellerFundsSummary() {
    return this.getz(`/seller_funds_summary`);
  }
}
