sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], (UIComponent, JSONModel, Device) => {
	"use strict";

	return UIComponent.extend("ui5.walkthrough.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		// เมธอด init สำหรับการตั้งค่าโมเดลและการเริ่มต้น Router
		init() {
			// เรียกใช้ฟังก์ชัน init ของ parent class
			UIComponent.prototype.init.apply(this, arguments);

			// ตั้งค่าโมเดลข้อมูล (oData) 
			const oData = {
				recipient: {
					name: "World"
				}
			};
			const oModel = new JSONModel(oData);
			this.setModel(oModel);

			// ตั้งค่าโมเดลอุปกรณ์ (Device Model)
			const oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// สร้าง views ตาม URL หรือ hash
			this.getRouter().initialize();
		},

		// ฟังก์ชันสำหรับการตั้งค่า content density
		getContentDensityClass() {
			// ถ้าผู้ใช้รองรับ touch จะใช้ขนาด Cozy ถ้าไม่ใช้ Compact
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
	});
});
