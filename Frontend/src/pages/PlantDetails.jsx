import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../components/PlantDetails.css"
import Header from "../components/Header"

const PlantDetails = () => {
  const { id } = useParams() // Get plant ID from URL
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5010/api/plants/${id}` // Fetch plant data from backend
        )
        setPlant(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching plant details:", err)
        setError("Failed to load plant details.")
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="plant-details-page">
        <h1>{plant.name}</h1>
        <img
          src={plant.image}
          alt={plant.name}
          className="plant-details-image"
        />
        <div className="plant-details-info">
          <p>
            <strong>Description:</strong> {plant.description}
          </p>
          <p>
            <strong>Medicinal Use:</strong> {plant.medicinalUse}
          </p>
          <p>
            <strong>Region:</strong> {plant.region}
          </p>
          <p>
            <strong>Botanical Details:</strong>{" "}
            {plant.botanicalDetails || "Not available"}
          </p>
          <p>
            <strong>Cultivation Tips:</strong>{" "}
            {plant.cultivationTips || "Not available"}
          </p>
        </div>
      </div>
    </>
  )
}

export default PlantDetails
