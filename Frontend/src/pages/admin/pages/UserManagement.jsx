import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./UserManagement.css"

const UserManagement = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    username: "", // 🔥 add this
    email: "",
    password: "",
    role: "user",
    phone: "",
    address: "",
    profileImage: "",
  })

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("userRole")

    console.log("Checking token/role:", storedToken, storedRole)

    if (!storedToken || storedRole !== "admin") {
      navigate("/login")
      return
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
    fetchUsers()
  }, [navigate])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5015/api/users")
      setUsers(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching users:", err)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        navigate("/login")
      } else {
        setError(err.response?.data?.message || "Failed to fetch users")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:5015/api/users/${editingUser._id}`,
          formData
        )
        setSuccess("User updated successfully!")
      } else {
        await axios.post("http://localhost:5015/api/users", formData)
        setSuccess("User added successfully!")
      }
      setFormData({
        name: "",
        username: "", // 🔥 add this
        email: "",
        password: "",
        role: "user",
        phone: "",
        address: "",
        profileImage: "",
      })
      setEditingUser(null)
      fetchUsers()
    } catch (err) {
      console.error("Error saving user:", err)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        navigate("/login")
      } else {
        setError(err.response?.data?.message || "Failed to save user")
      }
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      username: user.username || "", // 🔥 add this
      email: user.email,
      password: "",
      role: user.role,
      phone: user.phone || "",
      address: user.address || "",
      profileImage: user.profileImage || "",
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5015/api/users/${id}`)
        setSuccess("User deleted successfully!")
        fetchUsers()
      } catch (err) {
        console.error("Error deleting user:", err)
        if (err.response?.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("userRole")
          navigate("/login")
        } else {
          setError(err.response?.data?.message || "Failed to delete user")
        }
      }
    }
  }

  const handleCancel = () => {
    setEditingUser(null)
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      phone: "",
      address: "",
      profileImage: "",
    })
  }

  if (loading) return <div className="loading">Loading users...</div>

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="user-management-grid">
        <div className="user-list-card">
          <h3>User List</h3>
          <div className="user-list">
            {users.map((user) => (
              <div key={user._id} className="user-item">
                <img
                  src={user.profileImage || "/default-avatar.png"}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <span className={`user-role ${user.role}`}>{user.role}</span>
                </div>
                <div className="user-actions">
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="user-form-card">
          <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label className="required">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="required">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="required">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className={editingUser ? "" : "required"}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editingUser}
                placeholder={editingUser ? "Leave blank to keep current" : ""}
              />
            </div>

            <div className="form-group">
              <label className="required">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Profile Image URL</label>
              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingUser ? "Update User" : "Add User"}
              </button>
              {editingUser && (
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
