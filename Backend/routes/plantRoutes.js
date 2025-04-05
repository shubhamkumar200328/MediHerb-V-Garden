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
import { authMiddleware, adminMiddleware } from "../middleware/auth.js"
import Plant from "../models/Plant.js"

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
router.post("/", authMiddleware, adminMiddleware, createPlant)
router.put("/:id", authMiddleware, adminMiddleware, updatePlant)
router.delete("/:id", authMiddleware, adminMiddleware, deletePlant)

export default router
