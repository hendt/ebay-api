import Catalog from './catalog';
import Identity from './identity';
import Taxonomy from './taxonomy';
import Translation from './translation';
import Charity from './charity';

export type Commerce = {
  catalog: Catalog;
  identity: Identity;
  taxonomy: Taxonomy;
  translation: Translation;
  charity: Charity
};

export {
  Catalog,
  Identity,
  Taxonomy,
  Translation,
  Charity
};
