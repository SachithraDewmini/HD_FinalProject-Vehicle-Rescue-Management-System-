import bcrypt from "bcryptjs"; // Import bcryptjs
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { db } from "./Firebaseconfig"; // Update the path if needed

const UserRegister: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const roles = ["Mechanic", "Customer", "Rental Owner", "Troller"]; // Roles dropdown options

  // Using useNavigate for navigation
  const navigate = useNavigate();

  // Form Validation
  const validateForm = () => {
    if (!name || !email || !role || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  // Handle Form Submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    if (!validateForm()) {
      return;
    }

    try {
      // Hash the password using bcryptjs
      const hashedPassword = await bcrypt.hash(password, 10); // The "10" is the salt rounds

      // Get the current max userId from Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("userId", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let maxUserId = 0;
      querySnapshot.forEach((doc) => {
        maxUserId = doc.data().userId;
      });

      const newUserId = maxUserId + 1; // Increment userId

      // Add user to Firestore with the hashed password
      await addDoc(usersRef, {
        userId: newUserId,
        name,
        email,
        role,
        password: hashedPassword, // Store the hashed password
      });

      alert("User registered successfully!");
      // Reset form fields
      setName("");
      setEmail("");
      setRole("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error adding user: ", error);
      setError("Failed to register. Please try again.");
    }
  };

  // Handle Login Button Click
  const handleLoginRedirect = () => {
    navigate("/userLogin"); // Navigate to /userLogin route
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Registration</h2>
      
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleRegister}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a role</option>
            {roles.map((r, index) => (
              <option key={index} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Register
        </button>
      </form>

      {/* Login Button */}
      <div className="mt-4 text-center">
        <p>Already have an account? 
          <button
            onClick={handleLoginRedirect}
            className="mt-2 p-3 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
