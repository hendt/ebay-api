// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/RespondToBestOffer.html#Output
import type { StandardOutputFields } from './common.js';

export interface RespondToBestOfferResponse extends StandardOutputFields {
  RespondToBestOffer: {
    BestOffer: {
      CallStatus: string;
    };
  };
}
