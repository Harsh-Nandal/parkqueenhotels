'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'


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
                <a href="https://www.linkedin.com/in/parkqueen-hotels-and-resorts-9a2532400/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://x.com/parkqueenhotel_" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://www.instagram.com/parkqueenhotel_rohtak/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/hotelparkqueen/#" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
              <ul className="footer-list wow fadeInUp" data-wow-delay=".5s">
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
