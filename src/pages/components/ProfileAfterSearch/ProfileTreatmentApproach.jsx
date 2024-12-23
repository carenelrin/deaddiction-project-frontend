import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams to access URL parameters

const ProfileTreatmentApproach = () => {
  const { centerId } = useParams();  // Access the centerId from the URL
  const [approaches, setApproaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch treatment approaches from the API
  useEffect(() => {
    const fetchApproaches = async () => {
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
        // Assuming the API returns a 'treatmentApproaches' field that is an array of strings
        setApproaches(data.treatmentApproaches || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApproaches();
  }, [centerId]);  // Fetch data whenever centerId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-8 mx-auto mt-[50px] mb-[50px] border border-sky-300">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-sky-700">Our Approach</h2>
        <p className="text-lg text-gray-600 mt-4">
          Learn more about our approach to recovery and wellness.
        </p>
      </div>

      <ul className="space-y-6">
        {approaches.length > 0 ? (
          approaches.map((approach, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border-b border-sky-100"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-sky-700">
                  {approach} {/* Treating the string as the title */}
                </h3>
                <p className="text-gray-600 text-sm">
                  This approach focuses on general treatment. {/* Optional default description */}
                </p>
              </div>
            </li>
          ))
        ) : (
          <div>No treatment approaches available.</div>
        )}
      </ul>
    </div>
  );
};

export default ProfileTreatmentApproach;
