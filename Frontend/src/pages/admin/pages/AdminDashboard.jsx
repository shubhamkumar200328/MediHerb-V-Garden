import { Route, Routes, Navigate } from "react-router-dom"
import Sidebar from "../../../components/adminStyling/Sidebar"
import DashboardHome from "./DashboardHome"
import PlantManagement from "./PlantManagement"
import UserManagement from "./UserManagement"
import LearningModules from "./LearningModules"
import Analytics from "./Analytics"
import { useState } from "react"
import SentimentOverview from "./SentimentOverview"

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Dummy auth state

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/plants" element={<PlantManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/modules" element={<LearningModules />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/sentimentoverview" element={<SentimentOverview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/admin/usermanagement"
            element={
              localStorage.getItem("token") &&
              localStorage.getItem("userRole") === "admin" ? (
                <UserManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
