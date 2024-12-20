import {expect} from 'chai';
import {
  checkEBayTraditionalResponse,
  EbayApiError,
  EBayApiError,
  EBayError,
  extractEBayError,
  handleEBayError
} from '../../../src/errors/index.js';
import {readJSONSync} from '../jsonfile.js';

describe('eBay Errors', () => {
  const errors = readJSONSync('./errors.json', import.meta.url);

  Object.entries(errors).forEach(([key, payload]: [string, any]) => {
    it('maps errors correctly for ' + key, () => {
      const result = {
        response: {
          data: payload
        }
      };

      const {message, description} = extractEBayError(result);
      expect(message).to.equal('Error Message');
      if (description) {
        expect(description).to.equal('description');
      }
    });
  });

  it('Throw correct error chain', () => {
    expect(() => handleEBayError({
      response: {
        data: errors.traditional
      }
    })).to.throw(EBayApiError).with.property('errorCode', 930);

    expect(() => handleEBayError({
      response: {
        data: errors.oauth
      }
    })).to.throw(EbayApiError);
    expect(() => handleEBayError({
      response: {
        data: errors.restful
      }
    })).to.throw(EBayError)
      .with.property('errorCode', 1);
  });

  it('Does not throw if the error is warning', () => {
    expect(() => checkEBayTraditionalResponse({}, {
      'Timestamp': '2021-10-23T19:11:42.335Z',
      'Ack': 'Warning',
      'Errors': {
        'ShortMessage': 'Error Message',
        'LongMessage': 'description',
        'ErrorCode': 930,
        'SeverityCode': 'Error',
        'ErrorClassification': 'RequestError'
      },
      'Version': 1177,
      'Build': 'E1177_CORE_APIMSG_19110890_R1'
    })).to.not.throw();
  })

});