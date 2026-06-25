"use strict";(()=>{var e={};e.id=386,e.ids=[386,4191],e.modules={11185:e=>{e.exports=require("mongoose")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},58174:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>h,patchFetch:()=>y,requestAsyncStorage:()=>f,routeModule:()=>g,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var n={};r.r(n),r.d(n,{GET:()=>u,POST:()=>d,dynamic:()=>p});var o=r(49303),a=r(88716),s=r(60670),i=r(90883),l=r(96511),c=r(65537);let p="force-dynamic";async function d(e){return(0,i.Ss)(async()=>{let{name:t,email:r,message:n}=await e.json();if(!t?.trim())return(0,i.cn)("Name is required");if(!r?.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return(0,i.cn)("Valid email is required");if(!n?.trim())return(0,i.cn)("Message is required");if(n.length<10)return(0,i.cn)("Message must be at least 10 characters");let o=await l.Q.create({name:t.trim(),email:r.trim().toLowerCase(),message:n.trim(),ip:e.headers.get("x-forwarded-for")||"unknown"});return Promise.all([(0,c.Lf)(o.toObject()),(0,c.wg)(o.toObject())]).then(([e,t])=>{(e.success||e.skipped)&&l.Q.findByIdAndUpdate(o._id,{emailSent:!0}).catch(()=>{})}).catch(()=>{}),(0,i.ok)({id:o._id},{message:"Message sent successfully"})})}async function u(e){return(0,i.Ss)(async()=>(0,i.ok)({status:"Contact API is live"}))}let g=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"D:\\Freelancing\\park queen live\\app\\api\\contact\\route.js",nextConfigOutput:"",userland:n}),{requestAsyncStorage:f,staticGenerationAsyncStorage:m,serverHooks:x}=g,h="/api/contact/route";function y(){return(0,s.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}},90883:(e,t,r)=>{r.d(t,{IS:()=>u,QO:()=>c,Ss:()=>p,V6:()=>d,cn:()=>i,ok:()=>s,v6:()=>l});var n=r(87070),o=r(77999),a=r(84191);function s(e,t={}){return n.NextResponse.json({success:!0,data:e,...t})}function i(e,t=400){return n.NextResponse.json({success:!1,error:e},{status:t})}function l(e="Record"){return i(`${e} not found`,404)}async function c(e,t){if(!(0,o.RA)(e))return i("Unauthorized",401);try{return await (0,a.connectDB)(),await t()}catch{return i("An internal server error occurred",500)}}async function p(e){try{return await (0,a.connectDB)(),await e()}catch{return s([],{pagination:{total:0,page:1,limit:20,pages:0}})}}function d(e={}){let t=Math.max(1,parseInt(e.page)||1),r=Math.min(100,Math.max(1,parseInt(e.limit)||20));return{page:t,limit:r,skip:(t-1)*r}}function u(e,t,r){return{pagination:{total:e,page:t,limit:r,pages:Math.ceil(e/r)}}}},77999:(e,t,r)=>{r.d(t,{Gc:()=>i,Gv:()=>c,RA:()=>l});var n=r(84770),o=r.n(n);let a=process.env.ADMIN_SECRET||"",s=process.env.ADMIN_PASSWORD||"";function i(){return o().createHmac("sha256",a).update("admin:authenticated").digest("hex")}function l(e){if(!a)return!1;let t=e.cookies.get("admin_token")?.value;return!!t&&t===i()}function c(e){if(!s||!e)return!1;try{let t=Buffer.from(s,"utf8"),r=Buffer.from(e,"utf8");if(t.length!==r.length)return!1;return o().timingSafeEqual(t,r)}catch{return!1}}},84191:(e,t,r)=>{r.d(t,{connectDB:()=>s});var n=r(11185),o=r.n(n);let a=global.mongoose;async function s(){let e=process.env.MONGODB_URI;if(!e)throw Error("Please define MONGODB_URI in .env.local");return a.conn||(a.promise||(a.promise=o().connect(e,{bufferCommands:!1})),a.conn=await a.promise),a.conn}a||(a=global.mongoose={conn:null,promise:null})},65537:(e,t,r)=>{r.d(t,{HV:()=>v,Lf:()=>y,jJ:()=>w,wg:()=>b});var n=r(55245),o=r(92048),a=r.n(o),s=r(55315),i=r.n(s);let l=process.env.HOTEL_NAME||"The ParkQueen Hotel",c=process.env.HOTEL_EMAIL||"fom@parkqueenhotels.com",p=process.env.HOTEL_PHONE||"+91 9088809991",d=process.env.HOTEL_ADDRESS||"Opposite Devi Lal Park, Rohtak, Haryana 124001",u=!1,g=null;async function f(){if(!process.env.SMTP_HOST)return null;if(!g||!u){g=function(){let e=process.env.SMTP_HOST;if(!e)return null;let t=parseInt(process.env.SMTP_PORT||"587"),r="true"===process.env.SMTP_SECURE,o=process.env.SMTP_USER,s=function(){let e=[];process.env.NODE_EXTRA_CA_CERTS&&e.push(process.env.NODE_EXTRA_CA_CERTS);let t=i().join(process.cwd(),"avast-ca.pem");return(a().existsSync(t)&&e.push(t),0===e.length)?[]:e.flatMap(e=>{try{return[a().readFileSync(e,"utf8")]}catch{return[]}})}(),l=s.length>0?{ca:s}:void 0;return n.createTransport({host:e,port:t,secure:r,auth:{user:o,pass:process.env.SMTP_PASS},...l?{tls:l}:{}})}();try{await g.verify(),u=!0}catch{return u=!1,g=null,null}}return g}async function m(e){let t=await f();if(!t)return{skipped:!0};try{let r=await t.sendMail({from:`"${l}" <${process.env.SMTP_FROM||c}>`,...e});return{success:!0,messageId:r.messageId}}catch{return g=null,u=!1,{success:!1,error:err.message}}}function x(e,t){return`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${e}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);">
          <tr>
            <td style="background:#1a1c2e;padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#cda434;font-size:22px;letter-spacing:1px;">${l}</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,.6);font-size:12px;">Rohtak, Haryana — India</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${t}
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:12px;">
                📍 ${d}<br/>
                📞 ${p} &nbsp;|&nbsp; ✉️ ${c}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`}function h(e,t){return`
  <tr>
    <td style="padding:8px 12px;background:#f9fafb;font-weight:600;color:#374151;font-size:13px;border-bottom:1px solid #e5e7eb;width:35%;">${e}</td>
    <td style="padding:8px 12px;color:#111827;font-size:13px;border-bottom:1px solid #e5e7eb;">${t||"—"}</td>
  </tr>`}async function y({name:e,email:t,message:r,createdAt:n}){return m({to:c,subject:`📩 New Contact Message from ${e}`,html:x("New Contact Message",`<h2 style="margin:0 0 20px;color:#111827;font-size:18px;">New Contact Form Submission</h2>
       <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
         ${h("Name",e)}
         ${h("Email",`<a href="mailto:${t}" style="color:#cda434;">${t}</a>`)}
         ${h("Received",new Date(n).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}))}
       </table>
       <div style="background:#f9fafb;border-left:4px solid #cda434;padding:16px;border-radius:4px;">
         <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#374151;">Message:</p>
         <p style="margin:0;color:#111827;font-size:14px;line-height:1.6;">${r.replace(/\n/g,"<br/>")}</p>
       </div>
       <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">
         Reply directly to <a href="mailto:${t}" style="color:#cda434;">${t}</a> to respond.
       </p>`),replyTo:t})}async function b({name:e,email:t,message:r}){return m({to:t,subject:`Thank you for contacting ${l}`,html:x("Message Received",`<h2 style="margin:0 0 8px;color:#111827;font-size:18px;">Dear ${e},</h2>
       <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
         Thank you for reaching out to <strong>${l}</strong>. We have received your message and our team will get back to you within <strong>24 hours</strong>.
       </p>
       <div style="background:#f9fafb;border-left:4px solid #cda434;padding:16px;border-radius:4px;margin-bottom:20px;">
         <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#374151;">Your message:</p>
         <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">${r.replace(/\n/g,"<br/>")}</p>
       </div>
       <p style="margin:0;color:#374151;font-size:14px;">
         For urgent enquiries, please call us at <strong>${p}</strong>.
       </p>
       <p style="margin:20px 0 0;color:#374151;font-size:14px;">
         Warm regards,<br/>
         <strong>The ParkQueen Hotel Team</strong>
       </p>`)})}async function v(e){let{bookingRef:t,name:r,email:n,phone:o,roomType:a,guests:s,checkIn:i,checkOut:l,message:p,createdAt:d}=e;return m({to:c,subject:`🏨 New Booking Request [${t}] — ${r}`,html:x("New Booking Request",`<h2 style="margin:0 0 6px;color:#111827;font-size:18px;">New Booking Request</h2>
       <p style="margin:0 0 20px;color:#9ca3af;font-size:13px;">Ref: <strong style="color:#cda434;">${t}</strong></p>
       <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
         ${h("Booking Ref",`<strong style="color:#cda434;">${t}</strong>`)}
         ${h("Guest Name",r)}
         ${h("Email",`<a href="mailto:${n}" style="color:#cda434;">${n}</a>`)}
         ${h("Phone",o)}
         ${h("Room Type",a)}
         ${h("Guests",s)}
         ${h("Check In",i)}
         ${h("Check Out",l)}
         ${h("Submitted",new Date(d).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}))}
       </table>
       ${p?`<div style="background:#f9fafb;border-left:4px solid #cda434;padding:16px;border-radius:4px;">
         <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#374151;">Special Requests:</p>
         <p style="margin:0;color:#111827;font-size:13px;">${p.replace(/\n/g,"<br/>")}</p>
       </div>`:""}`),replyTo:n})}async function w(e){let{bookingRef:t,name:r,email:n,roomType:o,guests:a,checkIn:s,checkOut:i}=e;return m({to:n,subject:`Booking Request Received — ${l} [${t}]`,html:x("Booking Received",`<h2 style="margin:0 0 8px;color:#111827;font-size:18px;">Dear ${r},</h2>
       <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
         We have received your booking request. Our reservations team will confirm within <strong>12 hours</strong>.
       </p>
       <div style="background:#1a1c2e;border-radius:8px;padding:20px;margin-bottom:20px;text-align:center;">
         <p style="margin:0 0 4px;color:rgba(255,255,255,.6);font-size:12px;letter-spacing:1px;text-transform:uppercase;">Your Booking Reference</p>
         <h3 style="margin:0;color:#cda434;font-size:28px;letter-spacing:3px;">${t}</h3>
         <p style="margin:6px 0 0;color:rgba(255,255,255,.4);font-size:11px;">Quote this reference in all communications</p>
       </div>
       <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
         ${h("Room Type",o)}
         ${h("Guests",a)}
         ${h("Check In",s)}
         ${h("Check Out",i)}
       </table>
       <p style="margin:0;color:#374151;font-size:14px;">
         📞 <strong>${p}</strong><br/>
         ✉️ <a href="mailto:${c}" style="color:#cda434;">${c}</a>
       </p>
       <p style="margin:24px 0 0;color:#374151;font-size:14px;">
         Warm regards,<br/>
         <strong>The ParkQueen Hotel Reservations Team</strong>
       </p>`)})}},96511:(e,t,r)=>{r.d(t,{Q:()=>s});var n=r(11185),o=r.n(n);let a=new(o()).Schema({name:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,lowercase:!0},message:{type:String,required:!0},status:{type:String,enum:["new","read","replied"],default:"new"},ip:{type:String},emailSent:{type:Boolean,default:!1}},{timestamps:!0});a.index({status:1,createdAt:-1});let s=o().models.ContactMessage||o().model("ContactMessage",a)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,5972,5245],()=>r(58174));module.exports=n})();