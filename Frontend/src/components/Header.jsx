import React from "react"
import "./Header.css"

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text">MediHerb V Garden</h1>
      </div>
      <nav className="nav-menu">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/explore">Explore</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
