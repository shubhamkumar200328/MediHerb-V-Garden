import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile } from "../services/api.js" // Import API function
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
        setLoading(false)
      } catch (err) {
        console.error("Error fetching user profile:", err)
        setError("Failed to load user profile")
        setLoading(false)
        navigate("/login")
      }
    }

    fetchUser()
  }, [navigate])

  if (loading) {
    return <div className="profile-container">Loading...</div>
  }

  if (error) {
    return <div className="profile-container error-message">{error}</div>
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user && (
        <div className="profile-info">
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
            <span>{user.role}</span>
          </div>
          <div className="profile-field">
            <label>Member Since:</label>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
