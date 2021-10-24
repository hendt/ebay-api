import Auth from '../auth/index.js';
import {IEBayApiRequest} from '../request.js';
import {AppConfig} from '../types/index.js';
import Base from './base.js';

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
