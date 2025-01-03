/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnimationMode","./Component","./Configuration","./ControlBehavior","./Element","./ElementRegistry","./Lib","./LocaleData","./Rendering","./RenderManager","./UIArea","./Messaging","./StaticArea","./Supportability","./Theming","sap/base/assert","sap/base/config","sap/base/Event","sap/base/Log","sap/base/i18n/Formatting","sap/base/i18n/Localization","sap/base/util/Deferred","sap/base/util/isEmptyObject","sap/base/util/ObjectPath","sap/base/util/Version","sap/ui/Device","sap/ui/Global","sap/ui/VersionInfo","sap/ui/base/EventProvider","sap/ui/base/Interface","sap/ui/base/ManagedObject","sap/ui/base/Object","sap/ui/base/syncXHRFix","sap/ui/core/support/Hotkeys","sap/ui/core/util/_LocalizationHelper","sap/ui/dom/getComputedStyleFix","sap/ui/performance/Measurement","sap/ui/performance/trace/initTraces","sap/ui/security/FrameOptions","sap/ui/security/Security","sap/ui/test/RecorderHotkeyListener","sap/ui/thirdparty/jquery","jquery.sap.global","sap/ui/events/PasteEventFix","sap/ui/events/jquery/EventSimulation","sap/ui/thirdparty/URI","sap/ui/thirdparty/jqueryui/jquery-ui-position"],function(e,t,n,i,o,r,a,s,u,p,c,l,d,f,h,g,y,m,b,v,E,C,T,S,M,L,I,_,R,A,P,j,w,O,V,U,B,k,z,x,N,jQuery){"use strict";var q;const F="1.131.0";const D=Object.assign({},I.buildinfo);Object.freeze(D);if(L.browser.firefox){U();if(L.browser.version<129){w()}}if(y.get({name:"sapUiNoConflict",type:y.Type.Boolean,freeze:true})){jQuery.noConflict()}const H=y.get({name:"sapUiLogLevel",type:y.Type.String,defaultValue:undefined,external:true});if(H){b.setLevel(b.Level[H.toUpperCase()]||parseInt(H))}else if(!globalThis["sap-ui-optimized"]){b.setLevel(b.Level.DEBUG)}const X=M(jQuery.fn.jquery);if(X.compareTo("3.6.0")!=0){b.warning("SAPUI5's default jQuery version is 3.6.0; current version is "+jQuery.fn.jquery+". Please note that we only support version 3.6.0.")}sap.ui.loader._.logger=b.getLogger("sap.ui.ModuleSystem",y.get({name:"sapUiXxDebugModuleLoading",type:y.Type.Boolean,external:true,freeze:true})?b.Level.DEBUG:Math.min(b.getLevel(),b.Level.INFO));O.init();N.init();if(sap.ui.getCore&&sap.ui.getCore()){return sap.ui.getCore()}k();var $;var G=function(){var e=y.get({name:"sapUiOnInit",type:e=>{if(typeof e==="string"||typeof e==="function"){return e}else{throw new TypeError("unsupported value")}}});if(e){if(typeof e==="string"){var t=/^module\:((?:[_$.\-a-zA-Z0-9]+\/)*[_$.\-a-zA-Z0-9]+)$/.exec(e);if(t&&t[1]){setTimeout(sap.ui.require.bind(null,[t[1]]),0)}else if(typeof globalThis[e]==="function"){globalThis[e]()}else{throw Error("Invalid init module "+e+" provided via config option 'sapUiOnInit'")}}else{e()}}};function Z(){var e=y.get({name:"sapUiOnInit",type:y.Type.Code,defaultValue:y.get({name:"sapUiEvtOninit",type:y.Type.Code})});if(e){if(typeof e==="function"){e()}else if(typeof e==="string"){var t=/^module\:((?:[_$.\-a-zA-Z0-9]+\/)*[_$.\-a-zA-Z0-9]+)$/.exec(e);if(t&&t[1]){setTimeout(sap.ui.require.bind(sap.ui,[t[1]]),0)}else{var n=S.get(e);if(typeof n==="function"){n()}else{b.warning("[Deprecated] Do not use inline JavaScript code with the oninit attribute."+" Use the module:... syntax or the name of a global function");window.eval(e)}}}}}function W(){var e=y.get({name:"sapUiXxWaitForTheme",type:y.Type.String,external:true}).toLowerCase();if(e==="true"){e="rendering"}if(e!=="rendering"&&e!=="init"){e=undefined}return e}function J(e){if(/^jquery\.sap\./.test(e)){return e}return e.replace(/\./g,"/")}var Q=function(e,t){var n=[],i=0,o=0;this.startTask=function(e){var t=n.length;n[t]={name:e,finished:false};i++;return t};this.finishTask=function(t,a){if(!n[t]||n[t].finished){throw new Error("trying to finish non existing or already finished task")}n[t].finished=true;i--;if(a===false){o++}if(i===0){b.info("Sync point '"+e+"' finished (tasks:"+n.length+", open:"+i+", failures:"+o+")");r()}};function r(){if(t){t(i,o)}t=null}b.info("Sync point '"+e+"' created")};var K=j.extend("sap.ui.core.Core",{constructor:function(){j.call(this);var e=this,t="sap.ui.core.Core";if(q){b.error("Only the framework must create an instance of sap/ui/core/Core."+" To get access to its functionality, require sap/ui/core/Core,"+" and use the module export directly without using 'new'.");return q}$=new R;["attachEvent","detachEvent","getEventingParent"].forEach(function(e){K.prototype[e]=$[e].bind($)});this.bBooted=false;this.bInitialized=false;this.bReady=false;this.aPlugins=[];this.oModels={};this.oEventBus=null;Object.defineProperty(this,"mElements",{get:function(){b.error("oCore.mElements was a private member and has been removed. Use one of the methods in sap.ui.core.ElementRegistry instead");return r.all()},configurable:false});this.mObjects={template:{}};this.oRootComponent=null;this.pReady=new C;this.bInitLegacyLib=false;b.info("Creating Core",null,t);B.start("coreComplete","Core.js - complete");B.start("coreBoot","Core.js - boot");B.start("coreInit","Core.js - init");var i=sap.ui.require("sap/base/config/GlobalConfigurationProvider");i.freeze();(()=>{const e=globalThis["sap-ui-config"];for(const t in e){const n=e[t];const i=t.toLowerCase();if(!Object.hasOwn(e,i)){e[i]=n;delete e[t]}}})();const o={};const s=y.get({name:"sapUiResourceRoots",type:y.Type.MergedObject})??{};for(const e in s){o[J(e)]=s[e]||"."}sap.ui.loader.config({paths:o});n.setCore(this);(function(){var e=y.get({name:"sapUiXxHandleValidation",type:y.Type.Boolean,external:true});if(e){l.registerObject(this,true)}}).bind(this)();var u=y.get({name:"sapUiFrameOptionsConfig",type:y.Type.Object});u.mode=x.getFrameOptions();u.allowlistService=x.getAllowlistService();this.oFrameOptions=new z(u);this.aModules=y.get({name:"sapUiModules",type:y.Type.StringArray})??[];this.aLibs=y.get({name:"sapUiLibs",type:y.Type.StringArray})??[];this.aModules=this.aModules.filter(e=>{const t=e.match(/^(.*)\.library$/);if(t){this.aLibs.push(t[1])}else{return e}});(()=>{const e="/sap/bc/lrep";const t=y.get({name:"sapUiFlexibilityServices",type:e=>e,external:true,defaultValue:e});const n=y.get({name:"sapUiXxSkipAutomaticFlLibLoading",type:y.Type.Boolean,external:true});if(t&&t!==e&&!n&&!this.aLibs.includes("sap.ui.fl")){this.aLibs.push("sap.ui.fl")}})();if(f.isDebugModeEnabled()){this.aModules.unshift("sap.ui.debug.DebugEnv")}var p=this.aLibs.indexOf("sap.ui.core");if(p!=0){if(p>0){this.aLibs.splice(p,1)}this.aLibs.unshift("sap.ui.core")}if(y.get({name:"sapUiXxLesssupport",type:y.Type.Boolean})&&!this.aModules.includes("sap.ui.core.plugin.LessSupport")){b.info("Including LessSupport into declared modules");this.aModules.push("sap.ui.core.plugin.LessSupport")}var c=a.getPreloadMode();var d=c==="async"||sap.ui.loader.config().async;document.documentElement.classList.add("sapUiTheme-"+h.getTheme());b.info("Declared theme "+h.getTheme(),null,t);b.info("Declared modules: "+this.aModules,t);b.info("Declared libraries: "+this.aLibs,t);V.init();V.registerForUpdate("Core",()=>({Core:this}));this._setupBrowser();this._setupOS();this._setupAnimation();sap.ui.getCore=function(){return e.getInterface()};var g=new Q("UI5 Document Ready",function(t,n){e.init()});var m=g.startTask("document.ready");var v=g.startTask("preload and boot");var E=function(){b.trace("document is ready");g.finishTask(m);document.removeEventListener("DOMContentLoaded",E)};if(document.readyState!=="loading"){E()}else{document.addEventListener("DOMContentLoaded",E)}var T=new Q("UI5 Core Preloads and Bootstrap Script",function(t,n){b.trace("Core loaded: open="+t+", failures="+n);e._boot(d,function(){g.finishTask(v);B.end("coreBoot")})});var S=T.startTask("create sp2 tasks task");if(a.getVersionedLibCss()){var M=T.startTask("load version info");var L=function(e){if(e){b.trace('Loaded "sap-ui-version.json".')}else{b.error('Could not load "sap-ui-version.json".')}T.finishTask(M)};if(d){_.load().then(L,function(e){b.error('Unexpected error when loading "sap-ui-version.json": '+e);T.finishTask(M)})}else{L(sap.ui.getVersionInfo({async:d,failOnError:false}))}}this._polyfillFlexbox();var I=T.startTask("bootstrap script");this.boot=function(){if(this.bBooted){return}this.bBooted=true;A.call(this);T.finishTask(I)};function A(){var t=y.get({name:"sapUiXxBootTask",type:y.Type.Function});if(t){var n=T.startTask("custom boot task");t(function(e){T.finishTask(n,typeof e==="undefined"||e===true)})}if(c==="sync"||c==="async"){var i=a._load(e.aLibs,{sync:!d,preloadOnly:true});if(d){var o=T.startTask("preload bootstrap libraries");i.then(function(){T.finishTask(o)},function(){T.finishTask(o,false)})}}var r=y.get({name:"sapUiAppCacheBuster",type:y.Type.StringArray,external:true,freeze:true});if(r&&r.length>0){if(d){var s=T.startTask("require AppCachebuster");sap.ui.require(["sap/ui/core/AppCacheBuster"],function(e){e.boot(T,r);T.finishTask(s)})}if(!d){var u=sap.ui.requireSync("sap/ui/core/AppCacheBuster");u.boot(T,r)}}if(f.getSupportSettings()!==null){var p=T.startTask("support info script");var l=function(e,t){e.initializeSupportMode(f.getSupportSettings(),d);t.initSupportRules(f.getSupportSettings());T.finishTask(p)};if(d){sap.ui.require(["sap/ui/core/support/Support","sap/ui/support/Bootstrap"],l,function(e){b.error("Could not load support mode modules:",e)})}if(!d){b.warning("Synchronous loading of Support mode. Set preload configuration to 'async' or switch to asynchronous bootstrap to prevent these synchronous request.","SyncXHR",null,function(){return{type:"SyncXHR",name:"support-mode"}});l(sap.ui.requireSync("sap/ui/core/support/Support"),sap.ui.requireSync("sap/ui/support/Bootstrap"))}}if(f.getTestRecorderSettings()!==null){var h=T.startTask("test recorder script");var g=function(e){e.init(f.getTestRecorderSettings());T.finishTask(h)};if(d){sap.ui.require(["sap/ui/testrecorder/Bootstrap"],g,function(e){b.error("Could not load test recorder:",e)})}if(!d){b.warning("Synchronous loading of Test recorder mode. Set preload configuration to 'async' or switch to asynchronous bootstrap to prevent these synchronous request.","SyncXHR",null,function(){return{type:"SyncXHR",name:"test-recorder-mode"}});g(sap.ui.requireSync("sap/ui/testrecorder/Bootstrap"))}}T.finishTask(S)}},metadata:{publicMethods:["ready","boot","getConfiguration","isMobile","isInitialized","attachInit","lock","unlock","isLocked","attachInitEvent","registerPlugin","unregisterPlugin","setRoot","getRootComponent","getApplication","getControl","getComponent","getTemplate","createComponent","getCurrentFocusedControlId","getEventBus","byId","attachIntervalTimer","detachIntervalTimer","getElementById","byFieldGroupId","getLoadedLibraries","loadLibrary","initLibrary","getLibraryResourceBundle","attachLibraryChanged","detachLibraryChanged","loadLibraries","setModel","getModel","hasModel","getMessageManager","attachEvent","detachEvent","attachControlEvent","detachControlEvent","attachParseError","detachParseError","attachValidationError","detachValidationError","attachFormatError","detachFormatError","attachValidationSuccess","detachValidationSuccess","attachLocalizationChanged","detachLocalizationChanged","fireFormatError","fireValidationSuccess","fireValidationError","fireParseError","getStaticAreaRef","isStaticAreaRef","createRenderManager","createUIArea","getUIArea","getUIDirty","applyChanges","getRenderManager","addPrerenderingTask","applyTheme","setThemeRoot","attachThemeChanged","detachThemeChanged","isThemeApplied","notifyContentDensityChanged","attachThemeScopingChanged","detachThemeScopingChanged","fireThemeScopingChanged","includeLibraryTheme"]}});K.prototype.getInterface=function(){const e=j.prototype.getInterface.call(this);Object.defineProperties(e,{version:{value:F},buildinfo:{value:D}});return e};K.M_EVENTS={ControlEvent:"ControlEvent",UIUpdated:"UIUpdated",ThemeChanged:"ThemeChanged",ThemeScopingChanged:"themeScopingChanged",LocalizationChanged:"localizationChanged",LibraryChanged:"libraryChanged",ValidationError:"validationError",ParseError:"parseError",FormatError:"formatError",ValidationSuccess:"validationSuccess"};K.prototype._setupBrowser=function(){var e="sap.ui.core.Core";var t=document.documentElement;var n=L.browser;var i=n.name;if(i){if(i===n.BROWSER.SAFARI&&n.mobile){i="m"+i}i=i+(n.version===-1?"":Math.floor(n.version));t.dataset.sapUiBrowser=i;b.debug("Browser-Id: "+i,null,e)}};K.prototype._setupOS=function(){var e=document.documentElement;e.dataset.sapUiOs=L.os.name+L.os.versionStr;var t=null;switch(L.os.name){case L.os.OS.IOS:t="sap-ios";break;case L.os.OS.ANDROID:t="sap-android";break}if(t){e.classList.add(t)}};K.prototype._setupAnimation=function(){function t(){var t=document.documentElement;var n=i.getAnimationMode();t.dataset.sapUiAnimationMode=n;var o=n!==e.minimal&&n!==e.none;t.dataset.sapUiAnimation=o?"on":"off";if(typeof jQuery!=="undefined"){jQuery.fx.off=!o}}i.attachChange(function(e){if(e.animationMode){t()}});t()};K.prototype._polyfillFlexbox=function(){jQuery.support.useFlexBoxPolyfill=false};K.prototype._boot=function(e,t){this.aModules.push("sap/ui/core/date/"+v.getCalendarType());this.aModules.push("sap/ui/core/boot/FieldHelpEndpoint");if(e){return this._requireModulesAsync().then(function(){t()})}b.warning("Modules and libraries declared via bootstrap-configuration are loaded synchronously. Set preload configuration to"+" 'async' or switch to asynchronous bootstrap to prevent these requests.","SyncXHR",null,function(){return{type:"SyncXHR",name:"legacy-module"}});this.aLibs.forEach(function(e){a._load(e,{sync:true})});this.aModules.forEach(function(e){sap.ui.requireSync(/^jquery\.sap\./.test(e)?e:e.replace(/\./g,"/"))});t()};K.prototype._requireModulesAsync=function(){var e=[];this.aModules.forEach(function(t){e.push(/^jquery\.sap\./.test(t)?t:t.replace(/\./g,"/"))});return Promise.all([a._load(this.aLibs),new Promise(function(t){sap.ui.require(e,function(){t(Array.prototype.slice.call(arguments))})}),s.requestInstance(E.getLanguageTag())])};K.prototype.applyTheme=function(e,t){g(typeof e==="string","sThemeName must be a string");g(typeof t==="string"||typeof t==="undefined","sThemeBaseUrl must be a string or undefined");if(t){h.setThemeRoot(e,t)}h.setTheme(e)};K.prototype.setThemeRoot=function(e,t,n,i){if(typeof t==="string"){i=n;n=t;t=undefined}h.setThemeRoot(e,n,t,i);return this};K.prototype.init=function(){if(this.bInitialized){return}c.setCore(this);var e="sap.ui.core.Core.init()";b.info("Initializing",null,e);B.end("coreInit");this._setBodyAccessibilityRole();var t=W();if(this.isThemeApplied()||!t){this._executeInitialization()}else{u.suspend();if(t==="rendering"){u.notifyInteractionStep();this._executeInitialization();u.getLogger().debug("delay initial rendering until theme has been loaded");h.attachAppliedOnce(function(){u.resume("after theme has been loaded")})}else if(t==="init"){u.getLogger().debug("delay init event and initial rendering until theme has been loaded");u.notifyInteractionStep();h.attachAppliedOnce(function(){this._executeInitialization();u.resume("after theme has been loaded")}.bind(this))}}};K.prototype._setupRootComponent=function(){var e="sap.ui.core.Core.init()";var t=n.getRootComponent();if(t){b.info("Loading Root Component: "+t,null,e);var i=sap.ui.component({name:t});this.oRootComponent=i;var o=y.get({name:"sapUiXxRootComponentNode",type:y.Type.String});if(o&&i.isA("sap.ui.core.UIComponent")){var r=document.getElementById(o);if(r){b.info("Creating ComponentContainer for Root Component: "+t,null,e);var a=sap.ui.requireSync("sap/ui/core/ComponentContainer"),s=new a({component:i,propagateModel:true});s.placeAt(r)}}}else{var u=n.getApplication();if(u){b.warning("The configuration 'application' is deprecated. Please use the configuration 'component' instead! "+"Please migrate from sap.ui.app.Application to sap.ui.core.Component.","SyncXHR",null,function(){return{type:"Deprecation",name:"sap.ui.core"}});b.info("Loading Application: "+u,null,e);sap.ui.requireSync(u.replace(/\./g,"/"));var p=S.get(u);g(p!==undefined,'The specified application "'+u+'" could not be found!');var c=new p;g(j.isObjectA(c,"sap.ui.app.Application"),'The specified application "'+u+'" must be an instance of sap.ui.app.Application!')}}};K.prototype._setBodyAccessibilityRole=function(){var e=document.body;if(i.isAccessibilityEnabled()&&n.getAutoAriaBodyRole()&&!e.getAttribute("role")){e.setAttribute("role","application")}};K.prototype._executeInitialization=function(){var e="sap.ui.core.Core.init()";if(this.bInitialized){return}this.bInitialized=true;b.info("Initialized",null,e);b.info("Starting Plugins",null,e);this.startPlugins();b.info("Plugins started",null,e);G=Z;G();this._setupRootComponent();this.pReady.resolve();this.bReady=true};K.prototype.isInitialized=function(){return this.bInitialized};K.prototype.isThemeApplied=function(){var e=false;function t(){e=true}h.attachAppliedOnce(t);return e};h.attachApplied(function(e){$&&$.fireEvent(K.M_EVENTS.ThemeChanged,m.getParameters(e))});K.prototype.attachInitEvent=function(e){g(typeof e==="function","fnFunction must be a function");if(!this.bReady){this.pReady.promise.then(e)}};K.prototype.attachInit=function(e){g(typeof e==="function","fnFunction must be a function");this.ready(e)};K.prototype.lock=function(){this.bLocked=true;c.registry.forEach(e=>{e.lock()})};K.prototype.unlock=function(){this.bLocked=false;c.registry.forEach(e=>{e.unlock()})};K.prototype.isLocked=function(){return this.bLocked};K.prototype.getConfiguration=function(){return n};K.prototype.getRenderManager=function(){return this.createRenderManager()};K.prototype.createRenderManager=function(){g(this.isInitialized(),"A RenderManager should be created only after the Core has been initialized");var e=new p;return e.getInterface()};K.prototype.getCurrentFocusedControlId=function(){if(!this.isInitialized()){throw new Error("Core must be initialized")}return o.getActiveElement()?.getId()||null};K.prototype.loadLibrary=function(e,t){var n={name:e};var i={sync:true};if(typeof t==="boolean"){i.sync=!t}else if(typeof t==="string"){n.url=t}else if(typeof t==="object"){i.sync=!t.async;n.url=t.url}var o=a._load(n,i);if(!i.sync){return o.then(function(e){return e[0]})}else{return o[0]}};K.prototype.loadLibraries=function(e,t){t=Object.assign({async:true},t);t.sync=!t.async;var n=a._load(e,t);if(!t.sync){return n}else{return undefined}};K.prototype.createComponent=function(e,n,i,o){if(typeof e==="string"){e={name:e,url:n};if(typeof i==="object"){e.settings=i}else{e.id=i;e.settings=o}}if(e.async&&(e.manifest!==undefined||e.manifestFirst===undefined&&e.manifestUrl===undefined)){if(e.manifest===undefined){e.manifest=false}return t.create(e)}return sap.ui.component(e)};K.prototype.getRootComponent=function(){return this.oRootComponent};K.prototype.initLibrary=function(e){g(typeof e==="string"||typeof e==="object","oLibInfo must be a string or object");var t=typeof e==="string";if(t){e={name:e}}var n=e.name,i="sap.ui.core.Core.initLibrary()";if(t){b.error("[Deprecated] library "+n+" uses old fashioned initLibrary() call (rebuild with newest generator)")}if(!n){b.error("A library name must be provided.",null,i);return}var o=a._get(n);if(o&&o.isSettingsEnhanced()){return S.get(n)}return a.init(e)};K.prototype.includeLibraryTheme=function(e,t,n){var i=a._get(e,true);i._includeTheme(t,n)};K.prototype.getLoadedLibraries=function(){return a.all()};K.prototype.getLibraryResourceBundle=function(e,t,n){if(typeof e==="boolean"){n=e;e=undefined;t=undefined}if(typeof t==="boolean"){n=t;t=undefined}g(e===undefined&&t===undefined||typeof e==="string","sLibraryName must be a string or there is no argument given at all");g(t===undefined||typeof t==="string","sLocale must be a string or omitted");e=e||"sap.ui.core";var i=a._get(e||"sap.ui.core",true);return i._loadResourceBundle(t,!n)};function Y(e,t){g(typeof e==="string"||typeof e==="object","oDomRef must be a string or object");g(t instanceof A||j.isObjectA(t,"sap.ui.core.Control"),"oControl must be a Control or Interface");if(t){t.placeAt(e,"only")}}K.prototype.setRoot=Y;K.prototype.createUIArea=function(e){if(typeof e==="string"&&e===d.STATIC_UIAREA_ID){return d.getUIArea()}return c.create(e)};K.prototype.getUIArea=function(e){g(typeof e==="string"||typeof e==="object","o must be a string or object");var t="";if(typeof e=="string"){t=e}else{t=e.id}if(t){return c.registry.get(t)}return null};K.prototype.getUIDirty=function(){return u.isPending()};K.prototype.notifyContentDensityChanged=h.notifyContentDensityChanged;K.prototype.attachThemeChanged=function(e,t){$.attachEvent(K.M_EVENTS.ThemeChanged,e,t)};K.prototype.detachThemeChanged=function(e,t){$.detachEvent(K.M_EVENTS.ThemeChanged,e,t)};K.prototype.attachThemeScopingChanged=function(e,t){$.attachEvent(K.M_EVENTS.ThemeScopingChanged,e,t)};K.prototype.detachThemeScopingChanged=function(e,t){$.detachEvent(K.M_EVENTS.ThemeScopingChanged,e,t)};h.attachThemeScopingChanged(function(e){$.fireEvent(K.M_EVENTS.ThemeScopingChanged,m.getParameters(e))});K.prototype.attachLocalizationChanged=function(e,t){$.attachEvent(K.M_EVENTS.LocalizationChanged,e,t)};K.prototype.detachLocalizationChanged=function(e,t){$.detachEvent(K.M_EVENTS.LocalizationChanged,e,t)};K.prototype.fireLocalizationChanged=function(e){$.fireEvent(K.M_EVENTS.LocalizationChanged,{changes:e})};K.prototype.attachLibraryChanged=function(e,t){$.attachEvent(K.M_EVENTS.LibraryChanged,e,t)};K.prototype.detachLibraryChanged=function(e,t){$.detachEvent(K.M_EVENTS.LibraryChanged,e,t)};a.attachLibraryChanged(function(e){$.fireEvent(K.M_EVENTS.LibraryChanged,e.getParameters())});K.prototype.applyChanges=function(){u.renderPendingUIUpdates("forced by applyChanges")};K.prototype.registerObject=function(e){var t=e.getId(),n=e.getMetadata().getStereotype(),i=this.getObject(n,t);if(i&&i!==e){b.error('adding object "'+n+"\" with duplicate id '"+t+"'");throw new Error('Error: adding object "'+n+"\" with duplicate id '"+t+"'")}this.mObjects[n][t]=e};K.prototype.deregisterObject=function(e){var t=e.getId(),n=e.getMetadata().getStereotype();delete this.mObjects[n][t]};K.prototype.byId=o.getElementById;K.prototype.getControl=o.getElementById;K.prototype.getElementById=o.getElementById;K.prototype.getObject=function(e,t){g(t==null||typeof t==="string","sId must be a string when defined");g(this.mObjects[e]!==undefined,"sType must be a supported stereotype");return t==null?undefined:this.mObjects[e]&&this.mObjects[e][t]};K.prototype.getComponent=t.registry.get;K.prototype.getTemplate=function(e){b.warning("Synchronous loading of 'sap/ui/core/tmpl/Template'. Use 'sap/ui/core/tmpl/Template' module and"+" call Template.byId instead","SyncXHR",null,function(){return{type:"SyncXHR",name:"Core.prototype.getTemplate"}});var t=sap.ui.requireSync("sap/ui/core/tmpl/Template");return t.byId(e)};K.prototype.getStaticAreaRef=function(){return d.getDomRef()};K.prototype.isStaticAreaRef=function(e){return d.getDomRef()===e};var ee;K.prototype.attachIntervalTimer=function(e,t){b.warning("Usage of sap.ui.getCore().attachIntervalTimer() is deprecated. "+"Please use 'IntervalTrigger.addListener()' from 'sap/ui/core/IntervalTrigger' module instead.","Deprecation",null,function(){return{type:"sap.ui.core.Core",name:"Core"}});if(!ee){ee=sap.ui.require("sap/ui/core/IntervalTrigger")||sap.ui.requireSync("sap/ui/core/IntervalTrigger")}ee.addListener(e,t)};K.prototype.detachIntervalTimer=function(e,t){if(ee){ee.removeListener(e,t)}};K.prototype.attachControlEvent=function(e,t){$.attachEvent(K.M_EVENTS.ControlEvent,e,t)};K.prototype.detachControlEvent=function(e,t){$.detachEvent(K.M_EVENTS.ControlEvent,e,t)};K.prototype.fireControlEvent=function(e){$.fireEvent(K.M_EVENTS.ControlEvent,e)};K.prototype._handleControlEvent=function(e,t){var n=jQuery.Event(e.type);Object.assign(n,e);n.originalEvent=undefined;this.fireControlEvent({browserEvent:n,uiArea:t})};K.prototype.getApplication=function(){return sap.ui.getApplication&&sap.ui.getApplication()};K.prototype.registerPlugin=function(e){g(typeof e==="object","oPlugin must be an object");if(!e){return}for(var t=0,n=this.aPlugins.length;t<n;t++){if(this.aPlugins[t]===e){return}}this.aPlugins.push(e);if(this.bInitialized&&e&&e.startPlugin){e.startPlugin(this)}};K.prototype.unregisterPlugin=function(e){g(typeof e==="object","oPlugin must be an object");if(!e){return}var t=-1;for(var n=this.aPlugins.length;n--;n>=0){if(this.aPlugins[n]===e){t=n;break}}if(t==-1){return}if(this.bInitialized&&e&&e.stopPlugin){e.stopPlugin(this)}this.aPlugins.splice(t,1)};K.prototype.startPlugins=function(){for(var e=0,t=this.aPlugins.length;e<t;e++){var n=this.aPlugins[e];if(n&&n.startPlugin){n.startPlugin(this,true)}}};K.prototype.stopPlugins=function(){for(var e=0,t=this.aPlugins.length;e<t;e++){var n=this.aPlugins[e];if(n&&n.stopPlugin){n.stopPlugin(this)}}};K.prototype.setModel=function(e,t){g(e==null||j.isObjectA(e,"sap.ui.model.Model"),"oModel must be an instance of sap.ui.model.Model, null or undefined");g(t===undefined||typeof t==="string"&&!/^(undefined|null)?$/.test(t),"sName must be a string or omitted");var n=this,i;if(!e&&this.oModels[t]){delete this.oModels[t];if(T(n.oModels)&&T(n.oBindingContexts)){i=P._oEmptyPropagatedProperties}else{i={oModels:Object.assign({},n.oModels),oBindingContexts:{},aPropagationListeners:[]}}c.registry.forEach(function(n){if(e!=n.getModel(t)){n._propagateProperties(t,n,i,false,t)}})}else if(e&&e!==this.oModels[t]){this.oModels[t]=e;c.registry.forEach(function(n){if(e!=n.getModel(t)){var i={oModels:Object.assign({},this.oModels),oBindingContexts:{},aPropagationListeners:[]};n._propagateProperties(t,n,i,false,t)}}.bind(this))}return this};K.prototype.getMessageManager=function(){return l};K.prototype.byFieldGroupId=function(e){return o.registry.filter(function(t){return t.isA("sap.ui.core.Control")&&t.checkFieldGroupIds(e)})};K.prototype.getModel=function(e){g(e===undefined||typeof e==="string"&&!/^(undefined|null)?$/.test(e),"sName must be a string or omitted");return this.oModels[e]};K.prototype.hasModel=function(){return!T(this.oModels)};K.prototype.getEventBus=function(){if(!this.oEventBus){var e=sap.ui.require("sap/ui/core/EventBus");if(!e){b.warning("Synchronous loading of EventBus. Ensure that 'sap/ui/core/EventBus' module is loaded"+" before this function is called.","SyncXHR",null,function(){return{type:"SyncXHR",name:"core-eventbus"}});e=sap.ui.requireSync("sap/ui/core/EventBus")}var t=this.oEventBus=e.getInstance();this._preserveHandler=function(e){t.publish("sap.ui","__preserveContent",{domNode:e.domNode})};p.attachPreserveContent(this._preserveHandler)}return this.oEventBus};K.prototype.attachValidationError=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}$.attachEvent(K.M_EVENTS.ValidationError,e,t,n);return this};K.prototype.detachValidationError=function(e,t){$.detachEvent(K.M_EVENTS.ValidationError,e,t);return this};K.prototype.attachParseError=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}$.attachEvent(K.M_EVENTS.ParseError,e,t,n);return this};K.prototype.detachParseError=function(e,t){$.detachEvent(K.M_EVENTS.ParseError,e,t);return this};K.prototype.attachFormatError=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}$.attachEvent(K.M_EVENTS.FormatError,e,t,n);return this};K.prototype.detachFormatError=function(e,t){$.detachEvent(K.M_EVENTS.FormatError,e,t);return this};K.prototype.attachValidationSuccess=function(e,t,n){if(typeof e==="function"){n=t;t=e;e=undefined}$.attachEvent(K.M_EVENTS.ValidationSuccess,e,t,n);return this};K.prototype.detachValidationSuccess=function(e,t){$.detachEvent(K.M_EVENTS.ValidationSuccess,e,t);return this};K.prototype.fireParseError=function(e){$.fireEvent(K.M_EVENTS.ParseError,e);return this};K.prototype.fireValidationError=function(e){$.fireEvent(K.M_EVENTS.ValidationError,e);return this};K.prototype.fireFormatError=function(e){$.fireEvent(K.M_EVENTS.FormatError,e);return this};K.prototype.fireValidationSuccess=function(e){$.fireEvent(K.M_EVENTS.ValidationSuccess,e);return this};K.prototype.isMobile=function(){return L.browser.mobile};K.prototype._getEventProvider=function(){return $};K.prototype.addPrerenderingTask=function(e,t){u.addPrerenderingTask(e,t)};K.prototype.ready=function(e){if(e){if(this.bReady){e()}else{this.pReady.promise.then(e)}}return this.pReady.promise};K.prototype.destroy=function(){p.detachPreserveContent(this._preserveHandler);$.destroy();j.prototype.destroy.call(this)};sap.ui.setRoot=Y;q=(new K).getInterface();return q});
//# sourceMappingURL=Core.js.map