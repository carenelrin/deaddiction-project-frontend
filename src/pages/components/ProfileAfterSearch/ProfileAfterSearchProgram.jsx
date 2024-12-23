import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the URL parameters
import { FaPlusCircle } from "react-icons/fa";

const ProfileAfterSearchProgram = () => {
  const { centerId } = useParams();  // Access the centerId from the URL
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch program data from the API
  useEffect(() => {
    const fetchPrograms = async () => {
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
        // Assuming the API returns a 'treatmentPrograms' field
        setPrograms(data.treatmentPrograms || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [centerId]);  // Fetch data when centerId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-sky-100 to-white p-8 mx-auto mt-[50px] border border-sky-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-sky-700">Programs</h2>
          <p className="text-lg text-gray-600">
            Explore our specialized programs designed for effective recovery and
            mental well-being.
          </p>
        </div>
      </div>

      <ul className="space-y-4">
        {programs.length > 0 ? (
          programs.map((program, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold text-sky-700">
                  {program}
                </h3>
                <p className="text-sm text-gray-500">
                  {`Comprehensive treatment plan for ${program}`}
                </p>
              </div>
            </li>
          ))
        ) : (
          <div>No programs available.</div>
        )}
      </ul>
    </div>
  );
};

export default ProfileAfterSearchProgram;
