'use client'
import { useState } from 'react'
import { bannerBg } from '@/lib/imgUrl'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import Footer from '@/app/_components/Footer'


const ROOMS = [
  {
    name: 'Executive Room',
    count: 25,
    single: '₹5,000',
    double: '₹5,500',
    img: '/assets/images/rooms/ROOM2.jpg',
    img2: '/assets/images/rooms/NDS_5403.jpg',
    desc: 'Our spacious Executive Rooms blend contemporary design with premium comfort. Each room features plush bedding, high-speed Wi-Fi, air conditioning, LCD television, mini refrigerator, tea/coffee maker, and an elegant en-suite bathroom with running hot and cold water.',
    amenities: ['King / Twin Beds', 'Air Conditioning', 'LCD Television', 'Free Wi-Fi', 'Mini Refrigerator', 'Tea / Coffee Maker', 'Hot & Cold Water', 'Room Service'],
  },
  {
    name: 'Superior Room',
    count: 6,
    single: '₹5,000',
    double: '₹6,000',
    img: '/assets/images/rooms/newroom.jpeg',
    img2: '/assets/images/rooms/NDS_5407.jpg',
    desc: 'The Superior Room offers an elevated experience with refined interiors, extra space, and premium amenities. Ideal for guests who want a touch more luxury — featuring upgraded furnishings, enhanced bath amenities, and a larger seating area.',
    amenities: ['Queen / Double Beds', 'Air Conditioning', 'LCD Television', 'Free Wi-Fi', 'Mini Refrigerator', 'Tea / Coffee Maker', 'Hot & Cold Water', '24hr Room Service'],
  },
  {
    name: 'Queen Suite',
    count: 6,
    single: '₹5,500',
    double: '₹6,500',
    img: '/assets/images/rooms/ROOM3.jpg',
    img2: '/assets/images/rooms/NDS_5408.jpg',
    desc: 'Experience unparalleled luxury in our Queen Suite — a generously appointed space featuring a separate living area, premium décor, and panoramic views. Perfect for those seeking a truly indulgent retreat in the heart of Rohtak.',
    amenities: ['Queen Suite Bed', 'Separate Living Area', 'Air Conditioning', 'LCD Television', 'Free Wi-Fi', 'Mini Bar', 'Tea / Coffee Maker', 'Premium Bath Amenities'],
  },
  {
    name: 'Presidential Suite',
    count: 1,
    single: '₹6,999',
    double: '₹7,499',
    img: '/assets/images/rooms/ROOM4.jpg',
    img2: '/assets/images/rooms/ROOM5.jpg',
    desc: 'The crown jewel of The ParkQueen Hotel — our Presidential Suite is the epitome of luxury. Featuring an expansive bedroom, a private lounge, exclusive butler service, and the finest furnishings, this suite is designed for dignitaries and discerning travellers.',
    amenities: ['Presidential King Bed', 'Private Lounge', 'Butler Service', 'Air Conditioning', 'Smart TV', 'Free Wi-Fi', 'Mini Bar', 'Premium Bath Suite'],
  },
]

