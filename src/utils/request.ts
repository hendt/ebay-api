import rateLimit from "axios-rate-limit";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import qs from 'qs';

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

/**
 * Ebay ratelimits to 5000 calls per day per default
 */
const RATELIMIT = (5000 / day) * second; // req/sec

const AxiosInstance = axios.create();

const req = rateLimit(AxiosInstance, {maxRequests: Math.floor(RATELIMIT * minute), perMilliseconds: 5000});

export function postForm<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return req.post(url, qs.stringify(data), config).then(({data}) => data);
}

export default req;