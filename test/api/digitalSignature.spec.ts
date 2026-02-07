import {expect} from 'chai';
import 'mocha';
// @ts-ignore
import sinon from 'sinon';
import {generateContentDigestValue, generateSignature, generateSignatureInput} from '../../src/api/digitalSignature.js';

const privateKey = `
-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIJ+DYvh6SEqVTm50DFtMDoQikTmiCqirVv9mWG9qfSnF
-----END PRIVATE KEY-----`;

describe('Digital Signature', () => {
  it('should be able to generate \'signature-input\' header when request has payload', () => {
    const signatureInput = generateSignatureInput({}, 123);
    expect(signatureInput).to.eql('sig1=("content-digest" "x-ebay-signature-key" "@method" "@path" "@authority");created=123');
  });

  it('should be able to generate \'signature-input\' header when request has no payload', () => {
    const signatureInput = generateSignatureInput(null, 123);
    expect(signatureInput).to.eql('sig1=("x-ebay-signature-key" "@method" "@path" "@authority");created=123');
  });

  it('should be able to generate \'Signature\' header', () => {
    const payload = '{"hello": "world"}';
    const contentDigest = generateContentDigestValue(payload);
    expect(contentDigest).to.eql('sha-256=:X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=:');
    const signature = generateSignature({
      'content-digest': contentDigest,
      'signature-input': 'sig1=("content-digest" "x-ebay-signature-key" "@method" "@path" "@authority");created=1663459378',
      'x-ebay-signature-key': 'eyJhbGciOiJBMjU2R0NNS1ciLCJlbmMiOiJBMjU2R0NNIiwiemlwIjoiREVGIiwiaXYiOiJvSzFwdXJNVHQtci14VUwzIiwidGFnIjoiTjB4WjI4ZklZckFmYkd5UWFrTnpjZyJ9.AYdKU7ObIc7Z764OrlKpwUViK8Rphxl0xMP9v2_o9mI.1DbZiSQNRK6pLeIw.Yzp3IDV8RM_h_lMAnwGpMA4DXbaDdmqAh-65kO9xyDgzHD6s0kY3p-yO6oPR9kEcAbjGXIULeQKWVYzbfHKwXTY09Npj_mNuO5yxgZtWnL55uIgP2HL1So2dKkZRK0eyPa6DEXJT71lPtwZtpIGyq9R5h6s3kGMbqA.m4t_MX4VnlXJGx1X_zZ-KQ'
    }, privateKey, {
      method: 'POST',
      authority: 'localhost:8080',
      path: '/test'
    }, payload, 1663459378);
    expect(signature).to.eql('sig1=:gkk7dqudw21DFHDVBoRUWe/F6/2hTEmWRFDBxiN6COD4PjozXziiDFML1nFHu+0UcMXC/niltxzABjnugu4DCA==:');
  });

  it('should throw an error if content-digest is not in the header', () => {
    expect(() => generateSignature({}, privateKey, {
      method: 'POST',
      authority: 'localhost:8080',
      path: '/test'
    }, {}, 1663459378)).to.throw(/content-digest/);
  });

  it('should throw an error pseudo header is not known', () => {
    expect(() => generateSignature({}, privateKey, {
      method: 'POST',
      authority: 'localhost:8080',
      path: '/test'
    }, {}, 1663459378)).to.throw(/content-digest/);
  });
});
