import { useState, useContext } from "react"
import { AuthContext } from "../context/authContext.jsx"
import "../components/Login.css" // Import CSS file
import Header from "../components/Header.jsx"

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("Attempting login...")
      const response = await login({ email, password })
      console.log("Login successful:", response)

      // Store user role in localStorage
      if (response.user && response.user.role) {
        localStorage.setItem("userRole", response.user.role)
      }

      // Redirect based on role
      if (response.user.role === "admin") {
        window.location.href = "/admin/admindashboard"
      } else {
        window.location.href = "/userprofile"
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
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
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
