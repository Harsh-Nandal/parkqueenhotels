'use client'
import { bannerBg } from '@/lib/imgUrl'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'


const VENUES = [
  { name: 'Grand Banquet Hall', capacity: '200–500 guests', icon: 'fa-champagne-glasses', desc: 'Our stunning Grand Banquet Hall is perfect for weddings, receptions, and large celebrations. Featuring elegant décor, state-of-the-art lighting, and a dedicated event team to make your special day truly unforgettable.', features: ['Capacity: 200–500 Guests', 'Stage & Dance Floor', 'Full Catering Service', 'Floral Decoration', 'AV Equipment', 'Bridal Suite Access'] },
  { name: 'Conference Hall', capacity: '20–100 guests', icon: 'fa-presentation-screen', desc: 'A sophisticated, fully equipped conference hall designed for corporate meetings, seminars, product launches, and board meetings. Equipped with modern AV technology, video conferencing, and flexible seating arrangements.', features: ['Capacity: 20–100 Guests', 'HD Projector & Screen', 'Video Conferencing', 'Whiteboard', 'High-Speed Wi-Fi', 'Secretarial Support'] },
  { name: 'Private Dining Room', capacity: '10–30 guests', icon: 'fa-utensils', desc: 'An intimate private dining space ideal for exclusive dinners, business luncheons, or family celebrations. Curated menus, personalised service, and an elegant atmosphere make every gathering special.', features: ['Capacity: 10–30 Guests', 'Custom Menus', 'Personal Waiter', 'Elegant Setting', 'Corporate Lunches', 'Private Events'] },
]

export default function BanquetsPage() {
  return (
    <>
      <SharedHeader />

      <PageHero
        bg={bannerBg(['/assets/images/dining/conferencehall.png'], '/assets/images/dining/conferencehall.png')}
        kicker="Events & Gatherings"
        title="Banquets & Conference"
        crumbs={[{ label: 'Banquets' }]}
      />

      {/* Intro */}
      <section style={{ background: '#fff', padding: '90px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInRight" style={{ order: 2 }}>
              <img src="/assets/images/dining/banquets.webp" alt="Banquet Hall" style={{ width: '100%', borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,.12)' }} />
            </div>
            <div className="col-lg-6 wow fadeInLeft" style={{ order: 1 }}>
              <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Events & Gatherings</span>
              <h2 style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>Celebrate Every Moment in Grand Style</h2>
              <div style={{ width: 60, height: 2, background: '#cda434', marginBottom: 24 }}></div>
              <p style={{ color: '#6b7280', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
                From intimate corporate meetings to grand wedding receptions, The ParkQueen Hotel&apos;s banquet and conference facilities are designed to make every occasion extraordinary. Our dedicated event management team handles every detail — from décor to catering — ensuring a flawless experience.
              </p>
              <p style={{ color: '#6b7280', lineHeight: 1.9, fontSize: 15, marginBottom: 28 }}>
                With state-of-the-art audiovisual equipment, flexible seating arrangements, and personalised catering menus, we cater to events of all sizes and types — weddings, corporate meets, social celebrations, product launches, and more.
              </p>
              <div className="row g-3">
                {[['fa-champagne-glasses', 'Weddings'], ['fa-briefcase', 'Corporate Events'], ['fa-birthday-cake', 'Celebrations'], ['fa-microphone', 'Seminars']].map(([icon, label]) => (
                  <div key={label} className="col-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8f9fa', borderRadius: 8, padding: '12px 16px' }}>
                      <i className={`fa-solid ${icon}`} style={{ color: '#cda434', fontSize: 18 }}></i>
                      <span style={{ color: '#1a1c2e', fontWeight: 600, fontSize: 13 }}>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues */}
      <section style={{ background: '#f4f6f9', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Our Venues</span>
            <h2 className="wow fadeInUp" style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, margin: 0 }}>EVENT SPACES</h2>
            <div style={{ width: 60, height: 2, background: '#cda434', margin: '14px auto 0' }}></div>
          </div>
          <div className="row g-4">
            {VENUES.map((v, i) => (
              <div key={i} className="col-lg-4 wow fadeInUp" data-wow-delay={`.${i+2}s`}>
                <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.07)', height: '100%' }}>
                  <div style={{ background: '#1a1c2e', padding: '32px 28px' }}>
                    <i className={`fa-solid ${v.icon}`} style={{ color: '#cda434', fontSize: 36, marginBottom: 14, display: 'block' }}></i>
                    <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{v.name}</h3>
                    <p style={{ color: '#cda434', fontSize: 13, fontWeight: 600, margin: 0 }}>{v.capacity}</p>
                  </div>
                  <div style={{ padding: '24px 28px' }}>
                    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{v.desc}</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {v.features.map((f, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, color: '#374151' }}>
                          <i className="fa-solid fa-circle-check" style={{ color: '#cda434', fontSize: 13 }}></i>{f}
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" className="theme-btn" style={{ display: 'block', textAlign: 'center', marginTop: 20 }}>ENQUIRE NOW</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1a1c2e', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Plan Your Event</span>
          <h2 className="wow fadeInUp" style={{ color: '#fff', fontSize: 34, fontWeight: 700, marginBottom: 20 }}>Let Us Make Your Event Extraordinary</h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 15, maxWidth: 580, margin: '0 auto 32px', lineHeight: 1.8 }}>
            Contact our dedicated events team to discuss your requirements, get a customised package, and start planning your perfect event at The ParkQueen Hotel.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="theme-btn">GET IN TOUCH</a>
            <a href="tel:+919088809991" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', border: '2px solid #cda434', color: '#cda434', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
              <i className="fa-solid fa-phone"></i> +91 9088809991
            </a>
          </div>
        </div>
      </section><footer className="footer-section fix bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><div className="footer-bottom"><div className="footer-wrapper">
          <div className="social-icon"><a href="https://www.linkedin.com/in/parkqueen-hotels-and-resorts-9a2532400/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a><a href="https://www.instagram.com/parkqueenhotel_rohtak/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a><a href="https://www.facebook.com/hotelparkqueen/#" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></div>
          <ul className="footer-list"><li><a href="/about">About Us</a></li><li>/</li><li><a href="/rooms">Rooms</a></li><li>/</li><li><a href="/contact">Contact Us</a></li></ul>
          <p>Copyright&copy; <span>The ParkQueen Hotel</span></p>
        </div>
        <a href="/" className="footer-logo"><img style={{ width: '18rem' }} src="/assets/images/logo.png" alt="The ParkQueen Hotel" /></a>
        </div></div>
      </footer>
    </>
  )
}
