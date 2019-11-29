import 'mocha';
import {expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';

import buyTests from './buy';
import commerceTests from './commerce';
import developerTests from './developer';
import sellTests from './sell';
import {ILimitedRequest} from '../../../src/utils/request';
import Auth from '../../../src/auth/index';

const allTests = {
    'Buy': buyTests,
    'Commerce': commerceTests,
    'Developer': developerTests,
    'Sell': sellTests
};

const appConfig = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 77};
const request: ILimitedRequest = {
    get: sinon.stub(),
    delete: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    postForm: sinon.stub()
};

const auth = new Auth(appConfig, request);
auth.oAuth2.setClientToken({
    access_token: 'token',
    expires_in: 1,
    token_type: 'test'
});

describe('Open API Tests', () => {
    Object.entries(allTests).forEach(([name, tests]) => {
        describe('API > restful > ' + name, () => {
            tests.forEach((Oas, Api) => {
                const api = new Api(auth);

                it('"' + name + ':' + Api.name + '" should return correct path', () => {
                    if (Oas.servers) {
                        expect(api.basePath).to.equal(Oas.servers[0].variables.basePath.default);
                    }
                });

                Object.keys(Oas.paths).forEach((path: any) => {
                    const method = Oas.paths[path].get ? 'get' : 'post';
                    const endpoint = Oas.paths[path];
                    const call = endpoint[method];
                    const queryParams = path.match(/(?<={).+?(?=})/ig);
                    const paramsInPath = queryParams ? queryParams : [];
                    const paramsInHeader = call.parameters ? call.parameters.filter((p: any) => p.in === 'header') : [];
                    const args = paramsInPath.map((name: any) => '{' + name + '}')
                        .concat(paramsInHeader.map((p: any) => p.name));

                    const req = {
                        get: sinon.stub().returns(Promise.resolve()),
                        post: sinon.stub().returns(Promise.resolve()),
                        postForm: sinon.stub().returns(Promise.resolve())
                    };

                    const api = new Api(auth, req);

                    it('"' + name + ':' + Api.name + '" should implement this method', () => {
                        expect(api[call.operationId]).to
                            .be.a('function', 'AssertionError: expected to have "' + call.operationId + '" implemented.');
                    });

                    it('"' + name + ':' + Api.name + ':' + call.operationId + '" call correct method', () => {
                        return api[call.operationId](...args).then(() => {
                            if (method === 'get') {
                                expect(req.get.calledOnce).to.be.true;
                            } else if (method === 'post') {
                                expect(req.post.calledOnce).to.be.true;
                            }
                        });
                    });

                    it('"' + name + ':' + Api.name + ':' + call.operationId + '" calls correct url', () => {
                        return api[call.operationId](...args).then(() => {
                            if (method === 'get') {
                                expect(decodeURI(req.get.args[0][0])).to.equal(decodeURI(encodeURI(api.baseUrl + path)));
                            } else if (method === 'post') {
                                expect(decodeURI(req.post.args[0][0])).to.equal(decodeURI(encodeURI(api.baseUrl + path)));
                            }
                        });
                    });
                });
            });
        });
    });
});