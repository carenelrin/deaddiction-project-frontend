import React, { useEffect, useState } from "react";
import { FaUsers, FaBed, FaClock, FaBuilding, FaMapPin } from "react-icons/fa";

const ProfileDescription = () => {
  const [profileData, setProfileData] = useState({
    numberOfBeds: 0,
    numberOfStaff: 0,
    operatingHours: "24/7",
    ownershipType: "Private",
    description: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
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
      if (data) {
        setProfileData({
          numberOfBeds: data.centre.numberOfBeds || 0,
          numberOfStaff: data.centre.numberOfStaff || 0,
          operatingHours: data.centre.operatingHours || "24/7",
          ownershipType: data.centre.ownershipType[0] || "Private",
          description: data.centre.description || "",
        });
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-sky-100 to-white p-10 rounded-1xl max-w-8xl mx-auto mt-[35px] space-y-6 md:space-y-0 border border-sky-300">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">
          Welcome to Serenity Addiction Hospital
        </h2>
        <p className="text-base text-gray-700">{profileData.description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-8 text-gray-700">
        <div className="flex items-center">
          <FaUsers className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Number of Staff</h3>
            <p className="text-lg">{profileData.numberOfStaff}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaBed className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Number of Beds</h3>
            <p className="text-lg">{profileData.numberOfBeds}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaClock className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Operating Hours</h3>
            <p className="text-lg">{profileData.operatingHours}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaBuilding className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Facility Type</h3>
            <p className="text-lg">Rehabilitation Center</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaMapPin className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Ownership</h3>
            <p className="text-lg">{profileData.ownershipType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDescription;
