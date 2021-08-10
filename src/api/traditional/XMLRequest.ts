import debug from 'debug';
import xmlParser, {j2xParser} from 'fast-xml-parser';
import FormData from 'form-data';

import {eBayHandleEBayJsonResponse, EbayNoCallError} from '../../errors';
import {IEBayApiRequest, multipartHeader} from '../../request';
import {Fields} from './fields';

const log = debug('ebay:xml:request');

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
  formData?: IFormData,
  file?: any
};

export type XMLReqConfig = Options & {
  headers: Headers,
  endpoint: string,
  xmlns: string,
  eBayAuthToken?: string | null,
};

export const defaultOptions: Required<Omit<Options, 'file'>> = {
  raw: false,
  parseOptions: defaultXML2JSONParseOptions,
  useIaf: true,
  formData: new FormData(),
  headers: {}
};

export const defaultHeaders = {
  'Content-Type': 'text/xml'
};

export interface IFormData {
  append: (...arg: any[]) => any,
  getHeaders?: () => any
  getBoundary?: () => any
}

/**
 * XML request for making eBay API call.
 */
export default class XMLRequest {
  public readonly form: IFormData;

  private readonly callName: string;
  private readonly fields: Fields;
  private readonly config: XMLReqConfig;
  private readonly req: any;

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
    this.form = this.config.formData ? this.config.formData : new FormData();
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
    if (this.config.file) {
      return {
        ...(typeof this.form.getHeaders === 'function' ? this.form.getHeaders() : multipartHeader),
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
      this.addXml(xml);

      this.addFile();

      const config = this.getRequestConfig();
      log('config', config);
      const response = await this.req.post(this.config.endpoint, this.form, config);

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

  private addXml(xml: string) {
    this.form.append('XML Payload', xml, 'payload.xml');
  }

  private addFile() {
    if (this.config.file) {
      this.form.append('dummy', this.config.file)
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
