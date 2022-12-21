// tslint:disable:no-console
import eBayApi from '../../src/eBayApi.js';
import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const image = fs.readFileSync(path.resolve(__dirname, 'upload_ok.png'));

    // const image = fs.readFileSync(path.resolve(__dirname, 'upload_bad_quality.jpg'));
    // --> To reduce possible issues with picture display quality, eBay recommends that pictures you upload have a JPEG quality value of 90 or greater.
    const response = await eBay.trading.UploadSiteHostedPictures({
      ExtensionInDays: 1,
    }, {
      hook: (xml: string) => {
        const form = new FormData();
        // XML should be always first
        form.append('XML Payload', xml, 'payload.xml');
        form.append('dummy', image)
        return {
          body: form,
          headers: form.getHeaders()
        }
      }
    });

    console.log(response);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
})();