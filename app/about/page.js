'use client'
import { useState, useEffect } from 'react'
import { bannerBg } from '@/lib/imgUrl'
import SharedHeader from '@/app/_components/SharedHeader'

// ── Palette ──────────────────────────────────────────────────────────
const NAVY = '#0B132B'
const GOLD = '#D4AF37'

// ── Static content / fallbacks ──────────────────────────────────────
const SIGNATURE_EXPERIENCES = [
  { category: 'Accommodation', title: 'Luxury Rooms',    text: 'Spacious, sunlit rooms and suites dressed in premium fabrics, modern comforts, and timeless elegance.',          img: '/assets/images/rooms/NDS_5403.jpg',        href: '/rooms' },
  { category: 'Culinary',      title: 'Fine Dining',      text: 'A refined menu of North Indian and continental cuisine, crafted by our chefs and served with warmth.',          img: '/assets/images/dining/queenresturant.webp', href: '/dining' },
  { category: 'Celebrations',  title: 'Banquet Hall',     text: 'Opulent banquet spaces designed for weddings and grand celebrations that linger in memory.',                   img: '/assets/images/dining/banquets.webp',       href: '/banquets' },
  { category: 'Business',      title: 'Conference Hall',  text: 'State-of-the-art conference facilities equipped for seamless corporate meetings and seminars.',                img: '/assets/images/dining/conferencehall.png',  href: '/banquets' },
  { category: 'Events',        title: 'Celebrations',     text: 'From intimate gatherings to milestone parties, every celebration is tailored to perfection.',                  img: '/assets/images/dining/bar.webp',        href: '/banquets' },
]

const WHY_CHOOSE = [
  ['fa-crown',            'Premium Hospitality',  '/about'],
  ['fa-bed',               'Elegant Rooms',        '/rooms'],
  ['fa-utensils',          'Luxury Dining',        '/dining'],
  ['fa-user-tie',          'Professional Staff',   '/about'],
  ['fa-square-parking',    'Free Parking',         '/facilities'],
  ['fa-location-dot',      'Prime Location',       '/contact'],
  ['fa-champagne-glasses', 'Wedding Venue',        '/banquets'],
  ['fa-briefcase',         'Business Meetings',    '/banquets'],
]

const STATS = [
  { value: 40,   suffix: '+', label: 'Luxury Rooms' },
  { value: 16,   suffix: '+', label: 'Luxury Amenities' },
  { value: 5000, suffix: '+', label: 'Happy Guests' },
  { value: 4.5,  suffix: '★', label: 'Guest Rating' },
  { value: 500,  suffix: '+', label: 'Events Hosted' },
]

const AMENITIES = [
  ['fa-wifi',            'Free WiFi',        '/facilities'],
  ['fa-utensils',        'Restaurant',       '/dining'],
  ['fa-square-parking',  'Parking',          '/facilities'],
  ['fa-bolt',             'Power Backup',     '/facilities'],
  ['fa-screen-users',    'Conference Room',  '/banquets'],
  ['fa-champagne-glasses','Banquet Hall',     '/banquets'],
  ['fa-bell-concierge',  'Room Service',     '/rooms'],
  ['fa-shirt',            'Laundry',          '/facilities'],
  ['fa-elevator',        'Lift',             '/facilities'],
  ['fa-snowflake',        'AC Rooms',         '/rooms'],
  ['fa-clock',            '24x7 Reception',   '/contact'],
  ['fa-shield-check',    'Security',         '/facilities'],
]

