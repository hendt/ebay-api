import debug from 'debug';
import Auth from '../../auth/index';
import {
    EBayAccessDenied,
    EBayInvalidScope,
    EBayNotFound,
    EBayUnauthorizedAfterRefresh,
    getEBayError
} from '../../errors';
import {createRequest, ILimitedRequest} from '../../utils/request';

const log = debug('ebay:restful:api');

export default abstract class Api {
    public readonly auth: Auth;
    public readonly req: ILimitedRequest;

    constructor(auth: Auth, req = createRequest()) {
        this.auth = auth;
        this.req = req;
    }

    /**
     * Control to use IAF or not.
     */
    public useIaf() {
        return false;
    }

    public async enrichConfig(config: any) {
        const headers: any = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Accept-Encoding': 'application/gzip'
        };

        headers.Authorization = await this.auth.getHeaderAuthorization(this.useIaf());

        const additionalHeaders: any = {
            marketplaceId: 'X-EBAY-C-MARKETPLACE-ID',
            endUserCtx: 'X-EBAY-C-ENDUSERCTX',
            acceptLanguage: 'Accept-Language',
            contentLanguage: 'Content-Language'
        };

        Object.keys(additionalHeaders).forEach(key => {
            // @ts-ignore
            const value = this.auth.eBayConfig[key];
            if (typeof value !== 'undefined') {
                headers[additionalHeaders[key]] = value;
            }
        });

        return {
            ...config,
            headers: {
                ...headers,
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
    }

    public async get(url: string, config: any = {}) {
        return this.doRequest('get', url, config);
    }

    public async delete(url: string, config: any = {}) {
        return this.doRequest('delete', url, config);
    }

    public async post(url: string, data?: any, config: any = {}) {
        return this.doRequest('post', url, config, data);
    }

    public async put(url: string, data?: any, config: any = {}) {
        return this.doRequest('put', url, config, data);
    }

    private async doRequest(method: keyof ILimitedRequest, url: string, config: any, data?: any): Promise<any> {
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
        const enrichedConfig = await this.enrichConfig(config);
        const args = [this.baseUrl + url];
        if (['get', 'delete'].includes(method)) {
            args.push(enrichedConfig);
        } else {
            args.push(data, enrichedConfig);
        }
        return args;
    }

    private async handleEBayError(ex: any, refreshedToken?: boolean): Promise<any> {
        const error = getEBayError(ex);

        if (!error) {
            log('handleEBayError', ex);
            throw ex;
        }

        if (error.domain === 'ACCESS') {
            throw new EBayAccessDenied(ex);
        } else if (error.message === 'Invalid access token') {
            if (!refreshedToken) {
                // TODO extract this
                log('Token expired. Refresh the token.');
                return this.auth.oAuth2.refreshToken().catch((e: Error) => {
                    const responseError = getEBayError(e);
                    if (responseError && responseError.message === 'invalid_scope') {
                        throw new EBayInvalidScope(e);
                    }

                    throw e;
                });
            }

            throw new EBayUnauthorizedAfterRefresh(ex);
        } else if (error.errorId === 11001) {
            throw new EBayNotFound(ex);
        }

        throw ex;
    }
}
