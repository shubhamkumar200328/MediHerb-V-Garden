import React, { useState } from "react"
import PlantDetailsModal from "./PlantDetailsModel.jsx"
import "../components/PlantCard.css"

const PlantCard = ({ plant }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="PlantCard__Cardcontainer">
      <div className="PlantCard__card" onClick={() => setShowDetails(true)}>
        <img
          src={plant.image}
          alt={plant.name}
          className="PlantCard__cardImage"
        />
        <h3 className="PlantCard__cardTitle">{plant.name}</h3>
        <p className="PlantCard__cardDescription">{plant.description}</p>
        <div className="PlantCard__cardInfo">
          <p>
            <strong>Medicinal Use:</strong> {plant.medicinalUse}
          </p>
          <p>
            <strong>Region:</strong> {plant.region}
          </p>
        </div>
        {showDetails && (
          <PlantDetailsModal
            plantId={plant.id}
            onClose={() => setShowDetails(false)}
            className="PlantCard__cardModal"
          />
        )}
      </div>
    </div>
  )
}

export default PlantCard