export default function RoomsPage() {
  const [activeRoom, setActiveRoom] = useState(0)

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb */}
      <PageHero
        bg={bannerBg(['/assets/images/about/subhero.png'], '/assets/images/home/NDS_5148.jpg')}
        kicker="Accommodation"
        title="Rooms & Tariff"
        crumbs={[{ label: 'Rooms' }]}
      />

      {/* Tariff Table */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Pricing</span>
            <h2 className="wow fadeInUp" style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, margin: 0 }}>TARIFF SHEET</h2>
            <div style={{ width: 60, height: 2, background: '#cda434', margin: '14px auto 0' }}></div>
            <p style={{ color: '#6b7280', marginTop: 12, fontSize: 14 }}>Tariff Validity: 01/04/2023 onwards &nbsp;·&nbsp; All rates exclusive of applicable taxes</p>
          </div>

          {/* Tariff table */}
          <div style={{ overflowX: 'auto', marginBottom: 48 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#1a1c2e', color: '#fff' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 700, letterSpacing: 1 }}>OCCUPANCY</th>
                  {ROOMS.map(r => (
                    <th key={r.name} style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, letterSpacing: 0.5, borderLeft: '1px solid rgba(255,255,255,.15)' }}>
                      {r.name}<br /><span style={{ color: '#cda434', fontSize: 11, fontWeight: 400 }}>({r.count} rooms)</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[['SINGLE', 'single'], ['DOUBLE', 'double']].map(([label, key], ri) => (
                  <tr key={key} style={{ background: ri % 2 === 0 ? '#f9f7f4' : '#fff' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: '#1a1c2e', borderBottom: '1px solid #e5e7eb' }}>{label}</td>
                    {ROOMS.map(r => (
                      <td key={r.name} style={{ padding: '14px 20px', textAlign: 'center', color: '#cda434', fontWeight: 700, fontSize: 16, borderBottom: '1px solid #e5e7eb', borderLeft: '1px solid #e5e7eb' }}>
                        {r[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div style={{ background: '#faf9f7', border: '1px solid #e5e7eb', borderLeft: '4px solid #cda434', borderRadius: 4, padding: '20px 24px' }}>
            <p style={{ fontWeight: 700, color: '#1a1c2e', marginBottom: 8, fontSize: 14 }}>Please Note:</p>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#6b7280', fontSize: 13, lineHeight: 2 }}>
              <li>Additional GST is applicable as per Government norms for hotels in India.</li>
              <li>Extra adults and children will be charged as per applicable rates.</li>
              <li>Children below 5 years of age: <strong>No Charge</strong></li>
              <li>Children between 5 to 14 years: <strong>₹1,500 + Taxes</strong> with extra bed</li>
              <li>Above 14 years: <strong>₹1,800 + Taxes</strong> with extra bed</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section style={{ background: '#f4f6f9', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Accommodation</span>
            <h2 className="wow fadeInUp" style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, margin: 0 }}>OUR ROOMS</h2>
            <div style={{ width: 60, height: 2, background: '#cda434', margin: '14px auto 0' }}></div>
          </div>

          {/* Tab nav */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            {ROOMS.map((r, i) => (
              <button key={i} onClick={() => setActiveRoom(i)} style={{
                padding: '10px 22px', borderRadius: 30, border: '2px solid',
                borderColor: activeRoom === i ? '#cda434' : '#e5e7eb',
                background: activeRoom === i ? '#cda434' : '#fff',
                color: activeRoom === i ? '#1a1c2e' : '#6b7280',
                fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all .2s',
              }}>{r.name}</button>
            ))}
          </div>

          {/* Active room */}
          {ROOMS.map((room, i) => i === activeRoom && (
            <div key={i} className="row g-4 align-items-center">
              <div className="col-lg-6 wow fadeInLeft">
                <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,.12)' }}>
                  <a href="/contact"><img src={room.img} alt={room.name} style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} /></a>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInRight">
                <div style={{ paddingLeft: 24 }}>
                  <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Rooms &amp; Suites</span>
                  <h3 style={{ color: '#1a1c2e', fontSize: 28, fontWeight: 700, margin: '10px 0 16px' }}>{room.name}</h3>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    <div style={{ background: '#1a1c2e', color: '#cda434', borderRadius: 8, padding: '10px 20px', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, opacity: .6, textTransform: 'uppercase', letterSpacing: 1 }}>Single</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{room.single}</div>
                    </div>
                    <div style={{ background: '#cda434', color: '#1a1c2e', borderRadius: 8, padding: '10px 20px', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, opacity: .7, textTransform: 'uppercase', letterSpacing: 1 }}>Double</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{room.double}</div>
                    </div>
                    <div style={{ background: '#f4f6f9', borderRadius: 8, padding: '10px 20px', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>Available</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1c2e' }}>{room.count} Rooms</div>
                    </div>
                  </div>
                  <p style={{ color: '#6b7280', lineHeight: 1.8, fontSize: 14, marginBottom: 20 }}>{room.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                    {room.amenities.map((a, j) => (
                      <span key={j} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: '#374151', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="fa-solid fa-check" style={{ color: '#cda434', fontSize: 10 }}></i>{a}
                      </span>
                    ))}
                  </div>
                  <a href="/contact" className="theme-btn">BOOK THIS ROOM</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
