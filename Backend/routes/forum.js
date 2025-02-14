import express from "express"
import ForumPost from "../models/ForumPost.js"

const router = express.Router()

router.post("/posts", async (req, res) => {
  const { title, content, author } = req.body
  const post = new ForumPost({ title, content, author })
  await post.save()
  res.status(201).json(post)
})

router.get("/posts", async (req, res) => {
  const posts = await ForumPost.find()
    .populate("author")
    .populate("comments.author")
  res.json(posts)
})

router.post("/posts/:id/comments", async (req, res) => {
  const { content, author } = req.body
  const post = await ForumPost.findById(req.params.id)
  post.comments.push({ content, author })
  await post.save()
  res.status(201).json(post)
})

export default router
