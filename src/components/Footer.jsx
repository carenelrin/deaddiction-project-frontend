import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const LandingpageFooter = () => {
  return (
    <footer className="bg-blue-100 text-black py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Deaddiction</h2>
            <p className="text-black">
              We are committed to providing the best healthcare solutions. Our
              focus is on quality, accessibility, and affordability.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-[#458FF6] hover:text-blue-500" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-[#458FF6] hover:text-blue-500" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-[#458FF6] hover:text-blue-500" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="text-[#458FF6] hover:text-blue-500" />
              </a>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-black mb-2">Email: info@company.com</p>
            <p className="text-black">Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-600">
        <p className="text-black text-sm">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingpageFooter;
