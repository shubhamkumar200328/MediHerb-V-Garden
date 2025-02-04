import React from "react"
import "../components/ThreedViewVideo.css"
import Header from "../components/Header"

function ThreedViewVideo() {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Aloe_Vera.jpg/220px-Aloe_Vera.jpg" // Replace with your image URL
  const videoUrl = "https://youtu.be/RO8wcUinppM?t=4"

  return (
    <>
      <Header />
      <div className="app-container">
        <h1 className="title">Display Image and Video from Links</h1>

        {/* Display Image */}
        <div className="media-container">
          <h2>Image:</h2>
          <img
            src={imageUrl}
            alt="Displayed from link"
            className="media-image"
          />
        </div>

        {/* Display Video */}
        <div className="media-container">
          <h2>Video:</h2>
          <video className="media-video" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  )
}

export default ThreedViewVideo
