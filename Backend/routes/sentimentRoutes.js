import express from "express"
import Sentiment from "../models/sentimentModel.js"

const router = express.Router()

// Save sentiment review to MongoDB
router.post("/", async (req, res) => {
  try {
    const { review, label, confidence } = req.body

    const newEntry = new Sentiment({
      review,
      label,
      confidence,
    })

    await newEntry.save()
    console.log("✅ Saved:", newEntry)

    res.status(201).json({ message: "Sentiment saved successfully" })
  } catch (err) {
    console.error("❌ Error saving sentiment:", err)
    res.status(500).json({ error: "Failed to save sentiment" })
  }
})

// Get all sentiment data
router.get("/", async (req, res) => {
  try {
    const sentiments = await Sentiment.find().sort({ createdAt: -1 })
    res.json(sentiments)
  } catch (err) {
    console.error("❌ Error fetching sentiments:", err)
    res.status(500).json({ error: "Failed to fetch sentiments" })
  }
})

export default router

// import express from "express"
// import Sentiment from "../models/sentimentModel.js"

// const router = express.Router()

// // 🔥 POST: Save sentiment to DB
// router.post("/", async (req, res) => {
//   try {
//     const { review, label, confidence } = req.body

//     const newEntry = new Sentiment({
//       review,
//       label,
//       confidence,
//       createdAt: new Date(),
//     })

//     await newEntry.save()
//     res.status(201).json({ message: "Sentiment saved successfully" })
//   } catch (err) {
//     console.error("❌ Error saving sentiment:", err)
//     res.status(500).json({ error: "Failed to save sentiment" })
//   }
// })

// // ✅ NEW: GET all sentiment entries
// router.get("/", async (req, res) => {
//   try {
//     const sentiments = await Sentiment.find().sort({ createdAt: -1 })
//     res.json(sentiments)
//   } catch (err) {
//     console.error("❌ Error fetching sentiments:", err)
//     res.status(500).json({ error: "Failed to fetch sentiment data" })
//   }
// })

// export default router
