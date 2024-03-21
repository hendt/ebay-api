import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';

import XMLRequest, {XMLReqConfig} from '../../../src/api/traditional/XMLRequest.js';
import {IEBayApiRequest} from '../../../src/request.js';

function createReq(apiResponse: string): IEBayApiRequest<any> {
  return {
    get: sinon.stub().returns(Promise.resolve({})),
    delete: sinon.stub().returns(Promise.resolve({})),
    put: sinon.stub().returns(Promise.resolve({})),
    post: sinon.stub().returns(Promise.resolve({data: apiResponse})),
    instance: sinon.stub()
  };
}

describe('XMLRequestTest', () => {

  const apiResponse = '<CALL>response</CALL>';

  const config: XMLReqConfig = {
    headers: {
      CALL: 'CALL'
    },
    endpoint: 'endpoint',
    xmlns: 'xmlns',
    eBayAuthToken: 'eBayAuthToken',
    raw: true
  };

  let req = createReq(apiResponse);

  beforeEach(() => {
    req = createReq(apiResponse);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Return Raw Response XML', () => {
    const request = new XMLRequest('CALL', {}, config, req);
    return request.request().then(result => {
      expect(result).to.equal(apiResponse);
    });
  });

  it('Calls correct endpoint', () => {
    const request = new XMLRequest('CALL', {Param: 'Param'}, config, req);
    return request.request().then(() => {
      // @ts-ignore
      expect(req.post.args[0][0]).to.equal('endpoint');
    });
  });

  it('Adds eBayAuthToken', () => {
    const request = new XMLRequest('CALL', {Param: 'Param'}, config, req);
    return request.request().then(() => {
      // @ts-ignore
      expect(req.post.args[0][1]).to.equal([
        '<?xml version="1.0" encoding="utf-8"?>',
        '<CALLRequest xmlns="xmlns">',
        '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials>',
        '<Param>Param</Param>',
        '</CALLRequest>'
      ].join(''));
    });
  });

  it('Parse @_attribute and #value', () => {
    const request = new XMLRequest('CALL', {
      productId: {
        '@_type': 'ReferenceID',
        '#value': '53039031'
      }
    }, config, req);
    return request.request().then(() => {
      // @ts-ignore
      expect(req.post.args[0][1]).to.equal([
        '<?xml version="1.0" encoding="utf-8"?>',
        '<CALLRequest xmlns="xmlns">',
        '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials>',
        '<productId type="ReferenceID">53039031</productId>',
        '</CALLRequest>'
      ].join(''));
    });
  });

  it('Parse CDATA', () => {
    const request = new XMLRequest('CALL', {
      Item: {
        Title: 'title',
        Description: {
          __cdata: '<div>test</div>'
        }
      }
    }, config, req);
    return request.request().then(() => {
      // @ts-ignore
      expect(req.post.args[0][1]).to.equal([
        '<?xml version="1.0" encoding="utf-8"?>',
        '<CALLRequest xmlns="xmlns">',
        '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials>',
        '<Item><Title>title</Title><Description><![CDATA[<div>test</div>]]></Description></Item>',
        '</CALLRequest>'
      ].join(''));
    });
  });

  it('Unwraps Response', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Item>Item</Item>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve({data: xml}));
    const request = new XMLRequest('CALL', {}, {...config, raw: false}, req);
    return request.request().then(result => {
      expect({
        Item: 'Item'
      }).to.deep.equal(result);
    });
  });

  it('Parse Attributes', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Price currency="EUR" total="false">2.99</Price>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve({data: xml}));
    const request = new XMLRequest('CALL', {}, {...config, raw: false}, req);
    return request.request().then(result => {
      expect({
        Price: {
          currency: 'EUR',
          value: 2.99,
          total: false
        }
      }).to.deep.equal(result);
    });
  });

  it('Handles tag names that ends with Array', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
   <ActiveList>
        <ItemArray>
            <Item id="2">
              <price currency="EUR">2.0</price>
            </Item>
        </ItemArray>
   </ActiveList>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve({data: xml}));
    const request = new XMLRequest('CALL', {}, {...config, raw: false}, req);
    return request.request().then(result => {
      expect({
        ActiveList: {
          ItemArray: {
            Item: [{
              id: 2,
              price: {
                currency: 'EUR',
                value: 2.0
              }
            }]
          }
        }
      }).to.deep.equal(result);
    });
  });

  describe('request', () => {
    it('call custom body function and headers', () => {
      const post = sinon.stub().returns(Promise.resolve({data: apiResponse}));
      const request = new XMLRequest('CALL', {},
        {
          ...config,
          hook: () => ({
            body: 'custom',
            headers: {
              'X_-HEADER': 'header',
              'Content-Type': 'multipart/form-data',
            }
          }),
        },
        {...req, post});

      return request.request().then(result => {
        expect(post.args[0][1]).to.eql('custom');
        expect(post.args[0][2].headers).to.eql({
          'CALL': 'CALL',
          'Content-Type': 'multipart/form-data',
          'X_-HEADER': 'header',
        });
        expect(result).to.equal(apiResponse);
      });
    });
  });
});
