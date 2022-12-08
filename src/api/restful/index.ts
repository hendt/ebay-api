import Api from '../index.js';
import Auth from '../../auth/index.js';
import {EBayInvalidAccessToken, handleEBayError} from '../../errors/index.js';
import {IEBayApiRequest} from '../../request.js';
import {ApiRequestConfig, AppConfig} from '../../types/index.js';

export const defaultApiHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  // @ts-ignore
  ...(typeof window === 'undefined' ? {
    'Accept-Encoding': 'application/gzip'
  } : {})
};

const additionalHeaders: Record<string, string> = {
  marketplaceId: 'X-EBAY-C-MARKETPLACE-ID',
  endUserCtx: 'X-EBAY-C-ENDUSERCTX',
  acceptLanguage: 'Accept-Language',
  contentLanguage: 'Content-Language',
};

export type RestfulApiConfig = {
  subdomain?: string
  useIaf?: boolean
  apiVersion?: string
  basePath?: string
  schema?: string
  sandbox?: boolean
  tld?: string
} & ApiRequestConfig;

export type ApiRequest = {
  method: keyof IEBayApiRequest,
  url: string,
  config?: any, // AxiosConfig
  data?: any,
}

export interface IRestful {
  new(config: AppConfig, req?: IEBayApiRequest, auth?: Auth, apiConfig?: RestfulApiConfig): Restful;

  id: string;
}

export default abstract class Restful extends Api {

  public readonly apiConfig: Required<RestfulApiConfig>;

  constructor(
    config: AppConfig,
    req?: IEBayApiRequest,
    auth?: Auth,
    apiConfig: RestfulApiConfig = {}
  ) {
    super(config, req, auth);

    this.apiConfig = {
      ...this.getApiConfig(),
      ...apiConfig
    };
  }

  public static buildServerUrl(schema: string, subdomain: string, sandbox: boolean, tld: string) {
    return `${schema}${subdomain}.${sandbox ? 'sandbox.' : ''}${tld}`;
  }

  abstract get basePath(): string;

  /**
   * Enable to supports the use of OAuth tokens for user authorization.
   */
  get useIaf() {
    return false;
  }

  get schema() {
    return 'https://';
  }

  get subdomain() {
    return 'api';
  }

  get apiVersionPath() {
    return '';
  }

  public getServerUrl({schema, subdomain, apiVersion, basePath, sandbox, tld}: Required<RestfulApiConfig>): string {
    return Restful.buildServerUrl(schema, subdomain, sandbox, tld) + apiVersion + basePath;
  }

  public getApiConfig(): Required<RestfulApiConfig> {
    return {
      subdomain: this.subdomain,
      useIaf: this.useIaf,
      apiVersion: this.apiVersionPath,
      basePath: this.basePath,
      schema: this.schema,
      sandbox: this.config.sandbox,
      tld: 'ebay.com',
      headers: {},
      returnResponse: false
    };
  }

  public get baseUrl() {
    return this.getServerUrl(this.apiConfig);
  }

  /**
   * Create a new instances of it self with specified api config.
   * @param apiConfig
   */
  public api(apiConfig: RestfulApiConfig): this {
    // @ts-ignore
    return new this.constructor(this.config, this.req, this.auth, apiConfig);
  }

  /**
   * Use "apix" subdomain
   */
  get apix() {
    return this.api({subdomain: 'apix'});
  }

  /**
   * Use "apiz" subdomain
   */
  get apiz() {
    return this.api({subdomain: 'apiz'});
  }

  public async get(url: string, config: any = {}, apiConfig?: RestfulApiConfig) {
    return this.doRequest({method: 'get', url, config}, apiConfig);
  }

  public async delete(url: string, config: any = {}, apiConfig?: RestfulApiConfig) {
    return this.doRequest({method: 'delete', url, config}, apiConfig);
  }

  public async post(url: string, data?: any, config: any = {}, apiConfig?: RestfulApiConfig) {
    return this.doRequest({method: 'post', url, data, config}, apiConfig);
  }

  public async put(url: string, data?: any, config: any = {}, apiConfig?: RestfulApiConfig) {
    return this.doRequest({method: 'put', url, data, config}, apiConfig);
  }

  get additionalHeaders() {
    return Object.keys(additionalHeaders)
      // @ts-ignore
      .filter(key => typeof this.config[key] !== 'undefined')
      .reduce((headers: any, key) => {
        // @ts-ignore
        headers[additionalHeaders[key]] = this.config[key];
        return headers;
      }, {});
  }

  public async enrichRequestConfig(config: any = {}, apiConfig: Required<RestfulApiConfig> = this.apiConfig) {
    const authHeader = await this.auth.getHeaderAuthorization(apiConfig.useIaf);

    const headers = {
      ...defaultApiHeaders,
      ...this.additionalHeaders,
      ...authHeader,
      ...apiConfig.headers
    };

    return {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...headers
      }
    };
  }

  private async doRequest(payload: ApiRequest, apiConfig?: RestfulApiConfig) {
    try {
      return await this.request(payload, apiConfig);
    } catch (error) {
      if (this.shouldRefreshToken(error)) {
        // Try again and refresh token
        return await this.request(payload, apiConfig, true /* refresh token */);
      }

      throw error;
    }
  }

  private shouldRefreshToken(error: any) {
    if (!this.config.autoRefreshToken) {
      return false;
    }

    if (error.name === EBayInvalidAccessToken.name) {
      return true;
    }

    return error?.meta?.res?.status === 401 && this.apiConfig.basePath === '/post-order/v2';
  }

  private async request(
    apiRequest: ApiRequest,
    apiConfig: RestfulApiConfig = this.apiConfig,
    refreshToken = false,
  ): Promise<any> {
    const {url, method, data, config} = apiRequest;

    const apiCfg: Required<RestfulApiConfig> = {...this.apiConfig, ...apiConfig};
    const endpoint = this.getServerUrl(apiCfg) + url;

    try {
      if (refreshToken) {
        await this.auth.OAuth2.refreshToken();
      }

      const enrichedConfig = await this.enrichRequestConfig(config, apiCfg);

      const args = ['get', 'delete'].includes(method) ? [enrichedConfig] : [data, enrichedConfig];
      // @ts-ignore
      const response = await this.req[method](endpoint, ...args);

      if (this.apiConfig.returnResponse) {
        return response
      } else {
        return response.data;
      }
    } catch (ex) {
      handleEBayError(ex);
    }
  }
}
