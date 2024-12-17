import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./Firebaseconfig"; // Update the path if needed

const UserRegister: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const roles = ["Mechanic", "Customer", "Rental Owner", "Troller"]; // Roles dropdown options

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
      // Get the current max userId from Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("userId", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let maxUserId = 0;
      querySnapshot.forEach((doc) => {
        maxUserId = doc.data().userId;
      });

      const newUserId = maxUserId + 1; // Increment userId

      // Add user to Firestore
      await addDoc(usersRef, {
        userId: newUserId,
        name,
        email,
        role,
        password, // In real-world apps, never store raw passwords; use hashing
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

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>User Registration</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        {/* Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Role */}
        <div style={{ marginBottom: "10px" }}>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
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
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: "10px" }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
