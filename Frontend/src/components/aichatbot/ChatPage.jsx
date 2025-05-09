// src/components/ChatPage.jsx
import React, { useState } from "react"
import { sendChatMessage } from "../../services/api.js"
import ChatMessage from "./ChatMessage"

const ChatPage = () => {
  const [input, setInput] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: "user", text: input }
    setChat((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const res = await sendChatMessage(input)
      const botMessage = { sender: "bot", text: res.reply }
      setChat((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I couldn't fetch an answer right now.",
      }
      setChat((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setInput("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        🌿 Virtual Herbal Garden Chat
      </h1>

      <div className="h-96 overflow-y-auto mb-4 border p-4 rounded">
        {chat.length === 0 && (
          <p className="text-gray-500">Ask about any medicinal plant...</p>
        )}
        {chat.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <p className="text-gray-400">Typing...</p>}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question..."
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
