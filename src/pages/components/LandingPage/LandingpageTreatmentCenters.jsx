import React, { useState, useEffect } from "react";
import pharmacyCard from "../../../assets/LandingPageImage/list1.jpg";
import emgCard4 from "../../../assets/LandingPageImage/list2.jpg";
import trackingCard5 from "../../../assets/LandingPageImage/list3.jpg";
import trackingCard6 from "../../../assets/LandingPageImage/list4.jpg";

const TreatmentCenters = () => {
  const slides = [
    {
      img: pharmacyCard,
      location: "India",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, ducimus.",
    },
    {
      img: emgCard4,
      location: "Location 2",
      description: "Description for location 2.",
    },
    {
      img: trackingCard5,
      location: "Location 3",
      description: "Description for location 3.",
    },
    {
      img: trackingCard6,
      location: "Location 4",
      description: "Description for location 4.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row bg-blue-50 py-16">
        <div className="w-full md:w-1/2 pr-8 pl-10 md:ml-10 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our Treatment Centres
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            DeAddict is renowned for its exceptional addiction treatment
            centres, offering luxury private rehab facilities in tranquil
            settings by the seaside, rural countryside, or peaceful villages.
            Each location is meticulously selected to create an ideal
            environment supporting recovery. Our commitment to delivering
            outstanding care and rehabilitation is unwavering, with a strong
            focus on achieving long-term recovery.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[90%] md:w-[500px] mx-auto rounded-lg overflow-hidden shadow-lg relative">
            <img
              src={slides[currentSlide].img}
              alt={slides[currentSlide].location}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h1 className="text-xl md:text-2xl text-white">
                {slides[currentSlide].location}
              </h1>
              <p className="text-white text-center px-2">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TreatmentCenters;
