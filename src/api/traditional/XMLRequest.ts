import debug from 'debug';
import xmlParser, {j2xParser} from 'fast-xml-parser';

import {eBayHandleEBayJsonResponse, EbayNoCallError} from '../../errors';
import {IEBayApiRequest} from '../../request';
import {Fields} from './fields';

const HEADING = '<?xml version="1.0" encoding="utf-8"?>';
const log = debug('ebay:xml:request');

export interface IFormData {
  append: (name: string, value: string, filename?: string) => void
  getHeaders?: () => Headers
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

export type Options = {
  raw?: boolean,
  parseOptions?: object,
  useIaf?: boolean,
  headers?: Headers,
  formData?: IFormData
};

export type XMLReqConfig = Options & {
  headers: Headers,
  endpoint: string,
  xmlns: string,
  eBayAuthToken?: string | null,
};

export const defaultOptions: Required<Omit<Options, 'formData'>> = {
  raw: false,
  parseOptions: defaultXML2JSONParseOptions,
  useIaf: true,
  headers: {}
};

/**
 * XML request for making eBay API call.
 */
export default class XMLRequest {
  private readonly callName: string;
  private readonly fields: Fields;
  private readonly config: XMLReqConfig;
  private readonly req: any;

  public static j2x = new j2xParser(defaultJSON2XMLOptions);

  private readonly defaultHeaders = {
    'Content-Type': 'text/xml'
  };

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

  get requestConfig() {
    let headers;
    if (this.config.formData) {
      headers = typeof this.config.formData.getHeaders === 'function' ? this.config.formData.getHeaders() : {
        'content-type': 'multipart/form-data'
      }
    } else {
      headers = this.defaultHeaders
    }

    return {
      headers: {
        ...headers,
        ...this.config.headers,
      }
    }
  }

  get parseOptions() {
    return {
      ...defaultXML2JSONParseOptions,
      ...this.config.parseOptions
    }
  }

  getData(xml: string) {
    if (this.config.formData) {
      this.config.formData.append('XML Payload', xml, 'payload.xml');
      return this.config.formData
    }

    return xml
  }

  /**
   * converts an XML response to JSON
   *
   * @param      {string}     xml     The xml
   * @param      {object}     parseOptions     The parse options
   * @return     {JSON}         resolves to a JSON representation of the HTML
   */
  public static toJSON(xml: string, parseOptions: object) {
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
    log('JSON2XML:parseOptions', defaultJSON2XMLOptions);
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
    log('XML:config', this.config);
    const xml = this.toXML(this.fields);
    log('XML:xml', xml);

    try {
      const data = this.getData(xml);
      const config = this.requestConfig;

      log('XML:request:' + this.config.endpoint, config);
      const response = await this.req.post(this.config.endpoint, data, config);

      log('XML:response', response);

      // resolve to raw XML
      if (this.config.raw) {
        return response;
      }

      log('XML:parseOption', this.parseOptions);
      let json = XMLRequest.toJSON(response, this.parseOptions);

      log('XML:JSON', json);

      // Unwrap
      if (json[this.responseWrapper]) {
        json = json[this.responseWrapper]
      }

      eBayHandleEBayJsonResponse(json);

      return json;
    } catch (error) {
      log('XML:error', error);

      if (error.response?.data) {
        const data = XMLRequest.toJSON(error.response.data, this.parseOptions);
        eBayHandleEBayJsonResponse(data);
      }

      throw error;
    }
  }
}
