// @ts-ignore
import o2x from 'object-to-xml';
import debug from "debug"

import {EbayApiError, NoCallError} from "../../errors"
import Parser from "./Parser"
import range from "../../utils/range"
import req from '../../utils/request';
import {Fields} from "./fields";
import OAuth from "../oAuth";

const HEADING = '?xml version="1.0" encoding="utf-8"?';
const LIST = "List";
const LISTING = "Listing";
const log = debug("ebay:request");

export type Options = {
    raw?: boolean,
    paginate?: boolean,
    page?: number,
    entriesPerPage?: number,
    cleanup?: boolean
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
    paginate: false,
    page: 1,
    entriesPerPage: 100,
    cleanup: true
};

/**
 * Immmutable request object for making eBay API verbs
 */
export default class XMLRequest<T> {
    readonly callname: string;
    readonly fields: Fields;
    readonly oAuth: OAuth;
    readonly config: Config;
    readonly defaultHeaders = {
        "Content-Type": "text/xml"
    };

    /**
     * creates the new Request object
     *
     * @private
     * @param      {string}  callname the callname
     * @param      {Object}  fields the fields
     * @param      {OAuth} oAuth the oAuth
     * @param      {Config}  config
     */
    constructor(callname: string, fields: Fields, oAuth: OAuth, config: Config) {
        this.callname = callname;
        this.fields = fields;
        this.oAuth = oAuth;
        this.config = config;
    }

    /**
     * returns the expected name of XML node of a Request
     *
     * @private
     * @return     {String}  { description_of_the_return_value }
     */
    private get responseWrapper() {
        return `${this.callname}Response`
    }

    /**
     * returns the auth token for this request
     *
     * @private
     * @return     {String}  eBay Auth token
     */
    private get token() {
        return this.oAuth.authNAuth
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
     * returns the XML namespace
     *
     * @private
     * @return     {String}  the XML namespace from the verb
     */
    private get xmlnsRequest() {
        return `${this.callname}Request xmlns="${this.config.xmlns}"`
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
            const value = payload[listKey] as object;
            payload[listKey] = {
                ...value,
                ...this.pagination(options)
            }
        }

        return o2x({
            [HEADING]: null,
            [this.xmlnsRequest]: {
                ...this.credentials,
                ...payload
            }
        })
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
                return field
            }
        }
        return null;
    }

    /**
     * generates a pagination Object
     *
     * @param      {Options}  the options
     * @return     {Object}          The pagination representation
     */
    private pagination({page, entriesPerPage}: Required<Options>) {
        return {
            Pagination: {
                PageNumber: page,
                EntriesPerPage: entriesPerPage
            }
        }
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
            const firstResponse = await this.fetch(requiredOptions);

            if (options.paginate) {
                return this.schedule(firstResponse, requiredOptions);
            }

            return firstResponse
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

            const json = Parser.toJSON(data);
            const unwrap = Parser.unwrap(this.responseWrapper, json);

            // cleans the Ebay response
            if (options.cleanup) {
                return Parser.clean(unwrap);
            }

            return unwrap;

        } catch (error) {
            log(error);
            if (error.response && error.response.data) {
                const json = Parser.toJSON(error.response.data);
                throw new EbayApiError(json);
            }

            throw error;
        }
    }

    /**
     * schedules pagination requests
     *
     * @private
     * @param      {Object}   first   The first response from the API
     * @param      {Options}   options   The options
     * @return     {Promise}          resolves to the first resposne or the concatenated Responses
     */
    private async schedule(first: any, options: Required<Options>) {
        // we aren't handling pagination
        if (!first.pagination || first.pagination.pages < 2) {
            return first;
        }

        log(`beginning pagination for [2..${first.pagination.pages}]`);

        const results = await Promise.all(range(2, first.pagination.pages).map(page => this.fetch({
            ...options,
            page
        })));

        return results.reduce((all, result) => {
            all.results = all.results.concat(result.results);
            return all
        }, first)
    }
}
