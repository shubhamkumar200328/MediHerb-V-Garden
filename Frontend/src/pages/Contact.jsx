import React from "react"
import "../components/About.css"
import Header from "../components/Header"
import styles from "../components/contact.module.css"

const Contact = () => {
  return (
    <>
      <Header />
      <div className="contact-container">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-description">
          We would love to hear from you! Whether you have questions, feedback,
          or suggestions, feel free to reach out to us.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              className="form-textarea"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>
      </div>
      {/* Contact Info Section */}
      <section className={styles.contactInfo}>
        <h2 className={styles.sectionTitle}>Our Contact Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h3>Email</h3>
            <p>support@mediherbvgardem.com</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Phone</h3>
            <p>+1 234 567 890</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Address</h3>
            <p>123 Jaipur, Rajasthan</p>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className={styles.mapSection}>
        <h2 className={styles.sectionTitle}>Find Us on the Map</h2>
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d177343.3461097756!2d75.7235625!3d26.9124339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db22737889dbf%3A0x65ebba9f77e32172!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1612800079605!5m2!1sen!2sus"
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d177343.3461097756!2d75.8648!3d25.2138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db22737889dbf%3A0x65ebba9f77e32172!2sKota%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1612800079605!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  )
}

export default Contact
