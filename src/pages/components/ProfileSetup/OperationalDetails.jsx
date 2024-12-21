import React from "react";
import { useEffect, useState } from "react";

function OperationalDetails({ formData, handleChange, errors }) {
  const [ownershipError, setOwnershipError] = useState(null);
  const [selectedOwnership, setSelectedOwnership] = useState(null);

  useEffect(() => {
    // Check if any ownership type is selected whenever formData changes
    if (!formData.private && !formData.government && !formData.nonprofit) {
      setOwnershipError("Please select an ownership type.");
    } else {
      setOwnershipError(null);
    }
  }, [formData.private, formData.government, formData.nonprofit]);

  const handleOwnershipChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // If one is already selected, uncheck it
      if (selectedOwnership) {
        setFormData({ ...formData, [selectedOwnership]: false });
      }
      setSelectedOwnership(name);
    } else {
      setSelectedOwnership(null);
    }
    handleChange(event);
  };

  return (
    <div>
      <h4 className="text-blue-500 font-semibold text-lg mb-2">
        Operational Details
      </h4>
      <p className="text-gray-600 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        voluptatibus corporis atque, laborum similique a, officiis doloribus
        quibusdam incidunt, cumque adipisci. Voluptate, nulla quisquam ab
        recusandae dolore maiores tempore laborum.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="beds"
            className="block text-gray-700 font-medium mb-2"
          >
            No. of Beds*
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={formData.beds || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.beds && <p className="text-red-500 text-sm">{errors.beds}</p>}
        </div>
        <div>
          <label
            htmlFor="staff"
            className="block text-gray-700 font-medium mb-2"
          >
            No. of Staff*
          </label>
          <input
            type="number"
            id="staff"
            name="staff"
            value={formData.staff || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.staff && (
            <p className="text-red-500 text-sm">{errors.staff}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="founded"
            className="block text-gray-700 font-medium mb-2"
          >
            Operating Hours*
          </label>
          <input
            type="text"
            id="founded"
            name="founded"
            value={formData.founded || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.founded && (
            <p className="text-red-500 text-sm">{errors.founded}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description of Centre
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <h4 className="text-blue-500 font-semibold text-lg mt-4 mb-2">
        Ownership Type*
      </h4>
      {errors.ownership && (
        <p className="text-red-500 text-sm">{errors.ownership}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="privateCheckbox"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="privateCheckbox"
              name="private"
              checked={formData.private || false}
              onChange={handleOwnershipChange}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Private</span>
          </label>
        </div>
        <div>
          <label
            htmlFor="governmentCheckbox"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="governmentCheckbox"
              name="government"
              checked={formData.government || false}
              onChange={handleOwnershipChange}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Government</span>
          </label>
        </div>
        <div>
          <label
            htmlFor="nonprofitCheckbox"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="nonprofitCheckbox"
              name="nonprofit"
              checked={formData.nonprofit || false}
              onChange={handleOwnershipChange}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Non-profit</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default OperationalDetails;
