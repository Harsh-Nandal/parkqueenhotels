'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

const NAV = [
  { href: '/',           label: 'Home',       exact: true },
  { href: '/about',      label: 'About Us' },
  { href: '/rooms',      label: 'Rooms' },
  { href: '/dining',     label: 'Dining' },
  { href: '/banquets',   label: 'Banquets' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/contact',    label: 'Contact Us' },
]

const DEFAULTS = {
  phone: '+91 9088809991',
  email: 'info@parkqueenhotels.com',
  social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
}

export default function SharedHeader() {
  const pathname   = usePathname()
  const [settings, setSettings] = useState(null)
  const [scrolled, setScrolled]  = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.data) setSettings(d.data) })
      .catch(() => {})

    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phone  = settings?.phone?.[0]   || DEFAULTS.phone
  const email  = settings?.email?.[0]   || DEFAULTS.email
  const social = settings?.social       || DEFAULTS.social

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      <button id="back-top" className="back-to-top show"><i className="fa-regular fa-arrow-up"></i></button>
      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner"></div>

      {/* ── Offcanvas sidebar ────────────────────────────────────── */}
      <div className="fix-area">
        <div className="offcanvas__info">
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <a href="/"><img style={{ width: '14rem' }} src="/assets/images/logo.png" alt="The ParkQueen Hotel" /></a>
                </div>
                <div className="offcanvas__close"><button><i className="fas fa-times"></i></button></div>
              </div>
              <MobileNav />
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,.08)' }}>
                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>Contact</p>
                <a href={`tel:${phone.replace(/\s/g,'')}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1a1c2e', fontSize: 13, textDecoration: 'none', marginBottom: 8 }}>
                  <i className="fa-solid fa-phone" style={{ color: '#cda434', fontSize: 12 }}></i>{phone}
                </a>
                <a href={`mailto:${email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1a1c2e', fontSize: 13, textDecoration: 'none' }}>
                  <i className="fa-solid fa-envelope" style={{ color: '#cda434', fontSize: 12 }}></i>{email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas__overlay"></div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <header
        id="header-sticky"
        style={{
          width: '100%',
          background: (isHome && !scrolled) ? 'transparent' : '#1a1c2e',
          boxShadow: (isHome && !scrolled) ? 'none' : '0 4px 20px rgba(0,0,0,.3)',
          transition: 'background .4s ease, box-shadow .4s ease',
          position: isHome ? 'absolute' : 'relative',
          top: 0, left: 0, right: 0,
          zIndex: 100,
        }}
      >
        <div style={{
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 72,
          gap: 32,
        }}>

          {/* ── Logo (left) ─────────────────────── */}
          <a href="/" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
            <img
              src="/assets/images/logo.png"
              alt="The ParkQueen Hotel"
              style={{ height: 52, width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* ── Nav + Book Now (right) ──────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginLeft: 'auto' }}>

            {/* Desktop nav */}
            <nav className="d-none d-xl-flex" style={{ alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV.map(link => {
                const active = isActive(link.href, link.exact)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'inline-block',
                      padding: '8px 14px',
                      fontSize: 12,
                      fontWeight: active ? 700 : 400,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: active ? '#cda434' : 'rgba(255,255,255,.82)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color .2s',
                      borderBottom: active ? '2px solid #cda434' : '2px solid transparent',
                      background: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#cda434' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,.82)' }}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            {/* Divider */}
            <div className="d-none d-xl-block" style={{ width: 1, height: 28, background: 'rgba(205,164,52,.3)', margin: '0 20px' }}></div>

            {/* BOOK NOW */}
            <a href="/booking" className="d-none d-xl-block" style={{
              padding: '9px 22px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              border: '2px solid #cda434',
              color: '#cda434',
              borderRadius: 4,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all .25s',
              background: 'transparent',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#cda434'; e.currentTarget.style.color = '#1a1c2e' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cda434' }}
            >
              BOOK NOW
            </a>

            {/* Mobile: phone + hamburger */}
            <a href={`tel:${phone.replace(/\s/g,'')}`} className="d-none d-md-flex d-xl-none" style={{ alignItems: 'center', gap: 6, color: '#cda434', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
              <i className="fa-solid fa-phone" style={{ fontSize: 14 }}></i>{phone}
            </a>
            <div className="header__hamburger d-xl-none" style={{ marginLeft: 16 }}>
              <div className="sidebar__toggle" style={{ color: '#cda434', fontSize: 22, cursor: 'pointer' }}>
                <i className="fas fa-bars"></i>
              </div>
            </div>
          </div>

        </div>
      </header>
    </>
  )
}
