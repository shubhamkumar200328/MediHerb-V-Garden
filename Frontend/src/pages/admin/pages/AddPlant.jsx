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
  const [kingdom, setKingdom] = useState("")
  const [clade, setClade] = useState("")
  const [order, setOrder] = useState("")
  const [family, setFamily] = useState("")
  const [genus, setGenus] = useState("")
  const [species, setSpecies] = useState("")
  const [binomialName, setBinomialName] = useState("")
  const [about, setAbout] = useState("")
  const [detailDescription, setDetailDescription] = useState("")
  const [reference, setReference] = useState("")

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
          <label>
            Kingdom:
            <input
              type="text"
              value={kingdom}
              onChange={(e) => setKingdom(e.target.value)}
            />
          </label>
          <label>
            Clade:
            <input
              type="text"
              value={clade}
              onChange={(e) => setClade(e.target.value)}
            />
          </label>
          <label>
            Order:
            <input
              type="text"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </label>
          <label>
            Family:
            <input
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
            />
          </label>
          <label>
            Genus:
            <input
              type="text"
              value={genus}
              onChange={(e) => setGenus(e.target.value)}
            />
          </label>
          <label>
            Species:
            <input
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            />
          </label>
          <label>
            Binomial Name:
            <input
              type="text"
              value={binomialName}
              onChange={(e) => setBinomialName(e.target.value)}
            />
          </label>
          <label>
            About:
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
          <label>
            Detailed Description:
            <textarea
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
            />
          </label>
          <label>
            Reference:
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </label>

          <button type="submit">Add Plant</button>
        </form>
      </div>
    </div>
  )
}

export default AddPlant
