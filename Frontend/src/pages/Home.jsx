import React from "react"
import Header from "../components/Header"

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section bg-green-100 text-green-900 py-12 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to MediHerb V Garden
          </h1>
          <p className="text-lg mb-6">
            Discover the healing power of nature through our interactive and
            immersive virtual herbal garden. Explore plants used in Ayurveda,
            Yoga & Naturopathy, Unani, Siddha, and Homeopathy (AYUSH).
          </p>
          <button className="btn-primary px-6 py-3 rounded-md text-white font-semibold">
            Explore Now
          </button>
        </div>

        {/* Overview Section */}
        <div className="overview-section bg-white py-12 px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card bg-green-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Interactive 3D Models
              </h3>
              <p className="text-green-600">
                Rotate, zoom, and explore realistic 3D models of medicinal
                plants.
              </p>
            </div>
            {/* Card 2 */}
            <div className="card bg-green-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Detailed Information
              </h3>
              <p className="text-green-600">
                Learn about each plant’s medicinal uses, botanical details, and
                cultivation tips.
              </p>
            </div>
            {/* Card 3 */}
            <div className="card bg-green-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Virtual Tours
              </h3>
              <p className="text-green-600">
                Take guided tours tailored to themes like immunity, skin care,
                and more.
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="cta-section bg-green-900 text-white py-12 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-6">
            Experience the wonders of nature with MediHerb V Garden. Start your
            journey now!
          </p>
          <button className="btn-secondary px-6 py-3 rounded-md bg-white text-green-900 font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
