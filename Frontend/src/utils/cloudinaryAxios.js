// utils/cloudinaryAxios.js
import axios from "axios"

const cloudinaryAxios = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dfecczhpy",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: false, // ✅ VERY IMPORTANT for browser safety
})

export default cloudinaryAxios

// import axios from "axios"

// const cloudinaryAxios = axios.create({
//   baseURL: "https://api.cloudinary.com/v1_1/dfecczhpy",
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// })

// export default cloudinaryAxios
