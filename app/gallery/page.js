'use client'
import { useState } from 'react'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import InstagramSlider from '@/app/_components/InstagramSlider'

const IMAGES = [
  { src: '/assets/images/gallery/NDS_4957-1.jpg', label: 'Lobby',               category: 'Interiors' },
  { src: '/assets/images/gallery/NDS_4960.jpg',    label: 'Rooms',               category: 'Rooms' },
  { src: '/assets/images/gallery/NDS_4971.jpg',    label: 'Restaurant',          category: 'Dining' },
  { src: '/assets/images/gallery/NDS_4974.jpg',    label: 'Banquet Hall',        category: 'Events' },
  { src: '/assets/images/gallery/NDS_5018.jpg',    label: 'Fine Dining',         category: 'Dining' },
  { src: '/assets/images/gallery/NDS_5029.jpg',    label: 'Exterior',            category: 'Exterior' },
  { src: '/assets/images/gallery/NDS_5036.jpg',    label: 'Garden',              category: 'Exterior' },
  { src: '/assets/images/gallery/NDS_5039.jpg',    label: 'Reception',           category: 'Interiors' },
  { src: '/assets/images/gallery/NDS_5047.jpg',    label: 'Restaurant Spread',   category: 'Dining' },
  { src: '/assets/images/gallery/NDS_5162.jpg',    label: 'Craft Cocktails',     category: 'Dining' },
  { src: '/assets/images/gallery/NDS_5257.jpg',    label: 'Front Desk',          category: 'Interiors' },
  { src: '/assets/images/gallery/NDS_5265.jpg',    label: 'Bar Essentials',      category: 'Dining' },
  { src: '/assets/images/gallery/NDS_5338.jpg',    label: 'Cocktail Service',    category: 'Dining' },
]

const CATEGORIES = ['All', 'Interiors', 'Rooms', 'Dining', 'Events', 'Exterior']

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index into `filtered`

  const filtered = filter === 'All' ? IMAGES : IMAGES.filter(img => img.category === filter)

  const showPrev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const showNext = () => setLightbox(i => (i + 1) % filtered.length)

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb */}
      <PageHero
        bg="/assets/images/gallery/NDS_4957-1.jpg"
        kicker="A Glimpse Inside"
        title="Gallery"
        crumbs={[{ label: 'Gallery' }]}
      />

      {/* Intro */}
      <section style={{ background: '#fff', padding: '72px 0 32px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>A Glimpse Inside</span>
          <h2 className="wow fadeInUp" style={{ color: '#1a1c2e', fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Photo Gallery</h2>
          <div style={{ width: 64, height: 2, background: '#cda434', margin: '0 auto 24px' }}></div>
          <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9 }}>
            Step inside The ParkQueen Hotel — from elegant rooms and signature dining to grand banquet halls and a tranquil garden, explore the spaces that make every stay memorable.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background: '#fff', paddingBottom: 8 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              style={{
                padding: '9px 22px',
                borderRadius: 30,
                border: filter === cat ? 'none' : '1px solid #e5e7eb',
                background: filter === cat ? '#cda434' : '#fff',
                color: filter === cat ? '#1a1c2e' : '#374151',
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: 1,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <section style={{ background: '#fff', padding: '40px 0 88px' }}>
        <div className="container">
          <div style={{ columnCount: 4, columnGap: 16 }} className="gallery-masonry">
            {filtered.map((img, i) => (
              <div
                key={img.src}
                onClick={() => setLightbox(i)}
                className="wow fadeInUp"
                data-wow-delay={`.${(i % 4) + 1}s`}
                style={{
                  breakInside: 'avoid', marginBottom: 16, position: 'relative',
                  borderRadius: 14, overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,.1)',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={{ width: '100%', height: i % 3 === 0 ? 320 : 240, objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(26,28,46,.75) 0%, transparent 45%)',
                  display: 'flex', alignItems: 'flex-end', padding: 18, pointerEvents: 'none',
                }}>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: .5 }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 991px){.gallery-masonry{column-count:2 !important}} @media (max-width: 575px){.gallery-masonry{column-count:1 !important}}`}</style>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(11,19,43,.94)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{ position: 'absolute', top: 24, right: 28, background: 'none', border: 'none', color: '#fff', fontSize: 30, cursor: 'pointer', lineHeight: 1 }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <button
            onClick={e => { e.stopPropagation(); showPrev() }}
            aria-label="Previous image"
            style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 30, cursor: 'pointer' }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={e => { e.stopPropagation(); showNext() }}
            aria-label="Next image"
            style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 30, cursor: 'pointer' }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '88vw', maxHeight: '85vh', textAlign: 'center' }}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].label}
              style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}
            />
            <p style={{ color: '#cda434', fontWeight: 700, marginTop: 16, fontSize: 14, letterSpacing: 1 }}>{filtered[lightbox].label}</p>
          </div>
        </div>
      )}

      {/* Instagram strip */}
      <InstagramSlider wrapperClass="instagram-section-2 fix" />

      {/* Footer */}
      <footer
        className="footer-section fix bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="container">
          <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3>Stay updated with The ParkQueen Hotel</h3>
              <p>At The ParkQueen Hotel, luxury is a crafted experience that blends elegance, comfort, and exceptional service in Rohtak.</p>
            </div>
            <form action="#">
              <div className="form-clt">
                <i className="fa-solid fa-envelope"></i>
                <input type="text" name="email" id="email-footer-gallery" placeholder="enter your email" />
                <button type="submit" className="theme-btn">subscribe now</button>
              </div>
            </form>
          </div>
          <div className="footer-widget-wrapper">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".2s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>About us</h5></div>
                  <div className="footer-content"><p>Welcome to The ParkQueen Hotel, your destination for refined luxury stays and hospitality that feels personal, polished, and effortless.</p></div>
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
                    <li><i className="fa-solid fa-location-dot"></i> The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India</li>
                    <li className="style-2"><i className="fa-solid fa-envelope"></i><a href="mailto:info@parkqueenhotels.com">info@parkqueenhotels.com</a></li>
                    <li className="style-2"><i className="fa-solid fa-phone"></i><a href="tel:+919088809991">+91 9088809991</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-wrapper">
              <div className="social-icon wow fadeInLeft" data-wow-delay=".3s">
                <a href="https://www.linkedin.com/in/parkqueen-hotels-and-resorts-9a2532400/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://x.com/parkqueenhotel_" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://www.instagram.com/parkqueenhotel_rohtak/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/hotelparkqueen/#" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
              <ul className="footer-list wow fadeInUp" data-wow-delay=".5s">
                <li><a href="/contact">Contact Us</a></li>
              </ul>
              <p className="wow fadeInRight" data-wow-delay=".7s">Copyright&copy; <span>The ParkQueen Hotel</span></p>
            </div>
            <a href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
              <img style={{ width: '18rem' }} src="/assets/images/logo.png" alt="img" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
