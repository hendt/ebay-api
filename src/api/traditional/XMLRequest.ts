import {j2xParser} from 'fast-xml-parser';
import debug from 'debug';

import {EbayApiError, EBayIAFTokenExpired, EBayTokenRequired, NoCallError} from '../../errors';
import Parser from './Parser';
import request, {LimitedRequest} from '../../utils/request';
import {Fields} from './fields';

const HEADING = '<?xml version="1.0" encoding="utf-8"?>';
const log = debug('ebay:xml:request');

const defaultXmlOptions = {
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    ignoreAttributes: false,
    cdataTagName: '__cdata', //default is false
    cdataPositionChar: '\\c',
    format: false,
    indentBy: '  ',
    supressEmptyNode: false
};

const parser = new j2xParser(defaultXmlOptions);

const defaultParseOptions = {
    textNodeName: 'value'
};

export type Options = {
    raw?: boolean,
    cleanup?: boolean,
    parseOptions?: object
}

type Headers = {
    [key: string]: string | number | undefined;
}

export type Config = {
    headers: Headers,
    endpoint: string,
    xmlns: string,
    eBayAuthToken?: string | null
};

const defaultOptions: Options = {
    raw: false,
    cleanup: true,
    parseOptions: defaultParseOptions
};

/**
 * XML request for making eBay API call.
 */
export default class XMLRequest<T> {
    readonly callname: string;
    readonly fields: Fields;
    readonly config: Config;
    private readonly req: any;

    readonly defaultHeaders = {
        'Content-Type': 'text/xml'
    };

    /**
     * creates the new Request object
     *
     * @private
     * @param      {string}  callname the callname
     * @param      {Object}  fields the fields
     * @param      {Object} req the request
     * @param      {Config}  config
     */
    constructor(callname: string, fields: Fields, config: Config, req: LimitedRequest = request) {
        this.callname = callname;
        this.fields = fields || {};
        this.config = config;
        this.req = req;
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
     * @param      {Object}  options  The options
     * @return     {String}           The XML string of the Request
     */
    public toXML(fields: Fields, options: Required<Options>) {
        return HEADING + parser.parse({
            [this.callname + 'Request']: {
                '@_xmlns': this.config.xmlns,
                ...this.credentials,
                ...fields
            }
        });
    }

    /**
     * runs the current Request
     *
     * @param      {<type>}  options  The options
     * @return     {<type>}  { description_of_the_return_value }
     */
    async run(options: Options = defaultOptions) {
        if (!this.callname) {
            throw new NoCallError();
        }

        const requiredOptions = {
            ...defaultOptions,
            ...options
        } as Required<Options>;

        try {
            return await this.fetch(requiredOptions);
        } catch (error) {
            log(error);
            throw error;
        }
    }

    /**
     * runs the HTTP Post to eBay
     *
     * @private
     * @param      {Options}   options  The options
     * @return     {Promise}           resolves to the response
     *
     */
    private async fetch(options: Required<Options>) {
        const xml = this.toXML(this.fields, options);
        log('XML', xml);
        try {
            const headers = {
                ...this.defaultHeaders,
                ...this.config.headers
            };

            log('Make request: ' + this.config.endpoint, headers);
            const data = await this.req.post(this.config.endpoint, xml, {
                headers
            });

            log('Response', data);

            // resolve to raw XML
            if (options.raw) {
                return data;
            }

            let json = Parser.toJSON(data, options.parseOptions);

            // Unwrap
            if (json[this.responseWrapper]) {
                json = Parser.flatten(json[this.responseWrapper]);
            }

            this.handleEBayJsonError(json);

            // cleans the Ebay response
            if (options.cleanup) {
                return Parser.clean(json);
            }

            return json;
        } catch (error) {
            log(error);
            this.handleEBayResponseError(error);
            throw error;
        }
    }

    handleEBayJsonError(json: any) {
        if (json.Ack === 'Error' || json.Ack === 'Failure') {
            if (json.Errors) {
                switch (json.Errors.ErrorCode) {
                    case EBayIAFTokenExpired.code: throw new EBayIAFTokenExpired(json);
                    case EBayTokenRequired.code: throw new EBayTokenRequired(json);
                }
            }

            throw new EbayApiError(json.Errors);
        }
    }

    handleEBayResponseError(error: any) {
        if (error.response && error.response.data) {
            const json = Parser.toJSON(error.response.data, defaultParseOptions);
            this.handleEBayJsonError(json);
        }
    }
}
