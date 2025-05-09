import React from "react"
// import "../App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom" // Updated import for Routes
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
import Registeradmin from "../pages/Registeradmin"
import AdminDashboard from "../pages/admin/pages/AdminDashboard"
import ReviewClassifier from "../components/flaskRelatedCompo/ReviewClassifier"
import ChatPage from "../components/aichatbot/ChatPage"
import OllamaChat from "../components/ollamaResponse/ollama3"

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
          <Route path="/registeradmin" element={<Registeradmin />} />
          <Route path="/admin/admindashboard/*" element={<AdminDashboard />} />
          <Route path="/reviewclassifier" element={<ReviewClassifier />} />
          <Route path="/aichatpage" element={<ChatPage />} />
          <Route path="/getyourdoutclear" element={<OllamaChat />} />
          <Route
            path="/admindashboard"
            element={<Navigate to="/admin/admindashboard" replace />}
          />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default AppRouter
