import NanoEvents from 'nanoevents';
import {AxiosRequest, IEBayApiRequest} from '../request';
import {AppConfig} from '../types';

/**
 * Abstract superclass.
 */
export default abstract class Base {
  public readonly config: AppConfig;
  public readonly req: IEBayApiRequest;

  private readonly emitter: NanoEvents<any>;

  constructor(
    config: AppConfig,
    req: IEBayApiRequest = new AxiosRequest(config.axiosConfig),
  ) {
    this.config = config;
    this.req = req;
    this.emitter = new NanoEvents();
  }

  public on(name: string, callBack: (arg: any) => any) {
    return this.emitter.on(name, callBack);
  }

  protected emit(name: string, value: any) {
    return this.emitter.emit(name, value);
  }
}
