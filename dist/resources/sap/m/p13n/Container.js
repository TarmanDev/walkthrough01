/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/AbstractContainer","sap/m/Bar","sap/m/Button","sap/m/Title","sap/m/List","sap/m/IconTabBar","sap/m/IconTabFilter","sap/m/p13n/AbstractContainerItem","sap/ui/Device","sap/m/library","sap/m/StandardListItem","sap/ui/core/library"],(t,e,i,s,a,o,n,r,h,p,d,g)=>{"use strict";const l=p.ButtonType;const y=p.ListType;const _=g.TitleLevel;const c=t.extend("sap.m.p13n.Container",{metadata:{library:"sap.m",properties:{listLayout:{type:"boolean",defaultValue:false}}},renderer:{apiVersion:2}});c.prototype.DEFAULT_KEY="$default";c.prototype.init=function(){t.prototype.init.apply(this,arguments);this.addStyleClass("sapMP13nContainer");this.setListLayout(h.system.phone)};c.prototype.setListLayout=function(t){this.setProperty("listLayout",t);this._getTabBar().removeAllItems();this._getNavigationList().removeAllItems();let i;let s;let a;if(t){this._getTabBar().setVisible(false);this._getNavigationList();this.switchView(this.DEFAULT_KEY);i=this._getNavBackBtn();s=this._getHeaderText()}else{this._getTabBar().setVisible(true);const t=this.getViews();if(t.length>1){this.switchView(t[1].getKey())}a=this._getTabBar()}const o=this.getHeader();if(!o){const t=new e({contentLeft:a?a:[i,s]});this.setHeader(t)}else{o.removeAllContentLeft();if(a){o.addContentLeft(a)}else{o.addContentLeft(i);o.addContentLeft(s)}}this._updateToolbarArialLabelledBy();this.getViews().forEach(t=>{this._addToNavigator(t)});return this};c.prototype.switchView=function(e){t.prototype.switchView.apply(this,arguments);if(this._bPrevented){return}this.getLayout().setShowHeader(e!==this.DEFAULT_KEY);this.getLayout().setShowFooter(e!==this.DEFAULT_KEY);this._getTabBar().setSelectedKey(e);this._getNavBackBtn().setVisible(e!==this.DEFAULT_KEY);const i=this._getHeaderText();i.setText(this.getView(e)?.getText()||e);i.setVisible(this._getNavBackBtn().getVisible());this._updateToolbarArialLabelledBy()};c.prototype._updateToolbarArialLabelledBy=function(){if(this.getListLayout()){const t=this._getHeaderText();const e=this.getHeader();if(t&&e?.getAriaLabelledBy().indexOf(t.getId())==-1){e.addAriaLabelledBy(t)}}};c.prototype.addView=function(e){this._addToNavigator(typeof e=="string"?this.getView(e):e);t.prototype.addView.apply(this,arguments);return this};c.prototype.removeView=function(e){this._removeFromNavigator(typeof e=="string"?this.getView(e):e);t.prototype.removeView.apply(this,arguments);return this};c.prototype.addSeparator=function(){if(!this.getProperty("listLayout")){return}const t=this._getNavigationList().getItems();const e=t[t.length-1];e.addStyleClass("sapMMenuDivider");return this};c.prototype.getLayout=function(){return this.oLayout};c.prototype._getTabBar=function(){if(!this._oTabBar){this._oTabBar=new o({headerBackgroundDesign:"Transparent",applyContentPadding:false,expandable:false,select:t=>{this.switchView(t.getParameter("key"))}});this.addDependent(this._oTabBar)}return this._oTabBar};c.prototype._getNavigationList=function(){if(!this._oNavigationList){this._oNavigationList=new a({itemPress:t=>{const e=t.getParameter("listItem");this.switchView(e._key)}}).addStyleClass("p13nContainerDefaultList");this.addDependent(this._oNavigationList)}if(!this.getView(this.DEFAULT_KEY)){const t=new r({key:this.DEFAULT_KEY,content:this._oNavigationList});this.addView(t)}return this._oNavigationList};c.prototype._getNavBackBtn=function(){if(!this._oNavBackBtn){this._oNavBackBtn=new i({type:l.Back,press:t=>{this.switchView(this.DEFAULT_KEY)}});this.addDependent(this._oNavBackBtn)}return this._oNavBackBtn};c.prototype._getHeaderText=function(){if(!this._oHeaderText){this._oHeaderText=new s({level:h.system.phone?_.H2:_.H1});this.addDependent(this._oHeaderText)}return this._oHeaderText};c.prototype._addToNavigator=function(t){const e=t.getKey();const i=t.getBindingInfo("text");let s=t.getText();const a=t.getIcon();if(i&&i.parts){s={parts:i.parts}}if(e==this.DEFAULT_KEY){return}if(this.getListLayout()){this.getView(this.DEFAULT_KEY);const t=new d({type:y.Navigation,icon:a,title:s});t._key=e;this._getNavigationList().addItem(t)}else{this._getTabBar().addItem(new n({key:e,text:s||e}))}};c.prototype._removeFromNavigator=function(t){const e=t.getKey();if(e==this.DEFAULT_KEY){return}if(this.getListLayout()){const t=this._getNavigationList().getItems().find(t=>t._key===e);this._getNavigationList().removeItem(t)}else{const t=this._getTabBar().getItems().find(t=>t.getKey()===e);this._getTabBar().removeItem(t)}};c.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oTabBar){this._oTabBar.destroy();this._oTabBar=null}if(this._oNavigationList){this._oNavigationList.destroy();this._oNavigationList=null}this._oNavBackBtn=null;this._oHeaderText=null};return c});
//# sourceMappingURL=Container.js.map