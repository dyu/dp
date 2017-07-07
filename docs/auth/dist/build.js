var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,g,p){c!=Array.prototype&&c!=Object.prototype&&(c[g]=p.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(c,g,p,m){if(g){p=$jscomp.global;c=c.split(".");for(m=0;m<c.length-1;m++){var e=c[m];e in p||(p[e]={});p=p[e]}c=c[c.length-1];m=p[c];g=g(m);g!=m&&null!=g&&$jscomp.defineProperty(p,c,{configurable:!0,writable:!0,value:g})}};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;
$jscomp.Symbol=function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+$jscomp.symbolCounter_++};$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.arrayIterator=function(c){var g=0;return $jscomp.iteratorPrototype(function(){return g<c.length?{done:!1,value:c[g++]}:{done:!0}})};$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};
$jscomp.iteratorFromArray=function(c,g){$jscomp.initSymbolIterator();c instanceof String&&(c+="");var p=0,m={next:function(){if(p<c.length){var e=p++;return{value:g(e,c[e]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};$jscomp.polyfill("Array.prototype.entries",function(c){return c?c:function(){return $jscomp.iteratorFromArray(this,function(c,p){return[c,p]})}},"es6-impl","es3");
$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var g=c[Symbol.iterator];return g?g.call(c):$jscomp.arrayIterator(c)};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function g(){this.batch_=null}function p(f){return f instanceof e?f:new e(function(c,e){c(f)})}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;g.prototype.asyncExecute=function(f){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(f);return this};g.prototype.asyncExecuteBatch_=function(){var f=this;this.asyncExecuteFunction(function(){f.executeBatch_()})};var m=$jscomp.global.setTimeout;g.prototype.asyncExecuteFunction=function(f){m(f,
0)};g.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var f=this.batch_;this.batch_=[];for(var c=0;c<f.length;++c){var e=f[c];delete f[c];try{e()}catch(y){this.asyncThrow_(y)}}}this.batch_=null};g.prototype.asyncThrow_=function(c){this.asyncExecuteFunction(function(){throw c;})};var e=function(c){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var f=this.createResolveAndReject_();try{c(f.resolve,f.reject)}catch(w){f.reject(w)}};e.prototype.createResolveAndReject_=
function(){function c(c){return function(f){g||(g=!0,c.call(e,f))}}var e=this,g=!1;return{resolve:c(this.resolveTo_),reject:c(this.reject_)}};e.prototype.resolveTo_=function(c){if(c===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(c instanceof e)this.settleSameAsPromise_(c);else{a:switch(typeof c){case "object":var f=null!=c;break a;case "function":f=!0;break a;default:f=!1}f?this.resolveToNonPromiseObj_(c):this.fulfill_(c)}};e.prototype.resolveToNonPromiseObj_=function(c){var f=
void 0;try{f=c.then}catch(w){this.reject_(w);return}"function"==typeof f?this.settleSameAsThenable_(f,c):this.fulfill_(c)};e.prototype.reject_=function(c){this.settle_(2,c)};e.prototype.fulfill_=function(c){this.settle_(1,c)};e.prototype.settle_=function(c,e){if(0!=this.state_)throw Error("Cannot settle("+c+", "+e|"): Promise already settled in state"+this.state_);this.state_=c;this.result_=e;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var c=
this.onSettledCallbacks_,e=0;e<c.length;++e)c[e].call(),c[e]=null;this.onSettledCallbacks_=null}};var L=new g;e.prototype.settleSameAsPromise_=function(c){var e=this.createResolveAndReject_();c.callWhenSettled_(e.resolve,e.reject)};e.prototype.settleSameAsThenable_=function(c,e){var f=this.createResolveAndReject_();try{c.call(e,f.resolve,f.reject)}catch(y){f.reject(y)}};e.prototype.then=function(c,g){function f(c,e){return"function"==typeof c?function(e){try{p(c(e))}catch(l){m(l)}}:e}var p,m,X=new e(function(c,
e){p=c;m=e});this.callWhenSettled_(f(c,p),f(g,m));return X};e.prototype.catch=function(c){return this.then(void 0,c)};e.prototype.callWhenSettled_=function(c,e){function f(){switch(g.state_){case 1:c(g.result_);break;case 2:e(g.result_);break;default:throw Error("Unexpected state: "+g.state_);}}var g=this;null==this.onSettledCallbacks_?L.asyncExecute(f):this.onSettledCallbacks_.push(function(){L.asyncExecute(f)})};e.resolve=p;e.reject=function(c){return new e(function(e,f){f(c)})};e.race=function(c){return new e(function(e,
f){for(var g=$jscomp.makeIterator(c),m=g.next();!m.done;m=g.next())p(m.value).callWhenSettled_(e,f)})};e.all=function(c){var f=$jscomp.makeIterator(c),g=f.next();return g.done?p([]):new e(function(c,e){function m(e){return function(f){w[e]=f;y--;0==y&&c(w)}}var w=[],y=0;do w.push(void 0),y++,p(g.value).callWhenSettled_(m(w.length-1),e),g=f.next();while(!g.done)})};return e},"es6-impl","es3");
$jscomp.polyfill("Array.prototype.keys",function(c){return c?c:function(){return $jscomp.iteratorFromArray(this,function(c){return c})}},"es6-impl","es3");
(function(){function c(a,b,d){Object.defineProperty(a,b,{enumerable:!1,configurable:!0,value:d});return d}function g(a){return Array.isArray(a)?a[1]["1"]:String(a)}function p(a){for(var b=[],d=0;d<a.length;d+=3)for(var h=a[d]<<16|a[d+1]<<8|a[d+2],c=0;4>c;c++)8*d+6*c<=8*a.length?b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h>>>6*(3-c)&63)):b.push("\x3d");return b.join("")}function m(a){a=a.replace(/[^A-Z0-9+\/]/ig,"");for(var b=[],d=0,h=0;d<a.length;h=++d%4)0!==
h&&b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(d-1))&Math.pow(2,-2*h+8)-1)<<2*h|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(d))>>>6-2*h);return b}function e(a){var b=a.status;if(200>b||299<b)throw b;return a.text()}function L(a){var b=a.charAt(0),d=a.length,d="\n"===a.charAt(d-1)?d-2:d;if("+"===b){a=JSON.parse(a.substring(1,d));if(a[0])throw a;return 2===a.length?a[1]:a}if("-"!==b)throw Error("Malformed response.");
if("["!==a.charAt(1))throw Error(a.substring(1,d));throw JSON.parse(a.substring(1,d));}function f(a){a=Y.getItem(a);return null==a?null:JSON.parse(a)}function X(a,b){try{return Y.setItem(a,JSON.stringify(b)),!0}catch(d){return!1}}function w(a){return wa.hex(a)}function y(a,b){window.open(a,b,"width\x3d450,height\x3d500,location\x3d1,status\x3d1,resizable\x3dyes").moveTo(window.innerWidth/2-225,window.innerHeight/2-250)}function ta(a){ia=a;H||(window.handleOauth=a)}function ha(a){a=a.data;a="string"===
typeof a?JSON.parse(a):a;Array.isArray(a)&&3===a.length&&a[2]===Z&&ia(a[0],a[1])}function ua(a){return{orig:a}}function va(a,b){b=b.orig;for(var d in a)b[d]=a[d]}function z(a){for(var b=arguments,d,h,c=1,e=arguments.length;c<e;c++)for(d in h=b[c],h)a[d]=h[d];return a}function l(a,b){b.appendChild(a)}function K(a){a.parentNode.removeChild(a)}function r(a){return document.createElement(a)}function k(a){return document.createTextNode(a)}function N(a,b){return a!==b||a&&"object"===typeof a||"function"===
typeof a}function M(a,b,d,h){for(var c in b)if(c in d){var e=d[c],f=h[c];if(N(e,f)){var g=b[c];if(g)for(var k=0;k<g.length;k+=1){var l=g[k];l.__calling||(l.__calling=!0,l.call(a,e,f),l.__calling=!1)}}}}function xa(a,b){var d,c=r("li");c.className="hide";b.refs.root=c;var e=k(d=a.pojo["3"]);c.appendChild(e);return{mount:function(a,b){a.insertBefore(c,b)},update:function(a,b){d!==(d=b.pojo["3"])&&(e.data=d)},unmount:function(){K(c)},destroy:function(){b.refs.root===c&&(b.refs.root=null)}}}function O(a){a=
a||{};this.refs={};this._state=z(ba.data(),a.data);this._observers={pre:Object.create(null),post:Object.create(null)};this._handlers=Object.create(null);this._root=a._root||this;this._yield=a._yield;this._torndown=!1;this._fragment=xa(this._state,this);a.target&&this._fragment.mount(a.target,null);a._root?a._root._renderHooks.push(ba.oncreate.bind(this)):ba.oncreate.call(this)}function ja(a,b,d,c){if(c||"page"in b&&N(a.page,d.page)||"size"in b&&N(a.size,d.size)||"desc"in b&&N(a.desc,d.desc)||"store"in
b&&N(a.store,d.store))a.page_info=b.page_info=P.computed.page_info(a.page,a.size,a.desc,a.store)}function ya(a,b){function d(a){a=b.get();b.goto(0,a.store)}function c(a){a=b.get();b.prevOrLoad(a.store)}function e(a){a=b.get();b.nextOrLoad(a.store)}function f(a){a=b.get();b.goto(a.page_count,a.store)}function g(a){b.set({errmsg:""})}var m,p,aa,t,I,w,J,x=r("div"),E=r("ul");x.appendChild(E);E.className="list";var n=r("li");E.appendChild(n);n.className="header";var q=r("b");n.appendChild(q);l(k("Users"),
q);l(k("\n    "),n);var F=r("button");n.appendChild(F);F.className="outlined";F.disabled=m=a.loading||0===a.page;F.addEventListener("click",d,!1);l(k("\x3c\x3c"),F);l(k("\n    "),n);var v=r("button");n.appendChild(v);v.className="outlined";v.disabled=p=a.loading;v.addEventListener("click",c,!1);q=r("b");v.appendChild(q);l(k("\x3c"),q);l(k("\n    "),n);var A=r("button");n.appendChild(A);A.className="outlined";A.disabled=aa=a.loading||0===a.size;A.addEventListener("click",e,!1);q=r("b");A.appendChild(q);
l(k("\x3e"),q);l(k("\n    "),n);var B=r("button");n.appendChild(B);B.className="outlined";B.disabled=t=a.loading||a.page_count===a.page;B.addEventListener("click",f,!1);l(k("\x3e\x3e"),B);l(k("\n    "),n);q=r("span");n.appendChild(q);l(k("\u00a0\u00a0"),q);var y=k(I=a.page_info);q.appendChild(y);l(k("\n    "),n);var C=r("div");n.appendChild(C);C.className=w=a.errmsg?"msg error":"hide";var G=r("b");C.appendChild(G);G.addEventListener("click",g,!1);l(k("x"),G);l(k("\n      "),C);n=r("span");C.appendChild(n);
var Q=k(J=a.errmsg);n.appendChild(Q);for(var n=a.items,u=[],q=0;q<n.length;q+=1)u[q]=la(a,n,n[q],q,b),u[q].mount(E,null);return{mount:function(a,b){a.insertBefore(x,b)},update:function(a,d){m!==(m=d.loading||0===d.page)&&(F.disabled=m);p!==(p=d.loading)&&(v.disabled=p);aa!==(aa=d.loading||0===d.size)&&(A.disabled=aa);t!==(t=d.loading||d.page_count===d.page)&&(B.disabled=t);I!==(I=d.page_info)&&(y.data=I);w!==(w=d.errmsg?"msg error":"hide")&&(C.className=w);J!==(J=d.errmsg)&&(Q.data=J);var c=d.items;
if("items"in a){for(var h=0;h<c.length;h+=1)u[h]?u[h].update(a,d,c,c[h],h):(u[h]=la(d,c,c[h],h,b),u[h].mount(E,null));for(;h<u.length;h+=1)u[h].unmount(),u[h].destroy();u.length=c.length}},unmount:function(){K(x);for(var a=0;a<u.length;a+=1)u[a].unmount()},destroy:function(){F.removeEventListener("click",d,!1);v.removeEventListener("click",c,!1);A.removeEventListener("click",e,!1);B.removeEventListener("click",f,!1);G.removeEventListener("click",g,!1);for(var a=0;a<u.length;a+=1)u[a]&&u[a].destroy(!1)}}}
function la(a,b,d,c,e){var h=new O({target:null,_root:e._root,data:{item:d}});return{mount:function(a,b){h._fragment.mount(a,b)},update:function(a,b,d,c,e){b={};"items"in a&&(b.item=c);Object.keys(b).length&&h.set(b)},unmount:function(){h._fragment.unmount()},destroy:function(){h.destroy(!1)}}}function S(a){a=a||{};this._state=z(P.data(),a.data);ja(this._state,this._state,{},!0);this._observers={pre:Object.create(null),post:Object.create(null)};this._handlers=Object.create(null);this._root=a._root||
this;this._yield=a._yield;this._torndown=!1;this._renderHooks=[];this._fragment=ya(this._state,this);a.target&&this._fragment.mount(a.target,null);this._flush();a._root?a._root._renderHooks.push(P.oncreate.bind(this)):P.oncreate.call(this)}function za(a,b){function d(a){b.set({errmsg:""})}function c(a){b.pop("google")}function e(a){b.pop("github")}function f(a){b.pop("gitlab")}function g(a){b.pop("bitbucket")}function m(a){b.pop("facebook")}function p(a){b.logout()}var t,w,I,y,J,x=r("div");x.className=
t=a.errmsg?"msg error":"hide";var E=r("b");x.appendChild(E);E.addEventListener("click",d,!1);l(k("x"),E);l(k("\n  "),x);var n=r("span");x.appendChild(n);var q=k(w=a.errmsg);n.appendChild(q);var F=k("\n"),v=r("div");v.className=I=a.authenticated?"hide":"";n=r("span");v.appendChild(n);l(k("Login with"),n);l(k("\n  "),v);var A=r("button");v.appendChild(A);A.className="stripped";A.addEventListener("click",c,!1);l(k("google"),A);l(k(" |\n  "),v);var B=r("button");v.appendChild(B);B.className="stripped";
B.addEventListener("click",e,!1);l(k("github"),B);l(k(" |\n  "),v);var z=r("button");v.appendChild(z);z.className="stripped";z.addEventListener("click",f,!1);l(k("gitlab"),z);l(k(" |\n  "),v);var C=r("button");v.appendChild(C);C.className="stripped";C.addEventListener("click",g,!1);l(k("bitbucket"),C);l(k(" |\n  "),v);var G=r("button");v.appendChild(G);G.className="stripped";G.addEventListener("click",m,!1);l(k("facebook"),G);var Q=k("\n"),u=r("div");u.className=y=a.authenticated?"":"hide";n=r("span");
u.appendChild(n);n.className="name";var ka=k(J=a.user_nick);n.appendChild(ka);l(k("\u00a0\u00a0\n  "),u);var R=r("button");u.appendChild(R);R.className="outlined";R.addEventListener("click",p,!1);l(k("Logout"),R);l(k("\n  "),u);var D=a.init&&ma(a,b);D&&D.mount(u,null);return{mount:function(a,b){a.insertBefore(x,b);a.insertBefore(F,b);a.insertBefore(v,b);a.insertBefore(Q,b);a.insertBefore(u,b)},update:function(a,d){t!==(t=d.errmsg?"msg error":"hide")&&(x.className=t);w!==(w=d.errmsg)&&(q.data=w);I!==
(I=d.authenticated?"hide":"")&&(v.className=I);y!==(y=d.authenticated?"":"hide")&&(u.className=y);J!==(J=d.user_nick)&&(ka.data=J);d.init?D||(D=ma(d,b),D.mount(u,null)):D&&(D.unmount(),D.destroy(),D=null)},unmount:function(){K(x);K(F);K(v);K(Q);K(u);D&&D.unmount()},destroy:function(){E.removeEventListener("click",d,!1);A.removeEventListener("click",c,!1);B.removeEventListener("click",e,!1);z.removeEventListener("click",f,!1);C.removeEventListener("click",g,!1);G.removeEventListener("click",m,!1);
R.removeEventListener("click",p,!1);D&&D.destroy()}}}function ma(a,b){var d=new S({target:null,_root:b._root});return{mount:function(a,b){d._fragment.mount(a,b)},unmount:function(){d._fragment.unmount()},destroy:function(){d.destroy(!1)}}}function T(a){a=a||{};this._state=z(ca.data(),a.data);this._observers={pre:Object.create(null),post:Object.create(null)};this._handlers=Object.create(null);this._root=a._root||this;this._yield=a._yield;this._torndown=!1;this._renderHooks=[];this._fragment=za(this._state,
this);a.target&&this._fragment.mount(a.target,null);this._flush();a._root?a._root._renderHooks.push(ca.oncreate.bind(this)):ca.oncreate.call(this)}var Aa=function(){var a=window.Binary,b=window.btoa,d;return a&&(d=a.bytesToString)&&"function"===typeof d&&"function"===typeof b?function(a){return b(d(a))}:p}(),na=function(){var a=window.Binary,b=window.atob,d;return a&&(d=a.stringToBytes)&&"function"===typeof d&&"function"===typeof b?function(a){return d(b(a))}:m}();(function(){var a=new Date;a.setHours(0);
a.setMinutes(0);a.setSeconds(0);a.setMilliseconds(0);a=-10*a.getTimezoneOffset()/6;0>a?(a=(a-1E4).toString(),a=a.charAt(0)+a.substr(2)):(a=(a+1E4).toString(),a="+"+a.substr(1));return 0===a.indexOf("+")?parseInt(a.substring(1,a.length-2),10):0===a.indexOf("-")?-parseInt(a.substring(1,a.length-2),10):-parseInt(a.substring(10,a.length-2),10)})();(function(a){function b(a){"string"!==typeof a&&(a=String(a));if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");
return a.toLowerCase()}function d(a){"string"!==typeof a&&(a=String(a));return a}function c(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};q.iterable&&(b[Symbol.iterator]=function(){return b});return b}function e(a){this.map={};a instanceof e?a.forEach(function(a,b){this.append(b,a)},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function f(a){if(a.bodyUsed)return Promise.reject(new TypeError("Already read"));a.bodyUsed=!0}function g(a){return new Promise(function(b,
d){a.onload=function(){b(a.result)};a.onerror=function(){d(a.error)}})}function k(a){var b=new FileReader,d=g(b);b.readAsArrayBuffer(a);return d}function l(a){a=new Uint8Array(a);for(var b=Array(a.length),d=0;d<a.length;d++)b[d]=String.fromCharCode(a[d]);return b.join("")}function m(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);b.set(new Uint8Array(a));return b.buffer}function p(){this.bodyUsed=!1;this._initBody=function(a){if(this._bodyInit=a)if("string"===typeof a)this._bodyText=
a;else if(q.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(q.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(q.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(q.arrayBuffer&&q.blob&&v(a))this._bodyArrayBuffer=m(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(q.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||A(a)))this._bodyArrayBuffer=m(a);else throw Error("unsupported BodyInit type");
else this._bodyText="";this.headers.get("content-type")||("string"===typeof a?this.headers.set("content-type","text/plain;charset\x3dUTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):q.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset\x3dUTF-8"))};q.blob&&(this.blob=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));
if(this._bodyFormData)throw Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(k)});this.text=function(){var a=f(this);if(a)return a;if(this._bodyBlob){var a=this._bodyBlob,b=new FileReader,d=g(b);b.readAsText(a);return d}if(this._bodyArrayBuffer)return Promise.resolve(l(this._bodyArrayBuffer));if(this._bodyFormData)throw Error("could not read FormData body as text");
return Promise.resolve(this._bodyText)};q.formData&&(this.formData=function(){return this.text().then(t)});this.json=function(){return this.text().then(JSON.parse)};return this}function r(a,b){b=b||{};var d=b.body;if("string"===typeof a)this.url=a;else{if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url;this.credentials=a.credentials;b.headers||(this.headers=new e(a.headers));this.method=a.method;this.mode=a.mode;d||null==a._bodyInit||(d=a._bodyInit,a.bodyUsed=!0)}this.credentials=b.credentials||
this.credentials||"omit";if(b.headers||!this.headers)this.headers=new e(b.headers);a=b.method||this.method||"GET";var c=a.toUpperCase();this.method=-1<B.indexOf(c)?c:a;this.mode=b.mode||this.mode||null;this.referrer=null;if(("GET"===this.method||"HEAD"===this.method)&&d)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(d)}function t(a){var b=new FormData;a.trim().split("\x26").forEach(function(a){if(a){var d=a.split("\x3d");a=d.shift().replace(/\+/g," ");d=d.join("\x3d").replace(/\+/g,
" ");b.append(decodeURIComponent(a),decodeURIComponent(d))}});return b}function w(a){var b=new e;a.split("\r\n").forEach(function(a){var d=a.split(":");if(a=d.shift().trim())d=d.join(":").trim(),b.append(a,d)});return b}function x(a,b){b||(b={});this.type="default";this.status="status"in b?b.status:200;this.ok=200<=this.status&&300>this.status;this.statusText="statusText"in b?b.statusText:"OK";this.headers=new e(b.headers);this.url=b.url||"";this._initBody(a)}if(!a.fetch){var y="Symbol"in a&&"iterator"in
Symbol,n;if(n="FileReader"in a&&"Blob"in a)try{new Blob,n=!0}catch(C){n=!1}var q={searchParams:"URLSearchParams"in a,iterable:y,blob:n,formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};if(q.arrayBuffer){var z="[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]".split(";");var v=function(a){return a&&DataView.prototype.isPrototypeOf(a)};var A=ArrayBuffer.isView||
function(a){return a&&-1<z.indexOf(Object.prototype.toString.call(a))}}e.prototype.append=function(a,c){a=b(a);c=d(c);var h=this.map[a];h||(h=[],this.map[a]=h);h.push(c)};e.prototype["delete"]=function(a){delete this.map[b(a)]};e.prototype.get=function(a){return(a=this.map[b(a)])?a[0]:null};e.prototype.getAll=function(a){return this.map[b(a)]||[]};e.prototype.has=function(a){return this.map.hasOwnProperty(b(a))};e.prototype.set=function(a,c){this.map[b(a)]=[d(c)]};e.prototype.forEach=function(a,b){Object.getOwnPropertyNames(this.map).forEach(function(d){this.map[d].forEach(function(c){a.call(b,
c,d,this)},this)},this)};e.prototype.keys=function(){var a=[];this.forEach(function(b,d){a.push(d)});return c(a)};e.prototype.values=function(){var a=[];this.forEach(function(b){a.push(b)});return c(a)};e.prototype.entries=function(){var a=[];this.forEach(function(b,d){a.push([d,b])});return c(a)};q.iterable&&(e.prototype[Symbol.iterator]=e.prototype.entries);var B="DELETE GET HEAD OPTIONS POST PUT".split(" ");r.prototype.clone=function(){return new r(this,{body:this._bodyInit})};p.call(r.prototype);
p.call(x.prototype);x.prototype.clone=function(){return new x(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new e(this.headers),url:this.url})};x.error=function(){var a=new x(null,{status:0,statusText:""});a.type="error";return a};var H=[301,302,303,307,308];x.redirect=function(a,b){if(-1===H.indexOf(b))throw new RangeError("Invalid status code");return new x(null,{status:b,headers:{location:a}})};a.Headers=e;a.Request=r;a.Response=x;a.fetch=function(a,b){return new Promise(function(d,
c){var h=new r(a,b),e=new XMLHttpRequest;e.onload=function(){var a={status:e.status,statusText:e.statusText,headers:w(e.getAllResponseHeaders()||"")};a.url="responseURL"in e?e.responseURL:a.headers.get("X-Request-URL");d(new x("response"in e?e.response:e.responseText,a))};e.onerror=function(){c(new TypeError("Network request failed"))};e.ontimeout=function(){c(new TypeError("Network request failed"))};e.open(h.method,h.url,!0);"include"===h.credentials&&(e.withCredentials=!0);"responseType"in e&&
q.blob&&(e.responseType="blob");h.headers.forEach(function(a,b){e.setRequestHeader(b,a)});e.send("undefined"===typeof h._bodyInit?null:h._bodyInit)})};a.fetch.polyfill=!0}})("undefined"!==typeof self?self:void 0);var oa=function(){function a(a,d,c,e){this.url=a;this.opts=d;this.ih=c;this.ah=e;this.handlers=[];this.authOk=this.cbFail=null}a.prototype.then=function(a,d){this.cbFail?console.warn("Cannot add a resolve/reject handler once a reject handler is provided."):a?this.handlers.push(a):(this.handlers.push(d),
this.run());return this};a.prototype.catch=function(a){this.cbFail?console.warn("Only one reject handler is allowed."):(this.handlers.push(a),this.run());return this};a.prototype.run=function(a){var b=this.url;a&&(b=b.substring(0,b.lastIndexOf("\x3d")+1)+a);a=fetch(b,this.opts).then(this.ih).then(L);for(var b=this.handlers,c=b.length-1,e=0;e<c;)a.then(b[e++]);a.then(void 0,this.cbFail||(this.cbFail=this.fail.bind(this)))};a.prototype.fail=function(a){if(this.ah&&(401===a||Array.isArray(a)&&3===a[0]))this.ah(this.authOk||
(this.authOk=this.run.bind(this)));else this.handlers[this.handlers.length-1](a)};return a}(),t={auth$$:void 0,get$$:function(a,b,d,c){var h=da.auth$$;U&&(a=U+a);return d||h?new oa(a,b,c||e,h):fetch(a,b).then(c||e).then(L)},post$$:function(a,b,d,c){var h=da.auth$$;b={method:"POST",body:b};U&&(a=U+a);return d||h?new oa(a,b,c||e,h):fetch(a,b).then(c||e).then(L)}};window.rpc_config_d=t;var da=window.rpc_config||t,U=window.rpc_host||"",V={},t=Object.freeze({getItem:function(a){return V[a]},setItem:function(a,
b){V[a]=b;return!0},removeItem:function(a){return a in V&&delete V[a]},clear:function(){V={};return!0}}),Y=window.localStorage||t,Ba=function(a){var b=0;a+="x";for(var d=0;d<a.length;d++)2147483647<b&&(b=parseInt(b/137)),b=131*b+a.charCodeAt(d);return b},Ca=function(a){var b="#";a.forEach(function(a){16>a&&(b+=0);b+=a.toString(16)});return b},Da=function(a,b,d){a/=360;var c=.5>d?d*(1+b):d+b-d*b,e=2*d-c;return[a+1/3,a,a-1/3].map(function(a){0>a&&a++;1<a&&a--;a=a<1/6?e+6*(c-e)*a:.5>a?c:a<2/3?e+6*(c-
e)*(2/3-a):e;return Math.round(255*a)})},t=function(a){a=a||{};var b=[a.lightness,a.saturation].map(function(a){a=a||[.35,.5,.65];return"[object Array]"===Object.prototype.toString.call(a)?a.concat():[a]});this.L=b[0];this.S=b[1];this.hash=a.hash||Ba};t.prototype.hsl=function(a){var b=this.hash(a);a=b%359;b=parseInt(b/360);var d=this.S[b%this.S.length];b=parseInt(b/this.S.length);return[a,d,this.L[b%this.L.length]]};t.prototype.rgb=function(a){a=this.hsl(a);return Da.apply(this,a)};t.prototype.hex=
function(a){a=this.rgb(a);return Ca(a)};var wa=new t,t=window.auth_config||{},H=t.host||"",Ea=t.flags||0,pa=t.proxy||H+"/iframe/",fa="",ga=H&&document.createElement("iframe"),qa=window.location.href,ra=window.addEventListener||window.attachEvent,sa=window.addEventListener?"message":"onmessage",ia,W,Z,ea,Fa=function(){function a(a,d,c,e,f,g,k){this.vm=a;this.createFn=d;this.mergeFn=c;this.page=this._fetchTs=this._fetchType=0;this.fetch_key="fetch";this.pageSize=e;this.createFn=d;this.mergeFn=c;this.multiplier=
f||1;this.desc=g||!0;this.list=k||[]}a.prototype.latest=function(){var a=this.list.length;return 0===a?null:this.desc?this.list[0].orig:this.list[a-1].orig};a.prototype.prepend=function(a){this.list.unshift(this.createFn(a))};a.prototype.prependAll=function(a,d){if(1===a.length)this.list.unshift(this.createFn(a[0]));else if(d)for(d=a.length;0<d--;)this.list.unshift(this.createFn(a[d]));else{d=0;for(var b=a.length;d<b;d++)this.list.unshift(this.createFn(a[d]))}};a.prototype.append=function(a){this.list.push(this.createFn(a))};
a.prototype.appendAll=function(a,d){if(1===a.length)this.list.push(this.createFn(a[0]));else if(d)for(d=a.length;0<d--;)this.list.push(this.createFn(a[d]));else{d=0;for(var b=a.length;d<b;d++)this.list.push(this.createFn(a[d]))}};a.prototype.cbFetchFailed=function(a){this.vm.set({loading:!1,errmsg:g(a)})};a.prototype.cbFetchSuccess=function(a){var b=this._fetchType;if(0!==b){this._fetchType=0;a=Array.isArray(a)?a:a&&a["1"];switch(b){case 1:if(!a||!a.length){this.vm.set({loading:!1});return}this.list.length&&
this.desc?this.prependAll(a,!0):this.appendAll(a);break;case 2:if(!a||!a.length){this.vm.set({loading:!1});return}this.desc?this.appendAll(a):this.prependAll(a,!0);break;case 3:this._update(a)}b=this.pageSize;a=this.list.length;this.vm.set({loading:!1,size:a,page:a<=b?0:this.page,page_count:Math.floor((a-1)/b)})}};a.prototype._update=function(a){var b=this.list.length;if(!a||!a.length){if(b<=this.pageSize)return this.list=[],!0;a=this.page*this.pageSize;this.list.splice(a,b-a);return!0}for(var c=
a.length,e=this.pageSize,f=0,g=0,k=this.page*e,l,m;;){m=a[f];l=this.list[k];if(m["1"]===l.orig["1"]){f++;this.mergeFn(m,l);if(++k===b)break;if(f!==c)continue;if(c===e)break;this.list.splice(k,1);g++;break}this.list.splice(k,1);g++;b--;if(k===b)break}for(b=f;b<c;b++)this.list.push(this.createFn(a[b]));return 0!==g};a.prototype.fetchNewer=function(a){if(this.vm.get("loading"))return!1;var b=Date.now();if(a&&500>b-this._fetchTs)return!1;(a=!this.list.length)&&!this.desc&&(this.desc=!0);a={1:a,2:a?this.pageSize*
this.multiplier+1:this.desc?this.pageSize:this.pageSize*this.multiplier,3:a?void 0:this.desc?this.list[0].orig["1"]:this.list[this.list.length-1].orig["1"],4:void 0};this._fetchTs=b;this._fetchType=1;this.vm[this.fetch_key](a);this.vm.set({loading:!0,errmsg:"",desc:this.desc});return!0};a.prototype.fetchOlder=function(a){if(!this.list.length||this.vm.get("loading"))return!1;var b=Date.now();if(a&&500>b-this._fetchTs)return!1;a={1:!0,2:this.desc?this.pageSize*this.multiplier:this.pageSize,3:this.desc?
this.list[this.list.length-1].orig["1"]:this.list[0].orig["1"],4:void 0};this._fetchTs=b;this._fetchType=2;this.vm[this.fetch_key](a);this.vm.set({loading:!0,errmsg:""});return!0};a.prototype.fetchUpdate=function(a){if(!this.list.length)return this.fetchNewer(a);if(this.vm.get("loading"))return!1;var b=Date.now();if(a&&500>b-this._fetchTs)return!1;var c=this.list[this.page*this.pageSize];a=this.desc;var e=Math.min(this.pageSize,this.list.length);this.desc?(c=na(c.orig["1"]),c[c.length-1]|=2):(c=na(c.orig["1"]),
c[c.length-1]&=254);c=Aa(c);a={1:a,2:e,3:c,4:void 0};this._fetchTs=b;this._fetchType=3;this.vm[this.fetch_key](a);this.vm.set({loading:!0,errmsg:""});return!0};a.prototype.isVisible=function(a){var b=this.page*this.pageSize;return b===a||a>b&&a<b+this.pageSize};a.prototype.toggleDesc=function(a,d){if(this.vm.get("loading"))return this.desc;var b=!this.desc;this.desc=b;1<this.list.length&&(this.list=this.list.reverse());a&&a(d);this.vm.set({desc:b});return b};a.prototype.prevOrLoad=function(){var a=
this.vm,d=a.get(),c=d.page;c?a.set({page:this.page=c-1}):d.desc?this.fetchNewer():this.fetchOlder()};a.prototype.nextOrLoad=function(){var a=this.vm,d=a.get(),c=d.page;c<d.page_count?a.set({page:this.page=c+1}):d.desc?this.fetchOlder():this.fetchNewer()};a.prototype.goto=function(a){this.vm.set({page:this.page=a})};a.prototype.page_info=function(){var a=this.list.length,d;return a?a===(d=this.page*this.pageSize+1)?d+" of "+a:d+" - "+Math.min(d+this.pageSize-1,a)+" of "+a:""};a.prototype.page_items=
function(){var a=this.list.length,d,c;return 0===a||a<=(d=this.pageSize)?this.list:this.list.slice(c=this.page*d,c+Math.min(a-c,d))};return a}(),t={get:function(a){return a?this._state[a]:this._state},fire:function(a,b){if(a=a in this._handlers&&this._handlers[a].slice())for(var d=0;d<a.length;d+=1)a[d].call(this,b)},observe:function(a,b,d){var c=d&&d.defer?this._observers.post:this._observers.pre;(c[a]||(c[a]=[])).push(b);d&&!1===d.init||(b.__calling=!0,b.call(this,this._state[a]),b.__calling=!1);
return{cancel:function(){var d=c[a].indexOf(b);~d&&c[a].splice(d,1)}}},on:function(a,b){if("teardown"===a)return this.on("destroy",b);var d=this._handlers[a]||(this._handlers[a]=[]);d.push(b);return{cancel:function(){var a=d.indexOf(b);~a&&d.splice(a,1)}}},set:function(a){this._set(z({},a));this._root._flush()},_flush:function(){if(this._renderHooks)for(;this._renderHooks.length;)this._renderHooks.pop()()}},ba=function(){return{data:function(){return{pojo:{3:""}}},oncreate:function(){this.get("item").c$=
this},helpers:{toHexColor:w},methods:{update:function(a){var b=this.refs.root;a?(this.set({pojo:a}),b.style.color=w(a["3"]),b.className="name"):b.className="hide"}}}}();z(O.prototype,ba.methods,t);O.prototype._set=function(a){var b=this._state;this._state=z({},b,a);M(this,this._observers.pre,a,b);this._fragment.update(a,this._state);M(this,this._observers.post,a,b)};O.prototype.teardown=O.prototype.destroy=function(a){this.fire("destroy");!1!==a&&this._fragment.unmount();this._fragment.destroy();
this._fragment=null;this._state={};this._torndown=!0};var P=function(){function a(a){a=JSON.stringify(a);return da.post$$("/auth/user/User/list?access_token\x3d"+fa,a)}var b=window.page_size||7;return{data:function(){for(var a=new Fa(null,ua,va,b,3),e=c(a,"items",[]),f=0;f<b;f++)e.push({c$:null});return{errmsg:"",loading:!1,desc:!0,size:0,page:0,page_count:0,store:a,items:e}},oncreate:function(){var b=this.get(),e=b.opts,b=b.store;b.vm=this;c(this,"m",{fetch$$S:b.cbFetchSuccess.bind(b),fetch$$F:b.cbFetchFailed.bind(b),
fetch:e&&e.fetch?e.fetch.bind(this):a,store:b});b.fetchNewer()},computed:{page_info:function(a,b,c,e){a=e.items;if(!a[0].c$)return"";b=e.page_items();c=b.length;for(var d=0;d<c;d++)a[d].c$.update(b[d].orig);for(c=a.length;d<c;d++)a[d].c$.update(null);return e.page_info()}},methods:{goto:function(a,b){b.goto(a)},prevOrLoad:function(a){a.prevOrLoad()},nextOrLoad:function(a){a.nextOrLoad()},fetch:function(a){var b=this.m;return b.fetch(a).then(b.fetch$$S).then(void 0,b.fetch$$F)},update:function(){this.m.store.fetchNewer()}}}}();
z(S.prototype,P.methods,t);S.prototype._set=function(a){var b=this._state;this._state=z({},b,a);ja(this._state,a,b,!1);M(this,this._observers.pre,a,b);this._fragment.update(a,this._state);M(this,this._observers.post,a,b);this._flush()};S.prototype.teardown=S.prototype.destroy=function(a){this.fire("destroy");!1!==a&&this._fragment.unmount();this._fragment.destroy();this._fragment=null;this._state={};this._torndown=!0};var ca=function(){var a;ta(function(b,c){if(!a.get("loading")){var d=a.m;b?c&&c.es_token?
(d.session.auth_data=c,da.get$$("/auth/user/login?es_token\x3d"+c.es_token,void 0).then(d.login$$S).then(void 0,d.login$$F)):d.login$$F("Failed to login to provider."):d.login$$F(c)}});return{data:function(){return{loading:!1,errmsg:"",authenticated:!1,user_nick:"",init:!1}},oncreate:function(){a=this;H&&(U=H);var b=f("access"),d=f("session")||{auth_data:null,user:null};c(this,"m",{login$$S:this.login$$S.bind(this),login$$F:this.login$$F.bind(this),access:b,session:d});b&&d&&d.user&&b.es_user===d.user["3"]&&
(fa=b.token,this.set({authenticated:!0,init:!0,user_nick:b.es_user}))},methods:{pop:function(a){if(!this.get("loading"))if(this.set({errmsg:""}),H){for(var b="",c=0;10>c;c++)b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));Z=b;1===(1&Ea)?(W||(W="none",ra(sa,ha,!1)),y(pa+"#"+Z+"~"+a+"~"+H+"~"+qa,"Login")):(ea||(ea=ga.style,ea.width="100%",ea.border="none",ra(sa,ha,!1),document.body.appendChild(ga)),W=W?"":a+".html",ga.src=pa+W+"#"+Z+"~"+a+"~"+
qa)}else y("/login-"+a,"Login")},login$$S:function(a){var b=this.m,c=b.session,e=a["2"];a={token:a["1"],es_user:e["3"]};c.user=e;b.access=a;X("session",c);X("access",a);fa=a.token;this.set({authenticated:!0,init:!0,user_nick:a.es_user,loading:!1,errmsg:""})},login$$F:function(a){this.set({loading:!1,errmsg:g(a)})},logout:function(){Y.removeItem("access");Y.removeItem("session");this.set({authenticated:!1})}}}}();z(T.prototype,ca.methods,t);T.prototype._set=function(a){var b=this._state;this._state=
z({},b,a);M(this,this._observers.pre,a,b);this._fragment.update(a,this._state);M(this,this._observers.post,a,b);this._flush()};T.prototype.teardown=T.prototype.destroy=function(a){this.fire("destroy");!1!==a&&this._fragment.unmount();this._fragment.destroy();this._fragment=null;this._state={};this._torndown=!0};window.home=new T({target:document.getElementById("auth")})})();
//# sourceMappingURL=build.js.map
