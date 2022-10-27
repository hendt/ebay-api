import {Analytics, KeyManagement} from '../../../../src/api/restful/developer';
import AnalyticsOas from './analytics/developer_analytics_v1_beta_oas3.json';
import KeyManagementOas from './key-management/developer_key_management_v1_oas3.json';

const tests = new Map<any, any>();
tests.set(Analytics, AnalyticsOas);
tests.set(KeyManagement, KeyManagementOas);

export default tests;