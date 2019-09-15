// @ts-ignore
import {xml2json} from "xml2json-light"
import Extraneous from "./definitions/extraneous"
import dateNodes from "./definitions/nodes.date"
import numericNodes from "./definitions/nodes.numeric"
import {Ebay_Api_Error} from "../../errors";

/**
 * A collection of pure methods that are used to parse eBay API responses
 * should generally be bound to a Request via:
 *   `Function.prototype.bind`
 *   `Promise.prototype.bind`
 *
 */
export default class Parser {

    /**
     * converts an XML response to JSON
     *
     * @param      {xml}     xml     The xml
     * @return     {JSON}         resolves to a JSON representation of the HTML
     */
    static toJSON(xml: string) {
        return xml2json(xml);
    }

    /**
     * unwraps a TradingCallsType Response from eBay
     * must be verbed within the context of an {Ebay.Response}
     *
     * @param      {Call}    verb    The verb
     * @return     {Object}          The unwrapped verb
     */
    static unwrap(responseWrapper: string, json: any) {
        return Parser.flatten(json[responseWrapper])
    }

    /**
     * Casts text representations to Javascript representations
     *
     * @param      {String}       value   The value
     * @return     {Date|Number}          The cast value
     */
    static cast(value: any, key: any) {

        if (value === "true") return true;

        if (value === "false") return false;

        if (key) {
            if (typeof key === 'string' && dateNodes[key.toLowerCase()]) {
                return new Date(value)
            }

            if (!isNaN(value) && numericNodes[key.toLowerCase()]) {
                return Number(value)
            }
        }

        return value
    }

    /**
     * recursively flattens `value` keys in the XML -> JSON conversion
     * we can do this because we don't need to worry about XML attributes from eBay
     *
     * @param      {Object}  o       the object output from the XML parser
     * @param      {Object}  key     the key
     * @return     {Object}          the flattened output
     */
    static flatten(o: any, key?: any): any {

        if (o.value) {
            return Parser.cast(o.value, key)
        }

        if (Array.isArray(o)) {
            return o.map(Parser.flatten)
        }

        if (typeof o !== "object") {
            return Parser.cast(o, key)
        }

        return Object.keys(o).reduce((deflated: any, key) => {
            deflated[key] = Parser.flatten(o[key], key);
            return deflated
        }, {})
    }

    /**
     * flattens the eBay pagination object to be easier to deal with
     *
     * @param      {Object}  obj    the JSON representation of a Response
     * @return     {Object}         the friendly pagination extended Response
     */
    static parsePagination(obj: any) {
        if (!obj.PaginationResult) return {};

        const p = obj.PaginationResult;
        delete obj.PaginationResult;

        return {
            pagination: {
                pages: Number(p.TotalNumberOfPages) || 0,
                length: Number(p.TotalNumberOfEntries) || 0
            }
        }
    }

    /**
     * cleans the Ebay response up
     *
     * @param      {Object}  res     The response object
     * @return     {Object}  res     The cleaned response
     */
    static clean(res: any) {
        if (res.Ack === "Error" || res.Ack === "Failure") {
            throw new Ebay_Api_Error(res.Errors)
        }

        // Drop extraneous keys
        res = Object.keys(res)
            .filter(key => !~Extraneous.indexOf(key))
            .reduce((acc: any, key) => {
                acc[key] = res[key];
                return acc;
            }, {});

        return Parser.fold(res)
    }

    /**
     * recursively folds a response from eBay into something reasonable
     *
     * @param      {Object}  res     The resource
     * @return     {Object}          The folded response
     */
    static fold(res: any) {
        return Object.keys(res).reduce(function (cleaned: any, key) {
            const value = res[key];
            if (key.match(/List/)) {
                return {...cleaned, ...Parser.parsePagination(value), ...Parser.getList(value)}
            }

            if (key.match(/Array/)) {
                return {...cleaned, ...Parser.getList(value)}
            }

            cleaned[key] = value;
            return cleaned
        }, {})
    }

    /**
     * Gets the List element from an eBay response
     *
     * @param      {<type>}  list    The list
     * @return     {Object}          The list.
     */
    static getList(list: any) {
        const parent = Parser.getMatchingKey(list, "Array");
        const wrapper = Object.keys(parent)[0];
        const entries = parent[wrapper] || [];
        // Ensure we always have an Iterable interface for things that should be iterable
        return {results: Array.isArray(entries) ? entries : [entries]}
    }

    /**
     * Gets the matching key.
     *
     * @param      {<type>}  obj     The object
     * @param      {<type>}  substr  The substr to match
     * @return     {<type>}          The matching key.
     */
    static getMatchingKey(obj: any, substr: any) {
        const keys = Object.keys(obj);
        while (keys.length) {
            const key = keys.pop();
            if (key && ~key.indexOf(substr)) return obj[key];
        }
        return obj
    }

}
