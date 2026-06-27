'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'


const STATIC_FACILITIES = [
  { _id: 'f1', image: { url: '/assets/images/dining/NDS_5117.jpg'  }, icon: 'fa-utensils',           title: 'Restaurant & Dining', text: 'Savor exceptional cuisine crafted by our chefs ? from traditional Indian flavours to continental delights.' },
  { _id: 'f2', image: { url: '/assets/images/dining/NDS_5151.jpg'  }, icon: 'fa-briefcase',           title: 'Business Centre',    text: 'Fully equipped business centre with high-speed internet, printing, and support services for corporate guests.' },
  { _id: 'f3', image: { url: '/assets/images/dining/NDS_4994.jpg'  }, icon: 'fa-champagne-glasses',   title: 'Banquets & Events',  text: 'Host your weddings, corporate events, and celebrations in our beautifully appointed banquet halls.' },
  { _id: 'f4', image: { url: '/assets/images/home/NDS_5344.jpg'    }, icon: 'fa-presentation-screen', title: 'Conference Hall',    text: 'State-of-the-art conference and meeting facilities for corporate events and business gatherings.' },
  { _id: 'f6', image: { url: '/assets/images/home/NDS_5400.jpg'    }, icon: 'fa-car-rear',            title: 'Free Guest Parking', text: 'Secure, complimentary parking for all guests.' },
]
const FOOTER_BG = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80'

export default function FacilitiesPage() {
  // null = still loading (prevents flash of old static images)
  const [facilities, setFacilities] = useState(null)
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
      <div
        className="breadcrumb-wrapper bg-cover"
        style={{ backgroundImage: `url('${bannerBg([hero?.backgroundImage, breadcrumbBg], '/assets/images/home/NDS_5397.jpg')}')` }}
      >
        <div className="container">
          <div className="page-heading">
            <div className="breadcrumb-sub-title">
              <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">{hero?.title || 'Hotel Facilities'}</h1>
            </div>
            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
              <li><a href="/">Home</a></li>
              <li><i className="fa-solid fa-chevron-right"></i></li>
              <li>Hotel Facilities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hotel Facilities Section Start */}
      <section className="hotel-facilities-section section-padding fix">
        <div className="container">
          <div className="row g-4">
            {(facilities || []).map((f, i) => {
              const imgSrc = (f.image?.url && !f.image.url.startsWith('/assets/img/')) ? f.image.url : ['/assets/images/dining/NDS_5117.jpg','/assets/images/dining/NDS_5151.jpg','/assets/images/dining/NDS_4994.jpg','/assets/images/home/NDS_5344.jpg','/assets/images/home/NDS_5397.jpg'][i] || '/assets/images/dining/NDS_5117.jpg'
              return (
                <div
                  key={f._id || f.id || i}
                  className={`col-lg-6 ${i % 2 === 0 ? 'wow fadeInLeft' : 'wow fadeInRight'}`}
                  data-wow-delay={i % 2 === 0 ? '.3s' : '.5s'}
                >
                  <div className="hotel-facilities-items">
                    <div className="facilities-image">
                      <a href="/facilities"><img src={imgSrc} alt={f.title} /></a>
                      <a href="/facilities"><img src={imgSrc} alt={f.title} /></a>
                    </div>
                    <div className="facilities-content">
                      <div className="icon">
                        <i className={`fa-solid ${f.icon || 'fa-star'}`}></i>
                      </div>
                      <h3>{f.title}</h3>
                      <p>{f.text || f.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSlider wrapperClass="instagram-section-2 fix" />{/* Footer Section Start */}
      <footer
        className="footer-section fix bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="container">
          <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3>Stay updated with The ParkQueen Hotel</h3>
              <p>At The ParkQueen Hotel, luxury is a crafted experience that blends elegance, comfort, and exceptional service in Rohtak.</p>
            </div>
            <form action="#">
              <div className="form-clt">
                <i className="fa-solid fa-envelope"></i>
                <input type="text" name="email" id="email-footer-facilities" placeholder="enter your email" />
                <button type="submit" className="theme-btn">subscribe now</button>
              </div>
            </form>
          </div>
          <div className="footer-widget-wrapper">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".2s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>About us</h5></div>
                  <div className="footer-content"><p>Welcome to The ParkQueen Hotel, your destination for refined luxury stays and hospitality that feels personal, polished, and effortless.</p></div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".4s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>hotel best services</h5></div>
                  <ul className="list">
                    <li><a href="/contact">Airport pickup &amp; drop</a></li>
                    <li><a href="/service-details">Room booking</a></li>
                    <li><a href="/service">special offers</a></li>
                    <li><a href="/service">special foods</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".6s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>check in &amp; out time</h5></div>
                  <ul className="date-list">
                    <li>Check In : <span className="style-1">12:00 PM</span></li>
                    <li>Check Out : <span>11:00 AM</span></li>
                    <li>Open : <span className="style-1">24 Hours / 7 Days</span></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".8s">
                <div className="single-footer-widget">
                  <div className="widget-title"><h5>Contact Us</h5></div>
                  <ul className="contact-item">
                    <li><i className="fa-solid fa-location-dot"></i> The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India</li>
                    <li className="style-2"><i className="fa-solid fa-envelope"></i><a href="mailto:info@parkqueenhotels.com">info@parkqueenhotels.com</a></li>
                    <li className="style-2"><i className="fa-solid fa-phone"></i><a href="tel:+919088809991">+91 9088809991</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-wrapper">
              <div className="social-icon wow fadeInLeft" data-wow-delay=".3s">
                <a href="/contact"><i className="fa-brands fa-linkedin"></i></a>
                <a href="/contact"><i className="fa-brands fa-twitter"></i></a>
                <a href="/contact"><i className="fa-brands fa-instagram"></i></a>
                <a href="/contact"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
              <ul className="footer-list wow fadeInUp" data-wow-delay=".5s">
                <li><a href="/contact">Terms &amp; Conditions</a></li>
                <li>/</li>
                <li><a href="/contact">Privacy Policy</a></li>
                <li>/</li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
              <p className="wow fadeInRight" data-wow-delay=".7s">Copyright&copy; <span>The ParkQueen Hotel</span></p>
            </div>
            <a href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
              <img style={{ width: '18rem' }} src="/assets/images/logo.png" alt="img" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
