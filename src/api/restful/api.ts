import request from '../../utils/request';
import {AxiosRequestConfig} from "axios";
import OAuth from "../oAuth";

export default abstract class Api {
    oAuth: OAuth;
    private req = request;

    constructor(oAuth: OAuth, req?: any) {
        this.oAuth = oAuth;
        if (req) {
            this.req = req;
        }
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

    async get(url: string, config: AxiosRequestConfig = {}): Promise<any> {
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers} : authHeaders;

        return this.req.get(this.baseUrl + url, config)
            .then(({data}) => data)
            .catch(e => {
                throw e.response.data;
            })
    }

    async post(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<any> {
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers} : authHeaders;

        return this.req.post(this.baseUrl + url, data, config)
            .then(({data}) => data)
            .catch(e => {
                throw e.response.data;
            });
    }
}