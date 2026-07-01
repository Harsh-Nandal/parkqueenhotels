'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import Footer from '@/app/_components/Footer'


const STATIC_FACILITIES = [
  { _id: 'f1', image: { url: '/assets/images/rooms/ROOM2.jpg'      }, icon: 'fa-bed',                 title: '40 Spacious Rooms',  text: '40 beautifully appointed rooms and suites, each designed with premium comfort, modern amenities, and elegant interiors for a memorable stay.', href: '/rooms' },
  { _id: 'f2', image: { url: '/assets/images/dining/NDS_5117.jpg'  }, icon: 'fa-utensils',            title: 'Restaurants',        text: 'Savor exceptional cuisine crafted by our chefs — from traditional Indian flavours to continental delights, served in an elegant setting.', href: '/dining' },
  { _id: 'f3', image: { url: '/assets/images/dining/NDS_4994.jpg'  }, icon: 'fa-martini-glass-citrus',title: 'Well Stocked Bar',   text: 'Unwind with handcrafted cocktails, premium spirits, and fine wines at our well-stocked bar, perfect for relaxing evenings.', href: '/dining' },
  { _id: 'f4', image: { url: '/assets/images/events/NDS_5160.jpg'  }, icon: 'fa-presentation-screen', title: 'Conference Halls',   text: 'State-of-the-art conference halls equipped with modern AV technology, ideal for corporate meetings and business gatherings.', href: '/banquets' },
  { _id: 'f5', image: { url: '/assets/images/events/NDS_5266.jpg'  }, icon: 'fa-champagne-glasses',   title: 'Banquet Halls',      text: 'Host your weddings, receptions, and grand celebrations in our beautifully appointed banquet halls designed to impress.', href: '/banquets' },
  { _id: 'f6', image: { url: '/assets/images/events/NDS_5346.jpg'  }, icon: 'fa-chalkboard-user',     title: 'Meeting Rooms',      text: 'Versatile meeting rooms equipped with all essential amenities, perfect for seminars, presentations, and business discussions.', href: '/banquets' },
  { _id: 'f7', image: { url: '/assets/images/dining/NDS_5151.jpg'  }, icon: 'fa-building',            title: 'Rooftop Restaurants',text: 'Enjoy panoramic city views while dining at our rooftop restaurant, offering a memorable culinary experience under the open sky.', href: '/dining' },
  { _id: 'f8', image: { url: '/assets/images/home/NDS_5400.jpg'    }, icon: 'fa-square-parking',      title: 'Spacious Parking',   text: 'Secure, complimentary, and spacious parking facilities available for all our guests and visitors round the clock.', href: '/contact' },
]
const FOOTER_BG = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80'

