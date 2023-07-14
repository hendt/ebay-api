import {Cancellation, Case, Inquiry, Return} from '../../../../src/api/restful/postOrder/index.js';
import {readSpecs} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Cancellation, readSpecs( 'cancellation_oas3.json', import.meta.url));
tests.set(Case, readSpecs( 'case_oas3.json', import.meta.url));
tests.set(Inquiry, readSpecs( 'inquiry_oas3.json', import.meta.url));
tests.set(Return, readSpecs(  'return_oas3.json', import.meta.url));

export default tests;