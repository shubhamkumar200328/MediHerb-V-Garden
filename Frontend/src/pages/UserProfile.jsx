import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile } from "../services/api.js"
import Header from "../components/Header.jsx"
import ReviewClassifier from "../components/flaskRelatedCompo/ReviewClassifier.jsx"
import "../components/UserProfile.css"

function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile()
        setUser(data)
      } catch (err) {
        console.error("Error fetching user profile:", err)
        setError("Failed to load user profile. Please login again.")
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  if (loading) {
    return <div className="profile-container">Loading profile...</div>
  }

  if (error) {
    return <div className="profile-container error-message">{error}</div>
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>User Profile</h2>

        {user && (
          <div className="profile-card">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt={user.name || user.username}
              className="profile-avatar"
            />
            <div className="profile-details">
              {user.name && (
                <div className="profile-field">
                  <label>Name:</label>
                  <span>{user.name}</span>
                </div>
              )}
              <div className="profile-field">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="profile-field">
                <label>Role:</label>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>
              <div className="profile-field">
                <label>Member Since:</label>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="reviewClassifier m-7">
        <ReviewClassifier />
      </div>
    </>
  )
}

export default UserProfile
