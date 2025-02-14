import React, { useEffect, useState } from "react"
import axios from "axios"

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5010/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data)
    }
    fetchUser()
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Favorite Plants</h2>
      <ul>
        {user.favoritePlants.map((plant) => (
          <li key={plant._id}>{plant.name}</li>
        ))}
      </ul>
      <h2>Notes</h2>
      <ul>
        {user.notes.map((note) => (
          <li key={note._id}>
            <strong>{note.plantId.name}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
