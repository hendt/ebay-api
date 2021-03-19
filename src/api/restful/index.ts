import debug from 'debug';
import Auth from '../../auth/index';
import {
  EBayAccessDenied,
  EBayInvalidGrant,
  EBayInvalidScope,
  EBayNotFound,
  EBayUnauthorizedAfterRefresh,
  getEBayResponseError,
} from '../../errors';
import {createRequest, IEBayApiRequest} from '../../request';
import {AppConfig} from '../../types';

const log = debug('ebay:restful:api');

export default abstract class Api {
  public readonly auth: Auth;
  public readonly config: AppConfig;
  public readonly req: IEBayApiRequest;

  constructor(config: AppConfig, auth: Auth,  req = createRequest()) {
    this.auth = auth;
    this.config = config;
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
      'Accept-Encoding': 'application/gzip',
    };

    headers.Authorization = await this.auth.getHeaderAuthorization(
      this.useIaf()
    );

    const additionalHeaders: any = {
      marketplaceId: 'X-EBAY-C-MARKETPLACE-ID',
      endUserCtx: 'X-EBAY-C-ENDUSERCTX',
      acceptLanguage: 'Accept-Language',
      contentLanguage: 'Content-Language',
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
        ...config.headers,
      },
    };
  }

  abstract get basePath(): string;

  get baseHostSubDomain() {
    return 'api'
  }

  get schema() {
    return 'https://'
  }

  get serverUrl() {
    return `${this.schema}${this.baseHostSubDomain}.${this.auth.eBayConfig.sandbox ? 'sandbox.' : ''}ebay.com`
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

  private async doRequest(
    method: keyof IEBayApiRequest,
    url: string,
    config: any,
    data?: any,
  ): Promise<any> {
    try {
      const args = await this.getArgs(method, url, config, data);
      // @ts-ignore
      return await this.req[method](...args);
    } catch (ex) {
      await this.handleEBayError(ex);

      // Token refreshed -> try again
      const args = await this.getArgs(method, url, config, data);
      // @ts-ignore
      return this.req[method](...args).catch((ex: any) =>
        this.handleEBayError(ex, true)
      );
    }
  }

  private async getArgs(
    method: string,
    url: string,
    config: any,
    data: any,
  ): Promise<any> {
    const enrichedConfig = await this.enrichConfig(config);
    const args = [this.baseUrl + url];
    if (['get', 'delete'].includes(method)) {
      args.push(enrichedConfig);
    } else {
      args.push(data, enrichedConfig);
    }
    return args;
  }

  private async handleEBayError(
    ex: any,
    refreshedToken?: boolean
  ): Promise<any> {
    const error = getEBayResponseError(ex);

    if (!error) {
      log('handleEBayError', ex);
      throw ex;
    }

    if (error.domain === 'ACCESS') {
      throw new EBayAccessDenied(ex);
    } else if (error.message === 'invalid_grant') {
      throw new EBayInvalidGrant(ex);
    } else if (error.errorId === EBayNotFound.code) {
      throw new EBayNotFound(ex);
    }

    if (error.message === 'Invalid access token') {
      if (!refreshedToken) {
        // TODO extract this
        log('Token expired. Refresh the token.');
        return this.auth.OAuth2.refreshToken().catch((e: Error) => {
          const responseError = getEBayResponseError(e);
          if (responseError?.message === 'invalid_scope') {
            throw new EBayInvalidScope(e);
          }

          throw e;
        });
      }

      throw new EBayUnauthorizedAfterRefresh(ex);
    }

    throw ex;
  }
}
