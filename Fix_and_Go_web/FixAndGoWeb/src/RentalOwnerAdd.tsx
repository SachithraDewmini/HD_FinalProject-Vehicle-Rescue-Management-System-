import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const RentalOwnerAdd: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem("userId"); // Retrieve userId

  const [serviceName, setServiceName] = useState("");
  const [vehiclebrandName, setVehiclebrandName] = useState("");
  const [noOfsheets, setNoOfsheets, ] = useState("");
  const [condition, setCondition, ] = useState("");
  const [value, setValue, ] = useState("");
  const [locationName, setLocationName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState<string>(""); // Changed to string
  const [availability, setAvailability] = useState("available");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName || !vehiclebrandName || !noOfsheets || !condition || !value ||  !locationName || !contactNumber || !vehicleType || !userId) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const rentalownerData = {
        serviceName,
        vehiclebrandName,
        noOfsheets, 
        condition,
        value,
        location: locationName,
        contactNumber,
        vehicleType, // Now a single string from dropdown
        availability,
        image: image ? URL.createObjectURL(image) : null,
        userId, // Ensure userId is saved
      };

      await addDoc(collection(db, "rentalowner"), rentalownerData);
      alert("Rental Owner added successfully!");
      navigate("/rview");
    } catch (error) {
      console.error("Error adding rentalowner:", error);
      alert("Failed to add rentalowner. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">Add Rental Owner</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
          <label htmlFor="vehicleType" className="block text-lg text-gray-700">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          >
            <option value="" disabled>
              Select a vehicle type
            </option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="bus">Bus</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="vehiclebrandName" className="block text-lg text-gray-700">
          Vehicle Brand
          </label>
          <input
            type="text"
            id="vehiclebrandName"
            value={vehiclebrandName}
            onChange={(e) => setVehiclebrandName(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="noOfsheets" className="block text-lg text-gray-700">
          Number Of Sheets
          </label>
          <input
            type="text"
            id="noOfsheets"
            value={noOfsheets}
            onChange={(e) => setNoOfsheets(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="condition" className="block text-lg text-gray-700">
          Condition
          </label>
          <input
            type="text"
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Availability</label>
          <div className="mt-2">
            <label className="mr-4">
              <input
                type="radio"
                value="available"
                checked={availability === "available"}
                onChange={() => setAvailability("available")}
                className="form-radio text-orange-600"
              />
              <span className="ml-2">Available</span>
            </label>
            <label>
              <input
                type="radio"
                value="unavailable"
                checked={availability === "unavailable"}
                onChange={() => setAvailability("unavailable")}
                className="form-radio text-orange-600"
              />
              <span className="ml-2">Unavailable</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="value" className="block text-lg text-gray-700">
          Value
          </label>
          <input
            type="text"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-gray-300 rounded-lg"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalOwnerAdd;
