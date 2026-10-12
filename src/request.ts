import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import debug from 'debug';
import {stringify} from 'qs';

const log = debug('ebay:request');

export const defaultGlobalHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, X-Auth-Token',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
}

export const multipartHeader = {
  'Content-Type': 'multipart/form-data'
}

export const octetStreamHeader = {
  'Content-Type': 'application/octet-stream'
}

export const defaultAxiosConfig: AxiosRequestConfig = {
  paramsSerializer: {
    indexes: null
  }
}

export interface IEBayApiRequest<T = AxiosInstance, C = AxiosRequestConfig, R = AxiosResponse> {
  readonly instance: T;

  get(url: string, config?: C): Promise<R>;

  delete(url: string, config?: C): Promise<R>;

  post(url: string, data?: any, config?: C): Promise<R>;

  postForm(url: string, data?: any, config?: C): Promise<R>;

  put(url: string, data?: any, config?: C): Promise<R>;

  patch(url: string, data?: any, config?: C): Promise<R>;
}

export class AxiosRequest implements IEBayApiRequest {
  public readonly instance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({
      headers: {
        ...defaultGlobalHeaders
      },
      ...defaultAxiosConfig,
      ...config
    });
  }

  public get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
    log('get: ' + url, config);
    return this.instance.get<any, R>(url, config) as Promise<R>;
  }

  public post<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    log('post: ' + url, {payload, config});
    return this.instance.post<any, R>(url, payload, config) as Promise<R>;
  }

  public delete<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
    log('delete: ' + url, config);
    return this.instance.delete<any, R>(url, config) as Promise<R>;
  }

  public put<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    log('put: ' + url, {payload, config});
    return this.instance.put<any, R>(url, payload, config) as Promise<R>;
  }

  public patch<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    log('patch: ' + url, {payload, config});
    return this.instance.patch<any, R>(url, payload, config) as Promise<R>;
  }

  public postForm<R = any>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    log('postForm: ' + url);
    const body = stringify(payload);
    return this.instance.post<any, R>(url, body, config) as Promise<R>;
  }

}
