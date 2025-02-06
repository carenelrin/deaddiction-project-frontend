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
    title: "Search Doctor",
    description:
      "Choose your doctor from thousands of specialists, general practitioners, and trusted hospitals.",
    image: searchCardImage,
  },
  {
    title: "Online Pharmacy",
    description:
      "Buy your medicines with our mobile application with a simple delivery system.",
    image: onlinePharmacyImage,
  },
  {
    title: "Consultation",
    description:
      "Free consultation with our trusted doctors and get the best recommendations.",
    image: consultationImage,
  },
  {
    title: "Emergency Care",
    description:
      "You can get 24/7 urgent care for yourself or your children and your lovely family.",
    image: emergencyCareImage,
  },
  {
    title: "Tracking",
    description: "Track and save your medical history and health data.",
    image: trackingImage,
  },
  {
    title: "Detail Information",
    description:
      "Consult with us to understand which type of service is suitable for your health.",
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
