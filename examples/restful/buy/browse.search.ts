// tslint:disable:no-console
import eBayApi from '../../../src/eBayApi.js';

const eBay = eBayApi.fromEnv();

eBay.buy.browse.search({
  q: 'shirt',
  category_ids: '15724',
  aspect_filter: 'categoryId:15724,Color:{Red}'
})
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(e => {
    console.log(e);
  });