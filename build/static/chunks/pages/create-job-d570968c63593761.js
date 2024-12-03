(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2995],{436:function(e,a,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create-job",function(){return l(5246)}])},5246:function(e,a,l){"use strict";l.r(a),l.d(a,{default:function(){return CreateJob}});var s=l(5893),r=l(7294),i=l(1163),n=l(8504),o=l(4173);l(7967),l(8464);var elements_ProfileModal=e=>{let{isOpen:a,onClose:l}=e,r=(0,i.useRouter)();return a?(0,s.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Profile Incomplete"}),(0,s.jsx)("p",{className:"mb-6",children:"Please complete your profile before creating a job."}),(0,s.jsx)("button",{onClick:()=>r.push("/recruiter-profile"),className:"px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300",children:"OK"})]})}):null},t=l(6210),c=l(9471);let d=[{value:"Full Time",label:"Full Time"},{value:"Part Time",label:"Part Time"},{value:"Contract",label:"Contract"},{value:"Internship",label:"Internship"}],m=[{value:"High School",label:"High School"},{value:"Associate Degree",label:"Associate Degree"},{value:"Bachelor's Degree",label:"Bachelor's Degree"},{value:"Master's Degree",label:"Master's Degree"},{value:"Doctorate",label:"Doctorate"}];function CreateJob(){let e=(0,i.useRouter)(),{id:a}=e.query,[l,h]=(0,r.useState)(!1),[u,x]=(0,r.useState)([]),[p,j]=(0,r.useState)(!1),[b,f]=(0,r.useState)({jobTitle:"",location:"",category:"",workplaceType:"Office",job_type:"Full Time",responsibilities:"",qualifications:"",preferredSkills:"",salary_min:"",salary_max:"",experience:0,education:"Graduation",job_posted:"",job_expiry:"",featured:!1});(0,r.useEffect)(()=>{fetch("".concat(c.Z,"jobs/category/")).then(e=>e.json()).then(e=>{x(e)}).catch(e=>{console.error("Error fetching categories:",e),o.Am.error("Failed to fetch categories.")})},[]),(0,r.useEffect)(()=>{a&&(h(!0),fetch("".concat(c.Z,"jobs/").concat(a)).then(e=>e.json()).then(e=>{f({jobTitle:e.title,location:e.location,category:e.category,workplaceType:e.workplaceType,job_type:e.job_type,responsibilities:e.responsibilities,qualifications:e.qualifications,preferredSkills:e.skills,salary_min:e.salary_min,salary_max:e.salary_max,experience:e.experience,education:e.education,job_posted:e.job_posted,job_expiry:e.job_expiry,featured:e.featured})}).catch(e=>{console.error("Error fetching job data:",e),o.Am.error("Failed to load job data.")}))},[a]);let handleInputChange=e=>{let{name:a,value:l}=e.target;f(e=>({...e,[a]:l}))},handleTextChange=(e,a)=>{f(l=>({...l,[e]:a}))},handleSubmit=async s=>{s.preventDefault();let r=l?"".concat(c.Z,"jobs/").concat(a,"/"):"".concat(c.Z,"jobs/"),i=l?"PUT":"POST",n={title:b.jobTitle,location:b.location,category:b.category,location:b.workplaceType,job_type:b.job_type,responsibilities:b.responsibilities,qualifications:b.qualifications,skills:b.preferredSkills,salary_min:b.salary_min,salary_max:b.salary_max,experience:b.experience,education:b.education,job_posted:b.job_posted,job_expiry:b.job_expiry,featured:b.featured};try{let a=localStorage.getItem("accessToken"),s=await fetch("".concat(c.Z,"user/user-details/"),{method:"GET",headers:{Authorization:"Bearer ".concat(a)}}),t=await s.json(),d=["first_name","last_name","current_location","current_company_name","current_designation","email"].every(e=>t[e]&&""!==t[e].trim());if(s.ok&&d){let s=await fetch(r,{method:i,headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},body:JSON.stringify(n)});s.ok?(console.log(n),o.Am.success(l?"Job updated successfully!":"Job created successfully!"),e.push("/dashboard")):o.Am.error("Something went wrong!")}else j(!0)}catch(e){console.error("Error:",e),o.Am.error("Error occurred while saving job.")}};return(0,s.jsxs)(n.Z,{children:[(0,s.jsx)(o.Ix,{}),(0,s.jsx)("div",{className:"container",children:(0,s.jsx)("section",{className:"section-box",children:(0,s.jsx)("div",{className:"container mt-50",children:(0,s.jsx)("div",{className:"row",children:(0,s.jsxs)("div",{className:"col-lg-8 col-md-12 mx-auto",children:[(0,s.jsx)("h3",{className:"mt-0 mb-15 color-brand-1",children:l?"Edit Job":"Create Job"}),(0,s.jsxs)("form",{onSubmit:handleSubmit,children:[(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Job Title"}),(0,s.jsx)("input",{type:"text",className:"form-control",name:"jobTitle",value:b.jobTitle,onChange:handleInputChange,required:!0})]})}),(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Location (City, State / Remote)"}),(0,s.jsx)("input",{type:"text",className:"form-control",name:"location",value:b.location,onChange:handleInputChange,required:!0})]})})]}),(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Category"}),(0,s.jsx)("select",{className:"form-control",name:"category",value:b.category,onChange:handleInputChange,required:!0,children:u.length>0?u.map(e=>(0,s.jsx)("option",{value:e.id,children:e.name},e.id)):(0,s.jsx)("option",{value:"",children:"Loading categories..."})})]})}),(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Job Type"}),(0,s.jsx)("select",{className:"form-control",name:"job_type",value:b.job_type,onChange:handleInputChange,required:!0,children:d.map(e=>(0,s.jsx)("option",{value:e.value,children:e.label},e.value))})]})})]}),(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Minimum Salary"}),(0,s.jsx)("input",{type:"number",className:"form-control",name:"salary_min",value:b.salary_min,onChange:handleInputChange,step:1e3,min:0,required:!0})]})}),(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Maximum Salary"}),(0,s.jsx)("input",{type:"number",className:"form-control",name:"salary_max",value:b.salary_max,onChange:handleInputChange,step:1e3,min:0,required:!0})]})})]}),(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Experience (in years)"}),(0,s.jsx)("input",{type:"number",className:"form-control",name:"experience",value:b.experience,onChange:handleInputChange,min:0,required:!0})]})}),(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Education"}),(0,s.jsx)("select",{className:"form-control",name:"education",value:b.education,onChange:handleInputChange,required:!0,children:m.map(e=>(0,s.jsx)("option",{value:e.value,children:e.label},e.value))})]})})]}),(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-md-12",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Responsibilities"}),(0,s.jsx)(t.M,{value:b.responsibilities,onTextChange:e=>handleTextChange("responsibilities",e.htmlValue),style:{height:"320px"}})]})})}),(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-md-12",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Qualifications"}),(0,s.jsx)(t.M,{value:b.qualifications,onTextChange:e=>handleTextChange("qualifications",e.htmlValue),style:{height:"320px"}})]})})}),(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-md-12",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Preferred Skills"}),(0,s.jsx)(t.M,{value:b.preferredSkills,onTextChange:e=>handleTextChange("preferredSkills",e.htmlValue),style:{height:"320px"}})]})})}),(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Job Posted Date"}),(0,s.jsx)("input",{type:"date",className:"form-control",name:"job_posted",value:b.job_posted,onChange:handleInputChange,required:!0})]})}),(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Job Expiry Date"}),(0,s.jsx)("input",{type:"date",className:"form-control",name:"job_expiry",value:b.job_expiry,onChange:handleInputChange,required:!0})]})})]}),(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-md-6",children:(0,s.jsxs)("div",{className:"form-check",children:[(0,s.jsx)("input",{type:"checkbox",className:"form-check-input",name:"featured",checked:b.featured,onChange:e=>f(a=>({...a,featured:e.target.checked}))}),(0,s.jsx)("label",{className:"form-check-label",children:"Featured"})]})})}),(0,s.jsx)("div",{className:"row mt-3",children:(0,s.jsxs)("div",{className:"col-md-12",children:[(0,s.jsx)("button",{type:"submit",className:"btn btn-primary",style:{marginRight:"10px"},children:l?"Update Job":"Create Job"}),(0,s.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:()=>{e.back()},children:"Cancel"}),(0,s.jsx)("button",{})]})})]})]})})})})}),(0,s.jsx)(elements_ProfileModal,{isOpen:p})]})}},9471:function(e,a){"use strict";a.Z="http://35.154.204.105/api/"}},function(e){e.O(0,[1653,9865,5017,8504,9774,2888,179],function(){return e(e.s=436)}),_N_E=e.O()}]);