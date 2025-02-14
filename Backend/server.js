import express, { json } from "express"
import cors from "cors"
import plants from "./data/plants.js"
import path from "path"
import fs from "fs"
import authRoutes from "./routes/auth.js"
import forumRoutes from "./routes/forum.js"
import gamificationRoutes from "./routes/gamification.js"

// Get the directory name from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()
const PORT = 5015

app.use("/auth", authRoutes)
app.use("/forum", forumRoutes)
app.use("/gamification", gamificationRoutes)

// Middleware
app.use(
  cors({
    origin: "*", // Or specify your frontend URL (e.g., 'http://localhost:3000')
  })
)
app.use(json())

// Serve static files from the "public" directory
app.use("/images", express.static(path.join(__dirname, "public/images")))

// Serve the plants.js file as a static file
app.get("/data/plants.js", (req, res) => {
  const filePath = path.resolve(__dirname, "data", "plants.js") // Absolute path using path.resolve
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err)
      res.status(500).send("Unable to send plants.js file.")
    }
  })
})

// Routes
app.get("/", (req, res) => {
  res.send("server is ready.")
})

app.get("/api/plants", (req, res) => {
  res.json(plants)
})

// Add this new route for adding a plant
app.post("/api/plants", (req, res) => {
  const newPlant = req.body

  // Log the received data to see what's coming from the frontend
  console.log("Received new plant data:", newPlant)

  // Check if all required fields are present
  if (
    !newPlant.name ||
    !newPlant.image ||
    !newPlant.description ||
    !newPlant.medicinalUse ||
    !newPlant.region ||
    !newPlant.botanicalDetails ||
    !newPlant.cultivationTips
  ) {
    console.error("Missing required fields!")
    return res.status(400).json({ error: "All fields are required." })
  }

  // Log before pushing the new plant
  console.log("Adding new plant to the array...")
  plants.push(newPlant)

  // Log before attempting to write to the file
  const filePath = path.resolve(__dirname, "data", "plants.js") // Absolute path
  const dataToWrite = `const plants = ${JSON.stringify(
    plants,
    null,
    2
  )};\n\nexport default plants;`

  console.log("Writing to plants.js file...")

  // Attempt to write to plants.js
  fs.writeFile(filePath, dataToWrite, (err) => {
    if (err) {
      console.error("Error saving to file:", err)
      return res.status(500).json({ error: "Failed to save data." })
    }

    // Log success and respond with the new plant
    console.log("New plant added successfully:", newPlant)
    res.status(201).json(newPlant)
  })
})

app.get("/api/plants/:id", (req, res) => {
  const plantId = parseInt(req.params.id, 10)
  const plant = plants.find((p) => p.id === plantId)

  if (!plant) {
    return res.status(404).json({ error: "Plant not found" })
  }

  res.json(plant)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
