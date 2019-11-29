import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import Factory from '../../src/api/factory';
import Auth from '../../src/auth/index';
import {eBayConfig} from '../../src/types';
import {ILimitedRequest} from '../../src/utils/request';

describe('FactoryTest', () => {
    let config: eBayConfig;
    const request: ILimitedRequest = {
        get: sinon.stub(),
        delete: sinon.stub(),
        put: sinon.stub(),
        post: sinon.stub(),
        postForm: sinon.stub()
    };

    beforeEach(() => {
        config = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
    });

    it('Throws an error if devId is not defined', () => {
        delete config.devId;
        const auth: Auth = new Auth(config);
        const factory = new Factory(auth, request);
        expect(factory.createTradingApi.bind(factory)).to.throw(/devId/);
    });
});
