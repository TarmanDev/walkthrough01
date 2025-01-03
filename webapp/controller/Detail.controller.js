sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], (Controller, History, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Detail", {

		// onInit method to set up routing
		onInit() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		// onObjectMatched method for binding the element and resetting the rating control
		onObjectMatched(oEvent) {
			// Reset the rating control when the object is matched
			this.byId("rating").reset();

			// Bind the view to the specific invoice data
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice"
			});
		},

		// onNavBack method for navigating back to the previous page or overview
		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			// Check if there is a previous history entry, if so navigate back
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// Navigate to the overview route if no history
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},

		// onRatingChange method to handle rating changes and display a confirmation message
		onRatingChange(oEvent) {
			const fValue = oEvent.getParameter("value");
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			// Display the confirmation message with the rating value
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});
