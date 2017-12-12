var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(c,k,l){if(l.get||l.set)throw new TypeError("ES3 does not support getters and setters.");c!=Array.prototype&&c!=Object.prototype&&(c[k]=l.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(c,k,l,e){if(k){l=$jscomp.global;c=c.split(".");for(e=0;e<c.length-1;e++){var p=c[e];p in l||(l[p]={});l=l[p]}c=c[c.length-1];e=l[c];k=k(e);k!=e&&null!=k&&$jscomp.defineProperty(l,c,{configurable:!0,writable:!0,value:k})}};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;
$jscomp.Symbol=function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+$jscomp.symbolCounter_++};$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.arrayIterator=function(c){var k=0;return $jscomp.iteratorPrototype(function(){return k<c.length?{done:!1,value:c[k++]}:{done:!0}})};$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};
$jscomp.iteratorFromArray=function(c,k){$jscomp.initSymbolIterator();c instanceof String&&(c+="");var l=0,e={next:function(){if(l<c.length){var p=l++;return{value:k(p,c[p]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e};$jscomp.polyfill("Array.prototype.entries",function(c){return c?c:function(){return $jscomp.iteratorFromArray(this,function(c,l){return[c,l]})}},"es6-impl","es3");
$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var k=c[Symbol.iterator];return k?k.call(c):$jscomp.arrayIterator(c)};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function k(){this.batch_=null}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;k.prototype.asyncExecute=function(f){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(f);return this};k.prototype.asyncExecuteBatch_=function(){var f=this;this.asyncExecuteFunction(function(){f.executeBatch_()})};var l=$jscomp.global.setTimeout;k.prototype.asyncExecuteFunction=function(f){l(f,0)};k.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var f=
this.batch_;this.batch_=[];for(var c=0;c<f.length;++c){var e=f[c];delete f[c];try{e()}catch(t){this.asyncThrow_(t)}}}this.batch_=null};k.prototype.asyncThrow_=function(f){this.asyncExecuteFunction(function(){throw f;})};var e=function(f){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var c=this.createResolveAndReject_();try{f(c.resolve,c.reject)}catch(A){c.reject(A)}};e.prototype.createResolveAndReject_=function(){function f(f){return function(aa){e||(e=!0,f.call(c,aa))}}var c=this,
e=!1;return{resolve:f(this.resolveTo_),reject:f(this.reject_)}};e.prototype.resolveTo_=function(f){if(f===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(f instanceof e)this.settleSameAsPromise_(f);else{a:switch(typeof f){case "object":var c=null!=f;break a;case "function":c=!0;break a;default:c=!1}c?this.resolveToNonPromiseObj_(f):this.fulfill_(f)}};e.prototype.resolveToNonPromiseObj_=function(c){var f=void 0;try{f=c.then}catch(A){this.reject_(A);return}"function"==
typeof f?this.settleSameAsThenable_(f,c):this.fulfill_(c)};e.prototype.reject_=function(c){this.settle_(2,c)};e.prototype.fulfill_=function(c){this.settle_(1,c)};e.prototype.settle_=function(c,e){if(0!=this.state_)throw Error("Cannot settle("+c+", "+e|"): Promise already settled in state"+this.state_);this.state_=c;this.result_=e;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var c=this.onSettledCallbacks_,e=0;e<c.length;++e)c[e].call(),
c[e]=null;this.onSettledCallbacks_=null}};var p=new k;e.prototype.settleSameAsPromise_=function(c){var e=this.createResolveAndReject_();c.callWhenSettled_(e.resolve,e.reject)};e.prototype.settleSameAsThenable_=function(c,e){var f=this.createResolveAndReject_();try{c.call(e,f.resolve,f.reject)}catch(t){f.reject(t)}};e.prototype.then=function(c,k){function f(c,e){return"function"==typeof c?function(e){try{t(c(e))}catch(pa){l(pa)}}:e}var t,l,p=new e(function(c,e){t=c;l=e});this.callWhenSettled_(f(c,
t),f(k,l));return p};e.prototype.catch=function(c){return this.then(void 0,c)};e.prototype.callWhenSettled_=function(c,e){function f(){switch(k.state_){case 1:c(k.result_);break;case 2:e(k.result_);break;default:throw Error("Unexpected state: "+k.state_);}}var k=this;null==this.onSettledCallbacks_?p.asyncExecute(f):this.onSettledCallbacks_.push(function(){p.asyncExecute(f)})};e.resolve=function(c){return c instanceof e?c:new e(function(e,f){e(c)})};e.reject=function(c){return new e(function(e,f){f(c)})};
e.race=function(c){return new e(function(f,k){for(var l=$jscomp.makeIterator(c),p=l.next();!p.done;p=l.next())e.resolve(p.value).callWhenSettled_(f,k)})};e.all=function(c){var f=$jscomp.makeIterator(c),k=f.next();return k.done?e.resolve([]):new e(function(c,l){function p(e){return function(f){t[e]=f;A--;0==A&&c(t)}}var t=[],A=0;do t.push(void 0),A++,e.resolve(k.value).callWhenSettled_(p(t.length-1),l),k=f.next();while(!k.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(e.$jscomp$new$AsyncExecutor=function(){return new k});
return e},"es6-impl","es3");
(function(){function c(a){return m[a.charCodeAt(0)]||a}function k(a){return a.replace(Ra,c)}function l(a){a=D.getItem(a);return null==a?null:JSON.parse(a)}function e(a,b){try{return D.setItem(a,JSON.stringify(b)),!0}catch(d){return!1}}function p(a){return Array.isArray(a)?a[1]["1"]:String(a)}function f(a){var b=a.status;if(200>b||299<b)throw b;return a.text()}function aa(a){var b=a.charAt(0),d=a.length,d="\n"===a.charAt(d-1)?d-2:d;if("+"===b){a=JSON.parse(a.substring(1,d));if(a[0])throw a;return 2===
a.length?a[1]:a}if("-"!==b)throw Error("Malformed response.");if("["!==a.charAt(1))throw Error(a.substring(1,d));throw JSON.parse(a.substring(1,d));}function A(a,b){return fetch(a,b).then(f).then(aa)}function t(a,b){return fetch(a,{method:"POST",body:b}).then(f).then(aa)}function ba(a,b,d,g,c){for(var F,e,f,k,h,m,n,q,l,v,r;64<=c;){F=b[0];e=b[1];f=b[2];k=b[3];h=b[4];m=b[5];n=b[6];q=b[7];for(v=0;16>v;v++)r=g+4*v,a[v]=(d[r]&255)<<24|(d[r+1]&255)<<16|(d[r+2]&255)<<8|d[r+3]&255;for(v=16;64>v;v++)l=a[v-
2],r=(l>>>17|l<<15)^(l>>>19|l<<13)^l>>>10,l=a[v-15],l=(l>>>7|l<<25)^(l>>>18|l<<14)^l>>>3,a[v]=(r+a[v-7]|0)+(l+a[v-16]|0);for(v=0;64>v;v++)r=(((h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7))+(h&m^~h&n)|0)+(q+(Sa[v]+a[v]|0)|0)|0,l=((F>>>2|F<<30)^(F>>>13|F<<19)^(F>>>22|F<<10))+(F&e^F&f^e&f)|0,q=n,n=m,m=h,h=k+r|0,k=f,f=e,e=F,F=r+l|0;b[0]+=F;b[1]+=e;b[2]+=f;b[3]+=k;b[4]+=h;b[5]+=m;b[6]+=n;b[7]+=q;g+=64;c-=64}return g}function xa(a){for(var b=new Uint8Array(a.length),d=0;d<a.length;d++)b[d]=a.charCodeAt(d);
return b}function va(a,b,d){a=document.createElement(a);a[b]=d;document.body.appendChild(a);return a}function Qa(a,b){var d={};d[a]=b;return d}function wa(a){var b=a.indexOf("@");return-1!==a.indexOf(".",b+1)?"google":a.substring(b+1)}function pa(a){a=a.data;var b="string"===typeof a?JSON.parse(a):a;Array.isArray(b)&&3===b.length&&b[2]===P&&(a=b[1])&&(b[0]?a.es_token&&(b=h.users[h.idx],64!==b.charCodeAt(0)&&b!==a.es_user?E(0,"Unknown user "+a.es_user):(h.data=a,h.es_token=a.es_token,h.es_user=a.es_user,
e("session",{auth_data:a,user:null}),ya?(U.innerText="logout",u.pending_retry?(u.pending_retry=!1,(a=E(4,h))&&a.then(za)):E(2,h)):window.setTimeout(Aa,100))):E(0,a))}function Ba(){for(var a="",b=0;10>b;b++)a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));P=a;if(G&8)return Q||(Q=document.createElement("iframe"),Q.style.width="100%",Q.style.border="none",document.body.appendChild(Q)),a=wa(h.users[h.idx]),qa=qa?"":a+".html",Q.src=Ca+qa+"#"+P+"~"+
a+"~"+window.location.href,!0;a=wa(h.users[h.idx]);(a=window.open(Ca+"#"+P+"~"+a+"~"+Ta+"~"+window.location.href,"Login","width\x3d450,height\x3d500,location\x3d1,status\x3d1,resizable\x3dyes"))&&a.moveTo(window.innerWidth/2-225,window.innerHeight/2-250);return a}function ra(){this.delegate=null;this.pending_retry=!1;this.handlers=[];this.body=!1;this.location="";this.opts=null}function Ua(a){if(""!==a)throw a;}function Va(a){if(401!==a&&(!Array.isArray(a)||3!==a[0]))throw a;if(G&4&&V()&&!u.pending_retry)throw u.pending_retry=
!0,"";(a=sa.cache_key)&&D.removeItem(a);G&16&&D.removeItem("access_info");window.setTimeout(Da,100);throw"Session expired.  Login to continue.";}function Wa(a,b){if(b.body&&W&&W.map[a]){b=b.opts;b=Xa.reset().update(xa(b)).digest();for(var d=0,g=0,c="",e=0,f=b.length;e<f;e++)for(g=g<<8|b[e],d+=8;5<=d;)c+="0123456789abcdefghijklmnopqrstuv"[g>>>d-5&31],d-=5;0<d&&(c+="0123456789abcdefghijklmnopqrstuv"[g<<5-d&31]);b=c}else b=sa.es_token;return a+"?access_token\x3d"+b}function za(){for(var a=u.handlers,
b=a.length-1,d=0,g=(u.delegate||(u.delegate=window.rpc_config_d))[u.body?"post$$":"get$$"](Wa(u.location,u),u.opts).then(void 0,Va);d<b;)g=g.then(a[d++]);G&4&&(g=g.then(void 0,Ua));g.then(void 0,a[d])}function Da(a){D.removeItem("session");h.es_token="";U.innerText="login";E(3,a)}function Ya(a){h.es_token?Da(h):V()}function Aa(){ya=!0;U.innerText="logout";E(1,h)}function V(){if(Ea)return Ba();Ea=!0;var a;(window.addEventListener||window.attachEvent)(window.addEventListener?"message":"onmessage",pa,
!1);(2!==(G&2)||h.es_token||h.users[0])&&(a=Ba())||(U.innerText="login");return a}function B(a,b){b.appendChild(a)}function r(a){a.parentNode.removeChild(a)}function n(a){return document.createElement(a)}function q(a){return document.createTextNode(a)}function ca(a){for(var b=arguments,d=1;d<arguments.length;d+=1){var g=b[d],c;for(c in g)a[c]=g[c]}return a}function Fa(a,b,d,g){for(var c in b)if(c in d){var e=d[c],f=g[c];if(e!==f||e&&"object"===typeof e||"function"===typeof e){var h=b[c];if(h)for(var k=
0;k<h.length;k+=1){var l=h[k];l.__calling||(l.__calling=!0,l.call(a,e,f),l.__calling=!1)}}}}function Za(a,b){function d(a){b.toggle("pw_login",null,!0,"login_user")}function g(a){b.pw_login(a)}function c(a){b.relogin()}function e(a){b.toggle("chpw","chpw_msg",!0)}function f(a){b.chpw()}function h(a){b.set({chpw_msg:""})}function k(a){b.set({errmsg:""})}var l,m,p,t,u,v,oa,y,z,A,D,E,G,ka=n("button");ka.className=l=a.logged_out_once||a.logged_in?"stripped logbtn":"hide";b.refs.logbtn=ka;var ta=q("\n"),
w=n("div");w.className=m=a.logged_out_once||a.logged_in?"hide":"login-btns";B(q("Login with\u00a0\n  "),w);var J=1&a.p_flags&&Ga(a,b);J&&J.mount(w,null);var Ha=q("\n  ");w.appendChild(Ha);var K=2&a.p_flags&&Ia(a,b);K&&K.mount(w,null);var Ja=q("\n  ");w.appendChild(Ja);var L=4&a.p_flags&&Ka(a,b);L&&L.mount(w,null);var Q=q("\n  ");w.appendChild(Q);var M=8&a.p_flags&&La(a,b);M&&M.mount(w,null);var U=q("\n  ");w.appendChild(U);var N=16&a.p_flags&&Ma(a,b);N&&N.mount(w,null);var V=q("\n  ");w.appendChild(V);
var la=n("button");w.appendChild(la);la.type="button";la.className="stripped";la.addEventListener("click",d,!1);var C=n("i");la.appendChild(C);C.className="icon lock";C.title="Account/Pass";B(q("\n  "),w);var R=n("form");w.appendChild(R);R.className="hide";b.refs.pw_login=R;var da=n("input");R.appendChild(da);da.type="text";da.className=p=a.login_user_err?"inline error":"inline";da.placeholder="account";b.refs.login_user=da;B(q("\n    "),R);var ea=n("input");R.appendChild(ea);ea.type="password";ea.className=
t=a.login_pass_err?"inline error":"inline";ea.placeholder="password";b.refs.login_pass=ea;B(q("\n    "),R);var X=n("button");R.appendChild(X);X.type="submit";X.className="stripped";X.disabled=u=a.loading;X.addEventListener("click",g,!1);C=n("i");X.appendChild(C);C.className="icon play";var W=q("\n"),fa=n("div");fa.className="topname";var Y=q(v=a.es_user);fa.appendChild(Y);B(q("\n  "),fa);var S=n("input");fa.appendChild(S);S.type="password";S.className=oa=a.relogin_pw?"inline":"hide";S.placeholder=
"enter password to continue";S.addEventListener("change",c,!1);b.refs.relogin_pass=S;B(q("\n  "),fa);var Z=q("\n"),x=n("div");x.className=y=!a.logged_in||a.relogin_pw?"hide":"toggles";var na=n("button");x.appendChild(na);na.className="stripped";na.addEventListener("click",e,!1);C=n("i");na.appendChild(C);C.className="icon lock";C.title="Set backup password";B(q("\n  "),x);var H=1&a.a_flags&&Na(a,b);H&&H.mount(x,null);var aa=q("\n  ");x.appendChild(aa);C=n("br");x.appendChild(C);B(q("\n  "),x);var O=
n("input");x.appendChild(O);O.className="hide";O.type="password";O.placeholder="Backup password for offline access";O.disabled=z=a.loading;O.addEventListener("change",f,!1);b.refs.chpw=O;B(q("\n  "),x);C=n("i");x.appendChild(C);C.className="icon lock";B(q("\n  "),x);var ma=n("div");x.appendChild(ma);ma.className=A=a.chpw_msg?"ui msg success":"hide";var P=n("i");ma.appendChild(P);P.className="icon close";P.addEventListener("click",h,!1);B(q("\n    "),ma);var ca=q(D=a.chpw_msg);ma.appendChild(ca);B(q("\n  "),
x);var I=1&a.a_flags&&Oa(a,b);I&&I.mount(x,null);var ha=q("\n"),ga=n("div");ga.className=E=a.errmsg?"ui msg error":"hide";var T=n("i");ga.appendChild(T);T.className="icon close";T.addEventListener("click",k,!1);B(q("\n  "),ga);var ia=q(G=a.errmsg);ga.appendChild(ia);var ja=q("\n"),ba=n("div");ba.style.cssText="clear:both";return{mount:function(a,b){a.insertBefore(ka,b);a.insertBefore(ta,b);a.insertBefore(w,b);a.insertBefore(W,b);a.insertBefore(fa,b);a.insertBefore(Z,b);a.insertBefore(x,b);a.insertBefore(ha,
b);a.insertBefore(ga,b);a.insertBefore(ja,b);a.insertBefore(ba,b)},update:function(a,d){l!==(l=d.logged_out_once||d.logged_in?"stripped logbtn":"hide")&&(ka.className=l);m!==(m=d.logged_out_once||d.logged_in?"hide":"login-btns")&&(w.className=m);1&d.p_flags?J||(J=Ga(d,b),J.mount(w,Ha)):J&&(J.destroy(!0),J=null);2&d.p_flags?K||(K=Ia(d,b),K.mount(w,Ja)):K&&(K.destroy(!0),K=null);4&d.p_flags?L||(L=Ka(d,b),L.mount(w,Q)):L&&(L.destroy(!0),L=null);8&d.p_flags?M||(M=La(d,b),M.mount(w,U)):M&&(M.destroy(!0),
M=null);16&d.p_flags?N||(N=Ma(d,b),N.mount(w,V)):N&&(N.destroy(!0),N=null);p!==(p=d.login_user_err?"inline error":"inline")&&(da.className=p);t!==(t=d.login_pass_err?"inline error":"inline")&&(ea.className=t);u!==(u=d.loading)&&(X.disabled=u);v!==(v=d.es_user)&&(Y.data=v);oa!==(oa=d.relogin_pw?"inline":"hide")&&(S.className=oa);y!==(y=!d.logged_in||d.relogin_pw?"hide":"toggles")&&(x.className=y);1&d.a_flags?H?H.update(a,d):(H=Na(d,b),H.mount(x,aa)):H&&(H.destroy(!0),H=null);z!==(z=d.loading)&&(O.disabled=
z);A!==(A=d.chpw_msg?"ui msg success":"hide")&&(ma.className=A);D!==(D=d.chpw_msg)&&(ca.data=D);1&d.a_flags?I?I.update(a,d):(I=Oa(d,b),I.mount(x,null)):I&&(I.destroy(!0),I=null);E!==(E=d.errmsg?"ui msg error":"hide")&&(ga.className=E);G!==(G=d.errmsg)&&(ia.data=G)},destroy:function(a){b.refs.logbtn===ka&&(b.refs.logbtn=null);J&&J.destroy(!1);K&&K.destroy(!1);L&&L.destroy(!1);M&&M.destroy(!1);N&&N.destroy(!1);la.removeEventListener("click",d,!1);b.refs.pw_login===R&&(b.refs.pw_login=null);b.refs.login_user===
da&&(b.refs.login_user=null);b.refs.login_pass===ea&&(b.refs.login_pass=null);X.removeEventListener("click",g,!1);S.removeEventListener("change",c,!1);b.refs.relogin_pass===S&&(b.refs.relogin_pass=null);na.removeEventListener("click",e,!1);H&&H.destroy(!1);O.removeEventListener("change",f,!1);b.refs.chpw===O&&(b.refs.chpw=null);P.removeEventListener("click",h,!1);I&&I.destroy(!1);T.removeEventListener("click",k,!1);a&&(r(ka),r(ta),r(w),r(W),r(fa),r(Z),r(x),r(ha),r(ga),r(ja),r(ba))}}}function Ga(a,
b){function d(a){b.select(1)}var g=n("button");g.type="button";g.className="stripped";g.addEventListener("click",d,!1);a=n("i");g.appendChild(a);a.className="icon google";a.title="google";var c=q("\u00a0|\u00a0");return{mount:function(a,b){a.insertBefore(g,b);a.insertBefore(c,b)},destroy:function(a){g.removeEventListener("click",d,!1);a&&(r(g),r(c))}}}function Ia(a,b){function d(a){b.select(2)}var g=n("button");g.type="button";g.className="stripped";g.addEventListener("click",d,!1);a=n("i");g.appendChild(a);
a.className="icon github";a.title="github";var c=q("\u00a0|\u00a0");return{mount:function(a,b){a.insertBefore(g,b);a.insertBefore(c,b)},destroy:function(a){g.removeEventListener("click",d,!1);a&&(r(g),r(c))}}}function Ka(a,b){function d(a){b.select(3)}var g=n("button");g.type="button";g.className="stripped";g.addEventListener("click",d,!1);a=n("i");g.appendChild(a);a.className="icon gitlab";a.title="gitlab";var c=q("\u00a0|\u00a0");return{mount:function(a,b){a.insertBefore(g,b);a.insertBefore(c,b)},
destroy:function(a){g.removeEventListener("click",d,!1);a&&(r(g),r(c))}}}function La(a,b){function d(a){b.select(4)}var g=n("button");g.type="button";g.className="stripped";g.addEventListener("click",d,!1);a=n("i");g.appendChild(a);a.className="icon bitbucket";a.title="bitbucket";var c=q("\u00a0|\u00a0");return{mount:function(a,b){a.insertBefore(g,b);a.insertBefore(c,b)},destroy:function(a){g.removeEventListener("click",d,!1);a&&(r(g),r(c))}}}function Ma(a,b){function d(a){b.select(5)}var g=n("button");
g.type="button";g.className="stripped";g.addEventListener("click",d,!1);a=n("i");g.appendChild(a);a.className="icon facebook-official";a.title="facebook";var c=q("\u00a0|\u00a0");return{mount:function(a,b){a.insertBefore(g,b);a.insertBefore(c,b)},destroy:function(a){g.removeEventListener("click",d,!1);a&&(r(g),r(c))}}}function Na(a,b){function d(a){b.toggle("link","link_msg",!0)}var g,c=n("button");c.className=g=a.sa||a.linked?"hide":"stripped";c.addEventListener("click",d,!1);a=n("i");c.appendChild(a);
a.className="icon link";a.title="Link to a primary account";return{mount:function(a,b){a.insertBefore(c,b)},update:function(a,b){g!==(g=b.sa||b.linked?"hide":"stripped")&&(c.className=g)},destroy:function(a){c.removeEventListener("click",d,!1);a&&r(c)}}}function Oa(a,b){function d(a){b.link()}function g(a){b.set({link_msg:""})}var c,e,f,h=n("input");h.className="hide";h.type="text";h.placeholder="Primary user to link to";h.disabled=c=a.loading;h.addEventListener("change",d,!1);b.refs.link=h;var l=
q("\n  "),k=n("i");k.className="icon link";var m=q("\n  "),p=n("div");p.className=e=a.link_msg?"ui msg success":"hide";var t=n("i");p.appendChild(t);t.className="icon close";t.addEventListener("click",g,!1);B(q("\n    "),p);var u=q(f=a.link_msg);p.appendChild(u);return{mount:function(a,b){a.insertBefore(h,b);a.insertBefore(l,b);a.insertBefore(k,b);a.insertBefore(m,b);a.insertBefore(p,b)},update:function(a,b){c!==(c=b.loading)&&(h.disabled=c);e!==(e=b.link_msg?"ui msg success":"hide")&&(p.className=
e);f!==(f=b.link_msg)&&(u.data=f)},destroy:function(a){h.removeEventListener("change",d,!1);b.refs.link===h&&(b.refs.link=null);t.removeEventListener("click",g,!1);a&&(r(h),r(l),r(k),r(m),r(p))}}}function Y(a){a=a||{};this.refs={};this._state=ca(ha.data(),a.data);this._observers={pre:Object.create(null),post:Object.create(null)};this._handlers=Object.create(null);this._root=a._root;this._yield=a._yield;this._torndown=!1;this._fragment=Za(this._state,this);a.target&&this._fragment.mount(a.target,null);
a._root?a._root._renderHooks.push({fn:ha.oncreate,context:this}):ha.oncreate.call(this)}var m=["\\u0000","\\u0001","\\u0002","\\u0003","\\u0004","\\u0005","\\u0006","\\u0007","\\b","\\t","\\n","\\u000B","\\f","\\r","\\u000E","\\u000F","\\u0010","\\u0011","\\u0012","\\u0013","\\u0014","\\u0015","\\u0016","\\u0017","\\u0018","\\u0019","\\u001A","\\u001B","\\u001C","\\u001D","\\u001E","\\u001F",,,'\\"'];m[92]="\\\\";m[173]="\\u00ad";m[1536]="\\u0600";m[1537]="\\u0601";m[1538]="\\u0602";m[1539]="\\u0603";
m[1757]="\\u06dd";m[1807]="\\u070f";m[6068]="\\u17b4";m[6069]="\\u17b5";m[8203]="\\u200b";m[8204]="\\u200c";m[8205]="\\u200d";m[8206]="\\u200e";m[8207]="\\u200f";m[8232]="\\u2028";m[8233]="\\u2029";m[8234]="\\u202a";m[8235]="\\u202b";m[8236]="\\u202c";m[8237]="\\u202d";m[8238]="\\u202e";m[8288]="\\u2060";m[8289]="\\u2061";m[8290]="\\u2062";m[8291]="\\u2063";m[8292]="\\u2064";m[8298]="\\u206a";m[8299]="\\u206b";m[8300]="\\u206c";m[8301]="\\u206d";m[8302]="\\u206e";m[8303]="\\u206f";m[65279]="\\ufeff";
m[65529]="\\ufff9";m[65530]="\\ufffa";m[65531]="\\ufffb";var Ra=/[\x00-\x1f\xad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb"\\]/g,Z={},T=Object.freeze({getItem:function(a){return Z[a]},setItem:function(a,b){Z[a]=b;return!0},removeItem:function(a){return a in Z&&delete Z[a]},clear:function(){Z={};return!0}}),D=window.localStorage||T;(function(a){function b(a){"string"!==typeof a&&(a=String(a));if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");
return a.toLowerCase()}function d(a){"string"!==typeof a&&(a=String(a));return a}function g(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};z.iterable&&(b[Symbol.iterator]=function(){return b});return b}function c(a){this.map={};a instanceof c?a.forEach(function(a,b){this.append(b,a)},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function e(a){if(a.bodyUsed)return Promise.reject(new TypeError("Already read"));a.bodyUsed=!0}function f(a){return new Promise(function(b,
d){a.onload=function(){b(a.result)};a.onerror=function(){d(a.error)}})}function h(a){var b=new FileReader,d=f(b);b.readAsArrayBuffer(a);return d}function l(a){a=new Uint8Array(a);for(var b=Array(a.length),d=0;d<a.length;d++)b[d]=String.fromCharCode(a[d]);return b.join("")}function k(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);b.set(new Uint8Array(a));return b.buffer}function m(){this.bodyUsed=!1;this._initBody=function(a){if(this._bodyInit=a)if("string"===typeof a)this._bodyText=
a;else if(z.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(z.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(z.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(z.arrayBuffer&&z.blob&&A(a))this._bodyArrayBuffer=k(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(z.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||B(a)))this._bodyArrayBuffer=k(a);else throw Error("unsupported BodyInit type");
else this._bodyText="";this.headers.get("content-type")||("string"===typeof a?this.headers.set("content-type","text/plain;charset\x3dUTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):z.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset\x3dUTF-8"))};z.blob&&(this.blob=function(){var a=e(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));
if(this._bodyFormData)throw Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?e(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)});this.text=function(){var a=e(this);if(a)return a;if(this._bodyBlob){var a=this._bodyBlob,b=new FileReader,d=f(b);b.readAsText(a);return d}if(this._bodyArrayBuffer)return Promise.resolve(l(this._bodyArrayBuffer));if(this._bodyFormData)throw Error("could not read FormData body as text");
return Promise.resolve(this._bodyText)};z.formData&&(this.formData=function(){return this.text().then(q)});this.json=function(){return this.text().then(JSON.parse)};return this}function n(a,b){b=b||{};var d=b.body;if("string"===typeof a)this.url=a;else{if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url;this.credentials=a.credentials;b.headers||(this.headers=new c(a.headers));this.method=a.method;this.mode=a.mode;d||null==a._bodyInit||(d=a._bodyInit,a.bodyUsed=!0)}this.credentials=b.credentials||
this.credentials||"omit";if(b.headers||!this.headers)this.headers=new c(b.headers);a=b.method||this.method||"GET";var g=a.toUpperCase();this.method=-1<D.indexOf(g)?g:a;this.mode=b.mode||this.mode||null;this.referrer=null;if(("GET"===this.method||"HEAD"===this.method)&&d)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(d)}function q(a){var b=new FormData;a.trim().split("\x26").forEach(function(a){if(a){var d=a.split("\x3d");a=d.shift().replace(/\+/g," ");d=d.join("\x3d").replace(/\+/g,
" ");b.append(decodeURIComponent(a),decodeURIComponent(d))}});return b}function r(a){var b=new c;a.split("\r\n").forEach(function(a){var d=a.split(":");if(a=d.shift().trim())d=d.join(":").trim(),b.append(a,d)});return b}function p(a,b){b||(b={});this.type="default";this.status="status"in b?b.status:200;this.ok=200<=this.status&&300>this.status;this.statusText="statusText"in b?b.statusText:"OK";this.headers=new c(b.headers);this.url=b.url||"";this._initBody(a)}if(!a.fetch){var t="Symbol"in a&&"iterator"in
Symbol,u;if(u="FileReader"in a&&"Blob"in a)try{new Blob,u=!0}catch(ta){u=!1}var z={searchParams:"URLSearchParams"in a,iterable:t,blob:u,formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};if(z.arrayBuffer){var y="[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]".split(";");var A=function(a){return a&&DataView.prototype.isPrototypeOf(a)};var B=ArrayBuffer.isView||
function(a){return a&&-1<y.indexOf(Object.prototype.toString.call(a))}}c.prototype.append=function(a,c){a=b(a);c=d(c);var g=this.map[a];g||(g=[],this.map[a]=g);g.push(c)};c.prototype["delete"]=function(a){delete this.map[b(a)]};c.prototype.get=function(a){return(a=this.map[b(a)])?a[0]:null};c.prototype.getAll=function(a){return this.map[b(a)]||[]};c.prototype.has=function(a){return this.map.hasOwnProperty(b(a))};c.prototype.set=function(a,c){this.map[b(a)]=[d(c)]};c.prototype.forEach=function(a,b){Object.getOwnPropertyNames(this.map).forEach(function(d){this.map[d].forEach(function(c){a.call(b,
c,d,this)},this)},this)};c.prototype.keys=function(){var a=[];this.forEach(function(b,d){a.push(d)});return g(a)};c.prototype.values=function(){var a=[];this.forEach(function(b){a.push(b)});return g(a)};c.prototype.entries=function(){var a=[];this.forEach(function(b,d){a.push([d,b])});return g(a)};z.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);var D="DELETE GET HEAD OPTIONS POST PUT".split(" ");n.prototype.clone=function(){return new n(this,{body:this._bodyInit})};m.call(n.prototype);
m.call(p.prototype);p.prototype.clone=function(){return new p(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})};p.error=function(){var a=new p(null,{status:0,statusText:""});a.type="error";return a};var E=[301,302,303,307,308];p.redirect=function(a,b){if(-1===E.indexOf(b))throw new RangeError("Invalid status code");return new p(null,{status:b,headers:{location:a}})};a.Headers=c;a.Request=n;a.Response=p;a.fetch=function(a,b){return new Promise(function(d,
c){var g=new n(a,b),e=new XMLHttpRequest;e.onload=function(){var a={status:e.status,statusText:e.statusText,headers:r(e.getAllResponseHeaders()||"")};a.url="responseURL"in e?e.responseURL:a.headers.get("X-Request-URL");d(new p("response"in e?e.response:e.responseText,a))};e.onerror=function(){c(new TypeError("Network request failed"))};e.ontimeout=function(){c(new TypeError("Network request failed"))};e.open(g.method,g.url,!0);"include"===g.credentials&&(e.withCredentials=!0);"responseType"in e&&
z.blob&&(e.responseType="blob");g.headers.forEach(function(a,b){e.setRequestHeader(b,a)});e.send("undefined"===typeof g._bodyInit?null:g._bodyInit)})};a.fetch.polyfill=!0}})("undefined"!==typeof self?self:void 0);var $a=Object.freeze({extractMsg:p,$get:A,$post:t}),Sa=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,
1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),ua=function(){function a(){this.digestLength=
32;this.blockSize=64;this.state=new Int32Array(8);this.temp=new Int32Array(64);this.buffer=new Uint8Array(128);this.bytesHashed=this.bufferLength=0;this.finished=!1;this.reset()}a.prototype.reset=function(){this.state[0]=1779033703;this.state[1]=3144134277;this.state[2]=1013904242;this.state[3]=2773480762;this.state[4]=1359893119;this.state[5]=2600822924;this.state[6]=528734635;this.state[7]=1541459225;this.bytesHashed=this.bufferLength=0;this.finished=!1;return this};a.prototype.clean=function(){for(var a=
0;a<this.buffer.length;a++)this.buffer[a]=0;for(a=0;a<this.temp.length;a++)this.temp[a]=0;this.reset()};a.prototype.update=function(a,d){void 0===d&&(d=a.length);if(this.finished)throw Error("SHA256: can't update because hash was finished.");var b=0;this.bytesHashed+=d;if(0<this.bufferLength){for(;64>this.bufferLength&&0<d;)this.buffer[this.bufferLength++]=a[b++],d--;64===this.bufferLength&&(ba(this.temp,this.state,this.buffer,0,64),this.bufferLength=0)}64<=d&&(b=ba(this.temp,this.state,a,b,d),d%=
64);for(;0<d;)this.buffer[this.bufferLength++]=a[b++],d--;return this};a.prototype.finish=function(a){if(!this.finished){var b=this.bytesHashed,c=this.bufferLength,e=b/536870912|0,f=b<<3,b=56>b%64?64:128;this.buffer[c]=128;for(c+=1;c<b-8;c++)this.buffer[c]=0;this.buffer[b-8]=e>>>24&255;this.buffer[b-7]=e>>>16&255;this.buffer[b-6]=e>>>8&255;this.buffer[b-5]=e>>>0&255;this.buffer[b-4]=f>>>24&255;this.buffer[b-3]=f>>>16&255;this.buffer[b-2]=f>>>8&255;this.buffer[b-1]=f>>>0&255;ba(this.temp,this.state,
this.buffer,0,b);this.finished=!0}for(c=0;8>c;c++)a[4*c+0]=this.state[c]>>>24&255,a[4*c+1]=this.state[c]>>>16&255,a[4*c+2]=this.state[c]>>>8&255,a[4*c+3]=this.state[c]>>>0&255;return this};a.prototype.digest=function(){var a=new Uint8Array(this.digestLength);this.finish(a);return a};a.prototype._saveState=function(a){for(var b=0;b<this.state.length;b++)a[b]=this.state[b]};a.prototype._restoreState=function(a,d){for(var b=0;b<this.state.length;b++)this.state[b]=a[b];this.bytesHashed=d;this.finished=
!1;this.bufferLength=0};return a}(),y=function(){function a(a){this.inner=new ua;this.outer=new ua;this.blockSize=this.inner.blockSize;this.digestLength=this.inner.digestLength;var b=new Uint8Array(this.blockSize);if(a.length>this.blockSize)(new ua).update(a).finish(b).clean();else for(var c=0;c<a.length;c++)b[c]=a[c];for(c=0;c<b.length;c++)b[c]^=54;this.inner.update(b);for(c=0;c<b.length;c++)b[c]^=106;this.outer.update(b);this.istate=new Uint32Array(this.digestLength/4);this.ostate=new Uint32Array(this.digestLength/
4);this.inner._saveState(this.istate);this.outer._saveState(this.ostate);for(c=0;c<b.length;c++)b[c]=0}a.prototype.reset=function(){this.inner._restoreState(this.istate,this.inner.blockSize);this.outer._restoreState(this.ostate,this.outer.blockSize);return this};a.prototype.clean=function(){for(var a=0;a<this.istate.length;a++)this.ostate[a]=this.istate[a]=0;this.inner.clean();this.outer.clean()};a.prototype.update=function(a){this.inner.update(a);return this};a.prototype.finish=function(a){this.outer.finished?
this.outer.finish(a):(this.inner.finish(a),this.outer.update(a,this.digestLength).finish(a));return this};a.prototype.digest=function(){var a=new Uint8Array(this.digestLength);this.finish(a);return a};return a}(),T=window.location.protocol,W=104!==T.charCodeAt(0)&&window.api_sig,Xa=W&&new y(xa(W.key)),y=window.start_config||{},sa={es_token:null,access_info:null,rpc:null,escape:null,cache_key:null},ia=y.start||"dist/build.js",ja=y.accounts_host||"",ab=y.login_prefix||ja+"/accounts/user/login?es_token\x3d",
Pa=y.pwlogin_prefix||ja+"/accounts/user/pwlogin",bb=y.changepw_prefix||ja+"/accounts/user/User/changePW?access_token\x3d",cb=y.link_prefix||ja+"/accounts/user/User/link?access_token\x3d",Ta=y.auth_host||T+"//"+window.location.host,Ca=y.auth_proxy||"/login/",G=y.auth_flags||3,db=y.provider_flags||31,h={users:" @google @github @gitlab @bitbucket @facebook".split(" "),idx:0,es_token:"",es_user:"",data:null},P,Q,qa;ra.prototype.reset=function(a,b,d){this.pending_retry=!1;this.handlers=[];this.body=d;
this.location=a;this.opts=b;return this};ra.prototype.then=function(a,b){this.handlers.push(a||b);!a&&za();return this};var u=new ra,Ea=!1,ya=!1,E,U;window.rpc_config={auth$$:null,get$$:function(a,b){return u.reset(a,b,!1)},post$$:function(a,b){return u.reset(a,b,!0)}};W&&(window.api_sig=void 0);var ha=function(){var a;return{data:function(){return{p_flags:db,a_flags:G,loading:!1,errmsg:"",logged_in:!0,es_user:"",logged_out_once:!1,relogin_pw:!1,sa:!1,linked:!1,link_msg:"",chpw_msg:"",login_user_err:!1,
login_pass_err:!1}},oncreate:function(){Object.defineProperty(this,"m",{enumerable:!1,value:{started:!1,app_config:sa,access_info:null,access_info_link:null,login$$S:this.login$$S.bind(this),login$$F:this.login$$F.bind(this),pw_login$$S:this.pw_login$$S.bind(this),pw_login$$F:this.pw_login$$F.bind(this),link$$S:this.link$$S.bind(this),link$$F:this.link$$F.bind(this),chpw$$S:this.chpw$$S.bind(this),chpw$$F:this.chpw$$F.bind(this)}});var b=this.m.app_config,d=l("access_info"),c;window.app_config=b;
a=document.getElementById("start");d&&(c=d["2"])?(h.users[0]=c["3"],h.es_user=c["3"],h.es_token=d["1"]):(this.set({logged_in:!1}),a.className="active");b=this.refs.logbtn;d=this.onAuth.bind(this);b.onclick=Ya;U=b;E=d;window.setTimeout(h.es_token?Aa:V,100)},methods:{toggle:function(a,c,e,f){a=this.refs[a];var b=a.className?"":"hide";(a.className=b)?c&&this.get(c)&&this.set(Qa(c,"")):e&&(f&&(a=this.refs[f]),a.focus())},chpw$$S:function(a){this.set({loading:!1,chpw_msg:"Successful."})},chpw$$F:function(a){this.set({loading:!1,
errmsg:p(a)})},chpw:function(){var a=this.m,c=this.refs.chpw.value.trim();c&&!this.get("loading")&&(this.set({loading:!0,errmsg:"",chpw_msg:""}),t(bb+a.access_info["1"],'{"1":"'+k(c)+'"}').then(a.chpw$$S).then(void 0,a.chpw$$F))},link$$S:function(a){a=this.m;var b=a.access_info_link,c=b["2"],f=a.app_config,k=f.access_info["2"];a.access_info_link=null;f.access_info=b;h.users[0]=c["3"];h.idx=0;e("access_info",b);this.set({loading:!1,link_msg:"Successfully linked "+k["3"]+" to "+c["3"]+".  You can hit refresh to verify."})},
link$$F:function(a){var b=this.m,c=b.app_config.access_info,e=c["2"];b.access_info_link=null;D.removeItem("session");h.users[0]=e["3"];h.idx=0;h.es_token=c["1"];h.es_user=e["3"];h.info=null;this.set({loading:!1,errmsg:p(a)})},link:function(){var a=this.m,c=this.refs.link.value.trim();c&&c!==a.access_info["2"]["3"]&&!this.get("loading")&&(a.access_info_link=a.access_info,h.users[0]=c,this.set({loading:!0,errmsg:""}),V())},relogin:function(){var a=this.m,c=this.refs.relogin_pass.value.trim();if(c&&
!this.get("loading"))return this.set({loading:!0,errmsg:""}),t(Pa,'{"1":"'+h.users[0]+'","2":"'+k(c)+'"}').then(a.pw_login$$S).then(void 0,a.pw_login$$F)},pw_login$$S:function(a){var b=this.refs,c=a["2"];e("access_info",a);this.get("relogin_pw")?(b.relogin_pass.className="hide",b.relogin_pass.value=""):(b.pw_login.className="hide",b.login_user.value="",b.login_pass.value="");b.logbtn.innerText="logout";this.start(a,c["3"])},pw_login$$F:function(a){this.set({loading:!1,errmsg:p(a)})},pw_login:function(a){a.preventDefault();
if(!this.get("loading")){a=this.m;var b=this.refs,c=b.login_pass,b=b.login_user.value.trim(),c=c.value.trim();if(b){if(c)return this.set({loading:!0,errmsg:"",login_user_err:!1,login_pass_err:!1}),t(Pa,'{"1":"'+k(b)+'","2":"'+k(c)+'"}').then(a.pw_login$$S).then(void 0,a.pw_login$$F);this.set({login_user_err:!1,login_pass_err:!0})}else this.set({login_user_err:!0,login_pass_err:!1})}},select:function(a){h.idx=a;V()},login$$S:function(a){var b=this.m,c=b.access_info_link;if(!c)return e("access_info",
a),this.start(a),a;c["2"]["3"]!==a["2"]["3"]&&(t(cb+c["1"],'{"1":"'+a["2"]["1"]+'"}').then(b.link$$S).then(void 0,b.link$$F),b.access_info_link=a);return null},login$$F:function(a){this.set({loading:!1,errmsg:p(a)})},login:function(a){var b=this.m;this.set({loading:!0,errmsg:""});return A(ab+a).then(b.login$$S).then(void 0,b.login$$F)},start:function(b,c){var d=this.m,e=d.app_config,f=b["2"],m;d.access_info=b;h.es_token=b["1"];if(!c&&this.get("relogin_pw")){var n=this.refs.relogin_pass;n.className=
"hide";n.value=""}h.users[0]=c||h.es_user;h.idx=0;e.access_info=b;this.set({logged_in:!0,relogin_pw:!1,loading:!1,errmsg:"",es_user:f["3"],linked:f["8"],sa:2===(2&f["5"])});a.className="";if(d.started)e.start?e.start(b,h.data):e.es_token=b["1"];else if(e.es_token=b["1"],e.rpc=$a,e.escape=k,e.auth_data=h.data||(m=l("session"))&&m.auth_data,d.started=!0,Array.isArray(ia))for(b=0,c=ia.length;b<c;b++)va("script","src",ia[b]);else va("script","src",ia)},tryStart:function(){var a=l("access_info"),c;a&&
(c=a["2"])&&h.es_user===c["3"]?this.start(a):this.login(h.es_token)},onAuth:function(b,c){switch(b){case 0:return this.set({loading:!1,errmsg:c+"  Please retry."}),null;case 1:return this.tryStart(),null;case 2:return this.login(c.es_token);case 3:return c?(D.removeItem("access_info"),this.set({logged_in:!1,logged_out_once:!0,es_user:h.users[0]}),a.className="active"):(this.set({relogin_pw:!0,logged_out_once:!0,es_user:h.users[0]}),this.refs.relogin_pass.focus()),null;default:return this.login(c.es_token)}}}}}();
ca(Y.prototype,ha.methods,{get:function(a){return a?this._state[a]:this._state},fire:function(a,b){if(a=a in this._handlers&&this._handlers[a].slice())for(var c=0;c<a.length;c+=1)a[c].call(this,b)},observe:function(a,b,c){var d=c&&c.defer?this._observers.post:this._observers.pre;(d[a]||(d[a]=[])).push(b);c&&!1===c.init||(b.__calling=!0,b.call(this,this._state[a]),b.__calling=!1);return{cancel:function(){var c=d[a].indexOf(b);~c&&d[a].splice(c,1)}}},on:function(a,b){if("teardown"===a)return this.on("destroy",
b);var c=this._handlers[a]||(this._handlers[a]=[]);c.push(b);return{cancel:function(){var a=c.indexOf(b);~a&&c.splice(a,1)}}},set:function(a){this._set(ca({},a));(this._root||this)._flush()},_flush:function(){if(this._renderHooks)for(;this._renderHooks.length;){var a=this._renderHooks.pop();a.fn.call(a.context)}}});Y.prototype._set=function(a){var b=this._state;this._state=ca({},b,a);Fa(this,this._observers.pre,a,b);this._fragment&&this._fragment.update(a,this._state);Fa(this,this._observers.post,
a,b)};Y.prototype.teardown=Y.prototype.destroy=function(a){this.fire("destroy");this._fragment.destroy(!1!==a);this._fragment=null;this._state={};this._torndown=!0};window.start=new Y({target:document.getElementById("start")})})();
//# sourceMappingURL=start.js.map
