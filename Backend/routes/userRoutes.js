import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { authMiddleware, adminMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all users - admin only
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

// Get single user - admin or self
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })

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

// Create new user - admin only
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      role,
      phone,
      address,
      profileImage,
    } = req.body

    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      profileImage,
    })

    await newUser.save()

    const userObj = newUser.toObject()
    delete userObj.password

    res.status(201).json(userObj)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message })
  }
})

// Update user - admin or self
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, password, role, phone, address, profileImage } =
      req.body

    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (name) user.name = name
    if (email) user.email = email
    if (phone) user.phone = phone
    if (address) user.address = address
    if (profileImage) user.profileImage = profileImage

    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    if (role && req.user.role === "admin") user.role = role

    await user.save()

    const userObj = user.toObject()
    delete userObj.password

    res.json(userObj)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message })
  }
})

// Delete user - admin only
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    await user.deleteOne()
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message })
  }
})

export default router
