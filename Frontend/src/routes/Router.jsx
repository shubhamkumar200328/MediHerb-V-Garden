import React from "react"
// import "../App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" // Updated import for Routes
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Explore from "../pages/Explore"
import PlantDetails from "../pages/PlantDetails"
import ThreedViewVideo from "../pages/ThreedViewVideo"
import Achievements from "../pages/Achievements"
import Forum from "../pages/Forum"
import AdminPage from "../pages/admin/pages/AdminPage"
import AddPlant from "../pages/admin/pages/AddPlant"
import UserProfile from "../pages/UserProfile"
import Login from "../pages/LogIn"
import Register from "../pages/Register"
import Loginadmin from "../pages/Loginadmin"
import Registeradmin from "../pages/registeradmin"
import AdminDashboard from "../pages/admin/pages/AdminDashboard"

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
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route path="/3D-view-info-video" element={<ThreedViewVideo />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/adminlogin" element={<Loginadmin />} />
          <Route path="/adminregister" element={<Registeradmin />} />
          <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default AppRouter
