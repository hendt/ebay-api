import Base from '../api/base';
import {IEBayApiRequest} from '../request';
import {AppConfig} from '../types';
import AuthNAuth from './authNAuth';
import OAuth2 from './oAuth2';

/**
 * Container with Auth'N'Auth and OAuth2.
 */
export default class Auth extends Base {
  public readonly authNAuth: AuthNAuth;
  public readonly oAuth2: OAuth2;
  // tslint:disable-next-line:variable-name
  public readonly OAuth2: OAuth2;

  constructor(config: AppConfig, req: IEBayApiRequest) {
    super(config, req);
    this.authNAuth = new AuthNAuth(this.config, this.req);
    this.OAuth2 = new OAuth2(this.config, this.req);
    this.oAuth2 = this.OAuth2;
  }

  public async getHeaderAuthorization(useIaf: boolean) {
    if (this.authNAuth.eBayAuthToken) {
      return {
        Authorization: 'Token ' + this.authNAuth.eBayAuthToken
      }
    }

    const accessToken = await this.OAuth2.getAccessToken();
    return {
      Authorization: (useIaf ? 'IAF ' : 'Bearer ') + accessToken
    }
  }
}
