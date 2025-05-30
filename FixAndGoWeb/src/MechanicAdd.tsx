import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const MechanicAdd: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve userId and name from location state or localStorage
  const userId = location.state?.userId || localStorage.getItem("userId");
  const name = location.state?.name || localStorage.getItem("name");

  // State variables
  const [serviceName, setServiceName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState({
    car: false,
    van: false,
    bus: false,
  });
  const [availability, setAvailability] = useState("available");
  const [image, setImage] = useState<File | null>(null);

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
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!serviceName || !locationName || !contactNumber || !userId || !name) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Prepare mechanic data
      const mechanicData = {
        serviceName,
        location: locationName,
        contactNumber,
        vehicleType: Object.keys(vehicleType).filter((key) => vehicleType[key]),
        availability,
        image: image ? URL.createObjectURL(image) : null, // Temporary image URL
        userId,
        userName: name,
      };

      // Add document to Firestore
      await addDoc(collection(db, "mechanic"), mechanicData);

      alert("Mechanic data added successfully!");
      navigate("/mview");
    } catch (error) {
      console.error("Error adding mechanic entry:", error);
      alert("Failed to add mechanic entry. Please try again.");
    }
  };

  return (
    
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
      
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">Add Mechanic</h2>

      <form onSubmit={handleSubmit}>
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
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
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
            {[
              { label: "Available", value: "available" },
              { label: "Unavailable", value: "unavailable" },
            ].map(({ label, value }) => (
              <label key={value} className="mr-4">
                <input
                  type="radio"
                  value={value}
                  checked={availability === value}
                  onChange={() => setAvailability(value)}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit and Back Buttons */}
        <div className="mt-6 space-y-4">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Submit
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

export default MechanicAdd;
