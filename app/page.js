'use client'
import { useState, useEffect } from 'react'
import { imgUrl } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'
import Footer from '@/app/_components/Footer'


const HERO_SLIDES = [
  { title: 'Luxury Rooms',   img: '/assets/images/rooms/NDS_5403.jpg'   },
  { title: 'Fine Dining',    img: '/assets/images/dining/NDS_5117.jpg'  },
  { title: 'Bar & Lounge',  img: '/assets/images/home/NDS_5001.jpg'    },
]

const STATIC_OFFERS = [
  { _id: 's1', title: 'Rohtak Heritage Tour', image: { url: '/assets/img/home-1/offer/radius-1.jpg' }, cardImage: { url: '/assets/img/home-1/offer/radius-5.jpg' }, cardTitle: 'ParkQueen Special' },
  { _id: 's2', title: 'Special Dining Experience', image: { url: '/assets/img/home-1/offer/radius-2.jpg' }, cardImage: { url: '/assets/img/home-1/offer/radius-6.jpg' }, cardTitle: 'Celebrating Freedom' },
  { _id: 's3', title: 'Extend Your Stay', image: { url: '/assets/img/home-1/offer/radius-9.jpg' }, cardImage: { url: '/assets/img/home-1/offer/01.jpg' }, cardTitle: 'Celebrating Freedom', active: true },
  { _id: 's4', title: 'Stay a Bit Longer', image: { url: '/assets/img/home-1/offer/radius-3.jpg' }, cardImage: { url: '/assets/img/home-1/offer/radius-7.jpg' }, cardTitle: 'Celebrating Freedom' },
  { _id: 's5', title: 'Rohtak Festival Packages', image: { url: '/assets/img/home-1/offer/radius-4.jpg' }, cardImage: { url: '/assets/img/home-1/offer/radius-8.jpg' }, cardTitle: 'Celebrating Freedom' },
]

const STATIC_TESTIMONIALS = [
  { _id: 'r1', name: 'Kiranjit Kaur', role: 'Guest from Amritsar, India',  rating: 5, content: "Beds were really comfortable. Rooms were clean and a decent size. It is in a good area, central, with no noise outside. Excellent breakfast, friendly staff, clean rooms — close to the city centre.", image: { url: 'https://ui-avatars.com/api/?name=Kiranjit+Kaur&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true' } },
  { _id: 'r2', name: 'Vikram Sharma', role: 'Verified Traveller',          rating: 5, content: "The only hotel worth staying in Rohtak — I would not stay anywhere else. Rooms in front of the hotel offer a lovely view of the park, and the staff are welcoming, polite, courteous and helpful. Highly recommended!", image: { url: 'https://ui-avatars.com/api/?name=Vikram+Sharma&background=cda434&color=1a1c2e&size=128&rounded=true&bold=true' } },
  { _id: 'r3', name: 'Devendra Dutt', role: 'Returning Guest',             rating: 5, content: "I have always preferred this place to be at. Amazing food, amazing staff — they make us feel at home and gave the best experience of staying at the property. I'd recommend this hotel as the number 1 place to stay in Rohtak.", image: { url: 'https://ui-avatars.com/api/?name=Devendra+Dutt&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true' } },
  { _id: 'r4', name: 'Anand Mehta',   role: 'Hotel Stay, Rohtak',          rating: 5, content: "It was a great experience staying at The ParkQueen Hotel. The ambience, services and security were great. Staff was so supportive — specially Miss Anju, she made my stay so much more comfortable.", image: { url: 'https://ui-avatars.com/api/?name=Anand+Mehta&background=cda434&color=1a1c2e&size=128&rounded=true&bold=true' } },
  { _id: 'r5', name: 'Anju Rawat',    role: 'Business Traveller, Rohtak',  rating: 5, content: "A wonderful stay at The ParkQueen — check-in was seamless and the reception staff were incredibly polite and helpful from start to finish. The room was spotlessly clean, spacious, and well-maintained.", image: { url: 'https://ui-avatars.com/api/?name=Anju+Rawat&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true' } },
]

