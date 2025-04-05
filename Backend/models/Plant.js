import mongoose from "mongoose"

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
      kingdom: { type: String, required: true },
      clade: { type: String, required: true },
      order: { type: String, required: true },
      family: { type: String, required: true },
      genus: { type: String, required: true },
      species: { type: String, required: true },
      binomialName: { type: String, required: true },
    },
    cultivationTips: {
      soil: { type: String, required: true },
      water: { type: String, required: true },
      sunlight: { type: String, required: true },
      temperature: { type: String, required: true },
    },
    about: {
      type: String,
      required: true,
    },
    detailDescription: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Plant = mongoose.model("Plant", plantSchema)

export default Plant
