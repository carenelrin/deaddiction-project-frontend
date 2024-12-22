import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { LoginButton, SignUpButton } from "./Buttons";

const LandingpageNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState("bg-white");
  const location = useLocation();
  const navigate = useNavigate();

  const isRootRoute = location.pathname === "/";
  const isSearchRoute = location.pathname === "/search";
  const isProfilePage = location.pathname === "/profilepage";
  
  const isProfilePageWithId = location.pathname.startsWith("/profilepage/");

  const handleScroll = () => {
    if (window.scrollY > 50 || isSearchRoute) {
      setNavbarBg("bg-blue-100 shadow-md");
    } else {
      setNavbarBg("bg-white");
    }
  };

  useEffect(() => {
    if (isProfilePageWithId) {
      setNavbarBg("bg-blue-100"); 
    } else if (isProfilePage) {
      setNavbarBg("bg-blue-100");
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isSearchRoute, isProfilePage, isProfilePageWithId, location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${navbarBg} text-blue-700 transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="bg-[#458FF6] text-white font-bold text-xl flex justify-center items-center w-12 h-12 rounded-full">
            D
          </div>
          <h1 className="text-3xl font-semibold text-sky-700">DeAddiction</h1>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FiMenu className="text-3xl" />
          </button>
        </div>

        <div className="hidden md:flex space-x-6">
          {isRootRoute ? (
            <>
              <LoginButton />
              <SignUpButton />
            </>
          ) : (
            <LogoutButton onLogout={() => handleLogout(navigate)} />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            {isRootRoute ? (
              <>
                <LoginButton />
                <SignUpButton />
              </>
            ) : (
              <LogoutButton onLogout={() => handleLogout(navigate)} />
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

const handleLogout = (navigate) => {
  localStorage.removeItem("jwtToken");
  navigate("/");
};

const LogoutButton = ({ onLogout }) => (
  <button
    className="bg-[#458FF6] text-white py-2 px-4 rounded hover:bg-[#458FF6]-600 transition"
    onClick={onLogout}
  >
    Logout
  </button>
);

export default LandingpageNavbar;
