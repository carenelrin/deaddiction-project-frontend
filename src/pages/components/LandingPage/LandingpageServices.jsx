import React from "react";
import searchCardImage from "../../../assets/LandingPageImage/Searchcard.png";
import onlinePharmacyImage from "../../../assets/LandingPageImage/Pharmacycard.png";
import consultationImage from "../../../assets/LandingPageImage/card3.png";
import emergencyCareImage from "../../../assets/LandingPageImage/EmgCard4.png";
import trackingImage from "../../../assets/LandingPageImage/Trackingcard5.png";
import detailInfoImage from "../../../assets/LandingPageImage/Detailcard.png";
import LandingpageIntroSection from "./LandingpageIntroSection";

const servicesData = [
  {
    title: "Search Center",
    description:
      "Choose your Center from the pool of centers available on our platform",
    image: searchCardImage,
  },
  {
    title: "Online Source",
    description: "Get and store your data onlilne for ease of accessibility.",
    image: onlinePharmacyImage,
  },
  {
    title: "Profile Info",
    description: "Extensive profile setup and presentation on centers.",
    image: consultationImage,
  },
  {
    title: "Relaible",
    description:
      "You can get 24/7 urgent data for yourself or your children and your lovely family.",
    image: emergencyCareImage,
  },
  {
    title: "Data Management",
    description: "Effecient management of data using effecient interfaces.",
    image: trackingImage,
  },
  {
    title: "Detail Information",
    description: "We provide detailed infromation related to centers.",
    image: detailInfoImage,
  },
];

const LandingpageServices = () => {
  return (
    <>
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-[#458FF6]">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            We provide you the best choices for your health needs. Consult with
            our highly qualified doctors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 w-full sm:w-72 mx-auto"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-14 h-14 mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center text-[#458FF6]">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingpageServices;
