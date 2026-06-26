'use client'
import { useState, useEffect } from 'react'

const EMPTY = {
  name: '', email: '', phone: '',
  checkIn: '', checkOut: '',
  roomType: 'Room', guests: '1',
  message: '',
}

export default function BookingModal() {
  const [open, setOpen]     = useState(false)
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState(null)  // null | 'loading' | 'success' | 'error'
  const [msg, setMsg]       = useState('')
  const [ref, setRef]       = useState('')

  /* ── Intercept every "BOOK NOW" click site-wide ── */
  useEffect(() => {
    function handleClick(e) {
      const el = e.target.closest('a, button')
      if (!el) return
      const text = el.textContent?.trim().toUpperCase()
      if (text === 'BOOK NOW' || text === 'BOOK A ROOM') {
        e.preventDefault()
        setOpen(true)
        setStatus(null)
        setMsg('')
        setRef('')
        setForm(EMPTY)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus('error'); setMsg('Please fill in your name, email, and phone number.'); return
    }
    if (!form.checkIn || !form.checkOut) {
      setStatus('error'); setMsg('Please select check-in and check-out dates.'); return
    }
    if (form.roomType === 'Room') {
      setStatus('error'); setMsg('Please select a room type.'); return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setRef(data.data?.bookingRef || '')
        setMsg('Your booking request has been submitted! Check your email for confirmation.')
      } else {
        setStatus('error')
        setMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMsg('Network error. Please try again.')
    }
  }

  if (!open) return null

  return (
    <div
      onClick={e => e.target === e.currentTarget && setOpen(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 99998,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560,
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: '#1a1c2e', borderRadius: '16px 16px 0 0',
          padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ margin: 0, color: '#cda434', fontSize: 20, fontWeight: 700 }}>Book a Room</h3>
            <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
              The ParkQueen Hotel — Rohtak, Haryana
            </p>
          </div>
          <button onClick={() => setOpen(false)} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 20, width: 36, height: 36, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
              <h4 style={{ color: '#1a1c2e', marginBottom: 8 }}>Booking Request Submitted!</h4>
              {ref && (
                <div style={{ background: '#1a1c2e', borderRadius: 10, padding: '14px 20px', margin: '12px 0', display: 'inline-block' }}>
                  <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>Your Booking Reference</div>
                  <div style={{ color: '#cda434', fontSize: 26, fontWeight: 700, letterSpacing: 3 }}>{ref}</div>
                </div>
              )}
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: '12px 0 0' }}>
                {msg}<br />Our team will confirm within 12 hours.
              </p>
              <button onClick={() => setOpen(false)} className="theme-btn" style={{ marginTop: 20, display: 'inline-block' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#dc2626', fontSize: 13 }}>
                  ⚠ {msg}
                </div>
              )}

              {/* Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Full Name *</label>
                  <input
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                    placeholder="Rajesh Sharma"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Phone Number *</label>
                  <input
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                    placeholder="+91 9XXXXXXXXX"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Email Address *</label>
                <input
                  type="email"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  required
                />
              </div>

              {/* Check-in / Check-out */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Check-In Date *</label>
                  <input
                    type="date"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                    value={form.checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => set('checkIn', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Check-Out Date *</label>
                  <input
                    type="date"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                    value={form.checkOut}
                    min={form.checkIn || new Date().toISOString().split('T')[0]}
                    onChange={e => set('checkOut', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Room type + Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Room Type *</label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', background: '#fff' }}
                    value={form.roomType}
                    onChange={e => set('roomType', e.target.value)}
                  >
                    <option value="Room">Select Room Type</option>
                    <option value="Executive Room">Executive Room — ₹5,500 + GST</option>
                    <option value="Superior Room">Superior Room — ₹6,000 + GST</option>
                    <option value="Queen Suite">Queen Suite — ₹6,500 + GST</option>
                    <option value="Presidential Suite">Presidential Suite — ₹7,499 + GST</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Number of Guests</label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', background: '#fff' }}
                    value={form.guests}
                    onChange={e => set('guests', e.target.value)}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Special requests */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>Special Requests <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span></label>
                <textarea
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', resize: 'vertical', minHeight: 72, fontFamily: 'inherit' }}
                  placeholder="Early check-in, extra bed, dietary requirements…"
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', background: '#cda434', color: '#fff',
                  border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.8 : 1,
                  transition: 'all .2s',
                }}
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Booking Request'}
              </button>

              <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 10 }}>
                Our team will confirm your booking within 12 hours via email & phone.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
