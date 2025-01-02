sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",  // สมมุติว่า formatter ถูกต้องและมีอยู่ใน path นี้
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Formatter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
        
        // เมื่อ Controller ถูกสร้างขึ้น
        onInit() {
            // สร้าง view model สำหรับ currency
            const oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
        },

        // ฟังก์ชันสำหรับการกรองรายการใบสั่งซื้อ
        onFilterInvoices(oEvent) {
            // สร้าง array สำหรับ filter
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            // การกรอง binding ของ List
            const oList = this.byId("invoiceList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        // ฟังก์ชันเมื่อผู้ใช้คลิกที่ ObjectListItem
        onPress(oEvent) {
            // รับ item ที่ถูกคลิก
            const oItem = oEvent.getSource();
            
            // รับ Router จาก Component
            const oRouter = this.getOwnerComponent().getRouter();

            // ทำการ navigate ไปยัง route "detail" พร้อมพารามิเตอร์ invoicePath
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
        }
    });
});
