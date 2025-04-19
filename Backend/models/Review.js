import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema(
  {
    text: String,
    sentiment: {
      label: String,
      confidence: {
        Negative: Number,
        Neutral: Number,
        Positive: Number,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const Review = mongoose.model("Review", reviewSchema)
export default Review
