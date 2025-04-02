import React, { useState, useEffect } from "react"
import axios from "axios"
import "./PlantManagement.css"

const PlantManagement = () => {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingPlant, setEditingPlant] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    medicinalUse: "",
    region: "",
    botanicalDetails: {
      kingdom: "",
      clade: "",
      order: "",
      family: "",
      genus: "",
      species: "",
      binomialName: "",
    },
    cultivationTips: {
      soil: "",
      water: "",
      sunlight: "",
      temperature: "",
    },
    about: "",
    detailDescription: "",
    reference: "",
    learningModules: [],
  })

  // Get token from localStorage
  const token = localStorage.getItem("token")

  // Configure axios defaults
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  const fetchPlants = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5015/api/plants")
      setPlants(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching plants:", err)
      setError(err.response?.data?.message || "Failed to fetch plants")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPlant) {
        await axios.put(
          `http://localhost:5015/api/plants/${editingPlant._id}`,
          formData
        )
        setSuccess("Plant updated successfully!")
      } else {
        await axios.post("http://localhost:5015/api/plants", formData)
        setSuccess("Plant added successfully!")
      }
      setFormData({
        name: "",
        image: "",
        description: "",
        medicinalUse: "",
        region: "",
        botanicalDetails: {
          kingdom: "",
          clade: "",
          order: "",
          family: "",
          genus: "",
          species: "",
          binomialName: "",
        },
        cultivationTips: {
          soil: "",
          water: "",
          sunlight: "",
          temperature: "",
        },
        about: "",
        detailDescription: "",
        reference: "",
        learningModules: [],
      })
      setEditingPlant(null)
      fetchPlants()
    } catch (err) {
      console.error("Error saving plant:", err)
      setError(err.response?.data?.message || "Failed to save plant")
    }
  }

  const handleEdit = (plant) => {
    setEditingPlant(plant)
    setFormData(plant)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await axios.delete(`http://localhost:5015/api/plants/${id}`)
        setSuccess("Plant deleted successfully!")
        fetchPlants()
      } catch (err) {
        console.error("Error deleting plant:", err)
        setError(err.response?.data?.message || "Failed to delete plant")
      }
    }
  }

  const handleCancel = () => {
    setEditingPlant(null)
    setFormData({
      name: "",
      image: "",
      description: "",
      medicinalUse: "",
      region: "",
      botanicalDetails: {
        kingdom: "",
        clade: "",
        order: "",
        family: "",
        genus: "",
        species: "",
        binomialName: "",
      },
      cultivationTips: {
        soil: "",
        water: "",
        sunlight: "",
        temperature: "",
      },
      about: "",
      detailDescription: "",
      reference: "",
      learningModules: [],
    })
  }

  if (loading) return <div className="loading">Loading plants...</div>

  return (
    <div className="plant-management-container">
      <h2>Plant Management</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="plant-management-grid">
        <div className="plant-list-card">
          <h3>Plant List</h3>
          <div className="plant-list">
            {plants.map((plant) => (
              <div key={plant._id} className="plant-item">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="plant-thumbnail"
                />
                <div className="plant-info">
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                </div>
                <div className="plant-actions">
                  <button onClick={() => handleEdit(plant)}>Edit</button>
                  <button onClick={() => handleDelete(plant._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="plant-form-card">
          <h3>{editingPlant ? "Edit Plant" : "Add New Plant"}</h3>
          <form onSubmit={handleSubmit} className="plant-form">
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
              <label className="required">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
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
              <label className="required">Medicinal Use</label>
              <input
                type="text"
                name="medicinalUse"
                value={formData.medicinalUse}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="required">Region</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Detail Description</label>
              <textarea
                name="detailDescription"
                value={formData.detailDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Reference</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit">
                {editingPlant ? "Update Plant" : "Add Plant"}
              </button>
              {editingPlant && (
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

export default PlantManagement
