import React from "react"
// import "../App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" // Updated import for Routes
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Explore from "../pages/Explore"
import PlantDetails from "../pages/PlantDetails"
import AddPlant from "../components/AddPlant"
import ThreedViewVideo from "../pages/ThreedViewVideo"
import Achievements from "../pages/Achievements"
import Forum from "../pages/Forum"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Register from "../pages/Register"

const AppRouter = () => {
  return (
    <Router>
      {/* <Header /> */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plant-details" element={<Explore />} />
          <Route path="/plant/:id" element={<PlantDetails />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route path="/3D-view-info-video" element={<ThreedViewVideo />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default AppRouter
