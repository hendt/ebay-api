import 'mocha';
import {expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';
import {ILimitedRequest} from '../../src/utils/request';
import OAuth2 from '../../src/auth/оAuth2';

describe('oAuth2', () => {
    const appConfig = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
    const request: ILimitedRequest = {
        get: sinon.stub(),
        delete: sinon.stub(),
        put: sinon.stub(),
        post: sinon.stub(),
        postForm: sinon.stub().returns(Promise.resolve({
            access_token: 'new_access_token'
        }))
    };

    it('emits an refresh event', () => {
        const oAuth = new OAuth2(appConfig, request);
        oAuth.setCredentials({
            access_token: 'access_token',
            expires_in: 0,
            token_type: 'token_type',
            refresh_token: 'refresh_token',
            refresh_token_expires_in: 0
        });

        const refreshAuthToken = sinon.stub();
        oAuth.on('refreshAuthToken', refreshAuthToken);

        return oAuth.refreshAuthToken().then(() => {
            expect(oAuth.accessToken).equal('new_access_token');
            expect(refreshAuthToken.called).to.be.true;
            expect(refreshAuthToken.args[0][0].access_token).to.equal('new_access_token');
        });
    });

});