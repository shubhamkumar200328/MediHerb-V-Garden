import React from "react"
// import "../App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" // Updated import for Routes
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"

const AppRouter = () => {
  return (
    <Router>
      {/* <Header /> */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default AppRouter
