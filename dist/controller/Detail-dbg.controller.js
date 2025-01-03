sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], (Controller, History, MessageToast, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Detail", {

		// เมธอด onInit สำหรับการตั้งค่าการนำทางและการตั้งค่า View Model
		onInit() {
			// ตั้งค่า view model สำหรับ currency
			const oViewModel = new JSONModel({
				currency: "EUR"  // กำหนดค่าเริ่มต้นเป็น "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			// ตั้งค่าการนำทางและผูก handler เมื่อมีการจับ pattern ของ route
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		// เมธอด onObjectMatched สำหรับการผูกข้อมูลและการรีเซ็ต Rating Control
		onObjectMatched(oEvent) {
			// รีเซ็ต Rating Control เมื่อมีการจับคู่กับ Object ใหม่
			this.byId("rating").reset();

			// ผูก view กับข้อมูลใบแจ้งหนี้ (invoice) ที่เลือก
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice"
			});
		},

		// เมธอด onNavBack สำหรับการนำทางกลับไปยังหน้าก่อนหรือหน้า overview
		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			// ถ้ามีการบันทึกประวัติการเข้าชมหน้าก่อนหน้านี้ ให้ย้อนกลับ
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// ถ้าไม่มีประวัติ ให้ไปที่ route "overview"
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},

		// เมธอด onRatingChange สำหรับการจัดการการเปลี่ยนแปลงคะแนนการให้คะแนน
		onRatingChange(oEvent) {
			const fValue = oEvent.getParameter("value");
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			// แสดง MessageToast สำหรับการยืนยันการเปลี่ยนแปลงคะแนน
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});
