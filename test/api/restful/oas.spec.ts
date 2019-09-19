import {expect} from 'chai';
import 'mocha';
import OAuth from "../../../src/api/oAuth";

import buyTests from './buy';
import commerceTests from './commerce';

const allTests = {
    'Buy': buyTests,
    'Commerce': commerceTests
};

describe('API > restful > OAS', () => {
    const testOAuth = new OAuth({
        appId: '',
        certId: '',
        devId: 'string',
        sandbox: true
    });

    Object.entries(allTests).forEach(([name, tests]) => {
        tests.forEach((Oas, Api) => {
            const api = new Api(testOAuth);

            it('"'+ name + ':' + Api.name + '" should return correct path', () => {
                expect(api.basePath).to.equal(Oas.servers[0].variables.basePath.default);
            });

            Object.keys(Oas.paths).forEach((path: any) => {
                const call = Oas.paths[path].get || Oas.paths[path].post;

                it('"'+ name + ':' + Api.name + '" should implement this method', () => {
                    expect(api[call.operationId]).to.be.a('function', 'AssertionError: expected to have "' + call.operationId + '" implemented.');
                });
            });
        });
    });

});