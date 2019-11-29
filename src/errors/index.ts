// tslint:disable:max-classes-per-file
/**
 * Error object for ease of capturing if some service depends on .toJSON() method to log something
 *
 * @ignore
 */
abstract class EBayError extends Error {

    public meta: any = null;

    /**
     * returns a JSON representation of the Error
     *
     * @return     {Object}  json representation of the Error
     */
    public toJSON() {
        return {
            message: this.message,
            stack: this.stack,
            type: this.constructor.name,
            meta: this.meta || null
        };
    }
}

/**
 * thrown when Request.prototype.run() is called without an oAuth2
 *
 * @class      No_Auth_Token (name)
 */
export class NoAuthTokenError extends EBayError {
    constructor(msg = 'no oAuth2 present.  Please invoke `Ebay.prototype.oAuth2(<Token>)`.') {
        super(msg);
    }
}

/**
 * thrown when Request.prototype.run() is called without having defined an eBay API call
 */

export class NoCallError extends EBayError {
    constructor(msg = 'no eBay API call defined, please invoke one.') {
        super(msg);
    }
}

/**
 * thrown when attempting to load environment variables that don't exist
 */
export class EnvError extends EBayError {
    constructor(key: any) {
        super(`could not find ${key} in process.env`);
    }
}

/**
 * Thrown when an Error occurs on eBay's side.
 */
export class EbayApiError extends EBayError {
    constructor(err: any, name = 'EbayApiError') {
        let message = '';
        const resError = getEBayError(err);
        if (resError) {
            message = resError.message;
        } else if (err.errorMessage) {
            message = err.errorMessage.error.message;
        } else {
            message = err.LongMessage || err.ShortMessage;
        }

        super(message);
        this.meta = err;
        this.name = name;
    }
}

export class EBayAccessDenied extends EBayError {
    constructor(err: any) {
        super('Access denied');
        this.meta = err.response.data;
        this.name = 'EBayAccessDenied';
    }
}

export class EBayNotFound extends EBayError {
    constructor(err: any) {
        super(err.message);
        this.meta = err.response.data;
        this.name = 'EBayEBayNotFound';
    }
}

export class EBayUnauthorizedAfterRefresh extends EBayError {
    constructor(err: any) {
        super('Unauthorized after refreshing token.');
        this.meta = err.response.data;
        this.name = 'EBayUnauthorized';
    }
}

export class EBayIAFTokenExpired extends EbayApiError {
    public static code = 21917053;

    constructor(err: any) {
        super(err, 'EBayIAFTokenExpired');
    }
}

export class EBayTokenRequired extends EbayApiError {
    public static code = 930;

    constructor(err: any) {
        super(err, 'EBayTokenRequired');
    }
}

export class EBayInvalidScope extends EBayError {
    constructor(err: any) {
        super(err.response.data.error_description);
        this.meta = err.response.data;
        this.name = 'EBayInvalidScope';
    }
}

export const getEBayError = (e: any) => {
    if (e.response && e.response.data) {
        const data = e.response.data;
        if (data.error) {
            return {
                message: data.error,
                description: data.error_description
            };
        }
        return data.errors && data.errors[0] ? data.errors[0] : null;
    }

    return null;
};
