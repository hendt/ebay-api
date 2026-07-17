import {
  CreateDocumentFromUrlRequest,
  CreateDocumentRequest,
  CreateImageFromUrlRequest,
  CreateVideoRequest
} from '../../../../types/index.js';
import {operations} from '../../../../types/restful/specs/commerce_media_v1_beta_oas3.js';
import Restful, {OpenApi} from '../../index.js';

/**
 * The Media API allows sellers to create, upload, and fetch videos.
 */
export default class Media extends Restful implements OpenApi<operations> {


  static id = 'Media';

  get basePath(): string {
    return '/commerce/media/v1_beta';
  }

  get subdomain(): string {
    return 'apim';
  }

  /**
   * This method creates a video. When using this method, specify the <b>title</b>, <b>size</b>, and <b>classification</b> of the video to be created.
   * @param body the CreateVideoRequest
   */
  async createVideo(body?: CreateVideoRequest) {
    return this.post('/video', body);
  }

  /**
   * This method retrieves a video's metadata and content given a specified <b>video ID</b>.
   * @param videoId The unique identifier of the video to be retrieved.
   */
  async getVideo(videoId: string) {
    videoId = encodeURIComponent(videoId);
    return this.get(`/video/${videoId}`);
  };

  /**
   * This method associates the specified file with the specified <b>video ID</b> and uploads the input file.
   *
   * @param videoId The unique identifier of the video to be uploaded.
   * @param body The request payload for this method is the input stream for the video source. The input source must be an .mp4 file of the type MPEG-4 Part 10 or Advanced Video Coding (MPEG-4 AVC).
   */
  async uploadVideo(videoId: string, body?: any) {
    videoId = encodeURIComponent(videoId);
    return this.post(`/video/${videoId}/upload`, body);
  }

  /**
   * This method creates an image from an uploaded file.
   * @param body The request payload for this method is the input stream for the image source.
   */
  async createImageFromFile(body?: any) {
    return this.post('/image/create_image_from_file', body);
  }

  /**
   * This method creates an image from the specified URL.
   * @param body the CreateImageFromUrlRequest
   */
  async createImageFromUrl(body?: CreateImageFromUrlRequest) {
    return this.post('/image/create_image_from_url', body);
  }

  /**
   * This method retrieves an image's metadata and content given a specified image ID.
   * @param imageId The unique identifier of the image to be retrieved.
   */
  async getImage(imageId: string) {
    imageId = encodeURIComponent(imageId);
    return this.get(`/image/${imageId}`);
  }

  /**
   * This method creates a document. When using this method, specify the document type and languages of the document to be created.
   * @param body the CreateDocumentRequest
   */
  async createDocument(body?: CreateDocumentRequest) {
    return this.post('/document', body);
  }

  /**
   * This method creates a document from the specified URL.
   * @param body the CreateDocumentFromUrlRequest
   */
  async createDocumentFromUrl(body?: CreateDocumentFromUrlRequest) {
    return this.post('/document/create_document_from_url', body);
  }

  /**
   * This method retrieves a document's metadata and content given a specified document ID.
   * @param documentId The unique identifier of the document to be retrieved.
   */
  async getDocument(documentId: string) {
    documentId = encodeURIComponent(documentId);
    return this.get(`/document/${documentId}`);
  }

  /**
   * This method associates the specified file with the specified document ID and uploads the input file.
   * @param documentId The unique identifier of the document to be uploaded.
   * @param body The request payload for this method is the input stream for the document source.
   */
  async uploadDocument(documentId: string, body?: any) {
    documentId = encodeURIComponent(documentId);
    return this.post(`/document/${documentId}/upload`, body);
  }

  /**
   * This method downloads a Post-Order document given a specified document ID.
   * @param documentId The unique identifier of the Post-Order document to be downloaded.
   */
  async downloadPostOrderDocument(documentId: string) {
    documentId = encodeURIComponent(documentId);
    return this.get(`/post_order/document/${documentId}`);
  }

  /**
   * This method removes a Post-Order document given a specified document ID.
   * @param documentId The unique identifier of the Post-Order document to be removed.
   */
  async removePostOrderDocument(documentId: string) {
    documentId = encodeURIComponent(documentId);
    return this.delete(`/post_order/document/${documentId}`);
  }

  /**
   * This method uploads a Post-Order document.
   * @param body The request payload for this method is the input stream for the Post-Order document source.
   */
  async uploadPostOrderDocument(body?: any) {
    return this.post('/post_order/document', body);
  }
}
