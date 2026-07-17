import {
  AppealRequest,
  CaseSearchParams
} from '../../../../types/index.js';
import Restful from '../../index.js';

/**
 * Post-Order Case Management API
 */
export default class Case extends Restful {

  static id = 'Case';

  get basePath(): string {
    return '/post-order/v2';
  }

  get useIaf() {
    return true;
  }

  /**
   * Buyer or seller appeals a case decision.
   *
   * @param caseId The unique identifier of a case.
   * @param payload the AppealRequest
   */
  public appealCaseDecision(caseId: string, payload?: AppealRequest) {
    const id = encodeURIComponent(caseId);
    return this.post(`/casemanagement/${id}/appeal`, payload);
  }

  /**
   * Retrieve the details related to a specific case.
   *
   * @param caseId The unique identifier of a case.
   */
  public getCase(caseId: string) {
    const id = encodeURIComponent(caseId);
    return this.get(`/casemanagement/${id}`);
  }

  /**
   * This call is used to search for cases using multiple filter types.
   *
   * @param params the SearchParams
   */
  public search(params: CaseSearchParams) {
    return this.get('/casemanagement/search', {
      params
    });
  }
}
