import debug from 'debug';
import xmlParser, {j2xParser} from 'fast-xml-parser';

import {eBayHandleEBayJsonResponse, EbayNoCallError} from '../../errors';
import {IEBayApiRequest, multipartHeader} from '../../request';
import {Fields} from './fields';

const log = debug('ebay:xml:request');

export interface IFormData {
  append: (name: string, value: string | Buffer, filename?: string) => void
  getHeaders?: () => Headers,
}

const defaultJSON2XMLOptions = {
  attributeNamePrefix: '@_',
  textNodeName: '#value',
  ignoreAttributes: false,
  cdataTagName: '__cdata',
  cdataPositionChar: '\\c',
  format: false,
  indentBy: '  ',
  suppressEmptyNode: false
};

export const defaultXML2JSONParseOptions = {
  attributeNamePrefix: '',
  textNodeName: 'value',
  ignoreAttributes: false,
  parseAttributeValue: true,
  parseNodeValue: true,
  ignoreNameSpace: true,
  parseTrueNumberOnly: true,
  arrayMode: (_: string, parentTageName: string) => {
    return /Array$/.test(parentTageName)
  }
};

type Headers = {
  [key: string]: string | number | undefined;
};

export type Multipart = {
  formData?: IFormData,
  file?: any
}

export type Options = {
  raw?: boolean,
  parseOptions?: object,
  useIaf?: boolean,
  headers?: Headers,
  multipart?: Multipart
};

export type XMLReqConfig = Options & {
  headers: Headers,
  endpoint: string,
  xmlns: string,
  eBayAuthToken?: string | null,
};

export const defaultOptions: Required<Omit<Options, 'multipart'>> = {
  raw: false,
  parseOptions: defaultXML2JSONParseOptions,
  useIaf: true,
  headers: {}
};

export const defaultHeaders = {
  'Content-Type': 'text/xml'
};

/**
 * XML request for making eBay API call.
 */
export default class XMLRequest {
  private readonly callName: string;
  private readonly fields: Fields;
  private readonly config: XMLReqConfig;
  private readonly req: any;
  private readonly _form: IFormData | null = null;

  public static j2x = new j2xParser(defaultJSON2XMLOptions);

  /**
   * Creates the new Request object
   *
   * @private
   * @param      {string}  callName the callname
   * @param      {Object}  fields the fields
   * @param      {Object} req the request
   * @param      {XMLReqConfig}  config
   */
  constructor(callName: string, fields: Fields, config: XMLReqConfig, req: IEBayApiRequest) {
    if (!callName) {
      throw new EbayNoCallError();
    }

    this.callName = callName;
    this.fields = fields || {};
    this.config = {...defaultOptions, ...config};
    this.req = req;

    if (this.config.multipart?.formData) {
      this._form = this.config.multipart.formData;
    }
  }

  /**
   * returns the expected name of XML node of a Request
   *
   * @private
   * @return     {String}  { description_of_the_return_value }
   */
  private get responseWrapper() {
    return `${this.callName}Response`;
  }

  /**
   * returns the XML structure for the SOAP auth
   *
   * @private
   * @return     {Object}  the SOAP
   */
  private get credentials() {
    return this.config.eBayAuthToken ? {
      RequesterCredentials: {
        eBayAuthToken: this.config.eBayAuthToken
      }
    } : {};
  }

  public getRequestConfig() {
    return {
      headers: {
        ...this.getHeaders(),
        ...this.config.headers,
      }
    }
  }

  public getHeaders() {
    if (this._form) {
      return {
        ...(typeof this._form.getHeaders === 'function' ? this._form.getHeaders() : multipartHeader),
      }
    }

    return defaultHeaders
  }

  get parseOptions() {
    return {
      ...defaultXML2JSONParseOptions,
      ...this.config.parseOptions
    }
  }

  public getData(xml: string) {
    if (this._form) {
      this._form.append('XML Payload', xml, 'payload.xml');
      return this._form
    }

    return xml
  }

  /**
   * converts an XML response to JSON
   *
   * @param      {string}     xml     The xml
   * @return     {JSON}         resolves to a JSON representation of the HTML
   */
  public toJSON(xml: string) {
    const parseOptions =  this.parseOptions;
    log('parseOption', parseOptions);
    return xmlParser.parse(xml, parseOptions);
  }

  /**
   * returns the XML document for the request
   *
   * @private
   * @param      {Fields}  fields  the fields
   * @return     {String}           The XML string of the Request
   */
  public toXML(fields: Fields) {
    const HEADING = '<?xml version="1.0" encoding="utf-8"?>';
    return HEADING + XMLRequest.j2x.parse({
      [this.callName + 'Request']: {
        '@_xmlns': this.config.xmlns,
        ...this.credentials,
        ...fields
      }
    });
  }

  /**
   * Call the xml api endpoint.
   *
   * @private
   * @return     {Promise}           resolves to the response
   *
   */
  public async request() {
    const xml = this.toXML(this.fields);
    log('xml', xml);

    try {
      const data = this.getData(xml);

      this.addFile();

      const config = this.getRequestConfig();
      log('config', config);
      const response = await this.req.post(this.config.endpoint, data, config);

      log('response', response);

      // resolve to raw XML
      if (this.config.raw) {
        return response;
      }

      const json = this.xml2JSON(response);

      eBayHandleEBayJsonResponse(json);

      return json;
    } catch (error) {
      log('error', error);

      if (error.response?.data) {
        const data = this.toJSON(error.response.data);
        eBayHandleEBayJsonResponse(data);
      }

      throw error;
    }
  }

  private addFile() {
    if (this.config.multipart?.file && this._form) {
      this._form.append('dummy', this.config.multipart?.file)
      log('added file');
    }
  }

  public xml2JSON(xml: string) {
    const json = this.toJSON(xml);

    // Unwrap
    if (json[this.responseWrapper]) {
      return json[this.responseWrapper]
    }

    return json;
  }
}
