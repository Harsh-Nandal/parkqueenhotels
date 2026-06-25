'use client'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About Us' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/service',    label: 'Service' },
  { href: '/news',       label: 'Blog' },
  { href: '/contact',    label: 'Contact Us' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="d-xl-none" style={{ margin: '8px 0 16px' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {LINKS.map(link => {
          const active = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
          return (
            <li key={link.href} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <a
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 6px',
                  color: active ? '#cda434' : '#1a1c2e',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: active ? 700 : 500,
                  letterSpacing: '0.3px',
                }}
              >
                {active && (
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#cda434', flexShrink: 0 }} />
                )}
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
