import debug from 'debug';
import request from '../../utils/request';
import OAuth2 from '../оAuth2';
import {EBayAccessDenied, EBayInvalidScope, EBayUnauthorized, getEBayError} from '../../errors';

const log = debug('ebay:restful:api');

export default abstract class Api {
    readonly oAuth2: OAuth2;
    readonly req: any;
    readonly sandbox: boolean;

    constructor(oAuth2: OAuth2, req = request) {
        this.oAuth2 = oAuth2;
        this.sandbox = oAuth2.sandbox;
        this.req = req;
    }

    async getAuthHeaders() {
        const accessToken = await this.oAuth2.getAccessToken();
        return {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache'
        };
    }

    async getAuthConfig(config: any) {
        const authHeaders = await this.getAuthHeaders();
        return {
            ...config,
            headers: {
                ...authHeaders,
                ...config.headers
            }
        };
    }

    abstract get basePath(): string;

    get serverUrl() {
        return 'https://api.' + (this.sandbox ? 'sandbox.' : '') + 'ebay.com';
    }

    get apiVersionPath() {
        return '';
    }

    get baseUrl() {
        return this.serverUrl + this.apiVersionPath + this.basePath;
    };

    async get(url: string, config: any = {}): Promise<any> {
        const authConfig = await this.getAuthConfig(config);

        try {
            return await this.req.get(this.baseUrl + url, authConfig);
        } catch (ex) {
            await this.handleEBayError(ex);

            // Token refreshed -> try again
            return this.get(url, config).catch((ex: any) => this.handleEBayError(ex, true));
        }
    }

    async post(url: string, data?: any, config: any = {}): Promise<any> {
        const authConfig = await this.getAuthConfig(config);

        try {
            return await this.req.post(this.baseUrl + url, data, authConfig);
        } catch (ex) {
            await this.handleEBayError(ex);

            // Token refreshed -> try again
            return this.post(url, data, config).catch((ex: any) => this.handleEBayError(ex, true));
        }
    }

    async handleEBayError(ex: any, refreshedToken?: boolean): Promise<any> {
        const error = getEBayError(ex);

        if (error) {
            if (error.domain === 'ACCESS') {
                throw new EBayAccessDenied(ex);
            } else if (error.message === 'Invalid access token') {
                if (!refreshedToken) {
                    log('Token expired. Refresh the token.');
                    return this.oAuth2.refreshToken().catch((ex: Error) => {
                        const error = getEBayError(ex);
                        if (error.message === 'invalid_scope') {
                            throw new EBayInvalidScope(ex);
                        }

                        throw ex;
                    });
                }

                throw new EBayUnauthorized(ex);
            }
        }

        log('handleEBayError', ex);
        throw ex;
    }
}