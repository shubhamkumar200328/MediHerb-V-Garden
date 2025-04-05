import { useState, useContext } from "react"
import { AuthContext } from "../context/authContext.jsx"
import { useNavigate } from "react-router-dom"
import "../components/Login.css"
import Header from "../components/Header.jsx"

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await login({ email, password })

      // Store token and role in localStorage
      if (response.token) {
        localStorage.setItem("token", response.token)
      }

      if (response.user?.role) {
        localStorage.setItem("userRole", response.user.role)
      }

      // Navigate based on role
      if (response.user.role === "admin") {
        navigate("/admin/admindashboard")
      } else {
        navigate("/userprofile")
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
        {!localStorage.getItem("token") ||
        localStorage.getItem("userRole") !== "admin" ? (
          <p className="admin-register-link">
            Not an admin yet? <a href="/registeradmin">Register as Admin</a>
          </p>
        ) : null}
      </div>
    </>
  )
}

export default Login
