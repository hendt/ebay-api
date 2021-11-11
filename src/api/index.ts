import Auth from '../auth';
import {IEBayApiRequest} from '../request';
import {AppConfig} from '../types';
import Base from './base';

/**
 * Superclass with Auth container.
 */
export default abstract class Api extends Base {
  public readonly auth: Auth;

  constructor(
    config: AppConfig,
    req?: IEBayApiRequest,
    auth?: Auth
  ) {
    super(config, req);
    this.auth = auth || new Auth(this.config, this.req);
  }

}
