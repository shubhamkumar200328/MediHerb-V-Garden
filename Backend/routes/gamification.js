import express from "express"
import UserAchievement from "../models/UserAchievement.js"

const router = express.Router()

router.post("/achievements", async (req, res) => {
  const { userId, badgeId } = req.body
  const achievement = new UserAchievement({ user: userId, badge: badgeId })
  await achievement.save()
  res.status(201).json(achievement)
})

router.get("/achievements/:userId", async (req, res) => {
  const achievements = await UserAchievement.find({
    user: req.params.userId,
  }).populate("badge")
  res.json(achievements)
})

export default router
