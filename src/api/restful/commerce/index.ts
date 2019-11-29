import Catalog from './catalog';
import Identity from './identity';
import Taxonomy from './taxonomy';
import Translation from './translation';

export type Commerce = {
    catalog: Catalog;
    identity: Identity;
    taxonomy: Taxonomy;
    translation: Translation;
};

export {
    Catalog,
    Identity,
    Taxonomy,
    Translation
};
