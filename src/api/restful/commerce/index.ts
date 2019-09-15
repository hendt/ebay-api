import Identity from "./identity";
import Taxonomy from "./taxonomy";
import Translation from "./translation";
import Catalog from "./catalog";

export type Commerce = {
    catalog: Catalog;
    identity: Identity;
    taxonomy: Taxonomy;
    translation: Translation;
}