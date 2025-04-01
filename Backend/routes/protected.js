import express from "express"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}! This is a protected route.` })
})

export default router
