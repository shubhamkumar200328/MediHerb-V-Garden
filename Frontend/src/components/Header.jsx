import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")
    if (token && userRole) {
      setUser({ token, role: userRole })
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    setUser(null)
    setDropdownOpen(false)
    navigate("/login")
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text">MediHerb V Garden</h1>
      </div>
      <nav className="nav-menu">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/plant-details">Explore</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/register" className="auth-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="auth-link">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="dropdown-container" ref={dropdownRef}>
              <button className="dropdown-btn" onClick={toggleDropdown}>
                {user.role === "admin" ? "Admin" : "User"} ▼
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/userprofile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admindashboard"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
