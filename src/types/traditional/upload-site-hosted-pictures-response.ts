// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/UploadSiteHostedPictures.html#Output
import type { StandardOutputFields } from "./common.js";

export interface UploadSiteHostedPicturesResponse extends StandardOutputFields {
	SiteHostedPictureDetails: {
		BaseURL: string;
		ExternalPictureURL?: string;
		FullURL: string;
		PictureFormat: "CustomCode" | "GIF" | "JPG" | "PNG";
		PictureName?: string;
		PictureSet: "CustomCode" | "Standard" | "Supersize";
		PictureSetMember: {
			MemberURL: string;
			PictureHeight: number;
			PictureWidth: number;
		};
		UseByDate: string;
	};
}
