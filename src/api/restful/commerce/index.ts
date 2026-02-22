import Catalog from './catalog/index.js';
import Charity from './charity/index.js';
import Identity from './identity/index.js';
import Media from './media/index.js';
import Notification from './notification/index.js';
import Taxonomy from './taxonomy/index.js';
import Translation from './translation/index.js';
import Message from './message/index.js';

export type Commerce = {
  catalog: Catalog;
  charity: Charity,
  identity: Identity;
  notification: Notification
  taxonomy: Taxonomy;
  translation: Translation;
  media: Media;
  message: Message;
};

export {
  Catalog,
  Charity,
  Identity,
  Notification,
  Taxonomy,
  Translation,
  Media,
  Message
};
