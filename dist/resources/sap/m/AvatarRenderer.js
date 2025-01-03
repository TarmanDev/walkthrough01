/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS","sap/ui/core/IconPool"],function(e,a,t){"use strict";var s=e.AvatarSize;var l=e.AvatarType;var i={apiVersion:2};i.render=function(e,i){var r=i.getEnabled(),o=i.getInitials(),n=i._getActualDisplayType(),c=i._getImageFallbackType(),p=i.getDisplaySize(),d=i.getDisplayShape(),g=i.getImageFitType(),f=i.getCustomDisplaySize(),u=i.getCustomFontSize(),y=i._getAvatarSrc(),I=t.isIconURI(y),b=!!i.getDetailBox(),S=!!i.getBadgeIcon(),v="sapFAvatar",A=i.getTooltip_AsString(),C=i._getAriaLabelledBy(),_=i.getAriaDescribedBy(),h=i.getAriaHasPopup(),B=i.hasListeners("press"),D=!i._bIsDefaultIcon&&b||!b,m=b&&I&&!S,T=B&&D,F=D&&!m?i._getBadge():null,z=i._getDefaultTooltip(),E=o.length,H=i.getActive()&&T,P=i._getBadgeTooltip(),k=i._getDefaultTooltip(),w=P&&P!==k?z+" "+P:k;e.openStart("span",i);e.class(v);e.class("sapFAvatarColor"+i._getActualBackgroundColor());e.class(v+p);e.class(v+n);e.class(v+d);if(H){e.class("sapMAvatarPressed")}if(r){if(T){e.class("sapMPointer");e.class(v+"Focusable");e.attr("role","button");e.attr("tabindex",0)}else if(i.getDecorative()){e.attr("role","presentation");e.attr("aria-hidden","true")}else{e.attr("role","img")}}else{e.attr("disabled","disabled");e.class("sapMAvatarDisabled")}if(i.getShowBorder()){e.class("sapFAvatarBorder")}if(p===s.Custom){e.style("width",f);e.style("height",f);e.style("font-size",u)}if(A){e.attr("title",A);e.attr("aria-label",A)}else if(w){if(o){w+=" "+o}e.attr("aria-label",w)}else if(o){e.attr("aria-label",z+" "+o)}else{e.attr("aria-label",z)}if(C&&C.length>0){e.attr("aria-labelledby",C.join(" "))}if(_&&_.length>0){e.attr("aria-describedby",_.join(" "))}if(h&&h!=="None"){e.attr("aria-haspopup",h.toLowerCase())}e.openEnd();if(n===l.Icon||c===l.Icon){e.renderControl(i._getIcon().addStyleClass(v+"TypeIcon"))}else if(n===l.Initials||c===l.Initials){if(E===3){e.renderControl(i._getIcon().addStyleClass(v+"TypeIcon").addStyleClass(v+"HiddenIcon"))}e.openStart("span");e.class(v+"InitialsHolder");e.openEnd();e.text(o);e.close("span")}if(n===l.Image){e.openStart("span");e.class(v+"ImageHolder");e.class(v+n+g);e.style("background-image","url('"+a(y)+"')");e.openEnd();e.close("span")}if(F){e.openStart("div");e.class(v+"BadgeIconActiveArea");if(f){e.style("font-size",f)}e.openEnd();e.openStart("span");e.class(v+"BadgeIcon");e.openEnd();e.renderControl(F);e.close("span");e.close("div")}e.close("span")};return i},true);
//# sourceMappingURL=AvatarRenderer.js.map