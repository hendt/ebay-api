import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import XMLRequest, {Config} from '../../../src/api/traditional/XMLRequest';
import {Auth} from '../../../src/api/factory';
import OAuth2 from '../../../src/api/оAuth2';

describe('XMLRequestTest', () => {

    const testAuth: Auth = {
        authToken: {
            eBayAuthToken: 'eBayAuthToken'
        },
        oAuth2: new OAuth2('appId', 'certId', true),
        sandbox: true
    };

    const config: Config = {
        headers: {
            'CALL': 'CALL'
        },
        endpoint: 'endpoint',
        xmlns: 'xmlns'
    };

    const response = '<CALL>response</CALL>';
    const req = {
        get: sinon.stub().returns(Promise.resolve()),
        post: sinon.stub().returns(Promise.resolve(response)),
        postForm: sinon.stub().returns(Promise.resolve())
    };

    afterEach(() => {
        sinon.reset();
    });

    it('Return Raw Response XML', () => {
        const request = new XMLRequest('CALL', {}, testAuth, config, req);
        return request.run({raw: true}).then(result => {
            expect(result).to.equal(response);
        });
    });

    it('Calls correct endpoint', () => {
        const request = new XMLRequest('CALL', {Param: 'Param'}, testAuth, config, req);
        return request.run({raw: true}).then(() => {
            expect(req.post.args[0][0]).to.equal('endpoint');
        });
    });

    it('Adds eBayAuthToken', () => {
        const request = new XMLRequest('CALL', {Param: 'Param'}, testAuth, config, req);
        return request.run({raw: true}).then(() => {
            expect(req.post.args[0][1]).to.equal([
                '<?xml version="1.0" encoding="utf-8"?/>',
                '<CALLRequest xmlns="xmlns">',
                '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials>',
                '<Param>Param</Param>',
                '</CALLRequest>'
            ].join(''));
        });
    });

    it('Removes Extraneous nodes', () => {
        const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Ack</Timestamp>
  <ack>ack</Ack>
  <Version>Version</Version>
  <Build>Build</Build>
</CALLResponse>`;

        req.post = sinon.stub().returns(Promise.resolve(response));
        const request = new XMLRequest('CALL', {}, testAuth, config, req);
        return request.run().then((result) => {
            expect(result).to.deep.equal({});
        });
    });

    it('Unwraps Response', () => {
        const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Item>Item</Timestamp>
</CALLResponse>`;

        req.post = sinon.stub().returns(Promise.resolve(response));
        const request = new XMLRequest('CALL', {}, testAuth, config, req);
        return request.run().then((result) => {
            expect({
                Item: 'Item'
            }).to.deep.equal(result);
        });
    });
});