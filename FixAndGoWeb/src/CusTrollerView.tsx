import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";


interface Troller {
  availability: string;
  contactNumber: string;
  image: string;
  location: string;
  serviceName: string; 
  vehicleTypes: string[];
  towingcapacity:string;
  value:string;
  userName: string;
  id: string;
}

const CusTrollerView: React.FC = () => {
  const [trollers, setTrollers] = useState<Troller[]>([]);
  const [filteredTrollers, setFilteredTrollers] = useState<Troller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [vehicleTypesFilter, setVehicleTypesFilter] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // Fetching the user's name from localStorage
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name); // Setting the user name state correctly
    }
  }, []);

  useEffect(() => {
    const fetchTrollers = async () => {
      try {
        const trollerSnapshot = await getDocs(collection(db, "troller"));
        const trollerData: Troller[] = trollerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Troller[];

        setTrollers(trollerData);
        setFilteredTrollers(trollerData);
      } catch (error) {
        console.error("Error fetching trollers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrollers();
  }, []);

  useEffect(() => {
    let filtered = trollers;

    if (locationFilter) {
      filtered = filtered.filter((troller) =>
        troller.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (vehicleTypesFilter) {
      filtered = filtered.filter((troller) =>
        troller.vehicleTypes.includes(vehicleTypesFilter)
      );
    }

    setFilteredTrollers(filtered);
  }, [locationFilter, vehicleTypesFilter, trollers]);

  // Handling copying the contact number to clipboard
  const handleCopyContact = (contactNumber: string) => {
    navigator.clipboard.writeText(contactNumber).then(() => {
      alert("Contact number copied to clipboard!");
    });
  };

  if (loading) {
    return <div className="text-center text-xl py-10">Loading trollers...</div>;
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
          <h1 className="text-4xl font-bold text-center mb-8">Available Trollers</h1>

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
              value={vehicleTypesFilter}
              onChange={(e) => setVehicleTypesFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Select Vehicle Types</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="bus">Bus</option>
            </select>
          </div>

          {/* No results found message */}
          {filteredTrollers.length === 0 ? (
            <p className="text-center">No trollers found for the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrollers.map((troller) => (
                <div key={troller.id} className="bg-white shadow-md rounded-lg">
                  <img
                    src={troller.image}
                    className="w-full h-48 object-cover"
                    alt={troller.serviceName}
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold">{troller.serviceName}</h2>
                    <p>
                      <strong>Owner:</strong> {troller.userName}
                    </p>
                    <p ><strong>Vehicle Types:</strong> {troller.vehicleTypes.join(", ")}</p>
                    <p ><strong>Towing Capacity :</strong> {troller.towingcapacity} ton</p>
                    <p ><strong>Value:</strong> Rs: {troller.value}</p>
                    <p>
  <strong>Location:</strong>{" "}
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(troller.location)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline"
  >
    {troller.location}
  </a>
</p>

                    <p>
                      <strong>Contact:</strong> {troller.contactNumber}
                      <button
                        onClick={() => handleCopyContact(troller.contactNumber)}
                        className="ml-2 text-blue-500"
                      >
                        Copy
                      </button>
                    </p>
                    <p>
                    <strong>Availability:</strong>{" "}
                    <span
                      className={
                        troller.availability.toLowerCase() === "available"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {troller.availability}
                    </span>
                  </p>

                    <div className="flex space-x-4 mt-4">
                      {/* Corrected Link for Add Feedback */}
                      <Link to="/taddfeed" state={{ trollerid: troller.id, name: localStorage.getItem("name") }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
                        Add Feedback
                        </Link>

                    <Link to="/tviewfeed" state={{ trollerid: troller.id }} 
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

export default CusTrollerView;
