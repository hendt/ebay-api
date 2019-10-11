import request from '../../utils/request';
import OAuth from "../oAuth";
import debug from 'debug';
import {EBayAccessDenied, EBayUnauthorized, getEBayError} from "../../errors";
import {PRIVACY_PRIVATE} from "tslint/lib/rules/completedDocsRule";

const log = debug('ebay:restful:api');

export default abstract class Api {
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
        const headers = await this.getHeaders();
        const authConfig = {
            ...config,
            headers: {
                ...headers,
                ...config.headers
            }
        };

        try {
            return await this.req.get(this.baseUrl + url, authConfig);
        } catch (ex) {
            return this.handleEBayError(ex)
                .then(() => {
                    return this.get(url, config)
                        .catch((ex: any) => this.handleEBayError(ex, true));
                });
        }
    }

    async post(url: string, data?: any, config: any = {}): Promise<any> {
        const headers = await this.getHeaders();
        const authConfig = {
            ...config,
            headers: {
                ...headers,
                ...config.headers
            }
        };

        try {
            return await this.req.post(this.baseUrl + url, data, authConfig);
        } catch (ex) {
            return this.handleEBayError(ex)
                .then(() => {
                    return this.post(url, data, config)
                        .catch((ex: any) => this.handleEBayError(ex, true));
                });
        }
    }

    async handleEBayError(ex: any, refreshedToken?: boolean) {
        const error = getEBayError(ex);

        if (error) {
            if (error.domain === 'ACCESS') {
                throw new EBayAccessDenied(ex);
            } else if (error.message === 'Invalid access token') {
                if (!refreshedToken) {
                    log('Token expired. Refresh the token.');
                    return this.oAuth.refreshToken()
                        .catch((ex) => {
                            log("error refreshToken", ex);
                            return ex;
                        });
                }
                throw new EBayUnauthorized(ex);
            }
        }

        log("Unknown ebay Error", ex);
        throw ex;
    }

}