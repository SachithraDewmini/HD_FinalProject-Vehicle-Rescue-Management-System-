import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const MechanicEdit: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const mechanic = state?.mechanic;

  // Initialize the form fields with the mechanic's data
  const [serviceName, setServiceName] = useState(mechanic?.serviceName || "");
  const [location, setLocation] = useState(mechanic?.location || "");
  const [vehicleType, setVehicleType] = useState({
    car: mechanic?.vehicleType?.includes("car") || false,
    van: mechanic?.vehicleType?.includes("van") || false,
    bus: mechanic?.vehicleType?.includes("bus") || false,
  });
  const [availability, setAvailability] = useState(mechanic?.availability || false);
  const [contactNumber, setContactNumber] = useState(mechanic?.contactNumber || "");
  const [currentImage, setCurrentImage] = useState(mechanic?.image || "");
  const [newImage, setNewImage] = useState<File | null>(null);

  // Handle vehicle type checkbox changes
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setVehicleType((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
    }
  };

  // Handle form submission to update mechanic details
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const mechanicRef = doc(db, "mechanic", mechanic.id);

      // Update Firestore document
      await updateDoc(mechanicRef, {
        serviceName,
        location,
        vehicleType: Object.keys(vehicleType).filter((key) => vehicleType[key]),
        availability,
        contactNumber,
        image: newImage ? URL.createObjectURL(newImage) : currentImage,
      });

      alert("Mechanic details updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating mechanic details:", error);
      alert("Failed to update details. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">Edit Mechanic Details</h2>

      <form onSubmit={handleUpdate}>
        {/* Service Name */}
        <div className="mb-4">
          <label htmlFor="serviceName" className="block text-lg text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Vehicle Type */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Vehicle Type</label>
          <div className="flex space-x-4 mt-2">
            {Object.keys(vehicleType).map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={type}
                  checked={vehicleType[type]}
                  onChange={handleVehicleTypeChange}
                  className="form-checkbox text-orange-600"
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-lg text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-lg text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Availability</label>
          <div className="mt-2">
            <input
              type="checkbox"
              id="availability"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="form-checkbox text-orange-600"
            />
            <label htmlFor="availability" className="ml-2 text-gray-700">
              Available
            </label>
          </div>
        </div>

        {/* Current Image */}
        {currentImage && (
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Current Image</label>
            <img
              src={currentImage}
              alt="Current Mechanic"
              className="mt-2 rounded-lg w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-gray-300 rounded-lg"
          />
          {newImage && (
            <img
              src={URL.createObjectURL(newImage)}
              alt="New Mechanic"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          )}
        </div>

        {/* Submit and Back Buttons */}
        <div className="mt-6 space-y-4">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Update Details
          </button>
          <button
            type="button"
            onClick={() => navigate("/mview")}
            className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default MechanicEdit;
