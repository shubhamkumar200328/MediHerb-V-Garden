import React from "react"
import "../components/Contact.css"
import Header from "../components/Header"

const About = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <h1 className="about-title">Welcome to MediHerb V Garden</h1>
        <p className="about-description">
          At <span className="highlight">MediHerb V Garden</span>, we bring the
          world of medicinal plants to your fingertips. Explore an immersive and
          interactive virtual garden showcasing the diverse range of herbs used
          in
          <span className="highlight">
            {" "}
            Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy (AYUSH)
          </span>
          .
        </p>
        <p className="about-mission">
          Our mission is to make the knowledge of traditional herbal practices
          accessible to everyone, while promoting awareness and understanding of
          natural healing methods. Learn about each plant's{" "}
          <span className="highlight">botanical details</span>,
          <span className="highlight">medicinal uses</span>, and{" "}
          <span className="highlight">cultivation practices</span>.
        </p>
        <p className="about-closing">
          Join us on this journey to discover the healing power of nature, one
          plant at a time!
        </p>
      </div>
    </>
  )
}

export default About
