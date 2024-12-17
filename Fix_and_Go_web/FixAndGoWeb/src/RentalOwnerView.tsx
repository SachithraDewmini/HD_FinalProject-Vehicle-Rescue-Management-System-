import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

const RentalOwnerView: React.FC = () => {
  const [rentalowners, setRentalowners] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state to handle data fetch

  useEffect(() => {
    const fetchRentalowners = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in local storage.");
          setLoading(false);
          return;
        }

        const rentalownersRef = collection(db, "rentalowner");
        const q = query(rentalownersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const rentalownersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRentalowners(rentalownersList);
      } catch (error) {
        console.error("Error fetching rentalowner data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchRentalowners();
  }, []);

  // Delete rentalowner function
  const handleDelete = async (rentalownerId: string) => {
    try {
      const rentalownerRef = doc(db, "rentalowner", rentalownerId);
      await deleteDoc(rentalownerRef);
      setRentalowners(rentalowners.filter((rentalowner) => rentalowner.id !== rentalownerId));
      alert("Rental Owner deleted successfully");
    } catch (error) {
      console.error("Error deleting rentalowner:", error);
      alert("Failed to delete rentalowner");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button className="primary-btn mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
        <Link to="/radd" state={{ userId: localStorage.getItem("userId") }}>
          Add Rental Owner
        </Link>
      </button>

      {loading ? ( // Display a loading message while data is being fetched
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : rentalowners.length === 0 ? ( // Show a message if no rental owners are found
        <div className="text-center text-lg text-gray-600">No rental owners found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalowners.map((rentalowner) => (
            <div key={rentalowner.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {rentalowner.image && (
                <img
                  src={rentalowner.image}
                  alt={rentalowner.serviceName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{rentalowner.serviceName}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {rentalowner.location}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Vehicle Type:</strong> {Array.isArray(rentalowner.vehicleType) ? rentalowner.vehicleType.join(", ") : rentalowner.vehicleType}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Vehicle Brand:</strong> {Array.isArray(rentalowner.vehiclebrandName) ? rentalowner.vehiclebrandName.join(", ") : rentalowner.vehiclebrandName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Number of Sheets:</strong> {Array.isArray(rentalowner.noOfsheets) ? rentalowner.noOfsheets.join(", ") : rentalowner.noOfsheets}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Condition:</strong> {Array.isArray(rentalowner.condition) ? rentalowner.condition.join(", ") : rentalowner.condition}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Availability:</strong> {rentalowner.availability === "available" ? "Available" : "Not Available"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Value:</strong> {Array.isArray(rentalowner.value) ? rentalowner.value.join(", ") : rentalowner.value}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Contact Number:</strong> {rentalowner.contactNumber}
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="primary-btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    <Link to="/redit" state={{ rentalowner }}>
                      Edit
                    </Link>
                  </button>
                  <button
                    className="primary-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(rentalowner.id)} // Pass rentalowner id to delete
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalOwnerView;
