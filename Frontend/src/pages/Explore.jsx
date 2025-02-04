import React, { useState, useEffect } from "react"
import { fetchPlants } from "../services/api.js"
import "../components/Explore.css"
import PlantCard from "../components/PlantCard.jsx"
import Header from "../components/Header.jsx"

// Custom hook for debouncing the search input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const Explore = () => {
  const [plants, setPlants] = useState([])
  const [filters, setFilters] = useState({
    name: "",
    medicinalUse: "",
    region: "",
  })

  // Debounced value for the search filter
  const debouncedName = useDebounce(filters.name, 500) // 500ms delay

  // Fetch plants data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      console.log("Current filters:", filters) // Log filters to check their values
      try {
        // If no filters are applied, fetch all plants
        const response = await fetchPlants({ ...filters, name: debouncedName })
        console.log("Fetched plants:", response.data) // Log the response
        setPlants(response.data)
      } catch (error) {
        console.error("Error fetching plants:", error)
      }
    }

    // Trigger fetch only if the filters change
    fetchData()
  }, [filters, debouncedName])

  // Handle search input change
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
            value={filters.name} // Ensure the input value is updated with filters.name
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
          {plants.length > 0 ? (
            plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
          ) : (
            <p>No plants found based on the selected filters.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Explore
