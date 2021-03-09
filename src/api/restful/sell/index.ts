import Account from './account';
import Analytics from './analytics';
import Compliance from './compliance';
import Finance from './finance';
import Fulfillment from './fulfillment';
import Inventory from './inventory';
import Marketing from './marketing';
import Metadata from './metadata';
import Recommendation from './recommendation';

export type Sell = {
    account: Account
    analytics: Analytics,
    compliance: Compliance,
    fulfillment: Fulfillment,
    inventory: Inventory,
    marketing: Marketing,
    metadata: Metadata,
    recommendation: Recommendation,
    finance: Finance
};

export {
    Account,
    Compliance,
    Analytics,
    Fulfillment,
    Inventory,
    Marketing,
    Metadata,
    Recommendation,
    Finance
};
