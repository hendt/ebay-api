import req from '../../utils/request';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import OAuth from "../oAuth";
import {ancestorWhere} from "tslint";

export default abstract class Api {
    oAuth: OAuth;

    constructor(oAuth: OAuth) {
        this.oAuth = oAuth;
    }

    async getHeaders() {
        const accessToken = await this.oAuth.getAccessToken();
        return {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache'
        };
    }

    abstract get basePath(): string;

    get baseUrl() {
        return 'https://api.ebay.com' + this.basePath
    };

    async get(url: string, config?: AxiosRequestConfig): Promise<any> {
        config = config || {};
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers}: authHeaders;

        return req.get(this.baseUrl + url, config)
            .then(({data}) => data)
            .catch(e => {
                throw e.response.data;
            })
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        config = config || {};
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers}: authHeaders;

        return req.post(this.baseUrl + url, data, config)
            .then(({data}) => data)
            .catch(e => {
                throw e.response.data;
            });
    }
}