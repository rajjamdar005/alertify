"use client";
import React, { useState } from 'react';

const LocateIncident: React.FC = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [incident, setIncident] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleClearForm = () => {
    setName('');
    setNumber('');
    setIncident('');
    setDescription('');
    setPhoto(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      name,
      number,
      incident,
      description,
      photo,
    });
    handleClearForm(); // Clear the form after submission
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter your contact number"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="incident" className="block text-sm font-medium text-gray-700 mb-2">
            Report Incident <span className="text-red-500">*</span>
          </label>
          <select
            id="incident"
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">Select an incident</option>
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="accident">Accident</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            rows={5}
            placeholder="Describe the incident"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleClearForm}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocateIncident;
