import React from "react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ centers }) => {
  const navigate = useNavigate();

  const handleCardClick = async (centerId) => {
    try {
      const response = await fetch(
        `https://deaddiction-project-backend.onrender.com/api/search/${centerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      navigate(`/searchprofilepage/${centerId}`, { state: data });
    } catch (error) {
      console.error("Error fetching center details:", error);
    }
  };

  if (!centers || centers.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No centers found. Try searching for a different city.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-10">
        {centers.map((center, index) => (
          <div
            key={index}
            className="searchcard max-w-full md:max-w-6xl mx-auto flex flex-col md:flex-row transition hover:shadow-xl duration-200 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(center._id)}
          >
            <div className="image-container h-56 bg-gray-200 flex items-center justify-center md:h-56 md:w-1/3">
              {center.profilePhotoURL ? (
                <img
                  className="object-cover h-full w-full"
                  src={center.profilePhotoURL}
                  alt={center.name}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="flex justify-center items-center text-gray-500">
                  No image available
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col justify-between md:w-2/3">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                {center.name}
              </h2>
              <div>
                <h4 className="text-gray-500 font-medium text-sm md:text-base">
                  {center.city}, {center.state}
                </h4>
                <div className="mt-2">
                  <h5 className="text-gray-600 font-medium text-sm">
                    Specializations:
                  </h5>
                  <ul className="list-disc pl-6">
                    {center.specialization.map((spec, idx) => (
                      <li key={idx} className="text-gray-600 text-sm">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
