import React, { useEffect, useState } from "react"
import axios from "axios"

const Achievements = () => {
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        "http://localhost:5010/gamification/achievements",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setAchievements(response.data)
    }
    fetchAchievements()
  }, [])

  return (
    <div>
      <h1>Achievements</h1>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement._id}>
            <h2>{achievement.badge.name}</h2>
            <p>{achievement.badge.description}</p>
            <p>
              Achieved on:{" "}
              {new Date(achievement.dateAchieved).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Achievements
