import mongoose from "mongoose"

const learningModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  resources: [
    {
      type: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
})

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    medicinalUse: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    botanicalDetails: {
      type: String,
      required: true,
    },
    cultivationTips: {
      type: String,
      required: true,
    },
    Kingdom: {
      type: String,
      required: true,
    },
    Clade: {
      type: String,
      required: true,
    },
    Order: {
      type: String,
      required: true,
    },
    Family: {
      type: String,
      required: true,
    },
    Genus: {
      type: String,
      required: true,
    },
    Species: {
      type: String,
      required: true,
    },
    BinomialName: {
      type: String,
      required: true,
    },
    About: {
      type: String,
      required: true,
    },
    DetailDescription: {
      type: String,
      required: true,
    },
    Reference: {
      type: String,
      required: true,
    },
    learningModules: [learningModuleSchema],
  },
  {
    timestamps: true,
  }
)

const Plant = mongoose.model("Plant", plantSchema)

export default Plant
