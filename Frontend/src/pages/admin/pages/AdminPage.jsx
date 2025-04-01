import React from "react"
import Header from "../../../components/Header"
import { Link } from "react-router-dom"
import "../../../components/Admin.css"

function AdminPage() {
  return (
    <div>
      <Header />
      <h1>Admin Page : working on it....</h1>
      <Link to="/add-plant" className="cardAddplant">
        <i className="fas fa-seedling"></i>
        <span>🌿 Add Plant</span>
      </Link>
    </div>
  )
}

export default AdminPage
