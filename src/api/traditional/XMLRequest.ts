import {j2xParser} from 'fast-xml-parser';
import debug from 'debug';

import {EbayApiError, NoCallError} from '../../errors';
import Parser from './Parser';
import req from '../../utils/request';
import {Fields} from './fields';
import OAuth2 from '../оAuth2';

const HEADING = '?xml version="1.0" encoding="utf-8"?';
const LIST = 'List';
const LISTING = 'Listing';
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
    headers: (callname: string) => Headers,
    endpoint: string,
    xmlns: string
};

const defaultOptions: Options = {
    raw: false,
    cleanup: true,
    parseOptions: defaultParseOptions
};

/**
 * Immmutable request object for making eBay API verbs
 */
export default class XMLRequest<T> {
    readonly callname: string;
    readonly fields: Fields;
    readonly oAuth2: OAuth2;
    readonly config: Config;
    readonly defaultHeaders = {
        'Content-Type': 'text/xml'
    };

    /**
     * creates the new Request object
     *
     * @private
     * @param      {string}  callname the callname
     * @param      {Object}  fields the fields
     * @param      {OAuth2} oAuth the oAuth2
     * @param      {Config}  config
     */
    constructor(callname: string, fields: Fields, oAuth: OAuth2, config: Config) {
        this.callname = callname;
        this.fields = fields;
        this.oAuth2 = oAuth;
        this.config = config;
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
     * returns the auth token for this request
     *
     * @private
     * @return     {String}  eBay Auth token
     */
    private get token() {
        if (this.oAuth2.authNAuth) {
            return this.oAuth2.authNAuth;
        }

        return this.oAuth2.accessToken;
    }

    /**
     * returns the XML structure for the SOAP auth
     *
     * @private
     * @return     {Object}  the SOAP
     */
    private get credentials() {
        return this.token ? {
            RequesterCredentials: {
                eBayAuthToken: this.token
            }
        } : {};
    }

    /**
     * returns the XML document for the request
     *
     * @private
     * @param      {Object}  options  The options
     * @return     {String}           The XML string of the Request
     */
    private xml(options: Required<Options>) {
        const payload = this.fields;
        const listKey: string | null = this.listKey();

        if (listKey !== null) {
            const value = payload[listKey] as any;
            payload[listKey] = {
                ...value
            };
        }

        // xmlns="${this.config.xmlns}"

        return parser.parse({
            [HEADING]: null,
            [this.callname + 'Request']: {
                '@_xmlns': this.config.xmlns,
                ...this.credentials,
                ...payload
            }
        });
    }

    /**
     * determines if the Request uses a List and which key it is
     *
     * @private
     * @return     {string|null}   the key that is a List
     */
    private listKey() {
        const fields = Object.keys(this.fields);
        while (fields.length) {
            const field = fields.pop();

            if (!field || ~field.indexOf(LISTING)) {
                continue;
            }
            if (~field.indexOf(LIST)) {
                return field;
            }
        }
        return null;
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
        const xml = this.xml(options);
        log(xml);
        try {
            const headers = {
                ...this.defaultHeaders,
                ...this.config.headers(this.callname)
            };

            log('Make request: ' + this.config.endpoint, headers);
            const data = await req.post(this.config.endpoint, xml, {
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

            if (json.Ack === 'Error' || json.Ack === 'Failure') {
                throw new EbayApiError(json.Errors);
            }

            // cleans the Ebay response
            if (options.cleanup) {
                return Parser.clean(json);
            }

            return json;
        } catch (error) {
            log(error);
            if (error.response && error.response.data) {
                const json = Parser.toJSON(error.response.data, options.parseOptions);
                throw new EbayApiError(json);
            }

            throw error;
        }
    }
}
