import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
// import fs from "fs"

import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import forumRoutes from "./routes/forum.js"
import gamificationRoutes from "./routes/gamification.js"
import plantRoutes from "./routes/plantRoutes.js" // Plants API routes
import protectedRoutes from "./routes/protected.js"
import { protect } from "./middleware/authMiddleware.js"

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env vars
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5015

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ MongoDB connection established")
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err)
    process.exit(1)
  })

// Middleware
app.use(cors({ origin: "*" }))
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/forum", forumRoutes)
app.use("/gamification", gamificationRoutes)
app.use("/api/plants", plantRoutes) // Plants API
app.use("/api/protected", protectedRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Server is running.")
})

app.use("/auth/profile", protect, (req, res) => {
  res.json({ message: "Authenticated user", user: req.user })
})

// Serve static files (Images)
app.use("/images", express.static(path.join(__dirname, "public/images")))

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

// Protect "Add Plant" API
// app.post("/api/plants", authMiddleware, async (req, res) => {
//   try {
//     const newPlant = new Plant(req.body)
//     const savedPlant = await newPlant.save()
//     res.status(201).json(savedPlant)
//   } catch (error) {
//     console.error("❌ Error adding plant:", error)
//     res.status(500).json({ message: "Failed to add plant", error })
//   }
// })

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})
