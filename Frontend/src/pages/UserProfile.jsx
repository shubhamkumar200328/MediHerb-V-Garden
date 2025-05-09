import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, updateProfile } from "../services/api.js"
import Header from "../components/Header.jsx"
import ReviewClassifier from "../components/flaskRelatedCompo/ReviewClassifier.jsx"
import "../components/UserProfile.css"
import axios from "axios"
import { deleteOwnAccount } from "../services/api.js"

function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profileImage: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile()
        setUser(data)
        setFormData({
          name: data.name || "",
          password: "",
          profileImage: data.profileImage || "",
        })
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

  const handleImageUpload = async (file) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5015/api/cloudinary/generate-signature"
      )

      const imageFormData = new FormData()
      imageFormData.append("file", file)
      imageFormData.append("api_key", data.apiKey)
      imageFormData.append("timestamp", data.timestamp)
      imageFormData.append("signature", data.signature)
      imageFormData.append("folder", "user-profiles")

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      )

      return uploadRes.data.secure_url
    } catch (err) {
      console.error("Image upload error:", err)
      return ""
    }
  }

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target

    if (name === "profileImage" && files[0]) {
      const imageUrl = await handleImageUpload(files[0])
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await updateProfile(formData) // This API should be secured by token
      setUser(data)
      setEditing(false)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile.")
    }
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      try {
        await deleteOwnAccount()
        localStorage.removeItem("token")
        navigate("/register") // or login or home
      } catch (err) {
        console.error("Delete failed:", err)
        setError("Could not delete your account.")
      }
    }
  }

  if (loading)
    return <div className="profile-container">Loading profile...</div>
  if (error)
    return <div className="profile-container error-message">{error}</div>

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>User Profile</h2>

        {user && (
          <form className="profile-card" onSubmit={handleSubmit}>
            <img
              src={formData.profileImage || "/default-avatar.png"}
              alt={user.name || user.username}
              className="profile-avatar"
            />

            {editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="profile-edit-input"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="profile-edit-input"
                />
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="profile-edit-input"
                />
                <button type="submit" className="profile-btn-save">
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <div className="profile-details">
                  <div className="profile-field">
                    <label>Name:</label>
                    <span>{user.name}</span>
                  </div>
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
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="profile-field">
                    <label>Member Since:</label>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="profile-btn-edit"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="profile-btn-delete"
                >
                  Delete Profile
                </button>
              </>
            )}
          </form>
        )}
      </div>

      <div className="reviewClassifier m-7">
        <ReviewClassifier />
      </div>
    </>
  )
}

export default UserProfile

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { getProfile } from "../services/api.js"
// import Header from "../components/Header.jsx"
// import ReviewClassifier from "../components/flaskRelatedCompo/ReviewClassifier.jsx"
// import "../components/UserProfile.css"

// function UserProfile() {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await getProfile()
//         setUser(data)
//       } catch (err) {
//         console.error("Error fetching user profile:", err)
//         setError("Failed to load user profile. Please login again.")
//         navigate("/login")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUser()
//   }, [navigate])

//   if (loading) {
//     return <div className="profile-container">Loading profile...</div>
//   }

//   if (error) {
//     return <div className="profile-container error-message">{error}</div>
//   }

//   return (
//     <>
//       <Header />
//       <div className="profile-container">
//         <h2>User Profile</h2>

//         {user && (
//           <div className="profile-card">
//             <img
//               src={user.profileImage || "/default-avatar.png"}
//               alt={user.name || user.username}
//               className="profile-avatar"
//             />
//             <div className="profile-details">
//               {user.name && (
//                 <div className="profile-field">
//                   <label>Name:</label>
//                   <span>{user.name}</span>
//                 </div>
//               )}
//               <div className="profile-field">
//                 <label>Username:</label>
//                 <span>{user.username}</span>
//               </div>
//               <div className="profile-field">
//                 <label>Email:</label>
//                 <span>{user.email}</span>
//               </div>
//               <div className="profile-field">
//                 <label>Role:</label>
//                 <span className={`role-badge ${user.role}`}>{user.role}</span>
//               </div>
//               <div className="profile-field">
//                 <label>Member Since:</label>
//                 <span>{new Date(user.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="reviewClassifier m-7">
//         <ReviewClassifier />
//       </div>
//     </>
//   )
// }

// export default UserProfile
