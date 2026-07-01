'use client'

const NAVY = '#1a1c2e'
const GOLD = '#cda434'

const NAV_LINKS = [
  { label: 'Home',       href: '/'          },
  { label: 'About Us',   href: '/about'     },
  { label: 'Rooms',      href: '/rooms'     },
  { label: 'Dining',     href: '/dining'    },
  { label: 'Banquets',   href: '/banquets'  },
  { label: 'Facilities', href: '/facilities'},
  { label: 'Gallery',    href: '/gallery'   },
  { label: 'News',       href: '/news'      },
  { label: 'Contact',    href: '/contact'   },
]

const SERVICES = [
  { label: 'Room Booking',        href: '/rooms'     },
  { label: 'Fine Dining',         href: '/dining'    },
  { label: 'Bar & Lounge',        href: '/dining'    },
  { label: 'Banquet Hall',        href: '/banquets'  },
  { label: 'Wedding Venue',       href: '/banquets'  },
  { label: 'Conference Facility', href: '/banquets'  },
  { label: 'Photo Gallery',       href: '/gallery'   },
  { label: 'Online Booking',      href: '/booking'   },
]

const SOCIALS = [
  { icon: 'fa-instagram',   href: 'https://www.instagram.com/parkqueenhotel_rohtak/?hl=en',                 label: 'Instagram'  },
  { icon: 'fa-facebook-f',  href: 'https://www.facebook.com/hotelparkqueen/#',                              label: 'Facebook'   },
  { icon: 'fa-linkedin',    href: 'https://www.linkedin.com/in/parkqueen-hotels-and-resorts-9a2532400/',    label: 'LinkedIn'   },
  { icon: 'fa-twitter',     href: 'https://x.com/parkqueenhotel_',                                         label: 'Twitter'    },
]

const AWARDS = [
  { icon: 'fa-star',             text: '5-Star Rated'         },
  { icon: 'fa-award',            text: 'Best Hotel Rohtak'    },
  { icon: 'fa-shield-halved',    text: 'Verified & Trusted'   },
  { icon: 'fa-thumbs-up',        text: '25K+ Happy Guests'    },
  { icon: 'fa-crown',            text: 'Premium Hospitality'  },
]

