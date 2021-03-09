import { expect } from "chai";
import "mocha";
// @ts-ignore
import sinon from 'sinon';
import Auth from '../../../src/auth';
import {IEBayApiRequest} from '../../../src/request';

import buyTests from "./buy";
import commerceTests from "./commerce";
import developerTests from "./developer";
import sellTests from "./sell";

const allTests = {
  Buy: buyTests,
  Commerce: commerceTests,
  Developer: developerTests,
  Sell: sellTests,
};

const appConfig = {appId: 'appId', certId: 'certId', sandbox: true, siteId: 77};
const request: IEBayApiRequest<any> = {
    get: sinon.stub(),
    delete: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    postForm: sinon.stub(),
    instance: sinon.stub()
};

const auth = new Auth(appConfig, request);
auth.oAuth2.setClientToken({
  access_token: "token",
  expires_in: 1,
  token_type: "test",
});

describe("Open API Tests", () => {
  Object.entries(allTests).forEach(([name, tests]) => {
    describe("API > restful > " + name, () => {
      // tslint:disable-next-line:variable-name
      tests.forEach((Oas, Api) => {
        const api = new Api(auth);

        it('"' + name + ":" + Api.name + '" should return correct path', () => {
          if (Oas.servers) {
            expect(api.basePath).to.equal(
              Oas.servers[0].variables.basePath.default
            );
          }
        });

        Object.keys(Oas.paths).forEach((path: any) => {
          Object.keys(Oas.paths[path]).forEach((method) => {
            const endpoint = Oas.paths[path];
            const call = endpoint[method];
            if (!call.operationId || call.deprecated) {
              return;
            }
            const queryParams = path.match(/(?<={).+?(?=})/gi);
            const paramsInPath = queryParams ? queryParams : [];
            const paramsInHeader = call.parameters
              ? call.parameters.filter((p: any) => p.in === "header")
              : [];
            const args = paramsInPath
              .map((paramName: any) => "{" + paramName + "}")
              .concat(paramsInHeader.map((p: any) => p.name));

            const req: any = {
              get: sinon.stub().returns(Promise.resolve()),
              put: sinon.stub().returns(Promise.resolve()),
              delete: sinon.stub().returns(Promise.resolve()),
              post: sinon.stub().returns(Promise.resolve()),
              postForm: sinon.stub().returns(Promise.resolve()),
            };

            const restApi = new Api(auth, req);

            it(`"${name}:${Api.name}" should implement this method (${path}). `, () => {
              expect(restApi[call.operationId]).to.be.a(
                "function",
                'AssertionError: expected to have "' +
                  call.operationId +
                  '" implemented.'
              );
            });

            it(`"${name}:${Api.name}:${call.operationId}" call correct method (${path}).`, () => {
              return restApi[call.operationId](...args).then(() => {
                expect(req[method].calledOnce).to.be.true;
              });
            });

            it(`"${name}:${Api.name}:${call.operationId}" calls correct url (${path}).`, () => {
              return restApi[call.operationId](...args).then(() => {
                expect(decodeURI(req[method].args[0][0])).to.oneOf([
                  decodeURI(encodeURI(restApi.baseUrl() + path)),
                  decodeURI(encodeURI(restApi.baseUrl(true) + path)),
                ]);
              });
            });
          });
        });
      });
    });
  });
});
