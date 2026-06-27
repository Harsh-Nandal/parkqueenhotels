'use client'
import { useState } from 'react'
import { bannerBg } from '@/lib/imgUrl'
import SharedHeader from '@/app/_components/SharedHeader'

const ROOMS = [
  { value: 'Executive Room',     label: 'Executive Room',     price: '₹5,000 / Night' },
  { value: 'Superior Room',      label: 'Superior Room',      price: '₹5,000 / Night' },
  { value: 'Queen Suite',        label: 'Queen Suite',        price: '₹5,500 / Night' },
  { value: 'Presidential Suite', label: 'Presidential Suite', price: '₹6,999 / Night' },
]

const EMPTY = {
  name: '', email: '', phone: '',
  checkIn: '', checkOut: '',
  roomType: '', guests: '1', adults: '1', children: '0',
  specialRequests: '',
  arrivalTime: '',
}

const FEATURES = [
  { icon: 'fa-lock',          title: 'Easy & Secure Online Booking',   desc: 'Our booking process is simple, fast, and fully secure — your data is protected at every step.' },
  { icon: 'fa-tag',           title: 'Exclusive Discounts & Offers',    desc: 'Book directly with us to unlock the best rates and exclusive offers not available anywhere else.' },
  { icon: 'fa-headset',       title: '24/7 Customer Support',           desc: 'Our front desk team is available around the clock to assist you with any query or request.' },
  { icon: 'fa-rotate-left',   title: 'Flexible Cancellation Policies',  desc: 'We understand plans change. Enjoy peace of mind with our guest-friendly cancellation policy.' },
]

