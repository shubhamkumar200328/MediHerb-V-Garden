import { Router } from "express"
const router = Router()
import { utils } from "../config/cloudinary.js"

router.post("/generate-signature", async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const paramsToSign = {
      timestamp,
      folder: "user-profiles", // Optional: store in specific folder
    }

    const signature = utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    )

    res.json({
      signature,
      timestamp,
      cloudName: "dfecczhpy",
      apiKey: process.env.CLOUDINARY_API_KEY,
    })
  } catch (err) {
    res.status(500).json({ error: "Failed to generate signature" })
  }
})

export default router
