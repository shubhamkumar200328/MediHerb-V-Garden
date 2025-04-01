import express from "express"
import Plant from "../models/Plant.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// GET ALL PLANTS
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find(req.query)
    res.json(plants)
  } catch (error) {
    res.status(500).json({ error: "Error fetching plants" })
  }
})

// GET PLANT BY ID
router.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id)
    if (!plant) return res.status(404).json({ error: "Plant not found" })
    res.json(plant)
  } catch (error) {
    res.status(500).json({ error: "Error fetching plant" })
  }
})

// ADD NEW PLANT (PROTECTED)
router.post("/", protect, async (req, res) => {
  try {
    const newPlant = new Plant(req.body)
    const savedPlant = await newPlant.save()
    res.status(201).json(savedPlant)
  } catch (error) {
    res.status(500).json({ error: "Failed to add plant" })
  }
})

export default router
