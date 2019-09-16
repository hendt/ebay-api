/**
 * Error object for ease of capturing if some service depends on .toJSON() method to log something
 *
 * @ignore
 */
abstract class ResponseError extends Error {

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
export class No_Auth_Token_Error extends ResponseError {
    constructor(msg = "no oAuth present.  Please invoke `Ebay.prototype.oAuth(<Token>)`.") {
        super(msg)
    }
}

/**
 * thrown when Request.prototype.run() is called without having defined an eBay API call
 */

export class No_Call_Error extends ResponseError {
    constructor(msg = "no eBay API call defined, please invoke one.") {
        super(msg)
    }
}

/**
 * thrown when attempting to change a setting that cannot be changed
 *
 * @param {String} setting    the setting that was attempted
 */

export class Setting_Error extends ResponseError {
    constructor(setting: any) {
        super(`cannot configure "state.${setting}" at this time, are you trying to define a Global on a Request?`)
    }
}

/**
 * thrown when attempting to load environment variables that don't exist
 */
export class Env_Error extends ResponseError {
    constructor(key: any) {
        super(`could not find ${key} in process.env`)
    }
}


/**
 * Thrown when an Error occurs on eBay's side.
 */
export class Ebay_Api_Error extends ResponseError {
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
