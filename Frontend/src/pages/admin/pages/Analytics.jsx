import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Analytics.css"

const Analytics = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlants: 0,
    totalModules: 0,
    activeUsers: 0,
    recentActivity: [],
    userGrowth: [],
    moduleEngagement: [],
    plantPopularity: [],
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5015/api/analytics")
      setStats(response.data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch analytics data. Please try again later.")
      console.error("Error fetching analytics:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="error">{error}</div>
        <button onClick={fetchAnalytics} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon users">
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-content">
            <h3>Total Users</h3>
            <p className="metric-value">{stats.totalUsers}</p>
            <p className="metric-change positive">
              +{stats.userGrowth[stats.userGrowth.length - 1]?.growth || 0}%
              this month
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon plants">
            <i className="fas fa-leaf"></i>
          </div>
          <div className="metric-content">
            <h3>Total Plants</h3>
            <p className="metric-value">{stats.totalPlants}</p>
            <p className="metric-change">
              {stats.plantPopularity[stats.plantPopularity.length - 1]?.views ||
                0}{" "}
              views this month
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon modules">
            <i className="fas fa-book"></i>
          </div>
          <div className="metric-content">
            <h3>Learning Modules</h3>
            <p className="metric-value">{stats.totalModules}</p>
            <p className="metric-change">
              {stats.moduleEngagement[stats.moduleEngagement.length - 1]
                ?.completions || 0}{" "}
              completions
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon active">
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="metric-content">
            <h3>Active Users</h3>
            <p className="metric-value">{stats.activeUsers}</p>
            <p className="metric-change">Currently online</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* User Growth Chart */}
        <div className="chart-card">
          <h3>User Growth</h3>
          <div className="chart-container">
            <div className="chart">
              {stats.userGrowth.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="bar"
                    style={{ height: `${data.growth}%` }}
                  ></div>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Engagement Chart */}
        <div className="chart-card">
          <h3>Module Engagement</h3>
          <div className="chart-container">
            <div className="chart">
              {stats.moduleEngagement.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="bar"
                    style={{
                      height: `${
                        (data.completions / stats.totalModules) * 100
                      }%`,
                    }}
                  ></div>
                  <span className="bar-label">{data.moduleName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plant Popularity Chart */}
        <div className="chart-card">
          <h3>Plant Popularity</h3>
          <div className="chart-container">
            <div className="chart">
              {stats.plantPopularity.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="bar"
                    style={{
                      height: `${(data.views / stats.totalPlants) * 100}%`,
                    }}
                  ></div>
                  <span className="bar-label">{data.plantName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {stats.recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                <i className={`fas ${getActivityIcon(activity.type)}`}></i>
              </div>
              <div className="activity-content">
                <p>{activity.description}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to get appropriate icon for activity type
const getActivityIcon = (type) => {
  switch (type) {
    case "user":
      return "fa-user"
    case "plant":
      return "fa-leaf"
    case "module":
      return "fa-book"
    case "login":
      return "fa-sign-in-alt"
    default:
      return "fa-info-circle"
  }
}

export default Analytics
