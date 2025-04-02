import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import Plant from "../models/Plant.js"
import plants from "../data/plants.js"

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env vars - adjust path to go up one directory to find .env
dotenv.config({ path: path.join(__dirname, "../.env") })

const seedPlants = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables")
    }

    // Connect to MongoDB
    console.log("Connecting to MongoDB...")
    await mongoose.connect(uri)
    console.log("Connected to MongoDB successfully!")

    // Delete existing plants
    console.log("Deleting existing plants...")
    await Plant.deleteMany({})
    console.log("Existing plants deleted successfully!")

    // Insert new plants
    console.log("Inserting new plants...")
    const plantDocs = plants.map((plant) => {
      const { id, ...plantData } = plant // Remove the id field as MongoDB will create its own _id
      return plantData
    })

    await Plant.insertMany(plantDocs)
    console.log(`${plantDocs.length} plants seeded successfully!`)

    // Disconnect from MongoDB
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding plants:", error.message)
    process.exit(1)
  }
}

seedPlants()
