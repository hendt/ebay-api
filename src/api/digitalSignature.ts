import {createHash, sign} from 'crypto';
import {Cipher, Headers} from '../types/index.js';

const beginPrivateKey = '-----BEGIN PRIVATE KEY-----';
const endPrivateKey = '-----END PRIVATE KEY-----';

// based on https://github.com/ebay/digital-signature-nodejs-sdk

/**
 * Returns the current UNIX timestamp.
 *
 * @returns {number} The unix timestamp.
 */
const getUnixTimestamp = (): number => Date.now() / 1000 | 0;

const getSignatureParams = (payload: any) => [
  ...payload ? ['content-digest'] : [],
  'x-ebay-signature-key',
  '@method',
  '@path',
  '@authority'
];

const getSignatureParamsValue = (payload: any) => getSignatureParams(payload).map(param => `"${param}"`).join(' ');

/**
 * Generates the 'Content-Digest' header value for the input payload.
 *
 * @param {any} payload The request payload.
 * @param {string} cipher The algorithm used to calculate the digest.
 * @returns {string} contentDigest The 'Content-Digest' header value.
 */
export const generateContentDigestValue = (payload: unknown, cipher: Cipher = 'sha256'): string => {
  const payloadBuffer: Buffer = Buffer.from(typeof payload === 'string' ? payload : JSON.stringify(payload));

  const hash = createHash(cipher).update(payloadBuffer).digest('base64');
  const algo: string = cipher === 'sha512' ? 'sha-512' : 'sha-256';
  return `${algo}=:${hash}:`;
};

export type SignatureComponents = {
  method: string
  authority: string // the host
  path: string
}

/**
 * Generates the base string.
 *
 * @param {any} headers The HTTP request headers.
 * @param {SignatureComponents} signatureComponents The config.
 * @param {any} payload The payload.
 * @param {number} timestamp The timestamp.
 * @returns {string} payload The base string.
 */
export function generateBaseString(headers: Headers, signatureComponents: SignatureComponents, payload: any, timestamp = getUnixTimestamp()): string {
  try {
    let baseString: string = '';
    const signatureParams: string[] = getSignatureParams(payload);

    signatureParams.forEach(param => {
      baseString += `"${param.toLowerCase()}": `;

      if (param.startsWith('@')) {
        switch (param.toLowerCase()) {
          case '@method':
            baseString += signatureComponents.method;
            break;
          case '@authority':
            baseString += signatureComponents.authority;
            break;
          case '@path':
            baseString += signatureComponents.path;
            break;
          default:
            throw new Error('Unknown pseudo header ' + param);
        }
      } else {
        if (!headers[param]) {
          throw new Error('Header ' + param + ' not included in message');
        }
        baseString += headers[param];
      }

      baseString += '\n';
    });

    baseString += `"@signature-params": (${getSignatureParamsValue(payload)});created=${timestamp}`;

    return baseString;
  } catch (ex: any) {
    throw new Error(`Error calculating signature base: ${ex.message}`);
  }
}

/**
 * Generates the Signature-Input header value for the input payload.
 *
 * @param {any} payload The input config.
 * @param {number} timestamp The timestamp.
 * @returns {string} the 'Signature-Input' header value.
 */
export const generateSignatureInput = (payload: any, timestamp = getUnixTimestamp()): string => `sig1=(${getSignatureParamsValue(payload)});created=${timestamp}`;

/**
 * Generates the 'Signature' header.
 *
 * @param {any} headers The HTTP headers.
 * @param {string} privateKey The HTTP headers.
 * @param {SignatureComponents} signatureComponents The signature components
 * @param {any} payload The payload
 * @param {number} timestamp The payload
 * @returns {string} the signature header value.
 */
export function generateSignature(
  headers: any,
  privateKey: string,
  signatureComponents: SignatureComponents,
  payload: any,
  timestamp = getUnixTimestamp()
): string {
  const baseString = generateBaseString(headers, signatureComponents, payload, timestamp);

  privateKey = privateKey.trim();
  if (!privateKey.startsWith(beginPrivateKey)) {
    privateKey = beginPrivateKey + '\n' + privateKey + '\n' + endPrivateKey;
  }

  const signatureBuffer = sign(
    undefined, // If algorithm is undefined, then it is dependent upon the private key type.
    Buffer.from(baseString),
    privateKey
  );

  const signature = signatureBuffer.toString('base64');
  return `sig1=:${signature}:`;
}

