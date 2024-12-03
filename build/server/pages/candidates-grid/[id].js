"use strict";(()=>{var e={};e.id=4512,e.ids=[4512],e.modules={8227:(e,a,s)=>{s.a(e,async(e,t)=>{try{s.r(a),s.d(a,{config:()=>m,default:()=>x,getServerSideProps:()=>f,getStaticPaths:()=>j,getStaticProps:()=>p,reportWebVitals:()=>h,routeModule:()=>N,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>y,unstable_getStaticParams:()=>g,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>u});var r=s(7093),i=s(5244),c=s(1323),n=s(4003),o=s(9597),d=s(1390),l=e([d]);d=(l.then?(await l)():l)[0];let x=(0,c.l)(d,"default"),p=(0,c.l)(d,"getStaticProps"),j=(0,c.l)(d,"getStaticPaths"),f=(0,c.l)(d,"getServerSideProps"),m=(0,c.l)(d,"config"),h=(0,c.l)(d,"reportWebVitals"),u=(0,c.l)(d,"unstable_getStaticProps"),b=(0,c.l)(d,"unstable_getStaticPaths"),g=(0,c.l)(d,"unstable_getStaticParams"),v=(0,c.l)(d,"unstable_getServerProps"),y=(0,c.l)(d,"unstable_getServerSideProps"),N=new r.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/candidates-grid/[id]",pathname:"/candidates-grid/[id]",bundlePath:"",filename:""},components:{App:o.default,Document:n.default},userland:d});t()}catch(e){t(e)}})},1390:(e,a,s)=>{s.a(e,async(e,t)=>{try{s.r(a),s.d(a,{default:()=>CandidateGrid,getServerSideProps:()=>getServerSideProps});var r=s(997),i=s(9816),c=s.n(i),n=s(1664),o=s.n(n),d=s(5393),l=s(9649),x=s(4802),p=s.n(x),j=s(2829),f=s(6689);s(1163);var m=s(9471),h=e([d,l,j]);[d,l,j]=h.then?(await h)():h;let Pagination=({currentPage:e,totalPages:a,handlePageChange:s})=>(0,r.jsxs)("ul",{className:"jsx-6ad29cfe31a13f4e pager",children:[r.jsx("li",{className:"jsx-6ad29cfe31a13f4e",children:r.jsx("a",{href:"#",onClick:a=>{a.preventDefault(),s(e-1)},className:`jsx-6ad29cfe31a13f4e pager-prev ${1===e?"disabled":""}`,children:"Prev"})}),[...Array(a)].map((a,t)=>r.jsx("li",{className:"jsx-6ad29cfe31a13f4e",children:r.jsx(o(),{legacyBehavior:!0,href:"#",children:r.jsx("a",{onClick:e=>{e.preventDefault(),s(t+1)},className:`jsx-6ad29cfe31a13f4e pager-number ${e===t+1?"active":""}`,children:t+1})})},t)),r.jsx("li",{className:"jsx-6ad29cfe31a13f4e",children:r.jsx("a",{href:"#",onClick:a=>{a.preventDefault(),s(e+1)},className:`jsx-6ad29cfe31a13f4e pager-next ${e===a?"disabled":""}`,children:"Next"})}),r.jsx(c(),{id:"6ad29cfe31a13f4e",children:".pager.jsx-6ad29cfe31a13f4e{list-style:none;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;gap:10px;padding:0}.pager.jsx-6ad29cfe31a13f4e a.jsx-6ad29cfe31a13f4e{padding:8px 12px;border:1px solid#ddd;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;color:#0070f3;text-decoration:none;-webkit-transition:background-color.3s ease;-moz-transition:background-color.3s ease;-o-transition:background-color.3s ease;transition:background-color.3s ease}.pager.jsx-6ad29cfe31a13f4e a.jsx-6ad29cfe31a13f4e:hover:not(.disabled){background-color:#f0f0f0}.pager.jsx-6ad29cfe31a13f4e a.active.jsx-6ad29cfe31a13f4e{background-color:#0070f3;color:white;border-color:#0070f3}.pager.jsx-6ad29cfe31a13f4e a.disabled.jsx-6ad29cfe31a13f4e{pointer-events:none;opacity:.5}"})]}),CandidateCard=({candidate:e,handleApprove:a})=>{let s=(0,j.default)(new Date(e.applied_date),"MM/dd/yyyy HH:mm");return(0,r.jsxs)("div",{className:"jsx-198341cd30109843 col-xl-3 col-lg-4 col-md-6",children:[(0,r.jsxs)("div",{className:"jsx-198341cd30109843 card-grid-2 hover-up fixed-card-height",children:[(0,r.jsxs)("div",{className:"jsx-198341cd30109843 card-grid-2-image-left",children:[r.jsx("div",{className:`jsx-198341cd30109843 card-grid-2-image-rd ${e.user.is_online?"online":"offline"}`,children:r.jsx(o(),{legacyBehavior:!0,href:`/candidate-details/${e.user.id}`,children:r.jsx("a",{className:"jsx-198341cd30109843",children:r.jsx("figure",{className:"jsx-198341cd30109843",children:r.jsx("img",{alt:"bugbear",src:e.user.profile_pic,className:"jsx-198341cd30109843"})})})})}),(0,r.jsxs)("div",{className:"jsx-198341cd30109843 card-profile pt-10",children:[r.jsx(o(),{legacyBehavior:!0,href:`/candidate-details/${e.user.id}`,children:r.jsx("a",{className:"jsx-198341cd30109843",children:(0,r.jsxs)("h5",{className:"jsx-198341cd30109843",children:[e.user.first_name," ",e.user.last_name]})})}),r.jsx("span",{className:"jsx-198341cd30109843 font-xs color-text-muted",children:e.user.position})]})]}),(0,r.jsxs)("div",{className:"jsx-198341cd30109843 card-block-info",children:[r.jsx("p",{className:"jsx-198341cd30109843 font-xs color-text-paragraph-2",children:e.user.about_me}),r.jsx("div",{className:"jsx-198341cd30109843 employers-info align-items-center justify-content-center mt-15",children:(0,r.jsxs)("div",{className:"jsx-198341cd30109843 row",children:[r.jsx("div",{className:"jsx-198341cd30109843 col-6",children:(0,r.jsxs)("span",{className:"jsx-198341cd30109843 d-flex align-items-center",children:[r.jsx("i",{className:"jsx-198341cd30109843 fi-rr-marker mr-5 ml-0"}),(0,r.jsxs)("span",{className:"jsx-198341cd30109843 font-sm color-text-muted",children:[e.user.city,", ",e.user.country]})]})}),r.jsx("div",{className:"jsx-198341cd30109843 col-6",children:(0,r.jsxs)("span",{className:"jsx-198341cd30109843 d-flex justify-content-end align-items-center",children:[r.jsx("i",{className:"jsx-198341cd30109843 fi-rr-phone mr-5"}),(0,r.jsxs)("span",{className:"jsx-198341cd30109843 font-sm color-brand-1",children:["Applied on: ",s]})]})})]})}),r.jsx("div",{className:"jsx-198341cd30109843 mt-10 text-center",children:e.is_approved?r.jsx("button",{onClick:()=>a(e.user.id,!1),className:"jsx-198341cd30109843 btn btn-apply-icon btn-apply btn-apply-big hover-up",children:"Disapprove"}):r.jsx("button",{onClick:()=>a(e.user.id,!0),className:"jsx-198341cd30109843 btn btn-apply-icon btn-apply btn-apply-big hover-up",children:"Approve"})})]})]}),r.jsx(c(),{id:"198341cd30109843",children:".fixed-card-height.jsx-198341cd30109843{height:400px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.card-grid-2-image-left.jsx-198341cd30109843{position:relative;padding:10px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center}.card-grid-2-image-left.jsx-198341cd30109843 figure.jsx-198341cd30109843{width:80px;height:80px;overflow:hidden;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;border:2px solid#f0f0f0}.card-grid-2-image-left.jsx-198341cd30109843 img.jsx-198341cd30109843{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.card-profile.jsx-198341cd30109843{text-align:center}"})]})};function CandidateGrid({initialApplicants:e,jobId:a}){let[s,t]=(0,f.useState)(""),[i,n]=(0,f.useState)(e),[x,j]=(0,f.useState)(1),[h,u]=(0,f.useState)(!1),[b,g]=(0,f.useState)(null),v=Math.ceil(i.length/8),y=i.slice((x-1)*8,8*x),N=(0,f.useCallback)(async e=>{u(!0),g(null);try{let s=p().parse(document.cookie).accessToken,t=await fetch(`${m.Z}jobs/applicants/${a}/`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({searchTerm:e})});if(!t.ok)throw Error(`Failed to fetch applicants: ${t.statusText}`);let r=await t.json();n(r),j(1)}catch(e){console.error("Error fetching applicants:",e),g("Failed to load applicants. Please try again.")}finally{u(!1)}},[a]),handleApprove=async(e,s)=>{try{let t=p().parse(document.cookie).accessToken,r=await fetch(`${m.Z}jobs/apply/`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({job_id:a,user_id:e,is_approved:s})});if(r.ok)n(a=>a.map(a=>a.user.id===e?{...a,is_approved:s}:a));else throw Error(`Failed to update approval status: ${r.statusText}`)}catch(e){console.error("Error updating approval status:",e)}};return(0,f.useEffect)(()=>{let e=setTimeout(()=>{N(s.trim())},500);return()=>clearTimeout(e)},[s,N]),(0,r.jsxs)(r.Fragment,{children:[r.jsx(d.Z,{children:(0,r.jsxs)("div",{className:"jsx-5480ef2601781893",children:[r.jsx("section",{className:"jsx-5480ef2601781893 section-box-2",children:r.jsx("div",{className:"jsx-5480ef2601781893 container",children:r.jsx("div",{className:"jsx-5480ef2601781893 banner-hero banner-company",children:(0,r.jsxs)("div",{className:"jsx-5480ef2601781893 block-banner text-center",children:[r.jsx("h3",{className:"jsx-5480ef2601781893 wow animate__animated animate__fadeInUp",children:"Browse Candidates"}),r.jsx("div",{"data-wow-delay":".1s",className:"jsx-5480ef2601781893 font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp",children:"Explore applicants who applied for this job."}),r.jsx("div",{className:"jsx-5480ef2601781893 mt-3",children:r.jsx("input",{type:"text",placeholder:"Search by name, position, or city",value:s,onChange:e=>t(e.target.value),className:"jsx-5480ef2601781893 form-control"})})]})})})}),r.jsx("section",{className:"jsx-5480ef2601781893 section-box mt-30",children:(0,r.jsxs)("div",{className:"jsx-5480ef2601781893 container",children:[r.jsx("div",{className:"jsx-5480ef2601781893 content-page",children:h?r.jsx("p",{className:"jsx-5480ef2601781893",children:"Loading..."}):b?r.jsx("p",{className:"jsx-5480ef2601781893 error-message",children:b}):0===i.length?r.jsx("p",{className:"jsx-5480ef2601781893",children:"No candidates found."}):r.jsx("div",{className:"jsx-5480ef2601781893 row",children:y.map((e,a)=>r.jsx(CandidateCard,{candidate:e,handleApprove:handleApprove},e.id||a))})}),v>1&&r.jsx("div",{className:"jsx-5480ef2601781893 paginations",children:r.jsx(Pagination,{currentPage:x,totalPages:v,handlePageChange:e=>{e>=1&&e<=v&&(j(e),window.scrollTo({top:0,behavior:"smooth"}))}})})]})}),(0,r.jsxs)("section",{className:"jsx-5480ef2601781893 section-box mt-50 mb-50",children:[r.jsx("div",{className:"jsx-5480ef2601781893 container",children:(0,r.jsxs)("div",{className:"jsx-5480ef2601781893 text-start",children:[r.jsx("h2",{className:"jsx-5480ef2601781893 section-title mb-10 wow animate__animated animate__fadeInUp",children:"News and Blog"}),r.jsx("p",{className:"jsx-5480ef2601781893 font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp",children:"Get the latest news, updates, and tips"})]})}),r.jsx("div",{className:"jsx-5480ef2601781893 container",children:(0,r.jsxs)("div",{className:"jsx-5480ef2601781893 mt-50",children:[r.jsx("div",{className:"jsx-5480ef2601781893 box-swiper style-nav-top",children:r.jsx(l.Z,{})}),r.jsx("div",{className:"jsx-5480ef2601781893 text-center",children:r.jsx(o(),{legacyBehavior:!0,href:"blog-grid",children:r.jsx("a",{className:"jsx-5480ef2601781893 btn btn-brand-1 btn-icon-load mt--30 hover-up",children:"Load More Posts"})})})]})})]})]})}),r.jsx(c(),{id:"5480ef2601781893",children:".error-message.jsx-5480ef2601781893{color:red;text-align:center;margin-top:20px}"})]})}async function getServerSideProps(e){let{id:a}=e.query;try{let s=e.req.headers.cookie?p().parse(e.req.headers.cookie):{},t=s.accessToken,r=await fetch(`${m.Z}jobs/applicants/${a}/`,{method:"GET",headers:{Authorization:`Bearer ${t}`}});if(!r.ok)throw Error(`Failed to fetch applicants: ${r.status}`);let i=await r.json();return console.log("Applicants:",i),{props:{initialApplicants:i,jobId:a}}}catch(e){return console.error("Error fetching job applicants:",e),{props:{initialApplicants:[],jobId:a}}}}t()}catch(e){t(e)}})},9471:(e,a,s)=>{s.d(a,{Z:()=>t});let t="http://35.154.204.105/api/"},4802:e=>{e.exports=require("cookie")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},5162:e=>{e.exports=require("react-perfect-scrollbar")},997:e=>{e.exports=require("react/jsx-runtime")},9816:e=>{e.exports=require("styled-jsx/style")},2829:e=>{e.exports=import("date-fns/format")},9915:e=>{e.exports=import("js-cookie")},3590:e=>{e.exports=import("react-toastify")},3877:e=>{e.exports=import("swiper")},3015:e=>{e.exports=import("swiper/react")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var a=require("../../webpack-runtime.js");a.C(e);var __webpack_exec__=e=>a(a.s=e),s=a.X(0,[6859,8450,7792,4283,2493,5393,9649],()=>__webpack_exec__(8227));module.exports=s})();