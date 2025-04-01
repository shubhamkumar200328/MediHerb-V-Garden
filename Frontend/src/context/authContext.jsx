import { createContext, useState, useEffect } from "react"
import { registerUser, loginUser } from "../services/api.js"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")
    if (token && userRole) {
      setUser({ token, role: userRole })
    }
  }, [])

  const register = async (userData) => {
    try {
      console.log("Sending registration request with data:", userData)
      const response = await registerUser(userData)
      console.log("Registration response:", response)
      return response.data
    } catch (error) {
      console.error("Registration error details:", error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.message || "Registration failed")
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          "No response from server. Please check your connection."
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error setting up the request")
      }
    }
  }

  const login = async (userData) => {
    try {
      const response = await loginUser(userData)
      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("userRole", user.role)
      setUser({ token, role: user.role })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed")
      } else if (error.request) {
        throw new Error(
          "No response from server. Please check your connection."
        )
      } else {
        throw new Error("Error setting up the request")
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
