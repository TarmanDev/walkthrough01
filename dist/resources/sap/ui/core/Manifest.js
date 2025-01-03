/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/base/Object","sap/ui/thirdparty/URI","sap/ui/VersionInfo","sap/base/util/Version","sap/base/future","sap/base/Log","sap/ui/dom/includeStylesheet","sap/base/i18n/ResourceBundle","sap/base/util/uid","sap/base/util/merge","sap/base/util/isPlainObject","sap/base/util/LoaderExtensions","sap/base/config","sap/ui/core/Supportability","sap/ui/core/Lib","./_UrlResolver"],function(e,n,i,t,s,r,a,o,u,c,f,l,p,h,d,m,g){"use strict";function v(e){const n=[];e.forEach(e=>{const i=s(e);if(n.includes(i.getMajor())){throw new Error(`The minimal UI5 versions defined in the manifest must not include multiple versions with the same major version, Component: ${this.getComponentName()}.`)}else{n.push(i.getMajor())}})}function b(e){let n=e;if(Array.isArray(e)){n=e.sort()[0];v.call(this,e)}const i=s(n);return i.getSuffix()?s(i.getMajor()+"."+i.getMinor()+"."+i.getPatch()):i}function _(e,n){if(e&&n&&typeof n==="string"&&n[0]==="/"){var i=n.substring(1).split("/"),t;for(var s=0,r=i.length;s<r;s++){t=i[s];e=Object.hasOwn(e,t)?e[t]:undefined;if(e===null||typeof e!=="object"){if(s+1<r&&e!==undefined){e=undefined}break}}return e}return e&&e[n]}function y(e){if(e&&typeof e==="object"&&!Object.isFrozen(e)){Object.freeze(e);for(var n in e){if(Object.hasOwn(e,n)){y(e[n])}}}}var w=n.extend("sap.ui.core.Manifest",{constructor:function(e,t){n.apply(this,arguments);this._uid=c();this._iInstanceCount=0;this._oRawManifest=e;this._bProcess=!(t&&t.process===false);this._bAsync=!(t&&t.async===false);this._activeTerminologies=t&&t.activeTerminologies;this._bLoadManifestRequestFailed=t&&t._bLoadManifestRequestFailed;this._sComponentName=t&&t.componentName;var s=this.getComponentName(),r=t&&t.baseUrl||s&&sap.ui.require.toUrl(s.replace(/\./g,"/"))+"/";if(r){this._oBaseUri=new i(r).absoluteTo(new i(document.baseURI).search(""))}if(t&&typeof t.url==="string"){this._oManifestBaseUri=new i(t.url).absoluteTo(new i(document.baseURI).search("")).search("")}else{this._oManifestBaseUri=this._oBaseUri}y(this._oRawManifest);this._oManifest=f({},this._oRawManifest);if(this._bProcess){this._processI18n()}},_processI18n:function(e,n){if(!n){n=[];this._preprocess({i18nProperties:n})}if(n.length>0){var i=function(e){var i=function(n,i){return e.getText(i)};for(var t=0,s=n.length;t<s;t++){var r=n[t];r.object[r.key]=r.object[r.key].replace(w._rManifestTemplate,i)}};if(e){return this._loadI18n(e).then(i)}else{i(this._loadI18n(e))}}else{return e?Promise.resolve():undefined}},_loadI18n:function(e){var n=this._oRawManifest,t,s="manifest",r=n["sap.app"]&&n["sap.app"]["i18n"]||"i18n/i18n.properties";if(typeof r==="string"){t=new i(r);return u.create({url:this.resolveUri(t,s),async:e})}else if(typeof r==="object"){r=JSON.parse(JSON.stringify(r));s=r.bundleUrlRelativeTo||s;g._processResourceConfiguration(r,{alreadyResolvedOnRoot:false,baseURI:this._oBaseUri,manifestBaseURI:this._oManifestBaseUri,relativeTo:s});var a=Object.assign({activeTerminologies:this._activeTerminologies,async:e},r);return u.create(a)}},getJson:function(){return this._oManifest},getRawJson:function(){return this._oRawManifest},getEntry:function(e){if(!e||e.indexOf(".")<=0){r.warningThrows("Manifest entries with keys without namespace prefix can not be read via getEntry. Key: "+e+", Component: "+this.getComponentName());return null}var n=this.getJson();var i=_(n,e);if(e&&e[0]!=="/"&&i!==undefined&&!l(i)){r.warningThrows("Manifest entry with key '"+e+"' must be an object. Component: "+this.getComponentName());return null}return i},checkUI5Version:async function(){var e=this.getEntry("/sap.ui5/dependencies/minUI5Version");if(e&&a.isLoggable(a.Level.WARNING)&&d.isDebugModeEnabled()){const n=await t.load().catch(e=>{a.warning('The validation of the version for Component "'+this.getComponentName()+'" failed! Reason: '+e)});const i=b.call(this,e);const s=b.call(this,n?.version);if(i.compareTo(s)>0){a.warning('Component "'+this.getComponentName()+'" requires at least version "'+i.toString()+'" but running on "'+s.toString()+'"!')}}},_loadIncludes:function(e){var n=this.getEntry("/sap.ui5/resources"),i;if(!n){return}var t=this.getComponentName();if(n["js"]){var s=n["js"];var r=function(e){return function(){return new Promise(function(n,i){sap.ui.require([e],n,i)})}};i=Promise.resolve();for(var u=0;u<s.length;u++){var c=s[u];var f=c.uri;if(f){var l=f.match(/\.js$/i);if(l){var p=t.replace(/\./g,"/")+(f.slice(0,1)==="/"?"":"/")+f.slice(0,l.index);a.info('Component "'+t+'" is loading JS: "'+p+'"');if(e){i=i.then(r(p))}else{sap.ui.requireSync(p)}}}}}var h=n["css"];if(h){for(var d=0;d<h.length;d++){var m=h[d];if(m.uri){var g=this.resolveUri(m.uri);a.info('Component "'+t+'" is loading CSS: "'+g+'"');o(g,{id:m.id,"data-sap-ui-manifest-uid":this._uid})}}}return i},removeIncludes:function(){var e=this.getEntry("/sap.ui5/resources");if(!e){return}var n=this.getComponentName();var i=e["css"];if(i){var t=document.querySelectorAll("link[data-sap-ui-manifest-uid='"+this._uid+"']");for(var s=0;s<t.length;s++){var r=t[s];a.info('Component "'+n+'" is removing CSS: "'+r.href+'"');r.parentNode.removeChild(r)}}},_loadDependencies:function(e){var n=[];var i=this.getEntry("/sap.ui5/dependencies"),t=this.getComponentName();if(i){var s=i["libs"];if(s){for(var r in s){if(!s[r].lazy){a.info('Component "'+t+'" is loading library: "'+r+'"');n.push(m._load(r,{sync:!e}))}}}var o=i["components"];var u=[];if(o){for(var c in o){if(!o[c].lazy){u.push(c)}}}if(e){var f=new Promise(function(e,n){sap.ui.require(["sap/ui/core/Component"],function(n){e(n)},n)}).then(function(e){return Promise.all(u.map(function(n){return e.load({name:n,manifest:false})}))});n.push(f)}else{u.forEach(function(e){var n=e.replace(/\./g,"/")+"/Component";var i=sap.ui.loader._.getModuleState(n+".js");if(i===-1){sap.ui.requireSync(n)}else if(i===0){a.info('Component "'+t+'" is loading component: "'+e+'.Component"');sap.ui.requireSync("sap/ui/core/Component");sap.ui.component.load({name:e})}})}}return Promise.all(n)},defineResourceRoots:function(){var e=this.getEntry("/sap.ui5/resourceRoots");if(e){for(var n in e){var t=e[n];var s=new i(t);if(s.is("absolute")||s.path()&&s.path()[0]==="/"){r.errorThrows(`${this.getComponentName()}: Resource root for "${n}" is absolute and therefore won't be registered! "${t}"`);continue}t=this.resolveUri(t);var a={};a[n.replace(/\./g,"/")]=t;sap.ui.loader.config({paths:a})}}},getComponentName:function(){var e=this.getRawJson();return this._sComponentName||_(e,"/sap.ui5/componentName")||_(e,"/sap.app/id")},resolveUri:function(e,n){var i=n==="manifest"?this._oManifestBaseUri:this._oBaseUri;var t=g._resolveUri(e,i);return t&&t.toString()},_preprocess:function(e){w.processObject(this._oManifest,function(n,i,t){if(e.resolveUI5Urls&&t.startsWith("ui5:")){n[i]=p.resolveUI5Url(t)}else if(e.i18nProperties&&t.match(w._rManifestTemplate)){e.i18nProperties.push({object:n,key:i})}})},init:function(e){if(this._iInstanceCount===0){this.loadDependenciesAndIncludes()}this._iInstanceCount++},loadDependenciesAndIncludes:function(e){if(this._pDependenciesAndIncludes){return this._pDependenciesAndIncludes}const n=this.checkUI5Version();this.defineResourceRoots();this._preprocess({resolveUI5Urls:true});this._pDependenciesAndIncludes=Promise.all([this._loadDependencies(e),this._loadIncludes(e),n]);return this._pDependenciesAndIncludes},exit:function(e){var n=Math.max(this._iInstanceCount-1,0);if(n===0){this.removeIncludes();delete this._pDependenciesAndIncludes}this._iInstanceCount=n}});w._rManifestTemplate=/\{\{([^\}\}]+)\}\}/g;w.load=function(n){var t=n&&n.manifestUrl,s=n&&n.componentName,r=n&&n.async,o=n&&n.failOnError,u=n&&n.processJson;var c=new i(t);if(!c.hasQuery("sap-language")){var f=e.getSAPLogonLanguage();if(f){c.addQuery("sap-language",f)}}if(!c.hasQuery("sap-client")){var f=h.get({name:"sapClient",type:h.Type.String,external:true});if(f){c.addQuery("sap-client",f)}}t=c.toString();a.info("Loading manifest via URL: "+t);if(!r){a.warning("Synchronous loading of manifest, due to Manifest.load() call for '"+t+"'. Use parameter 'async' true to avoid this.","SyncXHR",null,function(){return{type:"SyncXHR",name:"Manifest"}})}var l=p.loadResource({url:t,dataType:"json",async:typeof r!=="undefined"?r:false,headers:{"Accept-Language":e.getLanguageTag().toString()},failOnError:typeof o!=="undefined"?o:true});var d={componentName:s,url:t,process:false};if(n.activeTerminologies){d["activeTerminologies"]=n.activeTerminologies}if(r){return l.then(function(e){if(u&&e){return u(e)}else{return e}}).then(function(e){if(!e){d._bLoadManifestRequestFailed=true}return new w(e,d)})}return new w(l,d)};w.processObject=function(e,n){for(var i in e){if(!Object.hasOwn(e,i)){continue}var t=e[i];switch(typeof t){case"object":if(t){w.processObject(t,n)}break;case"string":n(e,i,t);break;default:}}};return w});
//# sourceMappingURL=Manifest.js.map