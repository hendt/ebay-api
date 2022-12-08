import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import Auth from '../../../src/auth/index.js';
import {IEBayApiRequest} from '../../../src/request.js';

import buyTests from './buy/index.js';
import commerceTests from './commerce/index.js';
import developerTests from './developer/index.js';
import sellTests from './sell/index.js';
import postOrderTests from './postOrder/index.js';

const allTests = {
  Buy: buyTests,
  Commerce: commerceTests,
  Developer: developerTests,
  Sell: sellTests,
  PostOrder: postOrderTests
};

const appConfig = {appId: 'appId', certId: 'certId', sandbox: false, siteId: 77};

function createReq(): IEBayApiRequest<any> {
  return {
    get: sinon.stub().returns(Promise.resolve({data: {}})),
    delete: sinon.stub().returns(Promise.resolve({data: {}})),
    put: sinon.stub().returns(Promise.resolve({data: {}})),
    post: sinon.stub().returns(Promise.resolve({data: {}})),
    postForm: sinon.stub().returns(Promise.resolve({data: {}})),
    instance: sinon.stub().returns(Promise.resolve({data: {}})),
  };
}

const request = createReq();

const auth = new Auth(appConfig, request);
auth.OAuth2.setClientToken({
  access_token: 'token',
  expires_in: 1,
  token_type: 'test',
});

describe('Open API Tests', () => {
  Object.entries(allTests).forEach(([name, tests]) => {
    describe('API > restful > ' + name, () => {
      // tslint:disable-next-line:variable-name
      tests.forEach((Oas, RestfulApi) => {
        it('should match name with id', () => {
          expect(RestfulApi.id).to.equal(RestfulApi.name);
        });

        const api = new RestfulApi(appConfig, request, auth);

        if (Oas.servers) {
          it('"' + name + ':' + RestfulApi.name + '" should return url', () => {
            expect(api.baseUrl).to.oneOf(
              Oas.servers.map((server: any) => server.url.replace('{basePath}', server.variables.basePath.default)),
            );
          });

          it('"' + name + ':' + RestfulApi.name + '" should return correct path', () => {
            expect(api.basePath).to.equal(
              Oas.servers[0].variables.basePath.default
            );
          });
        }

        Object.keys(Oas.paths).forEach((path: any) => {
          Object.keys(Oas.paths[path]).forEach(method => {
            const endpoint = Oas.paths[path];
            const call = endpoint[method];
            if (!call.operationId || call.deprecated) {
              return;
            }
            const queryParams = path.match(/(?<={).+?(?=})/gi);
            const paramsInPath = queryParams ? queryParams : [];
            const paramsInHeader = call.parameters
              ? call.parameters.filter((p: any) => p.in === 'header')
              : [];
            const paramsInBody = (call.parameters
              ? call.parameters.filter((p: any) => p.in === 'body')
              : []).reduce((result: any, p: any) => {
              result[p.name] = p.name;
              return result;
            }, {});
            const args = paramsInPath
              .map((paramName: any) => '{' + paramName + '}')
              .concat(paramsInHeader.map((p: any) => p.name))
              .concat(paramsInBody);

            const req: any = createReq();

            const restApi = new RestfulApi(appConfig, req, auth);

            it(`"${name}:${RestfulApi.name}" should implement this method (${path}). `, () => {
              expect(restApi[call.operationId]).to.be.a(
                'function',
                'AssertionError: expected to have "' +
                call.operationId +
                '" implemented.'
              );
            });

            it(`"${name}:${RestfulApi.name}:${call.operationId}" call correct method (${path}).`, () => {
              return restApi[call.operationId](...args).then(() => {
                // tslint:disable-next-line:no-unused-expression
                expect(req[method].calledOnce).to.be.true;
              });
            });

            it(`"${name}:${RestfulApi.name}:${call.operationId}" calls correct url (${path}).`, () => {
              return restApi[call.operationId](...args).then(() => {
                expect(decodeURI(req[method].args[0][0])).to.equal(decodeURI(encodeURI(restApi.baseUrl + path)));
              });
            });
          });
        });
      });
    });
  });
});
