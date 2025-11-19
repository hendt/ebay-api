// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetVeROReportStatus.html#Output
import type { StandardOutputFields } from "./common.js";

export interface GetVeROReportStatusResponse extends StandardOutputFields {
	ItemsPerPage?: number;
	PageNumber?: number;
	PaginationResult?: {
		TotalNumberOfEntries?: number;
		TotalNumberOfPages?: number;
	};
	ReportedItemDetails?: {
		ReportedItem?: {
			ItemID?: string;
			ItemReasonForFailure?: string;
			ItemStatus?:
				| "ClarificationRequired"
				| "CustomCode"
				| "Received"
				| "Removed"
				| "SubmissionFailed"
				| "Submitted";
		};
	};
	VeROReportPacketID?: bigint;
	VeROReportPacketStatus?:
		| "CustomCode"
		| "InProcess"
		| "Processed"
		| "Received";
}
