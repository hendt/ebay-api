import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import AuthNAuth from '../../src/auth/authNAuth';

describe('AuthNAuth', () => {
  const config = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
  let req: any = null;
  beforeEach(() => {
    req = {
      get: sinon.stub(),
      delete: sinon.stub(),
      put: sinon.stub(),
      post: sinon.stub(),
      postForm: sinon.stub().returns(Promise.resolve({
        access_token: 'new_access_token'
      })),
      instance: sinon.stub()
    }
  })

  it('Sets the auth token', () => {
    const auth = new AuthNAuth({...config, authToken: 'authToken'}, req);
    expect(auth.getAuthToken()?.eBayAuthToken).to.equal('authToken');
  })

  describe('Get session id and auth url', () => {
    it('Throws error if devId is not defined', async () => {
      const auth = new AuthNAuth({...config, devId: undefined}, req);
      try {
        await auth.getSessionIdAndAuthUrl()
      } catch (e) {
        expect(e.message).to.equal('DevId is required.');
      }
    })

    it('Throws error if ruName is not defined', async () => {
      const auth = new AuthNAuth({...config}, req);
      try {
        await auth.getSessionIdAndAuthUrl()
      } catch (e) {
        expect(e.message).to.equal('RuName is required.');
      }
    })

    it('Throws error if siteId is not a Number', async () => {
      // @ts-ignore
      const auth = new AuthNAuth({...config, siteId: 'xxx', ruName: 'ruName'}, req);
      try {
        await auth.getSessionIdAndAuthUrl()
      } catch (e) {
        expect(e.message).to.equal('"siteId" is required for Auth\'n\'Auth.');
      }
    })

    it('Throws error if siteId is not a Number', async () => {
      const post = sinon.stub().returns(`<?xml version="1.0" encoding="utf-8"?>
<GetSessionIDResponse xmlns="urn:ebay:apis:eBLBaseComponents">
   <SessionID>SessionID</SessionID>
</GetSessionIDResponse>`)
      // @ts-ignore
      const auth = new AuthNAuth({...config, ruName: 'ruName'}, {...req, post});

      const response = await auth.getSessionIdAndAuthUrl()
      expect(response.sessionId).to.equal('SessionID');
      expect(response.url).to.equal('https://signin.sandbox.ebay.com/ws/eBayISAPI.dll?SignIn&RuName=ruName&SessID=SessionID');
    })
  })

  describe('Auth Token', () => {
    it('Throws error if devId is not defined', async () => {
      const auth = new AuthNAuth({...config, devId: undefined}, req);
      try {
        await auth.fetchAuthToken('SessionID')
      } catch (e) {
        expect(e.message).to.equal('DevId is required.');
      }
    })

    it('fetch auth token', async () => {
      const post = sinon.stub().returns(`<?xml version="1.0" encoding="utf-8"?>
<GetSessionIDResponse xmlns="urn:ebay:apis:eBLBaseComponents">
   <SessionID>SessionID</SessionID>
</GetSessionIDResponse>`)
      const auth = new AuthNAuth(config, {...req, post});
      await auth.fetchAuthToken('SessionID')
    })

    it('sets and gets the token correctly', async () => {
      // @ts-ignore
      const auth = new AuthNAuth(config, req);
      auth.setAuthToken('authToken')
      expect(auth.eBayAuthToken).to.equal('authToken');
    })
  })


  it('Returns correct XML request config', async () => {
    const auth = new AuthNAuth(config, req);
    const xmlConfig = await auth.getRequestConfig('callName')
    expect(xmlConfig).to.eql({
      useIaf: false,
      xmlns: 'urn:ebay:apis:eBLBaseComponents',
      endpoint: 'https://api.sandbox.ebay.com/ws/api.dll',
      headers: {
        'X-EBAY-API-CALL-NAME': 'callName',
        'X-EBAY-API-CERT-NAME': 'certId',
        'X-EBAY-API-APP-NAME': 'appId',
        'X-EBAY-API-DEV-NAME': 'devId',
        'X-EBAY-API-SITEID': 0,
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967
      }
    });
  })

  describe('Generate AuthUrl', () => {
    it('generates correct auth url', () => {
      const url = AuthNAuth.generateAuthUrl(false, 'ruName', 'sessionId', true)
      expect(url).to.equal('https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&RuName=ruName&SessID=sessionId&prompt=login');
    })
  })
});
