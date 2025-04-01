import express from "express"
import {
  getPlants,
  getPlantById,
  addPlant,
} from "../controllers/plantController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getPlants)
router.get("/:id", getPlantById)
router.post("/", protect, adminOnly, addPlant) // Only admins can add plants

export default router
