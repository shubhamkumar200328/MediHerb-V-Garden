import React from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import "../components/Home.css"
import Slideshow2 from "../components/ImageSlideShowtwo"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to MediHerb V Garden</h1>
            <p>
              Discover the healing power of nature through our interactive and
              immersive virtual herbal garden. Explore plants used in Ayurveda,
              Yoga & Naturopathy, Unani, Siddha, and Homeopathy (AYUSH).
            </p>
            <Link to="/plant-details" className="explore-btn">
              Explore Now
            </Link>
          </div>
          <div className="slideShow mt-5">
            <Slideshow2 />
          </div>
        </section>

        {/* Overview Section */}
        <section className="overview-section">
          <h2 className=" text-3xl">What We Offer</h2>
          <div className="offer-cards">
            <div className="offer-card">
              <h3>Interactive 3D Models</h3>
              <p>
                Rotate, zoom, and explore realistic 3D models of medicinal
                plants.
              </p>
            </div>
            <div className="offer-card">
              <h3>Detailed Information</h3>
              <p>
                Learn about each plant’s medicinal uses, botanical details, and
                cultivation tips.
              </p>
            </div>
            <div className="offer-card">
              <h3>Virtual Tours</h3>
              <p>
                Take guided tours tailored to themes like immunity, skin care,
                and more.
              </p>
            </div>
          </div>
        </section>

        {/* Rated by Users Section */}
        <section className="ratings-section">
          <h2 className=" text-3xl">Rated by Our Users</h2>
          <div className="ratings-container">
            <div className="rating-card">
              <p>
                "Amazing platform! A perfect blend of technology and Ayurveda."
              </p>
              <span>⭐⭐⭐⭐⭐</span>
              <h4>- Ramesh K.</h4>
            </div>
            <div className="rating-card">
              <p>"Loved the 3D models. It made learning fun and engaging."</p>
              <span>⭐⭐⭐⭐⭐</span>
              <h4>- Priya S.</h4>
            </div>
            <div className="rating-card">
              <p>"Informative and user-friendly. Highly recommend!"</p>
              <span>⭐⭐⭐⭐⭐</span>
              <h4>- Amit J.</h4>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className=" text-3xl">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h4>What is MediHerb V Garden?</h4>
              <p>
                It’s an interactive herbal garden offering detailed information,
                3D models, and virtual tours of medicinal plants used in
                traditional medicine systems like Ayurveda and Unani.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do I need to pay to access the platform?</h4>
              <p>
                No, exploring basic information is free. However, premium guided
                tours and exclusive content may require a subscription.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I contribute or suggest a plant?</h4>
              <p>
                Absolutely! We welcome suggestions to expand our herbal
                database. There’s a submission form available in the ‘Contact
                Us’ section.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta-section">
          <h2>Join Us Today</h2>
          <p>
            Experience the wonders of nature with MediHerb V Garden. Start your
            journey now!
          </p>
          <button className="cta-btn">Get Started</button>
        </section>
      </div>
      <Navbar />
    </>
  )
}

export default Home
