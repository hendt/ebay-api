import 'mocha';
import {expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';
import {AppConfig} from '../../../src/types';
import {LimitedRequest} from '../../../src/utils/request';
import Traditional from '../../../src/api/traditional/index';
import {AuthNOAuth2} from '../../../src/api/traditional/types';

describe('Traditional', () => {
    let appConfig: AppConfig = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
    const request: LimitedRequest = {
        get: sinon.stub(),
        post: sinon.stub(),
        postForm: sinon.stub()
    };

    const authNOAuth2: AuthNOAuth2 = {
        geteBayAuthToken() {
            return 'eBayAuthToken';
        },
        getOAuth2AccessToken() {
            return 'accessToken';
        }
    };


    it('return correct eBayAuthToken', () => {
        const traditional = new Traditional(appConfig, authNOAuth2, request);
        expect(traditional.geteBayAuthToken).to.equal('eBayAuthToken');
    });

    it('return correct accessToken', () => {
        const traditional = new Traditional(appConfig, authNOAuth2, request);
        expect(traditional.getOAuth2AccessToken).to.equal('accessToken');
    });

    it('use eBayAuthToken if useIaf is set to false', () => {
        const post = sinon.stub().returns(Promise.resolve('<GetAccount></GetAccount>'));
        const request: LimitedRequest = {
            get: sinon.stub(),
            post,
            postForm: sinon.stub()
        };
        const traditional = new Traditional(appConfig, authNOAuth2, request);
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

    it('use IAF token if accessToken is available', () => {
        const post = sinon.stub().returns(Promise.resolve('<GetAccountResponse></GetAccountResponse>'));
        const request: LimitedRequest = {
            get: sinon.stub(),
            post,
            postForm: sinon.stub()
        };
        const traditional = new Traditional(appConfig, authNOAuth2, request);
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
            post,
            postForm: sinon.stub()
        };
        const traditional = new Traditional(appConfig, authNOAuth2, request);
        const trading = traditional.createTradingApi();
        return trading.GetAccount({}).catch(error => {
            expect(error.name).to.equal('EBayIAFTokenExpired');
        });
    });
});