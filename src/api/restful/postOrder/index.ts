import Cancellation from "./cancellation";
import Case from "./case";
import Inquiry from "./inquiry";

export type PostOrder = {
    cancellation: Cancellation,
    case: Case,
    inquiry: Inquiry
};

export {
    Cancellation,
    Case,
    Inquiry
}