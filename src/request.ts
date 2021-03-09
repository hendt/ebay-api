import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import debug from 'debug';
import qs from 'qs';

const log = debug('ebay:request');

export interface IEBayApiRequest<T = AxiosInstance> {
    readonly instance: T;

    get<R = any, C = any>(url: string, config?: C): Promise<R>;

    delete<R = any, C = any>(url: string, config?: C): Promise<R>;

    post<R = any, C = any>(url: string, data?: any, config?: C): Promise<R>;

    postForm<R = any, C = any>(url: string, data?: any, config?: C): Promise<R>;

    put<R = any, C = any>(url: string, data?: any, config?: C): Promise<R>;
}

export class AxiosRequest implements IEBayApiRequest {
    public readonly instance: AxiosInstance;

    constructor(config: AxiosRequestConfig = {}) {
        this.instance = axios.create({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, X-Auth-Token',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
            },
            ...config
        });
    }

    public get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('get: ' + url);
        return this.instance.get(url, config).then(({data}) => data);
    }

    public post<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
        log('post: ' + url, payload);
        return this.instance.post(url, payload, config).then(({data}) => data);
    }

    public delete<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        log('delete: ' + url);
        return this.instance.delete(url, config).then(({data}) => data);
    }

    public put<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
        log('put: ' + url, payload);
        return this.instance.put(url, payload, config).then(({data}) => data);
    }

    public postForm<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
        const body = qs.stringify(payload);
        return this.instance.post(url, body, config).then(({data}) => data);
    }
}

let request: IEBayApiRequest;

export const createRequest = (config: AxiosRequestConfig = {}) => {
    return request || (request = new AxiosRequest(config));
};
