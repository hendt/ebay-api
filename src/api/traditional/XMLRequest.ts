import debug from 'debug';
import xmlParser, {j2xParser} from 'fast-xml-parser';

import {checkEBayResponse, EbayNoCallError} from '../../errors';
import {IEBayApiRequest} from '../../request';
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
    return /Array$/.test(parentTageName);
  }
};

type Headers = {
  [key: string]: string | number | undefined;
};

export type BodyHeaders = {
  body: any,
  headers?: Headers
}

export type Options = {
  raw?: boolean,
  parseOptions?: object,
  useIaf?: boolean,
  headers?: Headers,
  hook?: (xml: string) => BodyHeaders
};

export type XMLReqConfig = Options & {
  headers: Headers,
  endpoint: string,
  xmlns: string,
  eBayAuthToken?: string | null,
};

export const defaultOptions: Required<Omit<Options, 'hook'>> = {
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
          ...(headers ? headers : {})
        }
      };
      log('config', config);
      const response = await this.req.post(this.config.endpoint, body, config);

      log('response', response);

      // resolve to raw XML
      if (this.config.raw) {
        return response;
      }

      const json = this.xml2JSON(response);

      checkEBayResponse(json);

      return json;
    } catch (error: any) {
      log('error', error);

      if (error.response?.data) {
        const json = this.toJSON(error.response.data);
        checkEBayResponse(json);
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
