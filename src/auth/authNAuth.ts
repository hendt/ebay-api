import debug from 'debug';
import XMLRequest from '../api/traditional/XMLRequest';
import Base from '../api/base';
import {IEBayApiRequest} from '../request';
import {AppConfig, AuthToken} from '../types';

const log = debug('ebay:authNAuth');

export default class AuthNAuth extends Base {
  public static readonly SIGNIN_ENDPOINT = {
    sandbox: 'https://signin.sandbox.ebay.com/ws/eBayISAPI.dll',
    production: 'https://signin.ebay.com/ws/eBayISAPI.dll'
  };

  public static readonly API_ENDPOINT = {
    production: 'https://api.ebay.com/ws/api.dll',
    sandbox: 'https://api.sandbox.ebay.com/ws/api.dll'
  };

  public static generateAuthUrl(sandbox: boolean, ruName: string, sessionId: string, prompt = false) {
    return [
      AuthNAuth.SIGNIN_ENDPOINT[sandbox ? 'sandbox' : 'production'],
      '?SignIn',
      '&RuName=', encodeURIComponent(ruName),
      '&SessID=', encodeURIComponent(sessionId),
      prompt ? '&prompt=login' : ''
    ].join('');
  }

  private authToken?: AuthToken;

  constructor(config: AppConfig, req?: IEBayApiRequest) {
    super(config, req)

    if (this.config.authToken) {
      this.setAuthToken(this.config.authToken)
    }
  }

  /**
   * Generates URL for consent page landing.
   *
   * @param ruName RuName
   */
  public async getSessionIdAndAuthUrl(ruName?: string) {
    if (!this.config.devId) {
      throw new Error('DevId is required.');
    }

    ruName = ruName || this.config.ruName;
    if (!ruName) {
      throw new Error('RuName is required.');
    }

    const reqConfig = this.getRequestConfig('GetSessionID');

    const xmlApi = new XMLRequest('GetSessionID', {
      RuName: ruName
    }, reqConfig, this.req);

    const response = await xmlApi.request();

    log('GetSessionID response', response);

    return {
      sessionId: response.SessionID,
      url: AuthNAuth.generateAuthUrl(this.config.sandbox, ruName, response.SessionID)
    };
  }

  public async fetchAuthToken(sessionId: string) {
    if (!this.config.devId) {
      throw new Error('DevId is required.');
    }

    const xmlApi = new XMLRequest('FetchToken', {
      SessionID: sessionId
    }, this.getRequestConfig('FetchToken'), this.req);

    return await xmlApi.request();
  }

  public setAuthToken(authToken: AuthToken | string) {
    if (typeof authToken === 'string') {
      this.authToken = {
        eBayAuthToken: authToken
      };
    } else {
      this.authToken = authToken;
    }
  }

  public getAuthToken() {
    return this.authToken;
  }

  get eBayAuthToken() {
    if (this.authToken) {
      return this.authToken.eBayAuthToken;
    }

    return null;
  }

  public getRequestConfig(callName: string) {
    if (!this.config.siteId) {
      throw new Error('"siteId" is required for Auth\'n\'Auth.');
    }

    return {
      useIaf: false,
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      endpoint: AuthNAuth.API_ENDPOINT[this.config.sandbox ? 'sandbox' : 'production'],
      headers: {
        'X-EBAY-API-CALL-NAME': callName,
        'X-EBAY-API-CERT-NAME': this.config.certId,
        'X-EBAY-API-APP-NAME': this.config.appId,
        'X-EBAY-API-DEV-NAME': this.config.devId,
        'X-EBAY-API-SITEID': this.config.siteId,
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967
      }
    };
  }
}