export default function BookingPage() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('')
  const [ref, setRef] = useState('')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  const today = new Date().toISOString().split('T')[0]
  const minCheckout = form.checkIn
    ? new Date(new Date(form.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today

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
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          roomType: form.roomType,
          guests: parseInt(form.guests) || 1,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          message: [
            form.arrivalTime ? `Estimated arrival: ${form.arrivalTime}` : '',
            form.children !== '0' ? `Children: ${form.children}` : '',
            form.specialRequests ? `Special requests: ${form.specialRequests}` : '',
          ].filter(Boolean).join('\n'),
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

  const inputStyle = {
    display: 'block', width: '100%', padding: '12px 16px',
    border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14,
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .2s',
    background: '#fff',
  }
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper bg-cover" style={{ backgroundImage: `url('${bannerBg(['/assets/images/home/NDS_5344.jpg'], '/assets/images/home/NDS_5148.jpg')}')` }}>
        <div className="container"><div className="page-heading">
          <div className="breadcrumb-sub-title"><h1 className="text-white wow fadeInUp">Book Your Stay</h1></div>
          <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
            <li><a href="/">Home</a></li><li><i className="fa-solid fa-chevron-right"></i></li><li>Booking</li>
          </ul>
        </div></div>
      </div>

      {/* ── Why Book With Us strip ──────────────────────────────── */}
      <section style={{ background: '#1a1c2e', padding: '48px 0' }}>
        <div className="container">
          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay={`.${i+1}s`}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(205,164,52,.12)', border: '1px solid rgba(205,164,52,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fa-solid ${f.icon}`} style={{ color: '#cda434', fontSize: 18 }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</h5>
                    <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ────────────────────────────────────────── */}
      <section style={{ background: '#f8f9fa', padding: '80px 0' }}>
        <div className="container">
          <div className="row g-5">

            {/* Left — form */}
            <div className="col-lg-8 wow fadeInLeft">
              <div style={{ background: '#fff', borderRadius: 16, padding: '40px', boxShadow: '0 4px 30px rgba(0,0,0,.07)' }}>
                <div style={{ marginBottom: 32 }}>
                  <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Reserve Your Room</span>
                  <h2 style={{ color: '#1a1c2e', fontSize: 28, fontWeight: 700, margin: '8px 0 0' }}>Complete Your Booking</h2>
                  <div style={{ width: 48, height: 2, background: '#cda434', marginTop: 12 }}></div>
                </div>

                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: 36 }}></i>
                    </div>
                    <h3 style={{ color: '#1a1c2e', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Booking Request Submitted!</h3>
                    {ref && (
                      <div style={{ background: '#1a1c2e', borderRadius: 10, padding: '16px 24px', display: 'inline-block', margin: '12px 0' }}>
                        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Your Booking Reference</div>
                        <div style={{ color: '#cda434', fontSize: 28, fontWeight: 800, letterSpacing: 4, marginTop: 4 }}>{ref}</div>
                      </div>
                    )}
                    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, margin: '16px 0 24px' }}>
                      Thank you for choosing The ParkQueen Hotel. We have received your booking request and sent a confirmation to your email. Our team will confirm within 12 hours.
                    </p>
                    <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 24 }}>
                      For immediate assistance call <a href="tel:+919088809991" style={{ color: '#cda434', fontWeight: 700 }}>+91 9088809991</a>
                    </p>
                    <button onClick={() => setStatus(null)} className="theme-btn">MAKE ANOTHER BOOKING</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {status === 'error' && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 24, color: '#dc2626', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fa-solid fa-triangle-exclamation"></i> {msg}
                      </div>
                    )}

                    {/* Guest Details */}
                    <div style={{ marginBottom: 28 }}>
                      <h4 style={{ color: '#1a1c2e', fontSize: 15, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fa-solid fa-user" style={{ color: '#cda434' }}></i> Guest Details
                      </h4>
                      <div className="row g-3">
                        <div className="col-12">
                          <label style={labelStyle}>Full Name *</label>
                          <input style={inputStyle} placeholder="e.g. Rajesh Sharma" value={form.name} onChange={e => set('name', e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#cda434'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} required />
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Email Address *</label>
                          <input type="email" style={inputStyle} placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#cda434'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} required />
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Phone Number *</label>
                          <input style={inputStyle} placeholder="+91 9XXXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#cda434'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} required />
                        </div>
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div style={{ marginBottom: 28 }}>
                      <h4 style={{ color: '#1a1c2e', fontSize: 15, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fa-solid fa-bed" style={{ color: '#cda434' }}></i> Stay Details
                      </h4>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label style={labelStyle}>Check-In Date *</label>
                          <input type="date" style={inputStyle} value={form.checkIn} min={today} onChange={e => set('checkIn', e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#cda434'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} required />
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Check-Out Date *</label>
                          <input type="date" style={inputStyle} value={form.checkOut} min={minCheckout} onChange={e => set('checkOut', e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#cda434'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} required />
                        </div>
                        <div className="col-12">
                          <label style={labelStyle}>Room Type *</label>
                          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.roomType} onChange={e => set('roomType', e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#cda434'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} required>
                            <option value="">Select a room type</option>
                            {ROOMS.map(r => (
                              <option key={r.value} value={r.value}>{r.label} — {r.price}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label style={labelStyle}>Total Guests</label>
                          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.guests} onChange={e => set('guests', e.target.value)}>
                            {[1,2,3,4].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label style={labelStyle}>Adults</label>
                          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.adults} onChange={e => set('adults', e.target.value)}>
                            {[1,2,3,4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label style={labelStyle}>Children</label>
                          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.children} onChange={e => set('children', e.target.value)}>
                            {[0,1,2,3].map(n => <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>)}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Expected Arrival Time</label>
                          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.arrivalTime} onChange={e => set('arrivalTime', e.target.value)}>
                            <option value="">Select time (optional)</option>
                            {['Before 12:00 PM','12:00 PM – 3:00 PM','3:00 PM – 6:00 PM','6:00 PM – 9:00 PM','After 9:00 PM'].map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div style={{ marginBottom: 32 }}>
                      <h4 style={{ color: '#1a1c2e', fontSize: 15, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fa-solid fa-comment-dots" style={{ color: '#cda434' }}></i> Special Requests
                        <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 12 }}>(optional)</span>
                      </h4>
                      <textarea
                        style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
                        placeholder="Early check-in, extra pillows, dietary requirements, anniversary decoration…"
                        value={form.specialRequests}
                        onChange={e => set('specialRequests', e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#cda434'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <p style={{ color: '#9ca3af', fontSize: 12, marginTop: 6 }}>
                        * Children below 5 years: Free &nbsp;|&nbsp; 5-14 years: ₹1,500 + Taxes &nbsp;|&nbsp; Above 14 years: ₹1,800 + Taxes
                      </p>
                    </div>

                    <button type="submit" disabled={status === 'loading'} className="theme-btn" style={{ width: '100%', padding: '16px', fontSize: 14, letterSpacing: 2, opacity: status === 'loading' ? .75 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
                      {status === 'loading' ? (
                        <><i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }}></i>SUBMITTING REQUEST…</>
                      ) : (
                        <><i className="fa-regular fa-calendar-check" style={{ marginRight: 8 }}></i>SUBMIT BOOKING REQUEST</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right — summary cards */}
            <div className="col-lg-4 wow fadeInRight">

              {/* Room Summary */}
              <div style={{ background: '#1a1c2e', borderRadius: 14, padding: '28px', marginBottom: 20 }}>
                <h4 style={{ color: '#cda434', fontSize: 15, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>Room Tariff</h4>
                {ROOMS.map(r => (
                  <div key={r.value} onClick={() => set('roomType', r.value)} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                    background: form.roomType === r.value ? 'rgba(205,164,52,.15)' : 'rgba(255,255,255,.05)',
                    border: `1px solid ${form.roomType === r.value ? '#cda434' : 'rgba(255,255,255,.08)'}`,
                    transition: 'all .2s',
                  }}>
                    <div>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{r.label}</div>
                      <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, marginTop: 2 }}>Per night + taxes</div>
                    </div>
                    <div style={{ color: '#cda434', fontWeight: 700, fontSize: 14 }}>{r.price}</div>
                  </div>
                ))}
                <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, margin: '12px 0 0', lineHeight: 1.6 }}>
                  * Additional GST applicable. Click a room above to auto-select it in the form.
                </p>
              </div>

              {/* Contact Card */}
              <div style={{ background: '#fff', borderRadius: 14, padding: '28px', marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,.06)', border: '1px solid #e5e7eb' }}>
                <h4 style={{ color: '#1a1c2e', fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Need Help?</h4>
                {[
                  { icon: 'fa-phone', label: '+91 9088809991', href: 'tel:+919088809991', sub: 'Call us anytime — 24/7' },
                  { icon: 'fa-envelope', label: 'info@parkqueenhotels.com', href: 'mailto:info@parkqueenhotels.com', sub: 'We reply promptly' },
                  { icon: 'fa-location-dot', label: 'Delhi Bypass, Rohtak', href: 'https://maps.google.com/maps?q=The+ParkQueen+Hotel+Rohtak', sub: 'Haryana – 124001' },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, textDecoration: 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: '#cda434', fontSize: 14 }}></i>
                    </div>
                    <div>
                      <div style={{ color: '#1a1c2e', fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 2 }}>{item.sub}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Check-in/out policy */}
              <div style={{ background: '#fffbeb', borderRadius: 14, padding: '24px', border: '1px solid #fde68a' }}>
                <h4 style={{ color: '#92400e', fontSize: 14, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fa-solid fa-circle-info"></i> Hotel Policy
                </h4>
                {[
                  ['Check-In', '12:00 PM onwards'],
                  ['Check-Out', 'By 11:00 AM'],
                  ['Cancellation', 'Contact front desk'],
                  ['Payment', 'All major cards accepted'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: '#92400e', fontWeight: 600 }}>{k}</span>
                    <span style={{ color: '#1a1c2e' }}>{v}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section fix bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><div className="footer-bottom"><div className="footer-wrapper">
          <div className="social-icon"><a href="/contact"><i className="fa-brands fa-linkedin"></i></a><a href="/contact"><i className="fa-brands fa-instagram"></i></a><a href="/contact"><i className="fa-brands fa-facebook-f"></i></a></div>
          <ul className="footer-list"><li><a href="/about">About Us</a></li><li>/</li><li><a href="/rooms">Rooms</a></li><li>/</li><li><a href="/contact">Contact</a></li></ul>
          <p>Copyright&copy; <span>The ParkQueen Hotel</span></p>
        </div>
        <a href="/" className="footer-logo"><img style={{ width: '18rem' }} src="/assets/images/logo.png" alt="The ParkQueen Hotel" /></a>
        </div></div>
      </footer>
    </>
  )
}
