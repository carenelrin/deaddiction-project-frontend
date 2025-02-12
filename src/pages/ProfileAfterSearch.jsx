import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import ProfileAfterSearchCard from "./components/ProfileAfterSearch/ProfileAfterSearchCard";
import ProfileAfterSearchDescription from "./components/ProfileAfterSearch/ProfileAfterSearchDescription";
import ProfileAfterSearchProgram from "./components/ProfileAfterSearch/ProfileAfterSearchProgram";
import ProfileTreatmentApproach from "./components/ProfileAfterSearch/ProfileTreatmentApproach";
import Footer from "../components/Footer";
import ProfileFeedback from "./components/ProfileAfterSearch/ProfileFeedback";  // Import ProfileFeedback here
import ProfileAfterSearchSpecializations from "./components/ProfileAfterSearch/ProfileAfterSearchSpecializations";

const ProfilePage = () => {
  const { centerId } = useParams(); 
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalData = async () => {
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
        setHospitalData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [centerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <ProfileAfterSearchCard hospitalData={hospitalData} />
      <ProfileAfterSearchDescription hospitalData={hospitalData} />
      <ProfileAfterSearchSpecializations specializations={hospitalData.specialization || []} />
      <ProfileAfterSearchProgram hospitalData={hospitalData} />
      <ProfileTreatmentApproach hospitalData={hospitalData} />
      <ProfileFeedback centerId={centerId} />  {/* Pass centerId to ProfileFeedback */}
      <Footer />
    </>
  );
};

export default ProfilePage;
