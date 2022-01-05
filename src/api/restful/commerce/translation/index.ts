import Restful from '../../';
import {TranslateRequest} from '../../../../types';

/**
 * This API allows 3rd party developers to translate item title, description, search query.
 */
export default class Translation extends Restful {

  static id = 'Translation';

  get basePath(): string {
    return '/commerce/translation/v1_beta';
  }

  /**
   * Translates input text inot a given language.
   *
   * @param body TranslateRequest
   */
  public translate(body: TranslateRequest) {
    return this.post(`/translate`, body);
  }
}
