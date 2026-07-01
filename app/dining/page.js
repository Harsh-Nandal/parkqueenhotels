'use client'
import { useState, useEffect } from 'react'
import { bannerBg } from '@/lib/imgUrl'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import Footer from '@/app/_components/Footer'

const DEFAULT_DINING_PHONE = ['+91 9088879990', '+91 9088879991', '+91 9088809993', '+91 9088809994']

export default function DiningPage() {
  const [diningPhone, setDiningPhone] = useState(DEFAULT_DINING_PHONE)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.data?.diningPhone?.length) setDiningPhone(d.data.diningPhone) })
      .catch(() => {})
  }, [])

  const [queenPhone, rooftopPhone, barPhone] = diningPhone
  const telHref = p => `tel:${p.replace(/\s/g, '')}`

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb */}
      <PageHero
        bg={bannerBg(['/assets/images/dining/NDS_5117.jpg'], '/assets/images/home/NDS_5001.jpg')}
        kicker="Culinary Excellence"
        title="Dining Experience"
        crumbs={[{ label: 'Dining' }]}
      />

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '88px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Culinary Excellence</span>
          <h2 className="wow fadeInUp" style={{ color: '#1a1c2e', fontSize: 36, fontWeight: 700, marginBottom: 20 }}>A World of Flavours Awaits You</h2>
          <div style={{ width: 64, height: 2, background: '#cda434', margin: '0 auto 24px' }}></div>
          <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9 }}>
            At The ParkQueen Hotel, dining is more than a meal — it is an experience. From our vibrant Queen Restaurant to the laid-back Bar &amp; Lounge and the breezy Rooftop Restaurant, every venue has been crafted to delight your senses with authentic flavours, impeccable service, and unforgettable ambiance.
          </p>
        </div>
      </section>

      {/* ── Queen Restaurant ──────────────────────────────────────── */}
      <section style={{ background: '#faf9f7', padding: '88px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 60px rgba(0,0,0,.14)' }}>
                <img src="/assets/images/dining/queenresturant.webp" alt="Queen Restaurant" style={{ width: '100%', height: 440, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,28,46,.7) 0%, transparent 55%)' }}></div>
                <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                  <span style={{ background: '#cda434', color: '#1a1c2e', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20 }}>Signature Restaurant</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <div style={{ paddingLeft: 12 }}>
                <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Main Dining</span>
                <h2 style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, marginBottom: 8, lineHeight: 1.25 }}>Queen Restaurant</h2>
                <div style={{ width: 56, height: 3, background: '#cda434', marginBottom: 22, borderRadius: 2 }}></div>
                <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9, marginBottom: 18 }}>
                  The crown jewel of our dining collection, Queen Restaurant serves all three meals daily — a lavish spread of North Indian specialities, continental delicacies, and seasonal chef&apos;s creations. Every dish is prepared with the finest locally sourced ingredients in a warm, sophisticated setting.
                </p>
                <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9, marginBottom: 28 }}>
                  Whether it&apos;s a power breakfast before a conference, a leisurely family lunch, or a celebratory dinner, Queen Restaurant delivers an experience that lingers long after the last bite.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 30 }}>
                  {[['fa-sun','Breakfast','7:00 AM – 10:30 AM'],['fa-cloud-sun','Lunch','12:30 PM – 3:00 PM'],['fa-moon','Dinner','7:30 PM – 11:00 PM'],['fa-utensils','Cuisine','North Indian & Continental']].map(([icon, label, val]) => (
                    <div key={label} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <i className={`fa-solid ${icon}`} style={{ color: '#cda434', fontSize: 18, flexShrink: 0 }}></i>
                      <div>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                        <div style={{ fontSize: 13, color: '#1a1c2e', fontWeight: 600, marginTop: 1 }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <a href="/contact" className="theme-btn">RESERVE A TABLE</a>
                  <a href={telHref(queenPhone)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1a1c2e', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    <i className="fa-solid fa-phone" style={{ color: '#cda434' }}></i>{queenPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rooftop Restaurant ────────────────────────────────────── */}
      <section style={{ background: '#1a1c2e', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(205,164,52,.1)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(205,164,52,.08)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft" style={{ order: 2 }}>
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 60px rgba(0,0,0,.35)' }}>
                <img src="/assets/images/dining/rooftopresturant.webp" alt="Rooftop Restaurant" style={{ width: '100%', height: 440, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,28,46,.6) 0%, transparent 50%)' }}></div>
                <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                  <span style={{ background: 'rgba(205,164,52,.9)', color: '#1a1c2e', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20 }}>Rooftop Dining</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" style={{ order: 1 }}>
              <div style={{ paddingRight: 12 }}>
                <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Sky High Dining</span>
                <h2 style={{ color: '#fff', fontSize: 34, fontWeight: 700, marginBottom: 8, lineHeight: 1.25 }}>Rooftop Restaurant</h2>
                <div style={{ width: 56, height: 3, background: '#cda434', marginBottom: 22, borderRadius: 2 }}></div>
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.9, marginBottom: 18 }}>
                  Perched atop The ParkQueen Hotel, our Rooftop Restaurant offers panoramic views of Rohtak&apos;s skyline paired with an exquisite menu. As the city lights come alive at dusk, there&apos;s no better place to enjoy a refreshing drink or a perfectly plated meal under the open sky.
                </p>
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.9, marginBottom: 28 }}>
                  Open through the evening and late into the night, the Rooftop is perfect for romantic dinners, casual get-togethers, and special celebrations with curated cocktails and fresh bites.
                </p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
                  {[['fa-cloud','Open Air'],['fa-city','City Views'],['fa-moon','Evening & Night'],['fa-glass-water','Cocktails']].map(([icon, label]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className={`fa-solid ${icon}`} style={{ color: '#cda434', fontSize: 15 }}></i>
                      <span style={{ color: 'rgba(255,255,255,.8)', fontSize: 13, fontWeight: 500 }}>{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <a href="/contact" className="theme-btn">BOOK A ROOFTOP TABLE</a>
                  <a href={telHref(rooftopPhone)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    <i className="fa-solid fa-phone" style={{ color: '#cda434' }}></i>{rooftopPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bar & Lounge ─────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '88px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft">
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 60px rgba(0,0,0,.12)' }}>
                <img src="/assets/images/dining/bar.webp" alt="Bar & Lounge" style={{ width: '100%', height: 440, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,28,46,.65) 0%, transparent 55%)' }}></div>
                <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                  <span style={{ background: '#cda434', color: '#1a1c2e', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20 }}>Bar & Lounge</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <div style={{ paddingLeft: 12 }}>
                <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Lounge &amp; Spirits</span>
                <h2 style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, marginBottom: 8, lineHeight: 1.25 }}>Bar &amp; Lounge</h2>
                <div style={{ width: 56, height: 3, background: '#cda434', marginBottom: 22, borderRadius: 2 }}></div>
                <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9, marginBottom: 18 }}>
                  Step into the elegant ambiance of The ParkQueen Bar &amp; Lounge — a sophisticated space where premium spirits meet refined interiors. Our expert bartenders craft every drink to perfection, from classic cocktails to the latest in mixology.
                </p>
                <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9, marginBottom: 28 }}>
                  Open 24 hours a day, the Bar &amp; Lounge is your go-to retreat after a long day. Sink into plush seating, enjoy curated bar snacks, and let the relaxed atmosphere melt away the day&apos;s pressures.
                </p>
                <div style={{ background: '#faf9f7', borderRadius: 12, padding: '20px 24px', marginBottom: 28, border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    {[['fa-martini-glass-citrus','Premium Cocktails'],['fa-beer-mug-empty','Craft Beers'],['fa-wine-glass','Fine Wines'],['fa-mug-hot','Hot Beverages'],['fa-drumstick-bite','Bar Snacks'],['fa-clock','Open 24 Hrs']].map(([icon, label]) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
                        <i className={`fa-solid ${icon}`} style={{ color: '#cda434', fontSize: 20 }}></i>
                        <span style={{ color: '#374151', fontSize: 11, fontWeight: 600, lineHeight: 1.3 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <a href="/contact" className="theme-btn">VISIT THE LOUNGE</a>
                  <a href={telHref(barPhone)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1a1c2e', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    <i className="fa-solid fa-phone" style={{ color: '#cda434' }}></i>{barPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dining Hours Summary ───────────────────────────────────── */}
      <section style={{ background: '#faf9f7', padding: '72px 0', borderTop: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Hours of Operation</span>
            <h2 className="wow fadeInUp" style={{ color: '#1a1c2e', fontSize: 30, fontWeight: 700, margin: 0 }}>DINING HOURS</h2>
            <div style={{ width: 56, height: 2, background: '#cda434', margin: '12px auto 0' }}></div>
          </div>
          <div className="row g-4">
            {[
              { name: 'Queen Restaurant', icon: 'fa-utensils', hours: [['Breakfast','7:00 AM – 10:30 AM'],['Lunch','12:30 PM – 3:00 PM'],['Dinner','7:30 PM – 11:00 PM']] },
              { name: 'Rooftop Restaurant', icon: 'fa-cloud', hours: [['Evening Opening','5:00 PM – 11:30 PM'],['Weekend Brunch','11:00 AM – 3:00 PM'],['Bar Service','5:00 PM – 12:00 AM']] },
              { name: 'Bar & Lounge', icon: 'fa-martini-glass-citrus', hours: [['All Day','Open 24 Hours'],['Happy Hour','5:00 PM – 8:00 PM'],['Bar Snacks','All Day']] },
            ].map((v, i) => (
              <div key={i} className="col-md-4 wow fadeInUp" data-wow-delay={`.${i+2}s`}>
                <div style={{ background: '#fff', borderRadius: 14, padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,.06)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1a1c2e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${v.icon}`} style={{ color: '#cda434', fontSize: 20 }}></i>
                    </div>
                    <h4 style={{ color: '#1a1c2e', fontSize: 16, fontWeight: 700, margin: 0 }}>{v.name}</h4>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {v.hours.map(([label, time]) => (
                      <li key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                        <span style={{ color: '#6b7280', fontWeight: 500 }}>{label}</span>
                        <span style={{ color: '#1a1c2e', fontWeight: 700 }}>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 8 }}>For reservations &amp; enquiries, call our dining team</p>
            <a href={telHref(diningPhone[3])} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1a1c2e', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              <i className="fa-solid fa-phone" style={{ color: '#cda434' }}></i>{diningPhone[3]}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
