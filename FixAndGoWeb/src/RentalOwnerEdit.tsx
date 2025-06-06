import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const RentalOwnerEdit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure rental owner details passed via Link's `state`
  const rentalowner = location.state?.rentalowner || null;

  // Initialize state with the rental owner details
  const [formData, setFormData] = useState({
    serviceName: rentalowner?.serviceName || "",
    location: rentalowner?.location || "",
    vehicleType: Array.isArray(rentalowner?.vehicleType)
      ? rentalowner.vehicleType.join(", ")
      : rentalowner?.vehicleType || "",
    vehicleBrandName: rentalowner?.vehicleBrandName || "",
    noOfSeats: rentalowner?.noOfSeats || "",
    condition: rentalowner?.condition || "",
    value: rentalowner?.value || "",
    availability: rentalowner?.availability || false,
    contactNumber: rentalowner?.contactNumber || "",
  });

  // Redirect to previous page if rental owner details are missing
  useEffect(() => {
    if (!rentalowner) {
      alert("Rental owner details are missing. Redirecting...");
      navigate(-1);
    }
  }, [rentalowner, navigate]);

  // Update formData when input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit updated data to Firestore
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.serviceName.trim() || !formData.location.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const rentalownerRef = doc(db, "rentalowner", rentalowner.id);

      // Update Firestore document
      await updateDoc(rentalownerRef, {
        ...formData,
        noOfSeats: parseInt(formData.noOfSeats, 10),
        value: parseFloat(formData.value),
        vehicleType: formData.vehicleType.split(",").map((type) => type.trim()), // Convert string to array
      });

      alert("Rental owner details updated successfully!");
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error("Error updating rental owner:", error.message);
      alert(`Failed to update rental owner details: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Rental Owner Details</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
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

        {/* Vehicle Brand */}
        <div>
          <label className="block font-medium">Vehicle Brand Name:</label>
          <input
            type="text"
            name="vehicleBrandName"
            value={formData.vehicleBrandName}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Number Of Seats */}
        <div>
          <label className="block font-medium">Number Of Seats:</label>
          <input
            type="text"
            name="noOfSeats"
            value={formData.noOfSeats}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block font-medium">Condition:</label>
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
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

        {/* Contact Number */}
        <div>
          <label className="block font-medium">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
            pattern="\d{10}"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default RentalOwnerEdit;
