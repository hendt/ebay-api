import Restful from '../../';

/**
 * Retrieves the authenticated user's account profile information.
 */
export default class Identity extends Restful {
  get baseHostSubDomain(): string {
    return 'apiz';
  }

  get basePath(): string {
    return '/commerce/identity/v1';
  }

  /**
   * This method retrieves the account profile information for an authenticated user, which requires a User access
   * token. What is returned is controlled by the scopes.
   */
  public getUser() {
    return this.get(`/user/`);
  }
}
