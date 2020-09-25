import Api from '../../';
import {TranslateRequest} from '../../../../types/restfulTypes';

/**
 * This API allows 3rd party developers to translate item title, description, search query.
 */
export default class Translation extends Api {
    get basePath(): string {
        return '/commerce/translation/v1';
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
