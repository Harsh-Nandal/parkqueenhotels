'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'


const STATIC_SERVICES_BOXES = [
  { _id: 'sb1', icon: 'fa-wifi',            title: 'Enjoy Free Wi-Fi' },
  { _id: 'sb2', icon: 'fa-wind',            title: 'Air Condition' },
  { _id: 'sb3', icon: 'fa-mug-hot',         title: 'Tea / Coffee Maker' },
  { _id: 'sb4', icon: 'fa-square-parking',  title: 'Vallet Parking' },
  { _id: 'sb5', icon: 'fa-shirt',           title: 'Laundry & Dry Cleaning' },
  { _id: 'sb6', icon: 'fa-bolt',            title: '24 Hours Power Back Up' },
]

const STATIC_OFFERS = [
  { id: 1, title: 'Rohtak Heritage Tour',       cardTitle: 'ParkQueen Special',      image: null, cardImage: null },
  { id: 2, title: 'Special Dining Experience',  cardTitle: 'Celebrating Freedom',    image: null, cardImage: null },
  { id: 3, title: 'Extend Your Stay',           cardTitle: 'Celebrating Freedom',    image: null, cardImage: null },
  { id: 4, title: 'Stay a Bit Longer',          cardTitle: 'Celebrating Freedom',    image: null, cardImage: null },
  { id: 5, title: 'Rohtak Festival Packages',   cardTitle: 'Celebrating Freedom',    image: null, cardImage: null },
]

const STATIC_STATS = {
  rooms:      { value: '4',   suffix: 'k+', label: 'Rooms' },
  facilities: { value: '200', suffix: '+',  label: 'Facilities' },
  clients:    { value: '2',   suffix: 'k',  label: 'Clients' },
  staff:      { value: '150', suffix: '+',  label: 'Staff' },
}

const FOOTER_BG = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80'

