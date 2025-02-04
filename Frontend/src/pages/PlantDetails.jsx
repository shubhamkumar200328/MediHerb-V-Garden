import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../components/PlantDetails.css"
import Header from "../components/Header"

const PlantDetails = () => {
  const { id } = useParams()
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for controlling popup visibility
  const [show3DPopup, setShow3DPopup] = useState(false)
  const [showVideoPopup, setShowVideoPopup] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5010/api/plants/${id}`
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  // Handlers for opening popups
  const open3DPopup = () => setShow3DPopup(true)
  const openVideoPopup = () => setShowVideoPopup(true)

  // Handlers for closing popups
  const closePopup = () => {
    setShow3DPopup(false)
    setShowVideoPopup(false)
  }

  return (
    <>
      <Header />
      <div className="plant-details-container">
        <h1 className="plant-title">{plant.name}</h1>
        <div className="plant-details">
          <img src={plant.image} alt={plant.name} className="plant-image" />
          <div className="plant-info">
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
      </div>

      <div className="scientific-classification">
        <div className="col1">
          <h2>Scientific Classification</h2>
          <p>
            <strong>Kingdom:</strong> {plant.Kingdom}
          </p>
          <p>
            <strong>Clade:</strong> {plant.Clade}
          </p>
          <p>
            <strong>Order:</strong> {plant.Order}
          </p>
          <p>
            <strong>Family:</strong> {plant.Family}
          </p>
          <p>
            <strong>Genus:</strong> {plant.Genus}
          </p>
          <p>
            <strong>Species:</strong> {plant.Species}
          </p>
          <p>
            <strong>Binomial Name:</strong> {plant.BinomialName}
          </p>
        </div>
        <div className="col2" onClick={open3DPopup}>
          3D
        </div>
        <div className="col3" onClick={openVideoPopup}>
          Video
        </div>
      </div>

      <div className="additional-info">
        <h2>More Information</h2>
        <p>
          <strong>About:</strong> {plant.About}
        </p>
        <p>
          <strong>Detail Description:</strong> {plant.DetailDescription}
        </p>
        <p>
          <strong>Reference:</strong>
          <a href={plant.Reference} target="_blank" rel="noopener noreferrer">
            {plant.Reference}
          </a>
        </p>
      </div>

      {/* Popup for 3D */}
      {show3DPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>3D Model</h2>
            <p>Here will be the 3D model of the plant.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Popup for Video */}
      {showVideoPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Video</h2>
            <p>Here will be a video about the plant.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default PlantDetails
