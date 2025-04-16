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

      <div className="learning-modules mt-10">
        {plant.learningModules && plant.learningModules.length > 0 && (
          <>
            {/* <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
              📖 E-Learning Modules
            </h2> */}

            <div className="user-module-grid">
              {plant.learningModules.map((module, index) => (
                <div key={index} className="user-module-card">
                  <h2 className="text-4xl text-center font-bold mb-6 text-green-800 flex items-center gap-2">
                    📖 E-Learning Modules
                  </h2>
                  <div className="imageVideoDiv px-20">
                    <div className="imageDiv">
                      {module.image && (
                        <div className="imageDiv">
                          <img
                            src={module.image}
                            alt={module.title}
                            className="learning-module-image"
                          />
                        </div>
                      )}
                    </div>
                    <div className="VideoN3DDiv media-buttons">
                      <div
                        className="modelDiv mx-8"
                        onClick={() => setShow3DPopup(true)}
                      >
                        3D
                      </div>
                      <div
                        className="modelDiv"
                        onClick={() => setShowVideoPopup(true)}
                      >
                        Video
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-semibold text-green-700">
                      {module.title}
                    </h3>

                    <div className="text-m text-gray-700 space-y-1">
                      {/* <p>
                        <strong>🌱 Plant ID:</strong> {module.plantId}
                      </p> */}
                      <p>
                        <strong>📂 Category:</strong> {module.category}
                      </p>
                      <p>
                        <strong>📘 Level:</strong> {module.level}
                      </p>
                      <p>
                        <strong>⏱ Duration:</strong> {module.duration}
                      </p>
                      <p className="italic text-gray-600">
                        {module.description}
                      </p>

                      {module.prerequisites?.length > 0 && (
                        <p>
                          <strong>🧠 Prerequisites:</strong>{" "}
                          {module.prerequisites.join(", ")}
                        </p>
                      )}

                      {module.objectives?.length > 0 && (
                        <p>
                          <strong>🎯 Objectives:</strong>{" "}
                          {module.objectives.join(", ")}
                        </p>
                      )}

                      {module.content && (
                        <div>
                          <strong>📖 Content:</strong>
                          <p>{module.content}</p>
                        </div>
                      )}

                      {/* {module.resources && module.resources.length > 0 && (
                        <div>
                          <strong>🔗 Resources:</strong>
                          <ul className="list-disc ml-6 mt-1 space-y-1 text-blue-600">
                            {module.resources.map((resource, idx) => (
                              <li key={idx}>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {resource.type}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )} */}

                      {module.tags && Array.isArray(module.tags) && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {module.tags.map((tag) => (
                            <span key={tag} className="tag-badge">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
