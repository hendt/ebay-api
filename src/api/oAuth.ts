import request from "../utils/request";
import {Settings} from "../types";

export default class OAuth {
    settings: Settings;
    url = 'https://api.ebay.com/identity/v1/oauth2/token';
    token: string = '';

    constructor(settings: Settings) {
        this.settings = settings;
    }

    getAccessToken(scope?: any) {
        if (this.token) {
            return Promise.resolve(this.token)
        }

        if (!this.settings.appId) throw new Error('Missing Client ID');
        if (!this.settings.certId) throw new Error('Missing Client Secret or Cert Id');
        if (!this.settings.grant_type || !this.settings.scope) throw new Error('Missing Body, required Grant type');

        scope = scope ||  this.settings.scope;

        return request.postForm(this.url, {
            scope,
            grant_type: this.settings.grant_type
        }, {
            auth: {
                username: this.settings.appId,
                password: this.settings.certId
            }
        }).then((data: any) => {
            this.token = data.access_token;
            return data.access_token;
        }).catch((e: any) => {
            throw e;
        })
    }
}