export default function Footer() {
  return (
    <footer style={{ background: NAVY, position: 'relative', overflow: 'hidden', fontFamily: 'inherit' }}>

      {/* ── Decorative background circles ───────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -180, right: -180, width: 560, height: 560, borderRadius: '50%', border: `1px solid rgba(205,164,52,.07)`, pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: -80,  right: -80,  width: 360, height: 360, borderRadius: '50%', border: `1px solid rgba(205,164,52,.05)`, pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 40, left: -160, width: 480, height: 480, borderRadius: '50%', border: `1px solid rgba(205,164,52,.06)`, pointerEvents: 'none' }} />

      {/* ── TOP GOLD ACCENT BAR ──────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, height: 1 }} />

      {/* ── AWARDS STRIP ─────────────────────────────────────────────── */}
      <div style={{ background: 'rgba(205,164,52,.06)', borderBottom: '1px solid rgba(205,164,52,.12)', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 32px' }}>
            {AWARDS.map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className={`fa-solid ${icon}`} style={{ color: GOLD, fontSize: 13 }} />
                <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 11.5, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ─────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: 72, paddingBottom: 60 }}>
        <div className="row g-5">

          {/* ── Column 1 — Brand ──────────────────────────────────────── */}
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".1s">
            {/* Logo */}
            <a href="/" style={{ display: 'inline-block', marginBottom: 22 }}>
              <img src="/assets/images/logo.png" alt="The ParkQueen Hotel" style={{ width: 180, objectFit: 'contain' }} />
            </a>

            {/* Gold ornament */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ flex: '0 0 36px', height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <span style={{ color: GOLD, fontSize: 14 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </div>

            <p style={{ color: 'rgba(255,255,255,.62)', fontSize: 14, lineHeight: 1.9, margin: '0 0 28px' }}>
              Rohtak&apos;s premier luxury destination — where every detail is crafted to deliver warmth, elegance, and an experience that stays with you long after you leave.
            </p>

            {/* Contact pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                { icon: 'fa-phone',        text: '+91 9088809991',             href: 'tel:+919088809991'              },
                { icon: 'fa-envelope',     text: 'info@parkqueenhotels.com',   href: 'mailto:info@parkqueenhotels.com'},
                { icon: 'fa-location-dot', text: 'Delhi Bypass, Rohtak 124001',href: '/contact'                      },
              ].map(({ icon, text, href }) => (
                <a key={text} href={href} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'rgba(255,255,255,.72)', fontSize: 13, transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.72)'}
                >
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(205,164,52,.1)', border: `1px solid rgba(205,164,52,.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s' }}>
                    <i className={`fa-solid ${icon}`} style={{ color: GOLD, fontSize: 12 }} />
                  </div>
                  {text}
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid rgba(205,164,52,.3)`, background: 'rgba(205,164,52,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.7)', fontSize: 14, textDecoration: 'none', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = NAVY; e.currentTarget.style.borderColor = GOLD }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(205,164,52,.06)'; e.currentTarget.style.color = 'rgba(255,255,255,.7)'; e.currentTarget.style.borderColor = 'rgba(205,164,52,.3)' }}
                >
                  <i className={`fa-brands ${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2 — Navigation ─────────────────────────────────── */}
          <div className="col-lg-2 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
            <FooterHeading>Quick Links</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{ color: 'rgba(255,255,255,.62)', fontSize: 13.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color .2s, gap .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.gap = '12px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.62)'; e.currentTarget.style.gap = '8px' }}
                  >
                    <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3 — Services ───────────────────────────────────── */}
          <div className="col-lg-2 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".3s">
            <FooterHeading>Our Services</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} style={{ color: 'rgba(255,255,255,.62)', fontSize: 13.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color .2s, gap .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.gap = '12px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.62)'; e.currentTarget.style.gap = '8px' }}
                  >
                    <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4 — Hotel Info ─────────────────────────────────── */}
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
            <FooterHeading>Hotel Information</FooterHeading>

            {/* Check-in / Check-out cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Check In',  time: '12:00 PM', icon: 'fa-right-to-bracket' },
                { label: 'Check Out', time: '11:00 AM', icon: 'fa-right-from-bracket'},
              ].map(({ label, time, icon }) => (
                <div key={label} style={{ background: 'rgba(205,164,52,.07)', border: '1px solid rgba(205,164,52,.15)', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                  <i className={`fa-solid ${icon}`} style={{ color: GOLD, fontSize: 18, marginBottom: 8, display: 'block' }} />
                  <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>{time}</div>
                </div>
              ))}
            </div>

            {/* 24/7 badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(205,164,52,.07)', border: '1px solid rgba(205,164,52,.15)', borderRadius: 10, padding: '14px 16px', marginBottom: 24 }}>
              <i className="fa-solid fa-clock" style={{ color: GOLD, fontSize: 20, flexShrink: 0 }} />
              <div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Open 24 Hours / 7 Days</div>
                <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, marginTop: 2 }}>Front desk always available for you</div>
              </div>
            </div>

            {/* Newsletter */}
            <FooterHeading style={{ marginTop: 0 }}>Stay In Touch</FooterHeading>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
              Subscribe for exclusive offers &amp; updates.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{ flex: 1, background: 'rgba(255,255,255,.07)', border: `1px solid rgba(205,164,52,.2)`, borderRight: 'none', borderRadius: '6px 0 0 6px', padding: '11px 14px', color: '#fff', fontSize: 13, outline: 'none' }}
              />
              <button type="submit" style={{ background: GOLD, color: NAVY, border: 'none', borderRadius: '0 6px 6px 0', padding: '11px 16px', fontWeight: 700, fontSize: 12, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase', flexShrink: 0, transition: 'opacity .2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────────── */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', borderTop: '1px solid rgba(205,164,52,.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ position: 'absolute', background: NAVY, padding: '0 18px', color: GOLD, fontSize: 18 }}>✦</span>
        </div>
      </div>

      {/* ── FOOTER BOTTOM BAR ────────────────────────────────────────── */}
      <div style={{ padding: '28px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>

            {/* Copyright */}
            <p style={{ margin: 0, color: 'rgba(255,255,255,.4)', fontSize: 12.5, letterSpacing: '.5px' }}>
              &copy; {new Date().getFullYear()} <a href="/" style={{ color: GOLD, textDecoration: 'none', fontWeight: 600 }}>The ParkQueen Hotel</a>. All rights reserved.
            </p>

            {/* Center — Book Now pill */}
            <a href="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, fontSize: 11.5, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 22px', borderRadius: 40, textDecoration: 'none', transition: 'opacity .2s', boxShadow: `0 4px 18px rgba(205,164,52,.35)` }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <i className="fa-regular fa-calendar-check" style={{ fontSize: 13 }} />
              Book Your Stay
            </a>

            {/* Legal links */}
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { label: 'Privacy Policy', href: '/contact' },
                { label: 'Terms of Use',   href: '/contact' },
                { label: 'Contact Us',     href: '/contact' },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{ color: 'rgba(255,255,255,.38)', fontSize: 12, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.38)'}
                >
                  {label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM GOLD LINE ──────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, height: 1 }} />

    </footer>
  )
}

function FooterHeading({ children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h5 style={{ color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 10px' }}>
        {children}
      </h5>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 28, height: 2, background: GOLD, borderRadius: 2 }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
        <div style={{ width: 14, height: 2, background: `rgba(205,164,52,.3)`, borderRadius: 2 }} />
      </div>
    </div>
  )
}
