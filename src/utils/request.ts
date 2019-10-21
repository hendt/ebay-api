import axiosRateLimit from 'axios-rate-limit';
import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import qs from 'qs';
import debug from 'debug';
import {Interceptors} from '../types';

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
    get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R>

    post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>

    post<R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>

    postForm<R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
}

export class LimitedAxiosRequest implements LimitedRequest {
    private req: RateLimitedAxiosInstance;

    constructor(interceptors?: Interceptors, ratelimit = RATELIMIT, perMilliseconds = 5000) {
        const axiosInstance = axios.create({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, X-Auth-Token',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
            }
        });

        if (interceptors && interceptors.request) {
            axiosInstance.interceptors.request.use(interceptors.request);
        }
        if (interceptors && interceptors.response) {
            axiosInstance.interceptors.response.use(interceptors.response);
        }

        this.req = axiosRateLimit(axiosInstance, {
            maxRequests: Math.floor(ratelimit),
            perMilliseconds
        });
    }

    get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('get:' + url);
        return this.req.get(url, config).then(({data}) => data);
    }

    post<R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        log('post: ' + url, data);
        return this.req.post(url, data, config).then(({data}) => data);
    }

    postForm<R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        const body = qs.stringify(data);
        return this.req.post(url, body, config).then(({data}) => data);
    }
}

let request: LimitedRequest;

export const createRequest = (interceptors?: any) => {
    return request || (request = new LimitedAxiosRequest(interceptors));
};