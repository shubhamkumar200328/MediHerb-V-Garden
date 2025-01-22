import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text text-[#1d3c1d]">MediHerb V Garden</h1>
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
        </ul>
      </nav>
    </header>
  )
}

export default Header
