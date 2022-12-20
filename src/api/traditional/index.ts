import {stringify} from 'qs';
import {EBayIAFTokenExpired, EBayIAFTokenInvalid, handleEBayError} from '../../errors/index.js';
import {ClientAlerts, Finding, Merchandising, Shopping, Trading, TraditionalApi} from '../../types/index.js';
import Api from '../index.js';
import ClientAlertsCalls from './clientAlerts/index.js';
import {Fields} from './fields.js';
import FindingCalls from './finding/index.js';
import MerchandisingCalls from './merchandising/index.js';
import ShoppingCalls from './shopping/index.js';
import TradingCalls from './trading/index.js';
import XMLRequest, {defaultApiConfig, TraditionalApiConfig, XMLReqConfig} from './XMLRequest.js';

/**
 * Traditional eBay API.
 */
export default class Traditional extends Api {
  public createTradingApi(): Trading {
    if (typeof this.config.siteId !== 'number') {
      throw new Error('siteId is required for trading API.');
    }

    return this.createTraditionalXMLApi<Trading>({
      endpoint: {
        production: 'api.ebay.com',
        sandbox: 'api.sandbox.ebay.com'
      },
      path: '/ws/api.dll',
      calls: TradingCalls,
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      headers: (callName: string, accessToken?: string | null) => ({
        'X-EBAY-API-CALL-NAME': callName,
        'X-EBAY-API-CERT-NAME': this.config.certId,
        'X-EBAY-API-APP-NAME': this.config.appId,
        'X-EBAY-API-DEV-NAME': this.config.devId,
        'X-EBAY-API-SITEID': this.config.siteId,
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
        ...(accessToken && {'X-EBAY-API-IAF-TOKEN': accessToken})
      })
    });
  }

  public createShoppingApi(): Shopping {
    if (typeof this.config.siteId !== 'number') {
      throw new Error('siteId is required for shopping API.');
    }
    return this.createTraditionalXMLApi<Shopping>({
      endpoint: {
        production: 'open.api.ebay.com',
        sandbox: 'open.api.sandbox.ebay.com'
      },
      path: '/shopping',
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      calls: ShoppingCalls,
      headers: (callName: string, accessToken?: string | null) => ({
        'X-EBAY-API-CALL-NAME': callName,
        // 'X-EBAY-API-APP-ID': this.config.appId, deprecated  on June 30, 2021
        'X-EBAY-API-SITE-ID': this.config.siteId,
        'X-EBAY-API-VERSION': 863,
        'X-EBAY-API-REQUEST-ENCODING': 'xml',
        ...(accessToken && {'X-EBAY-API-IAF-TOKEN': accessToken})
      })
    });
  }

  public createFindingApi(): Finding {
    return this.createTraditionalXMLApi<Finding>({
      endpoint: {
        production: 'svcs.ebay.com',
        sandbox: 'svcs.sandbox.ebay.com'
      },
      path: '/services/search/FindingService/v1',
      xmlns: 'http://www.ebay.com/marketplace/search/v1/services',
      calls: FindingCalls,
      headers: (callName: string) => ({
        'X-EBAY-SOA-SECURITY-APPNAME': this.config.appId,
        'X-EBAY-SOA-OPERATION-NAME': callName
      })
    });
  }

  public createClientAlertsApi(): ClientAlerts {
    if (typeof this.config.siteId !== 'number') {
      throw new Error('siteId is required for client alerts API.');
    }
    const api = {
      endpoint: {
        production: 'clientalerts.ebay.com',
        sandbox: 'clientalerts.sandbox.ebay.com'
      },
      path: '/ws/ecasvc/ClientAlerts',
      calls: ClientAlertsCalls
    };

    const endpoint = api.endpoint[this.config.sandbox ? 'sandbox' : 'production'];
    const paramsSerializer = (args: object) => {
      return stringify(args, {allowDots: true})
        .replace(/%5B/gi, '(')
        .replace(/%5D/gi, ')');
    };

    const params = {
      appid: this.config.appId,
      siteid: this.config.siteId,
      version: 643
    };

    const service: any = {};
    Object.keys(api.calls).forEach((callName: string) => {
      service[callName] = async (fields: Fields) => {
        return this.req.get(endpoint, {
          paramsSerializer: {
            serialize: paramsSerializer
          },
          params: {
            ...params,
            ...fields,
            callname: callName
          }
        });
      };
    });

    return service;
  }

  public createMerchandisingApi(): Merchandising {
    return this.createTraditionalXMLApi<Merchandising>({
      endpoint: {
        production: 'svcs.ebay.com',
        sandbox: 'svcs.sandbox.ebay.com'
      },
      path: '/MerchandisingService',
      xmlns: 'http://www.ebay.com/marketplace/services',
      calls: MerchandisingCalls,
      headers: (callName: string) => ({
        'EBAY-SOA-CONSUMER-ID': this.config.appId,
        'X-EBAY-SOA-OPERATION-NAME': callName
      })
    });
  }

  public createBusinessPolicyManagementApi() {
    throw new Error('Important! This API is deprecated and will be decommissioned on January 31, 2022. We recommend that you migrate to the fulfillment_policy, payment_policy, and return_policy resources of the Account API to set up and manage all of your fulfillment, payment, and return business policies.');
  }

  private createXMLRequest = (callName: string, api: TraditionalApi) => async (fields: Fields, opts: TraditionalApiConfig) => {
    const apiConfig = {...defaultApiConfig, ...opts};

    try {
      return await this.request(apiConfig, api, callName, fields);
    } catch (error: any) {
      // Try to refresh the token.
      if (this.config.autoRefreshToken && (error.name === EBayIAFTokenExpired.name || error.name === EBayIAFTokenInvalid.name)) {
        return await this.request(apiConfig, api, callName, fields, true);
      }

      throw error;
    }
  };

  private async request(apiConfig: TraditionalApiConfig, api: TraditionalApi, callName: string, fields: Fields | null, refreshToken = false) {
    try {
      if (refreshToken) {
        await this.auth.OAuth2.refreshToken();
      }

      const config = await this.getConfig(api, callName, apiConfig);
      const xmlRequest = new XMLRequest(callName, fields, config, this.req);

      return await xmlRequest.request();
    } catch (e) {
      handleEBayError(e);
    }
  }

  private async getConfig(api: TraditionalApi, callName: string, apiConfig: TraditionalApiConfig): Promise<XMLReqConfig> {
    const eBayAuthToken = this.auth.authNAuth.eBayAuthToken;
    const accessToken = !eBayAuthToken && apiConfig.useIaf ? (await this.auth.OAuth2.getAccessToken()) : null;
    const useIaf = !eBayAuthToken && accessToken;
    const host = this.config.sandbox ? api.endpoint.sandbox : api.endpoint.production;


    return {
      ...apiConfig,
      xmlns: api.xmlns,
      endpoint: `https://${host}${api.path}`, // always use https
      headers: {
        ...api.headers(callName, useIaf ? accessToken : null),
        ...apiConfig.headers
      },
      digitalSignatureHeaders: payload => {
        return apiConfig.sign ? this.getDigitalSignatureHeaders({
            method: 'POST', // it's always post
            authority: host,
            path: api.path
          },
          payload
        ) : {};
      },
      ...(!useIaf ? {eBayAuthToken} : {})
    };
  }

  private createTraditionalXMLApi<T>(traditionalApi: TraditionalApi): T {
    const api: any = {};
    Object.keys(traditionalApi.calls).forEach((callName: string) => {
      api[callName] = this.createXMLRequest(callName, traditionalApi);
    });

    return api as T;
  }
}
