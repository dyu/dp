(function(){function B(a){var b=JSON.parse(a.data);Array.isArray(b)&&3===b.length&&b[2]===n&&(a=b[1])&&(b[0]?a.es_token&&(b=C[c.idx],64!==b.charCodeAt(0)&&b!==a.es_user?q("Unknown user "+a.es_user,d):(e=a,k.setItem("session",JSON.stringify({auth_data:a,user:null})),r?(l=!0,d.innerText="logout",d.disabled=!1,g(2,e)):window.setTimeout(t,100))):q(a,d))}function h(){for(var a="",b=0;10>b;b++)a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));n=a;a=
c.users[c.idx];b=a.indexOf("@");a=-1!==a.indexOf(".",b+1)?"google":a.substring(b+1);(a=window.open(D+"#"+n+"~"+a+"~@"+c.host+"~"+window.location.href,"Login","width=450,height=500,location=1,status=1,resizable=yes"))&&a.moveTo(window.innerWidth/2-225,window.innerHeight/2-250);return a}function u(a,b){a.onclick=E;a.innerText=b;return a}function F(){var a=document.createElement("button"),b=a.style;b.border="none";b.background="transparent";b.position="fixed";b.cursor="pointer";b.right="2px";v&1?b.top=
"2px":b.bottom="2px";return a}function w(a,b){}function G(){p&&document.body.removeChild(p)}function q(a,b){b&&(b.disabled=!1);if(g!==w)g(0,a);else{var c=document.createElement("p");c.innerText=a;document.body.insertBefore(c,document.body.firstChild);p=c;window.setTimeout(G,5E3)}}function E(a){l?(l=!1,k.removeItem("session"),d.innerText="login",g(3,e)):(d.disabled=!0,x?h():y(!0))}function t(){l=r=!0;d?(d.disabled=!1,d.innerText="logout"):document.body.appendChild(d=u(z(),"logout"));var a=c.start;
if(a){var b=document.createElement("script");b.src=a;document.body.appendChild(b)}g(1,e)}function y(a){(window.addEventListener||window.attachEvent)(window.addEventListener?"message":"onmessage",B,!1);x=!0;a?h():(v&2||!h())&&document.body.appendChild(d=u(z(),"login"))}function A(a){if(401===a||Array.isArray(a)&&3===array[0])k.removeItem("session"),h();throw a;}var c=window.auth_config,D=c.proxy||"/login/",n,k=window.localStorage,m=k.getItem("session"),e=(m=m&&JSON.parse(m))&&m.auth_data,c=window.auth_config,
x=!1,r=!1,v=c.flags||0,g=c.on||w,z=c.btn||F,C=c.users,l=!1,p,d,f;window.rpc_config={auth$$:null,get$$:function(a,b){f||(f=window.rpc_config_d);return f.get$$(a+"?access_token="+e.es_token,b).then(void 0,A)},post$$:function(a,b){f||(f=window.rpc_config_d);return f.post$$(a+"?access_token="+e.es_token,b).then(void 0,A)}};!c||!c.host||!Array.isArray(c.users)||c.idx>=c.users.length?console.log("Required auth_config fields: host (https://example.com), idx (num), users (['user@github', 'user@gitlab'])"):
(c.retry=h,window.setTimeout(e?t:y,100))})();
