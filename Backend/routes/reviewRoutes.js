import express from "express"
import Review from "../models/Review.js"

const router = express.Router()

// Save new review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body)
    await review.save()
    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Get all reviews (or filter by date later)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
