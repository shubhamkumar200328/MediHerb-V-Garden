import jwt from "jsonwebtoken"
import User from "../models/User.js"

// Protect routes
export const protect = async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
      console.log("Received Token:", token) // Log token for debugging

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } else {
      res.status(401).json({ message: "Not authorized, no token" })
    }
  } catch (error) {
    console.error("Error with token:", error)
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Not authorized as admin" })
  }
}
