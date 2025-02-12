import React from "react";
import { Link } from "react-router-dom";

export const LoginButton = () => (
  <Link to="/login">
    <button className="bg-transparent border border-[#458FF6] text-[#458FF6] py-2 px-4 rounded hover:bg-[#458FF6] hover:text-white transition mr-4">
      Login
    </button>
  </Link>
);

export const SignUpButton = () => (
  <Link to="/signup">
    <button className="bg-[#458FF6] text-white py-2 px-4 rounded hover:bg-blue-600 transition">
      Sign Up
    </button>
  </Link>
);

export const SearchButton = () => (
  <Link to="/search">
    <button className="bg-transparent border border-[#458FF6] text-[#458FF6] py-2 px-4 rounded hover:bg-[#458FF6] hover:text-white transition">
      Search
    </button>
  </Link>
);

// export const LogoutButton = () => (
//   <button className="bg-[#458FF6] text-white py-2 px-4 rounded  hover:bg-blue-600 transition">
//     Logout
//   </button>
// );
