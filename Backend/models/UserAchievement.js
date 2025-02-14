import mongoose from "mongoose"

const userAchievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
  dateAchieved: { type: Date, default: Date.now },
})

export default mongoose.model("UserAchievement", userAchievementSchema)
