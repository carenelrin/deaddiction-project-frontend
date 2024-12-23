import React, { useState, useEffect } from "react";
import { FaUsers, FaBed, FaClock, FaBuilding, FaMapPin } from "react-icons/fa";
import { useParams } from "react-router-dom";  // Import useParams to access URL parameters

const ProfileAfterSearchDescription = () => {
  const { centerId } = useParams();  // Access the centerId from the URL
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchHospitalData = async () => {
      if (!centerId) {
        setError("Center ID is missing");
        setLoading(false);
        return;
      }

      try {
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
  }, [centerId]);  // Fetch data whenever centerId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Destructure data from the fetched result
  const {
    name: hospitalName,
    numberOfStaff: staffCount, // Corrected from `staffCount` to `numberOfStaff`
    bedsCount,
    operatingHours,
    facilityType,
    ownershipType: ownership // Corrected ownership field to match API response
  } = hospitalData || {};

  return (
    <div className="bg-gradient-to-br from-sky-100 to-white p-10 rounded-1xl max-w-8xl mx-auto mt-[35px] space-y-6 md:space-y-0 border border-sky-300">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">
          Welcome to {hospitalName || "Serenity Addiction Hospital"}
        </h2>
        <p className="text-base text-gray-700">
          Serenity Addiction Hospital is a leading healthcare provider specializing in the treatment and rehabilitation of addiction. Our state-of-the-art facility offers personalized care programs, highly trained professionals, and a comfortable environment to aid in recovery. We are committed to helping our patients achieve long-term success and a healthy life. Our approach is compassionate and tailored to each individual’s needs, ensuring they receive the best care available.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-8 text-gray-700">
        <div className="flex items-center">
          <FaUsers className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Number of Staff</h3>
            <p className="text-lg">{staffCount || 120}</p> {/* Staff count now correctly mapped */}
          </div>
        </div>

        <div className="flex items-center">
          <FaBed className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Number of Beds</h3>
            <p className="text-lg">{bedsCount || 200}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaClock className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Operating Hours</h3>
            <p className="text-lg">{operatingHours || "24/7"}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaBuilding className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Facility Type</h3>
            <p className="text-lg">{facilityType[0] || "Rehabilitation Center"}</p> {/* Corrected facilityType */}
          </div>
        </div>

        <div className="flex items-center">
          <FaMapPin className="text-sky-500 mr-4 text-2xl" />
          <div>
            <h3 className="font-semibold text-xl">Ownership</h3>
            <p className="text-lg">{ownership[0] || "Private"}</p> {/* Corrected ownershipType */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAfterSearchDescription;