const DEFAULT_SETTINGS = {
  phone: ['+91 9088809991'],
  email: ['info@parkqueenhotels.com'],
  address: 'The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India',
  mapEmbed: 'https://maps.google.com/maps?q=The+ParkQueen+Hotel+Rohtak+Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed',
}

export default function HomePage() {
  const [c, setC] = useState({})
  const [offers, setOffers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.json())
      .then(data => setC(data))
      .catch(() => {})

    fetch('/api/offers?status=active&limit=10')
      .then(r => r.json())
      .then(d => { if (d.data?.length) setOffers(d.data) })
      .catch(() => {})

    fetch('/api/testimonials?status=active&limit=10')
      .then(r => r.json())
      .then(d => { if (d.data?.length) setTestimonials(d.data) })
      .catch(() => {})

    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.data) setSettings({ ...DEFAULT_SETTINGS, ...d.data }) })
      .catch(() => {})
  }, [])

  // Priority: admin home content → DB offers → static fallback
  const activeOffers = (c.offerItems?.length ? c.offerItems : null) || (offers.length ? offers : STATIC_OFFERS)
  const activeTestimonials = testimonials.length ? testimonials : STATIC_TESTIMONIALS

  // Reinitialize dining + hotel Swiper after dynamic images load into DOM
  useEffect(() => {
    const diningImgs = c.diningImages
    const hotelImgs = c.hotelImages
    if (!diningImgs?.length && !hotelImgs?.length) return

    const timer = setTimeout(() => {
      if (typeof window === 'undefined' || !window.Swiper) return
      const diningEl = document.querySelector('.dining-slider')
      const hotelEl = document.querySelector('.hotel-slider')
      if (!diningEl || !hotelEl) return

      if (diningEl.swiper) diningEl.swiper.destroy(true, true)
      if (hotelEl.swiper) hotelEl.swiper.destroy(true, true)

      const DiningSlider = new window.Swiper('.dining-slider', {
        spaceBetween: 20,
        speed: 1000,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: { nextEl: '.array-next', prevEl: '.array-prev' },
        breakpoints: {
          1199: { slidesPerView: 4 },
          991:  { slidesPerView: 3 },
          767:  { slidesPerView: 3 },
          575:  { slidesPerView: 3 },
          0:    { slidesPerView: 2 },
        },
      })

      const HotelSlider = new window.Swiper('.hotel-slider', {
        spaceBetween: 20,
        speed: 800,
        loop: true,
        slidesPerView: 1,
        effect: 'slide',
      })

      // Click a dining thumbnail → jump hotel slider to matching slide
      if (window.$) {
        window.$('.dining-slider .swiper-slide').off('click').on('click', function () {
          const realIndex = Number(this.getAttribute('data-swiper-slide-index'))
          HotelSlider.slideToLoop(realIndex, 800)
        })
        // Keep hotel in sync with dining autoplay
        DiningSlider.on('slideChange', function () {
          HotelSlider.slideToLoop(DiningSlider.realIndex, 800)
        })
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [c.diningImages, c.hotelImages])

  // Reinitialize Testimonial Swiper after testimonials load/replace the DOM —
  // without this, Swiper keeps stale references to slides React has already
  // swapped out, leaving the slider blank/empty.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === 'undefined' || !window.Swiper) return
      const el = document.querySelector('.testimonial-slider')
      if (!el) return

      if (el.swiper) el.swiper.destroy(true, true)

      new window.Swiper('.testimonial-slider', {
        spaceBetween: 20,
        speed: 1300,
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        breakpoints: {
          1199: { slidesPerView: 1 },
          991:  { slidesPerView: 1 },
          767:  { slidesPerView: 1 },
          575:  { slidesPerView: 1 },
          0:    { slidesPerView: 1 },
        },
      })
    }, 200)

    return () => clearTimeout(timer)
  }, [activeTestimonials])

  // Helper: prefer dynamic value, fall back to static default
  const dyn = (dynamic, fallback) => dynamic || fallback
  const phone = settings.phone?.[0] || DEFAULT_SETTINGS.phone[0]
  const email = settings.email?.[0] || DEFAULT_SETTINGS.email[0]
  const address = settings.address || DEFAULT_SETTINGS.address
  const mapSrc = settings.mapEmbed || DEFAULT_SETTINGS.mapEmbed

  return (
    <>
      <SharedHeader />

      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#0a0c1c',
      }}>
        {/* Hero background image — img element is more reliable than CSS background-image */}
        <img
          src="/assets/images/hero.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center right',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* Gradient overlay — dark on left, fades right so building shows */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,12,28,.92) 0%, rgba(10,12,28,.72) 45%, rgba(10,12,28,.2) 100%)',
          zIndex: 1,
        }}></div>

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '140px 6vw 100px',
        }}>
          <div className="wow fadeInLeft" data-wow-delay=".2s" style={{ maxWidth: 600 }}>

            {/* Pre-heading */}
            <p style={{ color: '#cda434', fontSize: 13, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 14, margin: '0 0 14px' }}>
              WELCOME TO
            </p>

            {/* Main title */}
            <h1 style={{ color: '#fff', fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 900, lineHeight: 1, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 2 }}>
              HOTEL
            </h1>
            <h1 style={{ color: '#cda434', fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 900, lineHeight: 1, margin: '0 0 28px', textTransform: 'uppercase', letterSpacing: 2 }}>
              PARK QUEEN
            </h1>

            {/* Gold ornament divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ flex: '0 0 80px', height: 1, background: 'linear-gradient(to right, transparent, #cda434)' }}></div>
              <span style={{ color: '#cda434', fontSize: 20, lineHeight: 1 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #cda434, transparent)' }}></div>
            </div>

            {/* Taglines */}
            <p style={{ color: 'rgba(255,255,255,.88)', fontSize: 18, margin: '0 0 10px', fontStyle: 'italic', fontWeight: 300, letterSpacing: '.5px' }}>
              Where Luxury Meets Comfort
            </p>
            <p style={{ color: '#cda434', fontSize: 13, margin: '0 0 44px', letterSpacing: 3, fontWeight: 600 }}>
              Stay &nbsp;•&nbsp; Dine &nbsp;•&nbsp; Celebrate
            </p>

            {/* CTA Button */}
            <a href="/booking" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 34px',
              border: '2px solid #cda434',
              color: '#cda434',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderRadius: 4,
              transition: 'all .3s',
              background: 'transparent',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#cda434'; e.currentTarget.style.color = '#0a0c1c' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cda434' }}
            >
              <i className="fa-regular fa-calendar-check"></i>
              BOOK YOUR STAY
            </a>
          </div>
        </div>

        {/* "HOTEL PARK QUEEN" watermark on the right (building area) */}
        <div className="d-none d-lg-block" style={{
          position: 'absolute', bottom: 90, right: '4vw', zIndex: 2,
          color: 'rgba(255,255,255,.15)', fontSize: 'clamp(14px, 1.8vw, 22px)',
          fontWeight: 800, letterSpacing: 6, textTransform: 'uppercase',
        }}>
          HOTEL PARK QUEEN
        </div>

        {/* Bottom info bar */}
        <div style={{
          position: 'relative', zIndex: 2,
          background: 'rgba(10,12,28,.45)',
          borderTop: '1px solid rgba(205,164,52,.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          <div style={{
            maxWidth: 1400, margin: '0 auto', padding: '0 6vw',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}>
            {[
              { icon: 'fa-location-dot', label: 'DELHI BYPASS, ROHTAK', sub: 'HARYANA – 124001' },
              { icon: 'fa-phone',        label: '+91 9088809991',       sub: 'CALL US ANYTIME' },
              { icon: 'fa-envelope',     label: 'INFO@PARKQUEENHOTELS.COM', sub: 'WE REPLY PROMPTLY' },
              { icon: 'fa-clock',        label: '24/7 FRONT DESK',     sub: "WE'RE HERE TO HELP" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '16px 24px',
                display: 'flex', alignItems: 'center', gap: 14,
                borderRight: i < 3 ? '1px solid rgba(205,164,52,.18)' : 'none',
              }}>
                <i className={`fa-solid ${item.icon}`} style={{ color: '#cda434', fontSize: 20, flexShrink: 0 }}></i>
                <div>
                  <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', fontFamily: 'Georgia, "Times New Roman", serif' }}>{item.label}</div>
                  <div style={{ color: 'rgba(205,164,52,.6)', fontSize: 9, letterSpacing: '2px', marginTop: 3, textTransform: 'uppercase', fontWeight: 500 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marque Section — decorative transition strip */}
      <div className="marque-section fix section-padding pt-0">
        <div className="scrolling-wrap">
          <div className="comm">
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/dining" style={{ color: 'inherit' }}>Bar &amp; Lounge</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/about" style={{ color: 'inherit' }}>Rohtak&apos;s Premier Hotel</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/about" style={{ color: 'inherit' }}>Best Luxury Resort in Rohtak</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/rooms" style={{ color: 'inherit' }}>Luxury Hotel in Rohtak</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/banquets" style={{ color: 'inherit' }}>Banquet Hall</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/banquets" style={{ color: 'inherit' }}>Conference Hall</a></div>
          </div>
          <div className="comm">
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/dining" style={{ color: 'inherit' }}>Bar &amp; Lounge</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/about" style={{ color: 'inherit' }}>Modern City Hotel</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/about" style={{ color: 'inherit' }}>Best Luxury Resort</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/rooms" style={{ color: 'inherit' }}>Luxury Hotel in Rohtak</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/banquets" style={{ color: 'inherit' }}>Banquet Hall</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/banquets" style={{ color: 'inherit' }}>Conference Hall</a></div>
          </div>
          <div className="comm">
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/dining" style={{ color: 'inherit' }}>Bar &amp; Lounge</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/about" style={{ color: 'inherit' }}>Modern City Hotel</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/about" style={{ color: 'inherit' }}>Best Luxury Resort</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/rooms" style={{ color: 'inherit' }}>Luxury Hotel in Rohtak</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/banquets" style={{ color: 'inherit' }}>Banquet Hall</a></div>
            <div className="cmn-textslide"><i className="fa-sharp fa-solid fa-star"></i> <a href="/banquets" style={{ color: 'inherit' }}>Conference Hall</a></div>
          </div>
        </div>
      </div>

      {/* ── 2. About Park Queen ──────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 wow fadeInLeft">
              <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.12)' }}>
                <img src="/assets/images/home/buildingimage.png" alt="The ParkQueen Hotel" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(26,28,46,.8))', padding: '24px 20px 16px' }}>
                  <p style={{ color: '#cda434', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', margin: 0 }}>Est. Rohtak, Haryana</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 wow fadeInRight">
              <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>About The Hotel</span>
              <h2 style={{ color: '#1a1c2e', fontSize: 30, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>Welcome to The ParkQueen Hotel &amp; Resort&apos;s Rohtak</h2>
              <div style={{ width: 56, height: 2, background: '#cda434', marginBottom: 20 }}></div>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: 14, marginBottom: 14 }}>
                When it comes to hotels in Rohtak, ParkQueen is the best of its kind. Being style-plus-home that offers stunning interiors by its designers, service that makes you feel at home. Everything about us is to complement our guests. Executive, Superior &amp; Queen Suite. The hotel is furnished with an enormous plethora luxurious designs that offer five-star luxury amenities. Banquets facilities are colour to your government strategy, city's new exciting restaurant &amp; bar.
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: 14, marginBottom: 24 }}>
                Synonymous with the words comfort, grandeur, and excellence, we at ParkQueen provide unmatched and heartfelt services round the clock to ensure that your needs are met at all timesrm personalized, professional guest services and genuine hospitality.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/about" className="theme-btn" style={{ padding: '11px 28px', fontSize: 13 }}>KNOW MORE</a>
                <a href="/contact" style={{ padding: '11px 28px', fontSize: 13, border: '2px solid #1a1c2e', borderRadius: 6, color: '#1a1c2e', textDecoration: 'none', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1c2e'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1c2e' }}>
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Why Choose Us ─────────────────────────────────────────── */}
      <section style={{ background: '#faf9f7', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Our Promise</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s" style={{ color: '#1a1c2e', fontSize: 36, fontWeight: 700, margin: 0 }}>WHY CHOOSE US?</h2>
            <div style={{ width: 64, height: 2, background: '#cda434', margin: '16px auto 0' }}></div>
          </div>
          <div className="row g-4">
            {[
              { icon: 'fa-utensils',     title: 'Fresh & Delectable Meals',  text: 'Our ParkQueen restaurant serves all three meals daily — a rich spread of North Indian delicacies, continental fare, and special seasonal menus crafted by our expert chefs.',           delay: '.2s', href: '/dining' },
              { icon: 'fa-wifi',         title: 'Stay Connected',             text: 'Stay updated with our premium high-speed Wi-Fi available throughout the hotel — in rooms, lobbies, dining areas, and banquet halls — keeping you connected at all times.',               delay: '.3s', href: '/facilities' },
              { icon: 'fa-martini-glass-citrus', title: 'Feel Your Best',    text: 'Unwind at our elegant Bar & Lounge or enjoy a refreshing drink from our in-room service available round the clock. Comfort and leisure are available 24 hours a day.',                 delay: '.4s', href: '/dining' },
              { icon: 'fa-bed',          title: 'Better Sleep Quality',       text: 'Our premium bedding, soundproofed rooms, and carefully curated room amenities ensure a tranquil, restful night — so you wake up refreshed and ready for the day ahead.',               delay: '.5s', href: '/rooms' },
            ].map((item, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <a href={item.href} className="wow fadeInUp" data-wow-delay={item.delay} style={{
                  display: 'block',
                  background: '#fff',
                  borderRadius: 12,
                  padding: '36px 28px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,.06)',
                  transition: 'transform .3s, box-shadow .3s',
                  borderBottom: '3px solid #cda434',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,.06)' }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#1a1c2e,#2d3056)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <i className={`fa-solid ${item.icon}`} style={{ color: '#cda434', fontSize: 26 }}></i>
                  </div>
                  <h4 style={{ color: '#1a1c2e', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{item.title}</h4>
                  <p style={{ color: '#6b7280', lineHeight: 1.8, fontSize: 14, margin: 0 }}>{item.text}</p>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, borderRadius: '80px 0 0 0', background: 'rgba(205,164,52,0.06)' }}></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Luxury Rooms ──────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Accommodation</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s" style={{ color: '#1a1c2e', fontSize: 36, fontWeight: 700, margin: 0 }}>EXPLORE OUR ROOMS</h2>
            <div style={{ width: 64, height: 2, background: '#cda434', margin: '16px auto 0' }}></div>
          </div>
          <div className="row g-4">
            {[
              { name: 'Executive Room',    count: 25, single: '₹5,000', double: '₹5,500', img: '/assets/images/rooms/ROOM2.jpg' },
              { name: 'Superior Room',     count: 6,  single: '₹5,000', double: '₹6,000', img: '/assets/images/rooms/newroom.jpeg' },
              { name: 'Queen Suite',       count: 6,  single: '₹5,500', double: '₹6,500', img: '/assets/images/rooms/ROOM3.jpg' },
              { name: 'Presidential Suite',count: 1,  single: '₹6,999', double: '₹7,499', img: '/assets/images/rooms/ROOM4.jpg' },
            ].map((room, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="wow fadeInUp" data-wow-delay={`.${i+2}s`} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.08)', height: '100%', background: '#fff' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                    <a href="/rooms" style={{ display: 'block', height: '100%' }}>
                      <img src={room.img} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </a>
                    <div style={{ position: 'absolute', top: 12, right: 12, background: '#cda434', color: '#1a1c2e', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, letterSpacing: 1 }}>
                      {room.count} ROOMS
                    </div>
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <h4 style={{ color: '#1a1c2e', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{room.name}</h4>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                      <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                        <div style={{ color: '#9ca3af', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>Single</div>
                        <div style={{ color: '#1a1c2e', fontSize: 14, fontWeight: 700 }}>{room.single}</div>
                      </div>
                      <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                        <div style={{ color: '#9ca3af', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>Double</div>
                        <div style={{ color: '#1a1c2e', fontSize: 14, fontWeight: 700 }}>{room.double}</div>
                      </div>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: 11, margin: '0 0 14px' }}>+ Taxes applicable &nbsp;|&nbsp; Includes breakfast</p>
                    <a href="/rooms" className="theme-btn" style={{ display: 'block', textAlign: 'center', padding: '10px', fontSize: 13 }}>VIEW DETAILS</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 8px' }}>* Additional GST applicable as per Government norms. Extra bed charges apply for additional guests.</p>
            <p style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>Children below 5 years: Free &nbsp;|&nbsp; 5-14 years: ₹1,500 + Taxes &nbsp;|&nbsp; Above 14 years: ₹1,800 + Taxes</p>
          </div>
        </div>
      </section>

      {/* ── 5. Restaurant ────────────────────────────────────────────── */}
      <section className="hotel-dining-section fix">
        <div className="container">
          <div className="hotel-dining-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="hotel-dining-content">
                  <div className="section-title mb-0">
                    <span className="sub-title text-white wow fadeInUp">
                      best foods in hotel
                    </span>
                    <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                      {dyn(c.diningHeading, 'Our Signature Dining')}
                    </h2>
                  </div>
                  <p className="text text-white wow fadeInUp" data-wow-delay=".5s">
                    {dyn(c.diningSubtext, 'Embark on a journey of exquisite experiences, encompassing impeccable service, sophisticated ambience and masterful culinary artistry.')}
                  </p>
                  <div className="dining-item">
                    <div className="swiper dining-slider">
                      <div className="swiper-wrapper">
                        {(c.diningImages || []).map((img, i) => (
                          <div key={i} className="swiper-slide">
                            <div className="dining-image">
                              <a href="/dining"><img src={imgUrl(img, '')} alt="Hotel Dining" /></a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="array-buttons wow fadeInUp"
                      data-wow-delay=".5s"
                    >
                      <button className="array-prev">
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <button className="array-next">
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="swiper hotel-slider">
                  <div className="swiper-wrapper">
                    {(c.hotelImages || []).map((img, i) => (
                      <div key={i} className="swiper-slide">
                        <div className="hotel-image">
                          <a href="/about"><img src={imgUrl(img, '')} alt="The ParkQueen Hotel" /></a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Banquet & Events ──────────────────────────────────────── */}
      <section style={{ background: '#f4f6f9', padding: '88px 0' }}>
        <div className="container">
          <div className="row g-4">
            {[
              {
                label: 'The Best',
                title: 'Destination Wedding Venue in Rohtak',
                text: "Exquisite surroundings, warm smiling faces, and the moment you say 'I do' — a day you'll treasure forever. Whatever your vision, our team brings your dream wedding to life with a luxurious setting, meticulous attention to detail, and impeccable service.",
                img: '/assets/images/events/wedding.webp',
              },
              {
                label: 'Spectacular',
                title: 'Banquet Halls',
                text: 'Great celebrations need great spaces. Our hotel features a beautifully equipped banquet hall with outstanding service and a design that stands apart — the perfect choice for private parties, weddings, meetings, conferences & other special occasions.',
                img: '/assets/images/events/banquet.webp',
              },
            ].map((card, i) => (
              <div key={i} className={`col-lg-6 wow ${i === 0 ? 'fadeInLeft' : 'fadeInRight'}`}>
                <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,.08)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <a href="/banquets" style={{ position: 'relative', height: 320, overflow: 'hidden', display: 'block' }}>
                    <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </a>
                  <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>{card.label}</span>
                    <h3 style={{ margin: '0 0 16px' }}>
                      <a href="/banquets" style={{ color: '#1a1c2e', fontSize: 22, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, textDecoration: 'none' }}>{card.title}</a>
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.85, marginBottom: 24, flex: 1 }}>{card.text}</p>
                    <a href="/booking" className="theme-btn" style={{ alignSelf: 'flex-start' }}>Book Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Amenities ─────────────────────────────────────────────── */}
      <section style={{ background: '#f4f6f9', padding: '0 0 72px' }}>
        <div style={{ background: '#cda434', padding: '18px 0', marginBottom: 48, textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#1a1c2e', fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase' }}>ROOM AMENITIES</h2>
        </div>
        <div className="container">
          <div className="row g-3">
            {[
              ['fa-wifi','Enjoy Free Wi-Fi'],['fa-wind','Air Condition'],['fa-tv','LCD In All Rooms'],['fa-snowflake','Mini Refrigerator'],
              ['fa-shower','Running Hot & Cold Water'],['fa-phone-volume','Intercom'],['fa-mug-hot','Tea / Coffee Maker'],['fa-map-location-dot','Travel Desk'],
              ['fa-square-parking','Vallet Parking'],['fa-credit-card','All Major Cards Accepted'],['fa-shirt','Laundry & Dry Cleaning'],['fa-bolt','24 Hours Power Back Up'],
              ['fa-headphones','Sound Proofing & Acoustics'],['fa-elevator','Lift'],['fa-taxi','Taxi On Call'],['fa-user-doctor','Doctor On Call'],
            ].map(([icon, label], i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <a href="/rooms" className="wow fadeInUp" data-wow-delay={`.${(i%4)+1}s`} style={{
                  display: 'block', background: '#fff', borderRadius: 8, padding: '20px 14px', textAlign: 'center',
                  boxShadow: '0 1px 6px rgba(0,0,0,.06)', borderBottom: '2px solid transparent',
                  transition: 'border-color .2s, transform .2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#cda434'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'none' }}>
                  <i className={`fa-solid ${icon}`} style={{ fontSize: 30, color: '#1a1c2e', marginBottom: 10, display: 'block' }}></i>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.5px', lineHeight: 1.4 }}>{label}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Gallery ───────────────────────────────────────────────── */}
      <InstagramSlider wrapperClass="instagram-section-2 fix" />
      <div style={{ textAlign: 'center', padding: '0 0 60px' }}>
        <a href="/gallery" className="theme-btn" style={{ padding: '14px 36px', fontSize: 13 }}>View Full Gallery</a>
      </div>

      {/* ── 9. Testimonials ──────────────────────────────────────────── */}
      <section
        className="testimonial-section section-padding fix bg-cover"
        style={{
          backgroundImage: `url('${imgUrl(c.testimonialBg, '/assets/img/home-1/testimonial/bg.jpg')}')`,
          marginTop: 0,
        }}
      >
        <div className="container">
          <div className="testimonial-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="testimonial-card-item scale-animation">
                  <div className="swiper testimonial-slider">
                    <div className="swiper-wrapper">
                      {activeTestimonials.map(t => (
                        <div key={t._id} className="swiper-slide">
                          <div className="content">
                            <div className="star">
                              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                              ))}
                            </div>
                            <p>{t.content}</p>
                            <div className="client-info-item">
                              <div className="info-item">
                                <div className="content">
                                  <h5>{t.name}</h5>
                                  <span>{t.role}</span>
                                </div>
                              </div>
                              <div className="quate-image">
                                <img src="/assets/img/home-1/icon/07.svg" alt="img" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="testimonial-content">
                  <div className="section-title mb-0">
                    <span className="sub-title wow fadeInUp">
                      our hotel testimonials
                    </span>
                    <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                      What Our Guest&apos;s Say
                    </h2>
                  </div>
                  <div className="client-item">
                    <div className="group-image">
                      <img
                        src="/assets/img/home-1/testimonial/group.png"
                        alt="img"
                      />
                    </div>
                    <h6>
                      More than{' '}
                      <span className="odometer" data-count="25">
                        00
                      </span>
                      <b>k</b> <br />
                      Client Reviews
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Booking CTA ──────────────────────────────────────────── */}
      <section style={{ position: 'relative', background: '#1a1c2e', padding: '80px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: -100, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(205,164,52,.12)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: -120, right: -80, width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(205,164,52,.1)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Reserve Your Stay</span>
            <h2 className="wow fadeInUp" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, marginBottom: 18, lineHeight: 1.3 }}>Ready for an Unforgettable Stay at The ParkQueen?</h2>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 15, lineHeight: 1.9, marginBottom: 36 }}>
              From elegant rooms to grand celebrations, our team is ready to make your visit to Rohtak truly memorable. Book directly with us for the best rates and a seamless experience.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/booking" className="theme-btn" style={{ padding: '15px 36px', fontSize: 13 }}>
                <i className="fa-regular fa-calendar-check" style={{ marginRight: 8 }}></i>BOOK NOW
              </a>
              <a href={`tel:${phone.replace(/\s/g,'')}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 36px', border: '2px solid rgba(255,255,255,.25)', borderRadius: 4,
                color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'border-color .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#cda434'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)'}
              >
                <i className="fa-solid fa-phone"></i> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Map & Contact ────────────────────────────────────────── */}
      <section style={{ background: '#faf9f7', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Find Us</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s" style={{ color: '#1a1c2e', fontSize: 36, fontWeight: 700, margin: 0 }}>MAP &amp; CONTACT</h2>
            <div style={{ width: 64, height: 2, background: '#cda434', margin: '16px auto 0' }}></div>
          </div>
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7 wow fadeInLeft">
              <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,.1)', height: '100%', minHeight: 360 }}>
                <iframe
                  src={mapSrc}
                  style={{ border: 0, width: '100%', height: '100%', minHeight: 360, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="The ParkQueen Hotel Location"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-5 wow fadeInRight">
              <div style={{ background: '#1a1c2e', borderRadius: 14, padding: '36px', height: '100%' }}>
                <h4 style={{ color: '#cda434', fontSize: 16, fontWeight: 700, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 }}>Get In Touch</h4>
                {[
                  { icon: 'fa-location-dot', label: 'Address', value: address },
                  { icon: 'fa-phone', label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g,'')}` },
                  { icon: 'fa-envelope', label: 'Email', value: email, href: `mailto:${email}` },
                  { icon: 'fa-clock', label: 'Front Desk', value: 'Open 24 Hours / 7 Days' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 22, alignItems: 'flex-start' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(205,164,52,.12)', border: '1px solid rgba(205,164,52,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: '#cda434', fontSize: 14 }}></i>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ color: '#fff', fontSize: 14, textDecoration: 'none' }}>{item.value}</a>
                      ) : (
                        <div style={{ color: '#fff', fontSize: 14 }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
                <a href="/contact" className="theme-btn" style={{ marginTop: 8, display: 'inline-block' }}>SEND US A MESSAGE</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Footer ───────────────────────────────────────────────── */}
      <Footer />
    </>
  )
}
