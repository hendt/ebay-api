import {expect} from 'chai';
import {mapEBayError} from '../../../src/errors/index.js';
import {readJSONSync} from '../jsonfile.js';

describe('eBay Errors', () => {
  const errors = readJSONSync('./errors.json', import.meta.url);

  errors.errors.forEach((error: any) => {
    it('maps errors correctly', () => {
      const {message, description} = mapEBayError(error);
      expect(message).to.equal('message');
      expect(description).to.equal('description');
    });
  });
});