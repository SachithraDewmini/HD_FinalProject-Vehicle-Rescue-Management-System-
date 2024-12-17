import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const TrollerEdit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract troller details from Link's state
  const troller = location.state?.troller || null;

  // State to hold form data
  const [formData, setFormData] = useState({
    serviceName: troller?.serviceName || "",
    location: troller?.location || "",
    vehicleType: Array.isArray(troller?.vehicleType) ? troller.vehicleType.join(", ") : troller?.vehicleType || "",
    towingcapacity: troller?.towingcapacity || "",
    availability: troller?.availability === "available",
    value: troller?.value || "",
    contactNumber: troller?.contactNumber || "",
  });

  // Redirect if no troller data is passed
  useEffect(() => {
    if (!troller) {
      alert("No troller data found. Redirecting...");
      navigate(-1);
    }
  }, [troller, navigate]);

  // Update form data on change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit updated data to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const trollerRef = doc(db, "troller", troller.id);

      // Update Firestore document
      await updateDoc(trollerRef, {
        ...formData,
        availability: formData.availability ? "available" : "not available",
        vehicleType: formData.vehicleType.split(",").map((type) => type.trim()), // Convert string back to array
      });

      alert("Troller details updated successfully!");
      navigate(-1); // Redirect to previous page
    } catch (error) {
      console.error("Error updating troller:", error);
      alert("Failed to update troller details. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Troller Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Name */}
        <div>
          <label className="block font-medium">Service Name:</label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block font-medium">Vehicle Type (Comma Separated):</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Towing Capacity */}
        <div>
          <label className="block font-medium">Towing Capacity:</label>
          <input
            type="text"
            name="towingcapacity"
            value={formData.towingcapacity}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Availability */}
        <div className="flex items-center">
          <label className="font-medium mr-2">Availability:</label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleInputChange}
            className="h-5 w-5"
          />
        </div>

        {/* Value */}
        <div>
          <label className="block font-medium">Value:</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Update Troller
        </button>
      </form>
    </div>
  );
};

export default TrollerEdit;
