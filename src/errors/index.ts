import debug from 'debug';

const log = debug('ebay:error');

export const rawError = Symbol('raw-error');

/**
 * Error codes:
 * Shopping API: https://developer.ebay.com/devzone/shopping/docs/callref/Errors/ErrorMessages.html
 * Trading API: https://developer.ebay.com/devzone/xml/docs/reference/ebay/errors/errormessages.htm
 * RESTful: https://developer.ebay.com/devzone/xml/docs/reference/ebay/errors/errormessages.htm
 * PostOrder: https://developer.ebay.com/Devzone/post-order/ErrorMessages.html#ErrorsByNumber
 */

/**
 * Error object for capturing Errors thrown from this api lib.
 */
export class EBayError extends Error {
  public readonly description: string;
  public readonly meta?: EBayErrorMeta | Record<string, never>;

  constructor(message: string, description = '', meta: EBayErrorMeta | Record<string, never> = {}) {
    super(message);
    this.name = this.constructor.name;
    this.description = description;
    this.meta = meta;

    // Ensure the prototype chain is correctly set up
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EBayNoCallError extends EBayError {
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

/**
 * Thrown when an Error occurs on eBay's side.
 */
export class EbayApiError extends EBayError {
  public readonly errorCode: number | undefined;
  public readonly meta?: EBayErrorMeta;
  public readonly firstError?: EBayFirstError

  constructor(message: string,
    description?: string,
    meta?: EBayErrorMeta,
    errorCode?: number,
    firstError?: EBayFirstError) {
    super(message, description, meta);
    this.errorCode = errorCode;
    this.firstError = firstError;
  }
}

// Keep backwards compatibility.
export class EBayApiError extends EbayApiError {
}

export class EBayAccessDenied extends EBayApiError {
}

export class EBayInvalidGrant extends EBayApiError {
}

export class EBayNotFound extends EBayApiError {
  public static readonly code = 11001;
}

export class EBayInvalidAccessToken extends EBayApiError {
}

export class EBayIAFTokenExpired extends EBayApiError {
  public static readonly code = 21917053;
}

export class EBayAuthTokenIsInvalid extends EBayApiError {
  public static readonly code = 931;
}

export class EBayAuthTokenIsHardExpired extends EBayApiError {
  public static readonly code = 932;
}

export class EBayIAFTokenInvalid extends EBayApiError {
  public static readonly code = 21916984;
}

export class EBayTokenRequired extends EBayApiError {
  public static readonly code = 930;
}

export class EBayInvalidScope extends EBayApiError {
}

export type EBayTraditionalError = {
  ShortMessage: string
  LongMessage: string
  ErrorCode: number
  SeverityCode: string
  ErrorClassification: string
}

export type EBayTraditionalErrorResponse = {
  Timestamp: string
  Ack: string
  Errors: EBayTraditionalError | EBayTraditionalError[]
  Version: number
  Build: string
}

export type EBayErrorParameter = {
  name: string
  value: string
}

export type EBayRestfulError = {
  message: string
  errorId: number
  domain: string
  severity: string
  category: string,
  parameter?: EBayErrorParameter[]
  longMessage: string,
  inputRefIds?: any[],
  httpStatusCode: number
}

export type EBayRestfulErrorResponse = {
  errors: EBayRestfulError[]
}

export type EBaySimpleError = {
  message: string
  description?: string
}

export type EBayPostOrderErrorResponse = {
  errorMessage: {
    error: EBayRestfulError[] | EBayRestfulError
  }
}

export type EBayOAuthErrorResponse = {
  error: string
  error_description?: string
}

export type EBayApiErrorResponse =
  string
  | EBayPostOrderErrorResponse
  | EBayRestfulErrorResponse
  | EBayTraditionalErrorResponse
  | EBayOAuthErrorResponse;

export type ApiRequestResult = {
  response: {
    data?: EBayApiErrorResponse
    status?: number
    statusText?: string
    headers?: Record<string, string>
  }

  config?: {
    url: string
    method: string
    headers?: Record<string, string>
    params?: any
  }
}

export type ErrorCommonMeta = {
  res?: {
    data: any
    status?: number
    statusText?: string
    headers?: Record<string, string>
  }

  req?: {
    url: string
    method: string
    headers?: Record<string, string>
    params?: any
  }

  [rawError]: any
}

export type EBayFirstError =
  EBayTraditionalError
  | EBayRestfulError
  | EBayOAuthErrorResponse
  | EBaySimpleError

export type EBayErrorResponse =
  EBayTraditionalErrorResponse
  | EBayRestfulError
  | EBayOAuthErrorResponse
  | EBaySimpleError

export type EBayErrorMeta = EBayErrorResponse & ErrorCommonMeta;

export type EBayErrorBag = {
  message: string,
  description?: string
  errorCode?: number
  meta: EBayErrorMeta,
  firstError?: EBayFirstError
}

/**
 * Extract the error if it wrapper in array.
 * @param data
 */
function getEBayError(data?: EBayApiErrorResponse): EBayErrorResponse {
  if (!data) {
    return {
      message: 'eBay API Error',
      description: 'No data is set in response result.'
    };
  }

  if (typeof data === 'string') {
    return {
      message: data
    };
  }

  // Traditional
  if ('Errors' in data) {
    return data;
  }

  // OAuth Error
  if ('error' in data && typeof data.error === 'string') {
    return {
      message: data.error,
      description: data.error_description || ''
    };
  }

  // RESTful
  if ('errors' in data && Array.isArray(data.errors)) {
    return data.errors[0];
  }

  // PostOrder https://developer.ebay.com/Devzone/post-order/ErrorResponse.html#ErrorResponse
  // OR SOAP https://developer.ebay.com/devzone/finding/callref/types/ErrorMessage.html
  if ('errorMessage' in data) {
    return Array.isArray(data.errorMessage?.error) ? data.errorMessage.error[0] : data.errorMessage.error;
  }

  return {
    message: 'Unknown eBay API Error',
    description: 'This error response is not known. You should investigate the "meta.res.data" for more information.'
  };
}

/**
 * See https://developer.ebay.com/api-docs/static/handling-error-messages.html
 * @param eBayError
 */
const getErrorMessage = (eBayError: EBayErrorResponse) => {
  if ('message' in eBayError) {
    return eBayError.message;
  } else if ('Errors' in eBayError) {
    return Array.isArray(eBayError.Errors) ? eBayError.Errors[0].ShortMessage : eBayError.Errors.ShortMessage;
  }

  return 'eBay API request error';
};

const getErrorDescription = (eBayError: EBayErrorResponse, response: any) => {
  if ('description' in eBayError) {
    // RESTful
    return eBayError.description;
  } else if ('Errors' in eBayError) {
    // Traditional
    return Array.isArray(eBayError.Errors) ? eBayError.Errors[0].LongMessage : eBayError.Errors.LongMessage;
  } else if ('longMessage' in eBayError) {
    return eBayError.longMessage;
  }

  return (response?.status !== 200 ? response?.statusText : '') || '';
};


const getErrorCode = (eBayError: EBayErrorResponse): number | undefined => {
  if ('errorId' in eBayError) {
    // RESTful & Post Order
    return eBayError.errorId;
  } else if ('Errors' in eBayError) {
    return Array.isArray(eBayError.Errors) ? eBayError.Errors[0].ErrorCode : eBayError.Errors.ErrorCode;
  }

  return undefined;
};

export const extractEBayError = (result: ApiRequestResult, data?: EBayApiErrorResponse): EBayErrorBag => {
  const eBayError = getEBayError(data || result.response?.data);

  const meta: EBayErrorMeta = {
    ...eBayError,
    [rawError]: result
  };

  const firstError: EBayFirstError = 'Errors' in eBayError
    ? Array.isArray(eBayError.Errors) ? eBayError.Errors[0]
      : eBayError.Errors : eBayError;

  if (result?.response) {
    meta.res = {
      status: result.response.status,
      statusText: result.response.statusText,
      headers: result.response.headers,
      data: result.response.data ?? {}
    };
  }

  if (result?.config) {
    meta.req = {
      url: result.config.url,
      method: result.config.method,
      headers: result.config.headers,
      params: result.config.params
    };
  }

  return {
    message: getErrorMessage(eBayError),
    description: getErrorDescription(eBayError, result?.response),
    errorCode: getErrorCode(eBayError),
    meta,
    firstError
  };
};

export const handleEBayError = (error: any) => {
  log('handleEBayError', error);

  if (error instanceof EBayError || !error.response) {
    throw error;
  } else if (typeof error !== 'object') {
    throw new EBayError(error);
  }

  const {
    message,
    meta,
    description,
    errorCode,
    firstError
  } = extractEBayError(error);

  if ('domain' in meta && meta.domain === 'ACCESS') {
    throw new EBayAccessDenied(message, description, meta, errorCode, firstError);
  } else if ('message' in meta && meta.message === 'invalid_grant') {
    throw new EBayInvalidGrant(message, description, meta, errorCode, firstError);
  } else if ('message' in meta && meta.message === 'invalid_scope') {
    throw new EBayInvalidScope(message, description, meta, errorCode, firstError);
  } else if ('message' in meta && meta.message === 'Invalid access token') {
    throw new EBayInvalidAccessToken(message, description, meta, errorCode, firstError);
  } else if (errorCode === EBayNotFound.code) {
    throw new EBayNotFound(message, description, meta, errorCode, firstError);
  }

  throw new EBayApiError(message, description, meta, errorCode, firstError);
};

/**
 * Check if "data" is an error.
 *
 * @param apiResponse the api response
 * @param data the data as JSON
 */
export const checkEBayTraditionalResponse = (apiResponse: any, data: any) => {
  if (!data) {
    log('checkEBayTraditionalResponse: No data found in response.');
    return;
  }

  // Check if it's an error
  if (!('Errors' in data) && !('errorMessage' in data)) {
    return;
  }

  // Do not treat warnings as errors
  if ('Errors' in data && data.Ack !== 'Failure') {
    log(`checkEBayTraditionalResponse: eBay API returned ${data.Ack}`);
    return;
  }

  const {
    message,
    meta,
    description,
    errorCode,
    firstError
  } = extractEBayError(apiResponse, data as EBayApiErrorResponse);

  if (typeof errorCode === 'undefined') {
    // Can happen on restful request
    throw new EBayApiError(message, description, meta, errorCode, firstError);
  }

  switch (errorCode) {
  case EBayIAFTokenExpired.code:
    throw new EBayIAFTokenExpired(message, description, meta, errorCode, firstError);
  case EBayIAFTokenInvalid.code:
  case 1.32: // Shopping API: Invalid token. Please specify a valid token as HTTP header.
    throw new EBayIAFTokenInvalid(message, description, meta, errorCode, firstError);
  case EBayTokenRequired.code:
    throw new EBayTokenRequired(message, description, meta, errorCode, firstError);
  case EBayAuthTokenIsHardExpired.code:
    throw new EBayAuthTokenIsHardExpired(message, description, meta, errorCode, firstError);
  case EBayAuthTokenIsInvalid.code:
    throw new EBayAuthTokenIsInvalid(message, description, meta, errorCode, firstError);
  }

  throw new EBayApiError(message, description, meta, errorCode, firstError);
};