/*
Copyright 2010, KISSY UI Library v1.0.8
MIT Licensed
build: 722 Jun 23 16:50
*/
(function(h,i,f){if(h[i]===f)h[i]={};i=h[i];var m=h.document,o=function(b,c,g,k){if(!c||!b)return b;if(g===f)g=true;var n,l,s;if(k&&(s=k.length))for(n=0;n<s;n++){l=k[n];if(l in c)if(g||!(l in b))b[l]=c[l]}else for(l in c)if(g||!(l in b))b[l]=c[l];return b},t=false,r=[],w=false;o(i,{version:"1.0.8",_init:function(){this.Env={mods:{}}},add:function(b,c){this.Env.mods[b]={name:b,fn:c};c(this);return this},ready:function(b){w||this._bindReady();t?b.call(h,this):r.push(b);return this},_bindReady:function(){var b=
this,c=m.documentElement.doScroll,g=c?"onreadystatechange":"DOMContentLoaded";w=true;if(m.readyState==="complete")return b._fireReady();if(m.addEventListener){var k=function(){m.removeEventListener(g,k,false);b._fireReady()};m.addEventListener(g,k,false)}else{if(h!=h.top){var n=function(){if(m.readyState==="complete"){m.detachEvent(g,n);b._fireReady()}};m.attachEvent(g,n)}else{var l=function(){try{c("left");b._fireReady()}catch(s){setTimeout(l,1)}};l()}h.attachEvent("onload",function(){b._fireReady()})}},
_fireReady:function(){if(!t){t=true;if(r){for(var b,c=0;b=r[c++];)b.call(h,this);r=null}}},mix:o,merge:function(){var b={},c,g=arguments.length;for(c=0;c<g;++c)o(b,arguments[c]);return b},augment:function(){var b=arguments,c=b.length-2,g=b[0],k=b[c],n=b[c+1],l=1;if(!i.isArray(n)){k=n;n=f;c++}if(!i.isBoolean(k)){k=f;c++}for(;l<c;l++)o(g.prototype,b[l].prototype||b[l],k,n);return g},extend:function(b,c,g,k){if(!c||!b)return b;var n=Object.prototype,l=c.prototype,s=function(x){function a(){}a.prototype=
x;return new a}(l);b.prototype=s;s.constructor=b;b.superclass=l;if(c!==Object&&l.constructor===n.constructor)l.constructor=c;g&&o(s,g);k&&o(b,k);return b},namespace:function(){var b=arguments.length,c=null,g,k,n;for(g=0;g<b;++g){n=(""+arguments[g]).split(".");c=this;for(k=h[n[0]]===c?1:0;k<n.length;++k)c=c[n[k]]=c[n[k]]||{}}return c},app:function(b,c){var g=h[b]||{};o(g,this,true,["_init","add","namespace"]);g._init();return o(h[b]=g,typeof c==="function"?c():c)},log:function(b,c,g){if(this.Config.debug){if(g)b=
g+": "+b;if(h.console!==f&&console.log)console[c&&console[c]?c:"log"](b)}return this},error:function(b){if(this.Config.debug)throw b;}});i._init();i.Config={debug:""}})(window,"KISSY");
KISSY.add("kissy-lang",function(h,i){function f(a){var d=typeof a;return a===null||d!=="object"&&d!=="function"}var m=window,o=document,t=location,r=Array.prototype,w=r.indexOf,b=r.filter,c=String.prototype.trim,g=Object.prototype.toString,k=encodeURIComponent,n=decodeURIComponent,l=/^\s+|\s+$/g,s=/^(\w+)\[\]$/,x=/\S/;h.mix(h,{isUndefined:function(a){return a===i},isBoolean:function(a){return typeof a==="boolean"},isString:function(a){return typeof a==="string"},isNumber:function(a){return typeof a===
"number"&&isFinite(a)},isPlainObject:function(a){return a&&g.call(a)==="[object Object]"&&!a.nodeType&&!a.setInterval},isEmptyObject:function(a){for(var d in a)return false;return true},isFunction:function(a){return g.call(a)==="[object Function]"},isArray:function(a){return g.call(a)==="[object Array]"},trim:c?function(a){return a==i?"":c.call(a)}:function(a){return a==i?"":a.toString().replace(l,"")},each:function(a,d,e){for(var j=a&&a.length||0,p=0;p<j;++p)d.call(e||m,a[p],p,a)},indexOf:w?function(a,
d){return w.call(d,a)}:function(a,d){for(var e=0,j=d.length;e<j;++e)if(d[e]===a)return e;return-1},inArray:function(a,d){return h.indexOf(a,d)>-1},makeArray:function(a){if(a===null||a===i)return[];if(h.isArray(a))return a;if(typeof a.length!=="number"||typeof a==="string"||h.isFunction(a))return[a];if(a.item&&h.UA.ie){for(var d=[],e=0,j=a.length;e<j;++e)d[e]=a[e];return d}return r.slice.call(a)},filter:b?function(a,d,e){return b.call(a,d,e)}:function(a,d,e){var j=[];h.each(a,function(p,q,u){d.call(e,
p,q,u)&&j.push(p)});return j},param:function(a){if(!h.isPlainObject(a))return"";var d=[],e,j;for(e in a){j=a[e];e=k(e);if(f(j))d.push(e,"=",k(j+""),"&");else if(h.isArray(j)&&j.length)for(var p=0,q=j.length;p<q;++p)f(j[p])&&d.push(e,"[]=",k(j[p]+""),"&")}d.pop();return d.join("")},unparam:function(a,d){if(typeof a!=="string"||(a=h.trim(a)).length===0)return{};var e={};a=a.split(d||"&");for(var j,p,q,u=0,v=a.length;u<v;++u){d=a[u].split("=");j=n(d[0]);try{p=n(d[1]||"")}catch(y){p=d[1]||""}if((q=j.match(s))&&
q[1]){e[q[1]]=e[q[1]]||[];e[q[1]].push(p)}else e[j]=p}return e},later:function(a,d,e,j,p){d=d||0;j=j||{};var q=a,u=h.makeArray(p),v;if(typeof a==="string")q=j[a];q||h.error("method undefined");a=function(){q.apply(j,u)};v=e?setInterval(a,d):setTimeout(a,d);return{id:v,interval:e,cancel:function(){this.interval?clearInterval(v):clearTimeout(v)}}},now:function(){return(new Date).getTime()},globalEval:function(a){if(a&&x.test(a)){var d=o.getElementsByTagName("head")[0]||o.documentElement,e=o.createElement("script");
e.text=a;d.insertBefore(e,d.firstChild);d.removeChild(e)}}});if(t&&t.search&&t.search.indexOf("ks-debug")!==-1)h.Config.debug=true});
KISSY.add("kissy-ua",function(h){var i=navigator.userAgent,f,m={webkit:0,chrome:0,safari:0,gecko:0,firefox:0,ie:0,opera:0,mobile:""},o=function(t){var r=0;return parseFloat(t.replace(/\./g,function(){return r++===0?".":""}))};if((f=i.match(/AppleWebKit\/([\d.]*)/))&&f[1]){m.webkit=o(f[1]);if((f=i.match(/Chrome\/([\d.]*)/))&&f[1])m.chrome=o(f[1]);else if((f=i.match(/\/([\d.]*) Safari/))&&f[1])m.safari=o(f[1]);if(/ Mobile\//.test(i))m.mobile="Apple";else if(f=i.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))m.mobile=
f[0]}else if((f=i.match(/Opera\/.* Version\/([\d.]*)/))&&f[1]){m.opera=o(f[1]);if(i.match(/Opera Mini[^;]*/))m.mobile=f[0]}else if((f=i.match(/MSIE\s([^;]*)/))&&f[1])m.ie=o(f[1]);else if(f=i.match(/Gecko/)){m.gecko=1;if((f=i.match(/rv:([\d.]*)/))&&f[1])m.gecko=o(f[1]);if((f=i.match(/Firefox\/([\d.]*)/))&&f[1])m.firefox=o(f[1])}h.UA=m});
