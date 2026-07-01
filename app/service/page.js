'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import Footer from '@/app/_components/Footer'


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
      <PageHero
        bg={bannerBg([hero?.backgroundImage, breadcrumbBg], '/assets/images/home/NDS_5001.jpg')}
        kicker="Tailored For You"
        title={hero?.title || 'Services'}
        crumbs={[{ label: 'Services' }]}
      />

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

      <InstagramSlider wrapperClass="instagram-section-2 fix" />
      <Footer />
    </>
  )
}
