import { operations } from '../../../../types/restful/specs/commerce_message_v1_oas3.js';
import { BulkUpdateConversationRequest, CommerceMessageSendMessageRequest, UpdateConversationRequest } from '../../../../types/restfulTypes.js';
import Restful, { OpenApi } from '../../index.js';

/**
 * The eBay Message API allows users to send messages, retrieve conversations, and modify the status of conversations;
 *
 * https://api.ebay.com/oauth/api_scope/commerce.message
 */
export default class Message extends Restful implements OpenApi<operations> {

  static id = 'Message';

  get basePath(): string {
    return '/commerce/message/v1';
  }

  /**
   * This method can be used to retrieve messages within a specific conversation.
   *
   * @param limit The maximum number of entries that can be returned on each page of the paginated response.
   * @param offset The number of reports to skip in the result set before returning
   *        the first entry in the paginated response.
   * @param conversationStatus This query parameter specifies the status of
   *        the conversations being retrieved. Only conversations in the specified status will be returned.
   * @param conversationType This query parameter specifies the type of the conversations being retrieved.
   *        Only conversations of the specified type will be returned.
   * @param referenceId This query parameter specifies the unique identifier of the
   *        reference (specified by the corresponding reference_type value) associated with the conversation.
   *        Only conversations associated with the specified reference ID will be returned.
   * @param startTime This query parameter specifies the start time (in ISO 8601 format)
   *        for which to start retrieving conversations.
   * @param endTime This query parameter specifies the end time (in ISO 8601 format)
   *        for which to stop retrieving conversations.
   * @param otherPartyUsername This query parameter specifies the user name (login name)
   *        of an eBay user for which to retrieve conversations.
   */
  public getConversations({
    limit,
    offset,
    conversationStatus,
    conversationType,
    referenceId,
    referenceType,
    startTime,
    endTime,
    otherPartyUsername
  }: {
    limit?: number,
    offset?: number,
    conversationStatus?: string,
    conversationType?: string,
    referenceId?: string,
    referenceType?: string,
    startTime?: string,
    endTime?: string,
    otherPartyUsername?:string,
  } = {}) {
    return this.get('/conversation', {
      params: {
        limit,
        offset,
        conversation_status: conversationStatus,
        conversation_type: conversationType,
        reference_id: referenceId,
        reference_type: referenceType,
        start_time: startTime,
        end_time: endTime,
        other_party_username: otherPartyUsername
      }
    });
  }

  /**
   * This method can be used to retrieve messages within a specific conversation.
   *
   * @param conversationId This path parameters specifies the unique identifier of the conversation that is to be retrieved.
   * @param conversationType This query parameter specifies the type of the conversation being retrieved.
   * @param limit The maximum number of entries that can be returned on each page of the paginated response.
   * @param offset The number of reports to skip in the result set before returning the first entry in the paginated response.
   */
  public getConversation(conversationId: string,
    {
      conversationType,
      limit,
      offset
    }: {
    conversationType: string,
    limit?: number,
    offset?: number,
  }) {
    return this.get(`/conversation/${conversationId}`, {
      params: {
        conversation_type: conversationType,
        limit,
        offset
      }
    });
  }

  /**
   * This method can be used to update the conversationStatus or the read status of a specified conversation.
   *
   * @param body UpdateConversationRequest
   */
  public updateConversation(body: UpdateConversationRequest) {
    return this.post('/update_conversation', body);
  }

  /**
   * This method can be used to update the conversationStatus of up to 10 conversations.
   *
   * @param body BulkUpdateConversationRequest
   */
  public bulkUpdateConversation(body: BulkUpdateConversationRequest) {
    return this.post('/bulk_update_conversation', body);
  }

  /**
   * This method can be used to start a conversation with another user or send a message in an existing conversation
   * with another user based on the information provided in the request.
   *
   * @param body CommerceMessageSendMessageRequest
   */
  public sendMessage(body: CommerceMessageSendMessageRequest) {
    return this.post('/send_message', body);
  };
}
