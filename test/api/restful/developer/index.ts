import {Analytics, KeyManagement} from '../../../../src/api/restful/developer/index.js';
import {readJSONSync} from '../../jsonfile.js';

const tests = new Map<any, any>();
tests.set(Analytics, readJSONSync( './analytics/developer_analytics_v1_beta_oas3.json', import.meta.url));
tests.set(KeyManagement, readJSONSync('./key-management/developer_key_management_v1_oas3.json', import.meta.url));

export default tests;