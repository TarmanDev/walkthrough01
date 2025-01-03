/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/events/PseudoEvents","sap/ui/dom/findTabbable"],function(jQuery,e,t){"use strict";var a={};a.fastNavigationKey="sap-ui-fastnavgroup";function r(e){var t=document.querySelector("html");var a,r;while(e&&e!==t){if(e.getAttribute("data-sap-ui-customfastnavgroup")==="true"){r=e}if(e.getAttribute("data-sap-ui-fastnavgroup")==="true"){a=a||e}if(r){break}e=e.assignedSlot||e.parentElement||e.parentNode.host}return r||a}function n(e){if(e.activeElement&&e.activeElement.shadowRoot){return n(e.activeElement.shadowRoot)}return e.activeElement}function i(e,t){var a=e.parentElement||e.parentNode||e.host;if(a&&a!==t){return i(a,t)}return e!==document}a.handleF6GroupNavigation=function(a,u){var s=e.events.sapskipforward,o=e.events.sapskipback,d=s.aTypes.includes(a.type)&&s.fnCheck(a),p=d||o.aTypes.includes(a.type)&&o.fnCheck(a),v=null,f;if(!p||a.isMarked("sapui5_handledF6GroupNavigation")||a.isMarked()||a.isDefaultPrevented()){return}a.setMark("sapui5_handledF6GroupNavigation");a.setMarked();a.preventDefault();if(u&&u.skip){return}var c=u&&u.target?u.target:n(document);var l;if(u&&u.scope){l=u.scope}else{l=document.documentElement}if(!i(c,l)){return}var m=r(c);var g;var h;f=c;do{h=t(f,{scope:l,forward:d});f=h.element;g=r(f)}while(!h.startOver&&m===g);if(!d){var E,k;do{f=E||f;h=t(f,{scope:l,forward:d});E=h.element;k=r(E)}while(k===g&&!h.startOver)}if(g&&g.getAttribute("data-sap-ui-customfastnavgroup")==="true"&&g.id){var w=sap.ui.require("sap/ui/core/Element");var y=w?.getElementById(g.id);if(y){v=jQuery.Event("BeforeFastNavigationFocus");v.target=f;v.source=c;v.forward=d;y._handleEvent(v)}}if(!v||!v.isDefaultPrevented()){f.focus()}};return a});
//# sourceMappingURL=F6Navigation.js.map