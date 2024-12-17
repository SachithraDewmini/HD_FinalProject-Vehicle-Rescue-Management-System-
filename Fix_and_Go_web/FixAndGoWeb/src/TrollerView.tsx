import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

const TrollerView: React.FC = () => {

   const [trollers, setTrollers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state to handle data fetch
  
    useEffect(() => {
      const fetchTrollers = async () => {
        try {
          const userId = localStorage.getItem("userId");
          if (!userId) {
            console.error("No user ID found in local storage.");
            setLoading(false);
            return;
          }
  
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
          setLoading(false); // Set loading to false after data is fetched
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
          <button className="primary-btn mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
            <Link to="/radd" state={{ userId: localStorage.getItem("userId") }}>
              Add Troller
            </Link>
          </button>
    
          {loading ? ( // Display a loading message while data is being fetched
            <div className="text-center text-lg text-gray-600">Loading...</div>
          ) : trollers.length === 0 ? ( // Show a message if no trollerowners are found
            <div className="text-center text-lg text-gray-600">No troller found.</div>
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
                      <strong>Vehicle Type:</strong> {Array.isArray(troller.vehicleType) ? troller.vehicleType.join(", ") : troller.vehicleType}
                    </p>
                   
                    <p className="text-sm text-gray-600">
                      <strong>Towing Capacity:</strong> {Array.isArray(troller.towingcapacity) ? troller.towingcapacity.join(", ") : troller.towingcapacity}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Availability:</strong> {troller.availability === "available" ? "Available" : "Not Available"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Value:</strong> {Array.isArray(troller.value) ? troller.value.join(", ") : troller.value}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Contact Number:</strong> {troller.contactNumber}
                    </p>
                    <div className="mt-4 flex space-x-4">
                      <button className="primary-btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                        <Link to="/tedit" state={{ troller }}>
                          Edit
                        </Link>
                      </button>
                      <button
                        className="primary-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        onClick={() => handleDelete(troller.id)} // Pass troller id to delete
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
  )
}

export default TrollerView
