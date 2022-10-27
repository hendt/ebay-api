import Restful from '../../';

/**
 * This method retrieves the call limit and utilization data for an application.
 */
export default class KeyManagement extends Restful {

  static id = 'KeyManagement';

  get subdomain(): string {
    return 'apiz';
  }

  get basePath(): string {
    return '/developer/key_management/v1';
  }

  /**
   * This method returns the <b>Public Key</b>, <b>Public Key as JWE</b>,
   * and metadata for all keypairs associated with the application key making the call.
   */
  public getSigningKeys() {
    return this.get(`/signing_key`);
  }

  /**
   * his method creates keypairs.
   */
  public createSigningKey(data: { signingKeyCipher: string }) {
    return this.post(`/signing_key`, data);
  }


  /**
   * This method returns the <b>Public Key</b>, <b>Public Key as JWE</b>,
   * and metadata for a specified <code>signingKeyId</code> associated with the application key making the call.
   * @param signingKeyId the signin key
   */
  public getSigningKey(signingKeyId: string) {
    return this.get(`/signing_key/${signingKeyId}`);
  }
}
