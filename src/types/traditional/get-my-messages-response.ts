// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetMyMessages.html#Output
import type { StandardOutputFields } from "./common.js";

export interface GetMyMessagesResponse extends StandardOutputFields {
	Messages: {
		Message?: {
			Content?: string;
			ExpirationDate?: string;
			ExternalMessageID?: string;
			Flagged?: boolean;
			Folder?: {
				FolderID?: bigint;
			};
			HighPriority?: boolean;
			ItemEndTime?: string;
			ItemID?: string;
			ItemTitle?: string;
			ListingStatus?: any;
			MessageID?: string;
			MessageMedia?: {
				MediaName?: string;
				MediaURL?: string;
			};
			MessageType?: any;
			QuestionType?: any;
			Read?: boolean;
			ReceiveDate?: string;
			RecipientUserID?: string;
			Replied?: boolean;
			ResponseDetails?: {
				ResponseEnabled?: boolean;
				ResponseURL?: string;
			};
			SendToName?: string;
			Sender?: string;
			Subject?: string;
			Text?: string;
		};
	};
	Summary?: {
		FlaggedMessageCount?: number;
		FolderSummary?: {
			FolderID?: bigint;
			FolderName?: string;
			NewHighPriorityCount?: number;
			NewMessageCount?: number;
			TotalHighPriorityCount?: number;
			TotalMessageCount?: number;
		};
		NewHighPriorityCount?: number;
		NewMessageCount?: number;
		TotalHighPriorityCount?: number;
		TotalMessageCount?: number;
	};
}
