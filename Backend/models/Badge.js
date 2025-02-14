import mongoose from "mongoose"

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  criteria: { type: String, required: true },
})

export default mongoose.model("Badge", badgeSchema)
