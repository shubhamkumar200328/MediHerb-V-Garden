import mongoose from "mongoose"

const sentimentSchema = new mongoose.Schema({
  review: { type: String, required: true },
  label: {
    type: String,
    enum: ["Positive", "Neutral", "Negative"],
    required: true,
  },
  confidence: {
    Negative: Number,
    Neutral: Number,
    Positive: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Sentiment = mongoose.model("Sentiment", sentimentSchema)

export default Sentiment
