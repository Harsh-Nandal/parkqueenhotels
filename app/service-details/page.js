'use client'
import { useState } from 'react'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'


export default function ServiceDetailsPage() {
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', checkIn: '', checkOut: '', roomType: 'Room', guests: '1' })
  const [submitting, setSubmitting] = useState(false)
  const [bookingStatus, setBookingStatus] = useState(null)
  const [bookingMsg, setBookingMsg] = useState('')
  const [bookingRef, setBookingRef] = useState('')

  async function handleBookingSubmit(e) {
    e.preventDefault()
    if (!booking.name.trim() || !booking.email.trim()) {
      setBookingStatus('error'); setBookingMsg('Name and email are required.'); return
    }
    if (!booking.checkIn.trim() || !booking.checkOut.trim()) {
      setBookingStatus('error'); setBookingMsg('Please enter check-in and check-out dates.'); return
    }
    if (booking.roomType === 'Room') {
      setBookingStatus('error'); setBookingMsg('Please select a room type.'); return
    }
    setSubmitting(true); setBookingStatus(null)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setBookingStatus('success')
        setBookingRef(data.data?.bookingRef || '')
        setBookingMsg('Your booking request has been submitted! Check your email for confirmation.')
        setBooking({ name: '', email: '', phone: '', checkIn: '', checkOut: '', roomType: 'Room', guests: '1' })
      } else {
        setBookingStatus('error'); setBookingMsg(data.error || 'Something went wrong.')
      }
    } catch { setBookingStatus('error'); setBookingMsg('Network error. Please try again.') }
    setSubmitting(false)
  }

  return (
    <>
      <SharedHeader />

      {/* Breadcrumb Wrapper Start */}
      <div
        className="breadcrumb-wrapper bg-cover"
        style={{ backgroundImage: "url('/assets/images/home/12121.jpg.jpeg')" }}
      >
        <div className="container">
          <div className="page-heading">
            <div className="breadcrumb-sub-title">
              <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
                Services Details
              </h1>
            </div>
            <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>Services Details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Details Section Start */}
      <section className="service-details-section section-padding fix">
        <div className="container">
          <div className="service-details-wrapper">
            <div className="row g-4">
              <div className="col-lg-8 col-12">
                <div className="details-image">
                  <img
                    src="/assets/images/rooms/NDS_5403.jpg"
                    alt="The ParkQueen Hotel ? Premium Rooms"
                  />
                </div>
                <div className="details-content">
                  <h2>Family Fun Package</h2>
                  <p>
                    Planning a trip for the whole family? Our Family Fun Package is
                    designed to offer comfort, entertainment, and unforgettable
                    moments for guests of all ages. Book now for a stay filled with
                    laughter, relaxation, and family bonding.
                  </p>
                  <span className="box">
                    Our team conducts a thorough evaluation of the submitted
                    element, analyzing its usability, functionality
                  </span>
                  <div className="details-list-item">
                    <h3>Package Inclusions:</h3>
                    <ul>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Family-Size
                          Room or Suite
                        </span>{' '}
                        Spacious accommodations with extra beds or connecting rooms,
                        ideal for families.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Daily
                          Breakfast Buffet for the Family
                        </span>{' '}
                        A variety of kid-friendly and healthy options included each
                        morning.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Welcome Gifts
                          for Children
                        </span>{' '}
                        Fun surprises like toys, coloring books, or snack packs upon
                        arrival.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Complimentary
                          Kids&apos; Club Access
                        </span>{' '}
                        Supervised activities, games, and crafts for different age
                        groups.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Family Movie
                          Night Experience
                        </span>{' '}
                        Enjoy in-room movie setup or join our weekly family movie
                        screenings with popcorn.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Kids Eat Free
                          (Under Age 6)
                        </span>{' '}
                        Special dining benefits when ordering from the children&apos;s
                        menu with a paying adult.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Access to
                          Business &amp; Conference Facilities
                        </span>{' '}
                        Fully equipped conference rooms and business centre available on request.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Free Late
                          Check-Out (Based on Availability)
                        </span>{' '}
                        Enjoy a little more time before departure.
                      </li>
                    </ul>
                  </div>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="details-image-2">
                        <img
                          src="/assets/images/rooms/NDS_5407.jpg"
                          alt="Hotel Room"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="details-image-2">
                        <img
                          src="/assets/images/dining/NDS_5117.jpg"
                          alt="Hotel Dining"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="details-list-item">
                    <h3>Booking Info:</h3>
                    <ul>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Availability:
                        </span>{' '}
                        Year-round (subject to blackout dates)
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Minimum Stay:
                        </span>{' '}
                        2 nights
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> How to Book:
                        </span>{' '}
                        Select the Family Fun Package when reserving your room online
                        or contact our reservations team.
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-circle-check"></i> Cancellation
                          Policy:
                        </span>{' '}
                        Flexible options available (check specific rates)
                      </li>
                    </ul>
                  </div>
                  <div className="faq-content">
                    <h3>Frequently Asked Question</h3>
                    <div className="faq-items">
                      <div className="accordion" id="accordionExample">
                        <div
                          className="accordion-item mb-3 wow fadeInUp"
                          data-wow-delay=".2s"
                        >
                          <h5 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Can I participate in events without being a member?
                            </button>
                          </h5>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                Experience the serene balance of our hotel, where
                                timeless traditions meet the pulse of modern life.
                                Every detail tells a story of harmony, comfort, and
                                refined elegance.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="accordion-item mb-3 wow fadeInUp"
                          data-wow-delay=".4s"
                        >
                          <h5 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Are there events for beginners and experienced guests?
                            </button>
                          </h5>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                Yes, The ParkQueen Hotel hosts events for guests of
                                all backgrounds. Our concierge team ensures every
                                experience is tailored to your needs.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="accordion-item mb-3 wow fadeInUp"
                          data-wow-delay=".6s"
                        >
                          <h5 className="accordion-header" id="headingthree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapsethree"
                              aria-expanded="false"
                              aria-controls="collapsethree"
                            >
                              Do you provide airport pickup services?
                            </button>
                          </h5>
                          <div
                            id="collapsethree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingthree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                Yes, airport pickup and drop services are available
                                on request. Please contact our front desk at least 24
                                hours in advance to arrange your transfer.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="accordion-item wow fadeInUp"
                          data-wow-delay=".8s"
                        >
                          <h5 className="accordion-header" id="headingfour">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapsefour"
                              aria-expanded="false"
                              aria-controls="collapsefour"
                            >
                              What is the check-in and check-out time?
                            </button>
                          </h5>
                          <div
                            id="collapsefour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingfour"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                Standard check-in is from 12:00 PM and check-out is
                                by 11:00 AM. Early check-in and late check-out are
                                available subject to availability.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="service-main-sideber">
                  <div className="single-sideber-widget">
                    <div className="widget-title">
                      <h3>All Categories</h3>
                    </div>
                    <ul className="category-list">
                      <li>
                        <a href="/service-details">Enjoy Free Wi-Fi</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Air Condition</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">LCD In All Rooms</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Tea / Coffee Maker</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Running Hot &amp; Cold Water</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Vallet Parking</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Laundry &amp; Dry Cleaning</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">24 Hours Power Back Up</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Lift</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Taxi On Call</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                      <li>
                        <a href="/service-details">Doctor On Call</a>
                        <span><i className="fa-solid fa-circle-chevron-right"></i></span>
                      </li>
                    </ul>
                  </div>
                  <div className="single-sideber-widget">
                    <div className="widget-title">
                      <h3>Hours</h3>
                    </div>
                    <ul className="hours-list">
                      <li>
                        <span>Breakfast</span>{' '}
                        <b>7.00 AM to 10.30 AM</b>
                      </li>
                      <li>
                        <span>Lunch</span>{' '}
                        <b>1.00 PM to 2.30 PM</b>
                      </li>
                      <li>
                        <span>Supper</span>{' '}
                        <b>6.00 PM to 7.00 PM</b>
                      </li>
                      <li>
                        <span>Dinner</span>{' '}
                        <b>9.30 PM to 11.00 PM</b>
                      </li>
                      <li>
                        <span>Super Offer</span>{' '}
                        <b>Monday To Friday</b>
                      </li>
                    </ul>
                  </div>
                  <div className="single-sideber-widget">
                    <div className="widget-title">
                      <h3>Book A Room</h3>
                    </div>
                    <div className="booking-item">
                      {bookingStatus === 'success' && (
                        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, padding: '14px', marginBottom: 14, color: '#065f46', fontSize: 13 }}>
                          <i className="fa-solid fa-circle-check" style={{ marginRight: 8 }}></i>
                          {bookingMsg}
                          {bookingRef && <div style={{ marginTop: 6, fontWeight: 700 }}>Ref: {bookingRef}</div>}
                        </div>
                      )}
                      {bookingStatus === 'error' && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '14px', marginBottom: 14, color: '#dc2626', fontSize: 13 }}>
                          <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 8 }}></i>{bookingMsg}
                        </div>
                      )}
                      <form onSubmit={handleBookingSubmit}>
                        <div className="row g-4">
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <input type="text" placeholder="Your Name *" value={booking.name} onChange={e => setBooking(b => ({ ...b, name: e.target.value }))} required />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <input type="email" placeholder="Your Email *" value={booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} required />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <input type="text" placeholder="Phone Number" value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <input type="text" placeholder="Check In (e.g. 25 July 2025)" value={booking.checkIn} onChange={e => setBooking(b => ({ ...b, checkIn: e.target.value }))} required />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <input type="text" placeholder="Check Out (e.g. 27 July 2025)" value={booking.checkOut} onChange={e => setBooking(b => ({ ...b, checkOut: e.target.value }))} required />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <div className="form">
                                <select
                                  value={booking.roomType}
                                  onChange={e => setBooking(b => ({ ...b, roomType: e.target.value }))}
                                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14 }}
                                >
                                  <option value="Room">Select Room Type</option>
                                  <option value="Executive Room">Executive Room ? ?5,500 + GST</option>
                                  <option value="Superior Room">Superior Room ? ?6,000 + GST</option>
                                  <option value="Queen Suite">Queen Suite ? ?6,500 + GST</option>
                                  <option value="Presidential Suite">Presidential Suite ? ?7,499 + GST</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-clt">
                              <div className="form">
                                <select
                                  value={booking.guests}
                                  onChange={e => setBooking(b => ({ ...b, guests: e.target.value }))}
                                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14 }}
                                >
                                  <option value="1">1 Guest</option>
                                  <option value="2">2 Guests</option>
                                  <option value="3">3 Guests</option>
                                  <option value="4">4 Guests</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <button className="theme-btn w-100" type="submit" disabled={submitting}>
                              {submitting ? 'Submitting?' : 'CHECK AVAILABILITY'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="service-details-contact-bg text-center bg-cover"
                    style={{
                      backgroundImage:
                        "url('/assets/images/home/NDS_5344.jpg')",
                    }}
                  >
                    <h3>
                      Please Contact Us By Phone or Email to Make a Reservation.
                    </h3>
                    <div className="icon">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <p>Need Reservation? Call us, it&apos;s toll-free.</p>
                    <h3>
                      <a href="tel:+919088809991">+91 9088809991</a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
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
                <input type="text" name="email" id="email-footer-sd" placeholder="enter your email" />
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
