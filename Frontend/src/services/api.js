// import axios from "axios"

// const api = axios.create({
//   baseURL: "http://localhost:5015/api", // Backend URL
// })

// export const fetchPlants = (filters) => api.get("/plants", { params: filters })
// export const fetchPlantDetails = (id) => api.get(`/plants/${id}`)

import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5015", // Remove /api from base URL
})

// Plant-related APIs
export const fetchPlants = (filters) =>
  api.get("/api/plants", { params: filters })
export const fetchPlantDetails = (id) => api.get(`/api/plants/${id}`)

// User Authentication APIs
export const registerUser = (userData) => api.post("/auth/register", userData)
export const loginUser = (userData) => api.post("/auth/login", userData)
export const logoutUser = () => {
  localStorage.removeItem("token") // Remove token from storage
}
export const getProfile = async () => {
  const token = localStorage.getItem("token")
  return api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// Function to get the token
export const getAuthHeader = () => {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}
