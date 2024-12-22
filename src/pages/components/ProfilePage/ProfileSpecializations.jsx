import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaWineGlassAlt,
  FaPills,
  FaBrain,
  FaHeart,
  FaSmile,
  FaSadTear,
} from "react-icons/fa";

const iconMapping = {
  addiction: <FaWineGlassAlt />,
  medication: <FaPills />,
  mentalHealth: <FaBrain />,
  cardiacCare: <FaHeart />,
  emotionalSupport: <FaSmile />,
  sadnessRecovery: <FaSadTear />,
};

const ProfileSpecializations = () => {
  const { centerId } = useParams(); 
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecializations = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      try {
        const profileResponse = await fetch(
          "https://deaddiction-project-backend.onrender.com/api/centre/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const profileData = await profileResponse.json();
        const additionalResponse = await fetch(
          `https://deaddiction-project-backend.onrender.com/api/search/${centerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const additionalData = await additionalResponse.json();

        const combinedSpecializations = [
          ...(profileData.centre?.specialization || []),
          ...(additionalData.centreDetails?.specialization || []),
        ];
        setSpecializations([...new Set(combinedSpecializations)]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching specializations:", error);
        setSpecializations([]);
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, [centerId]);

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

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.length > 0 ? (
            specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center text-center border-2 border-sky-200"
              >
                <div className="text-sky-500 text-6xl mb-4">
                  {iconMapping[spec.toLowerCase()] || <FaSmile />}
                </div>
                <h3 className="text-xl font-semibold text-sky-700 mb-2">
                  {spec}
                </h3>
                <p className="text-base text-gray-600">{spec}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-600">
              No specializations available at the moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSpecializations;
