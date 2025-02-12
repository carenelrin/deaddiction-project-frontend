import React from "react";
import {
  FaWineGlassAlt,
  FaPills,
  FaBrain,
  FaHeart,
  FaSmile,
  FaSadTear,
} from "react-icons/fa";

const ProfileSpecializations = ({ profileData }) => {
  if (!profileData || !Array.isArray(profileData.specialization)) {
    return <div>Loading specializations...</div>;
  }

  const specializations = profileData.specialization;

  // Mapping specializations to icons
  const specializationIcons = {
    "Alcohol Addiction": <FaWineGlassAlt className="text-sky-500 text-6xl mb-4" />,
    "Substance Abuse": <FaPills className="text-sky-500 text-6xl mb-4" />,
    "Mental Health": <FaBrain className="text-sky-500 text-6xl mb-4" />,
    "Heart Health": <FaHeart className="text-sky-500 text-6xl mb-4" />,
    "Positive Mentality": <FaSmile className="text-sky-500 text-6xl mb-4" />,
    "Trauma Recovery": <FaSadTear className="text-sky-500 text-6xl mb-4" />,
  };

  return (
    <div className="bg-gradient-to-br from-sky-100 to-white p-10 max-w-8xl mx-auto border-2 border-sky-200 mt-[50px] mb-[50px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">
          Profile Specializations
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Explore our areas of expertise designed to cater to your unique needs and ensure personalized care for all our patients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specializations.map((spec, index) => {
          console.log("Spec: ", spec); 
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center text-center border-2 border-sky-200"
            >
              {/* Use the mapped icon or fallback to a default icon */}
              {specializationIcons[spec] || <FaBrain className="text-sky-500 text-6xl mb-4" />}
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                {spec}
              </h3>
              <p className="text-base text-gray-600">Specialization in {spec}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSpecializations;
