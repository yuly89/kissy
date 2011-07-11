/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("menubutton/menubutton",function(f,e,g,d,h){var i=new g(document),j=e.create(d,{hideMenu:function(){this.get("view").get("el");var a=this.get("menu");i.detach("mousedown",this.handleDocumentMouseDown,this);a.hide();this.get("view").set("collapsed",true)},showMenu:function(){var a=this.get("view"),b=a.get("el"),c=this.get("menu");if(!c.get("visible")){i.on("mousedown",this.handleDocumentMouseDown,this);c.set("align",{node:b,points:["bl","tl"]});c.show();b.attr("aria-haspopup",c.get("view").get("el").attr("id"));
a.set("collapsed",false)}},handleDocumentMouseDown:function(a){a=f.one(a.target)[0];var b=this.get("menu");b&&b.get("visible")&&!this.containsElement(a)&&this.hideMenu()},containsElement:function(a){var b=this.get("el"),c=this.get("menu");return b&&(b.contains(a)||b[0]===a)||c&&c.containsElement(a)},bindUI:function(){var a=this,b=this.get("menu");b.on("afterActiveItemChange",function(c){a.set("activeItem",c.newVal)});b.on("click",function(c){a.fire("click",{target:c.target})})},_handleKeydown:function(a){var b=
this.get("menu");if(b&&b.get("visible")){b=b._handleKeydown(a);if(a.keyCode==27){this.hideMenu();return true}return b}if(a.keyCode==38||a.keyCode==40){this.showMenu();return true}},_handleBlur:function(a){if(j.superclass._handleBlur.call(this,a))return true;this.hideMenu()},_handleClick:function(a){if(d.superclass._handleClick.call(this,a))return true;var b=this.get("menu");if(a.type=="click")b.get("visible")?this.hideMenu():this.showMenu();else if(a.type=="keydown")if(a.keyCode==13)b.get("visible")&&
b._handleClick(a);else if(a.keyCode==32){a.preventDefault();this.showMenu()}}},{ATTRS:{activeItem:{view:true},menu:{setter:function(a){a.set("parent",this)}}}});j.DefaultRender=h;return j},{requires:["uibase","node","button","./menubuttonrender"]});
KISSY.add("menubutton/menubuttonrender",function(f,e,g){return e.create(g.Render,{renderUI:function(){},createDom:function(){var d=this.get("el");d.one("div").one("div").html(f.substitute('<div class="{prefixCls}inline-block {prefixCls}menu-button-caption"></div><div class="{prefixCls}inline-block {prefixCls}menu-button-dropdown">&nbsp;</div>',{prefixCls:this.get("prefixCls")}));d.attr("aria-haspopup",true)},_uiSetContent:function(d){d!=undefined&&this.get("el").one("."+this.get("prefixCls")+"menu-button-caption").html(d)},
_uiSetCollapsed:function(d){var h=this.get("el"),i=this.get("prefixCls")+"menu-button";if(d){h.removeClass(i+"menu-button-open");h.attr("aria-expanded",false)}else{h.addClass(i+"menu-button-open");h.attr("aria-expanded",true)}},_uiSetActiveItem:function(d){this.get("el").attr("aria-activedescendant",d&&d.get("view").get("el").attr("id")||"")}},{ATTRS:{activeItem:{},collapsed:{value:true}}})},{requires:["uibase","button"]});
KISSY.add("menubutton/option",function(f,e,g){return e.create(g.Item,{},{ATTRS:{selectable:{value:true}}})},{requires:["uibase","menu"]});
KISSY.add("menubutton/select",function(f,e,g,d,h,i){var j=g.create(d,{bindUI:function(){this.on("click",this.handleMenuClick,this);this.get("menu").on("show",this._handleMenuShow,this)},_handleMenuShow:function(){this.get("menu").set("highlightedItem",this.get("selectedItem")||this.get("menu").getChildAt(0))},updateCaption_:function(){var a=this.get("selectedItem");this.set("content",a?a.get("content"):this.get("defaultCaption"))},handleMenuClick:function(a){this.set("selectedItem",a.target);this.hideMenu()},
_uiSetSelectedItem:function(a,b){b&&b.prevVal&&b.prevVal.set("selected",false);this.set("value",a&&a.get("value"));this.updateCaption_()},_uiSetDefaultCaption:function(){this.updateCaption_()},_uiSetValue:function(a){for(var b=this.get("menu").get("children"),c=0;c<b.length;c++){var k=b[c];if(k.get("value")==a){this.set("selectedItem",k);return}}this.set("selectedItem",null)}},{ATTRS:{selectedItem:{},selectedIndex:{setter:function(a){this.set("selectedItem",this.get("menu").getChildAt(a))},getter:function(){return f.indexOf(this.get("selectedItem"),
this.get("menu").get("children"))}},defaultCaption:{}}});j.decorate=function(a,b){a=f.one(a);var c=new h(f.mix({prefixCls:b.prefixCls},b.menuCfg)),k,n=a.val();a.all("option").each(function(l){var o=new i({content:l.text(),prefixCls:b.prefixCls,value:l.val()});if(n==l.val())k=o;c.addChild(o)});var m=new j(f.mix({selectedItem:k,menu:c},b));m.render();m.get("el").insertBefore(a);var p;if(p=a.attr("name")){var q=(new e("<input type='hidden' name='"+p+"' value='"+n+"'>")).insertBefore(a);c.on("click",
function(l){q.val(l.target.get("value"))})}a.remove();return m};return j},{requires:["node","uibase","./menubutton","menu","./option"]});KISSY.add("menubutton",function(f,e,g,d){e.Render=g;e.Select=d;return e},{requires:["menubutton/menubutton","menubutton/menubuttonrender","menubutton/select"]});
