import parser from 'fast-xml-parser';
import {dateTimeNodes, numericNodes} from './nodes';

const EXTRANEOUS = [
    '@',
    'Ack',
    'ack',
    'Version',
    'Build',
    'xmlns'
];

/**
 * XML response parser.
 */
export default class Parser {

    /**
     * converts an XML response to JSON
     *
     * @param      {xml}     xml     The xml
     * @param      {object}     parseOptions     The parse options
     * @return     {JSON}         resolves to a JSON representation of the HTML
     */
    public static toJSON(xml: string, parseOptions: object) {
        return parser.parse(xml, parseOptions);
    }

    /**
     * Casts text representations to Javascript representations
     *
     * @param      {String}       value   The value
     * @param      {String}       key   The key
     * @return     {Date|Number}          The cast value
     */
    public static cast(value: any, key: any) {
        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        if (typeof key === 'string') {
            if (dateTimeNodes[key.toLowerCase()]) {
                return new Date(value);
            }

            if (!isNaN(value) && numericNodes[key.toLowerCase()]) {
                return Number(value);
            }
        }

        return value;
    }

    /**
     * recursively flattens `value` keys in the XML -> JSON conversion
     * we can do this because we don't need to worry about XML attributes from eBay
     *
     * @param      {Object}  o       the object output from the XML parser
     * @param      {Object}  key     the key
     * @return     {Object}          the flattened output
     */
    public static flatten(o: any, key?: any): any {
        if (o && o.value) {
            return Parser.cast(o.value, key);
        }

        if (Array.isArray(o)) {
            return o.map(Parser.flatten);
        }

        if (typeof o !== 'object') {
            return Parser.cast(o, key);
        }

        return Object.keys(o).reduce((deflated: any, fKey) => {
            deflated[fKey] = Parser.flatten(o[fKey], fKey);
            return deflated;
        }, {});
    }

    /**
     * flattens the eBay pagination object to be easier to deal with
     *
     * @param      {Object}  obj    the JSON representation of a Response
     * @return     {Object}         the friendly pagination extended Response
     */
    public static parsePagination(obj: any) {
        if (!obj.PaginationResult) {
            return {};
        }

        const p = obj.PaginationResult;
        delete obj.PaginationResult;

        return {
            pagination: {
                pages: Number(p.TotalNumberOfPages) || 0,
                length: Number(p.TotalNumberOfEntries) || 0
            }
        };
    }

    /**
     * cleans the Ebay response
     *
     * @param      {Object}  res     The response object
     * @return     {Object}  res     The cleaned response
     */
    public static clean(res: any) {
        // Drop extraneous keys
        res = Object.keys(res)
            .filter(key => !~EXTRANEOUS.indexOf(key))
            .reduce((acc: any, key) => {
                acc[key] = res[key];
                return acc;
            }, {});

        return Parser.fold(res);
    }

    /**
     * recursively folds a response from eBay into something reasonable
     *
     * @param      {Object}  res     The resource
     * @return     {Object}          The folded response
     */
    public static fold(res: any) {
        return Object.keys(res).reduce((cleaned: any, key) => {
            const value = res[key];
            if (key.match(/List/)) {
                return {
                    ...cleaned,
                    ...Parser.parsePagination(value),
                    ...Parser.getList(value)
                };
            }

            if (key.match(/Array/)) {
                return {
                    ...cleaned,
                    ...Parser.getList(value)
                };
            }

            cleaned[key] = value;
            return cleaned;
        }, {});
    }

    /**
     * Gets the List element from an eBay response
     *
     * @param      {<type>}  list    The list
     * @return     {Object}          The list.
     */
    public static getList(list: any) {
        const parent = Parser.getMatchingKey(list, 'Array');
        const wrapper = Object.keys(parent)[0];
        const entries = parent[wrapper] || [];
        return {
            results: [].concat(entries)
        };
    }

    /**
     * Gets the matching key.
     *
     * @param      {<type>}  obj     The object
     * @param      {<type>}  substr  The substr to match
     * @return     {<type>}          The matching key.
     */
    public static getMatchingKey(obj: any, substr: any) {
        const keys = Object.keys(obj);
        while (keys.length) {
            const key = keys.pop();
            if (key && ~key.indexOf(substr)) {
                return obj[key];
            }
        }
        return obj;
    }
}
