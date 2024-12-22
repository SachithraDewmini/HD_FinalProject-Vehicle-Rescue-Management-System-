import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const TrollerAdd: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem("userId"); // Retrieve userId
  const name = location.state?.name || localStorage.getItem("name");

  const [serviceName, setServiceName] = useState("");
  const [towingcapacity, setTowingcapacity] = useState("");
  const [value, setValue] = useState("");
  const [locationName, setLocationName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]); // Array to store selected vehicle types
  const [availability, setAvailability] = useState("available");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleVehicleTypeChange = (type: string) => {
    // Toggle the selected vehicle type
    setVehicleTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type) // Remove if already selected
        : [...prev, type] // Add if not selected
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !serviceName ||
      !towingcapacity ||
      !value ||
      !locationName ||
      !contactNumber || 
      !name||
      vehicleTypes.length === 0 || // Ensure at least one vehicle type is selected
      !userId
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const trollerData = {
        serviceName,
        towingcapacity,
        value,
        location: locationName,
        contactNumber,
        vehicleTypes, // Array of selected vehicle types
        availability,
        image: image ? URL.createObjectURL(image) : null,
        userId, // Ensure userId is saved
        userName: name,
      };

      await addDoc(collection(db, "troller"), trollerData);
      alert("Rental Owner added successfully!");
      navigate("/tview");
    } catch (error) {
      console.error("Error adding troller:", error);
      alert("Failed to add troller. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">Add Rental Owner</h2>
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

        {/* Vehicle Type (Checkboxes) */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Vehicle Type</label>
          <div className="mt-2">
            <label className="block">
              <input
                type="checkbox"
                value="car"
                checked={vehicleTypes.includes("car")}
                onChange={() => handleVehicleTypeChange("car")}
                className="form-checkbox text-orange-600"
              />
              <span className="ml-2">Car</span>
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="van"
                checked={vehicleTypes.includes("van")}
                onChange={() => handleVehicleTypeChange("van")}
                className="form-checkbox text-orange-600"
              />
              <span className="ml-2">Van</span>
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="bus"
                checked={vehicleTypes.includes("bus")}
                onChange={() => handleVehicleTypeChange("bus")}
                className="form-checkbox text-orange-600"
              />
              <span className="ml-2">Bus</span>
            </label>
          </div>
        </div>

        {/* Towing Capacity */}
        <div className="mb-4">
          <label htmlFor="towingcapacity" className="block text-lg text-gray-700">
            Towing Capacity
          </label>
          <input
            type="text"
            id="towingcapacity"
            value={towingcapacity}
            onChange={(e) => setTowingcapacity(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
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

        {/* Value */}
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

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
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

export default TrollerAdd;
