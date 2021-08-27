import debug from 'debug';
import Base from '../api/base';
import XMLRequest from '../api/traditional/XMLRequest';
import {IEBayApiRequest} from '../request';
import {AppConfig} from '../types';

const log = debug('ebay:authNAuth');

export type AuthToken = {
  eBayAuthToken: string,
  Timestamp?: string,
  HardExpirationTime?: string
};

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
      sandbox ? AuthNAuth.SIGNIN_ENDPOINT.sandbox : AuthNAuth.SIGNIN_ENDPOINT.production,
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

  get apiEndpoint() {
    return this.config.sandbox ? AuthNAuth.API_ENDPOINT.sandbox : AuthNAuth.API_ENDPOINT.production
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

    const xmlApi = new XMLRequest('GetSessionID', {
      RuName: ruName
    }, this.getRequestConfig('GetSessionID'), this.req);

    const response = await xmlApi.request();

    log('GetSessionID response', response);

    return {
      sessionId: response.SessionID,
      url: AuthNAuth.generateAuthUrl(this.config.sandbox, ruName, response.SessionID)
    };
  }

  public async mintToken(sessionId: string) {
    if (!this.config.devId) {
      throw new Error('DevId is required.');
    }

    const xmlApi = new XMLRequest('FetchToken', {
      SessionID: sessionId
    }, this.getRequestConfig('FetchToken'), this.req);

    try {
      return await xmlApi.request();
    } catch (error) {
      log('Fetch auth token failed', error);
      throw error
    }
  }

  public async obtainToken(sessionId: string) {
    const token = await this.mintToken(sessionId);
    log('Obtain auth token', token)
    this.setAuthToken(token);

    return token;
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

  public getAuthToken(): AuthToken | null {
    if (!this.authToken) {
      return null
    }

    return {
      ...this.authToken
    };
  }

  get eBayAuthToken() {
    return this.authToken?.eBayAuthToken ?? null
  }

  public getRequestConfig(callName: string) {
    if (typeof this.config.siteId !== 'number') {
      throw new Error('"siteId" is required for Auth\'n\'Auth.');
    }

    return {
      useIaf: false,
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      endpoint: this.apiEndpoint,
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
