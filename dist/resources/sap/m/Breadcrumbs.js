/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/Lib","sap/ui/dom/units/Rem","sap/ui/core/theming/Parameters","sap/ui/util/openWindow","sap/m/Text","sap/m/Link","sap/m/Select","sap/ui/core/Item","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/Device","sap/m/library","./BreadcrumbsRenderer","sap/ui/base/ManagedObject","sap/ui/core/InvisibleText"],function(t,e,i,r,n,o,s,a,l,h,u,c,g,p,d,_,f,m){"use strict";var I=d.SelectType,C=d.BreadcrumbsSeparatorStyle,b=i.getResourceBundleFor("sap.m"),v=4;var y=t.extend("sap.m.Breadcrumbs",{metadata:{library:"sap.m",interfaces:["sap.m.IBreadcrumbs","sap.m.IOverflowToolbarContent","sap.m.IToolbarInteractiveControl","sap.ui.core.IShrinkable"],designtime:"sap/m/designtime/Breadcrumbs.designtime",properties:{currentLocationText:{type:"string",group:"Data",defaultValue:null},separatorStyle:{type:"sap.m.BreadcrumbsSeparatorStyle",group:"Appearance",defaultValue:C.Slash}},aggregations:{currentLocation:{type:"sap.m.Link",multiple:false},links:{type:"sap.m.Link",multiple:true,singularName:"link"},_currentLocation:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},defaultAggregation:"links",associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:_});y.STYLE_MAPPER={Slash:"/",BackSlash:"\\",DoubleSlash:"//",DoubleBackSlash:"\\\\",GreaterThan:">",DoubleGreaterThan:">>"};y._getResourceBundleText=function(t,e){return b.getText(t,e)};y.prototype.init=function(){this._sSeparatorSymbol=y.STYLE_MAPPER[this.getSeparatorStyle()];this._aCachedInvisibleTexts=[];this._getInvisibleText();this.MIN_WIDTH_IN_OFT=parseInt(n.get({name:"_sap_m_Breadcrumbs_MinWidth_OFT",callback:function(t){this.MIN_WIDTH_IN_OFT=parseInt(t);this._iMinWidth=this.MIN_WIDTH_IN_OFT}.bind(this)}));this._iMinWidth=this.MIN_WIDTH_IN_OFT};y.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(this._sResizeListenerId){c.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._bControlsInfoCached){this._updateSelect(true)}this._destroyInvisibleTexts();this._aCachedInvisibleTexts=this._buildInvisibleTexts()};y.prototype.onAfterRendering=function(){if(!this._sResizeListenerId){this._sResizeListenerId=c.register(this,this._handleScreenResize.bind(this))}if(!this._bControlsInfoCached){this._updateSelect(true);return}this._configureKeyboardHandling();this._setMinWidth();this.bRenderingPhase=false};y.prototype.focus=function(){setTimeout(()=>{t.prototype.focus.apply(this,arguments)},0)};y.prototype._setMinWidth=function(){var t=this.getCurrentLocation(),e,i;if(this.$().hasClass("sapMTBShrinkItem")){if(!this._iMinWidth||this._iMinWidth!==this.MIN_WIDTH_IN_OFT){return}this.$().removeClass("sapMTBShrinkItem");e=t.$().width();i=r.toPx(n.get({name:"_sap_m_Toolbar_ShrinkItem_MinWidth",callback:function(t){i=r.toPx(t)}}));this.$().addClass("sapMTBShrinkItem");if(e>i){this.$().css("min-width",e)}this.fireEvent("_minWidthChange");this._iMinWidth=e}};y.prototype.onThemeChanged=function(){this._resetControl()};y.prototype.exit=function(){this._resetControl();this._destroyItemNavigation();this._destroyInvisibleTexts();if(this._oInvisibleText){this._oInvisibleText.destroy();this._oInvisibleText=null}};y.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;y.prototype._getAugmentedId=function(t){return this.getId()+"-"+t};y.prototype._getInvisibleText=function(){var t=y._getResourceBundleText("BREADCRUMB_LABEL");if(!this._oInvisibleText){this._oInvisibleText=new m({id:this.getId()+"-InvisibleText"});this._oInvisibleText.setText(t).toStatic()}return this._oInvisibleText};y.prototype._getSelect=function(){if(!this.getAggregation("_select")){this.setAggregation("_select",this._decorateSelect(new l({id:this._getAugmentedId("select"),change:this._selectChangeHandler.bind(this),forceSelection:false,autoAdjustWidth:true,icon:g.getIconURI("slim-arrow-down"),type:I.IconOnly,tooltip:y._getResourceBundleText("BREADCRUMB_SELECT_TOOLTIP")})),true)}return this.getAggregation("_select")};y.prototype._getCurrentLocation=function(){if(!this.getAggregation("_currentLocation")){var t=new s({id:this._getAugmentedId("currentText"),text:this.getCurrentLocationText()}).addStyleClass("sapMBreadcrumbsCurrentLocation");t.addEventDelegate({onAfterRendering:function(){this._setCurrentLocationAccInfo(t)}.bind(this)});this.setAggregation("_currentLocation",t).addStyleClass("sapMBreadcrumbsCurrentLocation")}return this.getAggregation("_currentLocation")};y.prototype.setCurrentLocation=function(t){if(t){t.addStyleClass("sapMBreadcrumbsCurrentLocation")}return this.setAggregation("currentLocation",t)};y.prototype.getCurrentLocation=function(){var t=this.getAggregation("currentLocation");if(!t||!t.getText()){return this._getCurrentLocation()}return t};y.prototype._setCurrentLocationAccInfo=function(t){var e=this._getControlsForBreadcrumbTrail(),i=y._getResourceBundleText("BREADCRUMB_ITEM_POS",[e.length,e.length]);t.$().attr("aria-current","page");t.$().attr("tabindex",0);t.$().attr("role","link");t.$().attr("aria-label",this.getCurrentLocation().getText()+" "+i)};function S(t,e){var i=Array.prototype.slice.apply(e);i.unshift(t);return i}y.prototype.insertLink=function(t,e){var i=this.insertAggregation.apply(this,S("links",arguments));this._registerControlListener(t);this._resetControl();return i};y.prototype.addLink=function(t){var e=this.addAggregation.apply(this,S("links",arguments));this._registerControlListener(t);this._resetControl();return e};y.prototype.removeLink=function(t){var e=this.removeAggregation.apply(this,S("links",arguments));this._deregisterControlListener(e);this._resetControl();return e};y.prototype.removeAllLinks=function(){var t=this.getAggregation("links",[]);var e=this.removeAllAggregation.apply(this,S("links",arguments));t.forEach(this._deregisterControlListener,this);this._resetControl();return e};y.prototype.destroyLinks=function(){var t=this.getAggregation("links",[]);var e=this.destroyAggregation.apply(this,S("links",arguments));t.forEach(this._deregisterControlListener,this);this._resetControl();return e};y.prototype._destroyInvisibleTexts=function(){var t;this._aCachedInvisibleTexts.forEach(function(i){t=e.getElementById(i.controlId);if(t&&t.removeAriaLabelledBy){t.removeAriaLabelledBy(i.invisibleText.getId())}i.invisibleText.destroy()});this._aCachedInvisibleTexts=[]};y.prototype._decorateSelect=function(t){t.getPicker().attachAfterOpen(this._removeItemNavigation,this).attachBeforeClose(this._restoreItemNavigation,this);if(!p.system.phone){t.getPicker().setOffsetY(v)}t._onBeforeOpenDialog=this._onSelectBeforeOpenDialog.bind(this);t._onBeforeOpenPopover=this._onSelectBeforeOpenPopover.bind(this);t.onsapescape=this._onSelectEscPress.bind(this);return t};y.prototype._removeItemNavigation=function(){this.removeDelegate(this._getItemNavigation())};y.prototype._onSelectBeforeOpenDialog=function(){var t=this._getSelect();if(this.getCurrentLocation().getText()&&p.system.phone){t.setSelectedIndex(0)}else{t.setSelectedItem(null)}l.prototype._onBeforeOpenDialog.call(t);this._removeItemNavigation()};y.prototype._onSelectBeforeOpenPopover=function(){this._getSelect().setSelectedItem(null);this._removeItemNavigation()};y.prototype._restoreItemNavigation=function(){this.addDelegate(this._getItemNavigation())};y.prototype._onSelectEscPress=function(){this._getSelect().close()};y.prototype._createSelectItem=function(t){return new h({key:t.getId(),text:f.escapeSettingsValue(t.getText())})};y.prototype._selectChangeHandler=function(t){var i,r,n,s=t.getParameter("selectedItem");if(!s){return}if(!this._getSelect().isOpen()){return}i=e.getElementById(s.getKey());if(!(i instanceof a)){return}r=i.getHref();n=i.getTarget();i.firePress();if(r){if(n){o(r,n)}else{window.location.href=r}}};y.prototype._getItemsForMobile=function(){var t=this.getLinks().filter(function(t){return t.getVisible()});if(this.getCurrentLocation().getText()){t.push(this.getCurrentLocation())}return t};y.prototype._updateSelect=function(t){var e=this._getSelect(),i,r=this._getControlDistribution();if(!this._bControlDistributionCached||t){e.destroyItems();i=p.system.phone?this._getItemsForMobile():r.aControlsForSelect;i.map(this._createSelectItem).reverse().forEach(e.insertItem,e);this._bControlDistributionCached=true;this.invalidate(this)}e.setVisible(!!r.aControlsForSelect.length);if(!this._sResizeListenerId&&!this.bRenderingPhase){this._sResizeListenerId=c.register(this,this._handleScreenResize.bind(this))}};y.prototype._getControlsForBreadcrumbTrail=function(){var t;if(this._bControlDistributionCached&&this._oDistributedControls){return this._oDistributedControls.aControlsForBreadcrumbTrail}t=this.getLinks().filter(function(t){return t.getVisible()});if(this.getCurrentLocation().getText()){return t.concat([this.getCurrentLocation()])}return t};y.prototype._getControlInfo=function(t){return{id:t.getId(),control:t,width:T(t.$().parent()),bCanOverflow:t instanceof a}};y.prototype._buildInvisibleTexts=function(){var t=this._getControlsForBreadcrumbTrail(),e=t.length,i,r=[];t.forEach(function(t,n){if(!t.isA("sap.m.Link")){return}i=new m({text:y._getResourceBundleText("BREADCRUMB_ITEM_POS",[n+1,e])}).toStatic();if(t.getAriaLabelledBy().indexOf(t.getId())===-1){t.addAriaLabelledBy(t.getId())}t.addAriaLabelledBy(i.getId());r.push({controlId:t.getId(),invisibleText:i})});return r};y.prototype._getControlDistribution=function(t){t=t||this._iContainerSize;this._iContainerSize=t;this._oDistributedControls=this._determineControlDistribution(t);return this._oDistributedControls};y.prototype._getSelectWidth=function(){return this._getSelect().getVisible()&&this._iSelectWidth||0};y.prototype._determineControlDistribution=function(t){var e,i,r=this._getControlsInfo().aControlInfo,n=this._getSelectWidth(),o=[],s=[],a=n;for(e=r.length-1;e>=0;e--){i=r[e];a+=i.width;if(r.length-1===e){s.push(i.control);continue}if(e===0){a-=n}if(a>t&&i.bCanOverflow){o.unshift(i.control)}else{s.unshift(i.control)}}return{aControlsForBreadcrumbTrail:s,aControlsForSelect:o}};y.prototype._getControlsInfo=function(){if(!this._bControlsInfoCached){this._iSelectWidth=T(this._getSelect().$().parent())||0;this._aControlInfo=this._getControlsForBreadcrumbTrail().map(this._getControlInfo);this._iContainerSize=Math.ceil(T(this.$()));this._bControlsInfoCached=true}return{aControlInfo:this._aControlInfo,iSelectWidth:this._iSelectWidth,iContentSize:this._iContainerSize}};y.prototype._handleScreenResize=function(t){var e,i,r;if(t.size.width===t.oldSize.width||t.size.width===0){return this}e=this._oDistributedControls.aControlsForBreadcrumbTrail.length;i=this._getControlDistribution(Math.ceil(T(this.$())));r=i.aControlsForBreadcrumbTrail.length;if(e!==r){this._updateSelect(true)}return this};y.prototype._getItemsToNavigate=function(){var t=this._getControlsForBreadcrumbTrail().slice(),e=this._getSelect();if(e.getVisible()){t.unshift(e)}return t};y.prototype._getItemNavigation=function(){if(!this._itemNavigation){this._itemNavigation=new u}return this._itemNavigation};y.prototype._destroyItemNavigation=function(){if(this._itemNavigation){this.removeEventDelegate(this._itemNavigation);this._itemNavigation.destroy();this._itemNavigation=null}};y.prototype._configureKeyboardHandling=function(){var t=this._getItemNavigation(),e=-1,i=this._getItemsToNavigate(),r=[],n=false,o;if(i.length===0){return}i.forEach(function(t){o=t.getFocusDomRef();if(o){n=t.isA("sap.m.Link")&&!t.getEnabled();if(!n){r.push(o)}}});this.addDelegate(t);t.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt"],sapend:["alt"]});t.setCycling(false);t.setPageSize(y.PAGEUP_AND_PAGEDOWN_JUMP_SIZE);t.setRootDomRef(this.getDomRef());t.setItemDomRefs(r);t.setSelectedIndex(e);return this};y.prototype._registerControlListener=function(t){if(t){t.attachEvent("_change",this._resetControl,this)}};y.prototype._deregisterControlListener=function(t){if(t){t.detachEvent("_change",this._resetControl,this)}};y.prototype.setCurrentLocationText=function(t){var e=this._getCurrentLocation(),i=this.setProperty("currentLocationText",t,true);if(e.getText()!==t){e.setText(t);this._iMinWidth=this.MIN_WIDTH_IN_OFT;this._resetControl()}return i};y.prototype.setSeparatorStyle=function(t){this.setProperty("separatorStyle",t);var e=y.STYLE_MAPPER[this.getSeparatorStyle()];if(e){this._sSeparatorSymbol=e}return this};y.prototype._resetControl=function(){this._aControlInfo=null;this._iContainerSize=null;this._bControlsInfoCached=null;this._bControlDistributionCached=null;this._oDistributedControls=null;if(this._sResizeListenerId){c.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.removeDelegate(this._getItemNavigation());this.invalidate(this);return this};y.prototype.getOverflowToolbarConfig=function(){var t={canOverflow:true,getCustomImportance:function(){return"Medium"},invalidationEvents:["_minWidthChange"],onAfterExitOverflow:this._onAfterExitOverflow.bind(this)};return t};y.prototype._onAfterExitOverflow=function(){this._resetControl()};y.prototype._getToolbarInteractive=function(){return true};function T(t){var e;if(t.length){e=t.outerWidth(true)-t.outerWidth();return t.get(0).getBoundingClientRect().width+e}}return y});
//# sourceMappingURL=Breadcrumbs.js.map