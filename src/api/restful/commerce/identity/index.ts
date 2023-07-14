import {operations} from '../../../../types/restful/specs/commerce_identity_v1_oas3.js';
import Restful, {OpenApi} from '../../index.js';

/**
 * Retrieves the authenticated user's account profile information.
 */
export default class Identity extends Restful implements OpenApi<operations> {

  static id = 'Identity';

  get basePath(): string {
    return '/commerce/identity/v1';
  }

  get subdomain(): string {
    return 'apiz';
  }

  /**
   * This method retrieves the account profile information for an authenticated user, which requires a User access
   * token. What is returned is controlled by the scopes.
   */
  public getUser() {
    return this.get(`/user/`);
  }
}
