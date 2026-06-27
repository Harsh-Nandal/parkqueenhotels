'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'


const STATIC_ABOUT = {
  mainImage: '/assets/images/about/NDS_5014.jpg',
  subTitle: 'The Heart of Hospitality',
  heading: 'Welcome To a World of Warmth & Elegance Hotel',
  text: 'Welcome to The ParkQueen Hotel, your destination for luxury hospitality and effortless comfort in Rohtak. Enjoy refined service, elegant design, and exceptional experiences on every stay. We are committed to making every visit personal, polished, and truly unforgettable.',
  buttonText: 'Know more about us',
}

const STATIC_FEATURED_POSTS = [
  { id: 1, title: "Why The ParkQueen Hotel Is Rohtak's Premier Destination", excerpt: '', image: { url: '/assets/img/home-2/news/01.jpg' }, category: 'Hospitality', author: 'Admin', publishedAt: '2025-04-17', slug: 'parkqueen-rohtaks-premier-destination', ctaText: 'READ MORE', ctaLink: '/news' },
  { id: 2, title: 'Discover Our Signature Dining Experience in Rohtak',         excerpt: '', image: { url: '/assets/img/home-2/news/02.jpg' }, category: 'Dining',      author: 'Admin', publishedAt: '2025-04-20', slug: 'signature-dining-rohtak',                ctaText: 'READ MORE', ctaLink: '/news' },
  { id: 3, title: '5 Reasons to Host Your Next Event at The ParkQueen Hotel',   excerpt: '', image: { url: '/assets/img/home-2/news/03.jpg' }, category: 'Events',      author: 'Admin', publishedAt: '2025-04-25', slug: 'host-events-parkqueen',                  ctaText: 'READ MORE', ctaLink: '/news' },
]

const STATIC_FACILITIES = [
  { _id: 'f1', image: { url: '/assets/images/dining/NDS_5117.jpg'  }, icon: 'fa-utensils',           title: 'Restaurant & Dining', text: 'Savor exceptional cuisine crafted by our chefs.' },
  { _id: 'f2', image: { url: '/assets/images/dining/NDS_5151.jpg'  }, icon: 'fa-briefcase',           title: 'Business Centre',    text: 'Fully equipped business centre with high-speed internet, printing, and support services for corporate guests.' },
  { _id: 'f3', image: { url: '/assets/images/dining/NDS_4994.jpg'  }, icon: 'fa-champagne-glasses',   title: 'Banquets & Events',  text: 'Host your events in our beautifully appointed banquet halls.' },
  { _id: 'f4', image: { url: '/assets/images/home/NDS_5344.jpg'    }, icon: 'fa-presentation-screen', title: 'Conference Hall',    text: 'State-of-the-art conference and meeting facilities for corporate events and business gatherings.' },
  { _id: 'f6', image: { url: '/assets/images/home/NDS_5400.jpg'    }, icon: 'fa-car-rear',            title: 'Free Guest Parking', text: 'Secure, complimentary parking for all guests.' },
]


