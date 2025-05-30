import React from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    // Optionally clear other session-related data
    localStorage.clear(); // If you want to clear all stored data

    // Redirect to login page
    navigate("/userLogin"); // Assuming the login route is "/login"
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
          Are you sure you want to log out?
        </h2>
        <div className="flex justify-around">
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => navigate("/")} // Optionally navigate to the home page
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
