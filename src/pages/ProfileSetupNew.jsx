import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CentreProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    location: "",
    phone: "",
    pin: "",
    facilityType: [],
    profilePhotoURL: "",
    specialization: [],
    treatmentApproaches: "",
    treatmentPrograms: "",
    numberOfBeds: "",
    numberOfStaff: "",
    operatingHours: "",
    description: "",
    ownershipType: "",
  });

  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: prevData[name].filter((item) => item !== value),
        }));
      }
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combinedData = {
      name: formData.name,
      state: formData.state,
      city: formData.city,
      location: formData.location,
      phone: formData.phone,
      pin: formData.pin,
      facilityType: formData.facilityType,
      profilePhotoURL: formData.profilePhotoURL,
      specialization: formData.specialization,
      treatmentApproaches: formData.treatmentApproaches,
      treatmentPrograms: formData.treatmentPrograms,
      numberOfBeds: formData.numberOfBeds,
      numberOfStaff: formData.numberOfStaff,
      operatingHours: formData.operatingHours,
      description: formData.description,
      ownershipType: formData.ownershipType,
    };

    try {
      const response = await axios.post(
        "https://deaddiction-project-backend.onrender.com/api/centre/profile",
        combinedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate("/profilepage");
      } else {
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.error("Error submitting the form data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Centre Profile Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Centre Name"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          placeholder="Pin Code"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Facility Type</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="facilityType"
              value="Residential Facility"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Residential Facility
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="facilityType"
              value="Outpatient Clinic"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Outpatient Clinic
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="facilityType"
              value="Detoxification Center"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Detoxification Center
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="facilityType"
              value="Day Program Center"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Day Program Center
          </label>
        </div>
      </div>

      <input
        type="url"
        name="profilePhotoURL"
        value={formData.profilePhotoURL}
        onChange={handleChange}
        placeholder="Profile Photo URL"
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <div className="mt-4">
        <label className="block font-semibold">Specialization</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Alcohol Addiction"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Alcohol Addiction
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Drug Addiction"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Drug Addiction
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Behavioural Addiction"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Behavioural Addiction
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Mental Health Treatment"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Mental Health Treatment
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Anxiety"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Anxiety
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Depression"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Depression
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Teen and Adolescent Services"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Teen and Adolescent Services
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Family Centered Treatments"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Family Centered Treatments
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Gender Specific Programs"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Gender Specific Programs
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialization"
              value="Culture Specific Programs"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Culture Specific Programs
          </label>
        </div>
      </div>

      <textarea
        name="treatmentApproaches"
        value={formData.treatmentApproaches}
        onChange={handleChange}
        placeholder="Treatment Approaches"
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <textarea
        name="treatmentPrograms"
        value={formData.treatmentPrograms}
        onChange={handleChange}
        placeholder="Treatment Programs"
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="number"
          name="numberOfBeds"
          value={formData.numberOfBeds}
          onChange={handleChange}
          placeholder="Number of Beds"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="numberOfStaff"
          value={formData.numberOfStaff}
          onChange={handleChange}
          placeholder="Number of Staff"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <input
        type="text"
        name="operatingHours"
        value={formData.operatingHours}
        onChange={handleChange}
        placeholder="Operating Hours"
        required
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description of Centre"
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <div className="mt-4">
        <label className="block font-semibold">Ownership Type</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="ownershipType"
              value="Private"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Private
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="ownershipType"
              value="Government"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Government
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="ownershipType"
              value="Non-profit"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Non-profit
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 p-2 bg-blue-500 text-white rounded-md w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default CentreProfileForm;
