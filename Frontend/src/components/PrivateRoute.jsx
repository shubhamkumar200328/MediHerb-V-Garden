import { Navigate } from "react-router-dom"

function PrivateRoute({ children, admin = false }) {
  const token = localStorage.getItem("token")

  if (!token) return <Navigate to="/signin" />

  // In a real-world scenario, fetch user role from backend and validate it here
  return children
}

export default PrivateRoute
