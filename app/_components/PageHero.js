const NAVY = '#0B132B'
const GOLD = '#D4AF37'

/**
 * Shared hero/breadcrumb section matching the About page's styling —
 * full-bleed image, navy gradient overlay, gold kicker + breadcrumb trail.
 *
 * crumbs: array of { label, href? } rendered after "Home". The last item
 * is typically the current page (no href).
 */
export default function PageHero({ bg, kicker, title, crumbs = [] }) {
  return (
    <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(11,19,43,.55) 0%, rgba(11,19,43,.75) 70%, ${NAVY} 100%)`, zIndex: 1 }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '160px 24px 64px' }}>
        {kicker && (
          <span className="wow fadeInUp" style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 18 }}>
            {kicker}
          </span>
        )}
        <h1 className="wow fadeInUp" data-wow-delay=".15s" style={{ color: '#fff', fontSize: 'clamp(34px, 5.5vw, 64px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 22px', maxWidth: 820 }}>
          {title}
        </h1>
        <ul className="wow fadeInUp" data-wow-delay=".3s" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,.7)', fontSize: 13 }}>
          <li><a href="/" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>Home</a></li>
          {crumbs.map((c, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: GOLD }}>/</span>
              {c.href ? (
                <a href={c.href} style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>{c.label}</a>
              ) : (
                <span style={{ color: GOLD }}>{c.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
