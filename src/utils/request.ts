import axiosRateLimit from 'axios-rate-limit';
import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import qs from 'qs';
import debug from "debug";
const log = debug("ebay:request");

interface RateLimitedAxiosInstance extends AxiosInstance {
}

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

/**
 * Ebay ratelimits to 5000 calls per day per default
 */
const RATELIMIT = (5000 / day) * second; // req/sec

const AxiosInstance = axios.create();

const req: RateLimitedAxiosInstance = axiosRateLimit(AxiosInstance, {
    maxRequests: Math.floor(RATELIMIT * minute),
    perMilliseconds: 5000
});

export class LimitedAxiosRequest {
    /**
     * Use custom param serializer for Call-Specific Params.
     * @param url the url
     * @param config the config
     */
    getCFP<T = any, R = any>(url: string, config: AxiosRequestConfig = {}): Promise<R> {
        config.paramsSerializer = params => {
            const query = qs.stringify(params, {allowDots: true})
                .replace(/%5B/gi, '(')
                .replace(/%5D/gi, ')');
            log('getCFP:' + url, query);
            return query;
        };

        return this.get(url, config);
    }

    get<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('get:' + url);
        return req.get(url, config).then(({data}) => data);
    }

    post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        log('post: ' + url, data);
        return req.post(url, data, config).then(({data}) => data);
    }

    postForm<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        const body = qs.stringify(data);
        log('postForm: ' + url, body);
        return req.post(url, body, config).then(({data}) => data);
    }
}

const instance = new LimitedAxiosRequest();
export default instance;