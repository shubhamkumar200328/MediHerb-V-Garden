import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPassword, role })

    await user.save()
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      )

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      })
    } else {
      res.status(400).json({ error: "Invalid credentials" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// ✅ GET User Profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password") // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" })

    res.json({ name: user.username, email: user.email })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// LOGOUT USER
router.post("/logout", (req, res) => {
  res.json({ message: "User logged out successfully" })
})

export default router
