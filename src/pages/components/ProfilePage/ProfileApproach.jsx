import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfileApproach = () => {
  const { centerId } = useParams(); 
  const [approaches, setApproaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproaches = async () => {
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

        const combinedApproaches = [
          ...(profileData.centre?.treatmentApproaches || []),
          ...(additionalData.centreDetails?.treatmentApproaches || []),
        ];

        setApproaches([...new Set(combinedApproaches)]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching approaches:", error);
        setApproaches([]);
        setLoading(false);
      }
    };

    fetchApproaches();
  }, [centerId]);

  return (
    <div className="bg-white p-8 mx-auto mt-[50px] mb-[50px] border border-sky-300">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-sky-700">Our Approach</h2>
        <p className="text-lg text-gray-600 mt-4">
          Learn more about our approach to recovery and wellness.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      ) : approaches.length > 0 ? (
        <ul className="space-y-6">
          {approaches.map((approach, index) => (
            <li
              key={index}
              className="p-4 border-b last:border-none border-sky-100 hover:bg-sky-50 transition-colors rounded-md"
            >
              <h3 className="text-xl font-semibold text-sky-700">{approach}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600 text-lg">
          No approaches available at the moment.
        </div>
      )}
    </div>
  );
};

export default ProfileApproach;