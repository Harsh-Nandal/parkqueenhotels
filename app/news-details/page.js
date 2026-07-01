'use client'
import InstagramSlider from '@/app/_components/InstagramSlider'
import SharedHeader from '@/app/_components/SharedHeader'
import PageHero from '@/app/_components/PageHero'
import Footer from '@/app/_components/Footer'


export default function NewsDetailsPage() {
  return (
    <>
      <SharedHeader />

      {/* Breadcrumb Start */}
      <PageHero
        bg="/assets/images/home/NDS_5148.jpg"
        kicker="Hospitality"
        title="Blog Details"
        crumbs={[{ label: 'Blog', href: '/news' }, { label: 'Blog Details' }]}
      />
      {/* Breadcrumb End */}

      {/* News Details Section Start */}
      <section className="news-details-section section-padding">
        <div className="container">
          <div className="news-details-wrapper">
            <div className="row g-4">

              {/* Main Content */}
              <div className="col-lg-8 col-12">
                <div className="details-image"><img src="/assets/img/inner-page/news-details/details-1.jpg" alt="img" /></div>
                <div className="news-details-content">
                  <h3>Luxury Travel Trends for the Modern Explorer</h3>
                  <p>Whether you&apos;re moving into a new experience or updating your current travel plans, smart choices can elevate your everyday living. From personalized service to the right balance of comfort and elegance, these ideas will help you create a stay that feels both functional and beautiful.</p>
                  <div className="sideber">
                    <h6 className="mb-0">Our team conducts a thorough evaluation of every guest experience, analyzing usability, comfort, and functionality.</h6>
                  </div>
                  <h4 className="news-title">01. Personalized Stays Over Standard Luxury</h4>
                  <p>Custom-curated itineraries, room preferences remembered, and private concierge services now set the standard for top-tier comfort.</p>
                  <h4 className="news-title">02. Business &amp; Leisure Blend</h4>
                  <p>Modern travelers seek fine dining, business facilities, and comfortable amenities that keep them productive and refreshed during their stay.</p>
                  <h4 className="news-title">03. Experience-Driven Travel</h4>
                  <p>Guests want more than a room ? they want local cultural experiences, curated tours, and unforgettable moments that money can&apos;t buy.</p>
                  <h4 className="news-title">04. Boutique &amp; Bespoke Properties</h4>
                  <p>Intimate hotels with distinct character and personalized attention are increasingly preferred over large chain properties.</p>
                  <h4 className="news-title">05. Seamless Digital Booking &amp; Smart Technology</h4>
                  <p>Mobile check-in, smart room controls, and instant booking confirmations define the modern luxury hotel experience.</p>
                  <h4 className="news-title">06. Culinary Exploration</h4>
                  <p>Hotel dining has evolved into a destination in itself ? guests now seek signature restaurants, chef&apos;s tables, and local flavor pairings.</p>
                  <h4 className="news-title">07. Sustainable Luxury</h4>
                  <p>Eco-conscious travelers expect hotels to demonstrate responsibility ? from energy efficiency to locally sourced ingredients.</p>
                  <h4 className="news-title">08. Extended Stays &amp; Workcations</h4>
                  <p>With remote work normalized, long-stay packages with high-speed internet, co-working spaces, and home comforts are in high demand.</p>
                  <div className="row g-4 mt-3">
                    <div className="col-lg-6"><div className="details-image"><img src="/assets/img/inner-page/news-details/details-2.jpg" alt="img" /></div></div>
                    <div className="col-lg-6"><div className="details-image"><img src="/assets/img/inner-page/news-details/details-3.jpg" alt="img" /></div></div>
                  </div>
                  <h3 className="text">Ready for the Stay of a Lifetime?</h3>
                  <p>No matter your preference, The ParkQueen Hotel offers unforgettable experiences. Pack your bags and experience true luxury in Rohtak.</p>
                  <div className="row tag-share-wrap mt-4 mb-5">
                    <div className="col-lg-7 col-12">
                      <div className="tagcloud">
                        <span>Tags:</span>
                        <a href="/news-details">HotelBooking</a>
                        <a href="/news-details">CityBreak</a>
                        <a href="/news-details">HotelOffer</a>
                      </div>
                    </div>
                    <div className="col-lg-5 col-12 mt-3 mt-lg-0 text-lg-end">
                      <div className="social-share">
                        <a href="/contact"><i className="fab fa-twitter"></i></a>
                        <a href="/contact"><i className="fa-brands fa-youtube"></i></a>
                        <a href="/contact"><i className="fab fa-linkedin-in"></i></a>
                        <a href="/contact"><i className="fab fa-facebook-f"></i></a>
                      </div>
                    </div>
                  </div>

                  {/* Comments Area */}
                  <div className="comments-area">
                    <div className="comments-heading"><h3>02 Comments</h3></div>
                    <div className="blog-single-comment d-flex gap-4 pt-4 pb-4">
                      <div className="image"><img src="/assets/img/inner-page/news-details/comment-1.png" alt="img" /></div>
                      <div className="content">
                        <div className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="con">
                            <h5><a href="/news-details">Ritu Verma</a></h5>
                            <span>February 10, 2024 at 2:37 pm</span>
                          </div>
                          <a href="/news-details" className="reply">Reply</a>
                        </div>
                        <p className="mt-30 mb-4">Really enjoyed reading this — we stayed at The ParkQueen last month and the experience was exactly as described. The staff went above and beyond to make our family feel at home. Will definitely be back!</p>
                      </div>
                    </div>
                    <div className="blog-single-comment d-flex gap-4 pt-4 pb-4">
                      <div className="image"><img src="/assets/img/inner-page/news-details/comment-2.png" alt="img" /></div>
                      <div className="content">
                        <div className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="con">
                            <h5><a href="/news-details">Sunil Bhardwaj</a></h5>
                            <span>February 12, 2024 at 11:15 am</span>
                          </div>
                          <a href="/news-details" className="reply">Reply</a>
                        </div>
                        <p className="mt-30 mb-4">Great article! The ParkQueen is truly the best hotel in Rohtak. The dining experience especially stood out — the North Indian cuisine is authentic and the portions are generous. Highly recommend to anyone visiting the city.</p>
                      </div>
                    </div>
                  </div>

                  {/* Comment Form */}
                  <div className="comment-form-wrap pt-5">
                    <h3>Leave a comment</h3>
                    <form action="#" id="contact-form" method="POST">
                      <div className="row g-4">
                        <div className="col-lg-6">
                          <div className="form-clt">
                            <span>Your Name*</span>
                            <input type="text" name="name" id="name" placeholder="Your Name" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-clt">
                            <span>Your Email*</span>
                            <input type="text" name="email" id="email6" placeholder="Your Email" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-clt">
                            <span>Message*</span>
                            <textarea name="message" id="message" placeholder="Type your message"></textarea>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <button type="submit" className="theme-btn">SEND MESSAGE</button>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4 col-12">
                <div className="main-sideber">

                  {/* All Categories Widget */}
                  <div className="single-sideber-widget">
                    <div className="widget-title"><h3>All Categories</h3></div>
                    <ul className="category-list">
                      <li><a href="/news-details">City Guide</a><span>(08)</span></li>
                      <li><a href="/news-details">New Places</a><span>(02)</span></li>
                      <li><a href="/news-details">Business Travel</a><span>(10)</span></li>
                      <li><a href="/news-details">Events &amp; Celebrations</a><span>(15)</span></li>
                      <li><a href="/news-details">Resort</a><span>(12)</span></li>
                      <li><a href="/news-details">Tips &amp; Tricks</a><span>(07)</span></li>
                    </ul>
                  </div>

                  {/* Recent Post Widget */}
                  <div className="single-sideber-widget">
                    <div className="widget-title"><h3>Recent Post</h3></div>
                    <div className="recent-post-area">
                      <div className="recent-items">
                        <div className="recent-thumb"><img src="/assets/img/inner-page/news-details/post-1.jpg" alt="img" /></div>
                        <div className="recent-content">
                          <h5><a href="/news-details">VIP Services That Define Elite Hospitality</a></h5>
                          <ul><li>March 26, 2025</li></ul>
                        </div>
                      </div>
                      <div className="recent-items">
                        <div className="recent-thumb"><img src="/assets/img/inner-page/news-details/post-2.jpg" alt="img" /></div>
                        <div className="recent-content">
                          <h5><a href="/news-details">A Romantic Escape Luxury Getaways for Couples</a></h5>
                          <ul><li>March 26, 2025</li></ul>
                        </div>
                      </div>
                      <div className="recent-items">
                        <div className="recent-thumb"><img src="/assets/img/inner-page/news-details/post-3.jpg" alt="img" /></div>
                        <div className="recent-content">
                          <h5><a href="/news-details">How to Choose the Perfect Luxury Suite</a></h5>
                          <ul><li>March 26, 2025</li></ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Popular Tags Widget */}
                  <div className="single-sideber-widget mb-0">
                    <div className="widget-title"><h3>Popular Tags</h3></div>
                    <div className="tagcloud">
                      <a href="/news-details">HotelBooking</a>
                      <a href="/news-details">LuxuryStay</a>
                      <a href="/news-details">RoomWithAView</a>
                      <a href="/news-details">HotelOffers</a>
                      <a href="/news-details">TravelInspiration</a>
                      <a href="/news-details">CityBreak</a>
                      <a href="/news-details">HolidayPlanning</a>
                      <a href="/news-details">Staycation</a>
                      <a href="/news-details">BookNow</a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* News Details Section End */}

      {/* Instagram Section */}
      <InstagramSlider wrapperClass="instagram-section-2 fix" />
      <Footer />
    </>
  )
}
