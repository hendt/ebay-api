import debug from 'debug';
import {XMLBuilder, XMLParser} from 'fast-xml-parser';
import {checkEBayTraditionalResponse, EBayNoCallError} from '../../errors/index.js';
import {IEBayApiRequest} from '../../request.js';
import {ApiRequestConfig, Headers} from '../../types/index.js';
import {Fields} from './fields.js';

const log = debug('ebay:xml:request');

export const defaultJSON2XMLOptions = {
  attributeNamePrefix: '@_',
  textNodeName: '#value',
  ignoreAttributes: false,
  cdataTagName: '__cdata',
  cdataPositionChar: '\\c',
  format: false,
  indentBy: '  ',
  suppressEmptyNode: false,
  cdataPropName: '__cdata'
};

export const defaultXML2JSONParseOptions = {
  attributeNamePrefix: '',
  textNodeName: 'value',
  ignoreAttributes: false,
  parseAttributeValue: true,
  parseNodeValue: true,
  numberParseOptions: {
    hex: false,
    leadingZeros: false
  },
  removeNSPrefix: true,
  isArray: (name: string, jpath: string) => {
    return /Array$/.test(jpath.slice(0, -name.length - 1));
  }
};

export type BodyHeaders = {
  body: any,
  headers: Headers
}

export type TraditionalApiConfig = {
  raw?: boolean,
  parseOptions?: object,
  useIaf?: boolean,
  sign?: boolean,
  hook?: (xml: string) => BodyHeaders
} & ApiRequestConfig;

export type XMLReqConfig = TraditionalApiConfig & {
  endpoint: string
  xmlns: string
  eBayAuthToken?: string | null
  digitalSignatureHeaders?: (payload: any) => Headers
};

export const defaultApiConfig: Required<Omit<TraditionalApiConfig, 'hook'>> = {
  raw: false,
  parseOptions: defaultXML2JSONParseOptions,
  useIaf: true,
  sign: false,
  headers: {},
  returnResponse: false
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
  private readonly req: IEBayApiRequest;

  public static j2x = new XMLBuilder(defaultJSON2XMLOptions);

  /**
   * Creates the new Request object
   *
   * @private
   * @param      {string}  callName the callname
   * @param      {Object}  fields the fields
   * @param      {Object} req the request
   * @param      {XMLReqConfig}  config
   */
  constructor(callName: string, fields: Fields | null, config: XMLReqConfig, req: IEBayApiRequest) {
    if (!callName) {
      throw new EBayNoCallError();
    }

    this.callName = callName;
    this.fields = fields || {};
    this.config = {...defaultApiConfig, ...config};
    this.req = req;
  }

  /**
   * returns the expected name of XML node of a Request
   *
   * @private
   * @return     {String}  callnameReponse
   */
  private getResponseWrapper() {
    return `${this.callName}Response`;
  }

  /**
   * returns the XML structure for the SOAP auth
   *
   * @private
   * @return     {Object}  the RequesterCredentials
   */
  private getCredentials() {
    return this.config.eBayAuthToken ? {
      RequesterCredentials: {
        eBayAuthToken: this.config.eBayAuthToken
      }
    } : {};
  }

  private getParseOptions() {
    return {
      ...defaultXML2JSONParseOptions,
      ...this.config.parseOptions
    };
  }

  private getHeaders() {
    return {
      ...defaultHeaders,
      ...this.config.headers,
    };
  }

  /**
   * Converts an XML response to JSON
   *
   * @param      {string}     xml     the xml
   * @return     {JSON}         resolves to a JSON representation of the HTML
   */
  public toJSON(xml: string) {
    const parseOptions = this.getParseOptions();
    log('parseOption', parseOptions);
    return new XMLParser(parseOptions).parse(xml);
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
    return HEADING + XMLRequest.j2x.build({
      [this.callName + 'Request']: {
        '@_xmlns': this.config.xmlns,
        ...this.getCredentials(),
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
      const {body, headers = {}} = this.config.hook?.(xml) ?? {body: xml};

      const config = {
        headers: {
          ...this.getHeaders(),
          ...this.config.digitalSignatureHeaders ? this.config.digitalSignatureHeaders(body) : {},
          ...(headers ? headers : {})
        }
      };
      log('config', config);
      const response = await this.req.post(this.config.endpoint, body, config);

      log('response', response);

      if (this.config.returnResponse) {
        return response;
      }

      const {data} = response;

      // return raw XML
      if (this.config.raw) {
        return data;
      }

      const json = this.xml2JSON(data);

      checkEBayTraditionalResponse(response, json);

      return json;
    } catch (error: any) {
      log('error', error);

      if (error.response?.data) {
        const json = this.toJSON(error.response.data);
        checkEBayTraditionalResponse(error.response, json);
      }

      throw error;
    }
  }

  public xml2JSON(xml: string) {
    const json = this.toJSON(xml);

    // Unwrap
    return json[this.getResponseWrapper()] ?? json;
  }
}
