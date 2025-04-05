import Plant from "../models/Plant.js"
import Activity from "../models/Activity.js" // 👈 Add this at the top

// Get all plants
export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find()
    res.json(plants)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants", error: error.message })
  }
}

// Get single plant
export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id)
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" })
    }
    res.json(plant)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plant", error: error.message })
  }
}

// Create plant with activity logging
export const createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body)
    await plant.save()

    // Log activity
    const activity = new Activity({
      user: req.user?.name || "Admin",
      action: `added a new plant - ${plant.name}`,
    })
    await activity.save()

    res.status(201).json(plant)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating plant", error: error.message })
  }
}

// Update plant
export const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" })
    }

    // Log the activity
    const activity = new Activity({
      user: req.user.name || "Admin",
      action: `updated plant - ${plant.name}`,
    })
    await activity.save()

    res.json(plant)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating plant", error: error.message })
  }
}

// Delete plant
export const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id)
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" })
    }

    // Log the activity
    const activity = new Activity({
      user: req.user.name || "Admin",
      action: `deleted plant - ${plant.name}`,
    })
    await activity.save()

    res.json({ message: "Plant deleted successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting plant", error: error.message })
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
      ],
    })
    res.json(plants)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching plants", error: error.message })
  }
}

// Filter plants
export const filterPlants = async (req, res) => {
  try {
    const { region, medicinalUse } = req.query
    const filter = {}

    if (region) filter.region = region
    if (medicinalUse) filter.medicinalUse = medicinalUse

    const plants = await Plant.find(filter)
    res.json(plants)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering plants", error: error.message })
  }
}
