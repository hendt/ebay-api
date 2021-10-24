import {Catalog, Charity, Identity, Notification, Taxonomy, Translation} from '../../../../src/api/restful/commerce/index.js';
import {readJSONSync} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Catalog, readJSONSync( './catalog/commerce_catalog_v1_beta_oas3.json', import.meta.url));
tests.set(Identity, readJSONSync( './identity/buy_identity_v1_oas3.json', import.meta.url));
tests.set(Taxonomy, readJSONSync( './taxonomy/commerce_taxonomy_v1_oas3.json', import.meta.url));
tests.set(Translation, readJSONSync('./translation/commerce_translation_v1_beta_oas3.json', import.meta.url));
tests.set(Charity, readJSONSync('./charity/commerce_charity_v1_oas3.json', import.meta.url));
tests.set(Notification, readJSONSync('./notification/commerce_notification_v1_oas3.json', import.meta.url));

export default tests;