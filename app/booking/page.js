'use client'
import { useState, useMemo } from 'react'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import Footer from '@/app/_components/Footer'

const NAVY = '#1a1c2e'
const GOLD = '#cda434'

const ROOMS = [
  { value: 'Executive Room',     label: 'Executive Room',     single: 5000,  double: 5500  },
  { value: 'Superior Room',      label: 'Superior Room',      single: 5000,  double: 6000  },
  { value: 'Queen Suite',        label: 'Queen Suite',        single: 5500,  double: 6500  },
  { value: 'Presidential Suite', label: 'Presidential Suite', single: 6999,  double: 7499  },
]

const ARRIVAL_TIMES = [
  'Before 12:00 PM',
  '12:00 PM – 3:00 PM',
  '3:00 PM – 6:00 PM',
  '6:00 PM – 9:00 PM',
  'After 9:00 PM',
]

const FEATURES = [
  { icon: 'fa-lock',        title: 'Secure Booking',           desc: 'Simple, fast and fully secure — your data is protected at every step.' },
  { icon: 'fa-tag',         title: 'Best Rate Guarantee',      desc: 'Book directly with us for exclusive rates not available elsewhere.' },
  { icon: 'fa-headset',     title: '24 / 7 Support',           desc: 'Our front desk team is available round the clock to help with anything.' },
  { icon: 'fa-rotate-left', title: 'Flexible Cancellation',    desc: 'Plans change — enjoy peace of mind with our guest-friendly policy.' },
]

const EMPTY = {
  name: '', email: '', phone: '',
  checkIn: '', checkOut: '',
  roomType: '',
  adults: '1', children: '0',
  arrivalTime: '',
  specialRequests: '',
}

const today = new Date().toISOString().split('T')[0]

function addDays(dateStr, n) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

function nightsBetween(a, b) {
  if (!a || !b) return 0
  const diff = new Date(b) - new Date(a)
  return Math.max(0, Math.round(diff / 86400000))
}

function fmtDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BookingPage() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('')
  const [ref, setRef] = useState('')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function handleCheckIn(val) {
    // Auto-clear checkout if it's now before the new minimum
    const newMin = addDays(val, 1)
    setForm(f => ({
      ...f,
      checkIn: val,
      checkOut: f.checkOut && f.checkOut <= val ? '' : f.checkOut,
    }))
    void newMin
  }

  const minCheckout = form.checkIn ? addDays(form.checkIn, 1) : addDays(today, 1)

  const nights = useMemo(() => nightsBetween(form.checkIn, form.checkOut), [form.checkIn, form.checkOut])

  const selectedRoom = ROOMS.find(r => r.value === form.roomType)
  const adultsCount  = parseInt(form.adults)  || 1
  const pricePerNight = selectedRoom
    ? (adultsCount >= 2 ? selectedRoom.double : selectedRoom.single)
    : null
  const totalPrice = pricePerNight && nights > 0 ? pricePerNight * nights : null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus('error'); setMsg('Please fill in your name, email, and phone.'); return
    }
    if (!form.checkIn || !form.checkOut) {
      setStatus('error'); setMsg('Please select check-in and check-out dates.'); return
    }
    if (!form.roomType) {
      setStatus('error'); setMsg('Please select a room type.'); return
    }
    setStatus('loading')
    try {
      const messageParts = [
        `Adults: ${form.adults}, Children: ${form.children}`,
        form.arrivalTime    ? `Estimated arrival: ${form.arrivalTime}` : '',
        form.specialRequests ? `Special requests: ${form.specialRequests}` : '',
      ].filter(Boolean)

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          roomType: form.roomType,
          guests:   adultsCount + (parseInt(form.children) || 0),
          checkIn:  form.checkIn,
          checkOut: form.checkOut,
          message:  messageParts.join('\n'),
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setRef(data.data?.bookingRef || '')
        setMsg('Your booking request has been submitted successfully!')
        setForm(EMPTY)
      } else {
        setStatus('error')
        setMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMsg('Network error. Please try again.')
    }
  }

  const inp = {
    display: 'block', width: '100%', padding: '12px 16px',
    border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14,
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
    background: '#fff', color: '#1a1c2e', transition: 'border-color .2s',
  }
  const lbl = {
    display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280',
    marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px',
  }
  const focus = e => { e.target.style.borderColor = GOLD }
  const blur  = e => { e.target.style.borderColor = '#e5e7eb' }

  return (
    <>
      <SharedHeader />

      <PageHero
        bg="/assets/images/about/subhero.png"
        kicker="Reserve Your Stay"
        title="Book Your Room"
        crumbs={[{ label: 'Booking' }]}
      />

      {/* ── Why Book With Us ──────────────────────────────────── */}
      <section style={{ background: NAVY, padding: '44px 0' }}>
        <div className="container">
          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay={`.${i + 1}s`}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(205,164,52,.1)', border: '1px solid rgba(205,164,52,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fa-solid ${f.icon}`} style={{ color: GOLD, fontSize: 16 }} />
                  </div>
                  <div>
                    <h5 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{f.title}</h5>
                    <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Section ──────────────────────────────────────── */}
      <section style={{ background: '#f4f6f9', padding: '80px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-start">

            {/* ── LEFT: Form ────────────────────────────────── */}
            <div className="col-lg-8 wow fadeInLeft">
              <div style={{ background: '#fff', borderRadius: 16, padding: '40px', boxShadow: '0 4px 32px rgba(0,0,0,.07)' }}>

                {/* Heading */}
                <div style={{ marginBottom: 32 }}>
                  <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>The ParkQueen Hotel · Rohtak</span>
                  <h2 style={{ color: NAVY, fontSize: 26, fontWeight: 800, margin: '8px 0 0' }}>Complete Your Booking</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                    <div style={{ width: 36, height: 2, background: GOLD, borderRadius: 2 }} />
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
                    <div style={{ width: 16, height: 2, background: 'rgba(205,164,52,.3)', borderRadius: 2 }} />
                  </div>
                </div>

                {/* ── SUCCESS STATE ── */}
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: 36 }} />
                    </div>
                    <h3 style={{ color: NAVY, fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Booking Request Submitted!</h3>
                    {ref && (
                      <div style={{ background: NAVY, borderRadius: 10, padding: '16px 28px', display: 'inline-block', margin: '12px 0' }}>
                        <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>Your Booking Reference</div>
                        <div style={{ color: GOLD, fontSize: 28, fontWeight: 800, letterSpacing: 4, marginTop: 4 }}>{ref}</div>
                      </div>
                    )}
                    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8, margin: '16px 0 8px' }}>
                      Thank you for choosing The ParkQueen Hotel. We&apos;ve received your request and will confirm within 12 hours via email and phone.
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 28 }}>
                      Immediate help? Call <a href="tel:+919088809991" style={{ color: GOLD, fontWeight: 700 }}>+91 9088809991</a>
                    </p>
                    <button onClick={() => setStatus(null)} className="theme-btn">MAKE ANOTHER BOOKING</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>

                    {/* Error banner */}
                    {status === 'error' && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 24, color: '#dc2626', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fa-solid fa-triangle-exclamation" /> {msg}
                      </div>
                    )}

                    {/* ── SECTION 1: Guest Details ── */}
                    <SectionHeading icon="fa-user" title="Guest Details" />
                    <div className="row g-3" style={{ marginBottom: 28 }}>
                      <div className="col-12">
                        <label style={lbl}>Full Name *</label>
                        <input style={inp} placeholder="e.g. Rajesh Sharma" value={form.name}
                          onChange={e => set('name', e.target.value)} onFocus={focus} onBlur={blur} required />
                      </div>
                      <div className="col-md-6">
                        <label style={lbl}>Email Address *</label>
                        <input type="email" style={inp} placeholder="you@example.com" value={form.email}
                          onChange={e => set('email', e.target.value)} onFocus={focus} onBlur={blur} required />
                      </div>
                      <div className="col-md-6">
                        <label style={lbl}>Phone Number *</label>
                        <input style={inp} placeholder="+91 9XXXXXXXXX" value={form.phone}
                          onChange={e => set('phone', e.target.value)} onFocus={focus} onBlur={blur} required />
                      </div>
                    </div>

                    {/* ── SECTION 2: Stay Details ── */}
                    <SectionHeading icon="fa-calendar-days" title="Stay Details" />
                    <div className="row g-3" style={{ marginBottom: 28 }}>
                      <div className="col-md-6">
                        <label style={lbl}>Check-In Date *</label>
                        <input type="date" style={inp} value={form.checkIn} min={today}
                          onChange={e => handleCheckIn(e.target.value)} onFocus={focus} onBlur={blur} required />
                      </div>
                      <div className="col-md-6">
                        <label style={lbl}>Check-Out Date *</label>
                        <input type="date" style={inp} value={form.checkOut} min={minCheckout}
                          onChange={e => set('checkOut', e.target.value)} onFocus={focus} onBlur={blur} required />
                      </div>

                      {/* Live nights badge */}
                      {nights > 0 && (
                        <div className="col-12">
                          <div style={{ background: 'rgba(205,164,52,.08)', border: '1px solid rgba(205,164,52,.25)', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <i className="fa-solid fa-moon" style={{ color: GOLD, fontSize: 14 }} />
                            <span style={{ color: NAVY, fontSize: 13, fontWeight: 600 }}>
                              {nights} night{nights !== 1 ? 's' : ''} &nbsp;·&nbsp; {fmtDate(form.checkIn)} → {fmtDate(form.checkOut)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="col-12">
                        <label style={lbl}>Room Type *</label>
                        <select style={{ ...inp, cursor: 'pointer' }} value={form.roomType}
                          onChange={e => set('roomType', e.target.value)} onFocus={focus} onBlur={blur} required>
                          <option value="">Select a room type</option>
                          {ROOMS.map(r => (
                            <option key={r.value} value={r.value}>
                              {r.label} — from ₹{r.single.toLocaleString('en-IN')} / night
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label style={lbl}>Adults *</label>
                        <select style={{ ...inp, cursor: 'pointer' }} value={form.adults}
                          onChange={e => set('adults', e.target.value)} onFocus={focus} onBlur={blur}>
                          {[1, 2, 3, 4].map(n => (
                            <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label style={lbl}>Children</label>
                        <select style={{ ...inp, cursor: 'pointer' }} value={form.children}
                          onChange={e => set('children', e.target.value)} onFocus={focus} onBlur={blur}>
                          {[0, 1, 2, 3].map(n => (
                            <option key={n} value={n}>{n === 0 ? 'No children' : `${n} Child${n > 1 ? 'ren' : ''}`}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label style={lbl}>Expected Arrival</label>
                        <select style={{ ...inp, cursor: 'pointer' }} value={form.arrivalTime}
                          onChange={e => set('arrivalTime', e.target.value)} onFocus={focus} onBlur={blur}>
                          <option value="">Select (optional)</option>
                          {ARRIVAL_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* ── SECTION 3: Special Requests ── */}
                    <SectionHeading icon="fa-comment-dots" title="Special Requests" optional />
                    <div style={{ marginBottom: 32 }}>
                      <textarea
                        style={{ ...inp, minHeight: 96, resize: 'vertical' }}
                        placeholder="Early check-in, extra pillows, dietary requirements, anniversary decoration…"
                        value={form.specialRequests}
                        onChange={e => set('specialRequests', e.target.value)}
                        onFocus={focus} onBlur={blur}
                      />
                      <p style={{ color: '#9ca3af', fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
                        Children below 5 yrs: Free &nbsp;·&nbsp; 5–14 yrs: ₹1,500 + taxes &nbsp;·&nbsp; Above 14 yrs: ₹1,800 + taxes
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        width: '100%', padding: '16px', background: GOLD, color: NAVY,
                        border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800,
                        letterSpacing: 2, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        opacity: status === 'loading' ? .75 : 1, transition: 'opacity .2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      }}
                    >
                      {status === 'loading'
                        ? <><i className="fa-solid fa-spinner fa-spin" /> Submitting…</>
                        : <><i className="fa-regular fa-calendar-check" /> Submit Booking Request</>
                      }
                    </button>
                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 10 }}>
                      Our team confirms every request within 12 hours via email &amp; phone.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── RIGHT: Sidebar ────────────────────────────── */}
            <div className="col-lg-4 wow fadeInRight" style={{ position: 'sticky', top: 100 }}>

              {/* Live Booking Summary */}
              <div style={{ background: NAVY, borderRadius: 14, padding: '28px', marginBottom: 20 }}>
                <h4 style={{ color: GOLD, fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Booking Summary</h4>

                {/* Room tariff cards — clickable to select */}
                {ROOMS.map(r => {
                  const isSelected = form.roomType === r.value
                  return (
                    <button key={r.value} type="button" onClick={() => set('roomType', r.value)} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                      padding: '11px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer', textAlign: 'left',
                      background: isSelected ? 'rgba(205,164,52,.18)' : 'rgba(255,255,255,.05)',
                      border: `1.5px solid ${isSelected ? GOLD : 'rgba(255,255,255,.08)'}`,
                      transition: 'all .2s',
                    }}>
                      <div>
                        <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{r.label}</div>
                        <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, marginTop: 2 }}>Single / Double</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: GOLD, fontWeight: 700, fontSize: 12 }}>₹{r.single.toLocaleString('en-IN')}</div>
                        <div style={{ color: 'rgba(205,164,52,.6)', fontSize: 10 }}>/ ₹{r.double.toLocaleString('en-IN')}</div>
                      </div>
                    </button>
                  )
                })}

                {/* Dynamic price estimate */}
                {totalPrice && nights > 0 ? (
                  <div style={{ marginTop: 16, borderTop: '1px solid rgba(205,164,52,.2)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 12 }}>₹{pricePerNight?.toLocaleString('en-IN')} × {nights} night{nights !== 1 ? 's' : ''}</span>
                      <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 12 }}>GST (est.)</span>
                      <span style={{ color: '#fff', fontSize: 12 }}>As applicable</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px dashed rgba(205,164,52,.25)' }}>
                      <span style={{ color: GOLD, fontSize: 13, fontWeight: 700 }}>Estimated Total</span>
                      <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>₹{totalPrice.toLocaleString('en-IN')}+</span>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 11, margin: '12px 0 0', lineHeight: 1.6 }}>
                    Select a room and dates above to see your price estimate.
                  </p>
                )}
              </div>

              {/* Contact Card */}
              <div style={{ background: '#fff', borderRadius: 14, padding: '24px', marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,.06)', border: '1px solid #e5e7eb' }}>
                <h4 style={{ color: NAVY, fontSize: 13, fontWeight: 800, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>Need Help?</h4>
                {[
                  { icon: 'fa-phone',        label: '+91 9088809991',           sub: '24 / 7 front desk',       href: 'tel:+919088809991'                   },
                  { icon: 'fa-envelope',     label: 'info@parkqueenhotels.com', sub: 'We reply promptly',       href: 'mailto:info@parkqueenhotels.com'     },
                  { icon: 'fa-location-dot', label: 'Delhi Bypass, Rohtak',     sub: 'Haryana – 124001',        href: '/contact'                            },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < 2 ? 14 : 0, textDecoration: 'none' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#faf9f7', border: '1px solid #f0ede5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: GOLD, fontSize: 13 }} />
                    </div>
                    <div>
                      <div style={{ color: NAVY, fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 2 }}>{item.sub}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Policy card */}
              <div style={{ background: '#fffbeb', borderRadius: 14, padding: '22px', border: '1px solid #fde68a' }}>
                <h4 style={{ color: '#92400e', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fa-solid fa-circle-info" /> Hotel Policy
                </h4>
                {[
                  ['Check-In',     '12:00 PM onwards'],
                  ['Check-Out',    'By 11:00 AM'],
                  ['Cancellation', 'Contact front desk'],
                  ['Payment',      'All major cards'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: '#92400e', fontWeight: 700 }}>{k}</span>
                    <span style={{ color: NAVY, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function SectionHeading({ icon, title, optional }) {
  return (
    <h4 style={{
      color: '#1a1c2e', fontSize: 14, fontWeight: 800, marginBottom: 16,
      paddingBottom: 10, borderBottom: '1px solid #f3f4f6',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <i className={`fa-solid ${icon}`} style={{ color: '#cda434' }} />
      {title}
      {optional && <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 12, marginLeft: 2 }}>(optional)</span>}
    </h4>
  )
}
