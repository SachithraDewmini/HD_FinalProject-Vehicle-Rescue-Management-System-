import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

interface RentalOwner {
  id: string;
  serviceName: string;
  vehicleBrandName: string;
  noOfSeats: string;
  condition: string;
  value: string;
  location: string;
  contactNumber: string;
  vehicleType: string;
  availability: string;
  userName: string;
  images: string[];
}

const CusRentalView: React.FC = () => {
  const [rentalOwners, setRentalOwners] = useState<RentalOwner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<RentalOwner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    const fetchRentalOwners = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rentalowner"));
        const data: RentalOwner[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RentalOwner[];
        setRentalOwners(data);
        setFilteredOwners(data);
      } catch (error) {
        console.error("Error fetching rental owners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalOwners();
  }, []);

  useEffect(() => {
    const filtered = rentalOwners.filter((rentalowner) => {
      const matchesLocation =
        !locationFilter ||
        rentalowner.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesVehicleType =
        !vehicleTypeFilter ||
        rentalowner.vehicleType.toLowerCase() === vehicleTypeFilter.toLowerCase();
      return matchesLocation && matchesVehicleType;
    });
    setFilteredOwners(filtered);
  }, [locationFilter, vehicleTypeFilter, rentalOwners]);

  const handleCopyContact = (contactNumber: string) => {
    navigator.clipboard.writeText(contactNumber).then(() => {
      alert("Contact number copied to clipboard!");
    });
  };

  if (loading) {
    return <div className="text-center text-xl py-10">Loading rental owners...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/cview"
        className="self-start mb-4 ml-6 text-blue-700 hover:underline flex items-center"
      >
        ← Back
      </Link>

      {userName && (
        <h2 className="text-xl font-bold mb-4">Welcome, {userName}!</h2>
      )}

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Available Rentals
          </h1>

          {/* Filters */}
          <div className="flex justify-center space-x-4 mb-6">
            <input
              type="text"
              placeholder="Filter by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={vehicleTypeFilter}
              onChange={(e) => setVehicleTypeFilter(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Vehicle Types</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="bus">Bus</option>
            </select>
          </div>

          {filteredOwners.length === 0 ? (
            <p className="text-center text-gray-500">
              No rental owners available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOwners.map((rentalowner) => (
                <div
                  key={rentalowner.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Display */}
                  {rentalowner.images.length > 0 ? (
                    <div className="relative h-48">
                      <img
                        src={rentalowner.images[0]}
                        alt="Rental"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <img
                      src="/fallback.png"
                      alt="Default"
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Service: {rentalowner.serviceName}
                    </h2>
                    <p>
                      <strong>Owner:</strong> {rentalowner.userName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Brand: {rentalowner.vehicleBrandName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Seats: {rentalowner.noOfSeats}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Condition: {rentalowner.condition}
                    </p>
                    <p className="text-gray-700">
                      <strong>Value:</strong> {rentalowner.value}
                    </p>
                    <p className="text-gray-700">
                      <strong>Location:</strong>{" "}
                      <a
                        href={`https://www.google.com/maps?q=${rentalowner.location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {rentalowner.location}
                      </a>
                    </p>
                    <p className="text-gray-700 flex items-center">
                      <strong>Contact:</strong>{" "}
                      <span className="mr-2">{rentalowner.contactNumber}</span>
                      <button
                        onClick={() => handleCopyContact(rentalowner.contactNumber)}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Copy
                      </button>
                    </p>
                    <p className="text-gray-700">
                      <strong>Vehicle Type:</strong> {rentalowner.vehicleType}
                    </p>
                    <p className="text-gray-700">
                      <strong>Availability:</strong>{" "}
                      <span
                        className={
                          rentalowner.availability === "available"
                            ? "text-green-500 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {rentalowner.availability}
                      </span>
                    </p>
                    <div className="flex space-x-4 mt-4">
                      <Link
                        to="/raddfeed"
                        state={{
                          rentalownerid: rentalowner.id,
                          name: localStorage.getItem("name"),
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                      >
                        Add Feedback
                      </Link>
                      <Link
                        to="/rviewfeed"
                        state={{ rentalownerid: rentalowner.id }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                      >
                        View Feedback
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CusRentalView;
