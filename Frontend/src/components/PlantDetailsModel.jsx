import React, { useEffect, useState } from "react"
import { fetchPlantDetails } from "../services/api.js"

const PlantDetailsModal = ({ plantId }) => {
  const [plantDetails, setPlantDetails] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlantDetails(plantId)
        setPlantDetails(response.data)
      } catch (error) {
        console.error("Error fetching plant details:", error)
      }
    }
    fetchData()
  }, [plantId])

  if (!plantDetails) return null

  return (
    <div className="modal">
      <h2>{plantDetails.name}</h2>
      <img src={plantDetails.image} alt={plantDetails.name} />
      <p>{plantDetails.description}</p>
      <p>
        <strong>Medicinal Use:</strong> {plantDetails.medicinalUse}
      </p>
      <p>
        <strong>Region:</strong> {plantDetails.region}
      </p>
    </div>
  )
}

export default PlantDetailsModal
