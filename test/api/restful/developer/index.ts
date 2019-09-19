import {
    Analytics,
} from '../../../../src/api/restful/developer';
import AnalyticsOas from './analytics/developer_analytics_v1_beta_oas3.json';

const tests = new Map<any, any>();
tests.set(Analytics, AnalyticsOas);

export default tests;