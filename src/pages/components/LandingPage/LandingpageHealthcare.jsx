import React from "react";
import healthcareImage from "../../../assets/LandingPageImage/healthcare1.png";

const LandingpageHealthcare = () => {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Text Section */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#458FF6] mb-4">
            Leading Healthcare Providers
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Trafalgar provides progressive and affordable healthcare, accessible
            on mobile and online for everyone. To us, it's not just work. We
            take pride in the solutions we deliver.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
          <img
            src={healthcareImage}
            alt="Healthcare Providers"
            className="w-3/4 md:w-full max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingpageHealthcare;
