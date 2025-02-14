import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritePlants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
  notes: [
    {
      plantId: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
      content: String,
    },
  ],
})

export default mongoose.model("User", userSchema)
