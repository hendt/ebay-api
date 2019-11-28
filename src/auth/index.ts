import AuthNAuth from './authNAuth';
import OAuth2 from './оAuth2';
import {eBayConfig} from '../types';
import {createRequest, LimitedRequest} from '../utils/request';

/**
 * Container with Auth'N'Auth and OAuth2.
 */
export default class Auth {
    readonly eBayConfig: eBayConfig;
    readonly req: LimitedRequest;

    readonly authNAuth: AuthNAuth;
    readonly oAuth2: OAuth2;

    constructor(eBayConfig: eBayConfig, req = createRequest()) {
        this.eBayConfig = eBayConfig;
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

    async getAuthHeaders(useIaf: boolean) {
        const headers: any = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Accept-Encoding': 'application/gzip'
        };

        if (this.authNAuth.eBayAuthToken) {
            headers['Authorization'] = 'Token ' + this.authNAuth.eBayAuthToken;
        } else {
            const accessToken = await this.oAuth2.getAccessToken();
            headers['Authorization'] = (useIaf ? 'IAF ' : 'Bearer ') + accessToken;
        }

        if (this.eBayConfig.marketplaceId) {
            headers['X-EBAY-C-MARKETPLACE-ID'] = this.eBayConfig.marketplaceId;
        }

        if (this.eBayConfig.endUserCtx) {
            headers['X-EBAY-C-ENDUSERCTX'] = this.eBayConfig.endUserCtx;
        }

        if (this.eBayConfig.acceptLanguage) {
            headers['Accept-Language'] = this.eBayConfig.acceptLanguage;
        }

        if (this.eBayConfig.contentLanguage) {
            headers['Content-Language'] = this.eBayConfig.contentLanguage;
        }

        return headers;
    }
}