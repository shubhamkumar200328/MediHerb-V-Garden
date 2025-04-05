import { Schema, model } from "mongoose"

const activitySchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
})

export default model("Activity", activitySchema)
