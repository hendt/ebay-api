import Auth from '../auth/index.js';
import {IEBayApiRequest} from '../request.js';
import {AppConfig} from '../types/index.js';
import Base from './base.js';
import {
  generateContentDigestValue,
  generateSignature,
  generateSignatureInput,
  SignatureComponents
} from './digitalSignature.js';

/**
 * Superclass with Auth container.
 */
export default abstract class Api extends Base {
  public readonly auth: Auth;

  constructor(
    config: AppConfig,
    req?: IEBayApiRequest,
    auth?: Auth
  ) {
    super(config, req);
    this.auth = auth || new Auth(this.config, this.req);
  }

  getDigitalSignatureHeaders(signatureComponents: SignatureComponents, payload: any) {
    if (!this.config.signature) {
      return {};
    }

    const digitalSignatureHeaders = {
      'x-ebay-enforce-signature': true, // enable digital signature validation
      'x-ebay-signature-key': this.config.signature.jwe, // always contains JWE
      ...payload ? {
        'content-digest': generateContentDigestValue(payload, this.config.signature.cipher ?? 'sha256')
      } : {},
      'signature-input': generateSignatureInput(payload)
    };

    return {
      ...digitalSignatureHeaders,
      'signature': generateSignature(digitalSignatureHeaders, this.config.signature.privateKey, signatureComponents, payload)
    };
  }
}
