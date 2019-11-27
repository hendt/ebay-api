import debug from 'debug';
import {createRequest} from '../../utils/request';
import {
    EBayAccessDenied,
    EBayInvalidScope,
    EBayNotFound,
    EBayUnauthorizedAfterRefresh,
    getEBayError
} from '../../errors';
import OAuth2 from '../оAuth2';

const log = debug('ebay:restful:api');

export default abstract class Api {
    private readonly oAuth2: OAuth2;
    private readonly req: any;

    constructor(oAuth2: OAuth2, req = createRequest()) {
        this.oAuth2 = oAuth2;
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
        return 'https://api.' + (this.oAuth2.appConfig.sandbox ? 'sandbox.' : '') + 'ebay.com';
    }

    get apiVersionPath() {
        return '';
    }

    get baseUrl() {
        return this.serverUrl + this.apiVersionPath + this.basePath;
    };

    async doRequest(method: string, url: string, config: any, data?: any): Promise<any> {
        try {
            const args = await this.getArgs(method, url, config, data);
            return await this.req[method](...args);
        } catch (ex) {
            await this.handleEBayError(ex);

            // Token refreshed -> try again
            const args = await this.getArgs(method, url, config, data);
            return this.req[method](...args)
                .catch((ex: any) => this.handleEBayError(ex, true));
        }
    }

    private async getArgs(method: string, url: string, config: any, data: any) {
        const authConfig = await this.getAuthConfig(config);
        const args = [this.baseUrl + url];
        if (['get', 'delete'].includes(method)) {
            args.push(authConfig);
        } else {
            args.push(data, config);
        }
        return args;
    }

    async get(url: string, config: any = {}): Promise<any> {
        return this.doRequest('get', url, config);
    }

    async delete(url: string, config: any = {}): Promise<any> {
        return this.doRequest('delete', url, config);
    }

    async post(url: string, data?: any, config: any = {}): Promise<any> {
        return this.doRequest('post', url, config, data);
    }

    async put(url: string, data?: any, config: any = {}): Promise<any> {
        return this.doRequest('put', url, config, data);
    }

    async handleEBayError(ex: any, refreshedToken?: boolean): Promise<any> {
        const error = getEBayError(ex);

        if (!error) {
            log('handleEBayError', ex);
            throw ex;
        }

        if (error.domain === 'ACCESS') {
            throw new EBayAccessDenied(ex);
        } else if (error.message === 'Invalid access token') {
            if (!refreshedToken) {
                log('Token expired. Refresh the token.');
                return this.oAuth2.refreshToken().catch((ex: Error) => {
                    const error = getEBayError(ex);
                    if (error && error.message === 'invalid_scope') {
                        throw new EBayInvalidScope(ex);
                    }

                    throw ex;
                });
            }

            throw new EBayUnauthorizedAfterRefresh(ex);
        } else if (error.errorId === 11001) {
            throw new EBayNotFound(ex);
        }

        throw ex;
    }
}