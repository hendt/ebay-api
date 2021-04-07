import Catalog from './catalog';
import Charity from './charity';
import Identity from './identity';
import Notification from './notification';
import Taxonomy from './taxonomy';
import Translation from './translation';

export type Commerce = {
  catalog: Catalog;
  charity: Charity,
  identity: Identity;
  notification: Notification
  taxonomy: Taxonomy;
  translation: Translation;
};

export {
  Catalog,
  Charity,
  Identity,
  Notification,
  Taxonomy,
  Translation
};
