import Cancellation from './cancellation';
import Case from './case';
import Inquiry from './inquiry';
import Return from './return';

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
