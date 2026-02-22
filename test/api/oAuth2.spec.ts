import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import OAuth2 from '../../src/auth/oAuth2.js';

describe('OAuth2', () => {
  const config = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
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
      get: sinon.stub(Promise.resolve({})),
      delete: sinon.stub(Promise.resolve({})),
      put: sinon.stub(Promise.resolve({})),
      post: sinon.stub(Promise.resolve({})),
      postForm: sinon.stub().returns(Promise.resolve({
        data: {
          access_token: 'new_access_token'
        }
      })),
      instance: sinon.stub()
    };
  });

  describe('Generate AuthUrl', () => {
    it('generate correct production AuthUrl', () => {
      expect(OAuth2.generateAuthUrl(false, 'appId', 'ruName', ['scope1']))
        .to.equal('https://auth.ebay.com/oauth2/authorize?client_id=appId&redirect_uri=ruName&response_type=code&state=&scope=scope1');
    });

    it('generate correct sandbox AuthUrl', () => {
      expect(OAuth2.generateAuthUrl(true, 'appId', 'ruName', ['scope1'], 'state'))
        .to.equal('https://auth.sandbox.ebay.com/oauth2/authorize?client_id=appId&redirect_uri=ruName&response_type=code&state=state&scope=scope1');
    });

    it('generate correct sandbox AuthUrl', () => {
      const oAuth2 = new OAuth2({...config, ruName: 'ruName', scope: []}, req);
      const url = oAuth2.generateAuthUrl('ruName', [], 'state');
      expect(url).to.equal('https://auth.sandbox.ebay.com/oauth2/authorize?client_id=appId&redirect_uri=ruName&response_type=code&state=state&scope=');
    });

    it('requires ruName', () => {
      const oAuth2 = new OAuth2(config, req);
      try {
        oAuth2.generateAuthUrl();
      } catch (error: any) {
        expect(error.message).to.equal('RuName is required.');
      }
    });
  });

  describe('Scope', () => {
    it('sets and returns correct scope', () => {
      const oAuth2 = new OAuth2(config, req);
      oAuth2.setScope(['scope1']);
      expect(oAuth2.getScope()).to.eql(['scope1']);
    });
  });

  describe('Obtain Tokens', () => {
    it('returns client access token', async () => {
      const oAuth2 = new OAuth2(config, req);
      oAuth2.setClientToken(cred);

      const token = await oAuth2.getApplicationAccessToken();

      expect(token).to.equal('access_token');
    });

    it('throws error if refresh didn\'t work', async () => {
      const oAuth2 = new OAuth2(config, {
        ...req,
        postForm: sinon.stub().throws('error')
      });

      try {
        await oAuth2.getApplicationAccessToken();
      } catch (error: any) {
        expect(error.name).to.equal('error');
      }
    });

    it('refresh the client access token', async () => {
      const oAuth2 = new OAuth2(config, req);

      const token = await oAuth2.getApplicationAccessToken();
      expect(token).to.equal('new_access_token');
    });

    it('return token correctly', async () => {
      const oAuth2 = new OAuth2(config, req);

      const token = await oAuth2.getToken('code');
      expect(token.access_token).to.equal('new_access_token');
    });

    it('return token correctly', async () => {
      const oAuth2 = new OAuth2(config, req);

      await oAuth2.getToken('code', 'ruNameX');
      expect(req.postForm.args[0][1].redirect_uri).to.equal('ruNameX');
    });

    it('throws error on getToken', async () => {
      const oAuth2 = new OAuth2(config, {...req, postForm: sinon.stub().throws('error')});

      try {
        await oAuth2.getToken('code');
      } catch (error: any) {
        expect(error.name).to.equal('error');
      }
    });

    it('set and get credentials', () => {
      const oAuth2 = new OAuth2(config, req);
      expect(oAuth2.getCredentials()).to.equal(null);

      oAuth2.setCredentials(cred);
      expect(oAuth2.getCredentials()).to.eql(cred);
    });
  });

  describe('Refresh Client Token', () => {
    it('Throws error if appId is not defined', async () => {
      try {
        const oAuth2 = new OAuth2({...config, appId: ''}, req);
        await oAuth2.obtainApplicationAccessToken();
      } catch (error: any) {
        expect(error.message).to.equal('Missing App ID (Client Id)');
      }
    });

    it('Throws error if appId is not defined', async () => {
      try {
        const oAuth2 = new OAuth2({...config, certId: ''}, req);
        await oAuth2.obtainApplicationAccessToken();
      } catch (error: any) {
        expect(error.message).to.equal('Missing Cert Id (Client Secret)');
      }
    });

    it('throws error on refreshToken if no credentials are not set', async () => {
      const oAuth2 = new OAuth2(config, req);

      try {
        await oAuth2.refreshUserAccessToken();
      } catch (error: any) {
        expect(error.message).to.equal('Failed to refresh the user access token. Token or refresh_token is not set.');
      }
    });

    it('throws error on refreshAuthToken if request failed', async () => {
      const oAuth2 = new OAuth2(config, {...req, postForm: sinon.stub().throws('error')});
      oAuth2.setCredentials(cred);
      try {
        await oAuth2.refreshUserAccessToken();
      } catch (error: any) {
        expect(error.name).to.equal('error');
      }
    });

    it('throws error on refreshToken if authToken or client token are not defined', async () => {
      const oAuth2 = new OAuth2(config, req);
      try {
        await oAuth2.refreshToken();
      } catch (error: any) {
        expect(error.message).to.equal('Missing credentials. To refresh a token an application access token or user access token must be already set.');
      }
    });

    it('calls refreshAuthToken', async () => {
      const oAuth2 = new OAuth2(config, req);
      oAuth2.setCredentials(cred);
      await oAuth2.refreshToken();
      // @ts-ignore

      expect(req.postForm.called).to.be.true;
      expect(req.postForm.args[0][1].grant_type).to.equal('refresh_token');
    });

    it('calls refreshClientToken', async () => {
      const oAuth2 = new OAuth2(config, req);
      await oAuth2.setClientToken(cred);
      await oAuth2.refreshToken();
      // @ts-ignore

      expect(req.postForm.called).to.be.true;
      expect(req.postForm.args[0][1].grant_type).to.equal('client_credentials');
    });

    it('emits an refresh event', () => {
      const oAuth2 = new OAuth2(config, req);
      oAuth2.setCredentials({
        access_token: 'access_token',
        expires_in: 0,
        token_type: 'token_type',
        refresh_token: 'refresh_token',
        refresh_token_expires_in: 0
      });

      const refreshAuthToken = sinon.stub();
      oAuth2.on('refreshAuthToken', refreshAuthToken);

      return oAuth2.refreshUserAccessToken().then(() => {
        expect(oAuth2.getUserAccessToken()).equal('new_access_token');
  
        expect(refreshAuthToken.called).to.be.true;
        expect(refreshAuthToken.args[0][0].access_token).to.equal('new_access_token');
      });
    });
  });
});
