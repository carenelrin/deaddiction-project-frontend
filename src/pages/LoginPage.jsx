import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    const loginData = {
      email: email,
      password: password,
    };
    try {
      // Make a POST request to the login API
      const response = await axios.post(
        "https://deaddiction-project-backend.onrender.com/api/auth/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Extract and store the JWT token
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      const profileResponse = await axios.get(
        "https://deaddiction-project-backend.onrender.com/api/centre/profile-completion",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { profileCompleted } = profileResponse.data;
      if (profileCompleted) {
        navigate("/profilepage");
      } else {
        navigate("/profile-setup");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      // Display backend error message
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-48 h-48 rounded-full blur-xl opacity-50"></div>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            Not registered with Gov account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
