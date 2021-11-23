import Restful from '../../';
import {
  CreateSubscriptionRequest,
  DestinationRequest, NotificationConfig,
  NotificationParams,
  UpdateSubscriptionRequest
} from '../../../../types';

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
    publicKeyId = encodeURIComponent(publicKeyId);
    return this.get(`/public_key/${publicKeyId}`);
  }

  /**
   * This method allows applications to retrieve details for the specified topic.
   *
   * @param topicId The ID of the topic for which to retrieve the details.
   */
  public getTopic(topicId: string) {
    topicId = encodeURIComponent(topicId);
    return this.get(`/topic/${topicId}`);
  }

  /**
   * This method returns a paginated collection of all supported topics, along with the details for the topics.
   *
   * @param limit The maximum number of items to return per page from the result set.
   * @param continuationToken The token used to access the next set of results.
   */
  public getTopics({limit, continuationToken: continuation_token}: NotificationParams) {
    return this.get(`/topic`, {
      params: {
        limit,
        continuation_token
      }
    });
  }

  /**
   * This method allows applications to retrieve a list of all subscriptions.
   *
   * @param limit The number of items, from the result set, returned in a single page.
   * @param continuation_token The continuation token for the next set of results.
   */
  public getSubscriptions({limit, continuationToken: continuation_token}: NotificationParams) {
    return this.get(`/subscription`, {
      params: {
        limit,
        continuation_token
      }
    });
  }

  /**
   * This method allows applications to retrieve a list of all subscriptions.
   *
   * @param body The create subscription request.
   */
  public createSubscription(body: CreateSubscriptionRequest) {
    return this.post(`/subscription`, body);
  }

  /**
   * This method allows applications to retrieve subscription details for the specified subscription.
   *
   * @param subscriptionId The unique identifier for the subscription.
   */
  public getSubscription(subscriptionId: string) {
    subscriptionId = encodeURIComponent(subscriptionId);
    return this.get(`/subscription/${subscriptionId}`);
  }

  /**
   * This method allows applications to retrieve subscription details for the specified subscription.
   *
   * @param subscriptionId The unique identifier for the subscription.
   * @param body The update subscription request.
   */
  public updateSubscription(subscriptionId: string, body: UpdateSubscriptionRequest) {
    subscriptionId = encodeURIComponent(subscriptionId);
    return this.put(`/subscription/${subscriptionId}`, body);
  }

  /**
   * This method allows applications to delete a subscription.
   *
   * @param subscriptionId The unique identifier for the subscription.
   */
  public deleteSubscription(subscriptionId: string) {
    subscriptionId = encodeURIComponent(subscriptionId);
    return this.delete(`/subscription/${subscriptionId}`);
  }

  /**
   * This method allows applications to enable a disabled subscription.
   *
   * @param subscriptionId The unique identifier for the subscription.
   */
  public enableSubscription(subscriptionId: string) {
    subscriptionId = encodeURIComponent(subscriptionId);
    return this.post(`/subscription/${subscriptionId}/enable`);
  }

  /**
   * This method disables a subscription, which prevents the subscription from providing notifications.
   * @param subscriptionId The unique identifier for the subscription.
   */
  public disableSubscription(subscriptionId: string) {
    subscriptionId = encodeURIComponent(subscriptionId);
    return this.post(`/subscription/${subscriptionId}/disable`);
  }

  /**
   * This method triggers a mocked test payload that includes a notification ID, publish date, and so on.
   *
   * @param subscriptionId The unique identifier for the subscription.
   */
  public test(subscriptionId: string) {
    subscriptionId = encodeURIComponent(subscriptionId);
    return this.post(`/subscription/${subscriptionId}/test`);
  }

  /**
   * This method allows applications to retrieve a paginated collection of destination resources and related details.
   * @param subscriptionId The unique identifier for the subscription.
   */
  public getDestinations({limit, continuationToken: continuation_token}: NotificationParams) {
    return this.get(`/destination`, {
      params: {
        limit,
        continuation_token
      }
    });
  }

  /**
   * This method allows applications to create a destination.
   *
   * @param body The create destination request.
   */
  public createDestination(body: DestinationRequest) {
    return this.post(`/destination`, body);
  }

  /**
   * This method allows applications to fetch the details for a destination.
   *
   * @param destinationId The unique identifier for the destination.
   */
  public getDestination(destinationId: string) {
    destinationId = encodeURIComponent(destinationId);
    return this.get(`/destination/${destinationId}`);
  }

  /**
   * This method allows applications to update a destination.
   *
   * @param destinationId The unique identifier for the destination.
   * @param body The create subscription request.
   */
  public updateDestination(destinationId: string, body: DestinationRequest) {
    destinationId = encodeURIComponent(destinationId);
    return this.put(`/destination/${destinationId}`, body);
  }

  /**
   * his method provides applications a way to delete a destination.
   *
   * @param destinationId The unique identifier for the destination.
   */
  public deleteDestination(destinationId: string) {
    destinationId = encodeURIComponent(destinationId);
    return this.delete(`/destination/${destinationId}`);
  }

  /**
   * This method allows applications to retrieve a previously created configuration.
   */
  public getConfig() {
    return this.get(`/config`);
  }

  /**
   * This method allows applications to create a new configuration or update an existing configuration.
   *
   * @param body The configurations for this application.
   */
  public updateConfig(body: NotificationConfig) {
    return this.put(`/config`, body);
  }
}
