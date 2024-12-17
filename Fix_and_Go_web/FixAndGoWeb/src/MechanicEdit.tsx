import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const MechanicEdit: React.FC = () => {
  // Access mechanic data passed via Link's state
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const mechanic = state?.mechanic;  // Get mechanic object from state
  
  // Initialize the form fields with the mechanic's data
  const [serviceName, setServiceName] = useState(mechanic?.serviceName || "");
  const [location, setLocation] = useState(mechanic?.location || "");
  const [vehicleType, setVehicleType] = useState(
    mechanic?.vehicleType.join(", ") || ""
  );
  const [availability, setAvailability] = useState(mechanic?.availability || false);
  const [contactNumber, setContactNumber] = useState(mechanic?.contactNumber || "");

  // Handle form submission to update mechanic details
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const mechanicRef = doc(db, "mechanic", mechanic.id);  // Access mechanic's document in Firestore

      // Update Firestore document
      await updateDoc(mechanicRef, {
        serviceName,
        location,
        vehicleType: vehicleType.split(",").map((type) => type.trim()),  // Split vehicle type string into array
        availability,
        contactNumber,
      });

      alert("Mechanic details updated successfully!");
      navigate(-1);  // Navigate back to previous page
    } catch (error) {
      console.error("Error updating mechanic details:", error);
      alert("Failed to update details. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Edit Mechanic Details</h2>
      <form onSubmit={handleUpdate}>
        {/* Service Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Service Name:</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Location */}
        <div style={{ marginBottom: "15px" }}>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Vehicle Type */}
        <div style={{ marginBottom: "15px" }}>
          <label>Vehicle Type (Comma Separated):</label>
          <input
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            placeholder="Enter vehicle types (e.g., Car, Truck, Bike)"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        {/* Availability */}
        <div style={{ marginBottom: "15px" }}>
          <label>Availability:</label>
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            style={{ marginLeft: "10px" }}
          />
        </div>

        {/* Contact Number */}
        <div style={{ marginBottom: "15px" }}>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
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
          Update Details
        </button>
      </form>
    </div>
  );
};

export default MechanicEdit;
