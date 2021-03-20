import Auth from '../auth';
import {AxiosRequest, IEBayApiRequest} from '../request';
import {AppConfig} from '../types';
import AbstractApi from './abstractApi';

export default abstract class Api extends AbstractApi {
  public readonly auth: Auth;

  constructor(
    config: AppConfig,
    req: IEBayApiRequest = new AxiosRequest(config.axiosConfig),
    auth = new Auth(config, req)
  ) {
    super(config, req);
    this.auth = auth;
  }
}
