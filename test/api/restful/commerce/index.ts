import {
  Catalog,
  Charity,
  Identity,
  Notification,
  Taxonomy,
  Translation
} from '../../../../src/api/restful/commerce/index.js';
import {readSpecs} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Catalog, readSpecs( 'commerce_catalog_v1_beta_oas3.json', import.meta.url));
tests.set(Identity, readSpecs( 'commerce_identity_v1_oas3.json', import.meta.url));
tests.set(Taxonomy, readSpecs( 'commerce_taxonomy_v1_oas3.json', import.meta.url));
tests.set(Translation, readSpecs('commerce_translation_v1_beta_oas3.json', import.meta.url));
tests.set(Charity, readSpecs('commerce_charity_v1_oas3.json', import.meta.url));
tests.set(Notification, readSpecs('commerce_notification_v1_oas3.json', import.meta.url));

export default tests;