import React from "react";

const ProfileAfterSearchProgram = ({ hospitalData }) => {
  const programs = hospitalData?.treatmentPrograms || [];

  if (!programs.length) {
    return <div>No programs available.</div>;
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
        {programs.map((program, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold text-sky-700">{program}</h3>
              <p className="text-sm text-gray-500">
                {`Comprehensive treatment plan for ${program}`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileAfterSearchProgram;
