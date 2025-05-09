// routes/ollamaRoutes.js
import { Router } from "express"
const router = Router()
import axios from "axios" // ✅ Fix here

const basePrompt = `You are a medicinal plant expert. Only answer questions from the perspective of Ayurvedic, Unani, Siddha, or other traditional medicinal systems. If the prompt is not related to medicinal plants, say 'I can only answer questions related to medicinal plants.'\n\nUser: `

router.post("/generate", async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: `${basePrompt}${prompt}\nExpert:`,
      stream: false,
    })

    res.json(response.data)
  } catch (error) {
    console.error("Ollama Error:", error.message)
    res.status(500).json({ error: "Failed to fetch from Ollama" })
  }
})

export default router
