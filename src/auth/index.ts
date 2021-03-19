import {eBayConfig} from '../types';
import {createRequest, IEBayApiRequest} from '../request';
import AuthNAuth from './authNAuth';
import OAuth2 from './oAuth2';

/**
 * Container with Auth'N'Auth and OAuth2.
 */
export default class Auth {
  public readonly eBayConfig: eBayConfig;
  public readonly req: IEBayApiRequest;

  public readonly authNAuth: AuthNAuth;
  // tslint:disable-next-line:variable-name
  public readonly OAuth2: OAuth2;

  constructor(config: eBayConfig, req = createRequest()) {
    this.eBayConfig = config;
    this.req = req;

    this.authNAuth = new AuthNAuth(config, req);
    this.OAuth2 = new OAuth2(config, req);
  }

  public async getHeaderAuthorization(useIaf: boolean) {
    if (this.authNAuth.eBayAuthToken) {
      return 'Token ' + this.authNAuth.eBayAuthToken;
    }

    const accessToken = await this.OAuth2.getAccessToken();
    return (useIaf ? 'IAF ' : 'Bearer ') + accessToken;
  }
}
