import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaLeaf, FaUsers, FaChartLine, FaBook } from "react-icons/fa"
import "../../../components/adminStyling/DashboardHome.css"

function DashboardHome() {
  const [stats, setStats] = useState({
    totalPlants: 0,
    totalUsers: 0,
    totalVisits: 0, // You can mock this for now
    activeModules: 0,
  })

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token")
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const [usersRes, plantsRes] = await Promise.all([
        axios.get("http://localhost:5015/api/users"),
        axios.get("http://localhost:5015/api/plants"),
      ])

      setStats({
        totalUsers: usersRes.data.length,
        totalPlants: plantsRes.data.length,
        activeModules: 10, // Placeholder, you can fetch real data
        totalVisits: 5678, // Placeholder
      })
    } catch (err) {
      console.error("Error fetching dashboard stats:", err)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Total Plants"
          value={stats.totalPlants}
          icon={<FaLeaf className="icon green" />}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers className="icon blue" />}
        />
        <StatCard
          title="Active Modules"
          value={stats.activeModules}
          icon={<FaBook className="icon yellow" />}
        />
        <StatCard
          title="Total Visits"
          value={stats.totalVisits.toLocaleString()}
          icon={<FaChartLine className="icon purple" />}
        />
      </div>

      {/* You can also fetch recent activities if you store them */}
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <ActivityItem
            user="John Doe"
            action="added a new plant - Tulsi"
            time="2 hours ago"
          />
          <ActivityItem
            user="Admin"
            action="updated Aloe Vera details"
            time="5 hours ago"
          />
          <ActivityItem
            user="Jane Smith"
            action="enrolled in a learning module"
            time="1 day ago"
          />
        </ul>
      </div>

      <div className="quick-actions">
        <QuickAction
          title="Add New Plant"
          link="/admin/admindashboard/plants"
        />
        <QuickAction title="Manage Users" link="/admin/admindashboard/users" />
        <QuickAction
          title="View Analytics"
          link="/admin/admindashboard/analytics"
        />
      </div>
    </div>
  )
}

export default DashboardHome

/* Reusable Components (same as before) */
function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      {icon}
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  )
}

function ActivityItem({ user, action, time }) {
  return (
    <li className="activity-item">
      <span className="user-name">{user}</span>
      <span className="activity-action">{action}</span>
      <span className="activity-time">{time}</span>
    </li>
  )
}

function QuickAction({ title, link }) {
  return (
    <a href={link} className="quick-action">
      {title}
    </a>
  )
}
