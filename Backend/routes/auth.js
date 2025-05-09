import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        errors: [
          !name && "Name is required",
          !username && "Username is required",
          !email && "Email is required",
          !password && "Password is required",
        ].filter(Boolean),
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        errors: [
          existingUser.email === email && "Email already registered",
          existingUser.username === username && "Username already taken",
        ].filter(Boolean),
      })
    }

    // Create new user
    const user = new User({
      name,
      username,
      email,
      password,
      role: role || "user",
    })

    await user.save()

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      })
    }
    res.status(500).json({
      message: "Registration failed",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    })
  }
})

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" })
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
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
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Login failed", error: error.message })
  }
})

// ✅ GET User Profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update user profile (protected route)
router.put("/profile", async (req, res) => {
  try {
    const { username, email } = req.body
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update fields
    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Admin only route to get all users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// LOGOUT USER
router.post("/logout", (req, res) => {
  res.json({ message: "User logged out successfully" })
})

export default router
