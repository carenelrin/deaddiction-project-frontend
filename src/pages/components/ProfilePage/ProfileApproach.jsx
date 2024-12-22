import React, { useEffect, useState } from "react";

const ProfileApproach = () => {
  const [approaches, setApproaches] = useState([]);

  useEffect(() => {
    const fetchApproaches = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(
        "https://deaddiction-project-backend.onrender.com/api/centre/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();
      setApproaches(data.centre.treatmentApproaches || []);
    };

    fetchApproaches();
  }, []);

  return (
    <div className="bg-white p-8 mx-auto mt-[50px] mb-[50px] border border-sky-300">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-sky-700">Our Approach</h2>
        <p className="text-lg text-gray-600 mt-4">
          Learn more about our approach to recovery and wellness.
        </p>
      </div>

      <ul className="space-y-6">
        {approaches.map((approach, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 border-b border-sky-100"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-sky-700">{approach}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileApproach;
