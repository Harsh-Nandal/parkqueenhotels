"use strict";(()=>{var e={};e.id=324,e.ids=[324,4191],e.modules={11185:e=>{e.exports=require("mongoose")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},39462:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>h,requestAsyncStorage:()=>g,routeModule:()=>d,serverHooks:()=>f,staticGenerationAsyncStorage:()=>m});var n={};r.r(n),r.d(n,{POST:()=>u,dynamic:()=>c});var o=r(49303),i=r(88716),a=r(60670),s=r(90883),p=r(83690),l=r(65537);let c="force-dynamic";async function u(e){return(0,s.Ss)(async()=>{let{name:t,email:r,phone:n,roomType:o,guests:i,checkIn:a,checkOut:c,message:u}=await e.json();if(!t?.trim())return(0,s.cn)("Name is required");if(!r?.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return(0,s.cn)("Valid email is required");if(!a?.trim())return(0,s.cn)("Check-in date is required");if(!c?.trim())return(0,s.cn)("Check-out date is required");if(!o||"Room"===o)return(0,s.cn)("Please select a room type");let d=await p.$.create({name:t.trim(),email:r.trim().toLowerCase(),phone:n?.trim()||"",roomType:o.trim(),guests:parseInt(i)||1,checkIn:a.trim(),checkOut:c.trim(),message:u?.trim()||""});return Promise.all([(0,l.HV)(d.toObject()),(0,l.jJ)(d.toObject())]).then(([e])=>{(e.success||e.skipped)&&p.$.findByIdAndUpdate(d._id,{emailSent:!0}).catch(()=>{})}).catch(()=>{}),(0,s.ok)({bookingRef:d.bookingRef,id:d._id},{message:"Booking request submitted successfully"})})}let d=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/booking/route",pathname:"/api/booking",filename:"route",bundlePath:"app/api/booking/route"},resolvedPagePath:"D:\\Freelancing\\park queen live\\app\\api\\booking\\route.js",nextConfigOutput:"",userland:n}),{requestAsyncStorage:g,staticGenerationAsyncStorage:m,serverHooks:f}=d,x="/api/booking/route";function h(){return(0,a.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:m})}},90883:(e,t,r)=>{r.d(t,{IS:()=>d,QO:()=>l,Ss:()=>c,V6:()=>u,cn:()=>s,ok:()=>a,v6:()=>p});var n=r(87070),o=r(77999),i=r(84191);function a(e,t={}){return n.NextResponse.json({success:!0,data:e,...t})}function s(e,t=400){return n.NextResponse.json({success:!1,error:e},{status:t})}function p(e="Record"){return s(`${e} not found`,404)}async function l(e,t){if(!(0,o.RA)(e))return s("Unauthorized",401);try{return await (0,i.connectDB)(),await t()}catch{return s("An internal server error occurred",500)}}async function c(e){try{return await (0,i.connectDB)(),await e()}catch{return a([],{pagination:{total:0,page:1,limit:20,pages:0}})}}function u(e={}){let t=Math.max(1,parseInt(e.page)||1),r=Math.min(100,Math.max(1,parseInt(e.limit)||20));return{page:t,limit:r,skip:(t-1)*r}}function d(e,t,r){return{pagination:{total:e,page:t,limit:r,pages:Math.ceil(e/r)}}}},77999:(e,t,r)=>{r.d(t,{Gc:()=>s,Gv:()=>l,RA:()=>p});var n=r(84770),o=r.n(n);let i=process.env.ADMIN_SECRET||"",a=process.env.ADMIN_PASSWORD||"";function s(){return o().createHmac("sha256",i).update("admin:authenticated").digest("hex")}function p(e){if(!i)return!1;let t=e.cookies.get("admin_token")?.value;return!!t&&t===s()}function l(e){if(!a||!e)return!1;try{let t=Buffer.from(a,"utf8"),r=Buffer.from(e,"utf8");if(t.length!==r.length)return!1;return o().timingSafeEqual(t,r)}catch{return!1}}},84191:(e,t,r)=>{r.d(t,{connectDB:()=>a});var n=r(11185),o=r.n(n);let i=global.mongoose;async function a(){let e=process.env.MONGODB_URI;if(!e)throw Error("Please define MONGODB_URI in .env.local");return i.conn||(i.promise||(i.promise=o().connect(e,{bufferCommands:!1})),i.conn=await i.promise),i.conn}i||(i=global.mongoose={conn:null,promise:null})},65537:(e,t,r)=>{r.d(t,{HV:()=>v,Lf:()=>y,jJ:()=>k,wg:()=>b});var n=r(55245),o=r(92048),i=r.n(o),a=r(55315),s=r.n(a);let p=process.env.HOTEL_NAME||"The ParkQueen Hotel",l=process.env.HOTEL_EMAIL||"fom@parkqueenhotels.com",c=process.env.HOTEL_PHONE||"+91 9088809991",u=process.env.HOTEL_ADDRESS||"Opposite Devi Lal Park, Rohtak, Haryana 124001",d=!1,g=null;async function m(){if(!process.env.SMTP_HOST)return null;if(!g||!d){g=function(){let e=process.env.SMTP_HOST;if(!e)return null;let t=parseInt(process.env.SMTP_PORT||"587"),r="true"===process.env.SMTP_SECURE,o=process.env.SMTP_USER,a=function(){let e=[];process.env.NODE_EXTRA_CA_CERTS&&e.push(process.env.NODE_EXTRA_CA_CERTS);let t=s().join(process.cwd(),"avast-ca.pem");return(i().existsSync(t)&&e.push(t),0===e.length)?[]:e.flatMap(e=>{try{return[i().readFileSync(e,"utf8")]}catch{return[]}})}(),p=a.length>0?{ca:a}:void 0;return n.createTransport({host:e,port:t,secure:r,auth:{user:o,pass:process.env.SMTP_PASS},...p?{tls:p}:{}})}();try{await g.verify(),d=!0}catch{return d=!1,g=null,null}}return g}async function f(e){let t=await m();if(!t)return{skipped:!0};try{let r=await t.sendMail({from:`"${p}" <${process.env.SMTP_FROM||l}>`,...e});return{success:!0,messageId:r.messageId}}catch{return g=null,d=!1,{success:!1,error:err.message}}}function x(e,t){return`
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
              <h1 style="margin:0;color:#cda434;font-size:22px;letter-spacing:1px;">${p}</h1>
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
                📍 ${u}<br/>
                📞 ${c} &nbsp;|&nbsp; ✉️ ${l}
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
  </tr>`}async function y({name:e,email:t,message:r,createdAt:n}){return f({to:l,subject:`📩 New Contact Message from ${e}`,html:x("New Contact Message",`<h2 style="margin:0 0 20px;color:#111827;font-size:18px;">New Contact Form Submission</h2>
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
       </p>`),replyTo:t})}async function b({name:e,email:t,message:r}){return f({to:t,subject:`Thank you for contacting ${p}`,html:x("Message Received",`<h2 style="margin:0 0 8px;color:#111827;font-size:18px;">Dear ${e},</h2>
       <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
         Thank you for reaching out to <strong>${p}</strong>. We have received your message and our team will get back to you within <strong>24 hours</strong>.
       </p>
       <div style="background:#f9fafb;border-left:4px solid #cda434;padding:16px;border-radius:4px;margin-bottom:20px;">
         <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#374151;">Your message:</p>
         <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">${r.replace(/\n/g,"<br/>")}</p>
       </div>
       <p style="margin:0;color:#374151;font-size:14px;">
         For urgent enquiries, please call us at <strong>${c}</strong>.
       </p>
       <p style="margin:20px 0 0;color:#374151;font-size:14px;">
         Warm regards,<br/>
         <strong>The ParkQueen Hotel Team</strong>
       </p>`)})}async function v(e){let{bookingRef:t,name:r,email:n,phone:o,roomType:i,guests:a,checkIn:s,checkOut:p,message:c,createdAt:u}=e;return f({to:l,subject:`🏨 New Booking Request [${t}] — ${r}`,html:x("New Booking Request",`<h2 style="margin:0 0 6px;color:#111827;font-size:18px;">New Booking Request</h2>
       <p style="margin:0 0 20px;color:#9ca3af;font-size:13px;">Ref: <strong style="color:#cda434;">${t}</strong></p>
       <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
         ${h("Booking Ref",`<strong style="color:#cda434;">${t}</strong>`)}
         ${h("Guest Name",r)}
         ${h("Email",`<a href="mailto:${n}" style="color:#cda434;">${n}</a>`)}
         ${h("Phone",o)}
         ${h("Room Type",i)}
         ${h("Guests",a)}
         ${h("Check In",s)}
         ${h("Check Out",p)}
         ${h("Submitted",new Date(u).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}))}
       </table>
       ${c?`<div style="background:#f9fafb;border-left:4px solid #cda434;padding:16px;border-radius:4px;">
         <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#374151;">Special Requests:</p>
         <p style="margin:0;color:#111827;font-size:13px;">${c.replace(/\n/g,"<br/>")}</p>
       </div>`:""}`),replyTo:n})}async function k(e){let{bookingRef:t,name:r,email:n,roomType:o,guests:i,checkIn:a,checkOut:s}=e;return f({to:n,subject:`Booking Request Received — ${p} [${t}]`,html:x("Booking Received",`<h2 style="margin:0 0 8px;color:#111827;font-size:18px;">Dear ${r},</h2>
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
         ${h("Guests",i)}
         ${h("Check In",a)}
         ${h("Check Out",s)}
       </table>
       <p style="margin:0;color:#374151;font-size:14px;">
         📞 <strong>${c}</strong><br/>
         ✉️ <a href="mailto:${l}" style="color:#cda434;">${l}</a>
       </p>
       <p style="margin:24px 0 0;color:#374151;font-size:14px;">
         Warm regards,<br/>
         <strong>The ParkQueen Hotel Reservations Team</strong>
       </p>`)})}},83690:(e,t,r)=>{r.d(t,{$:()=>a});var n=r(11185),o=r.n(n);let i=new(o()).Schema({bookingRef:{type:String,unique:!0,default:function(){return"PQ"+Date.now().toString(36).toUpperCase().slice(-6)}},name:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,lowercase:!0},phone:{type:String,trim:!0},roomType:{type:String,default:"Not specified"},guests:{type:Number,default:1},checkIn:{type:String,required:!0},checkOut:{type:String,required:!0},message:{type:String},status:{type:String,enum:["pending","confirmed","cancelled","completed"],default:"pending"},adminNote:{type:String},emailSent:{type:Boolean,default:!1},source:{type:String,default:"website"}},{timestamps:!0});i.index({status:1,createdAt:-1}),i.index({bookingRef:1}),i.index({email:1});let a=o().models.Booking||o().model("Booking",i)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,5972,5245],()=>r(39462));module.exports=n})();