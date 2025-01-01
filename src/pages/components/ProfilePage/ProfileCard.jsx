import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCity,
  FaPhone,
  FaMapPin,
  FaBuilding,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "https://deaddiction-project-backend.onrender.com/api/centre/profile",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        console.log(response.data);
        setProfile(response.data.centre || response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-sky-100 to-white p-10 rounded-1xl max-w-8xl mx-auto mt-[90px] space-y-6 md:space-y-0 md:space-x-16 border border-sky-300 shadow-lg">
      <div className="flex-shrink-0 relative w-full md:w-96">
        <img
          src={
            profile.profilePhotoURL ||
            "https://rehabcenters.com/wp-content/uploads/rehab-4.jpg"
          }
          alt="Hospital"
          className="w-full h-full rounded-xl object-cover shadow-lg border-2 border-sky-500"
        />
      </div>
      <div className="ml-0 md:ml-16 mt-8 md:mt-0 flex-1">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">
          {profile.name || "Serenity Addiction Hospital"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-gray-700">
          <p className="flex items-center text-lg">
            <FaMapMarkerAlt className="text-sky-500 mr-4" />
            <span>
              <strong>State:</strong> {profile.state || "California"}
            </span>
          </p>
          <p className="flex items-center text-lg">
            <FaCity className="text-sky-500 mr-4" />
            <span>
              <strong>City:</strong> {profile.city || "Los Angeles"}
            </span>
          </p>
          <p className="flex items-center text-lg">
            <FaBuilding className="text-sky-500 mr-4" />
            <span>
              <strong>Location:</strong>{" "}
              {profile.location || "Downtown District"}
            </span>
          </p>
          <p className="flex items-center text-lg">
            <FaPhone className="text-sky-500 mr-4" />
            <span>
              <strong>Phone:</strong> {profile.phone || "+1 234-567-890"}
            </span>
          </p>
          <p className="flex items-center text-lg">
            <FaMapPin className="text-sky-500 mr-4" />
            <span>
              <strong>PIN Code:</strong> {profile.pin || "90001"}
            </span>
          </p>
          <p className="flex items-center text-lg">
            <FaEnvelope className="text-sky-500 mr-4" />
            <span>
              <strong>Email:</strong>{" "}
              {profile.email || "info@serenityhospital.com"}
            </span>
          </p>
        </div>
        <div className="mt-10 flex space-x-6">
          <button
            className="bg-sky-500 text-white px-8 py-3 text-lg rounded-full shadow-md hover:bg-sky-600 hover:scale-105 transition"
            onClick={() => handleNavigation("/eventrecord")}
          >
            Event Data
          </button>
          <button
            className="bg-sky-500 text-white px-8 py-3 text-lg rounded-full shadow-md hover:bg-sky-600 hover:scale-105 transition"
            onClick={() => handleNavigation("/patientrecord")}
          >
            Patient Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
