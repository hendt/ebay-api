import {EventType} from './types';

// https://developer.ebay.com/devzone/client-alerts/docs/CallRef/index.html
enum calls {
  GetPublicAlerts,
  GetUserAlerts,
  Login,
  Logout
}

export {
  EventType
};

export default calls;
