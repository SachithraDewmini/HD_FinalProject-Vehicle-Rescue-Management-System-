import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const RentalOwnerAdd: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve userId and name from location state or localStorage
  const userId = location.state?.userId || localStorage.getItem("userId") || "";
  const name = location.state?.name || localStorage.getItem("name") || "";

  const [serviceName, setServiceName] = useState<string>("");
  const [vehicleBrandName, setVehicleBrandName] = useState<string>("");
  const [noOfSeats, setNoOfSeats] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [availability, setAvailability] = useState<string>("available");
  const [images, setImages] = useState<File[]>([]); // Updated state to handle multiple images

  // Handle image upload (multiple images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      // Limit to 5 images
      if (selectedFiles.length + images.length > 5) {
        alert("You can only upload up to 5 images.");
      } else {
        setImages((prevImages) => [...prevImages, ...selectedFiles]);
      }
    }
  };

  // Remove an image
  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !serviceName ||
      !vehicleBrandName ||
      !noOfSeats ||
      !condition ||
      !value ||
      !locationName ||
      !contactNumber ||
      !vehicleType
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Prepare data to save
      const rentalOwnerData = {
        serviceName,
        vehicleBrandName,
        noOfSeats,
        condition,
        value,
        location: locationName,
        contactNumber,
        vehicleType,
        availability,
        images: images.map((image) => URL.createObjectURL(image)), // Store temporary local URLs for images
        userId,
        userName: name,
      };

      // Save data to Firestore
      await addDoc(collection(db, "rentalowner"), rentalOwnerData);

      alert("Rental Owner added successfully!");
      navigate("/rview"); // Redirect to the rental owner view page
    } catch (error) {
      console.error("Error adding rental owner:", error);
      alert("Failed to add rental owner. Please try again.");
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
          <label htmlFor="vehicleBrandName" className="block text-lg text-gray-700">
            Vehicle Brand
          </label>
          <input
            type="text"
            id="vehicleBrandName"
            value={vehicleBrandName}
            onChange={(e) => setVehicleBrandName(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="noOfSeats" className="block text-lg text-gray-700">
            Number of Seats
          </label>
          <input
            type="text"
            id="noOfSeats"
            value={noOfSeats}
            onChange={(e) => setNoOfSeats(e.target.value)}
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
          <label className="block text-lg text-gray-700">Upload Images (Max 5)</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-gray-300 rounded-lg"
            disabled={images.length >= 5} // Disable input when 5 images are uploaded
          />
          <div className="mt-2">
            {images.length < 5 && (
              <button
                type="button"
                onClick={() => document.getElementById('imageUpload')?.click()}
                className="text-orange-600 hover:text-orange-800"
              >
                + Add More
              </button>
            )}
            {images.length > 0 && (
              <div className="flex mt-2 space-x-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`uploaded-image-${index}`}
                      className="w-16 h-16 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
