// tslint:disable:max-classes-per-file
import debug from 'debug';

const log = debug('ebay:error');

export const rawError = Symbol('raw-error');

/**
 * Error object for ease of capturing if some service depends on .toJSON() method to log something
 *
 * @ignore
 */
export class EBayError extends Error {
  public readonly meta;
  public readonly description: string;

  constructor(message: string, description = '', meta: any = {}) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.description = description;
    this.meta = meta;
  }

  /**
   * returns a JSON representation of the Error
   *
   * @return     {Object}  json representation of the Error
   */
  public toJSON() {
    return {
      message: this.message,
      description: this.description,
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

export const getErrorMessage = (err: any) =>
  err.response?.data?.message
  || err.response?.data?.error?.[0]?.message
  || err.response?.data?.errors?.[0]?.message

  || err.errorMessage?.error?.message
  || err.Errors?.ShortMessage

  || err.message
  || 'eBay API request error';

export const getErrorDescription = (err: any) =>
  err.response?.data?.error_description
  || err.response?.data?.error?.[0]?.longMessage
  || err.response?.data?.errors?.[0]?.longMessage

  || err.longMessage
  || err.Errors?.LongMessage

  || err.response?.statusText
  || '';

/**
 * Thrown when an Error occurs on eBay's side.
 */
export class EbayApiError extends EBayError {
  constructor(err: any) {
    const {message, description, meta} = mapEBayError(err);
    super(message, description, meta);
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

export class EBayIAFTokenInvalid extends EbayApiError {
  public static readonly code = 21916984;
}

export class EBayTokenRequired extends EbayApiError {
  public static readonly code = 930;
}

export class EBayInvalidScope extends EbayApiError {
}

export const mapEBayError = (err: any) => {
  if (!err) {
    return {};
  }

  let eBayError: any = {};

  if (err.response?.data) {
    const data = err.response.data;
    if (Array.isArray(data.error)) {
      eBayError = data.error[0] ?? data;
    } else if (Array.isArray(data.errors)) {
      eBayError = data.errors[0] ?? data;
    } else if (typeof data.error === 'string') {
      eBayError = {
        message: data.error,
        description: data.error_description || ''
      };
    } else {
      eBayError = data;
    }
  } else if (err.Errors) {
    eBayError = err;
  }

  const error: any = {
    message: eBayError.message || getErrorMessage(err),
    description: eBayError.description || getErrorDescription(err),
    meta: {
      ...eBayError,
      [rawError]: err
    }
  };

  if (err.response) {
    error.meta.res = {
      status: err.response.status,
      statusText: err.response.statusText,
      headers: err.response.headers,
      data: err.response.data ?? {}
    };
  }

  if (err.request && err.config) {
    error.meta.req = {
      url: err.config.url,
      method: err.config.method,
      headers: err.config.headers,
      params: err.config.params
    };
  }

  return error;
};

export const handleEBayError = (err: any) => {
  log('handleEBayError', err);

  if (err instanceof EBayError) {
    throw err;
  }

  const {message, meta, description} = mapEBayError(err);

  if (meta.domain === 'ACCESS') {
    throw new EBayAccessDenied(err);
  } else if (meta.message === 'invalid_grant') {
    throw new EBayInvalidGrant(err);
  } else if (meta.errorId === EBayNotFound.code) {
    throw new EBayNotFound(err);
  } else if (meta.message === 'invalid_scope') {
    throw new EBayInvalidScope(err);
  } else if (meta.message === 'Invalid access token') {
    throw new EBayInvalidAccessToken(err);
  }

  throw new EBayError(message, description, meta);
};

export const checkEBayResponse = (data: any) => {
  if (data.Ack === 'Failure') {
    if (data.Errors?.ErrorCode) {
      switch (data.Errors.ErrorCode) {
        case EBayIAFTokenExpired.code:
          throw new EBayIAFTokenExpired(data);
        case EBayIAFTokenInvalid.code:
          throw new EBayIAFTokenInvalid(data);
        case EBayTokenRequired.code:
          throw new EBayTokenRequired(data);
      }
    }

    throw new EbayApiError(data);
  } else if (data.errorMessage) {
    throw new EbayApiError(data);
  }
};