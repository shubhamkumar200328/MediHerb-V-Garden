import React from "react"
import "./PlantDetailsModel.css"

const PlantDetailsModal = ({ plant, onClose }) => {
  if (!plant) return null // If no plant data, return null

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">
          Close
        </button>
        <h2>{plant.name}</h2>
        <img src={plant.image} alt={plant.name} className="modal-image" />
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
          <strong>Botanical Details:</strong> {plant.botanicalDetails}
        </p>
        <p>
          <strong>Cultivation Tips:</strong> {plant.cultivationTips}
        </p>
      </div>
    </div>
  )
}

export default PlantDetailsModal
