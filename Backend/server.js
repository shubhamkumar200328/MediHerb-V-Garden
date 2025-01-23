import express, { json } from "express"
import cors from "cors"
import plants from "./data/plants.js"
import path from "path"

// Get the directory name from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()
const PORT = 5010

// Middleware
app.use(
  cors({
    origin: "*", // Or specify your frontend URL (e.g., 'http://localhost:3000')
  })
)
app.use(json())

// Serve static files from the "public" directory
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/models", express.static(path.join(__dirname, "public/models")))
app.use("/media", express.static(path.join(__dirname, "public/media")))

// Routes
app.get("/", (req, res) => {
  res.send("server is ready.")
})

app.get("/api/plants", (req, res) => {
  let filteredPlants = plants

  // Filter by name if provided
  if (req.query.name) {
    filteredPlants = filteredPlants.filter((plant) =>
      plant.name.toLowerCase().includes(req.query.name.toLowerCase())
    )
  }

  // Filter by medicinalUse if provided
  if (req.query.medicinalUse) {
    filteredPlants = filteredPlants.filter(
      (plant) => plant.medicinalUse === req.query.medicinalUse
    )
  }

  // Filter by region if provided
  if (req.query.region) {
    filteredPlants = filteredPlants.filter(
      (plant) => plant.region === req.query.region
    )
  }

  res.json(filteredPlants)
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
