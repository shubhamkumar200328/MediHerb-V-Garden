import { useState, useContext } from "react"
import { AuthContext } from "../context/authContext.jsx"
import "../components/Register.css" // Import CSS file
import React from "react"
import { ToastContainer, toast } from "react-toastify"
import Header from "../components/Header.jsx"

const Registeradmin = () => {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const notify = () => toast("Your registration has done successfully!")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("Starting registration process...")
      const userData = {
        name,
        username,
        email,
        password,
        role: "admin", // Set role to admin for admin registration
      }
      console.log("Registration data:", { ...userData, password: "***" })

      const response = await register(userData)
      console.log("Registration successful:", response)

      // Show success message before redirect
      setError("Registration successful! Redirecting to login...")
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    } catch (err) {
      console.error("Registration error in component:", err)
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>Admin Register</h2>
        {error && (
          <p
            className={`message ${
              error.includes("successful") ? "success-message" : "error-message"
            }`}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength="2"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <button
            type="submit"
            onClick={notify}
            className="btnfos btnfos-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  )
}

export default Registeradmin
