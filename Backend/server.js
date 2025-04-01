import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
// import fs from "fs"

import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import forumRoutes from "./routes/forum.js"
import gamificationRoutes from "./routes/gamification.js"
import plantRoutes from "./routes/plantRoutes.js" // Plants API routes
import protectedRoutes from "./routes/protected.js"
import { protect } from "./middleware/authMiddleware.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5015
const __dirname = path.resolve()

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
