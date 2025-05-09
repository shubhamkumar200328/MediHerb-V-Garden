import React, { useState } from "react"
import { getOllamaResponse } from "../../services/ollamaService.js"

function OllamaChat() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const reply = await getOllamaResponse(prompt)
    setResponse(reply)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button type="submit">Ask</button>
      </form>
      <p>Response: {response}</p>
    </div>
  )
}

export default OllamaChat
