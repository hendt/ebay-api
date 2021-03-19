// tslint:disable:no-console
import eBayApi from '../../src';

const eBay = eBayApi.fromEnv();

eBay.trading.GetMyeBaySelling({
  SoldList: {
    Include: true,
    OrderStatusFilter: 'AwaitingPayment',
    Pagination: {
      EntriesPerPage: 20,
      PageNumber: 1
    }
  }
}).then(result => {
  console.log(JSON.stringify(result, null, 2));
}).catch(e => {
  console.error(e);
});
