import React from "react"
import "../components/About.css"
import Header from "../components/Header"

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
    </>
  )
}

export default Contact
