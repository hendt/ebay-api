import request from '../../utils/request';
import OAuth from "../oAuth";

export default abstract class Api {
    readonly oAuth: OAuth;
    private req: any;

    constructor(oAuth: OAuth, req?: any) {
        this.oAuth = oAuth;
        if (req) {
            this.req = req;
        } else {
            this.req = request;
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

    async get(url: string, config: any = {}): Promise<any> {
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers} : authHeaders;

        return this.req.get(this.baseUrl + url, config)
            .catch((e: any) => {
                throw e.response.data;
            })
    }

    async post(url: string, data?: any, config: any = {}): Promise<any> {
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers} : authHeaders;

        return this.req.post(this.baseUrl + url, data, config)
            .catch((e: any) => {
                throw e.response.data;
            });
    }
}