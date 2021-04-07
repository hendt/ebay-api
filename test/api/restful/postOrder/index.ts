import { Cancellation, Case, Inquiry, Return } from '../../../../src/api/restful/postOrder';
import CancellationOas from './cancellation/cancellation_oas3.json';
import CaseOas from './case/case_oas3.json';
import InquiryOas from './inquiry/inquiry_oas3.json';
import ReturnOas from './return/return_oas3.json';

const tests = new Map<any, any>();
tests.set(Cancellation, CancellationOas);
tests.set(Case, CaseOas);
tests.set(Inquiry, InquiryOas);
tests.set(Return, ReturnOas);

export default tests;