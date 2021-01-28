import debug from 'debug';
import xmlParser, {j2xParser} from 'fast-xml-parser';

import {EbayApiError, EBayIAFTokenExpired, EBayTokenRequired, NoCallError} from '../../errors';
import {createRequest, ILimitedRequest} from '../../utils/request';
import {Fields} from './fields';

const EXTRANEOUS = [
  '@',
  'Ack',
  'ack',
  'Version',
  'Build',
  'xmlns'
];

const HEADING = '<?xml version="1.0" encoding="utf-8"?>';
const log = debug('ebay:xml:request');

const defaultJSON2XMLOptions = {
  attributeNamePrefix: '@_',
  textNodeName: '#value',
  ignoreAttributes: false,
  cdataTagName: '__cdata',
  cdataPositionChar: '\\c',
  format: false,
  indentBy: '  ',
  supressEmptyNode: false
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
    return /Array$|List$/.test(parentTageName)
  }
};

export type Options = {
  raw?: boolean,
  cleanup?: boolean,
  parseOptions?: object,
  useIaf?: boolean
};

type Headers = {
  [key: string]: string | number | undefined;
};

export type Config = {
  headers: Headers,
  endpoint: string,
  xmlns: string,
  eBayAuthToken?: string | null
};

export const defaultOptions: Required<Options> = {
  raw: false,
  cleanup: true,
  parseOptions: defaultXML2JSONParseOptions,
  useIaf: true
};

/**
 * XML request for making eBay API call.
 */
export default class XMLRequest {
  private readonly callname: string;
  private readonly fields: Fields;
  private readonly config: Config;
  private readonly req: any;

  public static j2x = new j2xParser(defaultJSON2XMLOptions);

  private readonly defaultHeaders = {
    'Content-Type': 'text/xml'
  };

  /**
   * Creates the new Request object
   *
   * @private
   * @param      {string}  callname the callname
   * @param      {Object}  fields the fields
   * @param      {Object} req the request
   * @param      {Config}  config
   */
  constructor(callname: string, fields: Fields, config: Config, req: ILimitedRequest = createRequest()) {
    if (!callname) {
      throw new NoCallError();
    }

    this.callname = callname;
    this.fields = fields || {};
    this.config = config;
    this.req = req;
  }

  /**
   * Delete extraneous fields from json.
   *
   * @param json
   */
  public static clean(json: any) {
    EXTRANEOUS.forEach((key: string) => {
      delete json[key]
    })
  }

  /**
   * converts an XML response to JSON
   *
   * @param      {xml}     xml     The xml
   * @param      {object}     parseOptions     The parse options
   * @return     {JSON}         resolves to a JSON representation of the HTML
   */
  public static toJSON(xml: string, parseOptions: object) {
    return xmlParser.parse(xml, parseOptions);
  }

  /**
   * returns the expected name of XML node of a Request
   *
   * @private
   * @return     {String}  { description_of_the_return_value }
   */
  private get responseWrapper() {
    return `${this.callname}Response`;
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

  /**
   * returns the XML document for the request
   *
   * @private
   * @param      {Fields}  fields  the fields
   * @return     {String}           The XML string of the Request
   */
  public toXML(fields: Fields) {
    return HEADING + XMLRequest.j2x.parse({
      [this.callname + 'Request']: {
        '@_xmlns': this.config.xmlns,
        ...this.credentials,
        ...fields
      }
    });
  }

  /**
   * runs the HTTP Post to eBay
   *
   * @private
   * @param      {Options}   options  The options
   * @return     {Promise}           resolves to the response
   *
   */
  public async fetch(options: Options = defaultOptions) {
    const requiredOptions = {...defaultOptions, ...options};

    const xml = this.toXML(this.fields);
    log('XML', xml);
    try {
      const headers = {
        ...this.defaultHeaders,
        ...this.config.headers
      };

      log('Make XML request: ' + this.config.endpoint, headers);
      const data = await this.req.post(this.config.endpoint, xml, {
        headers
      });

      log('Response', data);

      // resolve to raw XML
      if (options.raw) {
        return data;
      }

      let json = XMLRequest.toJSON(data, requiredOptions.parseOptions);

      log('Response in JSON', json);

      // Unwrap
      if (json[this.responseWrapper]) {
        json = json[this.responseWrapper]
      }

      this.handleEBayJsonError(json);

      // cleans the Ebay response
      if (options.cleanup) {
        XMLRequest.clean(json);
      }

      return json;
    } catch (error) {
      this.handleEBayResponseError(error);
    }
  }

  private handleEBayJsonError(json: any) {
    if (json.Ack === 'Error' || json.Ack === 'Failure' || json.Errors) {
      switch (json.Errors.ErrorCode) {
        case EBayIAFTokenExpired.code:
          throw new EBayIAFTokenExpired(json);
        case EBayTokenRequired.code:
          throw new EBayTokenRequired(json);
      }

      throw new EbayApiError(json.Errors);
    }
  }

  private handleEBayResponseError(error: any) {
    log('eBayResponseError', error);

    if (error.response && error.response.data) {
      const json = XMLRequest.toJSON(error.response.data, defaultXML2JSONParseOptions);
      this.handleEBayJsonError(json);
    } else {
      throw error;
    }
  }
}
