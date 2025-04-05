import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from token - try both id and userId
    const userId = decoded.userId || decoded.id
    if (!userId) {
      return res.status(401).json({ message: "Invalid token format" })
    }

    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" })
    }

    // Add user to request
    req.user = user
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(401).json({ message: "Token is not valid" })
  }
}

export const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." })
    }
    next()
  } catch (error) {
    console.error("Admin middleware error:", error)
    res.status(500).json({ message: "Server error" })
  }
}
