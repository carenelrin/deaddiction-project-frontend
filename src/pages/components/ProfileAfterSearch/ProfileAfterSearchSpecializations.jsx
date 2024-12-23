import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the URL parameters
import {
  FaWineGlassAlt,
  FaPills,
  FaBrain,
  FaHeart,
  FaSmile,
  FaSadTear,
} from "react-icons/fa";

const ProfileAfterSearchSpecializations = () => {
  const { centerId } = useParams();  // Access the centerId from the URL
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define icons and descriptions for the specializations
  const specializationData = {
    "Alcohol Addiction": {
      icon: <FaWineGlassAlt />,
      description: "Comprehensive recovery plans for overcoming alcohol dependency.",
    },
    "Drug Addiction": {
      icon: <FaPills />,
      description: "Tailored treatments to help break free from drug addiction.",
    },
    "Behavioural Addiction": {
      icon: <FaBrain />,
      description: "Support for overcoming addictive behaviors like gambling and gaming.",
    },
    "Mental Health Treatment": {
      icon: <FaHeart />,
      description: "Holistic care for a wide range of mental health challenges.",
    },
    "Anxiety": {
      icon: <FaSmile />,
      description: "Specialized therapies to reduce stress and manage anxiety effectively.",
    },
    "Depression": {
      icon: <FaSadTear />,
      description: "Personalized care to combat depression and restore well-being.",
    },
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        if (!centerId) {
          setError("Center ID is missing");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://deaddiction-project-backend.onrender.com/api/search/${centerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Assuming the API returns the specializations as an array
        setSpecializations(data.specialization || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, [centerId]);  // Fetch data when centerId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-sky-100 to-white p-10 max-w-8xl mx-auto border-2 border-sky-200 mt-[50px] mb-[50px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">
          Profile Specializations
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Explore our areas of expertise designed to cater to your unique needs
          and ensure personalized care for all our patients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specializations.length > 0 ? (
          specializations.map((spec, index) => {
            const specDetails = specializationData[spec];
            return (
              specDetails && (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center text-center border-2 border-sky-200"
                >
                  <div className="text-sky-500 text-6xl mb-4">{specDetails.icon}</div>
                  <h3 className="text-xl font-semibold text-sky-700 mb-2">
                    {spec}
                  </h3>
                  <p className="text-base text-gray-600">{specDetails.description}</p>
                </div>
              )
            );
          })
        ) : (
          <div>No specializations available.</div>
        )}
      </div>
    </div>
  );
};

export default ProfileAfterSearchSpecializations;
