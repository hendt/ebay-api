import Cancellation from './cancellation/index.js';
import Case from './case/index.js';
import Inquiry from './inquiry/index.js';
import Return from './return/index.js';

export type PostOrder = {
  cancellation: Cancellation,
  case: Case,
  inquiry: Inquiry,
  return: Return
};

export {
  Cancellation,
  Case,
  Inquiry,
  Return
};
