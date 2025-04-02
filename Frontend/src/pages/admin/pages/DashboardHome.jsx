import { FaLeaf, FaUsers, FaChartLine, FaBook } from "react-icons/fa"
import "../../../components/adminStyling/DashboardHome.css" // Import the CSS file
import Sidebar from "../../../components/adminStyling/Sidebar"

function DashboardHome() {
  return (
    <>
      {/* <Sidebar /> */}
      <div className="dashboard-container">
        {/* Page Title */}
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* Stats Overview Section */}
        <div className="stats-grid">
          <StatCard
            title="Total Plants"
            value="120"
            icon={<FaLeaf className="icon green" />}
          />
          <StatCard
            title="Total Users"
            value="450"
            icon={<FaUsers className="icon blue" />}
          />
          <StatCard
            title="Active Modules"
            value="10"
            icon={<FaBook className="icon yellow" />}
          />
          <StatCard
            title="Total Visits"
            value="5,678"
            icon={<FaChartLine className="icon purple" />}
          />
        </div>

        {/* Recent Activities */}
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

        {/* Quick Actions */}
        <div className="quick-actions">
          <QuickAction title="Add New Plant" link="/admin/plants" />
          <QuickAction title="Manage Users" link="/admin/users" />
          <QuickAction title="View Analytics" link="/admin/analytics" />
        </div>
      </div>
    </>
  )
}

export default DashboardHome

/* ------------------ Reusable Components ------------------ */

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
