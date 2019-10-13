import axiosRateLimit from 'axios-rate-limit';
import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import qs from 'qs';
import debug from 'debug';

const log = debug('ebay:request');

interface RateLimitedAxiosInstance extends AxiosInstance {
}

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

/**
 * Ebay ratelimits to 5000 calls per day per default
 */
const RATELIMIT = Math.floor((5000 / day) * second * minute); // req/sec

export interface LimitedRequest {
    get<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R>

    post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>

    post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>

    postForm<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
}

export class LimitedAxiosRequest implements LimitedRequest {
    req: RateLimitedAxiosInstance;

    constructor(ratelimit = RATELIMIT, perMilliseconds = 5000) {
        const AxiosInstance = axios.create();

        this.req = axiosRateLimit(AxiosInstance, {
            maxRequests: Math.floor(RATELIMIT),
            perMilliseconds
        });
    }

    get<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('get:' + url);
        return this.req.get(url, config).then(({data}) => data);
    }

    post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        log('post: ' + url, data);
        return this.req.post(url, data, config).then(({data}) => data);
    }

    postForm<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        const body = qs.stringify(data);
        log('postForm: ' + url, body);
        return this.req.post(url, body, config).then(({data}) => data);
    }
}

const instance = new LimitedAxiosRequest();
export default instance;