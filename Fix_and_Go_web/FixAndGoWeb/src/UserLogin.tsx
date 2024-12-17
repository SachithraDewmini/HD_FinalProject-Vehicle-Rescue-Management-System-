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
      // Firestore query to check if the user exists
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("email", "==", email),
        where("password", "==", password) // Not secure in production
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        const userId = userData.userId;
        const role = userData.role; // Assuming you have a 'role' field in Firestore

        if (userId && role) {
          // Store userId in localStorage
          localStorage.setItem("userId", userId);

          // Navigate based on the user's role
          switch (role) {
            case "Mechanic":
              navigate("/mview"); // Mechanic page
              break;
              case "Customer":
                navigate("/cview"); // Rental owner page
                break;
            case "Rental Owner":
              navigate("/rview"); // Rental owner page
              break;
            case "Troller":
              navigate("/tview"); // Troller page
              break;
            default:
              setError("Invalid role assigned. Please contact support.");
          }
        } else {
          setError("User role or ID not found. Please contact support.");
        }
      } else {
        setError("Incorrect email or password.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    }
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
      </div>
    </div>
  );
};

export default UserLogin;
