import {components} from '../../../../types/restful/specs/commerce_translation_v1_beta_oas3.js';
import Restful from '../../index.js';

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
  public translate(body: components['schemas']['TranslateRequest']) {
    return this.post(`/translate`, body);
  }
}