const GALLERY_IMAGES = [
  { label: 'Lobby',               img: '/assets/images/gallery/NDS_4957-1.jpg' },
  { label: 'Rooms',               img: '/assets/images/gallery/NDS_4960.jpg' },
  { label: 'Restaurant',          img: '/assets/images/gallery/NDS_4971.jpg' },
  { label: 'Banquet Hall',        img: '/assets/images/gallery/NDS_4974.jpg' },
  { label: 'Fine Dining',         img: '/assets/images/gallery/NDS_5018.jpg' },
  { label: 'Exterior',            img: '/assets/images/gallery/NDS_5029.jpg' },
  { label: 'Garden',              img: '/assets/images/gallery/NDS_5036.jpg' },
  { label: 'Reception',           img: '/assets/images/gallery/NDS_5039.jpg' },
  { label: 'Restaurant Spread',   img: '/assets/images/gallery/NDS_5047.jpg' },
  { label: 'Craft Cocktails',     img: '/assets/images/gallery/NDS_5162.jpg' },
  { label: 'Front Desk',          img: '/assets/images/gallery/NDS_5257.jpg' },
  { label: 'Bar Essentials',      img: '/assets/images/gallery/NDS_5265.jpg' },
  { label: 'Cocktail Service',    img: '/assets/images/gallery/NDS_5338.jpg' },
]

