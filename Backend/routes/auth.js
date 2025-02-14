import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, email, password: hashedPassword })
  await user.save()
  res.status(201).send("User registered")
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret")
    res.json({ token })
  } else {
    res.status(400).send("Invalid credentials")
  }
})

export default router
