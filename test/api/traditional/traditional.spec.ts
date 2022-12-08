import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import Traditional from '../../../src/api/traditional/index.js';
import Auth from '../../../src/auth/index.js';
import {eBayConfig} from '../../../src/types/index.js';
import {IEBayApiRequest} from '../../../src/request.js';

describe('Traditional', () => {
  const config: eBayConfig = {
    authToken: 'eBayAuthToken',
    appId: 'appId',
    certId: 'certId',
    sandbox: true,
    siteId: 0,
    devId: 'devId'
  };

  const request: IEBayApiRequest<any> = {
    get: sinon.stub(),
    delete: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    postForm: sinon.stub(),
    instance: sinon.stub()
  };

  let auth: Auth;

  beforeEach(() => {
    auth = new Auth(config, request);
  });

  it('return correct eBayAuthToken', () => {
    const traditional = new Traditional(config, request, auth);
    expect(traditional.auth.authNAuth.eBayAuthToken).to.equal('eBayAuthToken');
  });

  it('use "eBayAuthToken" if useIaf is set to false', () => {
    const post = sinon.stub().returns(Promise.resolve({data: '<GetAccount></GetAccount>'}));
    const req: IEBayApiRequest<any> = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post,
      postForm: sinon.stub(),
      instance: sinon.stub()
    };
    const traditional = new Traditional(config, req, auth);

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

  it('use Auth Token event if "accessToken" is available', () => {
    const post = sinon.stub().returns(Promise.resolve({data: '<GetAccountResponse></GetAccountResponse>'}));
    const req: IEBayApiRequest<any> = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post,
      postForm: sinon.stub(),
      instance: sinon.stub()
    };
    auth.OAuth2.setCredentials({
      access_token: 'accessToken',
      refresh_token_expires_in: 0,
      refresh_token: 'refresh_token',
      token_type: 'token_type',
      expires_in: 0
    });

    const traditional = new Traditional(config, req, auth);
    const trading = traditional.createTradingApi();
    return trading.GetAccount({}, {raw: true}).then(data => {
      expect(post.args[0][1]).to.equal([
        '<?xml version="1.0" encoding="utf-8"?>',
        '<GetAccountRequest xmlns="urn:ebay:apis:eBLBaseComponents">',
        '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials></GetAccountRequest>',
      ].join(''));
      expect(data).to.equal('<GetAccountResponse></GetAccountResponse>');
      expect(post.args[0][2].headers['X-EBAY-API-IAF-TOKEN']).to.equal(undefined);
    });
  });

  it('use IAF token if "accessToken" is available', () => {
    const post = sinon.stub().returns(Promise.resolve({data: '<GetAccountResponse></GetAccountResponse>'}));
    const req: IEBayApiRequest<any> = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post,
      postForm: sinon.stub(),
      instance: sinon.stub()
    };
    auth.OAuth2.setCredentials({
      access_token: 'accessToken',
      refresh_token_expires_in: 0,
      refresh_token: 'refresh_token',
      token_type: 'token_type',
      expires_in: 0
    });

    auth.authNAuth.setAuthToken(null);
    const traditional = new Traditional(config, req, auth);
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
    const post = sinon.stub().returns(Promise.resolve({data: '<GetAccountResponse><Errors><ErrorCode>21917053</ErrorCode></Errors></GetAccountResponse>'}));
    const req: IEBayApiRequest<any> = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post,
      postForm: sinon.stub(),
      instance: sinon.stub()
    };
    auth.OAuth2.setCredentials({
      access_token: 'accessToken',
      refresh_token_expires_in: 0,
      refresh_token: 'refresh_token',
      token_type: 'token_type',
      expires_in: 0
    });
    const traditional = new Traditional(config, req, auth);
    const trading = traditional.createTradingApi();
    return trading.GetAccount({}).catch(error => {
      expect(error.name).to.equal('EBayIAFTokenExpired');
    });
  });

  it('returns response', () => {
    const post = sinon.stub().returns(Promise.resolve({data: 'data'}));
    const req: IEBayApiRequest<any> = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post,
      postForm: sinon.stub(),
      instance: sinon.stub()
    };
    auth.OAuth2.setCredentials({
      access_token: 'accessToken',
      refresh_token_expires_in: 0,
      refresh_token: 'refresh_token',
      token_type: 'token_type',
      expires_in: 0
    });
    const traditional = new Traditional(config, req, auth);
    const trading = traditional.createTradingApi();
    return trading.GetAccount({}, {returnResponse: true}).catch(error => {
      expect(error.name).to.eql({data: 'data'});
    });
  });
});
