import { Link } from "react-router-dom"
import "../adminStyling/Sidebar.css"

function Sidebar() {
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
      </ul>
    </div>
  )
}

export default Sidebar
