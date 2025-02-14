import mongoose from "mongoose"

const forumPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      content: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
})

export default mongoose.model("ForumPost", forumPostSchema)
