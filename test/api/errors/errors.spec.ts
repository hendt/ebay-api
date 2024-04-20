import {expect} from 'chai';
import {EbayApiError, EBayApiError, EBayError, extractEBayError, handleEBayError} from '../../../src/errors/index.js';
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
});