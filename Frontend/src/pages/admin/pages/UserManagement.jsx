import React, { useEffect, useState } from "react"
import axios from "axios"
import cloudinaryAxios from "../../../utils/cloudinaryAxios.js" // adjust path as needed

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    profileImage: "",
  })

  const [editingUserId, setEditingUserId] = useState(null)

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5015/api/users")
      setUsers(res.data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Secure image upload to Cloudinary
  const handleImageUpload = async (file) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5015/api/cloudinary/generate-signature"
      )

      const uploadForm = new FormData()
      uploadForm.append("file", file)
      uploadForm.append("api_key", data.apiKey)
      uploadForm.append("timestamp", data.timestamp)
      uploadForm.append("signature", data.signature)
      uploadForm.append("folder", "user-profiles")

      const uploadRes = await cloudinaryAxios.post("/image/upload", uploadForm)

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
      setFormData({ ...formData, profileImage: imageUrl })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUserId) {
        await axios.put(
          `http://localhost:5015/api/users/${editingUserId}`,
          formData
        )
      } else {
        await axios.post("http://localhost:5015/api/users", formData)
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        profileImage: "",
      })
      setEditingUserId(null)
      fetchUsers()
    } catch (error) {
      console.error("Error saving user:", error)
    }
  }

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Do not prefill password
      role: user.role,
      profileImage: user.profileImage,
    })
    setEditingUserId(user._id)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5015/api/users/${id}`)
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="file"
          name="profileImage"
          onChange={handleInputChange}
          accept="image/*"
          className="border p-2 rounded"
        />
        {formData.profileImage && (
          <img
            src={formData.profileImage}
            alt="Preview"
            className="h-16 w-16 rounded-full object-cover mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2"
        >
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Users List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-4">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
