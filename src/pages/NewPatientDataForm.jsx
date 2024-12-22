import React, { useState } from "react";
import axios from "axios";

const NewPatientDataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobileNumber: "",
    address: "",
    admissionDate: "",
    dischargeDate: "",
    problem: "",
    treatmentSummary: "",
    progressSummary: "",
  });

  const token = localStorage.getItem("jwtToken");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "age":
        if (!value || value <= 0) error = "Age must be a positive number.";
        break;
      case "gender":
        if (!value) error = "Gender is required.";
        break;
      case "mobileNumber":
        if (!/^\d{10}$/.test(value)) error = "Mobile number must be 10 digits.";
        break;
      case "address":
        if (!value.trim()) error = "Address is required.";
        break;
      case "admissionDate":
        if (!value) error = "Admission date is required.";
        break;
      case "dischargeDate":
        if (!value) error = "Discharge date is required.";
        break;
      case "problem":
        if (!value.trim()) error = "Problem description is required.";
        break;
      case "treatmentSummary":
        if (!value.trim()) error = "Treatment summary is required.";
        break;
      case "progressSummary":
        if (!value.trim()) error = "Progress summary is required.";
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
        // Make a POST request to the backend
        const response = await axios.post(
          "https://deaddiction-project-backend.onrender.com/api/centre/patients",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include JWT token
            },
          }
        );

        console.log("Patient data submitted successfully:", response.data);
        alert("Patient data submitted successfully!");

        // Optionally reset the form
        setFormData({
          name: "",
          age: "",
          gender: "",
          mobileNumber: "",
          address: "",
          admissionDate: "",
          dischargeDate: "",
          problem: "",
          treatmentSummary: "",
          progressSummary: "",
        });
      } catch (error) {
        console.error(
          "Error submitting patient data:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.message ||
            "Failed to submit patient data. Please try again."
        );
      }
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6 border-b-2 border-blue-300 pb-2">
          New Patient Data Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                className={`w-full px-4 py-2 border ${
                  errors.age ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gender*
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile No.*
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter patient's mobile number"
              className={`w-full px-4 py-2 border ${
                errors.mobileNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Admission Date*
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.admissionDate ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.admissionDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.admissionDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Discharge Date*
              </label>
              <input
                type="date"
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.dischargeDate ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.dischargeDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dischargeDate}
                </p>
              )}
            </div>
          </div>
          {[
            {
              label: "Address*",
              name: "address",
              type: "textarea",
              placeholder: "Enter patient's address",
            },
            {
              label: "Patient's Problem*",
              name: "problem",
              type: "textarea",
              placeholder: "Describe the problem",
            },
            {
              label: "Treatment Summary*",
              name: "treatmentSummary",
              type: "textarea",
              placeholder: "Enter treatment summary",
            },
            {
              label: "Progress Summary*",
              name: "progressSummary",
              type: "textarea",
              placeholder: "Enter progress summary",
            },
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                {...rest}
              ></textarea>
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
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

export default NewPatientDataForm;
