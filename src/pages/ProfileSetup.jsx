import React, { useState } from "react";
import BasicInformation from "./components/ProfileSetup/BasicInformation";
import TreatmentInformation from "./components/ProfileSetup/TreatmentInformation";
import OperationalDetails from "./components/ProfileSetup/OperationalDetails";
import Confirmation from "./components/ProfileSetup/Confirmation";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to check if a step is complete
  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        // Check if required fields in BasicInformation are filled
        return (
          formData.name &&
          formData.state &&
          formData.city &&
          formData.location &&
          formData.phone &&
          formData.pin
        );
      case 2:
        // Add similar checks for TreatmentInformation
        return formData.approach && formData.programs;
      case 3:
        // Add similar checks for OperationalDetails
        return formData.beds && formData.staff && formData.founded;
      default:
        return false;
    }
  };

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const dataToSubmit = {
        name: formData.name,
        state: formData.state,
        city: formData.city,
        location: formData.location,
        phone: formData.phone,
        pin: formData.pin,
        facilityType: [
          formData.residential ? "Residential Facility" : "",
          formData.outpatient ? "Outpatient Clinic" : "",
          formData.dayprogram ? "Day Program" : "",
          formData.detoxification ? "Detoxification" : "",
        ].filter(Boolean),
        profilePhotoURL: formData.profilePhoto,
        specialization: [
          formData.alchohol ? "Alcohol Addiction" : "",
          formData.drug ? "Drug Addiction" : "",
          formData.behavioural ? "Behavioral Health" : "",
        ].filter(Boolean),
        treatmentApproaches: formData.approach,
        treatmentPrograms: formData.programs,
        numberOfBeds: formData.beds,
        numberOfStaff: formData.staff,
        operatingHours: formData.founded,
        description: formData.description, // Add description if needed
        ownershipType: [
          formData.private ? "Private" : "",
          formData.government ? "Government" : "",
          formData.nonprofit ? "Nonprofit" : "",
        ].filter(Boolean),
      };
      const token = localStorage.getItem("jwtToken");
      try {
        // Send POST request to backend
        const response = await axios.post(
          "https://deaddiction-project-backend.onrender.com/api/centre/profile",
          dataToSubmit,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle response
        if (response.status === 200) {
          navigate("/profilepage");
        } else {
          alert("Failed to save profile.");
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      // Errors found, jump to the relevant step and display errors
      setErrors(validationErrors);
      const errorStep = Object.keys(validationErrors).reduce(
        (minStep, field) => {
          const step = getStepForField(field);
          return step < minStep ? step : minStep;
        },
        4
      ); // Start with the last step
      setCurrentStep(errorStep);
    }
  };

  const getStepForField = (field) => {
    // Add logic to determine which step the field belongs to
    if (["name", "state", "city", "location", "phone", "pin"].includes(field)) {
      return 1;
    } else if (
      ["alchohol", "drug", "behavioural", "approach", "programs"].includes(
        field
      )
    ) {
      return 2;
    } else if (["beds", "staff", "founded", "ownership"].includes(field)) {
      return 3;
    }
    return 4; // Default to the last step
  };

  const validateForm = (data) => {
    const errors = {};

    // Basic Information validations
    if (!data.name?.trim()) {
      errors.name = "Name is required";
    }
    if (!data.state?.trim()) {
      errors.state = "State is required";
    }
    if (!data.city?.trim()) {
      errors.city = "City is required";
    }
    if (!data.location?.trim()) {
      errors.location = "Location is required";
    }
    if (!data.phone) {
      // Assuming phone is a number, no need for trim()
      errors.phone = "Phone No is required";
    }
    if (data.phone && data.phone.toString().length !== 10) {
      errors.phone = "Phone number must be 10 digits long";
    }
    if (!data.pin) {
      // Assuming pin is a number, no need for trim()
      errors.pin = "PIN Code is required";
    }
    if (
      !data.residential &&
      !data.outpatient &&
      !data.dayprogram &&
      !data.detoxification
    ) {
      errors.facilityTypeRequired = "Please select at least one facility type.";
    }
    if (!data.profilePhoto?.trim()) {
      errors.profilePhoto = "Profile Photo URL is required";
    } else if (!isValidUrl(data.profilePhoto)) {
      errors.profilePhoto = "Invalid Profile Photo URL";
    }

    // Treatment Information validations
    if (!data.approach?.trim()) {
      errors.approach = "Treatment Approaches is required";
    }
    if (!data.programs?.trim()) {
      errors.programs = "Treatment Programs is required";
    }

    // Operational Details validations
    if (!data.beds) {
      errors.beds = "Number of Beds is required";
    }
    if (!data.staff) {
      errors.staff = "Number of Staff is required";
    }
    if (!data.founded) {
      errors.founded = "Operating Hours is required";
    }
    if (!data.private && !data.government && !data.nonprofit) {
      errors.ownership = "Please select an ownership type.";
    }

    return errors;
  };

  function isValidUrl(urlString) {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <TreatmentInformation
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <OperationalDetails
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <Confirmation
            formData={formData}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-gray-100 font-sans p-10">
        <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-500">
              De-Addiction Centre Profile Setup
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              nihil explicabo obcaecati nemo consectetur ratione, eos ipsa bl
            </p>
          </div>
          <div className="mb-6">
            <div className="flex justify-center items-center mb-6">
              {Array.from({ length: 4 }, (_, i) => (
                <React.Fragment key={i}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-600 cursor-pointer transition-colors duration-300 relative ${
                      currentStep === i + 1
                        ? "bg-blue-500 text-white"
                        : isStepComplete(i + 1)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 3 && (
                    <div className="w-8 h-1 mx-2 bg-gray-300 rounded-full" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-6">
            {renderStep()}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === 4}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSetup;
