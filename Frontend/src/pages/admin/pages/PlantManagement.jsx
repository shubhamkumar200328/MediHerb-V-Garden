import { useState, useEffect } from 'react';
import axios from 'axios';
import './PlantManagement.css';

const PlantManagement = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingPlant, setEditingPlant] = useState(null);
  const initialFormData = {
    name: '',
    image: '',
    description: '',
    medicinalUse: '',
    region: '',
    botanicalDetails: {
      kingdom: '',
      clade: '',
      order: '',
      family: '',
      genus: '',
      species: '',
      binomialName: '',
    },
    cultivationTips: {
      soil: '',
      water: '',
      sunlight: '',
      temperature: '',
    },
    about: '',
    detailDescription: '',
    reference: '',
    learningModules: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5015/api/plants');
      setPlants(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching plants:', err);
      setError(err.response?.data?.message || 'Failed to fetch plants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlant) {
        await axios.put(
          `http://localhost:5015/api/plants/${editingPlant._id}`,
          formData,
        );
        setSuccess('Plant updated successfully!');
      } else {
        await axios.post('http://localhost:5015/api/plants', formData);
        setSuccess('Plant added successfully!');
      }
      setFormData(initialFormData);
      setEditingPlant(null);
      fetchPlants();
    } catch (err) {
      console.error('Error saving plant:', err);
      setError(err.response?.data?.message || 'Failed to save plant');
    }
  };

  const handleEdit = (plant) => {
    setEditingPlant(plant);
    setFormData({
      ...plant,
      botanicalDetails:
        plant.botanicalDetails || initialFormData.botanicalDetails,
      cultivationTips: plant.cultivationTips || initialFormData.cultivationTips,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await axios.delete(`http://localhost:5015/api/plants/${id}`);
        setSuccess('Plant deleted successfully!');
        fetchPlants();
      } catch (err) {
        console.error('Error deleting plant:', err);
        setError(err.response?.data?.message || 'Failed to delete plant');
      }
    }
  };

  const handleCancel = () => {
    setEditingPlant(null);
    setFormData(initialFormData);
  };

  if (loading) return <div className="loading">Loading plants...</div>;

  return (
    <div className="plant-management-container">
      <h2>Plant Management</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="plant-management-grid">
        <div className="plant-list-card">
          <h3>Plant List</h3>
          <div className="plant-list">
            {plants.map((plant) => (
              <div key={plant._id} className="plant-item">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="plant-thumbnail"
                />
                <div className="plant-info">
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                </div>
                <div className="plant-actions">
                  <button onClick={() => handleEdit(plant)}>Edit</button>
                  <button onClick={() => handleDelete(plant._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="plant-form-card">
          <h3>{editingPlant ? 'Edit Plant' : 'Add New Plant'}</h3>
          <form onSubmit={handleSubmit} className="plant-form">
            {[
              { label: 'Name', name: 'name' },
              { label: 'Image URL', name: 'image' },
              { label: 'Description', name: 'description', type: 'textarea' },
              { label: 'Medicinal Use', name: 'medicinalUse' },
              { label: 'Region', name: 'region' },
              { label: 'About', name: 'about', type: 'textarea' },
              {
                label: 'Detailed Description',
                name: 'detailDescription',
                type: 'textarea',
              },
              { label: 'Reference', name: 'reference' },
            ].map(({ label, name, type }) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    name={name}
                    type="text"
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}

            <h4>Botanical Details</h4>
            {[
              'kingdom',
              'clade',
              'order',
              'family',
              'genus',
              'species',
              'binomialName',
            ].map((field) => (
              <div className="form-group" key={field}>
                <label>{field[0].toUpperCase() + field.slice(1)}</label>
                <input
                  name={`botanicalDetails.${field}`}
                  value={formData.botanicalDetails[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <h4>Cultivation Tips</h4>
            {['soil', 'water', 'sunlight', 'temperature'].map((field) => (
              <div className="form-group" key={field}>
                <label>{field[0].toUpperCase() + field.slice(1)}</label>
                <input
                  name={`cultivationTips.${field}`}
                  value={formData.cultivationTips[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div className="form-actions">
              <button type="submit">
                {editingPlant ? 'Update Plant' : 'Add Plant'}
              </button>
              {editingPlant && (
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlantManagement;
