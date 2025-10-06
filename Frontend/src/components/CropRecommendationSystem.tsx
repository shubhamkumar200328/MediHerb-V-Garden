'use client';

import React, { useState } from 'react';
import Header from './Header';

interface FormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

const CropRecommendationSystem: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically send the data to an API
    alert('Data logged to console. Check browser console for details.');
  };

  const inputFields = [
    { name: 'nitrogen', label: 'N (kg/ha)', placeholder: 'Nitrogen' },
    { name: 'phosphorus', label: 'P (kg/ha)', placeholder: 'Phosphorus' },
    { name: 'potassium', label: 'K (kg/ha)', placeholder: 'Potassium' },
    { name: 'temperature', label: 'Temp (°C)', placeholder: 'Temperature' },
    { name: 'humidity', label: 'Humidity (%)', placeholder: 'Humidity' },
    { name: 'ph', label: 'pH (0-14)', placeholder: 'pH Level' },
    { name: 'rainfall', label: 'Rain (mm)', placeholder: 'Rainfall' },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-2">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-green-600 mb-1">
                Crop Recommendation 🌱
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Input Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {inputFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label
                      htmlFor={field.name}
                      className="block text-xs font-medium text-gray-600"
                    >
                      {field.label}
                    </label>
                    <input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors duration-200 placeholder-gray-400"
                      required
                      step="any"
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded text-sm shadow hover:shadow-md transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  Get Recommendation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropRecommendationSystem;