export default function ServicePage() {
  const [services, setServices]       = useState([])
  const [serviceContent, setServiceContent] = useState({})
  const [homeContent, setHomeContent] = useState({})
  const [stats, setStats]             = useState(STATIC_STATS)
  const [statsBg, setStatsBg]         = useState('/assets/img/home-2/feature/02.jpg')
  const [breadcrumbBg, setBreadcrumbBg] = useState('/assets/images/home/NDS_5001.jpg')
  const [hero, setHero]               = useState({})
  const [settings, setSettings]       = useState({})
  const [footerBg, setFooterBg]       = useState(FOOTER_BG)

  useEffect(() => {
    fetch('/api/hero/service')
      .then(r => r.json())
      .then(d => { if (d.data) setHero(d.data) })
      .catch(() => {})

    fetch('/api/services?status=active&limit=6')
      .then(r => r.json())
      .then(d => { if (d.data?.length) setServices(d.data) })
      .catch(() => {})

    fetch('/api/content/service')
      .then(r => r.json())
      .then(d => {
        setServiceContent(d)
        if (d.stats)     setStats({ ...STATIC_STATS, ...d.stats })
        if (d.statsBg)   setStatsBg(imgUrl(d.statsBg, '/assets/img/home-2/feature/02.jpg'))
        if (d.breadcrumbBg) setBreadcrumbBg(d.breadcrumbBg)
      })
      .catch(() => {})

    fetch('/api/content/home')
      .then(r => r.json())
      .then(d => { if (d) setHomeContent(d) })
      .catch(() => {})

    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          setSettings(d.data)
          if (d.data.footer?.backgroundImage)
            setFooterBg(imgUrl(d.data.footer.backgroundImage, FOOTER_BG))
        }
      })
      .catch(() => {})
  }, [])

  const phone   = settings.phone?.[0]   || '+91 9088809991'
  const email   = settings.email?.[0]   || 'info@parkqueenhotels.com'
  const address = settings.address      || 'The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India'

  const activeServices = services.length ? services : STATIC_SERVICES_BOXES
  // Offers come from service content first, then home content, then static fallback
  const offersSubtitle = serviceContent.offersSubtitle || homeContent.offersSubtitle || 'our special offer'
  const offersHeading  = serviceContent.offersHeading  || homeContent.offersHeading  || "Our Latest Special Offer's"
  const activeOffers   = homeContent.offerItems?.length ? homeContent.offerItems : STATIC_OFFERS

  const boxes = serviceContent.serviceBoxes || {}

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb */}
      <div
        className="breadcrumb-wrapper bg-cover"
        style={{ backgroundImage: `url('${bannerBg([hero?.backgroundImage, breadcrumbBg], '/assets/images/home/NDS_5001.jpg')}')` }}
      >
        <div className="container">
          <div className="page-heading">
            <div className="breadcrumb-sub-title">
              <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">{hero?.title || 'Services'}</h1>
            </div>
            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
              <li><a href="/">Home</a></li>
              <li><i className="fa-solid fa-chevron-right"></i></li>
              <li>Services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Icon Boxes Section */}
      <section className="service-section section-padding pb-0 fix">
        <div className="container">
          <div className="row g-4">
            {activeServices.slice(0, 6).map((svc, i) => (
              <div
                key={svc._id || i}
                className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 tp_fade_anim"
                data-delay={`.${i + 1}`}
                data-fade-from="left"
              >
                <div className="service-box-items">
                  <div className="icon">
                    {(svc.image?.url && !svc.image.url.startsWith('/assets/img/'))
                      ? <img src={svc.image.url} alt={svc.title} loading="lazy" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                      : <i className={`fa-solid ${svc.icon || 'fa-star'}`} style={{ fontSize: 36, color: '#cda434' }}></i>
                    }
                  </div>
                  <h6>{svc.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Stats / Counter Section */}
      <section className="service-bg-section section-padding fix pt-0">
        <div className="container">
          <div className="bg-image-2 bg-cover" style={{ backgroundImage: `url('${statsBg}')` }}>
            <div className="counter-wrapper">
              {Object.values(stats).map((s, i) => (
                <div key={i} className="counter-content">
                  <h2>
                    <span className="odometer" data-count={s.value}>00</span>
                    {s.suffix}
                  </h2>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InstagramSlider wrapperClass="instagram-section-2 fix" />{/* Footer */}
      <footer className="footer-section fix bg-cover" style={{ backgroundImage: `url('${footerBg}')` }}>
        <div className="container">
          <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3>Stay updated with {settings.siteName || 'The ParkQueen Hotel'}</h3>
              <p>{settings.footer?.tagline || 'At The ParkQueen Hotel, luxury is a crafted experience that blends elegance, comfort, and exceptional service in Rohtak.'}</p>
            </div>
            <form action="#">
              <div className="form-clt">
                <i className="fa-solid fa-envelope"></i>
                <input type="text" name="email" id="email-footer-service" placeholder="enter your email" />
                <button type="submit" className="theme-btn">subscribe now</button>
              </div>
            </form>
          </div>
          <div className="footer-widget-wrapper">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".2s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>About us</h5></div>
                  <div className="footer-content"><p>{settings.footer?.tagline || 'Welcome to The ParkQueen Hotel, your destination for refined luxury stays and hospitality that feels personal, polished, and effortless.'}</p></div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".4s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>hotel best services</h5></div>
                  <ul className="list">
                    <li><a href="/service">Room Booking</a></li>
                    <li><a href="/service">Special Offers</a></li>
                    <li><a href="/service">Special Foods</a></li>
                    <li><a href="/contact">Airport Pickup</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".6s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>check in &amp; out time</h5></div>
                  <ul className="date-list">
                    <li>Check In : <span className="style-1">{settings.footer?.checkIn || '12:00 PM'}</span></li>
                    <li>Check Out : <span>{settings.footer?.checkOut || '11:00 AM'}</span></li>
                    <li>Open : <span className="style-1">24 Hours / 7 Days</span></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".8s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>Contact Us</h5></div>
                  <ul className="contact-item">
                    <li><i className="fa-solid fa-location-dot"></i> {address}</li>
                    <li className="style-2"><i className="fa-solid fa-envelope"></i><a href={`mailto:${email}`}>{email}</a></li>
                    <li className="style-2"><i className="fa-solid fa-phone"></i><a href={`tel:${phone.replace(/\s/g,'')}`}>{phone}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-wrapper">
              <div className="social-icon wow fadeInLeft" data-wow-delay=".3s">
                <a href={settings.social?.linkedin  || '#'} aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                <a href={settings.social?.twitter   || '#'} aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href={settings.social?.instagram || '#'} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href={settings.social?.facebook  || '#'} aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
              <ul className="footer-list wow fadeInUp" data-wow-delay=".5s">
                <li><a href="/about">About Us</a></li>
                <li>/</li>
                <li><a href="/news">Blog</a></li>
                <li>/</li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
              <p className="wow fadeInRight" data-wow-delay=".7s">Copyright&copy; <span>{settings.footer?.copyright || 'The ParkQueen Hotel'}</span></p>
            </div>
            <a href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
              <img style={{ width: '18rem' }} src={settings.logo?.url || '/assets/images/logo.png'} alt="The ParkQueen Hotel" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
