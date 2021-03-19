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
 * thrown when Request.prototype.run() is called without having defined an eBay API call
 */

export class NoCallError extends EBayError {
    constructor(msg = 'No eBay API call defined, please invoke one.') {
        super(msg);
    }
}

/**
 * thrown when attempting to load environment variables that don't exist
 */
export class EnvError extends EBayError {
    constructor(key: any) {
        super(`Could not find ${key} in process.env.`);
    }
}

/**
 * Thrown when an Error occurs on eBay's side.
 */
export class EbayApiError extends EBayError {
    public readonly name: string;

    constructor(err: any, name?: string) {
        let message = '';
        const resError = getEBayResponseError(err);
        if (resError) {
            message = resError.message + ': ' + resError.error_description;
        } else if (err.errorMessage) {
            message = err.errorMessage.error.message;
        } else if (err.Errors) {
            message = err.Errors.LongMessage || err.Errors.ShortMessage;
        } else {
            message = err.LongMessage || err.ShortMessage;
        }

        super(message);
        this.meta = err;
        this.name = name || this.constructor.name;
    }
}

export class EBayAccessDenied extends EBayError {
    constructor(err: any) {
        super('Access denied');
        this.meta = err.response?.data;
    }
}

export class EBayInvalidGrant extends EBayError {
    constructor(err: any) {
        super(err.response.data.error_description);
        this.meta = err.response.data;
        this.name = 'EBayInvalidGrant';
    }
}

export class EBayNotFound extends EBayError {
    public static readonly code = 11001;

    constructor(err: any) {
        super(err.message);
        this.meta = err.response.data;
    }
}

export class EBayUnauthorizedAfterRefresh extends EBayError {
    constructor(err: any) {
        super('Unauthorized after refreshing token.');
        this.meta = err.response.data;
    }
}

export class EBayIAFTokenExpired extends EbayApiError {
    public static readonly code = 21917053;
}

export class EBayTokenRequired extends EbayApiError {
    public static readonly code = 930;
}

export class EBayInvalidScope extends EbayApiError {}

export const getEBayResponseError = (e: any) => {
    if (e.response?.data?.error) {
        return {
            message: e.response.data.error,
            description: e.response.data.error_description
        }
    }

    if (e.response?.data?.errors) {
        return e.response?.data?.errors[0] ?? null;
    }

    return null;
};
