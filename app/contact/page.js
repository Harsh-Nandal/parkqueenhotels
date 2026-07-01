'use client'
import { useState, useEffect } from 'react'
import { imgUrl, bannerBg } from '@/lib/imgUrl'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'


const DEFAULTS = {
  phone: ['+91 9088809991', '+91 9088809992', '+91 9088879994', '+91 9088879995'],
  diningPhone: ['+91 9088879990', '+91 9088879991', '+91 9088809993', '+91 9088809994'],
  email: ['info@parkqueenhotels.com'],
  address: 'The ParkQueen Hotel, Near Delhi Bypass, Rohtak, Haryana 124001, India',
  mapEmbed: 'https://maps.google.com/maps?q=The+ParkQueen+Hotel+Rohtak+Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed',
}
const FOOTER_BG = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80'

export default function ContactPage() {
  const [s, setS] = useState(DEFAULTS)
  const [breadcrumbBg, setBreadcrumbBg] = useState('/assets/images/home/NDS_5344.jpg')
  const [hero, setHero] = useState({})
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'success' | 'error'
  const [submitMsg, setSubmitMsg] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.data) setS({ ...DEFAULTS, ...d.data }) })
      .catch(() => {})

    fetch('/api/content/contact')
      .then(r => r.json())
      .then(d => { if (d.breadcrumbBg) setBreadcrumbBg(d.breadcrumbBg) })
      .catch(() => {})

    fetch('/api/hero/contact')
      .then(r => r.json())
      .then(d => { if (d.data) setHero(d.data) })
      .catch(() => {})
  }, [])

  async function handleContactSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSubmitStatus('error')
      setSubmitMsg('Please fill in all fields.')
      return
    }
    setSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitStatus('success')
        setSubmitMsg('Thank you! Your message has been sent. We will get back to you within 24 hours.')
        setForm({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
        setSubmitMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMsg('Network error. Please try again.')
    }
    setSubmitting(false)
  }

  const phones = s.phone?.length ? s.phone : DEFAULTS.phone
  const diningPhones = s.diningPhone?.length ? s.diningPhone : DEFAULTS.diningPhone
  const email = s.email?.[0] || DEFAULTS.email[0]
  const address = s.address || DEFAULTS.address
  const mapSrc = s.mapEmbed || DEFAULTS.mapEmbed
  const footerBg = imgUrl(s.footer?.backgroundImage, FOOTER_BG)

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb Wrapper Start */}
      <PageHero
        bg={bannerBg('/assets/images/about/subhero.png')}
        kicker="Get In Touch"
        title={hero?.title || 'Contact Us'}
        crumbs={[{ label: 'Contact Us' }]}
      />

      {/* Contact Us Section Start */}
      <section className="contact-us-section section-padding fix">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row g-4">
              <div className="col-lg-5">
                <div className="contact-left-items">
                  <div className="section-title">
                    <span className="sub-title wow fadeInUp">CONTACT US</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">Ready to Contact Us</h2>
                  </div>
                  <ul className="contact-list">
                    <li>
                      <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
                      <div className="content">
                        <p>Location</p>
                        <h4>{address}</h4>
                      </div>
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                      <div className="content">
                        <p>Email Address</p>
                        <h4><a href={`mailto:${email}`}>{email}</a></h4>
                      </div>
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-phone"></i></div>
                      <div className="content">
                        <p>Rooms &amp; Calling</p>
                        <h4>
                          {phones.map((p, i) => (
                            <a key={i} href={`tel:${p.replace(/\s/g, '')}`} style={{ display: 'block' }}>{p}</a>
                          ))}
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-utensils"></i></div>
                      <div className="content">
                        <p>Restaurants &amp; Bar</p>
                        <h4>
                          {diningPhones.map((p, i) => (
                            <a key={i} href={`tel:${p.replace(/\s/g, '')}`} style={{ display: 'block' }}>{p}</a>
                          ))}
                        </h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-right-items">
                  <h2>Send Us Message</h2>
                  <p>There will be no publication of your email address. Required fields are indicated with a *.</p>
                  <form onSubmit={handleContactSubmit} id="contact-form" className="contact-form-box">
                    {submitStatus === 'success' && (
                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, padding: '14px 18px', marginBottom: 16, color: '#065f46', fontSize: 14 }}>
                        <i className="fa-solid fa-circle-check" style={{ marginRight: 8 }}></i>{submitMsg}
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '14px 18px', marginBottom: 16, color: '#dc2626', fontSize: 14 }}>
                        <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 8 }}></i>{submitMsg}
                      </div>
                    )}
                    <div className="row g-4 align-items-center">
                      <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                        <h4>Your Name</h4>
                        <div className="form-clt">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                        <h4>Your Email</h4>
                        <div className="form-clt">
                          <input
                            type="email"
                            name="email"
                            id="email2"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                        <h4>Your Message</h4>
                        <div className="form-clt">
                          <textarea
                            name="message"
                            id="message"
                            placeholder="Type your message"
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
                        <button type="submit" className="theme-btn" disabled={submitting}>
                          {submitting ? 'Sending?' : 'SEND MESSAGE'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Start */}
      <div className="map-section section-padding pt-0">
        <div className="map-items">
          <div className="googpemap">
            <iframe
              src={mapSrc}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

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
                <input type="text" name="email" id="email-footer-contact" placeholder="enter your email" />
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
