import Restful from '../../';

/**
 * The eBay  Notification API allows third-party developers and applications to process eBay notifications and verify the integrity of the notification message payload.
 */
export default class Notification extends Restful {

  static id = 'Notification';

  get basePath(): string {
    return '/commerce/notification/v1';
  }

  /**
   * This method allows users to retrieve a public key using a specified key ID.
   *
   * @param publicKeyId The unique key ID that is used to retrieve the public key
   */
  public getPublicKey(publicKeyId: string) {
    publicKeyId = encodeURIComponent(publicKeyId)
    return this.get(`/public_key/${publicKeyId}`);
  }
}
