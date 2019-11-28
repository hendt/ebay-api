import debug from 'debug';
import {createRequest, LimitedRequest} from '../../utils/request';
import {
    EBayAccessDenied,
    EBayInvalidScope,
    EBayNotFound,
    EBayUnauthorizedAfterRefresh,
    getEBayError
} from '../../errors';
import Auth from '../../auth/index';

const log = debug('ebay:restful:api');

export default abstract class Api {
    private readonly auth: Auth;
    private readonly req: LimitedRequest;

    constructor(auth: Auth, req = createRequest()) {
        this.auth = auth;
        this.req = req;
    }

    /**
     * Control to use IAF or not.
     */
    useIaf() {
        return false;
    }

    async getAuthConfig(config: any) {
        const authHeaders = await this.auth.getAuthHeaders(this.useIaf());
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
        return 'https://api.' + (this.auth.eBayConfig.sandbox ? 'sandbox.' : '') + 'ebay.com';
    }

    get apiVersionPath() {
        return '';
    }

    get baseUrl() {
        return this.serverUrl + this.apiVersionPath + this.basePath;
    };

    async doRequest(method: keyof LimitedRequest, url: string, config: any, data?: any): Promise<any> {
        try {
            const args = await this.getArgs(method, url, config, data);
            // @ts-ignore
            return await this.req[method](...args);
        } catch (ex) {
            await this.handleEBayError(ex);

            // Token refreshed -> try again
            const args = await this.getArgs(method, url, config, data);
            // @ts-ignore
            return this.req[method](...args)
                .catch((ex: any) => this.handleEBayError(ex, true));
        }
    }

    private async getArgs(method: string, url: string, config: any, data: any): Promise<any> {
        const authConfig = await this.getAuthConfig(config);
        const args = [this.baseUrl + url];
        if (['get', 'delete'].includes(method)) {
            args.push(authConfig);
        } else {
            args.push(data, config);
        }
        return args;
    }

    async get(url: string, config: any = {}) {
        return this.doRequest('get', url, config);
    }

    async delete(url: string, config: any = {}) {
        return this.doRequest('delete', url, config);
    }

    async post(url: string, data?: any, config: any = {}) {
        return this.doRequest('post', url, config, data);
    }

    async put(url: string, data?: any, config: any = {}) {
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
                return this.auth.oAuth2.refreshToken().catch((ex: Error) => {
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