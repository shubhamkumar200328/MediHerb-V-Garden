import React, { useState, useEffect } from "react"
import { fetchPlants } from "../services/api.js"
import "../components/Explore.css"
import PlantCard from "../components/PlantCard.jsx"
import Header from "../components/Header.jsx"

const Explore = () => {
  const [plants, setPlants] = useState([])
  const [filters, setFilters] = useState({
    name: "",
    medicinalUse: "",
    region: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlants(filters)
        setPlants(response.data)
      } catch (error) {
        console.error("Error fetching plants:", error)
      }
    }
    fetchData()
  }, [filters])

  const handleSearch = (e) => {
    setFilters({ ...filters, name: e.target.value })
  }

  return (
    <>
      <Header />
      <div className="explore-page">
        <h1>Explore Medicinal Plants</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search plants by name..."
            onChange={handleSearch}
            value={filters.name} // Ensure the input value is updated
          />
          <select
            onChange={(e) =>
              setFilters({ ...filters, medicinalUse: e.target.value })
            }
            value={filters.medicinalUse} // Sync the selected value with the state
          >
            <option value="">All Uses</option>
            <option value="Immunity">Immunity</option>
            <option value="Skin Care">Skin Care</option>
          </select>
          <select
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            value={filters.region} // Sync the selected value with the state
          >
            <option value="">All Regions</option>
            <option value="India">India</option>
            <option value="Tropical">Tropical</option>
          </select>
        </div>
        <div className="plant-grid">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Explore
