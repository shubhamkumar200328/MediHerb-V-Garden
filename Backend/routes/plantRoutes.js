import express from "express"
import {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
  searchPlants,
  filterPlants,
} from "../controllers/plantController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import Plant from "../models/Plant.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// Test route to check database status
router.get("/test", async (req, res) => {
  try {
    const count = await Plant.countDocuments()
    res.json({
      message: "Plant collection status",
      plantCount: count,
      databaseConnected: true,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error checking database",
      error: error.message,
    })
  }
})

// Public routes
router.get("/", getAllPlants)
router.get("/search", searchPlants)
router.get("/filter", filterPlants)
router.get("/:id", getPlantById)

// Admin only routes
router.post("/", protect, admin, createPlant)
router.put("/:id", protect, admin, updatePlant)
router.delete("/:id", protect, admin, deletePlant)

// Create new plant (protected route)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newPlant = new Plant(req.body)
    const savedPlant = await newPlant.save()
    res.status(201).json(savedPlant)
  } catch (error) {
    console.error("Error creating plant:", error)
    res.status(400).json({ message: error.message })
  }
})

// Update plant (protected route)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" })
    }
    res.json(updatedPlant)
  } catch (error) {
    console.error("Error updating plant:", error)
    res.status(400).json({ message: error.message })
  }
})

// Delete plant (protected route)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id)
    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" })
    }
    res.json({ message: "Plant deleted successfully" })
  } catch (error) {
    console.error("Error deleting plant:", error)
    res.status(500).json({ message: "Error deleting plant" })
  }
})

export default router