export default function AboutPage() {
  const [about, setAbout] = useState(STATIC_ABOUT)
  const [facilities, setFacilities] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [testimonialBg, setTestimonialBg] = useState('/assets/img/home-1/testimonial/bg.jpg')
  const [hero, setHero] = useState({})

  useEffect(() => {
    fetch('/api/content/about')
      .then(r => r.json())
      .then(d => { if (d && Object.keys(d).length > 1) setAbout({ ...STATIC_ABOUT, ...d }) })
      .catch(() => {})

    fetch('/api/hero/about')
      .then(r => r.json())
      .then(d => { if (d.data) setHero(d.data) })
      .catch(() => {})

    fetch('/api/content/home')
      .then(r => r.json())
      .then(d => { if (d.testimonialBg) setTestimonialBg(d.testimonialBg) })
      .catch(() => {})

    fetch('/api/content/facilities')
      .then(r => r.json())
      .then(d => {
        if (d.items?.length) setFacilities(d.items)
        else setFacilities(STATIC_FACILITIES)
      })
      .catch(() => setFacilities(STATIC_FACILITIES))

    fetch('/api/testimonials?status=active&limit=6')
      .then(r => r.json())
      .then(d => { if (d.data?.length) setTestimonials(d.data) })
      .catch(() => {})
  }, [])

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb Wrapper Start */}
      <div
        className="breadcrumb-wrapper bg-cover"
        style={{ backgroundImage: `url('${bannerBg([hero?.backgroundImage, about.breadcrumbBg], '/assets/images/home/NDS_5148.jpg')}')` }}
      >
        <div className="container">
          <div className="page-heading">
            <div className="breadcrumb-sub-title">
              <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
                {hero?.title || 'About Us'}
              </h1>
            </div>
            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Section Start */}
      <section className="about-section section-padding fix section-bg">
        <div className="container">
          <div className="about-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="about-image">
                  <img src={imgUrl(about.mainImage, STATIC_ABOUT.mainImage)} alt="img" />
                  
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title mb-0">
                    <span className="sub-title wow fadeInUp">
                      {about.subTitle || STATIC_ABOUT.subTitle}
                    </span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {about.heading || STATIC_ABOUT.heading}
                    </h2>
                  </div>
                  <p className="text wow fadeInUp" data-wow-delay=".3s">
                    {about.text || STATIC_ABOUT.text}
                  </p>
                  <div className="list-item wow fadeInUp" data-wow-delay=".5s">
                    <ul className="list">
                      <li><i className="fa-solid fa-circle-chevron-right"></i> Easy and secure online booking</li>
                      <li><i className="fa-solid fa-circle-chevron-right"></i> Exclusive discounts and offers</li>
                    </ul>
                    <ul className="list">
                      <li><i className="fa-solid fa-circle-chevron-right"></i> 24/7 customer support</li>
                      <li><i className="fa-solid fa-circle-chevron-right"></i> Flexible cancellation policies</li>
                    </ul>
                  </div>
                  <div className="hero-button-item wow fadeInUp" data-wow-delay=".3s" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <div className="top-shape">
                      <img src="/assets/img/home-1/about/bg-shape.png" alt="img" />
                    </div>
                    <a href="/about" className="theme-btn">{about.buttonText || STATIC_ABOUT.buttonText}</a>
                    <span className="button-text">
                      <span className="me-3 d-line">view reels</span>
                      <a href={about.videoLink || '#'} className="video-btn ripple video-popup">
                        <i className="fa-solid fa-play"></i>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Facilities Section ? same as facilities page */}
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

      {/* -- Hotel Overview / History ---------------------------------- */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', width: 48, height: 2, background: '#cda434', marginBottom: 14, verticalAlign: 'middle' }}></span>
            <span style={{ color: '#cda434', fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', margin: '0 14px' }}>Our Story</span>
            <span style={{ display: 'inline-block', width: 48, height: 2, background: '#cda434', marginBottom: 14, verticalAlign: 'middle' }}></span>
            <h2 style={{ color: '#1a1c2e', fontSize: 34, fontWeight: 700, margin: '10px 0 0' }}>The ParkQueen Hotel &amp; Resort&apos;s</h2>
          </div>
          <div className="row align-items-start g-5">
            <div className="col-lg-6">
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
                The ParkQueen Hotel &amp; Resort is one of the best luxury hotel in Rohtak. Its near to the Bar &amp; Lounge, Restaurant &amp; Dining, Banquet Hall, Conference Hall, Business Centre. Hotel have All eight rooms, Banquet Halls, Restaurant &amp; Dining, Conference Halls and stylish furniture make any trip perfect.
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: 15 }}>
                Situated in the heart of Rohtak, near Delhi Bypass, The ParkQueen Hotel combines world-class amenities with the warm hospitality that Haryana is known for. Our commitment to excellence ? combined with our prime location ? makes us the first choice for both business and leisure travellers.
              </p>
            </div>
            <div className="col-lg-6">
              <div style={{ background: '#f8f6f0', borderLeft: '4px solid #cda434', padding: '28px 32px', borderRadius: 4 }}>
                <h4 style={{ color: '#1a1c2e', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>History of Rohtak</h4>
                <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: 14, margin: 0 }}>
                  Rohtak is a district in the Indian state of Haryana. Traditionally it is named after Raja Rohtash in whose day it is said to have been built. It is also claimed that the town derives its name from the Rohtak-Dynasty and became a place famous in Haryana.
                </p>
                <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: 14, margin: '12px 0 0' }}>
                  It is said that before the town came into existence, it was the site of a forest of Rohitaka trees and hence its name became Rohtak. The city can feel proud for having one of the highest numbers of districts in India and Asia&apos;s largest cloth market. The Rewari and Gagar doth Indian Sweet of Rohtak is famous all over India as well as many places in abroad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Room Amenities -------------------------------------------- */}
      <section style={{ background: '#f4f6f9', padding: '0 0 72px' }}>
        {/* Gold header bar */}
        <div style={{ background: '#cda434', padding: '18px 0', marginBottom: 48, textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#1a1c2e', fontSize: 24, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase' }}>
            ROOM AMENITIES
          </h2>
        </div>
        <div className="container">
          <div className="row g-3">
            {[
              { icon: 'fa-wifi',                 label: 'Enjoy Free Wi-Fi' },
              { icon: 'fa-wind',                 label: 'Air Condition' },
              { icon: 'fa-tv',                   label: 'LCD In All Rooms' },
              { icon: 'fa-snowflake',            label: 'Mini Refrigerator' },
              { icon: 'fa-shower',               label: 'Running Hot &amp; Cold Water' },
              { icon: 'fa-phone-volume',         label: 'Intercom' },
              { icon: 'fa-mug-hot',              label: 'Tea / Coffee Maker' },
              { icon: 'fa-map-location-dot',     label: 'Travel Desk' },
              { icon: 'fa-square-parking',       label: 'Vallet Parking' },
              { icon: 'fa-credit-card',          label: 'All Major Cards Are Accepted' },
              { icon: 'fa-shirt',                label: 'Laundry And Dry Cleaning Services' },
              { icon: 'fa-bolt',                 label: '24 Hours Power Back Up' },
              { icon: 'fa-headphones',           label: 'Sound Proofing And Acoustics' },
              { icon: 'fa-elevator',             label: 'Lift' },
              { icon: 'fa-taxi',                 label: 'Taxi On Call' },
              { icon: 'fa-user-doctor',          label: 'Doctor On Call' },
            ].map((a, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div style={{
                  background: '#fff',
                  borderRadius: 8,
                  padding: '24px 16px',
                  textAlign: 'center',
                  height: '100%',
                  boxShadow: '0 1px 6px rgba(0,0,0,.06)',
                  borderBottom: '3px solid transparent',
                  transition: 'border-color .2s, transform .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#cda434'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <i className={`fa-solid ${a.icon}`} style={{ fontSize: 34, color: '#1a1c2e', marginBottom: 12, display: 'block' }}></i>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.4 }}
                    dangerouslySetInnerHTML={{ __html: a.label }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Why Choose Us -------------------------------------------- */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <span style={{ display: 'inline-block', width: 40, height: 2, background: '#cda434', marginBottom: 14, verticalAlign: 'middle' }}></span>
              <span style={{ color: '#cda434', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', margin: '0 12px' }}>Our Promise</span>
              <h2 style={{ color: '#1a1c2e', fontSize: 32, fontWeight: 700, margin: '12px 0 20px', lineHeight: 1.3 }}>
                WHY CHOOSE US
              </h2>
              <div style={{ width: 60, height: 3, background: '#cda434', marginBottom: 24 }}></div>
              <p style={{ color: '#6b7280', lineHeight: 1.9, fontSize: 15 }}>
                Strategically located in Rohtak, The ParkQueen Hotel gives us added advantage to our Guests, with a 24?7 front desk. Lorem services are available for the convenience of our Guests. Free WiFi and parking available. Hotel provides personalised, professional guest services and genuine hospitality. Committed to serve with a smile and giving some info to guests and our guests comfortable-only genuine.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {[
                  'Award Services Available',
                  'Restaurant &amp; Dining Services',
                  'Laundry &amp; Dry Cleaning Services',
                  '24?7 Working Facility',
                  'Enjoy Free Wi-Fi Available',
                  'Free Guest Parking Available',
                  'Taxi On Call Available',
                  'All Major Cards Accepted',
                  'Doctor On Call Available',
                  'Business Centre Available',
                  'Conference Hall Available',
                  'Bar &amp; Lounge Available',
                ].map((item, i) => (
                  <div key={i} className="col-12 col-sm-6">
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px',
                      background: '#f8f9fa',
                      borderRadius: 8,
                      borderLeft: '3px solid #cda434',
                    }}>
                      <i className="fa-solid fa-circle-check" style={{ color: '#cda434', fontSize: 16, flexShrink: 0 }}></i>
                      <span style={{ color: '#1a1c2e', fontSize: 13, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Quick Links / Info Bar ----------------------------------- */}
      <section style={{ background: '#1a1c2e', padding: '40px 0' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { icon: 'fa-location-dot', label: 'Location', value: 'Near Delhi Bypass, Rohtak, Haryana 124001' },
              { icon: 'fa-phone',        label: 'Phone',    value: '+91 9088809991' },
              { icon: 'fa-envelope',     label: 'Email',    value: 'info@parkqueenhotels.com' },
              { icon: 'fa-clock',        label: 'Open',     value: '24 Hours / 7 Days a Week' },
            ].map((item, i) => (
              <div key={i} className="col-6 col-lg-3">
                <div style={{ padding: '8px 0' }}>
                  <i className={`fa-solid ${item.icon}`} style={{ color: '#cda434', fontSize: 24, marginBottom: 8, display: 'block' }}></i>
                  <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Marque Section Start */}
      <div className="marque-section fix">
        <div className="scrolling-wrap">
          <div className="comm">
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Rohtak&apos;s Premier Hotel
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Best Luxury Resort in Rohtak
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Luxury Hotel in Rohtak
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
          </div>
          <div className="comm">
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Modern City Hotel
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Best Luxury Resort
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Luxury Hotel in Rohtak
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
          </div>
          <div className="comm">
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Modern City Hotel
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Best Luxury Resort
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Luxury Hotel in Rohtak
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
            <div className="cmn-textslide">
              <i className="fa-sharp fa-solid fa-star"></i> Bar &amp; Lounge
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section Start */}
      <section
        className="testimonial-section style-inn section-padding fix bg-cover"
        style={{
          backgroundImage: `url('${imgUrl(testimonialBg, '/assets/img/home-1/testimonial/bg.jpg')}')`,
        }}
      >
        <div className="container">
          <div className="testimonial-wrapper style-inner">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="testimonial-card-item scale-animation">
                  <div className="swiper testimonial-slider">
                    <div className="swiper-wrapper">
                      {(testimonials.length ? testimonials : [
                        { _id: 'r1', name: 'Vikram Singh', role: 'Wedding Host, Delhi NCR',  rating: 5, content: "We hosted our daughter's wedding at The ParkQueen Hotel and it was truly magnificent. The banquet, food, and hospitality of the staff were beyond our expectations. Our guests are still talking about it!", image: { url: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true' } },
                        { _id: 'r2', name: 'Pooja Verma',  role: 'Honeymoon Guest, Gurgaon', rating: 5, content: "My husband and I spent our honeymoon at The ParkQueen Hotel and it was absolutely dreamy. The room was elegant, the Bar & Lounge was perfect for evenings, and every staff member made us feel incredibly special.", image: { url: 'https://ui-avatars.com/api/?name=Pooja+Verma&background=cda434&color=1a1c2e&size=128&rounded=true&bold=true' } },
                      ]).map(t => (
                        <div key={t._id} className="swiper-slide">
                          <div className="content">
                            <div className="star">
                              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                              ))}
                            </div>
                            <p>{t.content}</p>
                            <div className="client-info-item">
                              <div className="info-item">
                                <img
                                  src={imgUrl(t.image, `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name || 'Guest')}&background=1a1c2e&color=cda434&size=128&rounded=true&bold=true`)}
                                  alt={t.name}
                                />
                                <div className="content">
                                  <h5>{t.name}</h5>
                                  <span>{t.role}</span>
                                </div>
                              </div>
                              <div className="quate-image">
                                <img src="/assets/img/home-1/icon/07.svg" alt="img" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="testimonial-content">
                  <div className="section-title mb-0">
                    <span className="sub-title wow fadeInUp">
                      our hotel testimonials
                    </span>
                    <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                      What Our Guest&apos;s Say
                    </h2>
                  </div>
                  <div className="client-item">
                    <div className="group-image">
                      <img
                        src="/assets/img/home-1/testimonial/group.png"
                        alt="img"
                      />
                    </div>
                    <h6>
                      More than{' '}
                      <span className="odometer" data-count="25">
                        00
                      </span>
                      <b>k</b> <br />
                      Client Reviews
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section Start */}
      <section className="news-section-2 section-padding fix news-bg">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="sub-title sub-title-2 wow fadeInUp">
                {about.newsSection?.subtitle || 'news & blog'}
              </span>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                {about.newsSection?.heading || 'Latest News & Articles'}
              </h2>
            </div>
            <a
              href={about.newsSection?.buttonLink || '/news'}
              className="theme-btn wow fadeInUp"
              data-wow-delay=".4s"
            >
              {about.newsSection?.buttonText || 'VIEW ALL ARTICLES'}
            </a>
          </div>
          <div className="row">
            {(about.featuredPosts?.length ? about.featuredPosts : STATIC_FEATURED_POSTS).slice(0, 3).map((post, i) => {
              const d = post.publishedAt ? new Date(post.publishedAt) : new Date()
              const link = post.ctaLink || `/news-details/${post.slug || post.id}`
              return (
                <div key={post.id || i} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="news-card-items-2">
                    <div className="news-image">
                      <a href={link}><img src={imgUrl(post.image, '/assets/img/home-2/news/01.jpg')} alt={post.title} loading="lazy" /></a>
                      <div className="post-box">
                        <h4>{d.getDate()}<br /><span>{d.toLocaleString('en', { month: 'short' })}</span></h4>
                      </div>
                    </div>
                    <div className="news-content">
                      <ul className="news-meta">
                        <li><img src="/assets/img/home-2/arrow.png" alt="img" /> By {post.author || 'Admin'}</li>
                        <li className="style-2">{post.category || 'Hotel'}</li>
                      </ul>
                      <h4><a href={link}>{post.title}</a></h4>
                      <a href={link} className="link-btn">{post.ctaText || 'READ MORE'}</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSlider wrapperClass="instagram-section-2 section-padding pb-0 fix" />{/* Footer Section Start ? identical to home page */}
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
              <p>
                At The ParkQueen Hotel, luxury is a crafted experience that
                blends elegance, comfort, and exceptional service in Rohtak.
              </p>
            </div>
            <form action="#">
              <div className="form-clt">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="text"
                  name="email"
                  id="email-footer"
                  placeholder="enter your email"
                />
                <button type="submit" className="theme-btn">
                  subscribe now
                </button>
              </div>
            </form>
          </div>
          <div className="footer-widget-wrapper">
            <div className="row">
              <div
                className="col-xl-4 col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div className="single-footer-widget">
                  <div className="widget-title">
                    <h5>About us</h5>
                  </div>
                  <div className="footer-content">
                    <p>
                      Welcome to The ParkQueen Hotel, your destination for
                      refined luxury stays and hospitality that feels personal,
                      polished, and effortless.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-2 col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay=".4s"
              >
                <div className="single-footer-widget">
                  <div className="widget-title">
                    <h5>hotel best services</h5>
                  </div>
                  <ul className="list">
                    <li><a href="/contact">Airport pickup &amp; drop</a></li>
                    <li><a href="/service-details">Room booking</a></li>
                    <li><a href="/service">special offers</a></li>
                    <li><a href="/service">special foods</a></li>
                  </ul>
                </div>
              </div>
              <div
                className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay=".6s"
              >
                <div className="single-footer-widget">
                  <div className="widget-title">
                    <h5>check in &amp; out time</h5>
                  </div>
                  <ul className="date-list">
                    <li>Check In : <span className="style-1">12:00 PM</span></li>
                    <li>Check Out : <span>11:00 AM</span></li>
                    <li>Open : <span className="style-1">24 Hours / 7 Days</span></li>
                  </ul>
                </div>
              </div>
              <div
                className="col-xl-3 ps-lg-5 col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay=".8s"
              >
                <div className="single-footer-widget">
                  <div className="widget-title">
                    <h5>Contact Us</h5>
                  </div>
                  <ul className="contact-item">
                    <li>
                      <i className="fa-solid fa-location-dot"></i>
                      The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India
                    </li>
                    <li className="style-2">
                      <i className="fa-solid fa-envelope"></i>
                      <a href="mailto:info@parkqueenhotels.com">
                        info@parkqueenhotels.com
                      </a>
                    </li>
                    <li className="style-2">
                      <i className="fa-solid fa-phone"></i>
                      <a href="tel:+919088809991">+91 9088809991</a>
                    </li>
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
              <p className="wow fadeInRight" data-wow-delay=".7s">
                Copyright&copy; <span>The ParkQueen Hotel</span>
              </p>
            </div>
            <a href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
              <img
                style={{ width: '18rem' }}
                src="/assets/images/logo.png"
                alt="img"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
