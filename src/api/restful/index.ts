import {EBayInvalidAccessToken, handleEBayError} from '../../errors';
import {IEBayApiRequest} from '../../request';
import Api from '../';

const defaultHeaders: Record<string, any> = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  'Accept-Encoding': 'application/gzip',
}

const additionalHeaders: Record<string, string> = {
  marketplaceId: 'X-EBAY-C-MARKETPLACE-ID',
  endUserCtx: 'X-EBAY-C-ENDUSERCTX',
  acceptLanguage: 'Accept-Language',
  contentLanguage: 'Content-Language',
};

export default abstract class Restful extends Api {

  /**
   * Control to use IAF or not.
   */
  public useIaf() {
    return false;
  }

  public async getReqConfig() {
    const authHeader = await this.auth.getHeaderAuthorization(
      this.useIaf()
    );

    const headers: any = {
      ...defaultHeaders,
      ...authHeader
    }

    // TODO
    Object.keys(additionalHeaders).forEach(key => {
      // @ts-ignore
      const value = this.config[key];
      if (typeof value !== 'undefined') {
        headers[additionalHeaders[key]] = value;
      }
    });

    return {
      headers
    }
  }

  abstract get basePath(): string;

  get baseHostSubDomain() {
    return 'api'
  }

  get schema() {
    return 'https://'
  }

  get serverUrl() {
    return `${this.schema}${this.baseHostSubDomain}.${this.config.sandbox ? 'sandbox.' : ''}ebay.com`
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
      return await this.request(method, url, config, data);
    } catch (error) {
      if (error.name === EBayInvalidAccessToken.name && this.config.autoRefreshToken) {
        // Try again and refresh token
        return await this.request(method, url, config, data, true /* refresh token */)
      }

      throw error
    }
  }

  private async request(
    method: keyof IEBayApiRequest,
    url: string,
    config: any,
    data: any,
    refreshToken = false
  ): Promise<any> {
    const endpoint = this.baseUrl + url;

    try {
      if (refreshToken) {
        await this.auth.OAuth2.refreshToken()
      }

      const reqConfig = await this.getReqConfig();
      const enrichedConfig = {
        ...config,
        ...reqConfig,
        headers: {
          ...reqConfig.headers,
          ...config.headers,
        }
      }
      const args = ['get', 'delete'].includes(method) ? [enrichedConfig] : [data, enrichedConfig]
      // @ts-ignore
      return await this.req[method](endpoint, ...args)
    } catch (ex) {
      handleEBayError(ex)
    }
  }
}
