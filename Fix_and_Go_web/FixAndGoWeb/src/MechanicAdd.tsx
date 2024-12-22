import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const MechanicAdd: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem("userId"); // Retrieve userId
  const name = location.state?.name || localStorage.getItem("name"); // Retrieve name

  const [selectedTable, setSelectedTable] = useState("mechanic"); // Selected table
  const [serviceName, setServiceName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState<{ [key: string]: boolean }>({
    car: false,
    van: false,
    bus: false,
  });
  const [availability, setAvailability] = useState("available");
  const [image, setImage] = useState<File | null>(null);

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setVehicleType((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName || !locationName || !contactNumber || !userId || !name) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const mechanicData = {
        serviceName,
        location: locationName,
        contactNumber,
        vehicleType: Object.keys(vehicleType).filter((key) => vehicleType[key]),
        availability,
        image: image ? URL.createObjectURL(image) : null,
        userId, // Save userId
        userName: name, // Save user name
      };

      await addDoc(collection(db, selectedTable), mechanicData);
      alert(`${selectedTable} entry added successfully!`);
      navigate("/mview");
    } catch (error) {
      console.error(`Error adding ${selectedTable} entry:`, error);
      alert(`Failed to add ${selectedTable} entry. Please try again.`);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">
        Add Mechanic or Feedback
      </h2>

      {/* Select Table */}
      <div className="mb-4">
        <label htmlFor="selectedTable" className="block text-lg text-gray-700">
          Select Table
        </label>
        <select
          id="selectedTable"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="mechanic">Mechanic</option>
          <option value="mechanicFeedbacks">Mechanic Feedbacks</option>
          <option value="rentalownerFeedbacks">Rental Owner Feedbacks</option>
          <option value="trollerFeedbacks">Troller Feedbacks</option>
        </select>
      </div>

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
          <label className="block text-lg text-gray-700">Vehicle Type</label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="car"
                checked={vehicleType.car}
                onChange={handleVehicleTypeChange}
                className="form-checkbox text-orange-600"
              />
              <span>Car</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="van"
                checked={vehicleType.van}
                onChange={handleVehicleTypeChange}
                className="form-checkbox text-orange-600"
              />
              <span>Van</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="bus"
                checked={vehicleType.bus}
                onChange={handleVehicleTypeChange}
                className="form-checkbox text-orange-600"
              />
              <span>Bus</span>
            </label>
          </div>
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
          <label className="block text-lg text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-gray-300 rounded-lg"
          />
        </div>

        <div className="mt-6 space-y-4">
  <button
    type="submit"
    className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
  >
    Submit
  </button>

  {/* Back Button */}
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
