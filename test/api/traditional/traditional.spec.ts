import 'mocha';
import {expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';
import {eBayConfig} from '../../../src/types';
import {LimitedRequest} from '../../../src/utils/request';
import Traditional from '../../../src/api/traditional/index';
import Auth from '../../../src/auth/index';

describe('Traditional', () => {
    let eBayConfig: eBayConfig = {
        authToken: 'eBayAuthToken',
        appId: 'appId',
        certId: 'certId',
        sandbox: true,
        siteId: 0,
        devId: 'devId'
    };

    const request: LimitedRequest = {
        get: sinon.stub(),
        delete: sinon.stub(),
        put: sinon.stub(),
        post: sinon.stub(),
        postForm: sinon.stub()
    };

    let auth: Auth;

    beforeEach(() => {
        auth = new Auth(eBayConfig, request);
    });

    it('return correct eBayAuthToken', () => {
        const traditional = new Traditional(auth, request);
        expect(traditional.auth.authNAuth.eBayAuthToken).to.equal('eBayAuthToken');
    });

    it('use "eBayAuthToken" if useIaf is set to false', () => {
        const post = sinon.stub().returns(Promise.resolve('<GetAccount></GetAccount>'));
        const request: LimitedRequest = {
            get: sinon.stub(),
            delete: sinon.stub(),
            put: sinon.stub(),
            post,
            postForm: sinon.stub()
        };
        const traditional = new Traditional(auth, request);
        const trading = traditional.createTradingApi();
        return trading.GetAccount({}, {raw: true, useIaf: false}).then(data => {
            expect(post.args[0][1]).to.equal([
                '<?xml version="1.0" encoding="utf-8"?>',
                '<GetAccountRequest xmlns="urn:ebay:apis:eBLBaseComponents">',
                '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials>',
                '</GetAccountRequest>'
            ].join(''));
            expect(data).to.equal('<GetAccount></GetAccount>');
        });
    });

    it('use IAF token if "accessToken" is available', () => {
        const post = sinon.stub().returns(Promise.resolve('<GetAccountResponse></GetAccountResponse>'));
        const request: LimitedRequest = {
            get: sinon.stub(),
            delete: sinon.stub(),
            put: sinon.stub(),
            post,
            postForm: sinon.stub()
        };
        auth.oAuth2.setCredentials({
            access_token: 'accessToken',
            refresh_token_expires_in: 0,
            refresh_token: 'refresh_token',
            token_type: 'token_type',
            expires_in: 0
        });
        const traditional = new Traditional(auth, request);
        const trading = traditional.createTradingApi();
        return trading.GetAccount({}, {raw: true}).then(data => {
            expect(post.args[0][1]).to.equal([
                '<?xml version="1.0" encoding="utf-8"?>',
                '<GetAccountRequest xmlns="urn:ebay:apis:eBLBaseComponents">',
                '</GetAccountRequest>'
            ].join(''));
            expect(data).to.equal('<GetAccountResponse></GetAccountResponse>');
            expect(post.args[0][2].headers['X-EBAY-API-IAF-TOKEN']).to.equal('accessToken');
        });
    });

    it('throws EBayIAFTokenExpired of error code is 21917053', () => {
        const post = sinon.stub().returns(Promise.resolve('<GetAccountResponse><Errors><ErrorCode>21917053</ErrorCode></Errors></GetAccountResponse>'));
        const request: LimitedRequest = {
            get: sinon.stub(),
            delete: sinon.stub(),
            put: sinon.stub(),
            post,
            postForm: sinon.stub()
        };
        auth.oAuth2.setCredentials({
            access_token: 'accessToken',
            refresh_token_expires_in: 0,
            refresh_token: 'refresh_token',
            token_type: 'token_type',
            expires_in: 0
        });
        const traditional = new Traditional(auth, request);
        const trading = traditional.createTradingApi();
        return trading.GetAccount({}).catch(error => {
            expect(error.name).to.equal('EBayIAFTokenExpired');
        });
    });
});