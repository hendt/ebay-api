import Cancellation from "./cancellation";
import Case from "./case";

export type PostOrder = {
    cancellation: Cancellation,
    case: Case
};

export {
    Cancellation,
    Case
}