import {
    Catalog,
    Identity,
    Taxonomy,
    Translation
} from '../../../../src/api/restful/commerce';
import CatalogOas from './catalog/commerce_catalog_v1_beta_oas3.json';
import IdentityOas from './identity/buy_identity_v1_oas3.json';
import TaxonomyOas from './taxonomy/commerce_taxonomy_v1_beta_oas3.json';
import TranslationOas from './translation/commerce_translation_v1_oas3.json';

const tests = new Map<any, any>();
tests.set(Catalog, CatalogOas);
tests.set(Identity, IdentityOas);
tests.set(Taxonomy, TaxonomyOas);
tests.set(Translation, TranslationOas);

export default tests;