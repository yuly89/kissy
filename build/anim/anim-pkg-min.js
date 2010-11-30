/*
Copyright 2010, KISSY UI Library v1.1.6
MIT Licensed
build time: Nov 30 13:31
*/
KISSY.add("anim-easing",function(d){var t=Math,o=t.PI,h=t.pow,w=t.sin,l=1.70158,r={easeNone:function(a){return a},easeIn:function(a){return a*a},easeOut:function(a){return(2-a)*a},easeBoth:function(a){return(a*=2)<1?0.5*a*a:0.5*(1- --a*(a-2))},easeInStrong:function(a){return a*a*a*a},easeOutStrong:function(a){return 1- --a*a*a*a},easeBothStrong:function(a){return(a*=2)<1?0.5*a*a*a*a:0.5*(2-(a-=2)*a*a*a)},elasticIn:function(a){if(a===0||a===1)return a;return-(h(2,10*(a-=1))*w((a-0.075)*2*o/0.3))},
elasticOut:function(a){if(a===0||a===1)return a;return h(2,-10*a)*w((a-0.075)*2*o/0.3)+1},elasticBoth:function(a){if(a===0||(a*=2)===2)return a;if(a<1)return-0.5*h(2,10*(a-=1))*w((a-0.1125)*2*o/0.45);return h(2,-10*(a-=1))*w((a-0.1125)*2*o/0.45)*0.5+1},backIn:function(a){if(a===1)a-=0.0010;return a*a*((l+1)*a-l)},backOut:function(a){return(a-=1)*a*((l+1)*a+l)+1},backBoth:function(a){if((a*=2)<1)return 0.5*a*a*(((l*=1.525)+1)*a-l);return 0.5*((a-=2)*a*(((l*=1.525)+1)*a+l)+2)},bounceIn:function(a){return 1-
r.bounceOut(1-a)},bounceOut:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},bounceBoth:function(a){if(a<0.5)return r.bounceIn(a*2)*0.5;return r.bounceOut(a*2-1)*0.5+0.5}};r.NativeTimeFunction={easeNone:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeBoth:"ease-in-out",easeInStrong:"cubic-bezier(0.9, 0.0, 0.9, 0.5)",easeOutStrong:"cubic-bezier(0.1, 0.5, 0.1, 1.0)",easeBothStrong:"cubic-bezier(0.9, 0.0, 0.1, 1.0)"};
d.Easing=r});
KISSY.add("anim",function(d,t){function o(b,c,e,i,f,g){if(b=d.get(b)){if(!(this instanceof o))return new o(b,c,e,i,f,g);var k=d.isPlainObject(e);c=c;this.domEl=b;if(d.isPlainObject(c))c=d.param(c,";").replace(/=/g,":").replace(/%23/g,"#").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();var x={},z=A.length,u;m.innerHTML='<div style="'+c+'"></div>';for(b=m.firstChild.style;z--;)if(u=b[A[z]])x[A[z]]=l(u);this.props=x;this.targetStyle=c;if(k)k=d.merge(v,e);else{k=d.clone(v);if(e)k.duration=p(e)||1;if(d.isString(i)||
d.isFunction(i))k.easing=i;if(d.isFunction(f))k.complete=f;if(g!==t)k.nativeSupport=g}this.config=k;if(k.nativeSupport&&h()&&d.isString(i=k.easing))if(/cubic-bezier\([\s\d.,]+\)/.test(i)||(i=q.NativeTimeFunction[i])){k.easing=i;this.transitionName=h()}d.isFunction(f)&&this.on(n,f)}}function h(){var b="transition",c;if(m.style[b]!==t)c=b;else d.each(["Webkit","Moz","O"],function(e){if(m.style[b=e+"Transition"]!==t){c=b;return false}});h=function(){return c};return c}function w(b,c,e){d.UA.ie&&e.indexOf(j)>
-1&&s.css(b,j,c[j].v);b.style.cssText+=";"+e}function l(b){var c=p(b);b=(b+"").replace(/^[-\d.]+/,"");return isNaN(c)?{v:b,u:"",f:a}:{v:c,u:b,f:r}}function r(b,c,e){return(b+(c-b)*e).toFixed(3)}function a(b,c,e){for(var i=2,f,g,k=[],x=[];f=3,g=arguments[i-1],i--;)if(g.substr(0,4)==="rgb(")for(g=g.match(/\d+/g);f--;)k.push(~~g[f]);else if(g.substr(0,1)==="#"){if(g.length===4)g="#"+g.substr(1,1)+g.substr(1,1)+g.substr(2,1)+g.substr(2,1)+g.substr(3,1)+g.substr(3,1);for(;f--;)k.push(parseInt(g.substr(1+
f*2,2),16))}else return c;for(;f--;){i=~~(k[f+3]+(k[f]-k[f+3])*e);x.push(i<0?0:i>255?255:i)}return"rgb("+x.join(",")+")"}var s=d.DOM,q=d.Easing,p=parseFloat,m=s.create("<div>"),A="backgroundColor borderBottomColor borderBottomWidth borderBottomStyle borderLeftColor borderLeftWidth borderLeftStyle borderRightColor borderRightWidth borderRightStyle borderSpacing borderTopColor borderTopWidth borderTopStyle bottom color font fontFamily fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex".split(" "),
j="opacity",n="complete",v={duration:1,easing:"easeNone",nativeSupport:true};d.augment(o,d.EventTarget,{run:function(){var b=this,c=b.config,e=b.domEl,i,f,g,k,x=b.props,z={},u;for(u in x)z[u]=l(s.css(e,u));if(b.fire("start")!==false){b.stop();if(b.transitionName)b._nativeRun();else{i=c.duration*1E3;g=d.now();k=g+i;f=c.easing;if(d.isString(f))f=q[f]||q.easeNone;b.timer=d.later(c=function(){var C=d.now(),E=C>k?1:(C-g)/i,B,y,D;for(u in x){B=z[u];y=x[u];if(y.v==0)y.u=B.u;if(B.u!==y.u)B.v=0;s.css(e,u,
y.f(B.v,y.v,f(E))+y.u)}if(b.fire("step")===false||(D=C>k)){b.stop();D&&b.fire(n)}},13,true);c()}return b}},_nativeRun:function(){var b=this,c=b.config,e=b.domEl,i=b.props,f=c.duration*1E3;c=c.easing;var g=b.transitionName,k={};k[g+"Property"]="all";k[g+"Duration"]=f+"ms";k[g+"TimingFunction"]=c;s.css(e,k);d.later(function(){w(e,i,b.targetStyle)},0);d.later(function(){b.stop(true)},f)},stop:function(b){if(this.transitionName)this._nativeStop(b);else{if(this.timer){this.timer.cancel();this.timer=t}if(b){w(this.domEl,
this.props,this.targetStyle);this.fire(n)}}return this},_nativeStop:function(b){var c=this.domEl,e=this.transitionName,i=this.props,f;if(b){s.css(c,e+"Property","none");this.fire(n)}else{for(f in i)s.css(c,f,s._getComputedStyle(c,f));s.css(c,e+"Property","none")}}});o.supportTransition=function(){return!!h()};d.Anim=o});
KISSY.add("anim-node-plugin",function(d,t){function o(j,n,v,b,c){if(n==="toggle"){c=h.css(j,l)===r?1:0;n="show"}if(c)h.css(j,l,h.data(j,l)||"");var e={},i={};d.each(A[n],function(f){if(f===a){e[a]=h.css(j,a);h.css(j,a,s)}else if(f===q){e[q]=h.css(j,q);i.opacity=c?1:0;c&&h.css(j,q,0)}else if(f===p){e[p]=h.css(j,p);i.height=c?h.css(j,p)||j.naturalHeight:0;c&&h.css(j,p,0)}else if(f===m){e[m]=h.css(j,m);i.width=c?h.css(j,m)||j.naturalWidth:0;c&&h.css(j,m,0)}});(new d.Anim(j,i,v,"easeOut",function(){if(!c){var f=
j.style,g=f[l];if(g!==r){g&&h.data(j,l,g);f[l]=r}e[p]&&h.css(j,{height:e[p]});e[m]&&h.css(j,{height:e[m]});e[q]&&h.css(j,{height:e[q]});e[a]&&h.css(j,{height:e[a]})}b&&d.isFunction(b)&&b()})).run()}var h=d.DOM,w=d.Anim,l="display",r="none",a="overflow",s="hidden",q="opacity",p="height",m="width",A={show:[a,q,p,m],fade:[q],slide:[a,p]};d.each([d.Node.prototype,d.NodeList.prototype],function(j){j.animate=function(){var n=d.makeArray(arguments);d.each(this,function(v){w.apply(t,[v].concat(n)).run()});
return this};d.each({show:["show",1],hide:["show",0],toggle:["toggle"],fadeIn:["fade",1],fadeOut:["fade",0],slideDown:["slide",1],slideUp:["slide",0]},function(n,v){j[v]=function(b,c){h[v]&&arguments.length===0?h[v](this):d.each(this,function(e){o(e,n[0],b,c,n[1])});return this}})})});
