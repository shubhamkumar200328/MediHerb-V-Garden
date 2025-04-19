import React, { useState } from "react"
import axios from "axios"
import "./ReviewClassifier.css"

const emojiMap = {
  Positive: "😄",
  Neutral: "😐",
  Negative: "😡",
}

const ReviewClassifier = () => {
  const [review, setReview] = useState("")
  const [result, setResult] = useState("")
  const [confidence, setConfidence] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault() // 🔒 Prevent double submission

    if (!review.trim() || loading) return

    console.log("🟡 handleSubmit triggered")

    setLoading(true)
    setResult("")
    setConfidence(null)

    try {
      console.log("🔵 Sending review to Flask backend:", review)
      const response = await axios.post("http://localhost:5000/predict", {
        review,
      })

      const { label, confidence } = response.data
      console.log("🟢 Received from Flask:", { label, confidence })

      setResult(label)
      setConfidence(confidence)

      console.log("🟣 Sending to MongoDB backend...")
      const saveRes = await axios.post("http://localhost:5015/api/sentiments", {
        review,
        label,
        confidence,
      })
      console.log("✅ MongoDB save response:", saveRes.data)
    } catch (error) {
      console.error("❌ Error:", error)
      setResult("Error: " + (error.response?.data?.error || "Server error"))
    }

    setLoading(false)
  }

  return (
    <div className="review-card">
      <h2>Live Review Sentiment</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Paste a review..."
          rows={4}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="result">
          Sentiment:{" "}
          <span>
            {result} {emojiMap[result]}
          </span>
        </div>
      )}

      {confidence && (
        <div className="confidence">
          Confidence:{" "}
          <span>
            Negative: {confidence.Negative}% | Neutral: {confidence.Neutral}% |
            Positive: {confidence.Positive}%
          </span>
        </div>
      )}
    </div>
  )
}

export default ReviewClassifier
