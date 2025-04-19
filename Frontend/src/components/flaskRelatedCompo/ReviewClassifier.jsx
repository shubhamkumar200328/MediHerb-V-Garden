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

  const handleSubmit = async () => {
    if (!review.trim()) return

    setLoading(true)
    setResult("")
    setConfidence(null)

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        review,
      })

      setResult(response.data.sentiment)
      setConfidence(response.data.confidence)
    } catch (error) {
      setResult("Error: " + (error.response?.data?.error || "Server error"))
    }

    setLoading(false)
  }

  return (
    <div className="review-card">
      <h2>Live Review Sentiment</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Paste a review..."
        rows={4}
      />
      <button onClick={handleSubmit}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

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
