import React from "react"
import { Zoom } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import image_1 from "../assets/images/Medi_landing_1.webp"
import image_2 from "../assets/images/Medi_landing_2.webp"
import image_3 from "../assets/images/Medi_landing_3.webp"
import image_4 from "../assets/images/Medi_landing_4.webp"
import image_5 from "../assets/images/Medi_landing_5.webp"

const images = [image_1, image_3, image_4, image_5, image_2]

const Slideshow2 = () => {
  return (
    <div className="slideShow">
      <Zoom scale={0.4}>
        {images.map((each, index) => (
          <img
            key={index}
            style={{ width: "100%" }}
            src={each}
            alt={`slide ${index + 1}`}
          />
        ))}
      </Zoom>
    </div>
  )
}

export default Slideshow2
