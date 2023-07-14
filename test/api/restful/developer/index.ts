import {Analytics, KeyManagement} from '../../../../src/api/restful/developer/index.js';
import {readSpecs} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Analytics, readSpecs( 'developer_analytics_v1_beta_oas3.json', import.meta.url));
tests.set(KeyManagement, readSpecs('developer_key_management_v1_oas3.json', import.meta.url));

export default tests;