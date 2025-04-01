import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

// User Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ error: "User already exists" })

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role })
    await newUser.save()

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error signing up" })
  }
}

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      return res.status(401).json({ error: "Invalid email or password" })

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Error logging in" })
  }
}

// Logout (Client-side removes token, so no API needed)
export const logout = (req, res) => {
  res.json({ message: "User logged out successfully" })
}
