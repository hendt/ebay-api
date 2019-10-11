import request from '../../utils/request';
import OAuth from "../oAuth";
import {EBayAccessDenied} from "../../errors";

export default abstract class Api {
    static scopes: any = {};

    readonly oAuth: OAuth;
    readonly req: any;
    readonly sandbox: boolean;

    constructor(oAuth: OAuth, req = request) {
        this.oAuth = oAuth;
        this.sandbox = oAuth.sandbox;
        this.req = req;
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

    get serverUrl() {
        return 'https://api.' + (this.sandbox ? 'sandbox.' : '') + 'ebay.com'
    }

    get apiVersionPath() {
        return '';
    }

    get baseUrl() {
        return this.serverUrl + this.apiVersionPath + this.basePath
    };

    async get(url: string, config: any = {}): Promise<any> {
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers} : authHeaders;

        return this.req.get(this.baseUrl + url, config).catch(Api.handleError)
    }

    async post(url: string, data?: any, config: any = {}): Promise<any> {
        const authHeaders = await this.getHeaders();
        config.headers = config.headers ? {...authHeaders, ...config.headers} : authHeaders;

        return this.req.post(this.baseUrl + url, data, config).catch(Api.handleError);
    }

    private static handleError(e: any) {
        if (e.response) {
            if (e.response.data) {
                const data = e.response.data;
                if (data.errors[0].domain === 'ACCESS') {
                    throw new EBayAccessDenied(e);
                }
            }
            throw e.response.data;
        }

        throw e;
    }
}

/**
 * Decorators.
 *
 * @param scopes
 */
export function scope(scopes: string | string[]) {
    return function (target: any, propertyKey: string, descriptor: any) {
        const className = target.constructor.name;
        Api.scopes[className + "." + propertyKey] = scopes;
    }
}