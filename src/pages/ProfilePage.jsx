import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "./components/ProfilePage/ProfileCard";
import ProfileDescription from "./components/ProfilePage/ProfileDescription";
import ProfileSpecializations from "./components/ProfilePage/ProfileSpecializations";
import ProfileProgram from "./components/ProfilePage/ProfileProgram";
import ProfileApproach from "./components/ProfilePage/ProfileApproach";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
          console.error("No token found");
          return;
        }

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
        console.log("Fetched Profile Data: ", data);

        if (data && data._id) {
          setProfileData(data);
        } else {
          console.error("Invalid profile data:", data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return (
      <div>
        <Navbar />
        <div>Loading profile data...</div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ProfileCard profile={profileData} />
      <ProfileDescription profileData={profileData} />
      <ProfileSpecializations profileData={profileData} />
      <ProfileProgram profileData={profileData} />
      <ProfileApproach approaches={profileData.treatmentApproaches || []} /> 
      <Footer />
    </>
  );
};

export default ProfilePage;
