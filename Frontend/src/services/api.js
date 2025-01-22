import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5010/api", // Backend URL
})

export const fetchPlants = (filters) => api.get("/plants", { params: filters })
export const fetchPlantDetails = (id) => api.get(`/plants/${id}`)
