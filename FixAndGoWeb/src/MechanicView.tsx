import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

const MechanicView: React.FC = () => {
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const name = localStorage.getItem("name");

        if (!userId) {
          console.error("No user ID found in local storage.");
          return;
        }

        setUserName(name || ""); // Set the user's name from localStorage

        const mechanicsRef = collection(db, "mechanic");
        const q = query(mechanicsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const mechanicsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMechanics(mechanicsList);
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
      }
    };

    fetchMechanics();
  }, []);

  // Delete mechanic function
  const handleDelete = async (mechanicId: string) => {
    try {
      const mechanicRef = doc(db, "mechanic", mechanicId);
      await deleteDoc(mechanicRef);
      setMechanics(mechanics.filter((mechanic) => mechanic.id !== mechanicId));
      alert("Mechanic deleted successfully");
    } catch (error) {
      console.error("Error deleting mechanic:", error);
      alert("Failed to delete mechanic");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Display the user's name */}
      {userName && (
        <h2 className="text-xl font-bold mb-4">
          Welcome, {userName}!
        </h2>
      )}

      <button className="primary-btn mb-4">
        <Link
          to="/madd"
          state={{
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("name"),
          }}
        >
          Add Mechanic
        </Link>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanics.map((mechanic, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={mechanic.image}
              alt={mechanic.serviceName}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{mechanic.serviceName}</h3>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {mechanic.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Vehicle Type:</strong> {mechanic.vehicleType.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Availability:</strong>{" "}
                {mechanic.availability ? "Available" : "Not Available"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact Number:</strong> {mechanic.contactNumber}
              </p>
              <div className="mt-4 flex space-x-4">
                <button className="primary-btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  <Link
                    to="/medit"
                    state={{
                      mechanic,
                      userId: localStorage.getItem("userId")
                    }}
                  >
                    Edit
                  </Link>
                </button>
                <button
                  className="primary-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  onClick={() => handleDelete(mechanic.id)} // Pass mechanic id to delete
                >
                  Delete
                </button>
                <button className="primary-btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                  <Link
                    to="/mfeed"
                    state={{
                      mechanicid: mechanic.id, // Pass mechanic ID to view feedback
                    }}
                  >
                    View Feedback
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicView;