const STATIC_TESTIMONIALS = [
  { _id: 'r1', name: 'Kiranjit Kaur',  role: 'Guest from Amritsar, India',   rating: 5, content: "Beds were really comfortable. Rooms were clean and a decent size. It is in a good area, central, with no noise outside. Excellent breakfast, friendly staff, clean rooms.", image: 'https://ui-avatars.com/api/?name=Kiranjit+Kaur&background=0B132B&color=D4AF37&size=128&rounded=true&bold=true' },
  { _id: 'r2', name: 'Vikram Sharma',  role: 'Verified Traveller',           rating: 5, content: "The only hotel worth staying in Rohtak — I would not stay anywhere else. The staff are welcoming, polite, courteous and helpful. Highly recommended!", image: 'https://ui-avatars.com/api/?name=Vikram+Sharma&background=D4AF37&color=0B132B&size=128&rounded=true&bold=true' },
  { _id: 'r3', name: 'Devendra Dutt',  role: 'Returning Guest',              rating: 5, content: "Amazing food, amazing staff — they make us feel at home and gave the best experience of staying at the property. I'd recommend this hotel as the number 1 place to stay in Rohtak.", image: 'https://ui-avatars.com/api/?name=Devendra+Dutt&background=0B132B&color=D4AF37&size=128&rounded=true&bold=true' },
  { _id: 'r4', name: 'Anju Rawat',     role: 'Business Traveller, Rohtak',   rating: 5, content: "A wonderful stay at The ParkQueen — check-in was seamless and the reception staff were incredibly polite. The room was spotlessly clean, spacious, and well-maintained.", image: 'https://ui-avatars.com/api/?name=Anju+Rawat&background=D4AF37&color=0B132B&size=128&rounded=true&bold=true' },
  { _id: 'r5', name: 'Rajesh Sharma',  role: 'Family Guest, Karnal',         rating: 5, content: "Excellent hotel — location is a big plus, well managed and professional staff with a helping nature. Room was lovely, spacious and well decorated. Awesome food throughout our stay.", image: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=0B132B&color=D4AF37&size=128&rounded=true&bold=true' },
  { _id: 'r6', name: 'Neha Malik',     role: 'Wedding Guest, Hisar',         rating: 5, content: "We attended a wedding here and the events management was outstanding. Great rooms, helpful staff, and the banquet hall looked absolutely stunning for the celebration.", image: 'https://ui-avatars.com/api/?name=Neha+Malik&background=D4AF37&color=0B132B&size=128&rounded=true&bold=true' },
  { _id: 'r7', name: 'Vikas Yadav',    role: 'Business Traveller, Gurugram', rating: 5, content: "Good basic hotel also used by business travellers — spacious clean rooms with good service. Food quality and taste was excellent. Overall our stay was very good.", image: 'https://ui-avatars.com/api/?name=Vikas+Yadav&background=0B132B&color=D4AF37&size=128&rounded=true&bold=true' },
  { _id: 'r8', name: 'Priya Chaudhary',role: 'Solo Traveller, Panipat',      rating: 5, content: "Seamless check-in and the staff at reception were incredibly polite and helpful from start to finish. The room was spotlessly clean, spacious, and well-maintained.", image: 'https://ui-avatars.com/api/?name=Priya+Chaudhary&background=D4AF37&color=0B132B&size=128&rounded=true&bold=true' },
]

const DEFAULT_SETTINGS = {
  phone: ['+91 9088809991'],
  email: ['info@parkqueenhotels.com'],
  address: 'The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India',
  mapEmbed: 'https://maps.google.com/maps?q=The+ParkQueen+Hotel+Rohtak+Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed',
}

export default function AboutPage() {
  const [hero, setHero] = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    fetch('/api/hero/about').then(r => r.json()).then(d => { if (d.data) setHero(d.data) }).catch(() => {})
    fetch('/api/testimonials?status=active&limit=8').then(r => r.json()).then(d => { if (d.data?.length) setTestimonials(d.data) }).catch(() => {})
    fetch('/api/settings').then(r => r.json()).then(d => { if (d.data) setSettings({ ...DEFAULT_SETTINGS, ...d.data }) }).catch(() => {})
  }, [])

  const activeTestimonials = testimonials.length ? testimonials : STATIC_TESTIMONIALS

  // Reinitialize Testimonial Swiper after testimonials load/replace the DOM —
  // without this, Swiper keeps stale references to slides React has already
  // swapped out, leaving the slider blank/empty after a few slides.
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
  const phone = settings.phone?.[0] || DEFAULT_SETTINGS.phone[0]
  const email = settings.email?.[0] || DEFAULT_SETTINGS.email[0]
  const address = settings.address || DEFAULT_SETTINGS.address
  const mapSrc = settings.mapEmbed || DEFAULT_SETTINGS.mapEmbed

  return (
    <>
      <SharedHeader />

      {/* ══ 1. HERO ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img
          src={'/assets/images/about/subhero.png'}
          alt="Park Queen Hotel & Resort"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(11,19,43,.55) 0%, rgba(11,19,43,.75) 70%, ${NAVY} 100%)`, zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '160px 24px 64px' }}>
          <span className="wow fadeInUp" style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 18 }}>Est. Rohtak, Haryana</span>
          <h1 className="wow fadeInUp" data-wow-delay=".15s" style={{ color: '#fff', fontSize: 'clamp(34px, 5.5vw, 64px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 22px', maxWidth: 820 }}>
            About Park Queen Hotel &amp; Resort
          </h1>
          <ul className="wow fadeInUp" data-wow-delay=".3s" style={{ display: 'flex', gap: 10, alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,.7)', fontSize: 13 }}>
            <li><a href="/" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>Home</a></li>
            <li style={{ color: GOLD }}>/</li>
            <li style={{ color: GOLD }}>About Us</li>
          </ul>
        </div>
      </section>

      {/* ══ 2. ABOUT PARK QUEEN ══════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '110px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(11,19,43,.18)' }}>
                <img src="/assets/images/home/buildingimage.png" alt="Park Queen Hotel" style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block', transition: 'transform .6s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>About The Hotel</span>
              <h2 style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 800, marginBottom: 22, lineHeight: 1.25 }}>Luxury Hospitality, Rooted in Rohtak</h2>
              <p style={{ color: '#5b6373', lineHeight: 1.95, fontSize: 15, marginBottom: 18 }}>
                Park Queen Hotel &amp; Resort stands as one of Rohtak&apos;s most distinguished addresses for refined hospitality. Every corner of the hotel — from the sweeping lobby to our 40 elegantly appointed rooms — has been designed to offer guests an experience of effortless comfort and quiet luxury.
              </p>
              <p style={{ color: '#5b6373', lineHeight: 1.95, fontSize: 15, marginBottom: 18 }}>
                Whether you are here for business, a family getaway, or to celebrate life&apos;s biggest moments, our team is dedicated to attending to every detail — so your stay feels personal, polished, and truly memorable.
              </p>
              <p style={{ color: '#5b6373', lineHeight: 1.95, fontSize: 15, marginBottom: 30 }}>
                From fine dining and a well-stocked bar to grand banquet halls and dedicated conference spaces, Park Queen brings together everything a discerning traveller could need, all under one roof.
              </p>
              <div className="row g-3" style={{ marginBottom: 34 }}>
                {['Premium Accommodation', 'Fine Dining', 'Luxury Banquet', 'Family Friendly'].map(item => (
                  <div key={item} className="col-6" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="fa-solid fa-circle-check" style={{ color: GOLD, fontSize: 16, flexShrink: 0 }}></i>
                    <span style={{ color: NAVY, fontSize: 14, fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/contact" className="theme-btn" style={{ padding: '14px 36px', fontSize: 13 }}>Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. OUR STORY ═════════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: NAVY, padding: '110px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, borderRadius: '50%', border: `1px solid rgba(212,175,55,.12)`, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: -140, left: -100, width: 320, height: 320, borderRadius: '50%', border: `1px solid rgba(212,175,55,.1)`, pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Our Story</span>
            <h2 className="wow fadeInUp" style={{ color: '#fff', fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, margin: 0 }}>What Drives Us Every Day</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: '20px auto 0' }}></div>
          </div>
          <div className="row g-4">
            {[
              { icon: 'fa-bullseye',  title: 'Mission', text: 'To deliver an unparalleled blend of luxury, comfort, and authentic Indian hospitality — making every guest feel like royalty, whether visiting for business, leisure, or celebration.' },
              { icon: 'fa-eye',       title: 'Vision', text: "To be recognised as Rohtak's most trusted name in premium hospitality, setting the benchmark for service excellence and elegant design across Haryana." },
              { icon: 'fa-hands-holding-heart', title: 'Hospitality Philosophy', text: 'True luxury lies in the details — from a warm welcome at the door to a perfectly turned-down bed at night. Every interaction is a chance to exceed expectations.' },
              { icon: 'fa-handshake', title: 'Customer Commitment', text: 'Your comfort is our promise. From seamless bookings to attentive on-ground service, we are committed to making every stay effortless and memorable.' },
            ].map((card, i) => (
              <div key={card.title} className="col-md-6 col-lg-3">
                <div className="wow fadeInUp" data-wow-delay={`.${i+2}s`} style={{
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(212,175,55,.18)',
                  borderRadius: 16, padding: '36px 26px', height: '100%', backdropFilter: 'blur(6px)',
                  transition: 'transform .3s, border-color .3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = GOLD }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(212,175,55,.18)' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `rgba(212,175,55,.12)`, border: `1px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                    <i className={`fa-solid ${card.icon}`} style={{ color: GOLD, fontSize: 20 }}></i>
                  </div>
                  <h4 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{card.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 13.5, lineHeight: 1.85, margin: 0 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SIGNATURE EXPERIENCES ═════════════════════════════════ */}
      <section style={{ background: '#faf9f7', padding: '110px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Curated For You</span>
            <h2 className="wow fadeInUp" style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, margin: 0 }}>Signature Experiences</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: '20px auto 0' }}></div>
          </div>
          <div className="row g-4">
            {SIGNATURE_EXPERIENCES.map((exp, i) => (
              <div key={exp.title} className={i === 4 ? 'col-12' : 'col-lg-6'}>
                <div className="wow fadeInUp" data-wow-delay={`.${(i%2)+2}s`} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 440, boxShadow: '0 16px 50px rgba(11,19,43,.12)' }}>
                  <img src={exp.img} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,43,.92) 0%, rgba(11,19,43,.25) 55%, transparent 100%)' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
                    <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>{exp.category}</span>
                    <h3 style={{ color: '#fff', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{exp.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 14, lineHeight: 1.8, maxWidth: 460, marginBottom: 20 }}>{exp.text}</p>
                    <a href={exp.href} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      color: GOLD, fontSize: 12.5, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                      textDecoration: 'none', borderBottom: `2px solid ${GOLD}`, paddingBottom: 4,
                    }}>
                      Discover More <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. WHY CHOOSE PARK QUEEN ═════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '110px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(11,19,43,.18)' }}>
                <img src="/assets/images/dining/rooftopresturant.webp" alt="Why Choose Park Queen" style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>The Park Queen Difference</span>
              <h2 style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, marginBottom: 26, lineHeight: 1.25 }}>Why Choose Park Queen</h2>
              <div className="row g-3">
                {WHY_CHOOSE.map(([icon, label, href], i) => (
                  <div key={label} className="col-sm-6">
                    <a href={href} className="wow fadeInUp" data-wow-delay={`.${(i%4)+1}s`} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
                      background: '#faf9f7', borderRadius: 12, border: '1px solid #f0ede5',
                      transition: 'border-color .25s, transform .25s', textDecoration: 'none',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = 'translateY(-3px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0ede5'; e.currentTarget.style.transform = 'none' }}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className={`fa-solid ${icon}`} style={{ color: GOLD, fontSize: 16 }}></i>
                      </div>
                      <span style={{ color: NAVY, fontSize: 13.5, fontWeight: 700 }}>{label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. STATISTICS ════════════════════════════════════════════ */}
      <section style={{ background: NAVY, padding: '80px 0' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {STATS.map(stat => (
              <div key={stat.label} className="col-6 col-md-4 col-lg">
                <div className="wow fadeInUp">
                  <h2 style={{ color: GOLD, fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 800, margin: '0 0 8px' }}>
                    <span className="odometer" data-count={stat.value}>00</span>{stat.suffix}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. AMENITIES ═════════════════════════════════════════════ */}
      <section style={{ background: '#faf9f7', padding: '110px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>What We Offer</span>
            <h2 className="wow fadeInUp" style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, margin: 0 }}>Hotel Amenities</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: '20px auto 0' }}></div>
          </div>
          <div className="row g-3">
            {AMENITIES.map(([icon, label, href], i) => (
              <div key={label} className="col-6 col-md-4 col-lg-3">
                <a href={href} className="wow fadeInUp" data-wow-delay={`.${(i%4)+1}s`} style={{
                  display: 'block', background: '#fff', borderRadius: 14, padding: '28px 16px', textAlign: 'center',
                  boxShadow: '0 4px 18px rgba(11,19,43,.06)', height: '100%', textDecoration: 'none',
                  transition: 'transform .25s, box-shadow .25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 16px 36px rgba(212,175,55,.22)` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(11,19,43,.06)' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `rgba(212,175,55,.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <i className={`fa-solid ${icon}`} style={{ color: NAVY, fontSize: 22 }}></i>
                  </div>
                  <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. MEET OUR HOSPITALITY ══════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '110px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(11,19,43,.18)' }}>
                <img src="/assets/images/dining/queenresturant.webp" alt="Our Hospitality Team" style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>The People Behind Park Queen</span>
              <h2 style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, marginBottom: 22, lineHeight: 1.25 }}>Meet Our Hospitality</h2>
              <p style={{ color: '#5b6373', lineHeight: 1.95, fontSize: 15, marginBottom: 28 }}>
                Behind every memorable stay at Park Queen is a team devoted to genuine, attentive service. Our staff are trained not just to meet expectations, but to anticipate them — turning routine moments into warm, personal experiences.
              </p>
              <div className="row g-3">
                {[
                  ['fa-user-tie', 'Professional Staff', 'Trained, courteous, and always a phone call away.'],
                  ['fa-heart', 'Personalized Service', 'Every request handled with genuine care and attention.'],
                  ['fa-gem', 'Luxury Experience', 'Premium touches woven into every interaction.'],
                  ['fa-hand-holding-heart', 'Warm Hospitality', 'The kind of welcome that makes you feel at home.'],
                ].map(([icon, title, text]) => (
                  <div key={title} className="col-sm-6" style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <i className={`fa-solid ${icon}`} style={{ color: GOLD, fontSize: 18, marginTop: 3, flexShrink: 0 }}></i>
                    <div>
                      <h6 style={{ color: NAVY, fontSize: 13.5, fontWeight: 700, margin: '0 0 4px' }}>{title}</h6>
                      <p style={{ color: '#6b7280', fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. GALLERY PREVIEW ═══════════════════════════════════════ */}
      <section style={{ background: '#faf9f7', padding: '110px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>A Glimpse Inside</span>
            <h2 className="wow fadeInUp" style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, margin: 0 }}>Gallery Preview</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: '20px auto 0' }}></div>
          </div>
          <div style={{ columnCount: 4, columnGap: 16 }} className="gallery-masonry">
            {GALLERY_IMAGES.map((g, i) => (
              <a href="/gallery" key={g.label} className="wow fadeInUp" data-wow-delay={`.${(i%4)+1}s`} style={{
                display: 'block', breakInside: 'avoid', marginBottom: 16, position: 'relative',
                borderRadius: 14, overflow: 'hidden', boxShadow: '0 6px 24px rgba(11,19,43,.1)',
              }}>
                <img src={g.img} alt={g.label} style={{ width: '100%', height: i % 3 === 0 ? 280 : 200, objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </a>
            ))}
          </div>
          <style>{`@media (max-width: 991px){.gallery-masonry{column-count:2 !important}} @media (max-width: 575px){.gallery-masonry{column-count:1 !important}}`}</style>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <a href="/gallery" className="theme-btn" style={{ padding: '14px 36px', fontSize: 13 }}>View Gallery</a>
          </div>
        </div>
      </section>

      {/* ══ 10. GUEST TESTIMONIALS ═══════════════════════════════════ */}
      <section style={{ background: NAVY, padding: '110px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Real Stories</span>
            <h2 className="wow fadeInUp" style={{ color: '#fff', fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, margin: 0 }}>What Our Guests Say</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: '20px auto 0' }}></div>
          </div>
          <div className="swiper testimonial-slider">
            <div className="swiper-wrapper">
              {activeTestimonials.map(t => (
                <div key={t._id} className="swiper-slide" style={{ height: 'auto' }}>
                  <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(212,175,55,.18)', borderRadius: 16, padding: '36px 30px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ marginBottom: 18 }}>
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star" style={{ color: GOLD, fontSize: 15, margin: '0 2px' }}></i>
                      ))}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 16, lineHeight: 1.9, fontStyle: 'italic', marginBottom: 24 }}>&ldquo;{t.content}&rdquo;</p>
                    <h5 style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: '0 0 2px' }}>{t.name}</h5>
                    <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══ 12. LUXURY BOOKING CTA ═══════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 420, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/assets/images/home/NDS_5344.jpg" alt="Book your luxury stay" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(11,19,43,.82) 0%, rgba(11,19,43,.9) 100%)`, zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '90px 24px' }}>
          <span className="wow fadeInUp" style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Reserve Your Stay</span>
          <h2 className="wow fadeInUp" data-wow-delay=".15s" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 18, maxWidth: 700, margin: '0 auto 18px' }}>Ready to Experience Luxury?</h2>
          <p className="wow fadeInUp" data-wow-delay=".25s" style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Book your stay today and enjoy premium hospitality at Park Queen Hotel &amp; Resort.
          </p>
          <div className="wow fadeInUp" data-wow-delay=".35s" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/booking" className="theme-btn" style={{ padding: '15px 38px', fontSize: 13 }}>Book Now</a>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', padding: '15px 38px',
              border: `2px solid ${GOLD}`, borderRadius: 4, color: GOLD,
              textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
              transition: 'all .25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = NAVY }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ══ 13. CONTACT SECTION ══════════════════════════════════════ */}
      <section style={{ background: '#faf9f7', padding: '110px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Find Us</span>
            <h2 className="wow fadeInUp" style={{ color: NAVY, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, margin: 0 }}>Get In Touch</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: '20px auto 0' }}></div>
          </div>
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7 wow fadeInLeft">
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 50px rgba(11,19,43,.12)', height: '100%', minHeight: 380 }}>
                <iframe src={mapSrc} style={{ border: 0, width: '100%', height: '100%', minHeight: 380, display: 'block' }} allowFullScreen="" loading="lazy" title="Park Queen Hotel Location"></iframe>
              </div>
            </div>
            <div className="col-lg-5 wow fadeInRight">
              <div style={{ background: NAVY, borderRadius: 16, padding: '40px', height: '100%' }}>
                {[
                  ['fa-location-dot', 'Address', address],
                  ['fa-phone', 'Phone', phone, `tel:${phone.replace(/\s/g,'')}`],
                  ['fa-envelope', 'Email', email, `mailto:${email}`],
                  ['fa-clock', 'Working Hours', 'Open 24 Hours / 7 Days'],
                ].map(([icon, label, value, href]) => (
                  <div key={label} style={{ display: 'flex', gap: 16, marginBottom: 26, alignItems: 'flex-start' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(212,175,55,.12)', border: `1px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${icon}`} style={{ color: GOLD, fontSize: 16 }}></i>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                      {href ? <a href={href} style={{ color: '#fff', fontSize: 14.5, textDecoration: 'none' }}>{value}</a> : <div style={{ color: '#fff', fontSize: 14.5 }}>{value}</div>}
                    </div>
                  </div>
                ))}
                <a href="/contact" className="theme-btn" style={{ marginTop: 6, display: 'inline-block' }}>Send Us A Message</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 14. FOOTER ═══════════════════════════════════════════════ */}
      <footer className="footer-section fix bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container">
          <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3>Stay updated with Park Queen Hotel</h3>
              <p>Subscribe for exclusive offers, event news, and the latest from Park Queen Hotel &amp; Resort.</p>
            </div>
            <form action="#">
              <div className="form-clt">
                <i className="fa-solid fa-envelope"></i>
                <input type="text" name="email" id="email-footer-about" placeholder="enter your email" />
                <button type="submit" className="theme-btn">subscribe now</button>
              </div>
            </form>
          </div>
          <div className="footer-widget-wrapper">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".2s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>About Us</h5></div>
                  <div className="footer-content"><p>Park Queen Hotel &amp; Resort — refined luxury, warm hospitality, and effortless comfort in the heart of Rohtak.</p></div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".4s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>Quick Links</h5></div>
                  <ul className="list">
                    <li><a href="/rooms">Rooms</a></li>
                    <li><a href="/dining">Dining</a></li>
                    <li><a href="/banquets">Banquets</a></li>
                    <li><a href="/facilities">Facilities</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".6s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>check in &amp; out time</h5></div>
                  <ul className="date-list">
                    <li>Check In : <span className="style-1">12:00 PM</span></li>
                    <li>Check Out : <span>11:00 AM</span></li>
                    <li>Open : <span className="style-1">24 Hours / 7 Days</span></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".8s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>Contact Us</h5></div>
                  <ul className="contact-item">
                    <li><i className="fa-solid fa-location-dot"></i> {address}</li>
                    <li className="style-2"><i className="fa-solid fa-envelope"></i> <a href={`mailto:${email}`}>{email}</a></li>
                    <li className="style-2"><i className="fa-solid fa-phone"></i> <a href={`tel:${phone.replace(/\s/g,'')}`}>{phone}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-wrapper">
              <div className="social-icon wow fadeInLeft" data-wow-delay=".3s">
                <a href="https://www.linkedin.com/in/parkqueen-hotels-and-resorts-9a2532400/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://x.com/parkqueenhotel_" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://www.instagram.com/parkqueenhotel_rohtak/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/hotelparkqueen/#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
              <ul className="footer-list wow fadeInUp" data-wow-delay=".5s">
                <li><a href="/contact">Contact Us</a></li>
              </ul>
              <p className="wow fadeInRight" data-wow-delay=".7s">Copyright&copy; <span>Park Queen Hotel &amp; Resort</span></p>
            </div>
            <a href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
              <img style={{ width: '18rem' }} src="/assets/images/logo.png" alt="Park Queen Hotel & Resort" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
