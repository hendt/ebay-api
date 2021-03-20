// tslint:disable:max-classes-per-file
import debug from 'debug';

const log = debug('ebay:error');

const rawError = Symbol('raw-error');

/**
 * Error object for ease of capturing if some service depends on .toJSON() method to log something
 *
 * @ignore
 */
export class EBayError extends Error {
  public readonly meta;

  constructor(message: string, meta: any = {}) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.meta = meta
  }

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

export class EbayNoCallError extends EBayError {
  constructor(msg = 'No eBay API call defined, please invoke one.') {
    super(msg);
  }
}

/**
 * thrown when attempting to load environment variables that don't exist
 */
export class ApiEnvError extends EBayError {
  constructor(key: any) {
    super(`Could not find ${key} in process.env.`);
  }
}

const extractMessage = (eBayError: any, err: any) => {
  if (eBayError.message) {
    let message = eBayError.message;
    if (eBayError.error_description) {
      message += ': ' + eBayError.error_description
    } else if (eBayError.longMessage) {
      message += ': ' + eBayError.longMessage
    } else if (eBayError.description) {
      message += ': ' + eBayError.description
    }
    return message;
  } else if (err.errorMessage) {
    return err.errorMessage.error.message;
  } else if (err.Errors) {
    return err.Errors.LongMessage || err.Errors.ShortMessage;
  } else {
    return err.LongMessage || err.ShortMessage || err.message;
  }
};

/**
 * Thrown when an Error occurs on eBay's side.
 */
export class EbayApiError extends EBayError {
  constructor(err: any) {
    const {message, meta} = mapEBayError(err);
    super(message, meta);
  }
}

export class EBayAccessDenied extends EbayApiError {
}

export class EBayInvalidGrant extends EbayApiError {
}

export class EBayNotFound extends EbayApiError {
  public static readonly code = 11001;
}

export class EBayInvalidAccessToken extends EbayApiError {
}

export class EBayIAFTokenExpired extends EbayApiError {
  public static readonly code = 21917053;
}

export class EBayTokenRequired extends EbayApiError {
  public static readonly code = 930;
}

export class EBayInvalidScope extends EbayApiError {
}

export const mapEBayError = (ex: any) => {
  let eBayError = {}

  if (ex.response?.data?.error) {
    eBayError = {
      message: ex.response.data.error,
      description: ex.response.data.error_description
    }
  } else if (ex.response?.data?.errors) {
    eBayError = ex.response?.data?.errors[0] ?? {};
  } else if (ex.Errors) {
    eBayError = ex
  }

  const error: any = {
    message: extractMessage(eBayError, ex),
    meta: {
      ...eBayError,
      [rawError]: ex
    }
  }

  if (ex.response) {
    error.meta.res = {
      status: ex.response.status,
      statusText: ex.response.statusText,
      headers: ex.response.headers
    }
  }

  if (ex.request) {
    error.meta.request = {
      url: ex.response.config.url,
      method: ex.request.config.method,
      headers: ex.request.config.headers,
      params: ex.request.config.params
    }
  }

  return error
};

export const handleEBayError = (ex: any) => {
  log('handleEBayError', ex);

  if (ex instanceof EBayError) {
    throw ex
  }

  const {message, meta} = mapEBayError(ex);

  if (meta.domain === 'ACCESS') {
    throw new EBayAccessDenied(ex);
  } else if (meta.message === 'invalid_grant') {
    throw new EBayInvalidGrant(ex);
  } else if (meta.errorId === EBayNotFound.code) {
    throw new EBayNotFound(ex);
  } else if (meta.message === 'invalid_scope') {
    throw new EBayInvalidScope(ex);
  } else if (meta.message === 'Invalid access token') {
    throw new EBayInvalidAccessToken(ex);
  }

  throw new EBayError(message, meta);
}

export const eBayHandleEBayJsonResponse = (data: any) => {
  if (data.Errors?.ErrorCode) {
    switch (data.Errors.ErrorCode) {
      case EBayIAFTokenExpired.code:
        throw new EBayIAFTokenExpired(data);
      case EBayTokenRequired.code:
        throw new EBayTokenRequired(data);
    }

    throw new EbayApiError(data.Errors);
  } else if (data.errorMessage) {
    throw new EbayApiError(data);
  }
}