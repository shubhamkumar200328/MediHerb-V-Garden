import { Link } from "react-router-dom"
import "../adminStyling/Sidebar.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole")
    if (!token || role !== "admin") {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div className="w-64 bg-white shadow-md h-full p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin/admindashboard" className="text-blue-500">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/admindashboard/plants" className="text-blue-500">
            Manage Plants
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/admindashboard/users" className="text-blue-500">
            Manage Users
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/admindashboard/modules" className="text-blue-500">
            Learning Modules
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/admindashboard/analytics" className="text-blue-500">
            Analytics
          </Link>
        </li>
        <li className="mb-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
