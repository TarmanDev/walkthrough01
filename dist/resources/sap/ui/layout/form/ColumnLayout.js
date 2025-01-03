/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/layout/library","./FormLayout","./ColumnLayoutRenderer","sap/ui/thirdparty/jquery"],function(e,t,a,i,l,jQuery){"use strict";var s=i.extend("sap.ui.layout.form.ColumnLayout",{metadata:{library:"sap.ui.layout",properties:{columnsXL:{type:"sap.ui.layout.form.ColumnsXL",group:"Appearance",defaultValue:2},columnsL:{type:"sap.ui.layout.form.ColumnsL",group:"Appearance",defaultValue:2},columnsM:{type:"sap.ui.layout.form.ColumnsM",group:"Appearance",defaultValue:1},labelCellsLarge:{type:"sap.ui.layout.form.ColumnCells",group:"Appearance",defaultValue:4},emptyCellsLarge:{type:"sap.ui.layout.form.EmptyCells",group:"Appearance",defaultValue:0}}},renderer:l});s.prototype.init=function(){i.prototype.init.apply(this,arguments);this._iBreakPointTablet=e.media._predefinedRangeSets[e.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=e.media._predefinedRangeSets[e.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=e.media._predefinedRangeSets[e.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];this._resizeProxy=jQuery.proxy(o,this);if(typeof ResizeObserver==="function"){this._oResizeObserver=new ResizeObserver(this._resizeProxy)}};s.prototype.exit=function(){r.call(this);this._oResizeObserver=undefined};s.prototype.onBeforeRendering=function(e){i.prototype.onBeforeRendering.apply(this,arguments);if(this.getColumnsM()>this.getColumnsL()||this.getColumnsL()>this.getColumnsXL()){throw new Error("Column size not correct defined for "+this)}r.call(this)};s.prototype.onAfterRendering=function(e){if(this._oResizeObserver){var a=this.getDomRef();this._oResizeObserver.observe(a)}else{this._sResizeListener=t.register(this,this._resizeProxy)}n.call(this)};s.prototype.toggleContainerExpanded=function(e){e.$().toggleClass("sapUiFormCLContainerColl",!e.getExpanded())};s.prototype.onLayoutDataChange=function(e){this.invalidate()};s.prototype.onsapup=function(e){this.onsapleft(e)};s.prototype.onsapdown=function(e){this.onsapright(e)};s.prototype.getContainerRenderedDomRef=function(e){return e.getDomRef()};s.prototype.getElementRenderedDomRef=function(e){return e.getDomRef()};s.prototype._getContainerSize=function(e){var t=this.getParent();var a=this.getLayoutDataForElement(e,"sap.ui.layout.form.ColumnContainerData");var i=t.getVisibleFormContainers();var l=i.length;var s=this.getColumnsM();var r=this.getColumnsL();var o=this.getColumnsXL();var n={S:{Size:1,Break:false,FirstRow:false},M:{Size:1,Break:false,FirstRow:false},L:{Size:1,Break:false,FirstRow:false},XL:{Size:1,Break:false,FirstRow:false}};var u=function(e,t,a,i,l){if(a<e){t.Size=Math.floor(e/a);if(l&&t.Size*a<e){t.Size=t.Size+e-t.Size*a}}t.Break=e>1&&i>0&&i%e===0;t.FirstRow=a>1&&i<e};if(a){n.M.Size=a.getColumnsM();n.L.Size=a.getColumnsL();n.XL.Size=a.getColumnsXL();if(n.M.Size>s||n.L.Size>r||n.XL.Size>o){throw new Error("More cells defined for FormContainer "+e.getId()+" than columns on "+this)}}if(l===1){if(!a){n.M.Size=s;n.L.Size=r;n.XL.Size=o}n.S.FirstRow=true;n.M.FirstRow=true;n.L.FirstRow=true;n.XL.FirstRow=true}else{var f=0;var g=0;var m=0;var p;var C=false;var S=0;var L=s;var d=r;var h=o;var y=0;for(y=0;y<l;y++){if(e===i[y]){f=y;p=a}else{p=this.getLayoutDataForElement(i[y],"sap.ui.layout.form.ColumnContainerData")}if(!p){var v=i[y].getVisibleFormElements();if(g<v.length){g=v.length;m=y}S++}else{C=true;L=L-p.getColumnsM();d=d-p.getColumnsL();h=h-p.getColumnsXL()}}n.S.FirstRow=l>1&&f===0;n.S.Break=f>0;if(!C){u(s,n.M,l,f,f===m);u(r,n.L,l,f,f===m);u(o,n.XL,l,f,f===m)}else{if(!a){if(S<L){u(L,n.M,S,f,f===m)}if(S<d){u(d,n.L,S,f,f===m)}if(S<h){u(h,n.XL,S,f,f===m)}}var c={M:{rowColumns:0,lineBreak:false,first:true},L:{rowColumns:0,lineBreak:false,first:true},XL:{rowColumns:0,lineBreak:false,first:true}};var D=function(e,t,a){if(a){if(e.rowColumns+a<=t){e.rowColumns=e.rowColumns+a;e.lineBreak=false}else{e.rowColumns=a;if(t>1){e.lineBreak=true}e.first=false}}else{if(e.rowColumns<t){e.rowColumns++;e.lineBreak=false}else{e.rowColumns=1;if(t>1){e.lineBreak=true}e.first=false}}};for(y=0;y<l;y++){if(e===i[y]){p=a}else{p=this.getLayoutDataForElement(i[y],"sap.ui.layout.form.ColumnContainerData")}D(c.M,s,p?p.getColumnsM():0);D(c.L,r,p?p.getColumnsL():0);D(c.XL,o,p?p.getColumnsXL():0);if(e===i[y]){n.M.Break=c.M.lineBreak;n.L.Break=c.L.lineBreak;n.XL.Break=c.XL.lineBreak;n.M.FirstRow=c.M.first;n.L.FirstRow=c.L.first;n.XL.FirstRow=c.XL.first;break}}}}return n};s.prototype._getFieldSize=function(e){var t=12;var a=this.getLayoutDataForElement(e,"sap.ui.layout.form.ColumnElementData");var i={S:{Size:t,Break:false,Space:0},L:{Size:t,Break:false,Space:0}};var l=t;var s=this.getLabelCellsLarge();if(a){i.S.Size=a.getCellsSmall()===-1?t:a.getCellsSmall();i.L.Size=a.getCellsLarge()===-1?t:a.getCellsLarge()}var r=e.getParent();var o=r.getLabelControl();if(o===e){if(!a||a.getCellsSmall()===-1){i.S.Size=l}if(!a||a.getCellsLarge()===-1){i.L.Size=s}}else{var n=r.getFieldsForRendering();var u=n.length;var f=t;var g=t-this.getEmptyCellsLarge();if(o){var m=this.getLayoutDataForElement(o,"sap.ui.layout.form.ColumnElementData");if(m){l=m.getCellsSmall()===-1?l:m.getCellsSmall();s=m.getCellsLarge()===-1?s:m.getCellsLarge()}if(l<t){f=f-l}if(s<t){g=g-s}}else{l=0;s=0}if(u===1){if(!a||a.getCellsSmall()===-1){i.S.Size=f}else if(o){if(i.S.Size>f){i.S.Break=true}}if(!a||a.getCellsLarge()===-1){i.L.Size=g}else if(o){if(i.L.Size>g){i.L.Break=true}}}else{var p=0;var C=[];var S=[];var L={availableCells:f,first:0,last:999,firstDefault:-1,defaultFields:0};var d=0;var h=0;var y=0;var v;C.push(jQuery.extend({},L));L.availableCells=g;S.push(jQuery.extend({},L));var c=function(e,t,a,i){e[t].last=a-1;e.push(jQuery.extend({},L));t++;e[t].first=a;e[t].availableCells=i;return t};var D=function(e,a,i,l,s){if(e[a].availableCells-e[a].defaultFields<i){if(i<=l){a=c(e,a,s,l)}else{a=c(e,a,s,t)}}e[a].availableCells=e[a].availableCells-i;return a};var F=function(e,t,a,i){if(e[t].availableCells===e[t].defaultFields){t=c(e,t,i,a)}if(e[t].firstDefault<0){e[t].firstDefault=i}e[t].defaultFields++;return t};for(p=0;p<u;p++){if(e!==n[p]){v=this.getLayoutDataForElement(n[p],"sap.ui.layout.form.ColumnElementData")}else{v=a;y=p}if(v&&v.getCellsSmall()>0){d=D(C,d,v.getCellsSmall(),f,p)}else{d=F(C,d,f,p)}if(v&&v.getCellsLarge()>0){h=D(S,h,v.getCellsLarge(),g,p)}else{h=F(S,h,g,p)}}var z=function(e,a,i,l,s){var r=0;var o;for(p=0;p<e.length;p++){if(a>=e[p].first&&a<=e[p].last){o=e[p];break}}if(i<=0){l.Size=Math.floor(o.availableCells/o.defaultFields)}if(a===o.first&&a>0){l.Break=true;if(s>0&&s<t&&l.Size<=t-s){l.Space=s}}if(a===o.firstDefault){r=o.availableCells-o.defaultFields*l.Size;if(r>0){l.Size=l.Size+r}}};z(C,y,a?a.getCellsSmall():-1,i.S,l);z(S,y,a?a.getCellsLarge():-1,i.L,s)}}return i};function r(){if(this._oResizeObserver){this._oResizeObserver.disconnect()}if(this._sResizeListener){t.deregister(this._sResizeListener);this._sResizeListener=undefined}}function o(e,t){window.requestAnimationFrame(function(){n.call(this,e,t)}.bind(this))}function n(e,a){var i=this.getDomRef();if(!i){r.call(this);return}var l=this.$();if(!l.is(":visible")){return}if(t.isSuspended(i,this._resizeProxy)){return}var s=i.clientWidth;var o=1;if(s<=this._iBreakPointTablet){this.toggleStyleClass("sapUiFormCLMedia-Std-Phone",true);this.toggleStyleClass("sapUiFormCLMedia-Std-Desktop",false).toggleStyleClass("sapUiFormCLMedia-Std-Tablet",false).toggleStyleClass("sapUiFormCLMedia-Std-LargeDesktop",false)}else if(s>this._iBreakPointTablet&&s<=this._iBreakPointDesktop){this.toggleStyleClass("sapUiFormCLMedia-Std-Tablet",true);this.toggleStyleClass("sapUiFormCLMedia-Std-Desktop",false).toggleStyleClass("sapUiFormCLMedia-Std-Phone",false).toggleStyleClass("sapUiFormCLMedia-Std-LargeDesktop",false);o=this.getColumnsM()}else if(s>this._iBreakPointDesktop&&s<=this._iBreakPointLargeDesktop){this.toggleStyleClass("sapUiFormCLMedia-Std-Desktop",true);this.toggleStyleClass("sapUiFormCLMedia-Std-Phone",false).toggleStyleClass("sapUiFormCLMedia-Std-Tablet",false).toggleStyleClass("sapUiFormCLMedia-Std-LargeDesktop",false);o=this.getColumnsL()}else{this.toggleStyleClass("sapUiFormCLMedia-Std-LargeDesktop",true);this.toggleStyleClass("sapUiFormCLMedia-Std-Desktop",false).toggleStyleClass("sapUiFormCLMedia-Std-Phone",false).toggleStyleClass("sapUiFormCLMedia-Std-Tablet",false);o=this.getColumnsXL()}var n=this.getLabelCellsLarge()<12&&s/o>this._iBreakPointTablet;this.toggleStyleClass("sapUiFormCLWideColumns",n);this.toggleStyleClass("sapUiFormCLSmallColumns",!n)}s.prototype.getLayoutDataForDelimiter=function(){var e=sap.ui.require("sap/ui/layout/form/ColumnElementData");if(!e){var t;sap.ui.require(["sap/ui/layout/form/ColumnElementData"],function(e){t(new e({cellsLarge:1,cellsSmall:1}))});return new Promise(function(e){t=e})}else{return new e({cellsLarge:1,cellsSmall:1})}};s.prototype.getLayoutDataForSemanticField=function(e,t,a){if(a){if(a.isA("sap.ui.layout.form.ColumnElementData")){a.setCellsLarge(-1).setCellsSmall(11);return a}else{a.destroy()}}var i=sap.ui.require("sap/ui/layout/form/ColumnElementData");if(!i){var l;sap.ui.require(["sap/ui/layout/form/ColumnElementData"],function(e){l(new e({cellsLarge:-1,cellsSmall:11}))});return new Promise(function(e){l=e})}else{return new i({cellsLarge:-1,cellsSmall:11})}};s.prototype.renderControlsForSemanticElement=function(){return true};s.prototype.hasLabelledContainers=function(e){const t=e.getFormContainers();return t.length!==1||this.isContainerLabelled(t[0])};return s});
//# sourceMappingURL=ColumnLayout.js.map