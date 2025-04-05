import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../components/Explore.css"
import Header from "../components/Header.jsx"

const Explore = () => {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Immunity", "Skin Care"]

  useEffect(() => {
    fetchPlants()
  }, [])

  const fetchPlants = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get("http://localhost:5015/api/plants")
      setPlants(response.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch plants. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || plant.medicinalUse === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleRetry = () => {
    fetchPlants()
  }

  if (loading) {
    return (
      <div className="explore-page">
        <Header />
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading plants...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="explore-page">
        <Header />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="explore-page">
      <Header />
      <div className="explore-container">
        <div className="explore-header">
          <h1>Explore Medicinal Plants</h1>
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="plants-grid">
          {filteredPlants.map((plant) => (
            <Link
              key={plant._id}
              to={`/plant/${plant._id}`}
              className="plant-card-link"
            >
              <div className="plant-card">
                <div className="plant-image-container">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="plant-image"
                    onError={(e) => {
                      e.target.src = "/placeholder-plant.jpg"
                    }}
                  />
                </div>
                <div className="plant-info">
                  <h3>{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <div className="plant-tags">
                    <span className="medicinal-use">{plant.medicinalUse}</span>
                    <span className="region">{plant.region}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="no-results">
            No plants found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore
