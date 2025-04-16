import mongoose from "mongoose"

const learningModuleSchema = new mongoose.Schema(
  {
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true, // Optional, based on your logic
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    objectives: {
      type: [String],
      default: [],
    },
    resources: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    completionCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Indexes
learningModuleSchema.index({
  title: "text",
  description: "text",
  category: "text",
})
learningModuleSchema.index({ category: 1 })
learningModuleSchema.index({ level: 1 })
learningModuleSchema.index({ isPublished: 1 })

const LearningModule = mongoose.model("LearningModule", learningModuleSchema)

export default LearningModule