const TITLE_HREF = {
  '40 Spacious Rooms': '/rooms',
  'Restaurants': '/dining',
  'Well Stocked Bar': '/dining',
  'Conference Halls': '/banquets',
  'Banquet Halls': '/banquets',
  'Meeting Rooms': '/banquets',
  'Rooftop Restaurants': '/dining',
  'Spacious Parking': '/contact',
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState(STATIC_FACILITIES)
  const [breadcrumbBg, setBreadcrumbBg] = useState('/assets/images/home/NDS_5397.jpg')
  const [footerBg, setFooterBg] = useState(FOOTER_BG)
  const [hero, setHero] = useState({})

  useEffect(() => {
    fetch('/api/hero/facilities')
      .then(r => r.json())
      .then(d => { if (d.data) setHero(d.data) })
      .catch(() => {})

    // Fetch from the same source the admin saves to
    fetch('/api/content/facilities')
      .then(r => r.json())
      .then(d => {
        if (d.items?.length) setFacilities(d.items)
        else setFacilities(STATIC_FACILITIES)
        if (d.breadcrumbBg) setBreadcrumbBg(d.breadcrumbBg)
      })
      .catch(() => setFacilities(STATIC_FACILITIES))

    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.data?.footer?.backgroundImage) setFooterBg(imgUrl(d.data.footer.backgroundImage, FOOTER_BG)) })
      .catch(() => {})
  }, [])

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb Wrapper Start */}
      <PageHero
        bg={bannerBg('/assets/images/about/subhero.png')}
        kicker="World-Class Amenities"
        title={hero?.title || 'Hotel Facilities'}
        crumbs={[{ label: 'Hotel Facilities' }]}
      />

      {/* Hotel Facilities Section Start */}
      <section className="hotel-facilities-section section-padding fix">
        <div className="container">
          <div className="row g-4">
            {(facilities || []).map((f, i) => {
              const imgSrc = (f.image?.url && !f.image.url.startsWith('/assets/img/')) ? f.image.url : ['/assets/images/dining/NDS_5117.jpg','/assets/images/dining/NDS_5151.jpg','/assets/images/dining/NDS_4994.jpg','/assets/images/home/NDS_5344.jpg','/assets/images/home/NDS_5397.jpg'][i] || '/assets/images/dining/NDS_5117.jpg'
              const href = f.href || TITLE_HREF[f.title] || '/facilities'
              return (
                <div
                  key={f._id || f.id || i}
                  className={`col-lg-6 ${i % 2 === 0 ? 'wow fadeInLeft' : 'wow fadeInRight'}`}
                  data-wow-delay={i % 2 === 0 ? '.3s' : '.5s'}
                >
                  <div className="hotel-facilities-items">
                    <div className="facilities-image">
                      <a href={href}><img src={imgSrc} alt={f.title} /></a>
                      <a href={href}><img src={imgSrc} alt={f.title} /></a>
                    </div>
                    <div className="facilities-content">
                      <div className="icon">
                        <i className={`fa-solid ${f.icon || 'fa-star'}`}></i>
                      </div>
                      <h3><a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{f.title}</a></h3>
                      <p>{f.text || f.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Room Amenities Section */}
      <section style={{ background: '#f4f6f9', paddingBottom: 80 }}>
        <div style={{ background: '#cda434', padding: '18px 0', marginBottom: 56, textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#1a1c2e', fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase' }}>ROOM AMENITIES</h2>
        </div>
        <div className="container">
          <div className="row g-3">
            {[
              ['fa-wifi',                'Enjoy Free Wi-Fi'],
              ['fa-wind',               'Air Conditioning'],
              ['fa-tv',                 'LCD In All Rooms'],
              ['fa-snowflake',          'Mini Refrigerator'],
              ['fa-shower',             'Running Hot & Cold Water'],
              ['fa-phone-volume',       'Intercom'],
              ['fa-mug-hot',            'Tea / Coffee Maker'],
              ['fa-map-location-dot',   'Travel Desk'],
              ['fa-square-parking',     'Valet Parking'],
              ['fa-credit-card',        'All Major Cards Accepted'],
              ['fa-shirt',              'Laundry & Dry Cleaning'],
              ['fa-bolt',               '24 Hours Power Back Up'],
              ['fa-headphones',         'Sound Proofing & Acoustics'],
              ['fa-elevator',           'Lift'],
              ['fa-taxi',               'Taxi On Call'],
              ['fa-user-doctor',        'Doctor On Call'],
            ].map(([icon, label], i) => (
              <div key={label} className="col-6 col-md-4 col-lg-3">
                <div className="wow fadeInUp" data-wow-delay={`.${(i % 4) + 1}s`} style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: '22px 14px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,.05)',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color .2s, transform .2s',
                  height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#cda434'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'none' }}
                >
                  <i className={`fa-solid ${icon}`} style={{ fontSize: 32, color: '#1a1c2e', marginBottom: 12, display: 'block' }}></i>
                  <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.5px', lineHeight: 1.4 }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSlider wrapperClass="instagram-section-2 fix" />
      <Footer />
    </>
  )
}
