import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import ApiFactory from '../../src/api/apiFactory.js';
import {IEBayApiRequest} from '../../src/request.js';
import {eBayConfig} from '../../src/types/index.js';

describe('FactoryTest', () => {
  let config: eBayConfig;
  const request: IEBayApiRequest<any> = {
    get: sinon.stub(),
    delete: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    postForm: sinon.stub(),
    instance: sinon.stub()
  };

  beforeEach(() => {
    config = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
  });

  it('Throws an error if siteId is not defined', () => {
    delete config.siteId;
    const factory = new ApiFactory(config, request);
    expect(factory.createTradingApi.bind(factory)).to.throw(/siteId/);
  });
});
