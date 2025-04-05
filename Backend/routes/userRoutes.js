import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { authMiddleware, adminMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all users (admin only)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message })
  }
})

// Get single user (admin or self)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user is admin or requesting their own data
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    res.json(user)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message })
  }
})

// Create new user (admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body

    if (!name || !email || !password || !role || !username) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    })

    await newUser.save()

    const userWithoutPassword = newUser.toObject()
    delete userWithoutPassword.password

    res.status(201).json(userWithoutPassword)
  } catch (error) {
    console.error("Error creating user:", error)
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message })
  }
})

// Update user (admin or self)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, password, role, phone, address, profileImage } =
      req.body

    // Check if user exists
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user is admin or updating their own data
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    // Update fields
    if (name) user.name = name
    if (email) user.email = email
    if (password) user.password = password
    if (role && req.user.role === "admin") user.role = role
    if (phone) user.phone = phone
    if (address) user.address = address
    if (profileImage) user.profileImage = profileImage

    await user.save()
    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password

    res.json(userWithoutPassword)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message })
  }
})

// Delete user (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await User.findByIdAndDelete(req.params.id)

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message })
  }
})

export default router
