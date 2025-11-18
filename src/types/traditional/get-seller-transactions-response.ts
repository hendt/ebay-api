// https://developer.ebay.com/Devzone/XML/docs/Reference/eBay/GetSellerTransactions.html#Output
import type {
	CountryCodeType,
	CurrencyCodeType,
	StandardOutputFields,
} from "./common.js";

export interface GetSellerTransactionsResponse extends StandardOutputFields {
	PageNumber: number;
	PaginationResult: {
		TotalNumberOfEntries: number;
		TotalNumberOfPages: number;
	};
	ReturnedTransactionCountActual: number;
	Seller: {
		EIASToken: string;
		Email: string;
		FeedbackPrivate: boolean;
		FeedbackScore: number;
		NewUser: boolean;
		PositiveFeedbackPercent?: number;
		RegistrationDate: string;
		Site:
			| "Australia"
			| "Austria"
			| "Belgium_Dutch"
			| "Belgium_French"
			| "Canada"
			| "CanadaFrench"
			| "CustomCode"
			| "Cyprus"
			| "Czechia"
			| "eBayMotors"
			| "France"
			| "Germany"
			| "HongKong"
			| "India"
			| "Ireland"
			| "Italy"
			| "Malaysia"
			| "Netherlands"
			| "Philippines"
			| "Poland"
			| "Russia"
			| "Singapore"
			| "Spain"
			| "Switzerland"
			| "UK"
			| "US";
		Status:
			| "AccountOnHold"
			| "Confirmed"
			| "CreditCardVerify"
			| "CustomCode"
			| "Deleted"
			| "Ghost"
			| "Guest"
			| "InMaintenance"
			| "Merged"
			| "RegistrationCodeMailOut"
			| "Suspended"
			| "TermPending"
			| "Unconfirmed"
			| "Unknown";
		UserID: string;
		UserIDChanged: boolean;
		VATStatus: "CustomCode" | "NoVATTax" | "VATExempt" | "VATTax";
		eBayGoodStanding: boolean;
	};
	TransactionArray?: {
		Transaction?: {
			ActualHandlingCost?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			ActualShippingCost?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			AdjustmentAmount:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			AmountPaid?: number | { value: number; currencyID: CurrencyCodeType };
			BestOfferSale: boolean;
			Buyer?: {
				BuyerInfo?: {
					BuyerTaxIdentifier?: {
						Attribute?:
							| string
							| { value: string; name: "CustomCode" | "IssuingCountry" };
						ID?: string;
						Type?:
							| "CEDULA"
							| "CNPJ"
							| "CodiceFiscale"
							| "CPFTaxID"
							| "CURP"
							| "CustomCode"
							| "DNI"
							| "DriverLicense"
							| "NIE"
							| "NIF"
							| "NIT"
							| "RFC"
							| "RussianPassport"
							| "RUT"
							| "TurkeyID"
							| "VATIN";
					};
					ShippingAddress?: {
						CityName?: string;
						Country?: CountryCodeType;
						CountryName?: string;
						Phone?: string;
						PostalCode?: string;
						StateOrProvince?: string;
						Street?: string;
						Street1?: string;
						Street2?: string;
					};
				};
				EIASToken?: string;
				Email?: string;
				FeedbackPrivate?: boolean;
				FeedbackScore?: number;
				PositiveFeedbackPercent?: number;
				RegistrationDate?: string;
				Site?:
					| "Australia"
					| "Austria"
					| "Belgium_Dutch"
					| "Belgium_French"
					| "Canada"
					| "CanadaFrench"
					| "CustomCode"
					| "Cyprus"
					| "Czechia"
					| "eBayMotors"
					| "France"
					| "Germany"
					| "HongKong"
					| "India"
					| "Ireland"
					| "Italy"
					| "Malaysia"
					| "Netherlands"
					| "Philippines"
					| "Poland"
					| "Russia"
					| "Singapore"
					| "Spain"
					| "Switzerland"
					| "UK"
					| "US";
				Status?:
					| "AccountOnHold"
					| "Confirmed"
					| "CreditCardVerify"
					| "CustomCode"
					| "Deleted"
					| "Ghost"
					| "Guest"
					| "InMaintenance"
					| "Merged"
					| "RegistrationCodeMailOut"
					| "Suspended"
					| "TermPending"
					| "Unconfirmed"
					| "Unknown";
				UserID?: string;
				UserIDChanged?: boolean;
				VATStatus?: "CustomCode" | "NoVATTax" | "VATExempt" | "VATTax";
			};
			BuyerCheckoutMessage?: string;
			BuyerPackageEnclosures?: {
				BuyerPackageEnclosure?:
					| string
					| { value: string; type: "CustomCode" | "PaymentInstruction" };
			};
			CodiceFiscale?: string;
			ContainingOrder?: {
				CancelReason?: string;
				CancelStatus?:
					| "CancelClosedForCommitment"
					| "CancelClosedNoRefund"
					| "CancelClosedUnknownRefund"
					| "CancelClosedWithRefund"
					| "CancelComplete"
					| "CancelFailed"
					| "CancelPending"
					| "CancelRejected"
					| "CancelRequested"
					| "CustomCode"
					| "Invalid"
					| "NotApplicable";
				ContainseBayPlusTransaction?: boolean;
				CreatingUserRole?: "Buyer" | "CustomCode" | "Seller";
				ExtendedOrderID?: string;
				OrderID?: string;
				OrderLineItemCount?: bigint;
				OrderStatus?:
					| "Active"
					| "All"
					| "Cancelled"
					| "CancelPending"
					| "Completed"
					| "CustomCode"
					| "Inactive"
					| "InProcess";
			};
			ConvertedAdjustmentAmount?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			ConvertedAmountPaid?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			ConvertedTransactionPrice?:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			CreatedDate?: string;
			DepositType?: "CustomCode" | "None" | "OtherMethod";
			DigitalDeliverySelected?: {
				DeliveryDetails?: {
					Recipient?: {
						Email?: string;
						Name?: string;
					};
					Sender?: {
						Email?: string;
						Name?: string;
					};
				};
				DeliveryMethod?: string;
				DeliveryStatus?: {
					Email?: string;
				};
			};
			ExtendedOrderID?: string;
			FinalValueFee?: number | { value: number; currencyID: CurrencyCodeType };
			Gift?: boolean;
			GiftSummary?: {
				Message?: string;
			};
			GuaranteedDelivery: boolean;
			GuaranteedShipping?: boolean;
			IntangibleItem: boolean;
			InventoryReservationID?: string;
			InvoiceSentTime?: string;
			IsMultiLegShipping?: boolean;
			Item: {
				ApplicationData?: string;
				AutoPay: boolean;
				BuyItNowPrice?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				Charity?: {
					CharityListing?: boolean;
				};
				Country?: CountryCodeType;
				Currency: CurrencyCodeType;
				InventoryTrackingMethod?: "CustomCode" | "ItemID" | "SKU";
				ItemID: string;
				ListingDetails?: {
					EndTime?: string;
					StartTime?: string;
				};
				ListingType:
					| "AdType"
					| "Auction"
					| "Chinese"
					| "CustomCode"
					| "FixedPriceItem"
					| "LeadGeneration"
					| "PersonalOffer"
					| "Unknown";
				Location?: string;
				LotSize?: number;
				PrivateListing: boolean;
				Quantity: number;
				SKU?: string;
				SellingStatus: {
					BidCount?: number;
					ConvertedCurrentPrice?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					CurrentPrice:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					FinalValueFee?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					ListingStatus:
						| "Active"
						| "Completed"
						| "Custom"
						| "CustomCode"
						| "Ended";
					QuantitySold: number;
				};
				Site?:
					| "Australia"
					| "Austria"
					| "Belgium_Dutch"
					| "Belgium_French"
					| "Canada"
					| "CanadaFrench"
					| "CustomCode"
					| "Cyprus"
					| "Czechia"
					| "eBayMotors"
					| "France"
					| "Germany"
					| "HongKong"
					| "India"
					| "Ireland"
					| "Italy"
					| "Malaysia"
					| "Netherlands"
					| "Philippines"
					| "Poland"
					| "Russia"
					| "Singapore"
					| "Spain"
					| "Switzerland"
					| "UK"
					| "US";
				StartPrice?: number | { value: number; currencyID: CurrencyCodeType };
				Title?: string;
			};
			LogisticsPlanType?: string;
			MonetaryDetails?: {
				Payments?: {
					Payment?: {
						FeeOrCreditAmount?:
							| number
							| { value: number; currencyID: CurrencyCodeType };
						Payee?:
							| string
							| {
									value: string;
									type: "CustomCode" | "eBayPartner" | "eBayUser";
							  };
						Payer?:
							| string
							| {
									value: string;
									type: "CustomCode" | "eBayPartner" | "eBayUser";
							  };
						PaymentAmount?:
							| number
							| { value: number; currencyID: CurrencyCodeType };
						PaymentReferenceID?:
							| string
							| { value: string; type: "CustomCode" | "ExternalTransactionID" };
						PaymentTime?: string;
						ReferenceID?:
							| string
							| { value: string; type: "CustomCode" | "ExternalTransactionID" };
					};
				};
				Refunds?: {
					Refund?: {
						FeeOrCreditAmount?:
							| number
							| { value: number; currencyID: CurrencyCodeType };
						ReferenceID?:
							| string
							| { value: string; type: "CustomCode" | "ExternalTransactionID" };
						RefundAmount?:
							| number
							| { value: number; currencyID: CurrencyCodeType };
						RefundTime?: string;
						RefundTo?:
							| string
							| {
									value: string;
									type: "CustomCode" | "eBayPartner" | "eBayUser";
							  };
						RefundType?: "CustomCode" | "PaymentRefund" | "StoreCredit";
					};
				};
			};
			MultiLegShippingDetails?: {
				SellerShipmentToLogisticsProvider?: {
					ShipToAddress?: {
						AddressOwner?: "CustomCode" | "eBay";
						CityName?: string;
						Country?: CountryCodeType;
						CountryName?: string;
						Phone?: string;
						PostalCode?: string;
						ReferenceID?: string;
						StateOrProvince?: string;
						Street1?: string;
						Street2?: string;
					};
					ShippingServiceDetails?: {
						ShippingService?: string;
						TotalShippingCost?:
							| number
							| { value: number; currencyID: CurrencyCodeType };
					};
					ShippingTimeMax?: number;
					ShippingTimeMin?: number;
				};
			};
			OrderLineItemID: string;
			PaidTime?: string;
			PickupDetails?: {
				PickupOptions?: {
					PickupMethod?: string;
					PickupPriority?: number;
				};
			};
			PickupMethodSelected?: {
				MerchantPickupCode?: string;
				PickupFulfillmentTime?: string;
				PickupLocationUUID?: string;
				PickupMethod?: string;
				PickupStatus?:
					| "CustomCode"
					| "Invalid"
					| "NotApplicable"
					| "PendingMerchantConfirmation"
					| "Pickedup"
					| "PickupCancelled"
					| "PickupCancelledBuyerNoShow"
					| "PickupCancelledBuyerRejected"
					| "PickupCancelledOutOfStock"
					| "ReadyToPickup";
				PickupStoreID?: string;
			};
			Platform: any;
			Program?: {
				AuthenticityVerification?: {
					OutcomeReason?: string;
					ServiceCost?: {
						Amount?: number | { value: number; currencyID: CurrencyCodeType };
						ConvertedFromAmount?:
							| number
							| { value: number; currencyID: CurrencyCodeType };
					};
					Status?: string;
				};
				Fulfillment?: {
					FulfillmentBy?: string;
					FulfillmentRefId?: string;
				};
			};
			QuantityPurchased?: number;
			SellerDiscounts?: {
				OriginalItemPrice?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				OriginalItemShippingCost?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				OriginalShippingService?: string;
				SellerDiscount?: {
					CampaignDisplayName?: string;
					CampaignID?: bigint;
					ItemDiscountAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					ShippingDiscountAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
				};
			};
			ShippedTime?: string;
			ShippingDetails?: {
				CalculatedShippingRate?: {
					InternationalPackagingHandlingCosts?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					PackagingHandlingCosts?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
				};
				PaymentEdited?: boolean;
				SalesTax?: {
					SalesTaxAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					SalesTaxPercent?: number;
					SalesTaxState?: string;
					ShippingIncludedInTax?: boolean;
				};
				SellingManagerSalesRecordNumber?: number;
				ShipmentTrackingDetails?: {
					ShipmentTrackingNumber?: string;
					ShippingCarrierUsed?: string;
				};
				ShippingRateType?:
					| "CommercialPlus"
					| "Counter"
					| "CustomCode"
					| "DailyPickup"
					| "Discounted"
					| "GoldSilver"
					| "OnDemand"
					| "PlatTitanium"
					| "StandardList";
				ShippingServiceUsed?: string;
				ShippingType?:
					| "Calculated"
					| "CalculatedDomesticFlatInternational"
					| "CustomCode"
					| "Flat"
					| "FlatDomesticCalculatedInternational"
					| "Free"
					| "Freight"
					| "FreightFlat"
					| "NotSpecified";
				TaxTable?: {
					TaxJurisdiction?: {
						JurisdictionID?: string;
						SalesTaxPercent?: number;
						ShippingIncludedInTax?: boolean;
					};
				};
				eBayEstimatedLabelCost?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
			};
			ShippingServiceSelected?: {
				ExpeditedService?: boolean;
				ImportCharge?: number | { value: number; currencyID: CurrencyCodeType };
				ShippingPackageInfo?: {
					ActualDeliveryTime?: string;
					EstimatedDeliveryTimeMax?: string;
					EstimatedDeliveryTimeMin?: string;
					HandleByTime?: string;
					MaxNativeEstimatedDeliveryTime?: string;
					MinNativeEstimatedDeliveryTime?: string;
					ScheduledDeliveryTimeMax?: string;
					ScheduledDeliveryTimeMin?: string;
					ShippingTrackingEvent?: string;
					StoreID?: string;
				};
				ShippingService?: string;
				ShippingServiceAdditionalCost?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				ShippingServiceCost?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				ShippingServicePriority?: number;
				ShippingTimeMax?: number;
				ShippingTimeMin?: number;
			};
			Status?: {
				BuyerSelectedShipping?: boolean;
				CheckoutStatus?:
					| "BuyerRequestsTotal"
					| "CheckoutComplete"
					| "CheckoutIncomplete"
					| "CustomCode"
					| "SellerResponded";
				CompleteStatus?: "Complete" | "CustomCode" | "Incomplete" | "Pending";
				DigitalStatus?:
					| "Activated"
					| "CustomCode"
					| "Deactivated"
					| "Downloaded"
					| "Inactive";
				InquiryStatus:
					| "CustomCode"
					| "Invalid"
					| "NotApplicable"
					| "TrackInquiryClosedNoRefund"
					| "TrackInquiryClosedWithRefund"
					| "TrackInquiryEscalatedClosedNoRefund"
					| "TrackInquiryEscalatedClosedWithRefund"
					| "TrackInquiryEscalatedPendingBuyer"
					| "TrackInquiryEscalatedPendingCS"
					| "TrackInquiryEscalatedPendingSeller"
					| "TrackInquiryPendingBuyerResponse"
					| "TrackInquiryPendingSellerResponse";
				LastTimeModified?: string;
				PaymentHoldStatus:
					| "CustomCode"
					| "MerchantHold"
					| "NewSellerHold"
					| "None"
					| "PaymentHold"
					| "PaymentReview"
					| "ReleaseConfirmed"
					| "Released"
					| "ReleasePending";
				PaymentInstrument?:
					| "BankDirectDebit"
					| "BML"
					| "CreditCard"
					| "CustomCode"
					| "ELV"
					| "GIROPAY"
					| "LocalPaymentAMEX"
					| "LocalPaymentCreditCardOther"
					| "LocalPaymentDinersclub"
					| "LocalPaymentDiscover"
					| "LocalPaymentELV"
					| "LocalPaymentJCB"
					| "LocalPaymentMasterCard"
					| "LocalPaymentSOLO"
					| "LocalPaymentSWITCH"
					| "LocalPaymentVISA"
					| "None"
					| "PayPal"
					| "PayUponInvoice";
				PaymentMethodUsed?:
					| "CashOnPickup"
					| "COD"
					| "CustomCode"
					| "MOCC"
					| "PersonalCheck";
				ReturnStatus?:
					| "CustomCode"
					| "Invalid"
					| "NotApplicable"
					| "ReturnClosedEscalated"
					| "ReturnClosedNoRefund"
					| "ReturnClosedWithRefund"
					| "ReturnDelivered"
					| "ReturnEscalated"
					| "ReturnEscalatedClosedNoRefund"
					| "ReturnEscalatedClosedWithRefund"
					| "ReturnEscalatedPendingBuyer"
					| "ReturnEscalatedPendingCS"
					| "ReturnEscalatedPendingSeller"
					| "ReturnOpen"
					| "ReturnRequestClosedNoRefund"
					| "ReturnRequestClosedWithRefund"
					| "ReturnRequestPending"
					| "ReturnRequestPendingApproval"
					| "ReturnRequestRejected"
					| "ReturnShipped";
				eBayPaymentStatus?:
					| "BuyerFailedPaymentReportedBySeller"
					| "CustomCode"
					| "NoPaymentFailure"
					| "PaymentInProcess";
			};
			Taxes?: {
				TaxDetails?: {
					Imposition?:
						| "CustomCode"
						| "GST"
						| "ImportVAT"
						| "SalesTax"
						| "VAT"
						| "WasteRecyclingFee";
					TaxAmount?: number | { value: number; currencyID: CurrencyCodeType };
					TaxCode?: string;
					TaxDescription?:
						| "CustomCode"
						| "ElectronicWasteRecyclingFee"
						| "GST"
						| "SalesTax"
						| "TireRecyclingFee";
					TaxOnHandlingAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					TaxOnShippingAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					TaxOnSubtotalAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
				};
				TotalTaxAmount?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				eBayReference?: string | { value: string; name: string };
			};
			TransactionID: string;
			TransactionPrice:
				| number
				| { value: number; currencyID: CurrencyCodeType };
			TransactionSiteID?:
				| "Australia"
				| "Austria"
				| "Belgium_Dutch"
				| "Belgium_French"
				| "Canada"
				| "CanadaFrench"
				| "CustomCode"
				| "Cyprus"
				| "Czechia"
				| "eBayMotors"
				| "France"
				| "Germany"
				| "HongKong"
				| "India"
				| "Ireland"
				| "Italy"
				| "Malaysia"
				| "Netherlands"
				| "Philippines"
				| "Poland"
				| "Russia"
				| "Singapore"
				| "Spain"
				| "Switzerland"
				| "UK"
				| "US";
			Variation?: {
				SKU?: string;
				VariationSpecifics?: {
					NameValueList?: {
						Name?: string;
					};
				};
				VariationTitle?: string;
				VariationViewItemURL?: string;
			};
			eBayCollectAndRemitTax?: boolean;
			eBayCollectAndRemitTaxes?: {
				TaxDetails?: {
					CollectionMethod?: any;
					Imposition?:
						| "CustomCode"
						| "GST"
						| "ImportVAT"
						| "SalesTax"
						| "VAT"
						| "WasteRecyclingFee";
					TaxAmount?: number | { value: number; currencyID: CurrencyCodeType };
					TaxCode?: string;
					TaxDescription?:
						| "CustomCode"
						| "ElectronicWasteRecyclingFee"
						| "GST"
						| "SalesTax"
						| "TireRecyclingFee";
					TaxOnHandlingAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					TaxOnShippingAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
					TaxOnSubtotalAmount?:
						| number
						| { value: number; currencyID: CurrencyCodeType };
				};
				TotalTaxAmount?:
					| number
					| { value: number; currencyID: CurrencyCodeType };
				eBayReference?: string | { value: string; name: string };
			};
			eBayPaymentID?: string;
			eBayPlusTransaction?: boolean;
		};
	};
	TransactionsPerPage: number;
}
