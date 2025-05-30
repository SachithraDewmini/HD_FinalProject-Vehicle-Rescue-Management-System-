import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

// Fixing the Mechanic interface with the correct serviceName field
interface Mechanic {
  availability: string;
  contactNumber: string;
  image: string;
  location: string;
  serviceName: string; // Fixed the extra 'S'
  vehicleType: string[];
  userName: string;
  id: string;
}

const CusMechanicView: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [filteredMechanics, setFilteredMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // Fetching the user's name from localStorage
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name); // Setting the user name state correctly
    }
  }, []);

  // Fetching the mechanics data from Firestore
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const mechanicSnapshot = await getDocs(collection(db, "mechanic"));
        const mechanicData: Mechanic[] = mechanicSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Mechanic[];

        setMechanics(mechanicData);
        setFilteredMechanics(mechanicData);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  // Filtering the mechanics based on location and vehicle type
  useEffect(() => {
    let filtered = mechanics;

    if (locationFilter) {
      filtered = filtered.filter((mechanic) =>
        mechanic.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (vehicleTypeFilter) {
      filtered = filtered.filter((mechanic) =>
        mechanic.vehicleType.includes(vehicleTypeFilter)
      );
    }

    setFilteredMechanics(filtered);
  }, [locationFilter, vehicleTypeFilter, mechanics]);

  // Handling copying the contact number to clipboard
  const handleCopyContact = (contactNumber: string) => {
    navigator.clipboard.writeText(contactNumber).then(() => {
      alert("Contact number copied to clipboard!");
    });
  };

  if (loading) {
    return <div className="text-center text-xl py-10">Loading mechanics...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
                      to="/cview"
                      className="self-start mb-4 ml-6 text-blue-700 hover:underline flex items-center"
                    >
                      ← Back
                    </Link>
      {/* Display the user's name */}
      {userName && (
        <h2 className="text-xl font-bold mb-4">
          Welcome, {userName}!
        </h2>
      )}

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Available Mechanics</h1>

          {/* Filter Section */}
          <div className="mb-6 flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Search by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
            <select
              value={vehicleTypeFilter}
              onChange={(e) => setVehicleTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="bus">Bus</option>
            </select>
          </div>

          {/* No results found message */}
          {filteredMechanics.length === 0 ? (
            <p className="text-center">No mechanics found for the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMechanics.map((mechanic) => (
                <div key={mechanic.id} className="bg-white shadow-md rounded-lg">
                  <img
                    src={mechanic.image}
                    className="w-full h-48 object-cover"
                    alt={mechanic.serviceName}
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold">{mechanic.serviceName}</h2>
                    <p>
                      <strong>Owner:</strong> {mechanic.userName}
                    </p>
                    <p ><strong>Vehicle Types:</strong> {mechanic.vehicleType.join(", ")}</p>
                    <p>
  <strong>Location:</strong>{" "}
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mechanic.location)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    {mechanic.location}
  </a>
</p>

                    <p>
                      <strong>Contact:</strong> {mechanic.contactNumber}
                      <button
                        onClick={() => handleCopyContact(mechanic.contactNumber)}
                        className="ml-2 text-blue-500"
                      >
                        Copy
                      </button>
                    </p>
                    <p>
                    <strong>Availability:</strong>{" "}
                    <span
                      className={
                        mechanic.availability.toLowerCase() === "available"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {mechanic.availability}
                    </span>
                  </p>

                    <div className="flex space-x-4 mt-4">
                      {/* Corrected Link for Add Feedback */}
                      <Link 
                        to="/maddfeed" 
                        state={{ mechanicid: mechanic.id, name: localStorage.getItem("name") }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                      >
                        Add Feedback
                      </Link>

                      {/* Link to View Feedback */}
                      <Link to="/mviewfeed" state={{ mechanicid: mechanic.id }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                      
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

export default CusMechanicView;
