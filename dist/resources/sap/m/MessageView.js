/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/core/Messaging","sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/CustomData","sap/ui/core/IconPool","sap/ui/core/HTML","sap/ui/core/Icon","./Button","./Toolbar","./ToolbarSpacer","./List","./MessageListItem","./library","./Text","./SegmentedButton","./Page","./NavContainer","./Link","./MessageItem","./GroupHeaderListItem","sap/ui/core/InvisibleText","sap/ui/core/library","sap/ui/core/message/MessageType","sap/ui/base/ManagedObject","./MessageViewRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/base/security/URLListValidator","sap/ui/thirdparty/caja-html-sanitizer"],function(e,t,jQuery,i,s,a,n,o,r,l,u,p,c,g,h,d,_,f,m,y,v,I,L,T,M,P,C,B,S){"use strict";var w=L.ValueState;var D=g.ListType;var E=i.extend("sap.m.MessageView",{metadata:{library:"sap.m",properties:{asyncDescriptionHandler:{type:"function",group:"Behavior",defaultValue:null},asyncURLHandler:{type:"function",group:"Behavior",defaultValue:null},groupItems:{type:"boolean",group:"Behavior",defaultValue:false},showDetailsPageHeader:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MessageItem",multiple:true,singularName:"item"},headerButton:{type:"sap.m.Button",multiple:false},_navContainer:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}},deprecated:true},itemSelect:{parameters:{item:{type:"sap.m.MessageItem"},messageTypeFilter:{type:"sap.ui.core.MessageType"}}},listSelect:{parameters:{messageTypeFilter:{type:"sap.ui.core.MessageType"}}},longtextLoaded:{},urlValidated:{},activeTitlePress:{parameters:{item:{type:"sap.m.MessageItem"}}}}},renderer:P});var H="sapMMsgView";var k={back:a.getIconURI("nav-back"),close:a.getIconURI("decline"),information:a.getIconURI("information"),warning:a.getIconURI("alert"),error:a.getIconURI("error"),success:a.getIconURI("sys-enter-2")};var A=["all","error","warning","success","information"];var b=["asyncDescriptionHandler","asyncURLHandler"];var V={asyncDescriptionHandler:function(e){var t=e.item.getLongtextUrl();if(t){jQuery.ajax({type:"GET",url:t,success:function(t){e.item.setDescription(t);e.promise.resolve()},error:function(){var i="A request has failed for long text data. URL: "+t;B.error(i);e.promise.reject(i)}})}}};E.setDefaultHandlers=function(e){b.forEach(function(t){if(e.hasOwnProperty(t)){V[t]=e[t]}})};E.prototype.init=function(){var t=this;this._bHasHeaderButton=false;this._oResourceBundle=e.getResourceBundleFor("sap.m");this._createNavigationPages();this._createLists();b.forEach(function(e){if(V.hasOwnProperty(e)){t.setProperty(e,V[e])}})};E.prototype._afterNavigate=function(){setTimeout(this["_restoreFocus"].bind(this),0);setTimeout(this["_restoreItemsType"].bind(this),0)};E.prototype._restoreFocus=function(){if(this._isListPage()&&this.getItems().length){this._oLists[this._sCurrentList||"all"].focus()}else if(this._oBackButton){this._oBackButton.focus()}};E.prototype._restoreItemsType=function(){if(this._isListPage()&&this.getItems().length>1){var e=this;this._oLists[this._sCurrentList||"all"].getItems().forEach(function(t){if(t.isA("sap.m.MessageListItem")){e._setItemType(t)}})}};E.prototype._setItemType=function(e){var t=e.getTitleRef();if(t&&t.offsetWidth<t.scrollWidth){e.setType(D.Navigation);if(this.getItems().length===1){this._fnHandleForwardNavigation(e,"show")}}};E.prototype.onBeforeRendering=function(){var e,t,i=this.getItems();this._clearLists();this._detailsPage.setShowHeader(this.getShowDetailsPageHeader());if(this.getGroupItems()){e=this._groupItems(i);this._fillGroupedLists(e)}else{this._fillLists(i)}var s=this.getHeaderButton();if(s){this._bHasHeaderButton=true;this._oListHeader.insertContent(s,2)}this._clearSegmentedButton();this._fillSegmentedButton();this._fnFilterList(this._getCurrentMessageTypeFilter()||"all");t=this._oLists.all.getItems().filter(function(e){return e.isA("sap.m.MessageListItem")});if(t.length===1&&t[0].getType()===D.Navigation){if(this._navContainer.getCurrentPage()!==this._detailsPage){this._fnHandleForwardNavigation(t[0],"show");this._navContainer._pageStack[this._navContainer._pageStack.length-1].transition="slide"}}else if(t.length===0){this._navContainer.backToTop()}this._makeAutomaticBinding()};E.prototype._updateDescription=function(e){if(!this._isListPage()&&e._oListItem){this._updateDescriptionPage(e,e._oListItem)}};E.prototype._updateDescriptionPage=function(e,t){this._clearDetailsPage();this._setTitle(e,t);this._setDescription(e);this._setIcon(e,t);this._detailsPage.invalidate()};E.prototype._fillGroupedLists=function(e){var t=Object.keys(e),i=t.indexOf(""),s;if(i!==-1){s=e[""];this._fillLists(s);delete e[""];t.splice(i,1)}t.forEach(function(t){this._fillListsWithGroups(t,e[t])},this)};E.prototype._fillListsWithGroups=function(e,t){var i=new v({title:e});this._oLists["all"].addItemGroup(null,i,true);["error","warning","success","information"].forEach(function(e){if(this._hasGroupItemsOfType(t,e)){this._oLists[e].addItemGroup(null,i.clone(),true)}},this);this._fillLists(t)};E.prototype._hasGroupItemsOfType=function(e,t){return e.some(function(e){return e.getType().toLowerCase()===t})};E.prototype.exit=function(){if(this._oLists){this._destroyLists()}if(this._oMessageItemTemplate){this._oMessageItemTemplate.destroy()}this._oResourceBundle=null;this._oListHeader=null;this._oDetailsHeader=null;this._oSegmentedButton=null;this._oBackButton=null;this._navContainer=null;this._listPage=null;this._detailsPage=null;this._sCurrentList=null};E.prototype._makeAutomaticBinding=function(){var e=this.getItems();if(!this.getBindingInfo("items")&&!e.length){this._bindToMessageModel()}};E.prototype._bindToMessageModel=function(){var e=this;this.setModel(t.getMessageModel(),"message");this._oMessageItemTemplate=new y({type:"{message>type}",title:"{message>message}",description:"{message>description}",longtextUrl:"{message>longtextUrl}"});this.bindAggregation("items",{path:"message>/",template:e._oMessageItemTemplate})};E.prototype._groupItems=function(e){var t={},i;e.forEach(function(e){i=e.getGroupName();t[i]=t[i]||[];t[i].push(e)});return t};E.prototype._onkeypress=function(e){if(e.shiftKey&&e.keyCode==C.ENTER){this.navigateBack()}};E.prototype._getListHeader=function(){return this._oListHeader||this._createListHeader()};E.prototype._getDetailsHeader=function(){return this._oDetailsHeader||this._createDetailsHeader()};E.prototype._createListHeader=function(){var e=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE");var t=this.getId()+"-CloseBtnDescr";var i=new n(t,{content:'<span id="'+t+'" class="sapMMsgViewHiddenContainer">'+e+"</span>"});var s=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_HEADING"),a=this.getId()+"-HeadingDescr",o=I.getStaticId("sap.m","MESSAGEVIEW_SEGMENTED_BTN_DESCRIPTION"),r=new n(a,{content:'<span id="'+a+'" class="sapMMsgViewHiddenContainer" role="heading">'+s+"</span>"});this._oSegmentedButton=new d(this.getId()+"-segmented",{ariaLabelledBy:o}).addStyleClass("sapMSegmentedButtonNoAutoWidth");this._oListHeader=new l({content:[this._oSegmentedButton,new u,i,r]});return this._oListHeader};E.prototype._createDetailsHeader=function(){var e=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE");var t=this.getId()+"-CloseBtnDetDescr";var i=new n(t,{content:'<span id="'+t+'" class="sapMMsgViewHiddenContainer">'+e+"</span>"});var s=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_BACK_BUTTON_TOOLTIP");var a=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_BACK_BUTTON");var o=this.getId()+"-BackBtnDetDescr";var p=new n(o,{content:'<span id="'+o+'" class="sapMMsgViewHiddenContainer">'+a+"</span>"});this._oBackButton=new r({icon:k["back"],press:this.navigateBack.bind(this),ariaLabelledBy:p,tooltip:s}).addStyleClass(H+"BackBtn");this._oDetailsHeader=new l({content:[this._oBackButton,new u,i,p]});return this._oDetailsHeader};E.prototype._createNavigationPages=function(){this._listPage=new _(this.getId()+"listPage",{customHeader:this._getListHeader()});this._detailsPage=new _(this.getId()+"-detailsPage",{customHeader:this._getDetailsHeader()}).addStyleClass("sapMMsgViewDetailsPage");this._detailsPage.addEventDelegate({onclick:function(e){var t=e.target;if(t.nodeName.toUpperCase()==="A"&&(t.className.indexOf("sapMMsgViewItemDisabledLink")!==-1||t.className.indexOf("sapMMsgViewItemPendingLink")!==-1)){e.preventDefault()}}});this._navContainer=new f(this.getId()+"-navContainer",{initialPage:this.getId()+"listPage",pages:[this._listPage,this._detailsPage],afterNavigate:this._afterNavigate.bind(this)});this.setAggregation("_navContainer",this._navContainer);return this};E.prototype._createLists=function(){this._oLists={};A.forEach(function(e){this._oLists[e]=new p({itemPress:this._fnHandleItemPress.bind(this),visible:false});this._listPage.addAggregation("content",this._oLists[e],true)},this);return this};E.prototype._clearLists=function(){A.forEach(function(e){if(this._oLists[e]){this._oLists[e].destroyAggregation("items",true)}},this);return this};E.prototype._destroyLists=function(){A.forEach(function(e){this._oLists[e]=null},this);this._oLists=null};E.prototype._fillLists=function(e){e.forEach(function(e){var t=this._mapItemToListItem(e),i=this._mapItemToListItem(e);this._oLists["all"].addAggregation("items",t,true);this._oLists[e.getType().toLowerCase()].addAggregation("items",i,true)},this)};E.prototype._mapItemToListItem=function(e){if(!e){return null}var t=e.getType(),i=this,s=this._getItemType(e),a=new c({title:M.escapeSettingsValue(e.getTitle()),description:M.escapeSettingsValue(e.getSubtitle()),counter:e.getCounter(),icon:this._mapIcon(t),infoState:this._mapInfoState(t),info:"",type:s,messageType:e.getType(),activeTitle:e.getActiveTitle(),activeTitlePress:function(){i.fireActiveTitlePress({item:e})}}).addStyleClass(H+"Item").addStyleClass(H+"Item"+t).toggleStyleClass(H+"ItemActive",e.getActiveTitle());if(s!==D.Navigation){a.addEventDelegate({onAfterRendering:function(){i._setItemType(a)}},this)}a._oMessageItem=e;e._oListItem=a;return a};E.prototype._mapInfoState=function(e){if(!e){return null}switch(e){case T.Warning:return w.Warning;case T.Error:return w.Error;case T.Success:return w.Success;case T.Information:case T.None:return w.None;default:B.warning("The provided MessageType is not mapped to a specific ValueState",e);return null}};E.prototype._mapIcon=function(e){if(!e){return null}return k[e.toLowerCase()]};E.prototype._getItemType=function(e){return e.getDescription()||e.getMarkupDescription()||e.getLongtextUrl()?D.Navigation:D.Inactive};E.prototype._clearSegmentedButton=function(){if(this._oSegmentedButton){this._oSegmentedButton.destroyAggregation("buttons",true)}return this};E.prototype._fillSegmentedButton=function(){var e=this;var t=function(t){return function(){e._fnFilterList(t)}};A.forEach(function(e){var i=this._oLists[e],s=e=="all"?"MESSAGEPOPOVER_ALL":"MESSAGEVIEW_BUTTON_TOOLTIP_"+e.toUpperCase(),a=i.getItems().filter(function(e){return e instanceof c}).length,n;if(a>0){n=new r(this.getId()+"-"+e,{text:e=="all"?this._oResourceBundle.getText(s):a,tooltip:e==="all"?"":this._oResourceBundle.getText(s),icon:k[e],press:t(e)}).addStyleClass(H+"Btn"+e.charAt(0).toUpperCase()+e.slice(1));this._oSegmentedButton.addButton(n,true)}},this);var i=this._oSegmentedButton.getButtons().length>2;this._oSegmentedButton.setVisible(i);if(!i){this._oSegmentedButton.setSelectedButton(this._oSegmentedButton.getButtons()[0]);this._fnFilterList("all")}var s=i||this._bHasHeaderButton;this._listPage.setShowHeader(s);return this};E.prototype._setIcon=function(e,t){this._previousIconTypeClass=H+"DescIcon"+e.getType();this._oMessageIcon=new o({src:t.getIcon()}).addStyleClass(H+"DescIcon").addStyleClass(this._previousIconTypeClass);this._detailsPage.addContent(this._oMessageIcon)};E.prototype._setTitle=function(e,t){var i=e.getActiveTitle(),s,a=this,n=M.escapeSettingsValue(e.getTitle()),o=this.getId()+"MessageTitleText";if(i){s=new m(o,{text:n,ariaDescribedBy:t.getId()+"-link",press:function(){a.fireActiveTitlePress({item:e})}})}else{s=new h(o,{text:n})}s.addStyleClass("sapMMsgViewTitleText");this._detailsPage.addAggregation("content",s)};E.prototype._setDescription=function(e){var t=e.getLink();var i=e.getDescription();if(e.getMarkupDescription()){var s=this._getTagPolicy();i=html.sanitizeWithPolicy(i,s)}this._oLastSelectedItem=e;if(e.getMarkupDescription()){this._oMessageDescriptionText=new n(this.getId()+"MarkupDescription",{content:"<div class='sapMMsgViewDescriptionText'>"+M.escapeSettingsValue(i)+"</div>"})}else{this._oMessageDescriptionText=new h(this.getId()+"MessageDescriptionText",{text:M.escapeSettingsValue(i)}).addStyleClass("sapMMsgViewDescriptionText")}this._detailsPage.addContent(this._oMessageDescriptionText);if(t){var a=this._createLinkCopy(t);this._detailsPage.addContent(a);a.addStyleClass("sapMMsgViewDescriptionLink")}};E.prototype._createLinkCopy=function(e){var t,i=e.clone("","",{cloneChildren:false,cloneBindings:false}),a=e.getCustomData()||[];t=Object.keys(e.getMetadata().getProperties());t.forEach(function(t){i.setProperty(t,e.getProperty(t))});i.destroyCustomData();a.forEach(function(e){var t=new s({key:e.getKey(),value:e.getValue()});i.addCustomData(t)});return i};E.prototype._iNextValidationTaskId=0;E.prototype._validateURL=function(e){if(S.validate(e)){return e}B.warning("You have entered invalid URL");return""};E.prototype._queueValidation=function(e){var t=this.getAsyncURLHandler();var i=++this._iNextValidationTaskId;var s={};var a=new Promise(function(a,n){s.resolve=a;s.reject=n;var o={url:e,id:i,promise:s};setTimeout(()=>{t(o)},0)});a.id=i;return a};E.prototype._getTagPolicy=function(){var e=this,t;var i=html.makeTagPolicy(this._validateURL());return function s(a,n){var o,r=false;if(a.toUpperCase()==="A"){for(t=0;t<n.length;){if(n[t]==="href"){r=true;o=n[t+1];n.splice(0,2);continue}t+=2}}n=i(a,n);if(r&&typeof e.getAsyncURLHandler()==="function"){n=n||[];var l="sapMMsgViewItemDisabledLink sapMMsgViewItemPendingLink sapMLnk";var u=n.indexOf("class");if(u>-1){n[u+1]+=l}else{n.unshift(l);n.unshift("class")}var p=n.indexOf("id");if(p>-1){n.splice(p+1,1);n.splice(p,1)}var c=e._queueValidation(o);n.push("href");n.push(o);n.push("target");n.push("_blank");n.push("id");n.push("sap-ui-"+e.getId()+"-link-under-validation-"+c.id);c.then(function(t){var i=jQuery(document.getElementById("sap-ui-"+e.getId()+"-link-under-validation-"+t.id));if(t.allowed){B.info("Allow link "+o)}else{B.info("Disallow link "+o)}i.removeClass("sapMMsgViewItemPendingLink");i.toggleClass("sapMMsgViewItemDisabledLink",!t.allowed);e.fireUrlValidated()}).catch(function(){B.warning("Async URL validation could not be performed.")})}return n}};E.prototype._fnHandleForwardNavigation=function(e,t){var i=e._oMessageItem,s=this.getAsyncDescriptionHandler();this._previousIconTypeClass=this._previousIconTypeClass||"";this.fireItemSelect({item:i,messageTypeFilter:this._getCurrentMessageTypeFilter()});this._clearDetailsPage.call(this);if(typeof s==="function"&&i.getLongtextUrl()){i.setMarkupDescription(true);var a={};var n=new Promise(function(e,t){a.resolve=e;a.reject=t});var o=function(){this._clearDetailsPage.call(this);this._detailsPage.setBusy(false);this._navigateToDetails.call(this,i,e,t,true)}.bind(this);n.then(o).catch(function(){B.warning("Async description loading could not be performed.");o()});this._navContainer.to(this._detailsPage);this._detailsPage.setBusy(true);s({promise:a,item:i})}else{this._navigateToDetails.call(this,i,e,t,false)}this._listPage.$().attr("aria-hidden","true")};E.prototype._fnHandleItemPress=function(e){this._fnHandleForwardNavigation(e.getParameter("listItem"),"slide")};E.prototype._navigateToDetails=function(e,t,i,s){this._setTitle(e,t);this._setDescription(e);this._setIcon(e,t);this._detailsPage.invalidate();this.fireLongtextLoaded();if(!s){this._navContainer.to(this._detailsPage,i)}};E.prototype._clearDetailsPage=function(){this._detailsPage.getContent().forEach(function(e){e.destroy()},this)};E.prototype.navigateBack=function(){this._listPage.$().removeAttr("aria-hidden");this._navContainer.back()};E.prototype._fnFilterList=function(e){A.forEach(function(t){if(t!=e&&this._oLists[t].getVisible()){this._oLists[t].setVisible(false)}},this);this._sCurrentList=e;this._oLists[e].setVisible(true);this.fireListSelect({messageTypeFilter:this._getCurrentMessageTypeFilter()})};E.prototype._getCurrentMessageTypeFilter=function(){return this._sCurrentList=="all"?"":this._sCurrentList};E.prototype._isListPage=function(){return this._navContainer.getCurrentPage()==this._listPage};return E});
//# sourceMappingURL=MessageView.js.map