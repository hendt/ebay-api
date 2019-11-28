import 'mocha';
import {expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';
import Factory from '../../src/api/factory';
import {LimitedRequest} from '../../src/utils/request';
import {eBayConfig} from '../../src/types';
import Auth from '../../src/auth/index';

describe('FactoryTest', () => {
    let eBayConfig: eBayConfig;
    const request: LimitedRequest = {
        get: sinon.stub(),
        delete: sinon.stub(),
        put: sinon.stub(),
        post: sinon.stub(),
        postForm: sinon.stub()
    };

    beforeEach(() => {
        eBayConfig = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
    });

    it('Throws an error if devId is not defined', () => {
        delete eBayConfig.devId;
        let auth: Auth = new Auth(eBayConfig);
        const factory = new Factory(auth, request);
        expect(factory.createTradingApi.bind(factory)).to.throw(/devId/);
    });
});