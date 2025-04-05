import express from "express"
import LearningModule from "../models/LearningModule.js"
import { authMiddleware, adminMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all learning modules
router.get("/", async (req, res) => {
  try {
    const modules = await LearningModule.find()
    res.json(modules)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching modules", error: error.message })
  }
})

// Get single module
router.get("/:id", async (req, res) => {
  try {
    const module = await LearningModule.findById(req.params.id)
    if (!module) {
      return res.status(404).json({ message: "Module not found" })
    }
    res.json(module)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching module", error: error.message })
  }
})

// Create module (admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const module = new LearningModule(req.body)
    await module.save()
    res.status(201).json(module)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating module", error: error.message })
  }
})

// Update module (admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const module = await LearningModule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    if (!module) {
      return res.status(404).json({ message: "Module not found" })
    }
    res.json(module)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating module", error: error.message })
  }
})

// Delete module (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const module = await LearningModule.findByIdAndDelete(req.params.id)
    if (!module) {
      return res.status(404).json({ message: "Module not found" })
    }
    res.json({ message: "Module deleted successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting module", error: error.message })
  }
})

export default router
