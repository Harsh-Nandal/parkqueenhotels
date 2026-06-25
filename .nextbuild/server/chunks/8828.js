exports.id=8828,exports.ids=[8828],exports.modules={49039:(e,a,t)=>{Promise.resolve().then(t.bind(t,69339))},78341:(e,a,t)=>{Promise.resolve().then(t.t.bind(t,12994,23)),Promise.resolve().then(t.t.bind(t,96114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,79671,23)),Promise.resolve().then(t.t.bind(t,41868,23)),Promise.resolve().then(t.t.bind(t,84759,23))},58460:(e,a,t)=>{Promise.resolve().then(t.t.bind(t,44064,23))},69339:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>d});var r=t(10326),s=t(90434),o=t(35047);let i=[{label:"Overview",items:[{href:"/admin",label:"Dashboard",icon:"fa-gauge-high",exact:!0}]},{label:"Enquiries",items:[{href:"/admin/bookings",label:"Booking Requests",icon:"fa-calendar-check"},{href:"/admin/contacts",label:"Contact Messages",icon:"fa-envelope-open-text"}]},{label:"Site Config",items:[{href:"/admin/site-settings",label:"Site Settings",icon:"fa-gear"},{href:"/admin/hero",label:"Hero Sections",icon:"fa-image"},{href:"/admin/home",label:"Home Content",icon:"fa-house"}]},{label:"Content",items:[{href:"/admin/about",label:"About Page",icon:"fa-circle-info"},{href:"/admin/service",label:"Service Page",icon:"fa-screwdriver-wrench"},{href:"/admin/rooms",label:"Rooms",icon:"fa-bed"},{href:"/admin/services",label:"Service Items",icon:"fa-star"},{href:"/admin/facilities",label:"Facilities",icon:"fa-building"},{href:"/admin/offers",label:"Special Offers",icon:"fa-tag"},{href:"/admin/gallery",label:"Gallery",icon:"fa-images"}]},{label:"Engagement",items:[{href:"/admin/testimonials",label:"Testimonials",icon:"fa-quote-left"},{href:"/admin/news",label:"News Page Settings",icon:"fa-newspaper"},{href:"/admin/blog",label:"Blog Posts",icon:"fa-pen-to-square"},{href:"/admin/faqs",label:"FAQs",icon:"fa-circle-question"}]},{label:"Contact",items:[{href:"/admin/contact",label:"Contact Page",icon:"fa-envelope"}]}],n=`
  *{box-sizing:border-box}
  .adm-wrap{display:flex;min-height:100vh;font-family:'Segoe UI',sans-serif}
  .adm-sidebar{width:240px;min-height:100vh;background:#111827;display:flex;flex-direction:column;flex-shrink:0;position:sticky;top:0;height:100vh;overflow-y:auto}
  .adm-brand{padding:20px 16px;border-bottom:1px solid rgba(255,255,255,.07)}
  .adm-brand h5{color:#fff;margin:0;font-size:13px;font-weight:700;letter-spacing:.4px}
  .adm-brand p{color:rgba(255,255,255,.35);margin:3px 0 0;font-size:10px}
  .adm-nav{flex:1;padding:8px 0}
  .adm-section-label{padding:12px 16px 4px;font-size:10px;font-weight:700;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.8px}
  .adm-link{display:flex;align-items:center;gap:9px;padding:9px 16px;color:rgba(255,255,255,.55);text-decoration:none;font-size:13px;border-left:3px solid transparent;transition:all .15s}
  .adm-link:hover{color:#fff;background:rgba(255,255,255,.05)}
  .adm-link.active{color:#fff;background:rgba(205,164,52,.12);border-left-color:#cda434}
  .adm-link i{width:16px;text-align:center;font-size:12px}
  .adm-footer{padding:14px 16px;border-top:1px solid rgba(255,255,255,.07)}
  .adm-logout{width:100%;background:rgba(220,53,69,.15);border:1px solid rgba(220,53,69,.3);color:#ff6b6b;padding:8px;border-radius:6px;font-size:12px;cursor:pointer;transition:all .2s}
  .adm-logout:hover{background:rgba(220,53,69,.3)}
  .adm-main{flex:1;padding:28px;overflow-x:hidden;background:#f0f2f5;min-height:100vh}
  .pg-header{margin-bottom:24px}
  .pg-header h1{font-size:20px;font-weight:700;color:#111827;margin:0}
  .pg-header p{color:#6b7280;margin:3px 0 0;font-size:13px}
  .card{background:#fff;border:none;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
  .card-hd{padding:14px 18px;border-bottom:1px solid #f0f2f5;font-weight:600;font-size:13px;color:#111827;border-radius:12px 12px 0 0;display:flex;align-items:center;gap:8px}
  .card-bd{padding:18px}
  .flabel{display:block;font-weight:600;font-size:12px;color:#374151;margin-bottom:5px}
  .finput{display:block;width:100%;padding:9px 12px;font-size:13px;border:1px solid #e5e7eb;border-radius:7px;outline:none;box-sizing:border-box;font-family:inherit}
  .finput:focus{border-color:#cda434;box-shadow:0 0 0 3px rgba(205,164,52,.12)}
  textarea.finput{resize:vertical}
  .btn-gold{background:#cda434;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s}
  .btn-gold:hover{background:#b8912a}
  .btn-gold:disabled{opacity:.7;cursor:not-allowed}
  .btn-outline{background:#fff;color:#374151;border:1px solid #e5e7eb;border-radius:8px;padding:8px 16px;font-size:12px;cursor:pointer;transition:all .2s}
  .btn-outline:hover{background:#f9fafb}
  .btn-danger{background:#dc2626;color:#fff;border:none;border-radius:7px;padding:7px 14px;font-size:12px;cursor:pointer}
  .btn-danger:hover{background:#b91c1c}
  .btn-sm{padding:5px 12px;font-size:11px}
  .save-bar{padding:14px 18px;border-top:1px solid #f0f2f5;display:flex;align-items:center;gap:10px}
  .alert-ok{background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;border-radius:7px;padding:9px 14px;font-size:12px;font-weight:500}
  .alert-err{background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:7px;padding:9px 14px;font-size:12px}
  .badge-active{background:#d1fae5;color:#065f46;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:600}
  .badge-inactive{background:#f3f4f6;color:#6b7280;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:600}
  .badge-published{background:#dbeafe;color:#1d4ed8;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:600}
  .badge-draft{background:#fef3c7;color:#92400e;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:600}
  .tbl{width:100%;border-collapse:collapse;font-size:13px}
  .tbl th{background:#f9fafb;padding:10px 12px;text-align:left;font-weight:600;font-size:11px;text-transform:uppercase;color:#6b7280;border-bottom:1px solid #f0f2f5}
  .tbl td{padding:10px 12px;border-bottom:1px solid #f9fafb;color:#374151;vertical-align:middle}
  .tbl tr:last-child td{border-bottom:none}
  .tbl tr:hover td{background:#fafafa}
  .tbl-img{width:48px;height:36px;object-fit:cover;border-radius:5px;border:1px solid #e5e7eb}
  .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px}
  .modal-box{background:#fff;border-radius:12px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto}
  .modal-hd{padding:16px 20px;border-bottom:1px solid #f0f2f5;display:flex;align-items:center;justify-content:space-between}
  .modal-hd h3{margin:0;font-size:15px;font-weight:700;color:#111827}
  .modal-close{background:none;border:none;font-size:20px;cursor:pointer;color:#6b7280;line-height:1}
  .modal-bd{padding:20px}
  .modal-ft{padding:14px 20px;border-top:1px solid #f0f2f5;display:flex;gap:8px;justify-content:flex-end}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .mb-3{margin-bottom:14px}
  .mb-0{margin-bottom:0}
  .ms-auto{margin-left:auto}
  .me-2{margin-right:8px}
  .d-flex{display:flex}
  .align-center{align-items:center}
  .gap-2{gap:8px}
  .gap-3{gap:12px}
  .text-muted{color:#6b7280;font-size:12px}
  .pagination{display:flex;gap:6px;align-items:center;margin-top:16px}
  .pg-btn{background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:6px 12px;font-size:12px;cursor:pointer}
  .pg-btn:hover{background:#f9fafb}
  .pg-btn.active{background:#cda434;color:#fff;border-color:#cda434}
  .search-bar{display:flex;gap:8px;margin-bottom:16px}
  .search-input{flex:1;padding:8px 12px;border:1px solid #e5e7eb;border-radius:7px;font-size:13px;outline:none}
  .search-input:focus{border-color:#cda434}
  .stat-card{background:#fff;border-radius:10px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.08);text-align:center}
  .stat-num{font-size:24px;font-weight:700;color:#111827}
  .stat-label{font-size:12px;color:#6b7280;margin-top:2px}
  .section-tag{background:#eff6ff;color:#1d4ed8;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}
`;function d({children:e}){let a=(0,o.usePathname)(),t=(0,o.useRouter)();async function d(){await fetch("/api/admin/logout",{method:"POST"}),t.push("/admin/login")}let l=(e,t)=>t?a===e:a===e||a.startsWith(e+"/");return"/admin/login"===a?(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:n}}),e]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:n}}),(0,r.jsxs)("div",{className:"adm-wrap",children:[(0,r.jsxs)("aside",{className:"adm-sidebar",children:[(0,r.jsxs)("div",{className:"adm-brand",children:[r.jsx("h5",{children:"\uD83C\uDFE8 ParkQueen Admin"}),r.jsx("p",{children:"Content Management System"})]}),r.jsx("nav",{className:"adm-nav",children:i.map(e=>(0,r.jsxs)("div",{children:[r.jsx("div",{className:"adm-section-label",children:e.label}),e.items.map(e=>(0,r.jsxs)(s.default,{href:e.href,className:`adm-link ${l(e.href,e.exact)?"active":""}`,children:[r.jsx("i",{className:`fa-solid ${e.icon}`}),e.label]},e.href))]},e.label))}),r.jsx("div",{className:"adm-footer",children:(0,r.jsxs)("button",{className:"adm-logout",onClick:d,children:[r.jsx("i",{className:"fa-solid fa-right-from-bracket me-2"}),"Logout"]})})]}),r.jsx("main",{className:"adm-main",children:e})]})]})}},5986:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>r});let r=(0,t(68570).createProxy)(String.raw`D:\Freelancing\park queen live\app\admin\layout.js#default`)},37764:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>l,metadata:()=>d,viewport:()=>n});var r=t(19510),s=t(9720);let o="https://parkqueenhotels.com",i=`${o}/assets/images/og-image.jpg`,n={width:"device-width",initialScale:1,themeColor:"#1a1c2e"},d={metadataBase:new URL(o),title:{default:"The ParkQueen Hotel — Rohtak, Haryana",template:"%s | The ParkQueen Hotel"},description:"The ParkQueen Hotel in Rohtak, Haryana — Luxury stays, fine dining, banquets and events. Book your stay at the premier hotel in Rohtak.",keywords:["ParkQueen Hotel","hotel Rohtak","luxury hotel Rohtak","hotel Haryana","hotel near Delhi NCR","banquet hall Rohtak","rooms Rohtak","dining Rohtak"],authors:[{name:"The ParkQueen Hotel"}],creator:"The ParkQueen Hotel",publisher:"The ParkQueen Hotel",robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-image-preview":"large"}},openGraph:{type:"website",locale:"en_IN",siteName:"The ParkQueen Hotel",title:"The ParkQueen Hotel — Rohtak, Haryana",description:"Luxury stays, fine dining, banquets and events in Rohtak, Haryana. Experience refined hospitality at The ParkQueen Hotel.",images:[{url:i,width:1200,height:630,alt:"The ParkQueen Hotel — Rohtak"}]},twitter:{card:"summary_large_image",title:"The ParkQueen Hotel — Rohtak, Haryana",description:"Luxury stays, fine dining and events at The ParkQueen Hotel, Rohtak.",images:[i]},alternates:{canonical:o}};function l({children:e}){return(0,r.jsxs)("html",{lang:"en",children:[(0,r.jsxs)("head",{children:[r.jsx("link",{rel:"shortcut icon",href:"/assets/img/favicon.svg"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/bootstrap.min.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/all.min.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/animate.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/magnific-popup.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/mousecursor.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/meanmenu.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/odometer.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/swiper-bundle.min.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/nice-select.css"}),r.jsx("link",{rel:"stylesheet",href:"/assets/css/main.css"})]}),(0,r.jsxs)("body",{children:[e,r.jsx(s.default,{src:"/assets/js/jquery-3.7.1.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/jquery.ripples-min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/viewport.jquery.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/bootstrap.bundle.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/jquery.nice-select.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/jquery.waypoints.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/odometer.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/swiper-bundle.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/jquery.meanmenu.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/jquery.magnific-popup.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/wow.min.js",strategy:"beforeInteractive"}),r.jsx(s.default,{src:"/assets/js/main.js",strategy:"afterInteractive"})]})]})}}};