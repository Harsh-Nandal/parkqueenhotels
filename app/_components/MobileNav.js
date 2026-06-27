'use client'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About Us' },
  { href: '/rooms',      label: 'Rooms' },
  { href: '/dining',     label: 'Dining' },
  { href: '/banquets',   label: 'Banquets' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/booking',    label: 'Book Now' },
  { href: '/contact',    label: 'Contact Us' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="d-xl-none" style={{ margin: '8px 0 20px' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {LINKS.map(link => {
          const active = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
          return (
            <li key={link.href} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <a
                href={link.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '13px 4px',
                  color: active ? '#cda434' : '#1a1c2e',
                  textDecoration: 'none', fontSize: 15,
                  fontWeight: active ? 700 : 500, letterSpacing: '0.3px',
                  transition: 'color 0.2s',
                }}
              >
                {active && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cda434', flexShrink: 0 }} />}
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
