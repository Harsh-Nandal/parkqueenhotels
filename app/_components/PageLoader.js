'use client'
import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let safety

    function hide() {
      // 1.5 s after all resources finish — mirrors the timing in main.js
      setTimeout(() => setHidden(true), 1500)
    }

    if (document.readyState === 'complete') {
      // window.load already fired before this component hydrated
      hide()
    } else {
      window.addEventListener('load', hide, { once: true })
    }

    // Hard cap: always remove after 5 s so a broken image never locks the page
    safety = setTimeout(() => setHidden(true), 5000)

    return () => clearTimeout(safety)
  }, [])

  return (
    <div
      id="preloader"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#1a1c2e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        opacity: hidden ? 0 : 1,
        visibility: hidden ? 'hidden' : 'visible',
        transition: 'opacity 0.65s ease, visibility 0.65s ease',
        pointerEvents: hidden ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <img
        src="/assets/images/logo.png"
        alt="The ParkQueen Hotel"
        style={{ width: 210, objectFit: 'contain', marginBottom: 36 }}
      />

      {/* Spinning ring */}
      <div style={{ position: 'relative', width: 52, height: 52, marginBottom: 28 }}>
        {/* Track */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid rgba(205,164,52,0.15)',
        }} />
        {/* Rotating arc */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#cda434',
          animation: 'pq-spin 0.85s linear infinite',
        }} />
        {/* Inner dot */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#cda434',
          opacity: 0.6,
        }} />
      </div>

      {/* Tagline */}
      <p style={{
        margin: 0,
        color: 'rgba(205,164,52,0.65)',
        fontSize: 11,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        Luxury Hotel · Rohtak
      </p>

      <style>{`
        @keyframes pq-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
