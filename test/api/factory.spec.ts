import 'mocha';
import {expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';
import Factory from '../../src/api/factory';
import {LimitedRequest} from '../../src/utils/request';
import {AppConfig} from '../../src/types';

describe('FactoryTest', () => {
    let appConfig: AppConfig;
    const request: LimitedRequest = {
        get: sinon.stub(),
        post: sinon.stub(),
        postForm: sinon.stub()
    };

    beforeEach(() => {
        appConfig = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 0, devId: 'devId'};
    });

    it('Throws an error if devId is not defined', () => {
        delete appConfig.devId;
        const factory = new Factory(appConfig, {}, request);
        expect(factory.createTradingApi.bind(factory)).to.throw(/devId/);
    });

    it('Throws an error if OAuth2 is not defined', () => {
        const factory = new Factory(appConfig, {}, request);
        expect(factory.createCommerceApi.bind(factory)).to.throw(/oAuth2/);
    });
});