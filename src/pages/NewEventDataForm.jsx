import React, { useState } from "react";
import axios from "axios";

const NewEventDataForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    details: "",
  });
  const token = localStorage.getItem("jwtToken");

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value.trim()) error = "Event title is required.";
        break;
      case "date":
        if (!value) error = "Event date is required.";
        break;
      case "details":
        if (!value.trim()) error = "Event description is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://deaddiction-project-backend.onrender.com/api/centre/events",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Event created successfully!");
        setFormData({
          title: "",
          date: "",
          details: "",
        });
      } catch (error) {
        console.error(
          "Error creating event:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.message ||
            "Failed to create event. Please try again."
        );
      }
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6 border-b-2 border-blue-300 pb-2">
          New Event Data Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Event Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className={`w-full px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Event Date*
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Event Description*
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter event description"
              className={`w-full px-4 py-2 border ${
                errors.details ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            ></textarea>
            {errors.details && (
              <p className="text-red-500 text-sm mt-1">{errors.details}</p>
            )}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventDataForm;
