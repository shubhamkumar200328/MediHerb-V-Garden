import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Navbar.css" // Import the CSS file

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>

      {!token ? (
        <>
          <Link to="/register" className="nav-link">
            Register
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </>
      ) : (
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="dropdown-btn">Menu ▼</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/userprofile" className="dropdown-item">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="dropdown-item logout-btn"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
