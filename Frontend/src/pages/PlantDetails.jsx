import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../components/PlantDetails.css"
import Header from "../components/Header"
import { Accordion, AccordionItem } from "../components/ui/Accordian.jsx"

const PlantDetails = () => {
  const { id } = useParams()
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [show3DPopup, setShow3DPopup] = useState(false)
  const [showVideoPopup, setShowVideoPopup] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5015/api/plants/${id}`
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

  return (
    <>
      <Header />
      <div className="plant-details-container">
        <h1 className="plant-title">{plant.name}</h1>
        <div className="plant-details">
          <img src={plant.image} alt={plant.name} className="plant-image" />
          <div className="plant-info">
            <p>
              <strong>Description:</strong> {plant.description}
            </p>
            <p>
              <strong>Medicinal Use:</strong> {plant.medicinalUse}
            </p>
            <p>
              <strong>Region:</strong> {plant.region}
            </p>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <h2>More Information</h2>
        <p>
          <strong>About:</strong> {plant.about || "Not available"}
        </p>
        <p>
          <strong>Detail Description:</strong>{" "}
          {plant.detailDescription || "Not available"}
        </p>
        <p>
          <strong>Reference:</strong>{" "}
          {plant.reference ? (
            <a href={plant.reference} target="_blank" rel="noopener noreferrer">
              {plant.reference}
            </a>
          ) : (
            "Not available"
          )}
        </p>
      </div>

      <div className="scientific-classification">
        <h2>Botanical Details</h2>
        {plant.botanicalDetails ? (
          <>
            <p>
              <strong>Kingdom:</strong> {plant.botanicalDetails.kingdom}
            </p>
            <p>
              <strong>Clade:</strong> {plant.botanicalDetails.clade}
            </p>
            <p>
              <strong>Order:</strong> {plant.botanicalDetails.order}
            </p>
            <p>
              <strong>Family:</strong> {plant.botanicalDetails.family}
            </p>
            <p>
              <strong>Genus:</strong> {plant.botanicalDetails.genus}
            </p>
            <p>
              <strong>Species:</strong> {plant.botanicalDetails.species}
            </p>
            <p>
              <strong>Binomial Name:</strong>{" "}
              {plant.botanicalDetails.binomialName}
            </p>
          </>
        ) : (
          <p>Botanical information not available.</p>
        )}
      </div>

      <div className="cultivation-tips">
        <h2>Cultivation Tips</h2>
        {plant.cultivationTips ? (
          <>
            <p>
              <strong>Soil:</strong> {plant.cultivationTips.soil}
            </p>
            <p>
              <strong>Water:</strong> {plant.cultivationTips.water}
            </p>
            <p>
              <strong>Sunlight:</strong> {plant.cultivationTips.sunlight}
            </p>
            <p>
              <strong>Temperature:</strong> {plant.cultivationTips.temperature}
            </p>
          </>
        ) : (
          <p>Not available</p>
        )}
      </div>

      <div className="learning-modules">
        {plant.learningModules && plant.learningModules.length > 0 && (
          <>
            <h2>E-Learning Modules 📖</h2>
            <Accordion type="single" collapsible className="mt-4">
              {plant.learningModules.map((module, index) => (
                <AccordionItem key={index} title={module.title}>
                  <p className="text-gray-700">{module.content}</p>
                  {module.resources && module.resources.length > 0 && (
                    <ul className="mt-2 space-y-2">
                      {module.resources.map((resource, idx) => (
                        <li key={idx} className="text-blue-600 hover:underline">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resource.type}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </>
        )}
      </div>

      <div className="media-buttons">
        <div className="col3" onClick={() => setShow3DPopup(true)}>
          3D
        </div>
        <div className="col3" onClick={() => setShowVideoPopup(true)}>
          Video
        </div>
      </div>

      {show3DPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>3D Model</h2>
            <p>Here will be the 3D model of the plant.</p>
            <button onClick={() => setShow3DPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {showVideoPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Video</h2>
            <p>Here will be a video about the plant.</p>
            <button onClick={() => setShowVideoPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default PlantDetails
