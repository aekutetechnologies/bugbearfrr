"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3203],{3203:function(e,t,r){r.r(t);var n=r(5893),o=r(7294),i=r(1664),a=r.n(i),s=r(2091),c=r(1955),l=r(1163),d=r(6340);t.default=()=>{let[e,t]=(0,o.useState)(null),[r,i]=(0,o.useState)(!1),[u,f]=(0,o.useState)(!1),[h,p]=(0,o.useState)(null),[m,g]=(0,o.useState)(!1),v=(0,l.useRouter)();return(0,o.useEffect)(()=>{let e=localStorage.getItem("accessToken");e?(0,d.bN)(e).then(e=>{t(e),i(!0),p(localStorage.getItem("userType"))}).catch(e=>{console.error("Error fetching profile data:",e),i(!1)}):i(!1)},[]),(0,n.jsx)(n.Fragment,{children:r?(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsxs)("button",{className:"flex items-center gap-2 pr-10",onClick:()=>{f(!u)},children:[(0,n.jsx)("img",{src:(null==e?void 0:e.profile_pic_url)||"/assets/imgs/default-profile-pic.png",alt:"Profile",width:45,className:"rounded-full"}),(0,n.jsxs)("span",{children:[(0,n.jsx)("span",{children:"Hi, "}),(null==e?void 0:e.first_name)||"User"]})]}),u&&(0,n.jsxs)("div",{className:"absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-10",children:[(0,n.jsx)(a(),{href:"1"===h?"/candidate-profile":"2"===h?"/organization-profile":"/recruiter-profile",children:(0,n.jsxs)("div",{className:"dropdown-item flex items-center p-2 cursor-pointer",children:[(0,n.jsx)(s.m3W,{className:"mr-2",style:{fontSize:"1.2rem"}}),"View Profile"]})}),(0,n.jsxs)("div",{className:"dropdown-item flex items-center p-2 cursor-pointer",onClick:()=>{g(!m)},children:[(0,n.jsx)(s.p4t,{className:"mr-2",style:{fontSize:"1.2rem"}}),"My Account"]}),(0,n.jsxs)("div",{className:"dropdown-item flex items-center p-2 cursor-pointer",onClick:()=>{localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("userType"),c.Z.remove("token"),i(!1),t(null),p(null),v.push("/login")},children:[(0,n.jsx)(s.fHX,{className:"mr-2",style:{fontSize:"1.2rem"}}),"Logout"]})]})]}):(0,n.jsxs)("div",{className:"flex items-center pr-10",children:[(0,n.jsx)(a(),{href:"/choose-role",className:"text-link-bd-btom hover-up",children:"Register"}),(0,n.jsx)(a(),{href:"/login",className:"btn btn-default btn-shadow ml-40 hover-up",children:"Sign in"})]})})}},6340:function(e,t,r){r.d(t,{bN:function(){return fetchProfileData},r$:function(){return fetchCandidateDetails}});var n=r(9471);let fetchProfileData=async e=>{try{let t=await fetch("".concat(n.Z,"user/user-details/"),{method:"GET",headers:{Authorization:"Bearer ".concat(e)}});if(!t.ok)throw Error("Failed to fetch profile data");let r=await t.json();return r}catch(e){throw console.error("Error fetching profile data:",e),e}},fetchCandidateDetails=async(e,t)=>{try{let r=await fetch("".concat(n.Z,"user/candidate/").concat(e,"/"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}});if(!r.ok)throw Error("Failed to fetch candidate details");let o=await r.json();return o}catch(e){throw console.error("Error fetching candidate details:",e),e}}},9471:function(e,t){t.Z="http://35.154.204.105/api/"},1955:function(e,t,r){/*! js-cookie v3.0.5 | MIT */function assign(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)e[n]=r[n]}return e}r.d(t,{Z:function(){return n}});var n=function init(e,t){function set(r,n,o){if("undefined"!=typeof document){"number"==typeof(o=assign({},t,o)).expires&&(o.expires=new Date(Date.now()+864e5*o.expires)),o.expires&&(o.expires=o.expires.toUTCString()),r=encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var a in o)o[a]&&(i+="; "+a,!0!==o[a]&&(i+="="+o[a].split(";")[0]));return document.cookie=r+"="+e.write(n,r)+i}}return Object.create({set,get:function(t){if("undefined"!=typeof document&&(!arguments.length||t)){for(var r=document.cookie?document.cookie.split("; "):[],n={},o=0;o<r.length;o++){var i=r[o].split("="),a=i.slice(1).join("=");try{var s=decodeURIComponent(i[0]);if(n[s]=e.read(a,s),t===s)break}catch(e){}}return t?n[t]:n}},remove:function(e,t){set(e,"",assign({},t,{expires:-1}))},withAttributes:function(e){return init(this.converter,assign({},this.attributes,e))},withConverter:function(e){return init(assign({},this.converter,e),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(e)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}}]);