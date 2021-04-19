// tslint:disable:no-console
import eBayApi from '../../src';
import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';

const eBay = eBayApi.fromEnv();

(async () => {
  try {
    const image = fs.readFileSync(path.resolve(__dirname, 'upload_ok.png'));

    // const image = fs.readFileSync(path.resolve(__dirname, 'upload_bad_quality.jpg'));
    // --> To reduce possible issues with picture display quality, eBay recommends that pictures you upload have a JPEG quality value of 90 or greater.
    const response = await eBay.trading.UploadSiteHostedPictures({
      ExtensionInDays: 1,
    }, {
      multipart: {
        formData: new FormData(), // pass FormData instance here
        file: image
      }
    });

    console.log(response);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
})();