// controllers/activityController.js
import Activity from "../models/Activity.js"

// Get recent activities (sorted by newest first, limit 10)
export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(10)
    res.status(200).json(activities)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities" })
  }
}
