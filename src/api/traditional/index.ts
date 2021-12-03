import {stringify} from 'qs';
import Api from '../';
import {EBayIAFTokenExpired, EBayIAFTokenInvalid, handleEBayError} from '../../errors';
import {ClientAlerts, Finding, Shopping, Trading, TraditionalApi} from '../../types';
import ClientAlertsCalls from './clientAlerts';
import {Fields} from './fields';
import FindingCalls from './finding';
import ShoppingCalls from './shopping';
import TradingCalls from './trading';
import XMLRequest, {defaultOptions, Options} from './XMLRequest';

/**
 * Traditional eBay API.
 */
export default class Traditional extends Api {
  public createTradingApi(): Trading {
    if (!this.config.devId) {
      throw new Error('devId is required for trading API.');
    }

    if (typeof this.config.siteId !== 'number') {
      throw new Error('siteId is required for trading API.');
    }

    return this.createTraditionalXMLApi<Trading>({
      endpoint: {
        production: 'https://api.ebay.com/ws/api.dll',
        sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
      },
      calls: TradingCalls,
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      headers: (callName: string, accessToken?: string) => ({
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
        production: 'https://open.api.ebay.com/shopping',
        sandbox: 'https://open.api.sandbox.ebay.com/shopping'
      },
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      calls: ShoppingCalls,
      headers: (callName: string, accessToken?: string) => ({
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
        production: 'https://svcs.ebay.com/services/search/FindingService/v1',
        sandbox: 'https://svcs.sandbox.ebay.com/services/search/FindingService/v1'
      },
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
        production: 'https://clientalerts.ebay.com/ws/ecasvc/ClientAlerts',
        sandbox: 'https://clientalerts.sandbox.ebay.com/ws/ecasvc/ClientAlerts'
      },
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
          paramsSerializer,
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

  public createBusinessPolicyManagementApi() {
    throw new Error('Important! This API is deprecated and will be decommissioned on January 31, 2022. We recommend that you migrate to the fulfillment_policy, payment_policy, and return_policy resources of the Account API to set up and manage all of your fulfillment, payment, and return business policies.')
  }

  private createXMLRequest = (callName: string, api: TraditionalApi) => async (fields: Fields, opts: Options) => {
    const options = {...defaultOptions, ...opts};

    try {
      return await this.request(options, api, callName, fields);
    } catch (error: any) {
      // Try to refresh the token.
      if (this.config.autoRefreshToken && (error.name === EBayIAFTokenExpired.name || error.name === EBayIAFTokenInvalid.name)) {
        return await this.request(options, api, callName, fields, true);
      }

      throw error;
    }
  }

  private async request(options: Options, api: TraditionalApi, callName: string, fields: Fields, refreshToken = false) {
    try {
      if (refreshToken) {
        await this.auth.OAuth2.refreshToken();
      }

      const config = this.getConfig(api, callName, options);
      const xmlRequest = new XMLRequest(callName, fields, config, this.req);

      return await xmlRequest.request();
    } catch (e) {
      handleEBayError(e)
    }
  }

  private getConfig(api: TraditionalApi, callName: string, options: Options) {
    const eBayAuthToken = this.auth.authNAuth.eBayAuthToken;
    const userAccessToken = this.auth.OAuth2.getUserAccessToken();
    const useIaf = (!eBayAuthToken || userAccessToken && options.useIaf);

    return {
      ...options,
      xmlns: api.xmlns,
      endpoint: api.endpoint[this.config.sandbox ? 'sandbox' : 'production'],
      headers: {
        ...api.headers(callName, userAccessToken && useIaf ? userAccessToken : undefined),
        ...options.headers
      },
      ...(eBayAuthToken && !useIaf && {
        eBayAuthToken
      })
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
