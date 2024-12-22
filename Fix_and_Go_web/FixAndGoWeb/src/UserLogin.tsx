import bcrypt from "bcryptjs"; // Import bcryptjs
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Check Admin table
      const adminRef = collection(db, "Admin");
      const adminQuery = query(adminRef, where("email", "==", email));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        // If user is an admin, navigate to the admin dashboard
        navigate("/admindash");
        return;
      }

      // Step 2: Check Users table
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("email", "==", email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        const userId = userData.userId;
        const name = userData.name; // Assuming there is a 'name' field in Firestore
        const role = userData.role; // Assuming there is a 'role' field in Firestore
        const storedPassword = userData.password; // Get the stored hashed password from Firestore

        // Step 3: Compare entered password with hashed password in Firestore
        const passwordMatch = await bcrypt.compare(password, storedPassword);

        if (passwordMatch) {
          // If password matches, proceed to the respective page
          localStorage.setItem("userId", userId);
          localStorage.setItem("name", name);

          // Navigate based on the user's role
          switch (role) {
            case "Mechanic":
              navigate("/mview", { state: { userId, name } }); // Mechanic page
              break;
            case "Customer":
              navigate("/cview", { state: { userId, name } }); // Customer page
              break;
            case "Rental Owner":
              navigate("/rview", { state: { userId, name } }); // Rental owner page
              break;
            case "Troller":
              navigate("/tview", { state: { userId, name } }); // Troller page
              break;
            default:
              setError("Invalid role assigned. Please contact support.");
          }
        } else {
          setError("Incorrect email or password.");
        }
      } else {
        setError("Incorrect email or password.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    }
  };

  // Function to navigate to the registration page
  const handleRegister = () => {
    navigate("/userRegiser");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
          User Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-orange-500 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-orange-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-orange-500 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-orange-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Register Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
