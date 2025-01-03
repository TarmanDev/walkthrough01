/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/future"],function(e){"use strict";return{display:function(e,t,r){var a=Promise.resolve();return this._display(e,t,r,a)},_display:function(e,t,r,a){var i=this,n=[];if(!Array.isArray(e)){e=[e]}this._attachTitleChanged(e,r);return this._alignTargetsInfo(e).reduce(function(e,r){var a={prefix:r.prefix,propagateTitle:r.propagateTitle||false,ignoreInitialHash:r.ignoreInitialHash,placeholder:r.placeholder,repeatedRoute:r.repeatedRoute,routeRelevant:r.routeRelevant||false};return i._displaySingleTarget(r,t,e,a).then(function(e){e=e||{};e.targetInfo=r;n.push(e)})},a).then(function(){return n})},_addDynamicTargetToRoute:function(e){if(this._oRouter){var t=this._oRouter._getLastMatchedRouteName();var r,a;if(t){r=this._oRouter.getRoute(t);if(r&&r._oConfig&&r._oConfig.target){a=this._alignTargetsInfo(r._oConfig.target).some(function(t){return t.name===e.name});if(!a){r._oConfig.dynamicTarget=r._oConfig.dynamicTarget||[];r._oConfig.dynamicTarget.push(e)}}}}},_displaySingleTarget:function(t,r,a,i){var n=t.name,o=this.getTarget(n);if(o!==undefined){if(t.routeRelevant){this._addDynamicTargetToRoute(t)}return o._display(r,a,i)}else{var s=`${this}: The target with the name "${n}" does not exist!`;e.errorThrows(s);return Promise.resolve({name:n,error:s})}}}});
//# sourceMappingURL=Targets.js.map