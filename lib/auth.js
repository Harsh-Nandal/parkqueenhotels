import crypto from 'crypto'

// No hardcoded fallbacks — env vars must be set
const SECRET   = process.env.ADMIN_SECRET   || ''
const PASSWORD = process.env.ADMIN_PASSWORD || ''

export function makeToken() {
  return crypto.createHmac('sha256', SECRET).update('admin:authenticated').digest('hex')
}

export function verifyAuth(request) {
  if (!SECRET) return false
  const token = request.cookies.get('admin_token')?.value
  return !!token && token === makeToken()
}

export function verifyPassword(pw) {
  if (!PASSWORD || !pw) return false
  // Constant-time comparison to prevent timing attacks
  try {
    const expected = Buffer.from(PASSWORD, 'utf8')
    const actual   = Buffer.from(pw,       'utf8')
    if (expected.length !== actual.length) return false
    return crypto.timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}
