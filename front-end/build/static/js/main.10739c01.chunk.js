(this.webpackJsonpprojetpfe=this.webpackJsonpprojetpfe||[]).push([[0],{107:function(e,t,a){e.exports=a(138)},112:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(12),c=a.n(r),l=(a(112),a(89)),i=a(195),m=a(52),u=a(32),s=a(60),p=a(2);function f(e){var t=e.component,a=Object(p.a)(e,["component"]);return o.a.createElement(u.b,Object.assign({},a,{render:function(e){return localStorage.getItem("jwt-cookie")?o.a.createElement(t,e):o.a.createElement(u.a,{to:{pathname:"/",state:{from:e.location}}})}}))}function d(e){var t=e.component,a=Object(p.a)(e,["component"]);return o.a.createElement(u.b,Object.assign({},a,{render:function(e){return localStorage.getItem("jwt-cookie")?o.a.createElement(u.a,{to:{pathname:"/",state:{from:e.location}}}):o.a.createElement(t,e)}}))}var g=a(49),E=a.n(g),h=a(65),b=a(10),v=a(170),j=a(202),w=a(203),O=a(179),S=a(201),C=a(90),x=a(180),k=a(174),y=a(175),I=a(91),N=a(176),T=a(177),q=a(178),W=a(181),D=Object(v.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},paper:{marginRight:e.spacing(2)}}}));function P(e){var t=D(),a=localStorage.getItem("jwt-cookie"),n=o.a.useState(!1),r=Object(b.a)(n,2),c=r[0],l=r[1],i=o.a.useRef(null),m=function(e){i.current&&i.current.contains(e.target)||l(!1)};function u(e){"Tab"===e.key&&(e.preventDefault(),l(!1))}var s=o.a.useRef(c);o.a.useEffect((function(){!0===s.current&&!1===c&&i.current.focus(),s.current=c}),[c]);var p=o.a.createElement(j.a,{autoFocusItem:c,id:"menu-list-grow",onKeyDown:u},o.a.createElement(w.a,{onClick:function(){window.location="/Historique",l(!1)},color:"inherit"},"Historique"),o.a.createElement(w.a,{onClick:Object(h.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.location="/Compte",l(!1);case 2:case"end":return e.stop()}}),e)}))),color:"inherit"},"Compte"),o.a.createElement(w.a,{onClick:Object(h.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.removeItem("jwt-cookie");case 2:window.location="/Connexion";case 3:case"end":return e.stop()}}),e)}))),color:"inherit"},"D\xe9connexion")),f=o.a.createElement(j.a,{autoFocusItem:c,id:"menu-list-grow",onKeyDown:u},o.a.createElement(w.a,{onClick:function(){window.location="/Inscription",l(!1)},color:"inherit"},"Inscription"),o.a.createElement(w.a,{onClick:function(){window.location="/Connexion",l(!1)},color:"inherit"},"Connexion"));return o.a.createElement("div",{className:t.root},o.a.createElement(k.a,{position:"static",color:"primary"},o.a.createElement(y.a,null,o.a.createElement(I.a,{className:t.title,color:"inherit"},"Logo"),o.a.createElement(N.a,{onClick:function(){window.location="/"},color:"inherit"},o.a.createElement(T.a,null)),o.a.createElement("div",null,o.a.createElement(N.a,{ref:i,"aria-controls":c?"menu-list-grow":void 0,"aria-haspopup":"true",onClick:function(){l((function(e){return!e}))},color:"inherit"},o.a.createElement(q.a,null)),o.a.createElement(O.a,{open:c,anchorEl:i.current,role:void 0,transition:!0,disablePortal:!0},(function(e){var t=e.TransitionProps,n=e.placement;return o.a.createElement(S.a,Object.assign({},t,{style:{transformOrigin:"bottom"===n?"center top":"center bottom"}}),o.a.createElement(C.a,null,o.a.createElement(x.a,{onClickAway:m},a?p:f)))}))),o.a.createElement(N.a,{onClick:function(){window.location="/Panier"},color:"inherit"},o.a.createElement(W.a,null)))))}function _(){return o.a.createElement("div",null,"Historique")}function V(){return o.a.createElement("div",null,"Page Compte")}var A=a(27),z=a.n(A),B=a(182),J=a(183),F=a(184),R=a(204),H=a(185),M=a(198),G=a(187),K=a(197),L=a(188),Q=Object(v.a)((function(e){return{formControl:{margin:e.spacing(3)},Box:{margin:e.spacing(1),width:200},Text:{margin:e.spacing(0,1),textAlign:"center"}}}));function U(){var e=Q(),t=Object(n.useState)([]),a=Object(b.a)(t,2),r=a[0],c=a[1],l=function(e){z.a.post("http://localhost:4000/articles/recherche",{prix:e}).then((function(e){c(e.data)}))};return Object(n.useEffect)((function(){l("Tout")}),[]),o.a.createElement(B.a,{container:!0,direction:"row"},o.a.createElement(B.a,{item:!0,driection:"column",className:e.formControl},o.a.createElement(J.a,null,o.a.createElement(F.a,null,"Prix"),o.a.createElement(R.a,{defaultValue:"Tout",onChange:function(e){l(e.target.value)}},o.a.createElement(H.a,{value:"Tout",control:o.a.createElement(M.a,null),label:"Tout"}),o.a.createElement(H.a,{value:"de 0 \xe0 25",control:o.a.createElement(M.a,null),label:"de 0 \xe0 25"}),o.a.createElement(H.a,{value:"de 25 \xe0 50",control:o.a.createElement(M.a,null),label:"de 25 \xe0 50"}),o.a.createElement(H.a,{value:"de 50 \xe0 100",control:o.a.createElement(M.a,null),label:"de 50 \xe0 100"}),o.a.createElement(H.a,{value:"plus que 100",control:o.a.createElement(M.a,null),label:"plus que 100"})))),o.a.createElement(B.a,{item:!0,className:e.formControl,xs:!0},o.a.createElement(G.a,{cols:!1},r.map((function(t){return o.a.createElement(K.a,{borderColor:"grey.500",borderRadius:"2%",border:1,className:e.Box},o.a.createElement(I.a,{className:e.Text,noWrap:"true"},o.a.createElement(L.a,{href:"/Article/"+t._id}," ",t.nom," ")),o.a.createElement(I.a,{color:"secondary",variant:"h6",className:e.Text,noWrap:"true"},t.prix," DT"))})))))}var X=a(205),Y=a(190),Z=a(196),$=a(88),ee=a.n($),te=a(189),ae=a(200),ne=Object(v.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function oe(e){var t=ne(),a=Object(n.useState)(""),r=Object(b.a)(a,2),c=r[0],l=r[1],i=Object(n.useState)(""),m=Object(b.a)(i,2),u=m[0],s=m[1],p=Object(n.useState)(""),f=Object(b.a)(p,2),d=f[0],g=f[1],E=Object(n.useState)(""),h=Object(b.a)(E,2),v=h[0],j=h[1],w=Object(n.useState)(""),O=Object(b.a)(w,2),S=O[0],C=O[1];return o.a.createElement(te.a,{component:"main",maxWidth:"xs"},o.a.createElement(Y.a,null),o.a.createElement("div",{className:t.paper},o.a.createElement(X.a,{className:t.avatar},o.a.createElement(ee.a,null)),o.a.createElement(I.a,{component:"h1",variant:"h5"},"Inscription"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""===u||""===d||""===v||""===S?(l((function(){return o.a.createElement(ae.a,{severity:"error"},"Veuillez remplir tous vos coordonnees")})),setTimeout((function(){l("")}),5e3)):(z.a.post("http://localhost:4000/clients/ajouter",{nom:u,prenom:d,email:v,passe:S}),window.location="/Connexion")},className:t.form,noValidate:!0},c,o.a.createElement(Z.a,{margin:"normal",autoComplete:"nom",name:"nom",id:"nom",variant:"outlined",value:u,onChange:function(e){return s(e.target.value)},required:!0,fullWidth:!0,label:"Nom",autoFocus:!0}),o.a.createElement(Z.a,{margin:"normal",variant:"outlined",required:!0,fullWidth:!0,value:d,onChange:function(e){return g(e.target.value)},id:"prenom",label:"Pr\xe9nom",name:"prenom",autoComplete:"prenom"}),o.a.createElement(Z.a,{margin:"normal",variant:"outlined",required:!0,fullWidth:!0,value:v,onChange:function(e){return j(e.target.value)},id:"email",label:"Email",name:"email",autoComplete:"email"}),o.a.createElement(Z.a,{margin:"normal",variant:"outlined",required:!0,fullWidth:!0,value:S,onChange:function(e){return C(e.target.value)},name:"passe",label:"Mot de passe",type:"password",id:"passe",autoComplete:"passe"}),o.a.createElement(N.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"Inscription"))))}var re=a(191),ce=Object(v.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function le(){var e=Object(n.useState)(""),t=Object(b.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(""),l=Object(b.a)(c,2),i=l[0],m=l[1],u=Object(n.useState)(""),s=Object(b.a)(u,2),p=s[0],f=s[1],d=ce();return o.a.createElement(te.a,{component:"main",maxWidth:"xs"},o.a.createElement(Y.a,null),o.a.createElement("div",{className:d.paper},o.a.createElement(X.a,{className:d.avatar},o.a.createElement(re.a,null)),o.a.createElement(I.a,{component:"h1",variant:"h5"},"Connexion"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""===a||""===i?(f((function(){return o.a.createElement(ae.a,{severity:"error"},"Veuillez remplir tous vos coordonnees")})),setTimeout((function(){f("")}),5e3)):z.a.post("http://localhost:4000/clients/authentification",{email:a,passe:i}).then((function(e){"Email ou Mot de passe non valide"!==e.data?localStorage.setItem("jwt-cookie",e.data):(f((function(){return o.a.createElement(ae.a,{severity:"error"},e.data)})),setTimeout((function(){f("")}),5e3))})).then((function(){localStorage.getItem("cart-cookie")&&localStorage.getItem("jwt-cookie")&&z.a.post("http://localhost:4000/clients/majpanier",JSON.parse(localStorage.getItem("cart-cookie")),{headers:{Authorization:"bearer "+localStorage.getItem("jwt-cookie")}})})).then((function(){localStorage.getItem("jwt-cookie")&&(localStorage.getItem("jwt-cookie")&&localStorage.removeItem("cart-cookie"),window.location="/")}))},className:d.form,noValidate:!0},p,o.a.createElement(Z.a,{value:a,onChange:function(e){return r(e.target.value)},variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email",name:"email",autoComplete:"email",autoFocus:!0}),o.a.createElement(Z.a,{value:i,onChange:function(e){return m(e.target.value)},variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"passe",label:"Mot de passe",type:"password",id:"passe",autoComplete:"passe"}),o.a.createElement(N.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:d.submit},"Connexion"))))}var ie=a(192),me=a(193),ue=a(194);function se(){Object(n.useEffect)((function(){}),[]);return o.a.createElement(te.a,{component:"main"},o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),localStorage.getItem("jwt-cookie")||(window.location="/Connexion")},noValidate:!0},o.a.createElement(ie.a,null,o.a.createElement(me.a,null),o.a.createElement(ue.a,null,o.a.createElement(N.a,{size:"small"},"Supprimer"))),o.a.createElement(N.a,{variant:"contained",color:"primary",type:"submit"},"Commander")))}var pe=a(13),fe=a(199),de=Object(v.a)((function(e){return{container:{maxWidth:350},paper:{margin:e.spacing(2),display:"flex",flexDirection:"column"},spacing:{marginTop:e.spacing(1)},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function ge(){var e=de(),t=Object(n.useState)(""),a=Object(b.a)(t,2),r=a[0],c=a[1],l=Object(n.useState)([]),i=Object(b.a)(l,2),m=i[0],u=i[1],s=Object(n.useState)(""),p=Object(b.a)(s,2),f=p[0],d=p[1],g=Object(n.useState)(""),E=Object(b.a)(g,2),h=E[0],v=E[1];return Object(n.useEffect)((function(){z.a.get("http://localhost:4000/articles/recherche/"+window.location.pathname.substring(9,window.location.pathname.length)).then((function(e){c(e.data);for(var t=function(e){u((function(t){return[].concat(Object(pe.a)(t),[{title:e.toString()}])}))},a=1;a<=e.data.quantite;a++)t(a)}))}),[]),o.a.createElement(B.a,{container:!0,className:e.container},o.a.createElement("div",{className:e.paper},o.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),""===h)d((function(){return o.a.createElement(ae.a,{severity:"error"},"Veuillez choisir la quantit\xe9")})),setTimeout((function(){d("")}),5e3);else{if(localStorage.getItem("jwt-cookie")){var t=[];t.push({_id:r._id,quantite:parseInt(h)}),z.a.post("http://localhost:4000/clients/majpanier",t,{headers:{Authorization:"bearer "+localStorage.getItem("jwt-cookie")}})}else if(localStorage.getItem("cart-cookie")){for(var a=JSON.parse(localStorage.getItem("cart-cookie")),n=0,c=!1;n!==a.length&&!1===c;)a[n]._id===r._id?(a[n].quantite+=parseInt(h),c=!0):n++;n===a.length&&a.push({_id:r._id,quantite:parseInt(h)}),localStorage.setItem("cart-cookie",JSON.stringify(a))}else{var l=[];l.push({_id:r._id,quantite:parseInt(h)}),localStorage.setItem("cart-cookie",JSON.stringify(l))}window.location="/Panier"}},className:e.form,noValidate:!0},o.a.createElement(I.a,{variant:"h5",className:e.spacing},r.nom),o.a.createElement(I.a,{variant:"h4",color:"secondary",className:e.spacing},r.prix," DT"),f,o.a.createElement(fe.a,{className:e.spacing,id:"combo-box-demo",onInputChange:function(e,t){return v(t)},options:m,getOptionLabel:function(e){return e.title},renderInput:function(e){return o.a.createElement(Z.a,Object.assign({},e,{label:"quantit\xe9",variant:"outlined"}))}}),o.a.createElement(N.a,{type:"submit",variant:"contained",color:"primary",className:e.submit,fullWidth:!0},"Ajouter au panier"))))}a(137);function Ee(){return o.a.createElement("div",{id:"notfound"},o.a.createElement("div",{class:"notfound"},o.a.createElement("div",{class:"notfound-404"}),o.a.createElement("h1",null,"404"),o.a.createElement("h2",null,"Oops! Page Not Be Found"),o.a.createElement("p",null,"Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"),o.a.createElement("a",{href:"/"},"Back to homepage")))}var he=Object(l.a)({palette:{primary:{main:s.a[500]}}});c.a.render(o.a.createElement((function(){return o.a.createElement(i.a,{theme:he},o.a.createElement(m.a,null,o.a.createElement(P,null),o.a.createElement(u.d,null,o.a.createElement(u.b,{exact:!0,path:"/",component:U}),o.a.createElement(f,{path:"/Historique",component:_}),o.a.createElement(f,{path:"/Compte",component:V}),o.a.createElement(d,{path:"/Inscription",component:oe}),o.a.createElement(d,{path:"/Connexion",component:le}),o.a.createElement(u.b,{path:"/Panier",component:se}),o.a.createElement(u.b,{path:"/Article/:id",component:ge}),o.a.createElement(u.b,{path:"*",component:Ee}))))}),null),document.getElementById("root"))}},[[107,1,2]]]);
//# sourceMappingURL=main.10739c01.chunk.js.map