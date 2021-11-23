import {Catalog, Identity, Taxonomy, Translation, Charity, Notification} from '../../../../src/api/restful/commerce';
import CatalogOas from './catalog/commerce_catalog_v1_beta_oas3.json';
import IdentityOas from './identity/buy_identity_v1_oas3.json';
import TaxonomyOas from './taxonomy/commerce_taxonomy_v1_oas3.json';
import TranslationOas from './translation/commerce_translation_v1_oas3.json';
import CharityOas from './charity/commerce_charity_v1_oas3.json';
import NotificationOas from './notification/commerce_notification_v1_oas3.json';

const tests = new Map<any, any>();
tests.set(Catalog, CatalogOas);
tests.set(Identity, IdentityOas);
tests.set(Taxonomy, TaxonomyOas);
tests.set(Translation, TranslationOas);
tests.set(Charity, CharityOas);
tests.set(Notification, NotificationOas);

export default tests;