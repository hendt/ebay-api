import {expect} from 'chai';
import 'mocha';
import OAuth from "../../../src/api/oAuth";
import sinon from 'sinon';

import buyTests from './buy';
import commerceTests from './commerce';
import developerTests from './developer';
import sellTests from './sell';

const allTests = {
    'Buy': buyTests,
    //'Commerce': commerceTests,
    //'Developer': developerTests,
    //'Sell': sellTests
};

describe('API > restful > OAS', () => {
    const testOAuth = new OAuth({
        appId: '',
        certId: '',
        devId: 'string',
        sandbox: true
    });

    testOAuth.token = 'token';

    Object.entries(allTests).forEach(([name, tests]) => {
        tests.forEach((Oas, Api) => {

            const api = new Api(testOAuth);

            it('"' + name + ':' + Api.name + '" should return correct path', () => {
                if (Oas.servers) {
                    expect(api.basePath).to.equal(Oas.servers[0].variables.basePath.default);
                }
            });

            Object.keys(Oas.paths).forEach((path: any) => {
                const method = Oas.paths[path].get ? 'get' : 'post';
                const endpoint = Oas.paths[path];
                const call = endpoint[method];

                const req = {
                    getStub: sinon.stub().returns({catch: sinon.stub()}),
                    get() {
                        return {
                            then: req.getStub
                        }
                    },
                    postStub: sinon.stub().returns({catch: sinon.stub()}),
                    post() {
                        return {
                            then: req.postStub
                        }
                    }
                };

                const api = new Api(testOAuth, req);

                it('"' + name + ':' + Api.name + '" should implement this method', () => {
                    expect(api[call.operationId]).to
                        .be.a('function', 'AssertionError: expected to have "' + call.operationId + '" implemented.');
                });

                it('"' + name + ':' + Api.name + ':' + call.operationId + '" call correct method', () => {
                    if (!call.parameters && !call.body) {
                        return api[call.operationId]().then(() => {
                            if (method === 'get') {
                                expect(req.getStub.calledOnce).to.be.true;
                            } else {
                                expect(req.postStub.calledOnce).to.be.true;
                            }
                        });
                    }
                });
            });
        });
    });
});