import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';

import XMLRequest, {Config} from '../../../src/api/traditional/XMLRequest';

describe('XMLRequestTest', () => {

  const config: Config = {
    headers: {
      CALL: 'CALL'
    },
    endpoint: 'endpoint',
    xmlns: 'xmlns',
    eBayAuthToken: 'eBayAuthToken'
  };

  const apiResponse = '<CALL>response</CALL>';
  const req = {
    get: sinon.stub().returns(Promise.resolve()),
    delete: sinon.stub().returns(Promise.resolve()),
    put: sinon.stub().returns(Promise.resolve()),
    post: sinon.stub().returns(Promise.resolve(apiResponse)),
    postForm: sinon.stub().returns(Promise.resolve())
  };

  afterEach(() => {
    sinon.reset();
  });

  it('Return Raw Response XML', () => {
    const request = new XMLRequest('CALL', {}, config, req);
    return request.fetch({raw: true}).then(result => {
      expect(result).to.equal(apiResponse);
    });
  });

  it('Calls correct endpoint', () => {
    const request = new XMLRequest('CALL', {Param: 'Param'}, config, req);
    return request.fetch({raw: true}).then(() => {
      expect(req.post.args[0][0]).to.equal('endpoint');
    });
  });

  it('Adds eBayAuthToken', () => {
    const request = new XMLRequest('CALL', {Param: 'Param'}, config, req);
    return request.fetch({raw: true}).then(() => {
      expect(req.post.args[0][1]).to.equal([
        '<?xml version="1.0" encoding="utf-8"?>',
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
    const request = new XMLRequest('CALL', {}, config, req);
    return request.fetch().then(result => {
      expect(result).to.deep.equal({});
    });
  });

  it('Unwraps Response', () => {
    const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Item>Item</Item>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve(response));
    const request = new XMLRequest('CALL', {}, config, req);
    return request.fetch().then(result => {
      expect({
        Item: 'Item'
      }).to.deep.equal(result);
    });
  });

  it('Parse Attributes', () => {
    const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Price currency="EUR">2.99</Price>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve(response));
    const request = new XMLRequest('CALL', {}, config, req);
    return request.fetch().then(result => {
      console.log(result, null, 2)
      expect({
        Price: {
          currency: 'EUR',
          val: 2.99
        }
      }).to.deep.equal(result);
    });
  });
});
