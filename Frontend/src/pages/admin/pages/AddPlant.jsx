import React, { useState } from "react"
import "../../../components/AddPlant.css"
import Header from "../../../components/Header"

const AddPlant = () => {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [medicinalUse, setMedicinalUse] = useState("")
  const [region, setRegion] = useState("")
  const [botanicalDetails, setBotanicalDetails] = useState("")
  const [cultivationTips, setCultivationTips] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (
      !name ||
      !image ||
      !description ||
      !medicinalUse ||
      !region ||
      !botanicalDetails ||
      !cultivationTips
    ) {
      alert("All fields are required!")
      return
    }

    const newPlant = {
      name,
      image,
      description,
      medicinalUse,
      region,
      botanicalDetails,
      cultivationTips,
    }

    // Log the data being sent
    console.log("Sending data:", newPlant)

    try {
      const response = await fetch("http://localhost:5010/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlant),
      })

      if (!response.ok) {
        throw new Error(`Failed to add plant: ${response.statusText}`)
      }

      const addedPlant = await response.json()
      alert(`Plant added: ${addedPlant.name}`)
      resetForm()
    } catch (error) {
      alert(error.message)
    }
  }

  const resetForm = () => {
    setName("")
    setImage("")
    setDescription("")
    setMedicinalUse("")
    setRegion("")
    setBotanicalDetails("")
    setCultivationTips("")
  }

  return (
    <div>
      <Header />
      <h2 className=" text-green-900 text-2xl text-center m-4 font-extrabold">
        Add New Plant
      </h2>
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Medicinal Use:
            <input
              type="text"
              value={medicinalUse}
              onChange={(e) => setMedicinalUse(e.target.value)}
            />
          </label>
          <label>
            Region:
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </label>
          <label>
            Botanical Details:
            <textarea
              value={botanicalDetails}
              onChange={(e) => setBotanicalDetails(e.target.value)}
            />
          </label>
          <label>
            Cultivation Tips:
            <textarea
              value={cultivationTips}
              onChange={(e) => setCultivationTips(e.target.value)}
            />
          </label>
          <button type="submit">Add Plant</button>
        </form>
      </div>
    </div>
  )
}

export default AddPlant
