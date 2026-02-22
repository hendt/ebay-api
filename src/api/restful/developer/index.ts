import Analytics from './analytics/index.js';
import KeyManagement from './keyManagement/index.js';

export type Developer = {
    analytics: Analytics,
    keyManagement: KeyManagement
};

export {
  Analytics,
  KeyManagement
};
