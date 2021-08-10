import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';

import XMLRequest, {XMLReqConfig} from '../../../src/api/traditional/XMLRequest';
import {IEBayApiRequest} from '../../../src/request';

describe('XMLRequestTest', () => {

  const config: XMLReqConfig = {
    headers: {
      CALL: 'CALL'
    },
    endpoint: 'endpoint',
    xmlns: 'xmlns',
    eBayAuthToken: 'eBayAuthToken',
    raw: true
  };

  const apiResponse = '<CALL>response</CALL>';
  const req: IEBayApiRequest<any> = {
    get: sinon.stub().returns(Promise.resolve()),
    delete: sinon.stub().returns(Promise.resolve()),
    put: sinon.stub().returns(Promise.resolve()),
    post: sinon.stub().returns(Promise.resolve(apiResponse)),
    postForm: sinon.stub().returns(Promise.resolve()),
    instance: sinon.stub()
  };

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
    const formData = {
      append: sinon.stub()
    };
    const request = new XMLRequest('CALL', {Param: 'Param'}, {...config, formData}, req);
    return request.request().then(() => {
      // @ts-ignore
      expect(formData.append.args[0][1]).to.equal([
        '<?xml version="1.0" encoding="utf-8"?>',
        '<CALLRequest xmlns="xmlns">',
        '<RequesterCredentials><eBayAuthToken>eBayAuthToken</eBayAuthToken></RequesterCredentials>',
        '<Param>Param</Param>',
        '</CALLRequest>'
      ].join(''));
    });
  });

  it('Unwraps Response', () => {
    const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Item>Item</Item>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve(response));
    const request = new XMLRequest('CALL', {}, {...config, raw: false}, req);
    return request.request().then(result => {
      expect({
        Item: 'Item'
      }).to.deep.equal(result);
    });
  });

  it('Parse Attributes', () => {
    const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Price currency="EUR" total="false">2.99</Price>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve(response));
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
    const response = `<?xml version="1.0" encoding="utf-8"?>
<CALLResponse xmlns="urn:ebay:apis:eBLBaseComponents">
   <ActiveList>
        <ItemArray>
            <Item id="2">
              <price currency="EUR">2.0</price>
            </Item>
        </ItemArray>
   </ActiveList>
</CALLResponse>`;

    req.post = sinon.stub().returns(Promise.resolve(response));
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
    it('can upload file', () => {
      const post = sinon.stub().returns(Promise.resolve(apiResponse));
      const request = new XMLRequest('CALL', {},
        {
          ...config,
          file: 'Fake File'
        },
        {...req, post});

      return request.request().then(result => {

        expect(post.args[0][2].headers).to.eql({
          'CALL': 'CALL',
          // @ts-ignore
          'content-type': 'multipart/form-data; boundary=' + request.form.getBoundary()
        })
        expect(result).to.equal(apiResponse);
      });
    })
  })
});
