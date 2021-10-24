import {Cancellation, Case, Inquiry, Return} from '../../../../src/api/restful/postOrder/index.js';
import {readJSONSync} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Cancellation, readJSONSync( './cancellation/cancellation_oas3.json', import.meta.url));
tests.set(Case, readJSONSync( './case/case_oas3.json', import.meta.url));
tests.set(Inquiry, readJSONSync( './inquiry/inquiry_oas3.json', import.meta.url));
tests.set(Return, readJSONSync(  './return/return_oas3.json', import.meta.url));

export default tests;