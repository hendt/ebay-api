// @ts-ignore
import {expect} from 'chai';
import sinon from 'sinon';
import Restful, {defaultApiHeaders} from '../../../src/api/restful/index.js';
import {MarketplaceId} from '../../../src/enums/index.js';

class TestApi extends Restful {
  get basePath(): string {
    return '/basePath';
  }

  updateThings() {
    return this.post('/things', {
      headers: {
        'X-TEST': 'X-TEST'
      }
    });
  }
}

describe('Restful API', () => {
  const config = {
    appId: 'appId',
    certId: 'certId',
    sandbox: true,
    siteId: 0,
    devId: 'devId',
  };

  let req: any = null;
  const cred = {
    access_token: 'access_token',
    expires_in: 0,
    token_type: 'token_type',
    refresh_token: 'refresh_token',
    refresh_token_expires_in: 0
  };

  beforeEach(() => {
    req = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post: sinon.stub(),
      postForm: sinon.stub().returns(Promise.resolve({
        data: {access_token: 'new_access_token'}
      })),
      instance: sinon.stub()
    };
  });

  describe('extend Restful API with additional parameters', () => {
    it('returns correct baseUrl', () => {
      const api = new TestApi(config, req);
      const apix = new TestApi(config, req).apix;
      const apiz = new TestApi(config, req).apiz;
      const apiy = new TestApi(config, req).api({subdomain: 'apiy'});

      expect(api.baseUrl).to.equal('https://api.sandbox.ebay.com/basePath');
      expect(apix.baseUrl).to.equal('https://apix.sandbox.ebay.com/basePath');
      expect(apiz.baseUrl).to.equal('https://apiz.sandbox.ebay.com/basePath');
      expect(apiy.baseUrl).to.equal('https://apiy.sandbox.ebay.com/basePath');
    });

    it('extends headers', async () => {
      const post = sinon.stub().returns({item: '1'});
      const api = new TestApi(config, {...req, post}).api({headers: {'X-HEADER': 'X-HEADER'}});
      api.auth.OAuth2.setCredentials(cred);

      await api.updateThings();
      expect(post.args[0][2].headers).to.eql({
        ...defaultApiHeaders,
        'Authorization': 'Bearer access_token',
        'X-HEADER': 'X-HEADER'
      });
    });
  });

  it('returns correct additional headers', () => {
    const api = new TestApi({
      ...config,
      marketplaceId: MarketplaceId.EBAY_DE
    }, req);

    expect(api.additionalHeaders).to.eql({
      'X-EBAY-C-MARKETPLACE-ID': MarketplaceId.EBAY_DE
    });
  });

  it('returns correct RequestConfig', async () => {
    // @ts-ignore
    const api = new TestApi(config, req, {
      getHeaderAuthorization: sinon.stub().returns({'Authorization': 'Authorization'})
    });

    expect(await api.enrichRequestConfig({
      method: 'post',
      path: '/',
      config: {
        headers: {
          'X-HEADER': 'X-HEADER'
        }
      }
    })).to.eql({
      headers: {
        'Authorization': 'Authorization',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'application/gzip',
        'X-HEADER': 'X-HEADER'
      }
    });
  });

  describe('restful response test', () => {
    it('returns data', async () => {
      const post = sinon.stub().returns({data: {item: '1'}});
      const api = new TestApi(config, {...req, post});

      const response = await api.updateThings();
      expect(response).to.eql({item: '1'});
    });

    it('returns response', async () => {
      const post = sinon.stub().returns({data: {item: '1'}});
      const api = new TestApi(config, {...req, post}, undefined, {returnResponse: true});

      const response = await api.updateThings();
      expect(response).to.eql({data: {item: '1'}});
    });
  });

  it('refresh the token if invalid token returned', async () => {
    const post = sinon.stub().onCall(0).rejects({
      response: {
        data: {
          error: 'Invalid access token'
        }
      }
    }).onCall(1).resolves({data: {updateThings: 'ok'}});

    const api = new TestApi({
      ...config,
      autoRefreshToken: true
    }, {
      ...req,
      post,
      postForm: sinon.stub().resolves(cred)
    });

    api.auth.OAuth2.setCredentials(cred);

    const result = await api.updateThings();

    expect(post.callCount).to.equal(2);
    expect(result).to.eql({updateThings: 'ok'});
  });

  it('refresh the token on PostOrder call if response is 401', async () => {
    const post = sinon.stub().onCall(0).rejects({
      response: {
        status: 401,
      }
    }).onCall(1).resolves({data: {updateThings: 'ok'}});

    const api = new TestApi({
      ...config,
      autoRefreshToken: true
    }, {
      ...req,
      post,
      postForm: sinon.stub().resolves(cred),
    }, undefined, {
      basePath: '/post-order/v2'
    });

    api.auth.OAuth2.setCredentials(cred);

    const result = await api.updateThings();

    expect(post.callCount).to.equal(2);
    expect(result).to.eql({updateThings: 'ok'});
  });


});