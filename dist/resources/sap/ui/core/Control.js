/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CustomStyleClassSupport","./Core","./Element","./ElementRegistry","./UIArea","./StaticArea","./RenderManager","./BusyIndicatorUtils","./BlockLayerUtils","sap/base/future","sap/base/Log","sap/ui/performance/trace/Interaction","sap/ui/thirdparty/jquery"],function(t,e,i,s,o,n,r,a,l,c,u,h,jQuery){"use strict";var d;var y=i.extend("sap.ui.core.Control",{metadata:{stereotype:"control",abstract:true,publicMethods:["placeAt","attachBrowserEvent","detachBrowserEvent","getControlsByFieldGroup","triggerValidateFieldGroup","checkFieldGroupIds"],library:"sap.ui.core",properties:{blocked:{type:"boolean",defaultValue:false},busy:{type:"boolean",defaultValue:false},busyIndicatorDelay:{type:"int",defaultValue:1e3},busyIndicatorSize:{type:"sap.ui.core.BusyIndicatorSize",defaultValue:"Medium"},visible:{type:"boolean",group:"Appearance",defaultValue:true},fieldGroupIds:{type:"string[]",defaultValue:[]}},events:{validateFieldGroup:{enableEventBubbling:true,parameters:{fieldGroupIds:{type:"string[]"}}}}},constructor:function(t,e){this.bAllowTextSelection=true;i.apply(this,arguments);this.bOutput=this.getDomRef()!=null;this._bOnBeforeRenderingPhase=false},renderer:null});y.prototype.clone=function(){var t=i.prototype.clone.apply(this,arguments);if(this.aBindParameters){for(var e=0,s=this.aBindParameters.length;e<s;e++){var o=this.aBindParameters[e];t.attachBrowserEvent(o.sEventType,o.fnHandler,o.oListener!==this?o.oListener:undefined)}}t.bAllowTextSelection=this.bAllowTextSelection;return t};t.apply(y.prototype);y.prototype.isActive=function(){return document.getElementById(this.sId)!=null};function f(t){if(!t||!t.isA){return false}if(t.isA("sap.ui.core.Control")){return t._bRenderingPhase}return f(t.getParent())}y.prototype.invalidate=function(t){var e;if(this._bOnBeforeRenderingPhase){return}this._bNeedsRendering=true;var i=this.getParent();if((this.bOutput||f(i))&&(e=this.getUIArea())){if(!this._bIsBeingDestroyed){e.addInvalidatedControl(this)}}else{if(i&&!i.isInvalidateSuppressed()&&(this.bOutput||!(this.getVisible&&this.getVisible()===false))){i.invalidate(this)}}};y.prototype.rerender=function(){this._bNeedsRendering=true;o.rerenderControl(this)};y.prototype.getDomRef=function(t){if(this.bOutput===false&&!this.oParent){return null}return i.prototype.getDomRef.call(this,t)};y.prototype.allowTextSelection=function(t){this.bAllowTextSelection=t;return this};y.prototype.attachBrowserEvent=function(t,e,i){if(t&&typeof t==="string"){if(typeof e==="function"){if(!this.aBindParameters){this.aBindParameters=[]}i=i||this;var s=e.bind(i);this.aBindParameters.push({sEventType:t,fnHandler:e,oListener:i,fnProxy:s});if(!this._sapui_bInAfterRenderingPhase){this.$().on(t,s)}}}return this};y.prototype.detachBrowserEvent=function(t,e,i){if(t&&typeof t==="string"){if(typeof e==="function"){var s=this.$(),o,n;i=i||this;if(this.aBindParameters){for(o=this.aBindParameters.length-1;o>=0;o--){n=this.aBindParameters[o];if(n.sEventType===t&&n.fnHandler===e&&n.oListener===i){this.aBindParameters.splice(o,1);s.off(t,n.fnProxy)}}}}}return this};y.prototype.getRenderer=function(){return r.getRenderer(this)};y.prototype.placeAt=function(t,s){e.ready(function(){var e=t;if(typeof t==="string"){e=i.getElementById(t)}if(e instanceof i){if(!p(e)){c.warningThrows("placeAt cannot be processed because container "+e+" does not have an aggregation 'content'.");return this}}else{if(t===n.STATIC_UIAREA_ID||t&&t.id===n.STATIC_UIAREA_ID){e=n.getUIArea()}else{e=o.create(t)}}if(typeof s==="number"){e.insertContent(this,s)}else{s=s||"last";switch(s){case"last":e.addContent(this);break;case"first":e.insertContent(this,0);break;case"only":e.removeAllContent();e.addContent(this);break;default:c.warningThrows("Position "+s+" is not supported for function placeAt.")}}}.bind(this));return this};function p(t){var e=t.getMetadata().getAggregation("content");if(e){return e.multiple&&e.type==="sap.ui.core.Control"}return typeof t.addContent==="function"&&typeof t.insertContent==="function"&&typeof t.removeAllContent==="function"}y.prototype.onselectstart=function(t){if(!this.bAllowTextSelection){t.preventDefault();t.stopPropagation()}};y.prototype.onBeforeRendering=function(){return undefined};y.prototype.onAfterRendering=function(){return undefined};y.prototype.getIdForLabel=function(){return this.getId()};y.prototype.destroy=function(t){if(this.bIsDestroyed){return}this._bIsBeingDestroyed=true;this._cleanupBusyIndicator();d=d||sap.ui.require("sap/ui/core/ResizeHandler");if(d){d.deregisterAllForControl(this.getId())}if(!this.getVisible()){var e=document.getElementById(r.createInvisiblePlaceholderId(this));if(e&&e.parentNode){e.parentNode.removeChild(e)}}i.prototype.destroy.call(this,t)};var B={onBeforeRendering:function(){S.call(this);I.call(this)},onAfterRendering:function(){if(this.getBlocked()&&this.getDomRef()&&!this.getDomRef("blockedLayer")){this._oBlockState=l.block(this,this.getId()+"-blockedLayer",this._sBlockSection);jQuery(this._oBlockState.$blockLayer.get(0)).addClass("sapUiBlockLayerOnly")}if(this.getBusy()&&this.getDomRef()&&!this._busyIndicatorDelayedCallId&&!this.getDomRef("busyIndicator")){var t=this.getBusyIndicatorDelay();if(t){this._busyIndicatorDelayedCallId=setTimeout(b.bind(this),t)}else{b.call(this,true)}}}};function g(){if(this._oBusyBlockState&&this.getDomRef(this._sBusySection)?.contains(document.activeElement)){this._oBusyBlockState.lastFocusPosition=document.activeElement;this._oBusyBlockState.$blockLayer.get(0).focus({preventScroll:true})}}function b(t){if(!this.getBusy()){return}var e=this.$(this._sBusySection);if(this._busyIndicatorDelayedCallId){clearTimeout(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId}if(!e||e.length===0){u.warning("BusyIndicator could not be rendered. The outer control instance is not valid anymore.");return}if(this._sBlockSection===this._sBusySection){if(this._oBlockState){a.addHTML(this._oBlockState,this.getBusyIndicatorSize());l.toggleAnimationStyle(this._oBlockState,true);this._oBusyBlockState=this._oBlockState}else{_.call(this)}}else{_.call(this)}if(t){setTimeout(g.bind(this),0)}else{g.call(this)}}function k(){this._oBlockState=l.block(this,this.getId()+"-blockedLayer",this._sBlockSection);jQuery(this._oBlockState.$blockLayer.get(0)).addClass("sapUiBlockLayerOnly")}function _(){if(this._oBusyBlockState){l.unblock(this._oBusyBlockState)}this._oBusyBlockState=l.block(this,this.getId()+"-busyIndicator",this._sBusySection);a.addHTML(this._oBusyBlockState,this.getBusyIndicatorSize())}function I(){l.unblock(this._oBlockState);l.unblock(this._oBusyBlockState);delete this._oBlockState;delete this._oBusyBlockState}function S(t){if(t){I.call(this);return}let e;if(this._oBusyBlockState){const t=this._oBusyBlockState.$blockLayer.get(0);if(t===document.activeElement){if(jQuery(this._oBusyBlockState.lastFocusPosition).is(":sapFocusable")){e=this._oBusyBlockState.lastFocusPosition}else{e=i.closestTo(this._oBusyBlockState.lastFocusPosition)||this}e.focus()}}const s=this.$(this._sBusySection);s.removeClass("sapUiLocalBusy");s.removeAttr("aria-busy");if(this._sBlockSection===this._sBusySection){if(!this.getBlocked()&&!this.getBusy()){I.call(this)}else if(this.getBlocked()){if(this._oBlockState||this._oBusyBlockState){l.toggleAnimationStyle(this._oBlockState||this._oBusyBlockState,false);this._oBlockState=this._oBusyBlockState}}else if(this._oBusyBlockState){l.unblock(this._oBusyBlockState);delete this._oBusyBlockState}}else if(this._oBusyBlockState){l.unblock(this._oBusyBlockState);delete this._oBusyBlockState}}y.prototype.setBlocked=function(t,e){if(!!t==this.getProperty("blocked")){return this}this._sBlockSection=e||this._sBlockSection;this.setProperty("blocked",t,true);if(t){this.addDelegate(B,false,this)}else if(!this.getBusy()){this.removeDelegate(B)}if(!this.getDomRef()){return this}if(t){if(this._sBlockSection===this._sBusySection){if(!this._oBusyBlockState&&!this._oBlockState){k.call(this)}else{u.info("The control is already busy. Hence, no new block-layer was created for the shared section.")}}else{k.call(this)}}else{if(this._sBlockSection===this._sBusySection){if(!this.getBlocked()&&!this.getBusy()){I.call(this)}else if(this.getBusy()){u.info("The control is already busy. Hence, no new block-layer was created for the shared section.")}}else if(this._oBlockState){l.unblock(this._oBlockState);delete this._oBlockState}}return this};y.prototype.getBlocked=function(){return this.getProperty("blocked")};y.prototype.setBusy=function(t,e){if(!!t==this.getProperty("busy")){return this}this._sBusySection=e||this._sBusySection;this.setProperty("busy",t,true);if(t){h.notifyShowBusyIndicator(this);this.addDelegate(B,false,this)}else{if(!this.getProperty("blocked")){this.removeDelegate(B)}if(this._busyIndicatorDelayedCallId){clearTimeout(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId}}if(!this.getDomRef()){return this}if(t){if(this.getBusyIndicatorDelay()<=0){b.call(this)}else{this._busyIndicatorDelayedCallId=setTimeout(b.bind(this),this.getBusyIndicatorDelay())}}else{S.call(this);h.notifyHideBusyIndicator(this)}return this};y.prototype.isBusy=y.prototype.getBusy;y.prototype.setBusyIndicatorDelay=function(t){this.setProperty("busyIndicatorDelay",t,true);return this};y.prototype._cleanupBusyIndicator=function(){if(this._busyIndicatorDelayedCallId){clearTimeout(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId}S.call(this,true)};y.prototype.getControlsByFieldGroupId=function(t){return this.findAggregatedObjects(true,function(e){if(e instanceof y){return e.checkFieldGroupIds(t)}return false})};y.prototype.checkFieldGroupIds=function(t){if(typeof t==="string"){t=t?t.split(","):[]}var e=this._getFieldGroupIds();if(Array.isArray(t)){return t.every(function(t){return e.indexOf(t)>=0})}else if(!t){return e.length>0}return false};y.prototype.triggerValidateFieldGroup=function(t){this.fireValidateFieldGroup({fieldGroupIds:t})};y.getControlsByFieldGroupId=function(t){return s.filter(e=>e.isA("sap.ui.core.Control")&&e.checkFieldGroupIds(t))};return y});
//# sourceMappingURL=Control.js.map