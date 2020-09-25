import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import axiosRateLimit from 'axios-rate-limit';
import debug from 'debug';
import qs from 'qs';
import {Interceptors, RequestConfig} from '../types/apiTypes';

const log = debug('ebay:request');

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

const RATELIMIT_PER_DAY = 5000; // Ebay ratelimits to 5000 calls per day per default

export interface ILimitedRequest {
    get<R = any, C = any>(url: string, config?: C): Promise<R>;

    delete<R = any, C = any>(url: string, config?: C): Promise<R>;

    post<R = any, C = any>(url: string, data?: any, config?: C): Promise<R>;

    postForm<R = any, C = any>(url: string, data?: any, config?: C): Promise<R>;

    put<R = any, C = any>(url: string, data?: any, config?: C): Promise<R>;
}

export class LimitedAxiosRequest implements ILimitedRequest {
    private req: AxiosInstance;

    constructor(interceptors?: Interceptors, maxRequests = RATELIMIT_PER_DAY) {
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
            maxRequests,
            perMilliseconds: day
        });
    }

    public get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('get: ' + url);
        return this.req.get(url, config).then(({data}) => data);
    }

    public post<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
        log('post: ' + url, payload);
        return this.req.post(url, payload, config).then(({data}) => data);
    }

    public delete<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('delete: ' + url);
        return this.req.delete(url, config).then(({data}) => data);
    }

    public put<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
        log('put: ' + url, payload);
        return this.req.put(url, payload, config).then(({data}) => data);
    }

    public postForm<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
        const body = qs.stringify(payload);
        return this.req.post(url, body, config).then(({data}) => data);
    }
}

let request: ILimitedRequest;

export const createRequest = ({interceptors, maxRequests}: RequestConfig = {}) => {
    return request || (request = new LimitedAxiosRequest(interceptors, maxRequests));
};
