// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetDescriptionTemplates.html#Output
import type { StandardOutputFields } from "./common.js";

export interface GetDescriptionTemplatesResponse extends StandardOutputFields {
	DescriptionTemplate: {
		GroupID?: number;
		ID: number;
		ImageURL: string;
		Name: string;
		TemplateXML?: string;
		Type: "CustomCode" | "Layout" | "Theme";
	};
	LayoutTotal: number;
	ObsoleteLayoutID?: number;
	ObsoleteThemeID?: number;
	ThemeGroup?: {
		GroupID?: number;
		GroupName?: string;
		ThemeID?: number;
		ThemeTotal?: number;
	};
	ThemeTotal: number;
}
