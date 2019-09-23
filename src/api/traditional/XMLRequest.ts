// @ts-ignore
import o2x from 'object-to-xml';
import debug from "debug"

import {EbayApiError, NoCallError} from "../../errors"
import Parser from "./Parser"
import range from "../../utils/range"
import req from '../../utils/request';
import {Settings} from "../../types";

const HEADING = '?xml version="1.0" encoding="utf-8"?';
const LIST = "List";
const LISTING = "Listing";
const log = debug("ebay:request");

type Field = {
    [key: string]: any;
}

type Options = {
    raw?: boolean,
    paginate?: boolean,
    page?: number,
    entriesPerPage?: number
}

const defaultOptions: Options = {
    raw: false,
    paginate: false,
    page: 1,
    entriesPerPage: 100
};

/**
 * Immmutable request object for making eBay API verbs
 */
export default class XMLRequest<T> {
    readonly call: T;
    readonly fields: Field;
    readonly globals: Settings;
    readonly endpoint: string;
    readonly xmlns: string;
    readonly headers: object;

    /**
     * creates the new Request object
     *
     * @private
     * @param      {T}  call call
     * @param      {Object}  fields the fields
     * @param      {Settings} globals the global
     * @param      {String}  endpoint
     * @param      {Object}  headers
     * @param      {String}  xmlns
     */
    constructor(call: T, fields: object, globals: Settings, endpoint: string, headers: object, xmlns: string) {
        this.call = call;
        this.fields = {...fields};
        this.globals = globals;
        this.endpoint = endpoint;
        this.xmlns = xmlns;
        this.headers = headers;
    }

    /**
     * returns an array of all the field names that have been added to the Request
     *
     * @private
     * @return     {Array<String>}  the array of names
     */
    private get fieldKeys() {
        return Object.keys(this.fields);
    }

    /**
     * returns the expected name of XML node of a Request
     *
     * @private
     * @return     {String}  { description_of_the_return_value }
     */
    private get responseWrapper() {
        return `${this.call}Response`
    }

    /**
     * returns the auth token for this request
     *
     * @private
     * @return     {String}  eBay Auth token
     */
    private get token() {
        return this.globals.authNAuth
    }

    /**
     * returns the XML structure for the SOAP auth
     *
     * @private
     * @return     {Object}  the SOAP
     */
    private get credentials() {
        return this.token ? {RequesterCredentials: {eBayAuthToken: this.token}} : {};
    }

    /**
     * returns the XML namespace
     *
     * @private
     * @return     {String}  the XML namespace from the verb
     */
    private get xmlnsRequest() {
        return `${this.call}Request xmlns="${this.xmlns}"`
    }

    /**
     * returns the XML document for the request
     *
     * @private
     * @param      {Object}  options  The options
     * @return     {String}           The XML string of the Request
     */
    private xml(options: Options) {
        const payload = this.fields;
        const listKey: string | null = this.listKey();

        if (listKey !== null) {
            payload[listKey] = {
                ...payload[listKey], ...this.pagination(options)
            }
        }

        return o2x({
            [HEADING]: null,
            [this.xmlnsRequest]: {...this.credentials, ...payload}
        })
    }

    /**
     * determines if the Request uses a List and which key it is
     *
     * @private
     * @return     {string|null}   the key that is a List
     */
    private listKey() {
        const fields = this.fieldKeys;
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
    private pagination({page, entriesPerPage}: Options) {
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
        options = {...defaultOptions, ...options};

        if (!this.call) {
            throw new NoCallError();
        }

        try {
            const firstResponse = await this.fetch(options);

            if (options.paginate) {
                return this.schedule(firstResponse, options);
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
    private async fetch(options: Options) {
        const xml = this.xml(options);
        log(xml);
        try {
            const data = await req.post(this.endpoint, xml, {
                headers: {
                    "Content-Type": "text/xml",
                    ...this.headers
                }
            });

            log(data);
            // resolve to raw XML
            if (options.raw) {
                return data;
            }

            const json = Parser.toJSON(data);
            const unwrapp = Parser.unwrap(this.responseWrapper, json);

            return Parser.clean(unwrapp);
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
    private async schedule(first: any, options: Options) {
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
