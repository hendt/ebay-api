/**
 * Error object for ease of capturing if some service depends on .toJSON() method to log something
 *
 * @ignore
 */
abstract class EBayError extends Error {

    meta: any = null;

    /**
     * returns a JSON representation of the Error
     *
     * @return     {Object}  json representation of the Error
     */
    toJSON() {
        return {
            message: this.message,
            stack: this.stack,
            type: this.constructor.name,
            meta: this.meta || null
        }
    }
}


/**
 * thrown when Request.prototype.run() is called without an oAuth
 *
 * @class      No_Auth_Token (name)
 */
export class NoAuthTokenError extends EBayError {
    constructor(msg = "no oAuth present.  Please invoke `Ebay.prototype.oAuth(<Token>)`.") {
        super(msg)
    }
}

/**
 * thrown when Request.prototype.run() is called without having defined an eBay API call
 */

export class NoCallError extends EBayError {
    constructor(msg = "no eBay API call defined, please invoke one.") {
        super(msg)
    }
}

/**
 * thrown when attempting to load environment variables that don't exist
 */
export class EnvError extends EBayError {
    constructor(key: any) {
        super(`could not find ${key} in process.env`)
    }
}

/**
 * Thrown when an Error occurs on eBay's side.
 */
export class EbayApiError extends EBayError {
    constructor(err: any) {
        let message = '';
        if (err.errorMessage) {
            message = err.errorMessage.error.message;
        } else {
            message = err.LongMessage || err.ShortMessage;
        }
        super(message);
        this.meta = err
    }
}

export class EBayAccessDenied extends EBayError {
    constructor(err: any) {
        super('Access denied');
        this.meta = err.response.data;
    }
}