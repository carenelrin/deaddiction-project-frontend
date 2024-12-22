import React, { useEffect, useState } from "react";

const ProfileProgram = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      try {
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
        setPrograms(data.centre.treatmentPrograms || []);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setPrograms([]);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="bg-gradient-to-br from-sky-100 to-white p-8 max-w-8xl mx-auto border border-sky-200 mt-[50px] mb-[50px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">
          Our Programs
        </h2>
        <p className="text-lg text-gray-700">
          We offer a variety of programs to cater to different needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center text-center border-2 border-sky-200"
          >
            <h3 className="text-xl font-semibold text-sky-700 mb-4">
              {program}
            </h3>
            <p className="text-base text-gray-600">{program}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileProgram;
