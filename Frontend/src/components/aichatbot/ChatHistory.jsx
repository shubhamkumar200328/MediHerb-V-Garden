// import { useState, useEffect } from "react";
// import ChatMessage from "./ChatMessage";

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const userId = ""; // 🔹 Replace later with real logged-in user/session ID

//   // Load chat history on mount
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/chat-history/${userId}`
//         );
//         const data = await res.json();
//         setMessages(data || []);
//       } catch (err) {
//         console.error("Error fetching history:", err);
//       }
//     };
//     fetchHistory();
//   }, []);

//   // Save message to DB
//   const saveMessage = async (message) => {
//     try {
//       await fetch("http://localhost:5000/api/save-chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, message }),
//       });
//     } catch (err) {
//       console.error("Error saving message:", err);
//     }
//   };

//   // Handle sending new message
//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     await saveMessage(userMsg);

//     setInput("");
//     setLoading(true);

//     try {
//       // Call Ollama backend
//       const res = await fetch("http://localhost:5000/api/ollama/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input }),
//       });

//       const data = await res.json();

//       const botMsg = { sender: "bot", text: data.response || "No reply." };
//       setMessages((prev) => [...prev, botMsg]);
//       await saveMessage(botMsg);
//     } catch (err) {
//       console.error("Error fetching AI reply:", err);
//       const errorMsg = {
//         sender: "bot",
//         text: "⚠️ Sorry, I couldn’t fetch a reply.",
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//       await saveMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle enter key
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 flex flex-col">
//         <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
//           🌿 Virtual Herbal Garden Chat
//         </h1>

//         {/* Chat messages */}
//         <div className="flex-1 overflow-y-auto border p-4 rounded bg-gray-50 mb-4 space-y-2">
//           {messages.length === 0 && (
//             <p className="text-gray-400">Ask about any medicinal plant...</p>
//           )}
//           {messages.map((msg, idx) => (
//             <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
//           ))}
//           {loading && <p className="text-gray-400">Bot is typing...</p>}
//         </div>

//         {/* Input */}
//         <div className="flex space-x-2">
//           <textarea
//             className="flex-1 border rounded p-2 resize-none"
//             rows={2}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your question..."
//           />
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//             onClick={handleSend}
//             disabled={loading}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import { useEffect, useState } from 'react';
import axios from 'axios';

const ChatHistory = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Retrieve userId from localStorage (saved after login)
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch chat history
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5015/api/chat/history', {
          headers: { 'x-user-id': userId }, // sending userId
        });
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post('http://localhost:5015/api/chat/send', {
        userId, // attach userId with message
        message: newMessage,
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Chat with MediHerb Bot</h1>

      <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong>{' '}
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
