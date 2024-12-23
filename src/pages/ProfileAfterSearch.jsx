import React from "react";
import { useParams } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import ProfileAfterSearchCard from "./components/ProfileAfterSearch/ProfileAfterSearchCard";
import ProfileAfterSearchDescription from "./components/ProfileAfterSearch/ProfileAfterSearchDescription";
import ProfileAfterSearchProgram from "./components/ProfileAfterSearch/ProfileAfterSearchProgram";
import ProfileAfterSearchSpecializations from "./components/ProfileAfterSearch/ProfileAfterSearchSpecializations";
import ProfileTreatmentApproach from "./components/ProfileAfterSearch/ProfileTreatmentApproach";
import Footer from "../components/Footer";
import ProfileFeedback from "./components/ProfileAfterSearch/ProfileFeedback";


const ProfilePage = () => {

  return (
    <>
      <Navbar />
      <ProfileAfterSearchCard/>
      <ProfileAfterSearchDescription/>
      <ProfileAfterSearchSpecializations/>
      <ProfileAfterSearchProgram/>
      <ProfileTreatmentApproach/>
      <ProfileFeedback/>
      <Footer/>

    </>
  );
};

export default ProfilePage;
