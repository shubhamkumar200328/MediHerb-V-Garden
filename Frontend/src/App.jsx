import React from "react"
import AppRouter from "./routes/Router"
import AuthProvider from "./context/authContext.jsx"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AuthProvider>
  )
}

export default App
