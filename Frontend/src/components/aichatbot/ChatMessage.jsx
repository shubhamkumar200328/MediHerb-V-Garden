// src/components/ChatMessage.jsx
import React from "react"

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user"

  return (
    <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isUser ? "bg-green-300 text-right" : "bg-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  )
}

export default ChatMessage
