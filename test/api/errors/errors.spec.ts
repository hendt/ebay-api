import {expect} from 'chai';
import {mapEBayError} from '../../../src/errors';
import errors from './errors.json';

describe('eBay Errors', () => {
  errors.errors.forEach((error: any) => {
    it('maps errors correctly', () => {
      const {message, description} = mapEBayError(error);
      expect(message).to.equal('message');
      expect(description).to.equal('description');
    });
  });
});