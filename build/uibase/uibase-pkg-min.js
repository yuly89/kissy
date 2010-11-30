/*
Copyright 2010, KISSY UI Library v1.1.6
MIT Licensed
build time: Nov 30 13:32
*/
KISSY.add("uibase",function(c){function d(g){a.apply(this,arguments);for(var h=this.constructor;h;){if(g&&g[b]&&h.HTML_PARSER)if(g[b]=c.one(g[b])){var i=g[b],j=h.HTML_PARSER,k=void 0,m=void 0;for(k in j)if(j.hasOwnProperty(k)){m=j[k];if(c.isFunction(m))this.__set(k,m.call(this,i));else if(c.isString(m))this.__set(k,i.one(m));else c.isArray(m)&&m[0]&&this.__set(k,i.all(m[0]))}}h=h.superclass&&h.superclass.constructor}e(this,"initializer","constructor");g&&g.autoRender&&this.render()}function e(g,h,
i){for(var j=g.constructor,k=[],m,n,p;j;){p=[];if(n=j.__ks_exts)for(var o=0;o<n.length;o++)if(m=n[o]){if(i!="constructor")m=n[o].prototype[i];m&&p.push(m)}if(m=j.prototype[h])p.push(m);p.length&&k.push.apply(k,p.reverse());j=j.superclass&&j.superclass.constructor}for(o=k.length-1;o>=0;o--)k[o]&&k[o].call(g)}var b="srcNode",a=c.Base,f=c.Attribute.__capitalFirst,l=function(){};d.HTML_PARSER={};d.ATTRS={render:{valueFn:function(){return document.body}},rendered:{value:false}};c.extend(d,a,{render:function(){if(!this.get("rendered")){this._renderUI();
this.fire("renderUI");e(this,"renderUI","__renderUI");this._bindUI();this.fire("bindUI");e(this,"bindUI","__bindUI");this._syncUI();this.fire("syncUI");e(this,"syncUI","__syncUI");this.set("rendered",true)}},_renderUI:l,renderUI:l,_bindUI:function(){var g=this,h=g.__getDefAttrs(),i,j;for(i in h)if(h.hasOwnProperty(i)){j="_uiSet"+f(i);g[j]&&function(k,m){g.on("after"+f(k)+"Change",function(n){g[m](n.newVal,n)})}(i,j)}},bindUI:l,_syncUI:function(){var g=this.__getDefAttrs(),h;for(h in g)if(g.hasOwnProperty(h)){var i=
"_uiSet"+f(h);this[i]&&this[i](this.get(h))}},syncUI:l,destroy:function(){for(var g=this.constructor,h,i,j;g;){(i=g.prototype.destructor)&&i.apply(this);if(h=g.__ks_exts)for(j=h.length-1;j>=0;j--)(i=h[j]&&h[j].prototype.__destructor)&&i.apply(this);g=g.superclass&&g.superclass.constructor}this.fire("destroy");this.detach()}});d.create=function(g,h,i,j){function k(){d.apply(this,arguments)}if(c.isArray(g)){j=i;i=h;h=g;g=d}g=g||d;c.extend(k,g,i,j);if(h){k.__ks_exts=h;c.each(h,function(m){if(m){c.each(["ATTRS",
"HTML_PARSER"],function(n){if(m[n]){k[n]=k[n]||{};c.mix(k[n],m[n],false)}});c.augment(k,m,false)}})}return k};c.UIBase=d});
KISSY.add("uibase-align",function(c){function d(){}function e(a,f){var l=f.charAt(0),g=f.charAt(1),h,i,j,k;if(a){a=c.one(a);h=a.offset();i=a[0].offsetWidth;j=a[0].offsetHeight}else{h={left:b.scrollLeft(),top:b.scrollTop()};i=b.viewportWidth();j=b.viewportHeight()}k=h.left;h=h.top;if(l==="c")h+=j/2;else if(l==="b")h+=j;if(g==="c")k+=i/2;else if(g==="r")k+=i;return{left:k,top:h}}var b=c.DOM;c.mix(d,{TL:"tl",TC:"tc",TR:"tr",CL:"cl",CC:"cc",CR:"cr",BL:"bl",BC:"bc",BR:"br"});d.ATTRS={align:{}};d.prototype=
{_uiSetAlign:function(a){c.isPlainObject(a)&&this.align(a.node,a.points,a.offset)},align:function(a,f,l){var g,h=this.get("el");l=l||[0,0];g=b.offset(h);a=e(a,f[0]);f=e(h,f[1]);f=[f.left-a.left,f.top-a.top];this.set("xy",[g.left-f[0]+ +l[0],g.top-f[1]+ +l[1]])},center:function(a){this.set("align",{node:a,points:[d.CC,d.CC],offset:[0,0]})}};c.UIBase.Align=d});
KISSY.add("uibase-box",function(c){function d(){}c.namespace("UIBase");var e=c.Node;c.mix(d,{APPEND:1,INSERT:0});d.ATTRS={el:{setter:function(b){if(c.isString(b))return c.one(b)}},elCls:{},elStyle:{},width:{},height:{},elTagName:{value:"div"},elAttrs:{},elOrder:{value:1},html:{value:false}};d.HTML_PARSER={el:function(b){return b}};d.prototype={__syncUI:function(){},__bindUI:function(){},__renderUI:function(){var b=this.get("render"),a=this.get("el");b=new e(b);if(!a){a=new e("<"+this.get("elTagName")+
">");this.get("elOrder")?b.append(a):b.prepend(a);this.set("el",a)}},_uiSetElAttrs:function(b){b&&this.get("el").attr(b)},_uiSetElCls:function(b){b&&this.get("el").addClass(b)},_uiSetElStyle:function(b){b&&this.get("el").css(b)},_uiSetWidth:function(b){b&&this.get("el").width(b)},_uiSetHeight:function(b){b&&this.get("el").height(b)},_uiSetHtml:function(b){b!==false&&this.get("el").html(b)},__destructor:function(){var b=this.get("el");if(b){b.detach();b.remove()}}};c.UIBase.Box=d});
KISSY.add("uibase-close",function(c){function d(){}c.namespace("UIBase");var e=c.Node;d.ATTRS={closable:{value:true},closeBtn:{}};d.HTML_PARSER={closeBtn:".ks-ext-close"};d.prototype={__syncUI:function(){},_uiSetClosable:function(b){var a=this.get("closeBtn");if(a)b?a.show():a.hide()},__renderUI:function(){var b=this.get("closeBtn"),a=this.get("contentEl");if(!b&&a){b=(new e("<a href='#' class='ks-ext-close'><span class='ks-ext-close-x'>X</span></a>")).appendTo(a);this.set("closeBtn",b)}},__bindUI:function(){var b=
this,a=b.get("closeBtn");a&&a.on("click",function(f){b.hide();f.halt()})},__destructor:function(){var b=this.get("closeBtn");b&&b.detach()}};c.UIBase.Close=d});
KISSY.add("uibase-constrain",function(c){function d(){}function e(a){var f;if(!a)return f;var l=this.get("el");if(a!==true){a=c.one(a);f=a.offset();c.mix(f,{maxLeft:f.left+a[0].offsetWidth-l[0].offsetWidth,maxTop:f.top+a[0].offsetHeight-l[0].offsetHeight})}else{a=document.documentElement.clientWidth;f={left:b.scrollLeft(),top:b.scrollTop()};c.mix(f,{maxLeft:f.left+a-l[0].offsetWidth,maxTop:f.top+b.viewportHeight()-l[0].offsetHeight})}return f}c.namespace("UIBase");var b=c.DOM;d.ATTRS={constrain:{value:false}};
d.prototype={__bindUI:function(){},__renderUI:function(){var a=this,f=a.__getDefAttrs(),l=f.x;f=f.y;var g=l.setter,h=f.setter;l.setter=function(i){var j=g&&g(i);if(j===undefined)j=i;if(!a.get("constrain"))return j;i=e.call(a,a.get("constrain"));return Math.min(Math.max(j,i.left),i.maxLeft)};f.setter=function(i){var j=h&&h(i);if(j===undefined)j=i;if(!a.get("constrain"))return j;i=e.call(a,a.get("constrain"));return Math.min(Math.max(j,i.top),i.maxTop)};a.addAttr("x",l);a.addAttr("y",f)},__syncUI:function(){},
__destructor:function(){}};c.UIBase.Constrain=d});
KISSY.add("uibase-contentbox",function(c){function d(){}c.namespace("UIBase");var e=c.Node;d.ATTRS={contentEl:{},contentElAttrs:{},contentTagName:{value:"div"},content:{}};d.HTML_PARSER={contentEl:".ks-contentbox"};d.prototype={__syncUI:function(){},__bindUI:function(){},__renderUI:function(){var b=this.get("contentEl"),a=this.get("el");if(!b){b=(new e("<"+this.get("contentTagName")+" class='ks-contentbox'>")).appendTo(a);this.set("contentEl",b)}},_uiSetContentElAttrs:function(b){b&&this.get("contentEl").attr(b)},
_uiSetContent:function(b){b!==undefined&&this.get("contentEl").html(b)},__destructor:function(){}};c.UIBase.ContentBox=d});
KISSY.add("uibase-drag",function(c){function d(){}c.namespace("UIBase");d.ATTRS={handlers:{value:[]},draggable:{value:true}};d.prototype={_uiSetHandlers:function(e){e&&e.length>0&&this.__drag.set("handlers",e)},__syncUI:function(){},__renderUI:function(){},__bindUI:function(){var e=this.get("el");this.__drag=new c.Draggable({node:e,handlers:this.get("handlers")})},_uiSetDraggable:function(e){var b=this.__drag;if(e){b.detach("drag");b.on("drag",this._dragExtAction,this)}else b.detach("drag")},_dragExtAction:function(e){this.set("xy",
[e.left,e.top])},__destructor:function(){var e=this.__drag;e&&e.destroy()}};c.UIBase.Drag=d});
KISSY.add("uibase-loading",function(c){function d(){}c.namespace("UIBase");d.prototype={loading:function(){if(!this._loadingExtEl)this._loadingExtEl=(new c.Node("<div class='ks-ext-loading' style='position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);'>")).appendTo(this.get("el"));this._loadingExtEl.show()},unloading:function(){var e=this._loadingExtEl;e&&e.hide()}};c.UIBase.Loading=d});
KISSY.add("uibase-mask",function(c){function d(){}c.namespace("UIBase");var e,b=c.UA,a=0;d.ATTRS={mask:{value:false}};d.prototype={__bindUI:function(){},__renderUI:function(){},__syncUI:function(){},_uiSetMask:function(f){if(f){this.on("show",this._maskExtShow);this.on("hide",this._maskExtHide)}else{this.detach("show",this._maskExtShow);this.detach("hide",this._maskExtHide)}},_maskExtShow:function(){if(!e){e=(new c.Node("<div class='ks-ext-mask'>")).prependTo(document.body);e.css({position:"absolute",
left:0,top:0,width:c.DOM.docWidth(),height:c.DOM.docHeight()});b.ie==6&&e.append("<iframe style='width:100%;height:expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;'>")}e.css({"z-index":this.get("zIndex")-1});a++;e.show()},_maskExtHide:function(){a--;if(a<=0)a=0;a||e&&e.hide()},__destructor:function(){}};c.UIBase.Mask=d});
KISSY.add("uibase-position",function(c){function d(){}c.namespace("UIBase");var e=document,b=c.Event;d.ATTRS={x:{},y:{},xy:{setter:function(a){var f=c.makeArray(a);if(f.length){f[0]&&this.set("x",f[0]);f[1]&&this.set("y",f[1])}return a}},zIndex:{value:9999},visible:{value:undefined}};d.prototype={__syncUI:function(){},__renderUI:function(){var a=this.get("el");a.addClass("ks-ext-position");a.css("display","")},__bindUI:function(){},_uiSetZIndex:function(a){a!==undefined&&this.get("el").css("z-index",
a)},_uiSetX:function(a){a!==undefined&&this.get("el").offset({left:a})},_uiSetY:function(a){a!==undefined&&this.get("el").offset({top:a})},_uiSetVisible:function(a){if(a!==undefined){this.get("el").css("visibility",a?"visible":"hidden");this[a?"_bindKey":"_unbindKey"]();this.fire(a?"show":"hide")}},_bindKey:function(){b.on(e,"keydown",this._esc,this)},_unbindKey:function(){b.remove(e,"keydown",this._esc,this)},_esc:function(a){a.keyCode===27&&this.hide()},move:function(a,f){if(c.isArray(a)){f=a[1];
a=a[0]}this.set("xy",[a,f])},show:function(){this._firstShow()},_firstShow:function(){this.render();this._realShow();this._firstShow=this._realShow},_realShow:function(){this.set("visible",true)},hide:function(){this.set("visible",false)},__destructor:function(){}};c.UIBase.Position=d});
KISSY.add("uibase-shim",function(c){function d(){}c.namespace("UIBase");var e=c.Node;d.prototype={__syncUI:function(){},__bindUI:function(){},__renderUI:function(){var b=this.get("el"),a=new e("<iframe style='position: absolute;border: none;width: expression(this.parentNode.offsetWidth);top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: expression(this.parentNode.offsetHeight);'>");b.prepend(a)},__destructor:function(){}};c.UIBase.Shim=d});
KISSY.add("uibase-stdmod",function(c){function d(){}c.namespace("UIBase");var e=c.Node;d.ATTRS={header:{},body:{},footer:{},bodyStyle:{},headerContent:{value:false},bodyContent:{value:false},footerContent:{value:false}};d.HTML_PARSER={header:".ks-stdmod-header",body:".ks-stdmod-body",footer:".ks-stdmod-footer"};d.prototype={__bindUI:function(){},__syncUI:function(){},_setStdModContent:function(b,a){if(a!==false)if(c.isString(a))this.get(b).html(a);else{this.get(b).html("");this.get(b).append(a)}},
_uiSetBodyStyle:function(b){b!==undefined&&this.get("body").css(b)},_uiSetBodyContent:function(b){this._setStdModContent("body",b)},_uiSetHeaderContent:function(b){this._setStdModContent("header",b)},_uiSetFooterContent:function(b){this._setStdModContent("footer",b)},__renderUI:function(){var b=this.get("contentEl"),a=this.get("header"),f=this.get("body"),l=this.get("footer");this.get("headerContent");this.get("bodyContent");this.get("footerContent");if(!a){a=(new e("<div class='ks-stdmod-header'>")).appendTo(b);
this.set("header",a)}if(!f){f=(new e("<div class='ks-stdmod-body'>")).appendTo(b);this.set("body",f)}if(!l){l=(new e("<div class='ks-stdmod-footer'>")).appendTo(b);this.set("footer",l)}},__destructor:function(){}};c.UIBase.StdMod=d});
