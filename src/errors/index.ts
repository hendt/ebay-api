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
 * thrown when Request.prototype.run() is called without an oAuth2
 *
 * @class      No_Auth_Token (name)
 */
export class NoAuthTokenError extends EBayError {
    constructor(msg = "no oAuth2 present.  Please invoke `Ebay.prototype.oAuth2(<Token>)`.") {
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

export class EBayUnauthorized extends EBayError {
    constructor(err: any) {
        super('Unauthorized after refreshing token');
        this.meta = err.response.data;
    }
}

export class EBayInvalidScope extends EBayError {
    constructor(err: any) {
        super(err.response.data.error_description);
        this.meta = err.response.data;
    }
}

export const getEBayError = (e: any) => {
    if (e.response && e.response.data) {
        const data = e.response.data;
        if (data.error) {
            return {
                message: data.error,
                description: data.error_description
            }
        }
        return data.errors[0] ? data.errors[0] : null;
    }

    return null;
};