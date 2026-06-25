/**
 * Safely extract a URL string from either:
 *   - a plain string:              "/assets/img/foo.jpg"
 *   - a Cloudinary object:         { url: "https://...", public_id: "..." }
 *   - null / undefined:            returns fallback
 */
export function imgUrl(val, fallback = '') {
  if (!val) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'object' && val.url) return val.url
  return fallback
}

/**
 * Banner/breadcrumb background resolver.
 * Accepts an array of candidate sources (hero img, content img, etc.) and
 * returns the first one that is a REAL uploaded image — i.e. NOT from the
 * template /assets/img/ folder. Falls back to the hotel image provided.
 *
 * Usage:
 *   bannerBg([hero?.backgroundImage, breadcrumbBg], '/assets/images/home/NDS_5148.jpg')
 */
export function bannerBg(sources, fallback = '') {
  for (const src of (Array.isArray(sources) ? sources : [sources])) {
    if (!src) continue
    const url = typeof src === 'string' ? src : src?.url
    // Skip blank or any path inside the old template /assets/img/ directory
    if (url && !url.startsWith('/assets/img/')) return url
  }
  return fallback
}
