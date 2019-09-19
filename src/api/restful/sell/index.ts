import Account from "./account";
import Compliance from "./compliance";
import Analytics from "./analytics";
import Fulfillment from "./fulfillment";
import Inventory from "./inventory";
import Marketing from "./marketing";
import Metadata from "./metadata";
import Recommendation from "./recommendation";

export type Sell = {
    account: Account
    analytics: Analytics,
    compliance: Compliance,
    fulfillment: Fulfillment,
    inventory: Inventory,
    marketing: Marketing,
    metadata: Metadata,
    recommendation: Recommendation
}

export {
    Account,
    Compliance,
    Analytics,
    Fulfillment,
    Inventory,
    Marketing,
    Metadata,
    Recommendation
}