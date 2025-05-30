import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

const TrollerView: React.FC = () => {
  const [trollers, setTrollers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [userName, setUserName] = useState<string | null>(""); // Added userName state

  useEffect(() => {
    const fetchTrollers = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const storedUserName = localStorage.getItem("name");

        if (!userId) {
          console.error("No user ID found in local storage.");
          setLoading(false);
          return;
        }

        // Store userName for UI display
        setUserName(storedUserName);

        const trollersRef = collection(db, "troller");
        const q = query(trollersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const trollersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrollers(trollersList);
      } catch (error) {
        console.error("Error fetching troller data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchTrollers();
  }, []);

  // Delete troller function
  const handleDelete = async (trollerId: string) => {
    try {
      const trollerRef = doc(db, "troller", trollerId);
      await deleteDoc(trollerRef);
      setTrollers(trollers.filter((troller) => troller.id !== trollerId));
      alert("Troller deleted successfully");
    } catch (error) {
      console.error("Error deleting troller:", error);
      alert("Failed to delete troller");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Display the user's name */}
      {userName && <h2 className="text-xl font-bold mb-4">Welcome, {userName}!</h2>}

      <button className="primary-btn mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
        <Link
          to="/tadd"
          state={{
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("name"),
          }}
        >
          Add Troller
        </Link>
      </button>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : trollers.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No trollers found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trollers.map((troller) => (
            <div key={troller.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {troller.image && (
                <img
                  src={troller.image}
                  alt={troller.serviceName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{troller.serviceName}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {troller.location}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Vehicle Types:</strong> {troller.vehicleTypes.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Towing Capacity:</strong> {troller.towingcapacity} ton
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Availability:</strong>{" "}
                  {troller.availability === "available" ? "Available" : "Not Available"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Value:</strong> Rs: {troller.value}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Contact Number:</strong> {troller.contactNumber}
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="primary-btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    <Link to="/tedit" state={{ troller }}>Edit</Link>
                  </button>
                  <button
                    className="primary-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(troller.id)}
                  >
                    Delete
                  </button>
                  <button className="primary-btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                                    <Link
                                      to="/tfeed"
                                      state={{
                                        trollerid: troller.id,                                       }}
                                    >
                                      View Feedback
                                    </Link>
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

export default TrollerView;
