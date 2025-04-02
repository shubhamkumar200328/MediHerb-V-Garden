import Plant from "../models/Plant.js"

// Get all plants
export const getAllPlants = async (req, res) => {
  try {
    console.log("Fetching all plants...")
    const plants = await Plant.find().lean()
    console.log(`Found ${plants.length} plants`)
    res.json(plants)
  } catch (error) {
    console.error("Error in getAllPlants:", error)
    res.status(500).json({
      message: "Error fetching plants",
      error: error.message,
    })
  }
}

// Get plant by ID
export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).lean()
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" })
    }
    res.json(plant)
  } catch (error) {
    console.error("Error in getPlantById:", error)
    res.status(500).json({
      message: "Error fetching plant",
      error: error.message,
    })
  }
}

// Create new plant (admin only)
export const createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body)
    await plant.save()
    res.status(201).json(plant)
  } catch (error) {
    console.error("Error in createPlant:", error)
    res.status(400).json({
      message: "Error creating plant",
      error: error.message,
    })
  }
}

// Update plant (admin only)
export const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" })
    }
    res.json(plant)
  } catch (error) {
    console.error("Error in updatePlant:", error)
    res.status(400).json({
      message: "Error updating plant",
      error: error.message,
    })
  }
}

// Delete plant (admin only)
export const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id)
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" })
    }
    res.json({ message: "Plant deleted successfully" })
  } catch (error) {
    console.error("Error in deletePlant:", error)
    res.status(500).json({
      message: "Error deleting plant",
      error: error.message,
    })
  }
}

// Search plants
export const searchPlants = async (req, res) => {
  try {
    const { query } = req.query
    const plants = await Plant.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { medicinalUse: { $regex: query, $options: "i" } },
        { region: { $regex: query, $options: "i" } },
      ],
    }).lean()
    res.json(plants)
  } catch (error) {
    console.error("Error in searchPlants:", error)
    res.status(500).json({
      message: "Error searching plants",
      error: error.message,
    })
  }
}

// Filter plants by category
export const filterPlants = async (req, res) => {
  try {
    const { medicinalUse, region } = req.query
    const filter = {}

    if (medicinalUse) filter.medicinalUse = medicinalUse
    if (region) filter.region = region

    const plants = await Plant.find(filter).lean()
    res.json(plants)
  } catch (error) {
    console.error("Error in filterPlants:", error)
    res.status(500).json({
      message: "Error filtering plants",
      error: error.message,
    })
  }
}
