import {eBayConfig} from '../types/apiTypes';
import {createRequest, ILimitedRequest} from '../utils/request';
import AuthNAuth from './authNAuth';
import OAuth2 from './оAuth2';

/**
 * Container with Auth'N'Auth and OAuth2.
 */
export default class Auth {
    public readonly eBayConfig: eBayConfig;
    public readonly req: ILimitedRequest;

    public readonly authNAuth: AuthNAuth;
    public readonly oAuth2: OAuth2;

    constructor(config: eBayConfig, req = createRequest()) {
        this.eBayConfig = config;
        this.req = req;

        this.authNAuth = new AuthNAuth(
            this.eBayConfig,
            this.req
        );

        this.oAuth2 = new OAuth2(
            this.eBayConfig,
            this.req
        );
    }

    public async getHeaderAuthorization(useIaf: boolean) {
        if (this.authNAuth.eBayAuthToken) {
            return 'Token ' + this.authNAuth.eBayAuthToken;
        }

        const accessToken = await this.oAuth2.getAccessToken();
        return (useIaf ? 'IAF ' : 'Bearer ') + accessToken;
    }
}
