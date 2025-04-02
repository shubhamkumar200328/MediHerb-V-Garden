import React, { useState, useEffect } from "react"
import axios from "axios"
import "./LearningModules.css"

const LearningModule = () => {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingModule, setEditingModule] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    duration: "",
    level: "beginner",
    prerequisites: "",
    objectives: "",
    resources: "",
    image: "",
    category: "",
    tags: "",
  })

  // Get token from localStorage
  const token = localStorage.getItem("token")

  // Configure axios defaults
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  const fetchModules = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        "http://localhost:5015/api/learning-modules"
      )
      setModules(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching modules:", err)
      setError(
        err.response?.data?.message || "Failed to fetch learning modules"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchModules()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingModule) {
        await axios.put(
          `http://localhost:5015/api/learning-modules/${editingModule._id}`,
          formData
        )
        setSuccess("Module updated successfully!")
      } else {
        await axios.post("http://localhost:5015/api/learning-modules", formData)
        setSuccess("Module added successfully!")
      }
      setFormData({
        title: "",
        description: "",
        content: "",
        duration: "",
        level: "beginner",
        prerequisites: "",
        objectives: "",
        resources: "",
        image: "",
        category: "",
        tags: "",
      })
      setEditingModule(null)
      fetchModules()
    } catch (err) {
      console.error("Error saving module:", err)
      setError(err.response?.data?.message || "Failed to save module")
    }
  }

  const handleEdit = (module) => {
    setEditingModule(module)
    setFormData({
      title: module.title,
      description: module.description,
      content: module.content,
      duration: module.duration,
      level: module.level,
      prerequisites: module.prerequisites,
      objectives: module.objectives,
      resources: module.resources,
      image: module.image,
      category: module.category,
      tags: module.tags,
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await axios.delete(`http://localhost:5015/api/learning-modules/${id}`)
        setSuccess("Module deleted successfully!")
        fetchModules()
      } catch (err) {
        console.error("Error deleting module:", err)
        setError(err.response?.data?.message || "Failed to delete module")
      }
    }
  }

  const handleCancel = () => {
    setEditingModule(null)
    setFormData({
      title: "",
      description: "",
      content: "",
      duration: "",
      level: "beginner",
      prerequisites: "",
      objectives: "",
      resources: "",
      image: "",
      category: "",
      tags: "",
    })
  }

  if (loading) return <div className="loading">Loading modules...</div>

  return (
    <div className="learning-module-container">
      <h2>Learning Module Management</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="learning-module-grid">
        <div className="module-list-card">
          <h3>Module List</h3>
          <div className="module-list">
            {modules.map((module) => (
              <div key={module._id} className="module-item">
                <img
                  src={module.image || "/default-module.png"}
                  alt={module.title}
                  className="module-image"
                />
                <div className="module-info">
                  <h4>{module.title}</h4>
                  <p>{module.description}</p>
                  <div className="module-meta">
                    <span className={`module-level ${module.level}`}>
                      {module.level}
                    </span>
                    <span className="module-duration">{module.duration}</span>
                    <span className="module-category">{module.category}</span>
                  </div>
                </div>
                <div className="module-actions">
                  <button onClick={() => handleEdit(module)}>Edit</button>
                  <button onClick={() => handleDelete(module._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="module-form-card">
          <h3>{editingModule ? "Edit Module" : "Add New Module"}</h3>
          <form onSubmit={handleSubmit} className="module-form">
            <div className="form-group">
              <label className="required">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="required">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="required">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="required">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            <div className="form-group">
              <label className="required">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prerequisites</label>
              <textarea
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Learning Objectives</label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Resources</label>
              <textarea
                name="resources"
                value={formData.resources}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="required">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Comma-separated tags"
              />
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingModule ? "Update Module" : "Add Module"}
              </button>
              {editingModule && (
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

export default LearningModule
